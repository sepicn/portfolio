"""
Builds the synthwave office scene for sepic.me procedurally and exports it as glTF.

Run headless:
    blender -b -P blender/build_room.py

Outputs (in blender/out/):
    room.glb        the scene, Y-up, metres, Draco compressed
    preview.png     Eevee render, 2560x1440, from the web camera (static hero, phone tour, OG)
    views.json      each hotspot focus point projected onto preview.png ("landscape") and
                    onto tour_overview.png ("tour"), in percent
    tour_*.png      1080x1920 stills for the phone tour: an overview, then one per hotspot
                    shot straight on from the front
    fly/*.png       540x960 frame sequences of the camera flying from the overview to each
                    close-up, scrubbed by scroll on phones
    room.blend      the generated scene, so it can be opened and hand tuned

Clickable objects carry stable names that the web app looks up (see lib/hotspots.ts):
    monitor, monitor_screen, neon_sign, neon_border, neon_panel, window_glass,
    billboard_1..3, phone, diploma, hifi, speaker, cassettes, floppy, lamp, lamp_bulb
"""

import math
import os
import random

import bmesh
import bpy
import numpy as np
from mathutils import Vector

random.seed(7)

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)

WALL_Y = 3.0

HEX = {
    "wall": "1a0b33",
    "wall_dark": "120826",
    "floor": "0e061f",
    "rug": "1c0f3a",
    "desk": "2b1a40",
    "desk_edge": "3a2455",
    "beige": "d9cbb0",
    "beige_dark": "b9a98c",
    "keycap": "e4d8be",
    "black": "0d0d16",
    "black_soft": "1a1a26",
    "grey": "3a3a4a",
    "chrome": "8a8a9a",
    "pink": "ff2d95",
    "cyan": "00e5ff",
    "violet": "8a2be2",
    "sun": "ff8c42",
    "yellow": "ffd60a",
    "green": "39ff88",
    "red": "ff3b5c",
    "paper": "efe7d6",
    "wood": "5a3a2a",
    "gold": "d4a94a",
    "leaf": "2f9e5b",
    "soil": "2a1a12",
    "book_1": "c23b6a",
    "book_2": "2a7de1",
    "book_3": "e0b83c",
    "book_4": "3fbf9f",
    "book_5": "8a2be2",
    "note_1": "ffe066",
    "note_2": "ff7eb6",
}


def srgb_to_linear(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def rgb(hex_value, alpha=1.0):
    r, g, b = (int(hex_value[i : i + 2], 16) / 255 for i in (0, 2, 4))
    return (srgb_to_linear(r), srgb_to_linear(g), srgb_to_linear(b), alpha)


# --------------------------------------------------------------------------- #
# Scene helpers
# --------------------------------------------------------------------------- #


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    for block in (bpy.data.meshes, bpy.data.materials, bpy.data.images, bpy.data.lights, bpy.data.curves):
        for item in list(block):
            block.remove(item)


MATERIALS = {}


def material(name, color, roughness=0.6, metallic=0.0, emission=None, strength=0.0, image=None, alpha=None):
    if name in MATERIALS:
        return MATERIALS[name]
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    bsdf = nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if image is not None:
        tex = nodes.new("ShaderNodeTexImage")
        tex.image = image
        links.new(tex.outputs["Color"], bsdf.inputs["Emission Color"])
        bsdf.inputs["Base Color"].default_value = (0, 0, 0, 1)
        bsdf.inputs["Emission Strength"].default_value = strength or 1.0
    elif emission is not None:
        bsdf.inputs["Emission Color"].default_value = emission
        bsdf.inputs["Emission Strength"].default_value = strength
    if alpha is not None:
        bsdf.inputs["Alpha"].default_value = alpha
        mat.blend_method = "BLEND"
    MATERIALS[name] = mat
    return mat


def finish(obj, name, mat, bevel=None, segments=2, smooth=False):
    obj.name = name
    obj.data.name = name
    if mat is not None:
        obj.data.materials.clear()
        obj.data.materials.append(mat)
    if bevel:
        mod = obj.modifiers.new("Bevel", "BEVEL")
        mod.width = bevel
        mod.segments = segments
        mod.limit_method = "ANGLE"
    if smooth:
        bpy.ops.object.select_all(action="DESELECT")
        obj.select_set(True)
        bpy.context.view_layer.objects.active = obj
        try:
            bpy.ops.object.shade_smooth_by_angle(angle=math.radians(40))
        except Exception:
            bpy.ops.object.shade_smooth()
    return obj


def box(name, size, location, mat, bevel=None, rotation=(0, 0, 0), segments=2, smooth=False):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.scale = Vector(size)
    bpy.ops.object.transform_apply(scale=True)
    return finish(obj, name, mat, bevel, segments, smooth)


def cylinder(name, radius, depth, location, mat, rotation=(0, 0, 0), vertices=24, bevel=None, smooth=True):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=location, rotation=rotation)
    return finish(bpy.context.active_object, name, mat, bevel, 2, smooth)


def cone(name, r1, r2, depth, location, mat, rotation=(0, 0, 0), vertices=32):
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=r1, radius2=r2, depth=depth, location=location, rotation=rotation)
    return finish(bpy.context.active_object, name, mat, None, 2, True)


def segment(name, p0, p1, radius, mat, vertices=16):
    """Cylinder from p0 to p1, so multi-part arms line up exactly."""
    p0, p1 = Vector(p0), Vector(p1)
    d = p1 - p0
    mid = (p0 + p1) / 2
    rot = Vector((0, 0, 1)).rotation_difference(d).to_euler()
    return cylinder(name, radius, d.length, mid, mat, rotation=rot, vertices=vertices)


def cone_toward(name, r_wide, r_narrow, depth, tip, direction, mat, vertices=32):
    """Cone whose wide opening faces the given direction; tip is the centre of the wide end."""
    d = Vector(direction).normalized()
    rot = Vector((0, 0, -1)).rotation_difference(d).to_euler()
    centre = Vector(tip) - d * (depth / 2)
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=r_wide, radius2=r_narrow, depth=depth, location=centre, rotation=rot)
    return finish(bpy.context.active_object, name, mat, None, 2, True)


def sphere(name, radius, location, mat, segments=16, rings=10, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segments, ring_count=rings, radius=radius, location=location)
    obj = bpy.context.active_object
    obj.scale = Vector(scale)
    bpy.ops.object.transform_apply(scale=True)
    return finish(obj, name, mat, None, 2, True)


def torus(name, major, minor, location, mat, rotation=(0, 0, 0), major_segments=32, minor_segments=12):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, location=location, rotation=rotation, major_segments=major_segments, minor_segments=minor_segments)
    return finish(bpy.context.active_object, name, mat, None, 2, True)


def plane(name, size, location, mat, rotation=(0, 0, 0)):
    bpy.ops.mesh.primitive_plane_add(size=1, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.scale = Vector((size[0], size[1], 1))
    bpy.ops.object.transform_apply(scale=True)
    return finish(obj, name, mat)


def text(name, body, location, size, extrude, mat, rotation=(0, 0, 0), bevel=0.0, align="CENTER"):
    bpy.ops.object.text_add(location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.data.body = body
    obj.data.size = size
    obj.data.extrude = extrude
    obj.data.align_x = align
    obj.data.align_y = "CENTER"
    if bevel:
        obj.data.bevel_depth = bevel
        obj.data.bevel_resolution = 2
    bpy.ops.object.convert(target="MESH")
    obj = bpy.context.active_object
    return finish(obj, name, mat)


def tube(name, points, radius, mat, cyclic=False, resolution=6, smooth=True):
    """A tube along a poly/bezier path, converted to a mesh."""
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = radius
    curve.bevel_resolution = resolution
    spline = curve.splines.new("NURBS")
    spline.points.add(len(points) - 1)
    for i, p in enumerate(points):
        spline.points[i].co = (p[0], p[1], p[2], 1)
    spline.use_cyclic_u = cyclic
    spline.use_endpoint_u = not cyclic
    spline.order_u = min(4, len(points))
    obj = bpy.data.objects.new(name, curve)
    bpy.context.scene.collection.objects.link(obj)
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.convert(target="MESH")
    obj = bpy.context.active_object
    return finish(obj, name, mat, None, 2, smooth)


def join(objects, name):
    objects = [o for o in objects if o is not None]
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]
    bpy.ops.object.join()
    obj = bpy.context.active_object
    obj.name = name
    obj.data.name = name
    return obj


ASSETS = os.path.join(HERE, "assets")


def asset(slug, name, location, rotation_z=0.0, scale=1.0, part=None):
    """Imports a model from blender/assets/<slug>/<part or slug>.gltf as one object named name.

    Sources and licences are listed in blender/assets/README.md. The BlendSwap models come
    from convert_blendswap.py with materials named after the room palette; those are swapped
    for the room's own materials so the imports match the procedural props.
    """
    before = set(bpy.context.scene.objects)
    bpy.ops.import_scene.gltf(filepath=os.path.join(ASSETS, slug, f"{part or slug}.gltf"))
    new = [o for o in bpy.context.scene.objects if o not in before]
    meshes = [o for o in new if o.type == "MESH"]
    for o in meshes:
        world = o.matrix_world.copy()
        o.parent = None
        o.matrix_world = world
    for o in new:
        if o.type != "MESH":
            bpy.data.objects.remove(o, do_unlink=True)
    obj = join(meshes, name) if len(meshes) > 1 else meshes[0]
    obj.name = name
    obj.data.name = name
    for slot in obj.material_slots:
        if slot.material and slot.material.name.split(".")[0] in MATERIALS:
            slot.material = MATERIALS[slot.material.name.split(".")[0]]
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    obj.scale = (scale, scale, scale)
    # The glTF importer leaves objects in quaternion mode, where rotation_euler is ignored.
    obj.rotation_mode = "XYZ"
    obj.rotation_euler = (0, 0, rotation_z)
    obj.location = location
    return obj


def tapered_box(name, bottom, top, height, location, mat, bevel=None):
    """A box whose top face is smaller and shifted back, built directly as a mesh.

    bottom = (width, depth); top = (width, depth, shift towards +Y); location is the
    centre of the bottom face.
    """
    bw, bd = bottom
    tw, td, shift = top
    verts = [
        (-bw / 2, -bd / 2, 0), (bw / 2, -bd / 2, 0), (bw / 2, bd / 2, 0), (-bw / 2, bd / 2, 0),
        (-tw / 2, -td / 2 + shift, height), (tw / 2, -td / 2 + shift, height),
        (tw / 2, td / 2 + shift, height), (-tw / 2, td / 2 + shift, height),
    ]
    faces = [(0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)]
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    bpy.context.view_layer.update()
    return finish(obj, name, mat, bevel, 5, True)


def curved_screen(name, width, height, bulge, location, mat, rotation=(0, 0, 0), divisions=14):
    """A slightly domed CRT screen: a grid whose centre pushes toward the viewer."""
    mesh = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=divisions, y_segments=divisions, size=0.5)
    for v in bm.verts:
        x, y = v.co.x, v.co.y
        r2 = min(1.0, (x * 2) ** 2 * 0.9 + (y * 2) ** 2 * 0.9)
        v.co.x = x * width
        v.co.y = y * height
        v.co.z = bulge * (1 - r2)
    bm.to_mesh(mesh)
    bm.free()
    # UVs for the emissive texture.
    uv = mesh.uv_layers.new(name="UVMap")
    for loop in mesh.loops:
        co = mesh.vertices[loop.vertex_index].co
        uv.data[loop.index].uv = (co.x / width + 0.5, co.y / height + 0.5)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = rotation
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    return finish(obj, name, mat, None, 2, True)


