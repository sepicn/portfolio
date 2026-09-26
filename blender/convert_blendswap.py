"""
Converts the BlendSwap models used in the room from their original .blend files to glTF
in blender/assets/<slug>/<part>.gltf, so build_room.py can import them with asset().

The source files are not kept in the repo. Download them from the pages listed in
blender/assets/README.md into one folder, then run:
    blender -b -P blender/convert_blendswap.py -- <folder with the downloads> [slug ...]

For every part the script keeps the renderable meshes and bevelled curves, applies their
modifiers (subdivision, mirror, armature pose, geometry nodes), joins them, puts the origin
at the bottom centre, scales it to metres and swaps the materials for plain ones named
after the room palette. asset() then replaces those with the room's own materials, so the
imports match the procedural props. No textures from the sources are exported: the book's
page scans are pages of a published cookbook, which the CC0 declaration cannot cover.
"""

import os
import sys

import bpy
from mathutils import Matrix, Vector

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")
ARGS = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
SOURCES = ARGS[0] if ARGS else os.path.join(HERE, "sources")
# Optional slugs after the folder convert only those. Blender 5.2 can crash reopening a
# file after an export in the same session, so one model per run is the safe way.
ONLY = set(ARGS[1:])

# slug -> source file, the parts to export, how to scale them and the material mapping.
# parts: part -> (object names, or None for every renderable object not used by another
# part; the part whose origin it shares, so pieces modelled together stay aligned).
# scale: (part, axis, size in metres) measured after conversion; the same factor is used
# for every part of the model. decimate: part -> ratio of faces kept, for the web.
# materials: source material -> room palette name.
MODELS = {
    "retro_computer": {
        "file": "computer.blend",
        "parts": {
            "monitor": (["monitor"], "monitor"),
            "screen": (["monitor.001"], "monitor"),
            "tower": (["computer", "computer.001", "computer.002", "computer.003", "Cube.001", "a", "a2", "a3", "led"], "tower"),
            "keyboard": (["Cube"], "keyboard"),
        },
        "scale": ("monitor", 0, 0.42),
        "decimate": {"tower": 0.35},
        "materials": {"com": "beige", "bamen": "screen", "Material": "beige_dark", "Material.001": "neon_green", "Material.003": "beige_dark", None: "keycap"},
    },
    "office_chair": {
        "file": "Chair_034-PACK.blend",
        "parts": {"chair": (None, "chair")},
        "scale": ("chair", 2, 0.98),
        "decimate": {"chair": 0.2},
        "materials": {
            "Fabric": "chair_fabric",
            "Plastic": "black_soft",
            "Plastic_Rough": "black_soft",
            "Plastic_Rough.001": "black_soft",
            "Plastic.Rough_Light": "black",
            "Metal": "chrome",
            "Metal_Black": "black",
            None: "black_soft",
        },
    },
    "open_book": {
        "file": "bookEX.blend",
        "parts": {"book": (["couverture", "pages", "page 64", "page 66", "signet"], "book")},
        "scale": ("book", 0, 0.34),
        "decimate": {"book": 0.2},
        "materials": {
            "reliure couture": "book_2",
            "couverte": "book_2",
            "images": "book_2",
            "blanc": "paper",
            "cotes": "paper",
            "pages 66-67": "paper",
            "pages 62-63": "paper",
            "page 64": "paper",
            "signet": "neon_pink",
            None: "paper",
        },
    },
    "neon_sign": {
        "file": "NEON.blend",
        "parts": {"panel": (["Plane"], "panel")},
        "scale": ("panel", 0, 1.14),
        "materials": {"GLASS": "neon_glass", "metal": "grey", None: "grey"},
    },
}

# Plain stand-in colours, only so the glTF previews sensibly; asset() swaps in the room's.
PALETTE = {
    "beige": "d9cbb0", "beige_dark": "b9a98c", "keycap": "e4d8be", "screen": "101018",
    "neon_green": "39ff88", "chair_fabric": "2b3f8f", "black": "0d0d16", "black_soft": "1a1a26",
    "chrome": "8a8a9a", "grey": "3a3a4a", "book_2": "2a7de1", "paper": "efe7d6",
    "neon_pink": "ff2d95", "neon_glass": "101018",
}


def renderable(obj):
    if obj.hide_render or not obj.visible_get():
        return False
    if obj.type == "MESH":
        return True
    if obj.type == "CURVE":
        data = obj.data
        return bool(data.bevel_depth or data.bevel_object or data.extrude)
    return False


def select(objects):
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]


