"""
Converts the BlendSwap models that only appear as icons on the about page (not in the room)
to glTF in blender/assets/<slug>/<slug>.glb, with materials mapped to the site palette.
render_props.py imports them next to the room and renders them with the same studio rig.

The source files are not kept in the repo. Download them from the pages listed in
blender/assets/README.md into one folder, then run once per model:
    blender -b <folder>/<file>.blend -P blender/convert_icons.py -- running_shoes

The Game Boy is not a download: build_gameboy.py models it.
"""

import os
import sys

import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, "assets")
SLUG = sys.argv[sys.argv.index("--") + 1]

def srgb(hex_value):
    h = hex_value.lstrip("#")
    c = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c)


# slug -> (objects to keep or None for every visible mesh, objects to leave out, largest
# dimension in metres, source material name prefix -> site palette colour). The shoe's
# materials are procedural node setups glTF cannot carry, so they become flat palette colours;
# the brand logo is left out.
MODELS = {
    "running_shoes": (
        None,
        {"Cube.128", "Cube.129", "Icosphere", "Plane.012", "Plane.013", "Logo_NIKE"},
        0.3,
        {"Yellow": "#ffd60a", "Pink": "#ff2d95", "Blue": "#00e5ff", "Black": "#1b1530", "Base": "#f1eef8"},
    ),
}

keep, skip, size, palette = MODELS[SLUG]
names = keep or [
    o.name for o in bpy.context.scene.objects
    if o.type == "MESH" and not o.hide_render and o.name not in skip
]
depsgraph = bpy.context.evaluated_depsgraph_get()
parts = []
for name in names:
    src = bpy.data.objects[name]
    # Bake modifiers (booleans, bevels, geometry nodes) into a plain mesh.
    mesh = bpy.data.meshes.new_from_object(src.evaluated_get(depsgraph), preserve_all_data_layers=True, depsgraph=depsgraph)
    mesh.transform(src.matrix_world)
    obj = bpy.data.objects.new(f"{SLUG}_{name}", mesh)
    bpy.context.scene.collection.objects.link(obj)
    parts.append(obj)

flat = {}
for prefix, hex_value in palette.items():
    mat = bpy.data.materials.new(f"{SLUG}_{prefix.lower()}")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*srgb(hex_value), 1)
    bsdf.inputs["Roughness"].default_value = 0.55
    flat[prefix] = mat
for obj in parts:
    for slot_index, mat in enumerate(obj.data.materials):
        match = next((m for p, m in flat.items() if mat and mat.name.startswith(p)), None)
        if match:
            obj.data.materials[slot_index] = match

bpy.ops.object.select_all(action="DESELECT")
for obj in parts:
    obj.select_set(True)
bpy.context.view_layer.objects.active = parts[0]
bpy.ops.object.join()
model = bpy.context.active_object
model.name = SLUG

# Origin at the bottom centre, scaled so the largest side is `size` metres.
corners = [Vector(c) for c in model.bound_box]
lo = Vector((min(c.x for c in corners), min(c.y for c in corners), min(c.z for c in corners)))
hi = Vector((max(c.x for c in corners), max(c.y for c in corners), max(c.z for c in corners)))
offset = Vector(((lo.x + hi.x) / 2, (lo.y + hi.y) / 2, lo.z))
model.data.transform(__import__("mathutils").Matrix.Translation(-offset))
factor = size / max(hi - lo)
model.data.transform(__import__("mathutils").Matrix.Scale(factor, 4))

bpy.ops.object.select_all(action="DESELECT")
model.select_set(True)
out_dir = os.path.join(ASSETS, SLUG)
os.makedirs(out_dir, exist_ok=True)
bpy.ops.export_scene.gltf(
    filepath=os.path.join(out_dir, f"{SLUG}.glb"),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
)
print("ICON_MODEL_OK", SLUG, round(factor, 4))
