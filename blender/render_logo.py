"""
Renders the sepic.me logo mark: a neon-outlined palm in front of a striped synthwave
sun, the same motif as the room's posters and the monitor screen.

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

# The palm: a dark glossy silhouette with a cyan neon tube running around each outline,
# like the palms on synthwave posters. Shapes are 2D outlines in the XZ plane (x right, z up).
def bezier(p0, p1, p2, n):
    return [
        ((1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t**2 * p2[0],
         (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t**2 * p2[1])
        for t in (i / n for i in range(n + 1))
    ]


def ribbon(center, widths):
    """Closed outline around a centerline, with a half width per point."""
    left, right = [], []
    for i, (x, z) in enumerate(center):
        a = center[max(i - 1, 0)]
        b = center[min(i + 1, len(center) - 1)]
        dx, dz = b[0] - a[0], b[1] - a[1]
        length = math.hypot(dx, dz) or 1.0
        nx, nz = -dz / length, dx / length
        w = widths[i]
        left.append((x + nx * w, z + nz * w))
        right.append((x - nx * w, z - nz * w))
    return left + right[::-1]


def frond(origin, angle, length, droop, width, n=14):
    """A leaf that leaves the crown at `angle` and bends towards the ground."""
    side = 1 if math.cos(angle) >= 0 else -1
    points, x, z, a = [origin], origin[0], origin[1], angle
    step = length / n
    for _ in range(n):
        a -= side * droop / n
        x += math.cos(a) * step
        z += math.sin(a) * step
        points.append((x, z))
    widths = [width * math.sin(math.pi * min(0.98, i / n)) ** 0.8 for i in range(n + 1)]
    widths[0] = 0.02
    return ribbon(points, widths)


glossy = bpy.data.materials.new("logo_palm")
glossy.use_nodes = True
g = glossy.node_tree.nodes["Principled BSDF"]
g.inputs["Base Color"].default_value = rgb("120826")
g.inputs["Roughness"].default_value = 0.18
g.inputs["Metallic"].default_value = 0.4
neon_mat = emissive("logo_neon", rgb("00e5ff"), 6.0)


def palm_part(name, outline):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata([(x, 0.0, z) for x, z in outline], [], [list(range(len(outline)))])
    obj = bpy.data.objects.new(name, mesh)
    scene.collection.objects.link(obj)
    obj.location = (0, -0.1, 0.0)
    obj.data.materials.append(glossy)
    solid = obj.modifiers.new("depth", "SOLIDIFY")
    solid.thickness = 0.1
    curve = bpy.data.curves.new(name + "_neon", "CURVE")
    curve.dimensions = "3D"
    curve.bevel_depth = 0.02
    curve.bevel_resolution = 4
    spline = curve.splines.new("POLY")
    spline.points.add(len(outline) - 1)
    for p, (x, z) in zip(spline.points, outline):
        p.co = (x, 0.0, z, 1.0)
    spline.use_cyclic_u = True
    tube = bpy.data.objects.new(name + "_neon", curve)
    scene.collection.objects.link(tube)
    tube.location = (0, -0.24, 0.0)
    curve.materials.append(neon_mat)


crown = (-0.06, 0.34)
trunk_line = bezier((0.2, -0.98), (0.26, -0.3), crown, 16)
palm_part("palm_trunk", ribbon(trunk_line, [0.075 - 0.04 * i / 16 for i in range(17)]))
for i, (deg, length, droop) in enumerate(
    [(8, 0.78, 1.5), (38, 0.7, 1.3), (72, 0.5, 1.0), (112, 0.52, 1.0), (145, 0.72, 1.3), (174, 0.8, 1.5)]
):
    palm_part(f"palm_frond_{i}", frond(crown, math.radians(deg), length, droop, 0.085))

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
