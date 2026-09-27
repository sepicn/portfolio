"""
Neon outlines for the phone tour close-ups: a transparent overlay per hotspot that traces the
clickable object in its tour still, so the page can light it up when the tour rests there.

Run headless on the scene build_room.py saved:
    blender -b blender/out/room.blend -P blender/render_outlines.py

Outputs (in blender/out/outline/):
    <spot>.png      1080x1920 RGBA, a bright line hugging the object with a cyan halo,
                    transparent everywhere else (the object itself is left uncovered)

Each object mask comes from a flat Workbench render through the same camera as the still
(build_room.tour_shots), so hidden parts stay hidden and the line matches the render.
"""

import os
import re
import sys

import bpy
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_room  # noqa: E402  (after the path tweak; only its helpers are used)

OUT = os.path.join(build_room.OUT, "outline")
os.makedirs(OUT, exist_ok=True)

# Invisible click targets that would otherwise hide what they cover in a flat render.
SKIP = {"window_glass"}
TUBE = np.array([120, 240, 255]) / 255


def hotspot_meshes():
    source = open(os.path.join(build_room.HERE, "..", "lib", "hotspots.ts"), encoding="utf-8").read()
    pattern = re.compile(r'id: "(\w+)",\s*(?://[^\n]*\n\s*)*meshes: \[([^\]]*)\]', re.S)
    return {m.group(1): re.findall(r'"(\w+)"', m.group(2)) for m in pattern.finditer(source)}


def blur(a, r):
    """Box blur, three passes per axis, which lands close to a Gaussian."""
    for axis in (0, 1):
        for _ in range(3):
            pad = [(0, 0), (0, 0)]
            pad[axis] = (r + 1, r)
            c = np.cumsum(np.pad(a, pad, mode="edge"), axis=axis)
            hi = np.take(c, np.arange(2 * r + 1, c.shape[axis]), axis=axis)
            lo = np.take(c, np.arange(0, c.shape[axis] - 2 * r - 1), axis=axis)
            a = (hi - lo) / (2 * r + 1)
    return a


def mask_setup(scene):
    scene.render.engine = "BLENDER_WORKBENCH"
    # The saved scene carries the stills' bloom, which would smear the mask.
    scene.render.use_compositing = False
    shading = scene.display.shading
    shading.light = "FLAT"
    shading.color_type = "OBJECT"
    shading.show_shadows = False
    shading.show_cavity = False
    shading.show_object_outline = False
    shading.show_specular_highlight = False
    scene.display.render_aa = "8"
    scene.render.film_transparent = True
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_mode = "RGBA"
    scene.render.resolution_x, scene.render.resolution_y = build_room.TOUR_SIZE
    scene.render.resolution_percentage = 100


def render_mask(scene, targets):
    for obj in scene.objects:
        if obj.type in {"MESH", "CURVE", "FONT"}:
            obj.color = (1, 1, 1, 1) if obj.name in targets else (0, 0, 0, 1)
            obj.hide_render = obj.name in SKIP
    path = os.path.join(OUT, "_mask.png")
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    img = bpy.data.images.load(path)
    w, h = img.size
    px = np.empty(w * h * 4, dtype=np.float32)
    img.pixels.foreach_get(px)
    bpy.data.images.remove(img)
    os.remove(path)
    return px.reshape(h, w, 4)[:, :, 0].astype(np.float64)


def outline(mask):
    # A band just outside the silhouette: grow it a few pixels, take the object back out.
    grown = np.clip(blur(mask, 4) * 3.0, 0, 1)
    line = np.clip(grown - mask, 0, 1)
    halo = np.clip(blur(line, 16) * 4.0 + blur(line, 6) * 1.5, 0, 1) * (1 - mask * 0.85)
    alpha = np.clip(line + halo * 0.9, 0, 1)
    # One flat colour: all the shape lives in alpha, which keeps the web copy near 20 KB.
    # The page screens it over the still, so the dense line still reads white-hot.
    rgb = np.broadcast_to(TUBE, alpha.shape + (3,))
    return np.dstack([rgb, alpha]).astype(np.float32)


def save(rgba, path):
    h, w, _ = rgba.shape
    img = bpy.data.images.new("outline", w, h, alpha=True)
    img.pixels.foreach_set(rgba.ravel())
    img.filepath_raw = path
    img.file_format = "PNG"
    img.save()
    bpy.data.images.remove(img)


if __name__ == "__main__":
    scene = bpy.context.scene
    mask_setup(scene)
    _, aim = build_room.tour_camera(scene)
    meshes = hotspot_meshes()
    for name, (position, look, lens) in build_room.tour_shots().items():
        if name not in meshes:
            continue
        aim(position, look, lens)
        rgba = outline(render_mask(scene, set(meshes[name]) - SKIP))
        save(rgba, os.path.join(OUT, f"{name}.png"))
        print(f"OUTLINE_OK {name}")
