"""
Renders the sepic.me logo mark: a neon-outlined "</>" code tag in front of a striped
synthwave sun, the same motif as the room's posters and the monitor screen.

Run headless:
    blender -b -P blender/render_logo.py

Outputs blender/out/logo.png (1024x1024, transparent background).
"""

import math
import os

import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def rgb(hex_value):
    h = hex_value.lstrip("#")
    srgb = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb) + (1.0,)


def emissive(name, color, strength):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Emission Color"].default_value = color
    bsdf.inputs["Emission Strength"].default_value = strength
    return mat


def sun_material():
    """Yellow at the top fading to hot pink at the bottom, glowing."""
    mat = bpy.data.materials.new("logo_sun")
    mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    bsdf = nodes["Principled BSDF"]
    coord = nodes.new("ShaderNodeTexCoord")
    sep = nodes.new("ShaderNodeSeparateXYZ")
    ramp = nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.0
    ramp.color_ramp.elements[0].color = rgb("ff2d95")
    ramp.color_ramp.elements[1].position = 1.0
    ramp.color_ramp.elements[1].color = rgb("ffd60a")
    mid = ramp.color_ramp.elements.new(0.55)
    mid.color = rgb("ff8c42")
    links.new(coord.outputs["Generated"], sep.inputs["Vector"])
    # The disc is rotated upright, so its local Y is the vertical axis.
    links.new(sep.outputs["Y"], ramp.inputs["Fac"])
    links.new(ramp.outputs["Color"], bsdf.inputs["Base Color"])
    links.new(ramp.outputs["Color"], bsdf.inputs["Emission Color"])
    bsdf.inputs["Emission Strength"].default_value = 2.2
    return mat


# Striped sun: a disc with horizontal gaps cut out of its lower half.
bpy.ops.mesh.primitive_cylinder_add(vertices=96, radius=1.0, depth=0.05, location=(0, 0.3, 0), rotation=(math.pi / 2, 0, 0))
sun = bpy.context.active_object
sun.name = "logo_sun"
sun.data.materials.append(sun_material())
cutters = []
for i, (z, h) in enumerate([(-0.05, 0.05), (-0.25, 0.07), (-0.45, 0.09), (-0.65, 0.11), (-0.85, 0.13)]):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.3, z))
    cut = bpy.context.active_object
    cut.scale = (2.4, 0.4, h)
    cutters.append(cut)
for cut in cutters:
    mod = sun.modifiers.new(f"stripe_{cut.name}", "BOOLEAN")
    mod.operation = "DIFFERENCE"
    mod.object = cut
    cut.hide_render = True
    cut.hide_viewport = True

# The code tag: dark glossy glyphs with a cyan neon tube running around their outline.
def letter(body, fill, extrude, bevel, mat, offset=0.0, y=0.0):
    bpy.ops.object.text_add(location=(0, y, 0.06), rotation=(math.pi / 2, 0, 0))
    obj = bpy.context.active_object
    obj.data.body = body
    obj.data.size = 1.22
    obj.data.align_x = "CENTER"
    obj.data.align_y = "CENTER"
    obj.data.extrude = extrude
    obj.data.bevel_depth = bevel
    obj.data.offset = offset
    obj.data.fill_mode = fill
    obj.data.materials.append(mat)
    return obj


glossy = bpy.data.materials.new("logo_letter")
glossy.use_nodes = True
g = glossy.node_tree.nodes["Principled BSDF"]
g.inputs["Base Color"].default_value = rgb("120826")
g.inputs["Roughness"].default_value = 0.18
g.inputs["Metallic"].default_value = 0.4
letter("</>", "BOTH", 0.12, 0.012, glossy, y=-0.1)
neon = letter("</>", "NONE", 0.0, 0.022, emissive("logo_neon", rgb("00e5ff"), 6.0), offset=0.03, y=-0.24)
neon.data.bevel_resolution = 4

# Soft pink rim behind everything so the mark reads on dark pages.
bpy.ops.mesh.primitive_circle_add(vertices=96, radius=1.12, location=(0, 0.35, 0.05), rotation=(math.pi / 2, 0, 0), fill_type="NOTHING")
ring = bpy.context.active_object
bpy.ops.object.convert(target="CURVE")
ring.data.bevel_depth = 0.018
ring.data.materials.append(emissive("logo_ring", rgb("ff2d95"), 5.0))

# Camera straight on, orthographic, framing the sun and ring.
cam_data = bpy.data.cameras.new("logo_camera")
cam_data.type = "ORTHO"
cam_data.ortho_scale = 2.6
cam = bpy.data.objects.new("logo_camera", cam_data)
scene.collection.objects.link(cam)
cam.location = (0, -6, 0.02)
cam.rotation_euler = (math.pi / 2, 0, 0)
scene.camera = cam

key = bpy.data.lights.new("logo_key", "AREA")
key.energy = 300
key.size = 3
key_obj = bpy.data.objects.new("logo_key", key)
scene.collection.objects.link(key_obj)
key_obj.location = (-2, -4, 3)
key_obj.rotation_euler = (Vector((0, 0, 0)) - key_obj.location).to_track_quat("-Z", "Y").to_euler()

world = bpy.data.worlds.new("logo_world")
world.use_nodes = True
world.node_tree.nodes["Background"].inputs["Color"].default_value = (0.02, 0.01, 0.04, 1)
world.node_tree.nodes["Background"].inputs["Strength"].default_value = 0.4
scene.world = world

for engine in ("BLENDER_EEVEE", "BLENDER_EEVEE_NEXT"):
    try:
        scene.render.engine = engine
        break
    except TypeError:
        continue
# Standard keeps the neon colours saturated; AgX washes them out on a logo.
scene.view_settings.view_transform = "Standard"
scene.render.film_transparent = True
scene.render.resolution_x = scene.render.resolution_y = 1024
scene.render.image_settings.file_format = "PNG"
scene.render.image_settings.color_mode = "RGBA"
scene.render.filepath = os.path.join(OUT, "logo.png")
bpy.ops.render.render(write_still=True)
print("LOGO_OK")
