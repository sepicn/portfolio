"""
Renders single props from the room as transparent stills for the inner pages, so the site
reuses the exact objects of the 3D office instead of separate artwork.

Run after build_room.py (it opens blender/out/room.blend):
    blender -b -P blender/render_props.py

Outputs blender/out/props/<name>.png (900x900, transparent background) and
blender/out/props/screens.json: the four corners of the monitor screen on computer.png, so
the page can map an animated screen onto it.
"""

import math
import os

import json

import bmesh
import bpy
from bpy_extras.object_utils import world_to_camera_view
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out", "props")
os.makedirs(OUT, exist_ok=True)

# name -> (objects in the room, yaw in degrees from straight on, camera height factor, zoom).
# Zoom above 1 crops in. Framing only counts geometry above FRAME_MIN_Z, so the phone cord
# hanging to the floor does not pull the camera away from the phone.
FRAME_MIN_Z = {"telephone": 0.76}
UNLIT = {"open-sign-off"}
# Faces with these materials are left out of the render, e.g. the yoga mat next to the
# weights, which would otherwise shrink the dumbbells to specks in a small icon.
DROP_MATERIALS = {"icon-gym": {"gym_violet"}}
PROPS = {
    "computer": (["monitor", "monitor_screen", "computer_case", "keyboard"], -28, 0.45, 1.0),
    "open-sign": (["neon_sign", "neon_border", "neon_panel"], -18, 0.1, 1.0),
    # Same framing with the tubes switched off; the page flickers between the two.
    "open-sign-off": (["neon_sign", "neon_border", "neon_panel"], -18, 0.1, 1.0),
    "floppy": (["floppy"], -20, 1.1, 1.0),
    "telephone": (["phone"], -32, 0.7, 0.88),
    # Small icons for the ticker on the about page (icon-*.png, resized to 256 by room.mjs).
    # From the right front so the voxel cat shows its face and ears.
    "icon-cat": (["cat"], 40, 0.3, 1.0),
    "icon-books": (["books"], -20, 0.35, 1.0),
    "icon-book": (["book_open"], -10, 1.2, 1.0),
    "icon-gym": (["gym"], -20, 0.8, 1.0),
    "icon-hifi": (["hifi"], -20, 0.4, 1.0),
    "icon-cassettes": (["cassettes"], -20, 0.6, 1.0),
    "icon-code": (["monitor", "monitor_screen", "computer_case", "keyboard"], -20, 0.45, 1.0),
    # Not in the room: imported from blender/assets (convert_icons.py) just for the icons.
    "icon-gameboy": (["gameboy"], -20, 0.35, 1.0),
    "icon-shoes": (["running_shoes"], -80, 0.3, 0.95),
    "icon-speaker": (["speaker"], -20, 0.4, 1.0),
}
# PROP_ONLY=icon- renders just the props whose name starts with it, for quick reruns.
ONLY = os.environ.get("PROP_ONLY")
if ONLY:
    PROPS = {k: v for k, v in PROPS.items() if k.startswith(ONLY)}
SIZE = 900

bpy.ops.wm.open_mainfile(filepath=os.path.join(HERE, "out", "room.blend"))
scene = bpy.context.scene

# Icon-only models, placed well outside the room; each render hides every other mesh.
for i, slug in enumerate(["gameboy", "running_shoes"]):
    before = set(scene.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(HERE, "assets", slug, f"{slug}.glb"))
    for obj in set(scene.objects) - before:
        if obj.type == "MESH":
            obj.name = slug
            obj.location = (40 + i * 5, 0, 0)
scene.render.film_transparent = True
scene.render.resolution_x = scene.render.resolution_y = SIZE
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
for engine in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
    try:
        scene.render.engine = engine
        break
    except TypeError:
        continue
scene.view_settings.view_transform = "AgX"
scene.view_settings.look = "AgX - Punchy"
if scene.world is None:
    scene.world = bpy.data.worlds.new("world")
scene.world.use_nodes = True
scene.world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.03, 0.01, 0.06, 1)
scene.world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.8

# The room's own lights are placed for the whole scene; a small studio rig reads better on
# an isolated object, tinted like the room: warm key, pink and cyan rims.
for obj in list(scene.objects):
    if obj.type == "LIGHT":
        obj.hide_render = True


def area(name, color, power, size):
    data = bpy.data.lights.new(name, "AREA")
    data.color = color
    data.energy = power
    data.size = size
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    return obj


rig = {
    "key": area("prop_key", (1.0, 0.86, 0.72), 60, 1.2),
    "pink": area("prop_rim_pink", (1.0, 0.18, 0.58), 80, 0.8),
    "cyan": area("prop_rim_cyan", (0.0, 0.9, 1.0), 60, 0.8),
}