def build_part(names, used):
    scene = bpy.context.scene
    if names is None:
        objects = [o for o in scene.objects if renderable(o) and o.name not in used]
    else:
        objects = [scene.objects[n] for n in names]
    used.update(o.name for o in objects)
    # Convert evaluates every modifier, including the armature pose and particle emitters.
    select(objects)
    bpy.ops.object.convert(target="MESH")
    meshes = [o for o in bpy.context.selected_objects if o.type == "MESH" and len(o.data.vertices)]
    for obj in meshes:
        world = obj.matrix_world.copy()
        obj.parent = None
        obj.matrix_world = world
    select(meshes)
    bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    for mod in list(obj.modifiers):
        obj.modifiers.remove(mod)
    for system in list(obj.particle_systems):
        obj.particle_systems.remove(system)
    return obj


def bounds(obj):
    points = [obj.matrix_world @ v.co for v in obj.data.vertices]
    lo = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    hi = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    return lo, hi


def plain_material(name):
    mat = bpy.data.materials.get(f"room_{name}")
    if mat is None:
        mat = bpy.data.materials.new(f"room_{name}")
        mat.use_nodes = True
        hexv = PALETTE[name]
        rgb = tuple(int(hexv[i:i + 2], 16) / 255 for i in (0, 2, 4))
        mat.node_tree.nodes["Principled BSDF"].inputs["Base Color"].default_value = (*rgb, 1)
    return mat


def remap_materials(obj, mapping):
    for slot in obj.material_slots:
        source = slot.material.name if slot.material else None
        slot.material = plain_material(mapping.get(source, mapping[None]))
    if not obj.material_slots:
        obj.data.materials.append(plain_material(mapping[None]))
    # Exported names must be the bare palette key so asset() can match them.
    for mat in obj.data.materials:
        mat.name = mat.name.removeprefix("room_")


def planar_uv(obj):
    """UVs across the front (X, Z) of a part facing -Y, for the monitor screen texture."""
    lo, hi = bounds(obj)
    mesh = obj.data
    for layer in list(mesh.uv_layers):
        mesh.uv_layers.remove(layer)
    uv = mesh.uv_layers.new(name="UVMap")
    for loop in mesh.loops:
        co = obj.matrix_world @ mesh.vertices[loop.vertex_index].co
        uv.data[loop.index].uv = ((co.x - lo.x) / (hi.x - lo.x), (co.z - lo.z) / (hi.z - lo.z))


def convert(slug, spec):
    bpy.ops.wm.open_mainfile(filepath=os.path.join(SOURCES, spec["file"]))
    if bpy.context.object and bpy.context.object.mode != "OBJECT":
        bpy.ops.object.mode_set(mode="OBJECT")
    for obj in bpy.context.scene.objects:
        obj.hide_set(False)
        obj.hide_select = False
    used = set()
    parts = {part: build_part(names, used) for part, (names, _) in spec["parts"].items()}
    ref, axis, size = spec["scale"]
    lo, hi = bounds(parts[ref])
    factor = size / (hi - lo)[axis]
    pivots = {}
    for part, obj in parts.items():
        lo, hi = bounds(obj)
        pivots[part] = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, lo.z))
    out_dir = os.path.join(ASSETS, slug)
    os.makedirs(out_dir, exist_ok=True)
    for part, obj in parts.items():
        pivot = pivots[spec["parts"][part][1]]
        obj.data.transform(Matrix.Translation(-pivot))
        obj.matrix_world.identity()
        obj.data.transform(Matrix.Scale(factor, 4))
        obj.name = obj.data.name = part
        ratio = spec.get("decimate", {}).get(part)
        if ratio:
            select([obj])
            mod = obj.modifiers.new("Decimate", "DECIMATE")
            mod.ratio = ratio
            bpy.ops.object.modifier_apply(modifier=mod.name)
        remap_materials(obj, spec["materials"])
        if part == "screen":
            planar_uv(obj)
        select([obj])
        bpy.ops.object.shade_smooth_by_angle(angle=0.7)
        bpy.ops.export_scene.gltf(
            filepath=os.path.join(out_dir, f"{part}.gltf"),
            export_format="GLTF_SEPARATE",
            use_selection=True,
            export_apply=True,
            export_yup=True,
            export_cameras=False,
            export_lights=False,
        )
        lo, hi = bounds(obj)
        print(f"CONVERTED {slug}/{part} size={tuple(round(v, 3) for v in hi - lo)} verts={len(obj.data.vertices)}")


for slug, spec in MODELS.items():
    if ONLY and slug not in ONLY:
        continue
    convert(slug, spec)