def image_from_array(name, pixels):
    height, width, _ = pixels.shape
    image = bpy.data.images.new(name, width=width, height=height, alpha=True, float_buffer=False)
    image.pixels.foreach_set(pixels.astype(np.float32).ravel())
    path = os.path.join(OUT, f"{name}.png")
    image.filepath_raw = path
    image.file_format = "PNG"
    image.save()
    image.pack()
    return image


# --------------------------------------------------------------------------- #
# Procedural textures
# --------------------------------------------------------------------------- #


def hex_to_rgb01(hex_value):
    return np.array([int(hex_value[i : i + 2], 16) / 255 for i in (0, 2, 4)], dtype=np.float32)


def screen_texture(width=512, height=384):
    y, x = np.mgrid[0:height, 0:width].astype(np.float32)
    u = x / width
    v = y / height
    img = np.zeros((height, width, 4), dtype=np.float32)
    img[..., 3] = 1
    top = hex_to_rgb01("1b0638")
    horizon = hex_to_rgb01("ff2d95")
    t = np.clip((v - 0.42) / 0.58, 0, 1)[..., None]
    sky = horizon * (1 - t) + top * t
    cx, cy, r = 0.5, 0.62, 0.2
    d = np.sqrt(((u - cx) * (width / height)) ** 2 + (v - cy) ** 2)
    sun_t = np.clip((v - (cy - r)) / (2 * r), 0, 1)[..., None]
    sun = hex_to_rgb01("ffd60a") * sun_t + hex_to_rgb01("ff5e3a") * (1 - sun_t)
    stripes = ((v - (cy - r)) * 90) % 8 < (3 * (1 - sun_t[..., 0]) + 0.5)
    sun_mask = (d < r) & ~(stripes & (v < cy - 0.02))
    sky = np.where(sun_mask[..., None], sun, sky)
    ground = np.tile(hex_to_rgb01("0b0416"), (height, width, 1))
    gv = np.clip((0.42 - v) / 0.42, 0, 1)
    depth = 1 / (gv * 6 + 0.35)
    horizontal = np.abs(((depth * 3.2) % 1) - 0.5) < (0.035 + gv * 0.03)
    px = (u - 0.5) * depth * 6
    vertical = np.abs((px % 1) - 0.5) < 0.04
    grid = (horizontal | vertical) & (v < 0.42)
    cyan = hex_to_rgb01("00e5ff")
    glow = np.clip(1.2 - gv * 1.4, 0.35, 1)[..., None]
    ground = np.where(grid[..., None], cyan * glow, ground)
    img[..., :3] = np.where((v < 0.42)[..., None], ground, sky)
    scan = (y.astype(int) % 3 == 0)[..., None]
    img[..., :3] *= np.where(scan, 0.82, 1.0)
    return img