cam_data = bpy.data.cameras.new("prop_camera")
cam_data.lens = 60
cam = bpy.data.objects.new("prop_camera", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam


def aim(obj, target):
    obj.rotation_euler = (target - obj.location).to_track_quat("-Z", "Y").to_euler()


for name, (objects, yaw, rise, zoom) in PROPS.items():
    swapped = []
    for obj_name in objects if name in DROP_MATERIALS else []:
        obj = scene.objects.get(obj_name)
        if obj is None:
            continue
        drop = {i for i, slot in enumerate(obj.material_slots) if slot.material and slot.material.name in DROP_MATERIALS[name]}
        mesh = obj.data.copy()
        bm = bmesh.new()
        bm.from_mesh(mesh)
        dropped = [f for f in bm.faces if f.material_index in drop]
        # Loose parts that sit inside the dropped faces (the pink roll on the mat) go too.
        box = [(min(v.co[i] for f in dropped for v in f.verts) - 0.02, max(v.co[i] for f in dropped for v in f.verts) + 0.02) for i in range(3)]
        inside = lambda co: all(lo <= co[i] <= hi for i, (lo, hi) in enumerate(box))
        seen = set()
        for face in bm.faces:
            if face in seen:
                continue
            stack, island = [face], []
            while stack:
                g = stack.pop()
                if g in seen:
                    continue
                seen.add(g)
                island.append(g)
                stack += [h for e in g.edges for h in e.link_faces if h not in seen]
            if all(inside(v.co) for g in island for v in g.verts):
                dropped += [g for g in island if g not in dropped]
        bmesh.ops.delete(bm, geom=dropped, context="FACES")
        bmesh.ops.delete(bm, geom=[v for v in bm.verts if not v.link_faces], context="VERTS")
        bm.to_mesh(mesh)
        bm.free()
        swapped.append((obj, obj.data))
        obj.data = mesh
    if swapped:
        bpy.context.view_layer.update()
    keep = set(objects)
    for obj in scene.objects:
        if obj.type == "MESH":
            obj.hide_render = obj.name not in keep
    points = []
    for obj_name in objects:
        obj = scene.objects.get(obj_name)
        if obj is None:
            continue
        floor = FRAME_MIN_Z.get(name)
        if floor is None:
            points += [obj.matrix_world @ Vector(corner) for corner in obj.bound_box]
        else:
            world = [obj.matrix_world @ v.co for v in obj.data.vertices]
            points += [p for p in world if p.z >= floor]
    if not points:
        print(f"PROP_SKIP {name}")
        continue
    lo = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    hi = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    centre = (lo + hi) / 2
    radius = max((p - centre).length for p in points)
    fov = 2 * math.atan(18 / cam_data.lens)
    # The bounding sphere over-estimates what is on screen, so pull in a little.
    distance = radius / math.sin(fov / 2) * 0.86 / zoom
    a = math.radians(yaw)
    # The room faces -Y (the web camera looks towards +Y), so "in front" is -Y.
    direction = Vector((math.sin(a), -math.cos(a), rise)).normalized()
    cam.location = centre + direction * distance
    aim(cam, centre)
    rig["key"].location = centre + Vector((-1.2, -1.4, 1.2)) * radius * 2.2
    rig["pink"].location = centre + Vector((1.4, 0.6, 0.6)) * radius * 2.2
    rig["cyan"].location = centre + Vector((-1.4, 0.8, 0.2)) * radius * 2.2
    for light in rig.values():
        aim(light, centre)
    if name == "computer":
        bpy.context.view_layer.update()
        screen = scene.objects["monitor_screen"]
        uv = []
        for v in screen.data.vertices:
            p = world_to_camera_view(scene, cam, screen.matrix_world @ v.co)
            uv.append((p.x * 100, (1 - p.y) * 100))
        # Corners of the projected screen, in percent from the top left of the image.
        corners = {
            "tl": min(uv, key=lambda q: q[0] + q[1]),
            "tr": max(uv, key=lambda q: q[0] - q[1]),
            "br": max(uv, key=lambda q: q[0] + q[1]),
            "bl": min(uv, key=lambda q: q[0] - q[1]),
        }
        with open(os.path.join(OUT, "screens.json"), "w") as fh:
            json.dump({"computer": {k: [round(c, 2) for c in v] for k, v in corners.items()}}, fh, indent=2)
    dimmed = []
    if name in UNLIT:
        for obj_name in objects:
            for slot in scene.objects[obj_name].material_slots:
                bsdf = slot.material.node_tree.nodes.get("Principled BSDF") if slot.material else None
                if bsdf and bsdf.inputs["Emission Strength"].default_value > 0.5:
                    dimmed.append((bsdf, bsdf.inputs["Emission Strength"].default_value))
                    bsdf.inputs["Emission Strength"].default_value = 0.04
    scene.render.filepath = os.path.join(OUT, f"{name}.png")
    bpy.ops.render.render(write_still=True)
    for bsdf, strength in dimmed:
        bsdf.inputs["Emission Strength"].default_value = strength
    for obj, original in swapped:
        obj.data = original
    print(f"PROP_OK {name}")