def city_texture(width=1024, height=512, cell=8):
    """Night skyline: dark towers on a violet haze with lit windows.

    Every window pane sits on one global grid: a 3 x 4 px pane at (2, 2) inside each
    cell x cell px cell. The web app finds each pane from its UV with the same grid and
    switches it off and on over time (CITY_GRID in components/scene/city-lights.ts), so
    keep the two in sync. Its own random stream keeps the skyline stable when other
    random props change.
    """
    rng = random.Random(1024)
    img = np.zeros((height, width, 4), dtype=np.float32)
    img[..., 3] = 1
    y = np.arange(height, dtype=np.float32)[:, None] / height
    top = hex_to_rgb01("05020c")
    low = hex_to_rgb01("2a0f52")
    img[..., :3] = low * (1 - y)[..., None] + top * y[..., None]
    haze = np.clip(1 - np.abs(y - 0.18) / 0.18, 0, 1)[..., None]
    img[..., :3] += hex_to_rgb01("ff2d95") * haze * 0.18
    # Mostly warm light, some neon pink and cyan.
    window_colors = [hex_to_rgb01(h) for h in ("ffd60a", "ffd60a", "ffc46b", "fff4d6", "00e5ff", "ff2d95")]
    body = hex_to_rgb01("0a0514")
    x = 0
    while x < width:
        w = rng.randint(28, 90)
        center_bias = 1 - abs((x + w / 2) / width - 0.5) * 1.4
        h = int(height * rng.uniform(0.22, 0.34 + 0.45 * max(center_bias, 0)))
        img[:h, x : x + w, :3] = body
        # Panes at least 3 px inside the tower sides and 4 px below its roof.
        for cy in range(1, (h - 10) // cell + 1):
            for cx in range(-(-(x + 1) // cell), (x + w - 8) // cell + 1):
                if rng.random() < 0.42:
                    px, py = cx * cell + 2, cy * cell + 2
                    img[py : py + 4, px : px + 3, :3] = rng.choice(window_colors) * rng.uniform(0.75, 1.0)
        if h > height * 0.6 and rng.random() < 0.7:
            img[h : h + 3, x + w // 2 - 1 : x + w // 2 + 1, :3] = hex_to_rgb01("ff2d95")
        x += w + rng.randint(2, 10)
    return img



# --------------------------------------------------------------------------- #
# Neon lettering
# --------------------------------------------------------------------------- #


def arc(cx, cy, rx, ry, start, end, steps=14):
    """Points along an elliptical arc, angles in degrees, counter-clockwise if end > start."""
    return [(cx + rx * math.cos(math.radians(a)), cy + ry * math.sin(math.radians(a))) for a in np.linspace(start, end, steps)]


# Single-stroke letters in the thin geometric style of the neon sign model: (width, strokes),
# in units of the letter height, each stroke one bent glass tube.
NEON_GLYPHS = {
    "N": (0.62, [[(0, 0), (0, 1), (0.62, 0), (0.62, 1)]]),
    "I": (0.0, [[(0, 0), (0, 1)]]),
    "K": (0.58, [[(0, 0), (0, 1)], [(0.56, 1), (0, 0.42)], [(0.17, 0.58), (0.58, 0)]]),
    "O": (0.8, [arc(0.4, 0.5, 0.4, 0.5, 90, 450, 40)]),
    "L": (0.5, [[(0, 1), (0, 0), (0.5, 0)]]),
    "A": (0.66, [[(0, 0), (0.33, 1), (0.66, 0)], [(0.12, 0.36), (0.54, 0.36)]]),
    "S": (0.56, [arc(0.28, 0.75, 0.28, 0.25, 15, 270) + arc(0.28, 0.25, 0.28, 0.25, 90, -165)[1:]]),
    "E": (0.5, [[(0.5, 1), (0, 1), (0, 0), (0.5, 0)], [(0, 0.5), (0.42, 0.5)]]),
    "P": (0.55, [[(0, 0), (0, 1), (0.3, 1)] + arc(0.3, 0.74, 0.25, 0.26, 90, -90)[1:] + [(0, 0.48)]]),
    "C": (0.66, [arc(0.4, 0.5, 0.4, 0.5, 50, 310, 30)]),
}
NEON_GLYPHS["Š"] = (0.56, NEON_GLYPHS["S"][1] + [[(0.1, 1.28), (0.28, 1.12), (0.46, 1.28)]])
NEON_GLYPHS["Ć"] = (0.66, NEON_GLYPHS["C"][1] + [[(0.3, 1.12), (0.46, 1.3)]])
# The code tag: "<", "/" and ">" as three tubes.
CODE_TAG = (1.48, [[(0.45, 1), (0, 0.5), (0.45, 0)], [(0.58, -0.05), (0.9, 1.05)], [(1.03, 1), (1.48, 0.5), (1.03, 0)]])


def quad(p0, p1, p2, steps=12):
    """Points along a quadratic bezier from p0 to p2 bent towards p1."""
    return [
        ((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0],
         (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1])
        for t in np.linspace(0, 1, steps)
    ]


# The palm from the logo: a bent trunk and five drooping fronds, each one tube.
PALM_CROWN = (0.6, 0.8)
PALM = (1.2, [
    quad((0.74, -0.05), (0.82, 0.35), PALM_CROWN),
    quad(PALM_CROWN, (0.2, 1.02), (0.0, 0.42)),
    quad(PALM_CROWN, (0.34, 1.14), (0.18, 0.92)),
    quad(PALM_CROWN, (0.64, 1.12), (0.78, 1.08)),
    quad(PALM_CROWN, (0.88, 1.14), (1.02, 0.92)),
    quad(PALM_CROWN, (1.0, 1.02), (1.2, 0.42)),
])


def neon_tubes(name, glyphs, origin, height, y, mat, spacing=0.26, radius=0.008):
    """Bent-glass tubes on a wall plane: glyphs are (width, strokes) laid out left to right
    from origin (x, z of the bottom left) at the given letter height, all joined as name."""
    x0, z0 = origin
    tubes = []
    for width, strokes in glyphs:
        for stroke in strokes:
            curve = bpy.data.curves.new(f"{name}_{len(tubes)}", "CURVE")
            curve.dimensions = "3D"
            curve.bevel_depth = radius
            curve.bevel_resolution = 3
            curve.use_fill_caps = True
            spline = curve.splines.new("POLY")
            spline.points.add(len(stroke) - 1)
            for i, (u, v) in enumerate(stroke):
                spline.points[i].co = (x0 + u * height, y, z0 + v * height, 1)
            obj = bpy.data.objects.new(curve.name, curve)
            bpy.context.scene.collection.objects.link(obj)
            tubes.append(obj)
        x0 += (width + spacing) * height
    bpy.ops.object.select_all(action="DESELECT")
    for obj in tubes:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = tubes[0]
    bpy.ops.object.convert(target="MESH")
    return finish(join(list(bpy.context.selected_objects), name), name, mat, None, 2, True)


# --------------------------------------------------------------------------- #
# Build
# --------------------------------------------------------------------------- #


def build():
    clear_scene()
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"

    M = {}
    for key in ("wall", "wall_dark", "floor", "rug", "desk", "desk_edge", "beige", "beige_dark", "keycap", "black", "black_soft", "paper", "wood", "soil", "leaf", "gold"):
        M[key] = material(key, rgb(HEX[key]), roughness=0.85 if key in ("wall", "wall_dark", "paper", "rug") else 0.55)
    M["grey"] = material("grey", rgb(HEX["grey"]), roughness=0.45, metallic=0.4)
    M["chrome"] = material("chrome", rgb(HEX["chrome"]), roughness=0.25, metallic=0.9)
    M["floor"].node_tree.nodes["Principled BSDF"].inputs["Roughness"].default_value = 0.3
    for key in ("book_1", "book_2", "book_3", "book_4", "book_5", "note_1", "note_2"):
        M[key] = material(key, rgb(HEX[key]), roughness=0.8)
    M["neon_pink"] = material("neon_pink", rgb(HEX["pink"]), emission=rgb(HEX["pink"]), strength=12)
    M["neon_cyan"] = material("neon_cyan", rgb(HEX["cyan"]), emission=rgb(HEX["cyan"]), strength=10)
    M["neon_yellow"] = material("neon_yellow", rgb(HEX["yellow"]), emission=rgb(HEX["yellow"]), strength=7)
    M["neon_violet"] = material("neon_violet", rgb(HEX["violet"]), emission=rgb(HEX["violet"]), strength=7)
    M["neon_green"] = material("neon_green", rgb(HEX["green"]), emission=rgb(HEX["green"]), strength=6)
    M["neon_red"] = material("neon_red", rgb(HEX["red"]), emission=rgb(HEX["red"]), strength=6)
    # Its own material so the web app can find it by name and blink it (room-model.tsx).
    M["neon_error"] = material("neon_error", rgb(HEX["red"]), emission=rgb(HEX["red"]), strength=10)
    M["neon_sun"] = material("neon_sun", rgb(HEX["sun"]), emission=rgb(HEX["sun"]), strength=6)
    M["phone_plastic"] = material("phone_plastic", rgb("f59ac4"), roughness=0.22)
    M["neon_white"] = material("neon_white", rgb("e8e6ee"), emission=rgb("e8e6ee"), strength=3)
    M["neon_gold"] = material("neon_gold", rgb("d8b04a"), emission=rgb("d8b04a"), strength=4)
    M["bulb"] = material("bulb", rgb("fff1c8"), emission=rgb("ffd9a0"), strength=10)
    M["led"] = material("led", rgb(HEX["cyan"]), emission=rgb(HEX["cyan"]), strength=4)
    M["screen"] = material("screen", (0, 0, 0, 1), image=image_from_array("screen", screen_texture()), strength=2.2)
    M["city"] = material("city", (0, 0, 0, 1), image=image_from_array("city", city_texture()), strength=1.6)
    photo_path = os.path.join(ASSETS, "portrait.png")
    photo_img = bpy.data.images.load(photo_path)
    photo_img.scale(480, 640)
    photo_img.pack()
    M["photo"] = material("photo", (1, 1, 1, 1), roughness=0.6)
    tex = M["photo"].node_tree.nodes.new("ShaderNodeTexImage")
    tex.image = photo_img
    bsdf_photo = M["photo"].node_tree.nodes["Principled BSDF"]
    M["photo"].node_tree.links.new(tex.outputs["Color"], bsdf_photo.inputs["Base Color"])
    M["photo"].node_tree.links.new(tex.outputs["Color"], bsdf_photo.inputs["Emission Color"])
    bsdf_photo.inputs["Emission Strength"].default_value = 0.35
    for key, hexv in (("cat", "ff9a3c"), ("cat_dark", "c86a1e"), ("cat_white", "fff4e6"), ("cat_pink", "ff7eb6")):
        M[key] = material(key, rgb(hexv), roughness=0.9)
    # Nearly clear and barely tinted: a pale base colour caught the cyan window light and
    # washed the skyline out behind a blue haze.
    M["glass"] = material("glass", rgb("16222e", 0.04), roughness=0.02, alpha=0.04)
    M["dark_glass"] = material("dark_glass", rgb("101018", 0.6), roughness=0.1, alpha=0.6)
    # Palette names the converted BlendSwap models ask for (see convert_blendswap.py).
    M["chair_fabric"] = material("chair_fabric", rgb("2b3f8f"), roughness=0.95)
    M["neon_glass"] = material("neon_glass", rgb("0a0712"), roughness=0.45)

    # ---------------- Room shell ----------------
    plane("floor", (7, 7), (0, 0.5, 0), M["floor"])
    box("rug", (2.6, 1.8, 0.012), (0.1, 0.9, 0.006), M["rug"], bevel=0.005)
    box("wall_back_left", (2.2, 0.1, 3.2), (-2.4, WALL_Y + 0.05, 1.6), M["wall"])
    box("wall_back_right", (2.2, 0.1, 3.2), (2.4, WALL_Y + 0.05, 1.6), M["wall"])
    box("wall_back_bottom", (2.6, 0.1, 1.1), (0, WALL_Y + 0.05, 0.55), M["wall"])
    box("wall_back_top", (2.6, 0.1, 0.9), (0, WALL_Y + 0.05, 2.75), M["wall"])
    box("wall_left", (0.1, 7, 3.2), (-3.5, 0.5, 1.6), M["wall_dark"])
    box("skirting", (7, 0.03, 0.12), (0, WALL_Y - 0.015, 0.06), M["wall_dark"])
    box("skirting_left", (0.03, 7, 0.12), (-3.435, 0.5, 0.06), M["wall_dark"])
    box("floor_strip", (7, 0.015, 0.015), (0, WALL_Y - 0.04, 0.125), M["neon_violet"])
    box("ceiling_strip", (7, 0.02, 0.02), (0, WALL_Y - 0.02, 3.18), M["neon_violet"])
    box("ceiling_strip_left", (0.02, 7, 0.02), (-3.43, 0.5, 3.18), M["neon_cyan"])

    # ---------------- Window, city, billboards ----------------
    frame = [
        box("wf_l", (0.07, 0.14, 1.3), (-1.335, WALL_Y, 1.7), M["grey"]),
        box("wf_r", (0.07, 0.14, 1.3), (1.335, WALL_Y, 1.7), M["grey"]),
        box("wf_t", (2.74, 0.14, 0.07), (0, WALL_Y, 2.335), M["grey"]),
        box("wf_b", (2.74, 0.14, 0.09), (0, WALL_Y, 1.065), M["grey"]),
        box("wf_m", (0.035, 0.12, 1.2), (0, WALL_Y, 1.7), M["grey"]),
        box("wf_sill", (2.9, 0.22, 0.04), (0, WALL_Y - 0.06, 1.03), M["grey"]),
    ]
    join(frame, "window_frame")
    plane("window_glass", (2.6, 1.2), (0, WALL_Y + 0.01, 1.7), M["glass"], rotation=(math.pi / 2, 0, 0))
    plane("window", (6.5, 3.2), (0, WALL_Y + 1.4, 1.75), M["city"], rotation=(math.pi / 2, 0, 0))
    # Foreground towers between the wall and the skyline, for depth.
    towers = []
    for i, (x, w, h) in enumerate([(-1.7, 0.5, 1.9), (-0.9, 0.36, 1.45), (0.25, 0.42, 1.25), (1.0, 0.55, 1.75), (1.9, 0.4, 1.5)]):
        towers.append(box(f"tower_{i}", (w, 0.3, h), (x, WALL_Y + 0.75 + i * 0.05, h / 2), M["black_soft"]))
        for z in np.arange(0.35, h - 0.1, 0.16):
            for dx in (-w * 0.3, 0, w * 0.3):
                if random.random() < 0.55:
                    towers.append(box(f"tw_{i}_{z:.2f}_{dx:.2f}", (0.04, 0.02, 0.06), (x + dx, WALL_Y + 0.6 + i * 0.05, z), random.choice([M["neon_yellow"], M["led"], M["neon_pink"]])))
    join(towers, "towers")
    # Billboard lettering glows far softer than the room neon: at neon strength the bloom
    # swallowed the letters and VUK STUDIO could not be read. The edge rails are white on
    # every board, the thin bright line Medical Time already had.
    sign_yellow = material("sign_yellow", rgb(HEX["yellow"]), emission=rgb(HEX["yellow"]), strength=2.2)
    sign_cyan = material("sign_cyan", rgb(HEX["cyan"]), emission=rgb(HEX["cyan"]), strength=2.2)
    billboards = [
        ("billboard_1", "MEDICAL TIME", M["neon_pink"], 0.75, 1.55, 0.5),
        ("billboard_2", "MANGO", sign_yellow, -0.8, 1.68, 0.36),
        # Between the centre mullion and the Medical Time pole: at x=0.05 the mullion hid the "V",
        # further right the pole crossed the "D".
        ("billboard_3", "VUK STUDIO", sign_cyan, 0.33, 1.25, 0.5),
    ]
    def pole(name, x, y, top):
        # Down to just behind the window's bottom rail (top at z=1.11), no further: a fixed
        # 0.5 m ran through the wall, and the hover outline, which draws hidden edges,
        # showed the poles inside the room.
        bottom = 1.08
        return box(f"{name}_pole", (0.02, 0.02, top - bottom), (x, y + 0.03, (top + bottom) / 2), M["grey"])

    for i, (name, label, mat, x, z, w) in enumerate(billboards):
        y = WALL_Y + 0.55 + i * 0.05
        if name == "billboard_1":
            # Medical Time wordmark colours: "Medical" in light grey, "Time" in gold.
            w, gap = 0.62, 0.012
            size = w * 0.15
            parts = [
                box(f"{name}_panel", (w, 0.02, w * 0.36), (x, y + 0.02, z), M["black_soft"], bevel=0.004),
                text(f"{name}_medical", "Medical", (x - 0.03 - gap, y, z), size, 0.004, M["neon_white"], rotation=(math.pi / 2, 0, 0), align="RIGHT"),
                text(f"{name}_time", "Time", (x - 0.03 + gap, y, z), size, 0.004, M["neon_gold"], rotation=(math.pi / 2, 0, 0), align="LEFT"),
                box(f"{name}_edge", (w + 0.02, 0.01, 0.006), (x, y, z + w * 0.18), M["neon_gold"]),
                box(f"{name}_edge2", (w + 0.02, 0.01, 0.006), (x, y, z - w * 0.18), M["neon_gold"]),
                pole(name, x, y, z - w * 0.18),
            ]
            join(parts, name)
            continue
        parts = [
            box(f"{name}_panel", (w, 0.02, w * 0.4), (x, y + 0.02, z), M["black_soft"], bevel=0.004),
            text(f"{name}_text", label, (x, y, z), w * 0.16, 0.004, mat, rotation=(math.pi / 2, 0, 0)),
            box(f"{name}_edge", (w + 0.02, 0.01, 0.006), (x, y, z + w * 0.2), M["neon_white"]),
            box(f"{name}_edge2", (w + 0.02, 0.01, 0.006), (x, y, z - w * 0.2), M["neon_white"]),
            pole(name, x, y, z - w * 0.2),
        ]
        join(parts, name)
    # Blinds with a cord.
    slats = []
    for i in range(7):
        slats.append(box(f"slat_{i}", (2.62, 0.05, 0.03), (0, WALL_Y - 0.09, 2.28 - i * 0.075), M["grey"], rotation=(math.radians(18), 0, 0)))
    slats.append(box("blind_rail", (2.66, 0.06, 0.04), (0, WALL_Y - 0.09, 2.34), M["grey"]))
    slats.append(cylinder("blind_cord", 0.003, 0.75, (1.25, WALL_Y - 0.09, 1.95), M["paper"]))
    join(slats, "blinds")

    # ---------------- Neon name sign ----------------
    # The dark glass backing with its metal rim is the BlendSwap neon sign model; the tubes
    # are drawn here in its style: the logo palm in cyan, the name on two lines in pink.
    # k scales the whole sign; the layout below is for a 1.14 m wide panel.
    sign_z, k = 2.6, 0.9
    asset("neon_sign", "neon_panel", (0, WALL_Y - 0.03, sign_z - 0.272 * k), scale=k, part="panel")
    tube_y = WALL_Y - 0.06
    neon_tubes("neon_border", [PALM], (-0.481 * k, sign_z - 0.13 * k), 0.26 * k, tube_y, M["neon_cyan"])
    name_x, letter = -0.0775 * k, 0.13 * k
    first = neon_tubes("neon_first", [NEON_GLYPHS[c] for c in "NIKOLA"], (name_x, sign_z + 0.035 * k), letter, tube_y, M["neon_pink"])
    last = neon_tubes("neon_last", [NEON_GLYPHS[c] for c in "ŠEPIĆ"], (name_x, sign_z - 0.035 * k - letter), letter, tube_y, M["neon_pink"])
    join([first, last], "neon_sign")

    # ---------------- Desk ----------------
    box("desk_top", (2.4, 0.9, 0.05), (0, 1.6, 0.755), M["desk"], bevel=0.015, segments=3)
    box("desk_edge", (2.4, 0.9, 0.02), (0, 1.6, 0.72), M["desk_edge"])
    for x in (-1.12, 1.12):
        box(f"desk_leg_{'l' if x < 0 else 'r'}", (0.06, 0.8, 0.72), (x, 1.6, 0.36), M["desk_edge"])
    box("desk_drawer", (0.55, 0.75, 0.55), (0.82, 1.6, 0.44), M["desk_edge"], bevel=0.008)
    box("drawer_line", (0.5, 0.002, 0.004), (0.82, 1.22, 0.44), M["black"])
    box("drawer_handle_1", (0.18, 0.02, 0.02), (0.82, 1.215, 0.55), M["chrome"], bevel=0.004)
    box("drawer_handle_2", (0.18, 0.02, 0.02), (0.82, 1.215, 0.33), M["chrome"], bevel=0.004)
    box("desk_mat", (0.9, 0.42, 0.004), (0, 1.32, 0.782), M["black_soft"], bevel=0.003)
    box("desk_led", (2.3, 0.012, 0.012), (0, 1.16, 0.715), M["neon_pink"])
    box("desk_led_back", (2.3, 0.012, 0.012), (0, 2.04, 0.715), M["neon_violet"])

    # ---------------- Computer (BlendSwap retro computer) ----------------
    # CRT monitor, tower and keyboard from one model; the screen is its own part so the web
    # app can put the animated texture on it. Monitor and screen share an origin.
    desk_top = 0.78
    asset("retro_computer", "monitor", (-0.05, 1.78, desk_top), part="monitor")
    asset("retro_computer", "monitor_screen", (-0.05, 1.78, desk_top), part="screen")
    asset("retro_computer", "computer_case", (0.3, 1.76, desk_top), part="tower")
    asset("retro_computer", "keyboard", (-0.03, 1.3, 0.784), part="keyboard")  # on the desk mat
    tube("keyboard_cable", [(0.12, 1.39, 0.785), (0.14, 1.46, 0.785), (0.2, 1.52, 0.785), (0.24, 1.57, 0.79)], 0.004, M["black"])

    # ---------------- Mouse ----------------
    mouse = [
        box("mouse_body", (0.062, 0.105, 0.036), (0.42, 1.3, 0.798), M["beige"], bevel=0.016, segments=4, smooth=True),
        box("mouse_split", (0.002, 0.045, 0.004), (0.42, 1.27, 0.817), M["black"]),
        box("mouse_line", (0.05, 0.002, 0.004), (0.42, 1.293, 0.817), M["black"]),
    ]
    join(mouse, "mouse")
    tube("mouse_cable", [(0.42, 1.35, 0.79), (0.4, 1.42, 0.786), (0.3, 1.5, 0.785), (0.27, 1.53, 0.79)], 0.003, M["black"])

    # ---------------- Floppy disks (CV) ----------------
    stack = []
    for i in range(4):
        rot = (0, 0, math.radians(-10 + i * 6))
        z = 0.782 + i * 0.0045
        stack.append(box(f"floppy_{i}", (0.09, 0.093, 0.0035), (-0.5 + i * 0.005, 1.4 + i * 0.004, z), M["black"] if i % 2 else M["grey"], rotation=rot, bevel=0.001))
        stack.append(box(f"floppy_label_{i}", (0.06, 0.032, 0.001), (-0.5 + i * 0.005, 1.425 + i * 0.004, z + 0.0022), M["paper"], rotation=rot))
        stack.append(box(f"floppy_shutter_{i}", (0.032, 0.026, 0.001), (-0.495 + i * 0.005, 1.375 + i * 0.004, z + 0.0022), M["chrome"], rotation=rot))
    stack.append(text("floppy_text", "CV", (-0.486, 1.437, 0.8035), 0.014, 0.0005, M["black"], rotation=(0, 0, math.radians(8))))
    join(stack, "floppy")

    # ---------------- Framed photo on the desk (CV) ----------------
    fx, fy, fz = -0.55, 1.62, 0.775
    frame = asset("standing_picture_frame_01", "photo", (fx, fy, fz), rotation_z=math.radians(18 - 90), scale=0.85)
    # The glass pane renders as an opaque dark sheet in Eevee and hides the photo: drop it.
    glass = [i for i, m in enumerate(frame.data.materials) if m and m.name.endswith("_glass")]
    bm = bmesh.new()
    bm.from_mesh(frame.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if f.material_index in glass], context="FACES")
    bm.to_mesh(frame.data)
    bm.free()
    # The model faces +X; turned -90 degrees it faces the camera, plus 18 towards the room.
    # Swap the stock artwork for the portrait; the artwork UVs cover the picture opening.
    for slot in frame.material_slots:
        if slot.material and slot.material.name.endswith("_artwork"):
            nodes = slot.material.node_tree.nodes
            for node in nodes:
                if node.type == "TEX_IMAGE" and "diff" in (node.image.name if node.image else ""):
                    node.image = photo_img
            bsdf = nodes.get("Principled BSDF")
            if bsdf:
                bsdf.inputs["Emission Strength"].default_value = 0.25
                for node in nodes:
                    if node.type == "TEX_IMAGE" and node.image is photo_img:
                        slot.material.node_tree.links.new(node.outputs["Color"], bsdf.inputs["Emission Color"])

    # ---------------- Pixel-art cat asleep on the desk ----------------
    V = 0.022
    cat_parts = []
    voxels = []
    for x in range(-5, 4):
        for y in range(-2, 3):
            for z in range(0, 3):
                edge = abs(y) == 2 or x in (-5, 3)
                if z == 2 and edge:
                    continue
                col = "cat_dark" if (x % 3 == 0 and z == 2) else "cat"
                if z == 0 and abs(y) <= 1 and -3 <= x <= 1:
                    col = "cat_white"
                voxels.append((x, y, z, col))
    for x in range(4, 8):
        for y in range(-2, 3):
            for z in range(0, 4):
                if (abs(y) == 2 and z in (0, 3)) or (x == 7 and z == 3):
                    continue
                col = "cat"
                if z == 1 and x == 7 and abs(y) <= 1:
                    col = "cat_white"
                voxels.append((x, y, z, col))
    voxels += [(5, -2, 4, "cat"), (5, 2, 4, "cat"), (5, -2, 5, "cat_dark"), (5, 2, 5, "cat_dark")]
    voxels += [(8, -1, 1, "cat_dark"), (8, 1, 1, "cat_dark"), (8, 0, 1, "cat_pink")]
    for i, (x, y) in enumerate([(-6, 1), (-7, 2), (-7, 3), (-6, 4), (-5, 4)]):
        voxels.append((x, y, 0, "cat_dark" if i % 2 else "cat"))
    voxels += [(2, -2, 0, "cat_white"), (2, 2, 0, "cat_white"), (3, -2, 0, "cat_white"), (3, 2, 0, "cat_white")]
    cx, cy, cz = 0.5, 1.82, 0.78 + V / 2
    for i, (x, y, z, col) in enumerate(voxels):
        cat_parts.append(box(f"cat_{i}", (V, V, V), (cx + x * V, cy + y * V, cz + z * V), M[col]))
    cat = join(cat_parts, "cat")
    cat.rotation_euler = (0, 0, math.radians(-20))

    # ---------------- Rotary phone (contact) ----------------
    # A 1970s desk phone in glossy pastel pink: a tapered, rounded body on a low plinth, a
    # tilted rotary dial with a chrome finger wheel, and the handset resting on two prongs.
    phone_y = 1.72
    px = -0.98
    plastic = M["phone_plastic"]
    body = tapered_box("phone_body", (0.22, 0.2), (0.17, 0.14, 0.025), 0.085, (px, phone_y, 0.79), plastic, bevel=0.026)
    ph = [
        body,
        box("phone_plinth", (0.235, 0.215, 0.018), (px, phone_y, 0.781), M["black"], bevel=0.006, segments=2),
    ]
    # Dial on the sloped front face, its axis along the face normal.
    slope = math.atan2(0.085, 0.055)  # body height over how far the front leans back
    tilt = (slope, 0, 0)
    face = Vector((px, phone_y - 0.0725, 0.8325))
    normal = Vector((0, -math.sin(slope), math.cos(slope)))

    def on_face(lift, dx=0.0, dy=0.0):
        """A point on the dial plane: dx across, dy up the slope, lifted along the normal."""
        up = Vector((0, math.cos(slope), math.sin(slope)))
        return tuple(face + normal * lift + Vector((dx, 0, 0)) + up * dy)

    ph += [
        cylinder("phone_dial_plate", 0.046, 0.004, on_face(0.003), M["paper"], rotation=tilt, vertices=40),
        cylinder("phone_finger_wheel", 0.044, 0.003, on_face(0.0065), M["chrome"], rotation=tilt, vertices=48),
        cylinder("phone_dial_center", 0.015, 0.005, on_face(0.009), plastic, rotation=tilt, vertices=24),
        box("phone_finger_stop", (0.004, 0.016, 0.004), on_face(0.008, 0.04, -0.012), M["chrome"], rotation=tilt),
    ]
    for i in range(10):
        a = math.radians(-50 - i * 28)
        ph.append(cylinder(f"phone_hole_{i}", 0.0068, 0.004, on_face(0.0075, 0.03 * math.cos(a), 0.03 * math.sin(a)), M["black"], rotation=tilt, vertices=16))
    # Cradle prongs and the handset lying across them.
    hy, hz = phone_y + 0.05, 0.9
    for side in (-1, 1):
        ph.append(cylinder(f"phone_prong_{side}", 0.011, 0.03, (px + side * 0.055, hy, hz - 0.02), plastic, vertices=16))
        ph.append(sphere(f"phone_prong_cap_{side}", 0.012, (px + side * 0.055, hy, hz - 0.005), M["chrome"]))
    ph.append(tube("phone_handset", [(px - 0.115, hy, hz + 0.012), (px - 0.06, hy, hz + 0.03), (px, hy, hz + 0.034), (px + 0.06, hy, hz + 0.03), (px + 0.115, hy, hz + 0.012)], 0.016, plastic, resolution=8))
    for side, name in ((-1, "ear"), (1, "mouth")):
        cup = (px + side * 0.12, hy, hz + 0.004)
        ph.append(cylinder(f"phone_{name}", 0.034, 0.03, cup, plastic, vertices=32, bevel=0.01))
        ph.append(cylinder(f"phone_{name}_grille", 0.022, 0.004, (cup[0], cup[1], cup[2] - 0.016), M["black_soft"], vertices=24))
    # Coiled cord from the mouthpiece down the side of the body.
    coil = []
    for k in range(60):
        t = k / 59
        a = t * math.pi * 14
        coil.append((px + 0.14 + 0.009 * math.cos(a), hy - 0.01 + t * 0.07, hz - 0.01 - t * 0.1 + 0.009 * math.sin(a)))
    ph.append(tube("phone_cord", coil, 0.0028, plastic, resolution=3))
    ph.append(tube("phone_line", [(px, phone_y + 0.1, 0.79), (px, 1.95, 0.79), (px + 0.02, 2.05, 0.75), (px + 0.03, 2.06, 0.2)], 0.003, M["black"]))
    join(ph, "phone")

    # ---------------- Desk lamp ----------------
    base = (0.95, 1.85, 0.80)
    j1 = (0.84, 1.78, 1.24)
    j2 = (0.66, 1.66, 1.22)
    head_dir = (-0.45, -0.35, -1.0)
    head_tip = (0.6, 1.6, 1.13)
    lamp = [
        cylinder("lamp_base", 0.09, 0.022, (base[0], base[1], 0.791), M["black"], vertices=32, bevel=0.004),
        sphere("lamp_joint_0", 0.02, base, M["chrome"]),
        segment("lamp_arm", base, j1, 0.011, M["black"]),
        sphere("lamp_joint_1", 0.02, j1, M["chrome"]),
        segment("lamp_arm_2", j1, j2, 0.011, M["black"]),
        sphere("lamp_joint_2", 0.018, j2, M["chrome"]),
        segment("lamp_neck", j2, (0.63, 1.63, 1.19), 0.009, M["black"]),
        cone_toward("lamp_head", 0.1, 0.035, 0.15, head_tip, head_dir, M["black"]),
        box("lamp_switch", (0.012, 0.02, 0.008), (1.0, 1.8, 0.806), M["neon_red"]),
    ]
    join(lamp, "lamp")
    bulb_pos = (head_tip[0] + 0.03, head_tip[1] + 0.025, head_tip[2] + 0.06)
    sphere("lamp_bulb", 0.03, bulb_pos, M["bulb"])
    # Mug with handle.
    mug = [
        cylinder("mug_body", 0.04, 0.1, (0.62, 1.45, 0.83), M["neon_violet"], vertices=24, bevel=0.005),
        torus("mug_handle", 0.028, 0.007, (0.66, 1.45, 0.835), M["neon_violet"], rotation=(math.pi / 2, 0, 0), major_segments=20, minor_segments=8),
        cylinder("mug_coffee", 0.036, 0.004, (0.62, 1.45, 0.876), M["soil"], vertices=24),
    ]
    join(mug, "mug")

    # ---------------- Shelf, hi-fi, speaker, books, plant (about) ----------------
    # Shelf runs along the back wall, right of the window, at eye height.
    box("shelf", (1.5, 0.3, 0.03), (2.15, WALL_Y - 0.17, 1.55), M["wood"], bevel=0.004)
    box("shelf_bracket_1", (0.03, 0.26, 0.2), (1.5, WALL_Y - 0.15, 1.44), M["grey"])
    box("shelf_bracket_2", (0.03, 0.26, 0.2), (2.8, WALL_Y - 0.15, 1.44), M["grey"])
    box("shelf_led", (1.4, 0.012, 0.012), (2.15, WALL_Y - 0.31, 1.53), M["neon_cyan"])
    hx = -3.27

    cassettes = []
    for i in range(3):
        cassettes.append(box(f"cassette_{i}", (0.11, 0.07, 0.016), (hx, 1.7, 1.575 + i * 0.018), M["black"] if i != 1 else M["paper"], rotation=(0, 0, math.radians(-4 + i * 5)), bevel=0.002))
        cassettes.append(box(f"cassette_label_{i}", (0.09, 0.035, 0.002), (hx, 1.705, 1.584 + i * 0.018), M["note_1"] if i != 1 else M["neon_pink"], rotation=(0, 0, math.radians(-4 + i * 5))))
    cassettes_obj = join(cassettes, "cassettes")
    speaker = [
        box("speaker_box", (0.24, 0.24, 0.42), (hx + 0.02, 0.62, 1.78), M["black"], bevel=0.008),
        box("speaker_grille", (0.006, 0.21, 0.39), (hx + 0.142, 0.62, 1.78), M["black_soft"]),
        cylinder("speaker_woofer_ring", 0.08, 0.012, (hx + 0.146, 0.62, 1.69), M["grey"], rotation=(0, math.pi / 2, 0), vertices=32),
        sphere("speaker_woofer", 0.065, (hx + 0.14, 0.62, 1.69), M["black"], scale=(0.4, 1, 1)),
        cylinder("speaker_tweeter", 0.03, 0.012, (hx + 0.146, 0.62, 1.9), M["grey"], rotation=(0, math.pi / 2, 0), vertices=24),
        box("speaker_led", (0.006, 0.01, 0.006), (hx + 0.148, 0.72, 1.6), M["led"]),
    ]
    speaker_obj = join(speaker, "speaker")
    books = []
    for i, (h, w, key) in enumerate([(0.24, 0.035, "book_1"), (0.21, 0.028, "book_2"), (0.26, 0.04, "book_3"), (0.2, 0.025, "book_4"), (0.23, 0.032, "book_5"), (0.22, 0.03, "book_1")]):
        yy = 1.86 + sum(b[1] for b in [(0.24, 0.035), (0.21, 0.028), (0.26, 0.04), (0.2, 0.025), (0.23, 0.032), (0.22, 0.03)][:i]) + i * 0.003
        lean = math.radians(0 if i < 5 else -14)
        books.append(box(f"book_{i}", (0.2, w, h), (hx, yy, 1.565 + h / 2), M[key], rotation=(lean, 0, 0), bevel=0.002))
        books.append(box(f"book_page_{i}", (0.19, w - 0.006, h - 0.012), (hx - 0.006, yy, 1.565 + h / 2), M["paper"], rotation=(lean, 0, 0)))
    books_obj = join(books, "books")

    # The set above was laid out along the left wall, facing +X, around x = hx.
    # Rotate it by -90 degrees so it faces the room from the back wall: (x, y) -> (y, -x).
    # A source point (hx, y0) lands at (y0, -hx); shift so y0 = 1.35 sits at x = 2.35 and
    # the row hugs the wall at WALL_Y - 0.17.
    for obj in (cassettes_obj, speaker_obj, books_obj):
        obj.rotation_euler = (0, 0, math.radians(-90))
        obj.location = (2.15 - 1.35, WALL_Y - 0.17 + hx, 0)
    shelf_top = 1.565
    asset("boombox", "hifi", (2.1, WALL_Y - 0.19, shelf_top), rotation_z=0.0, scale=0.55)
    asset("potted_plant_04", "plant", (1.72, WALL_Y - 0.17, shelf_top), scale=1.25)

    # ---------------- Diploma and certificates (education) ----------------
    dx, dz = -2.15, 2.0
    frames = [
        box("diploma_frame", (0.56, 0.03, 0.42), (dx, WALL_Y - 0.02, dz), M["wood"], bevel=0.008),
        box("diploma_mat", (0.5, 0.012, 0.36), (dx, WALL_Y - 0.04, dz), M["paper"]),
        box("diploma_trim", (0.44, 0.004, 0.3), (dx, WALL_Y - 0.047, dz), M["gold"]),
        box("diploma_paper", (0.42, 0.004, 0.28), (dx, WALL_Y - 0.05, dz), M["paper"]),
        text("diploma_t1", "UNIVERZITET SINGIDUNUM", (dx, WALL_Y - 0.055, dz + 0.1), 0.024, 0.001, M["black"], rotation=(math.pi / 2, 0, 0)),
        text("diploma_t2", "DIPLOMA", (dx, WALL_Y - 0.055, dz + 0.045), 0.05, 0.001, M["black"], rotation=(math.pi / 2, 0, 0)),
        text("diploma_t3", "Nikola Šepić", (dx, WALL_Y - 0.055, dz - 0.015), 0.03, 0.001, M["black"], rotation=(math.pi / 2, 0, 0)),
        text("diploma_t4", "Informacione tehnologije, 2024", (dx, WALL_Y - 0.055, dz - 0.06), 0.017, 0.001, M["black"], rotation=(math.pi / 2, 0, 0)),
        cylinder("diploma_seal", 0.026, 0.005, (dx + 0.14, WALL_Y - 0.055, dz - 0.1), M["gold"], rotation=(math.pi / 2, 0, 0), vertices=24),
        box("diploma_ribbon", (0.014, 0.004, 0.05), (dx + 0.132, WALL_Y - 0.056, dz - 0.13), M["neon_red"], rotation=(0, math.radians(12), 0)),
        box("diploma_ribbon2", (0.014, 0.004, 0.05), (dx + 0.15, WALL_Y - 0.056, dz - 0.13), M["neon_red"], rotation=(0, math.radians(-12), 0)),
        box("diploma_line", (0.2, 0.004, 0.002), (dx - 0.08, WALL_Y - 0.055, dz - 0.1), M["black"]),
    ]
    certs = [("REACT", "Udemy 2024"), ("JAVASCRIPT", "Udemy 2023"), ("RESPONSIVE WEB", "freeCodeCamp 2023")]
    for i, (label, org) in enumerate(certs):
        cx = dx - 0.34 + i * 0.34
        cz = 1.56
        frames.append(box(f"cert_frame_{i}", (0.3, 0.03, 0.22), (cx, WALL_Y - 0.02, cz), M["black"], bevel=0.006))
        frames.append(box(f"cert_mat", (0.26, 0.012, 0.18), (cx, WALL_Y - 0.04, cz), M["paper"]))
        frames.append(box(f"cert_trim_{i}", (0.23, 0.004, 0.15), (cx, WALL_Y - 0.047, cz), M["gold"]))
        frames.append(box(f"cert_paper_{i}", (0.215, 0.004, 0.135), (cx, WALL_Y - 0.05, cz), M["paper"]))
        frames.append(text(f"cert_t0_{i}", "CERTIFICATE", (cx, WALL_Y - 0.055, cz + 0.045), 0.013, 0.001, M["grey"], rotation=(math.pi / 2, 0, 0)))
        frames.append(text(f"cert_t1_{i}", label, (cx, WALL_Y - 0.055, cz + 0.012), 0.022, 0.001, M["black"], rotation=(math.pi / 2, 0, 0)))
        frames.append(text(f"cert_t2_{i}", org, (cx, WALL_Y - 0.055, cz - 0.022), 0.013, 0.001, M["grey"], rotation=(math.pi / 2, 0, 0)))
        frames.append(box(f"cert_line_{i}", (0.12, 0.004, 0.002), (cx, WALL_Y - 0.055, cz - 0.045), M["gold"]))
    join(frames, "diploma")
    # Picture light over the diploma.
    box("picture_light", (0.5, 0.05, 0.03), (dx, WALL_Y - 0.06, dz + 0.27), M["chrome"], bevel=0.008)
    box("picture_light_glow", (0.44, 0.02, 0.006), (dx, WALL_Y - 0.075, dz + 0.24), M["bulb"])

    # ---------------- Posters and clock on the left wall ----------------
    poster = [
        plane("poster_1_bg", (0.55, 0.75), (-2.65, WALL_Y - 0.03, 2.55), M["black_soft"], rotation=(math.pi / 2, 0, 0)),
        cylinder("poster_1_sun", 0.16, 0.004, (-2.65, WALL_Y - 0.035, 2.68), M["neon_sun"], rotation=(math.pi / 2, 0, 0), vertices=40),
        text("poster_1_text", "BEOGRAD", (-2.65, WALL_Y - 0.04, 2.4), 0.075, 0.002, M["neon_pink"], rotation=(math.pi / 2, 0, 0)),
        text("poster_1_text2", "NIGHT DRIVE", (-2.65, WALL_Y - 0.04, 2.3), 0.05, 0.002, M["neon_cyan"], rotation=(math.pi / 2, 0, 0)),
    ]
    for i in range(4):
        poster.append(box(f"poster_1_stripe_{i}", (0.3 - i * 0.03, 0.004, 0.012), (-2.65, WALL_Y - 0.037, 2.6 - i * 0.03), M["black_soft"]))
    join(poster, "poster_1")
    text("wall_neon_error", "ERROR", (2.15, WALL_Y - 0.05, 2.5), 0.26, 0.012, M["neon_error"], rotation=(math.pi / 2, 0, 0), bevel=0.003)
    box("wall_neon_bracket", (0.02, 0.04, 0.5), (1.65, WALL_Y - 0.03, 2.5), M["grey"])
    box("wall_neon_bracket2", (0.02, 0.04, 0.5), (2.65, WALL_Y - 0.03, 2.5), M["grey"])
    clock = [
        cylinder("clock_face", 0.14, 0.03, (3.1, WALL_Y - 0.02, 2.5), M["black"], rotation=(math.pi / 2, 0, 0), vertices=40),
        cylinder("clock_dial", 0.125, 0.004, (3.1, WALL_Y - 0.04, 2.5), M["paper"], rotation=(math.pi / 2, 0, 0), vertices=40),
        box("clock_hand_h", (0.006, 0.004, 0.07), (3.1, WALL_Y - 0.045, 2.535), M["black"]),
        box("clock_hand_m", (0.1, 0.004, 0.006), (3.15, WALL_Y - 0.045, 2.5), M["black"]),
        box("clock_hand_s", (0.11, 0.003, 0.003), (3.05, WALL_Y - 0.047, 2.51), M["neon_red"], rotation=(0, 0, math.radians(35))),
    ]
    join(clock, "clock")

    # ---------------- Chair (BlendSwap office chair) ----------------
    # Pulled out at the front right corner of the desk, turned towards it, as if just left.
    asset("office_chair", "chair", (0.95, 0.8, 0), rotation_z=math.radians(-25), part="chair")

    # ---------------- Gym corner and reading (about) ----------------
    # Bright rubber colours with a faint glow: in black they vanished against the dark floor.
    gym_pink = material("gym_pink", rgb(HEX["pink"]), roughness=0.7, emission=rgb(HEX["pink"]), strength=0.6)
    gym_cyan = material("gym_cyan", rgb(HEX["cyan"]), roughness=0.7, emission=rgb(HEX["cyan"]), strength=0.5)
    gym_yellow = material("gym_yellow", rgb(HEX["yellow"]), roughness=0.6, emission=rgb(HEX["yellow"]), strength=0.5)
    gym_violet = material("gym_violet", rgb(HEX["violet"]), roughness=0.9, emission=rgb(HEX["violet"]), strength=0.6)
    gym = []
    for i, (gx, gy, rot) in enumerate([(1.95, 1.7, 0), (1.95, 1.85, math.radians(6))]):
        gym.append(cylinder(f"db_bar_{i}", 0.012, 0.3, (gx, gy, 0.045), M["chrome"], rotation=(0, math.pi / 2, rot), vertices=12))
        for side in (-1, 1):
            gym.append(cylinder(f"db_plate_{i}_{side}", 0.045, 0.035, (gx + side * 0.11, gy, 0.045), gym_pink, rotation=(0, math.pi / 2, rot), vertices=24))
            gym.append(cylinder(f"db_plate2_{i}_{side}", 0.035, 0.03, (gx + side * 0.145, gy, 0.045), gym_cyan, rotation=(0, math.pi / 2, rot), vertices=24))
    gym.append(sphere("kettlebell_body", 0.09, (2.35, 1.6, 0.09), gym_yellow, scale=(1, 1, 0.9)))
    gym.append(torus("kettlebell_handle", 0.06, 0.013, (2.35, 1.6, 0.2), gym_yellow, rotation=(math.pi / 2, 0, 0), major_segments=20, minor_segments=8))
    gym.append(text("kettlebell_kg", "16", (2.35, 1.51, 0.1), 0.035, 0.002, M["black"], rotation=(math.pi / 2, 0, 0)))
    gym.append(cylinder("yoga_mat", 0.075, 0.62, (2.4, 2.55, 0.075), gym_violet, rotation=(0, math.pi / 2, math.radians(10)), vertices=24))
    gym.append(cylinder("yoga_mat_core", 0.03, 0.64, (2.4, 2.55, 0.075), gym_pink, rotation=(0, math.pi / 2, math.radians(10)), vertices=16))
    join(gym, "gym")
    # Open book on the desk (BlendSwap).
    asset("open_book", "book_open", (-0.92, 1.27, 0.78), rotation_z=math.radians(15), part="book")
    headphones = [
        torus("hp_band", 0.075, 0.008, (-0.45, 1.22, 0.86), M["black"], rotation=(0, math.pi / 2, 0), major_segments=28, minor_segments=8),
        cylinder("hp_cup_l", 0.038, 0.03, (-0.45, 1.145, 0.86), M["black"], rotation=(math.pi / 2, 0, 0), vertices=24),
        cylinder("hp_cup_r", 0.038, 0.03, (-0.45, 1.295, 0.86), M["black"], rotation=(math.pi / 2, 0, 0), vertices=24),
        cylinder("hp_pad_l", 0.034, 0.012, (-0.45, 1.165, 0.86), M["neon_pink"], rotation=(math.pi / 2, 0, 0), vertices=24),
        cylinder("hp_pad_r", 0.034, 0.012, (-0.45, 1.275, 0.86), M["neon_pink"], rotation=(math.pi / 2, 0, 0), vertices=24),
    ]
    hp = join(headphones, "headphones")
    hp.rotation_euler = (math.radians(90), 0, math.radians(20))
    hp.location = (-0.42, 1.2, 0.78)

    # ---------------- Cables ----------------
    tube("cable_1", [(-0.2, 1.97, 0.79), (-0.22, 2.03, 0.7), (-0.25, 2.04, 0.3), (-0.3, 2.0, 0.05)], 0.005, M["black"])
    tube("cable_2", [(0.95, 1.95, 0.79), (0.98, 2.03, 0.6), (1.0, 2.04, 0.1)], 0.004, M["black"])

    # ---------------- Lights (only point/spot survive glTF export) ----------------
    def light(name, kind, color, energy, location, rotation=(0, 0, 0), size=1.0):
        data = bpy.data.lights.new(name, kind)
        data.color = color[:3]
        data.energy = energy
        if kind == "AREA":
            data.size = size
        obj = bpy.data.objects.new(name, data)
        obj.location = location
        obj.rotation_euler = rotation
        scene.collection.objects.link(obj)
        return obj

    light("light_window", "AREA", rgb(HEX["cyan"]), 120, (0, WALL_Y - 0.3, 1.7), rotation=(math.pi / 2, 0, 0), size=2.4)
    light("light_neon", "AREA", rgb(HEX["pink"]), 60, (0, WALL_Y - 0.3, 2.6), rotation=(math.pi / 2, 0, 0), size=1.0)
    light("light_lamp", "POINT", rgb("ffd9a0"), 25, (bulb_pos[0] - 0.03, bulb_pos[1] - 0.03, bulb_pos[2] - 0.07))
    light("light_screen", "AREA", rgb("ff6fb0"), 18, (0, 1.45, 1.12), rotation=(math.pi / 2, 0, 0), size=0.35)
    # Render-only fill for the shelf and the left of the desk: the web scene lights them with
    # its own lights, and glTF does not export area lights, so these only affect preview.png.
    light("light_shelf", "AREA", rgb(HEX["pink"]), 45, (1.7, 1.9, 2.0), rotation=(math.pi / 2, 0, 0), size=1.4)
    light("light_desk_left", "AREA", rgb("ffd9a0"), 14, (-0.9, 1.5, 1.45), size=0.7)
    light("light_fill", "AREA", rgb(HEX["violet"]), 30, (-2.2, -0.5, 2.6), rotation=(math.radians(60), 0, math.radians(-40)), size=3)

    cam_data = bpy.data.cameras.new("camera")
    cam_data.lens = 32
    cam = bpy.data.objects.new("camera", cam_data)
    cam.location = (1.1, -2.0, 1.7)
    target = Vector((0.4, 1.7, 1.35))
    cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.collection.objects.link(cam)
    scene.camera = cam
    return scene


PREVIEW_SIZE = (2560, 1440)


def hotspot_labels():
    """Reads the point each hotspot camera looks at from lib/hotspots.ts (three.js, Y up)."""
    import re

    source = open(os.path.join(HERE, "..", "lib", "hotspots.ts"), encoding="utf-8").read()
    pattern = re.compile(r'id: "(\w+)".*?look: \[([-\d., ]+)\]', re.S)
    return {m.group(1): [float(v) for v in m.group(2).split(",")] for m in pattern.finditer(source)}


def hotspot_cameras():
    """Camera position and look-at point per hotspot from lib/hotspots.ts (three.js, Y up)."""
    import re

    source = open(os.path.join(HERE, "..", "lib", "hotspots.ts"), encoding="utf-8").read()
    num = r"\[([-\d., ]+)\]"
    pattern = re.compile(r'id: "(\w+)".*?href: ([^,]+),.*?camera: ' + num + r".*?look: " + num, re.S)
    parse = lambda text: [float(v) for v in text.split(",")]
    return {
        m.group(1): (parse(m.group(3)), parse(m.group(4)))
        for m in pattern.finditer(source)
        if m.group(2).strip() != "null"
    }


def three_to_blender(p):
    x, y, z = p
    return Vector((x, -z, y))


TOUR_SIZE = (1080, 1920)
# The flight is in motion while it plays, so half resolution is enough and keeps it light.
FLY_SIZE = (540, 960)
# 48 frames: at 24 a finger flick skipped visibly large steps between renders on phones.
FLY_FRAMES = 48
# Hand-framed tour shots (three.js position, look-at, lens) where the automatic front view
# misses: all three billboards in view, the whole shelf centred, the photo with the floppies.
TOUR_FRAMING = {
    "clients": ((0.04, 1.78, -1.0), (0.04, 1.45, -3.6), 15),
    "about": ((2.08, 1.52, -0.8), (2.08, 1.45, -2.83), 20),
    "cv": ((-0.58, 1.22, -0.98), (-0.58, 0.86, -1.55), 30),
    "contact": ((-0.98, 1.1, -1.28), (-0.98, 0.86, -1.72), 30),
}


def tour_shots():
    """Every phone tour camera as {name: (three.js position, look-at, lens)}, overview first."""
    shots = {"overview": ((0.3, 1.55, 0.9), (0.15, 1.5, -2.5), 15)}
    for spot, (position, look) in hotspot_cameras().items():
        # Straight on from the front (+z in three.js), at a distance based on how close the
        # web camera gets. Things on the desk are seen slightly from above, wall pieces level.
        p, t = Vector(position), Vector(look)
        distance = (p - t).length * 1.3
        rise = 0.3 if t.y < 1.3 else 0.03
        shots[spot] = ((t.x, t.y + rise * distance, t.z + distance), tuple(t), 30)
    shots.update(TOUR_FRAMING)
    return shots


def tour_camera(scene):
    """A portrait camera for the tour, and a function that points it at one shot."""
    data = bpy.data.cameras.new("camera_tour")
    data.sensor_fit = "VERTICAL"
    cam = bpy.data.objects.new("camera_tour", data)
    scene.collection.objects.link(cam)
    scene.camera = cam

    def aim(position, look, lens):
        data.lens = lens
        cam.location = three_to_blender(position)
        target = three_to_blender(look)
        cam.rotation_euler = (target - cam.location).to_track_quat("-Z", "Y").to_euler()

    return cam, aim


def render_tour(scene):
    """Portrait stills for the phone tour, sharp at phone resolution instead of a zoomed crop."""
    cam, aim = tour_camera(scene)
    shots = tour_shots()

    overview_points = None
    for name, (position, look, lens) in shots.items():
        aim(position, look, lens)
        if name == "overview":
            bpy.context.view_layer.update()
            overview_points = project_hotspots(scene, cam, TOUR_SIZE)
        render_preview(scene, os.path.join(OUT, f"tour_{name}.png"), TOUR_SIZE)

    # The flight from the overview to each close-up, as a short frame sequence the page
    # scrubs with scroll. Its last frame matches the close-up still, so the sharp still can
    # take over without a visible cut.
    if os.environ.get("ROOM_FLY", "1") == "0":
        return overview_points  # quick iterations on framing skip the ~4 minute sequences
    fly = os.path.join(OUT, "fly")
    os.makedirs(fly, exist_ok=True)
    start_pos, start_look = Vector(shots["overview"][0]), Vector(shots["overview"][1])
    start_lens = shots["overview"][2]
    for name, (position, look, lens) in shots.items():
        if name == "overview":
            continue
        end_pos, end_look = Vector(position), Vector(look)
        for k in range(FLY_FRAMES):
            t = k / (FLY_FRAMES - 1)
            t = t * t * (3 - 2 * t)  # ease in and out
            aim(start_pos.lerp(end_pos, t), start_look.lerp(end_look, t), start_lens + (lens - start_lens) * t)
            render_preview(scene, os.path.join(fly, f"{name}_{k:02d}.png"), FLY_SIZE)
    return overview_points


def project_hotspots(scene, cam, size):
    """Each hotspot focus point on the rendered image, as percent from the top left."""
    from bpy_extras.object_utils import world_to_camera_view

    # The projection uses the render aspect ratio, so match the image it describes.
    scene.render.resolution_x, scene.render.resolution_y = size
    out = {}
    for spot, (x, y, z) in hotspot_labels().items():
        # three.js (x, y, z) with Y up is Blender (x, -z, y) with Z up.
        v = world_to_camera_view(scene, cam, Vector((x, -z, y)))
        out[spot] = {"x": round(v.x * 100, 1), "y": round((1 - v.y) * 100, 1)}
    return out


def setup_bloom(scene):
    """Compositor bloom, so the neon glows into the air around it like on the web (Eevee
    lost its own bloom in 4.2). Blender 5 compositors are node groups with an Image output."""
    if scene.compositing_node_group is not None:
        return
    tree = bpy.data.node_groups.new("bloom", "CompositorNodeTree")
    tree.interface.new_socket("Image", in_out="OUTPUT", socket_type="NodeSocketColor")
    layers = tree.nodes.new("CompositorNodeRLayers")
    glare = tree.nodes.new("CompositorNodeGlare")
    out = tree.nodes.new("NodeGroupOutput")
    settings = {
        "Type": "Bloom",
        "Quality": "High",
        # Only the emissive tubes, screens and bulbs sit above this in scene linear.
        "Threshold": 1.2,
        "Smoothness": 0.3,
        "Strength": 0.9,
        "Saturation": 1.3,
        "Size": 0.7,
    }
    for key, value in settings.items():
        glare.inputs[key].default_value = value
    tree.links.new(layers.outputs["Image"], glare.inputs["Image"])
    tree.links.new(glare.outputs["Image"], out.inputs[0])
    scene.compositing_node_group = tree
    scene.render.use_compositing = True


def render_preview(scene, path, size=PREVIEW_SIZE):
    setup_bloom(scene)
    for engine in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
        try:
            scene.render.engine = engine
            break
        except TypeError:
            continue
    scene.render.resolution_x, scene.render.resolution_y = size
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.filepath = path
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Punchy"
    if scene.world is not None:
        bpy.ops.render.render(write_still=True)
        return
    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    world.node_tree.nodes["Background"].inputs["Color"].default_value = rgb("07030f")
    world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.6
    scene.world = world
    bpy.ops.render.render(write_still=True)


def export_gltf(path):
    bpy.ops.object.select_all(action="SELECT")
    kwargs = dict(
        filepath=path,
        export_format="GLB",
        export_apply=True,
        export_lights=True,
        export_cameras=False,
        export_yup=True,
        export_texcoords=True,
        export_normals=True,
        export_materials="EXPORT",
        export_image_format="AUTO",
        use_selection=False,
    )
    try:
        bpy.ops.export_scene.gltf(export_draco_mesh_compression_enable=True, **kwargs)
    except TypeError:
        bpy.ops.export_scene.gltf(**kwargs)


if __name__ == "__main__":
    scene = build()
    tris = sum(len(o.data.polygons) for o in scene.objects if o.type == "MESH")
    bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT, "room.blend"))
    export_gltf(os.path.join(OUT, "room.glb"))
    render_preview(scene, os.path.join(OUT, "preview.png"))
    import json

    landscape = project_hotspots(scene, scene.camera, PREVIEW_SIZE)
    tour = render_tour(scene)
    with open(os.path.join(OUT, "views.json"), "w") as fh:
        json.dump({"landscape": landscape, "tour": tour}, fh, indent=2)
    size = os.path.getsize(os.path.join(OUT, "room.glb"))
    print(f"ROOM_OK glb={size / 1024:.0f} KB objects={len(scene.objects)} faces={tris}")
