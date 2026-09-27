"""
Models a classic handheld console (the grey brick with the green screen) for the icon ticker
on the about page, without any brand text, and exports it to blender/assets/gameboy/gameboy.glb.
render_props.py imports it next to the room and renders it with the same studio rig.

Run headless:
    blender -b -P blender/build_gameboy.py

Every part is a flat outline in the XZ plane (x right, z up, metres) extruded towards the
camera, which looks along +Y, so "in front" is -Y.
"""

import math
import os

import bpy

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "assets", "gameboy")
os.makedirs(OUT, exist_ok=True)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene


def srgb(hex_value):
    h = hex_value.lstrip("#")
    c = [int(h[i : i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4 for v in c) + (1.0,)


def material(name, hex_value, roughness=0.5, emission=0.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = srgb(hex_value)
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = srgb(hex_value)
        bsdf.inputs["Emission Strength"].default_value = emission
    return mat


def rounded_rect(w, h, radii, steps=8):
    """Outline of a w x h rectangle centred on 0, corner radii (top left, top right,
    bottom right, bottom left), counter-clockwise."""
    tl, tr, br, bl = radii
    corners = [
        (w / 2 - tr, h / 2 - tr, tr, 0),
        (-w / 2 + tl, h / 2 - tl, tl, 90),
        (-w / 2 + bl, -h / 2 + bl, bl, 180),
        (w / 2 - br, -h / 2 + br, br, 270),
    ]
    points = []
    for cx, cy, r, start in corners:
        for i in range(steps + 1):
            a = math.radians(start + 90 * i / steps)
            points.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return points


def circle(r, steps=32):
    return [(r * math.cos(2 * math.pi * i / steps), r * math.sin(2 * math.pi * i / steps)) for i in range(steps)]


def place(points, x, z, angle=0.0):
    c, s = math.cos(math.radians(angle)), math.sin(math.radians(angle))
    return [(x + px * c - py * s, z + px * s + py * c) for px, py in points]


parts = []


def panel(name, points, front, depth, mat, bevel=0.0):
    """Extrudes an outline so its front face sits at y = front and it runs `depth` back."""
    curve = bpy.data.curves.new(name, "CURVE")
    curve.dimensions = "2D"
    curve.fill_mode = "BOTH"
    curve.extrude = depth / 2
    curve.bevel_depth = bevel
    curve.bevel_resolution = 3
    spline = curve.splines.new("POLY")
    spline.points.add(len(points) - 1)
    for p, (x, z) in zip(spline.points, points):
        p.co = (x, z, 0, 1)
    spline.use_cyclic_u = True
    obj = bpy.data.objects.new(name, curve)
    scene.collection.objects.link(obj)
    # Rotating +90 degrees about X maps the curve's y to world z and its extrusion to -y.
    obj.rotation_euler = (math.radians(90), 0, 0)
    obj.location = (0, front + depth / 2 + bevel, 0)
    curve.materials.append(mat)
    parts.append(obj)
    return obj


body_mat = material("gb_body", "#cfcac2", 0.55)
bezel_mat = material("gb_bezel", "#4a4c5e", 0.4)
screen_mat = material("gb_screen", "#9bbc0f", 0.3, emission=0.8)
dark_mat = material("gb_dark", "#1c1b24", 0.45)
ab_mat = material("gb_ab", "#b0226a", 0.35)
pill_mat = material("gb_pill", "#77768a", 0.5)
pink_mat = material("gb_pink", "#ff2d95", 0.4, emission=1.2)
violet_mat = material("gb_violet", "#8a2be2", 0.4, emission=1.2)
led_mat = material("gb_led", "#ff3b5c", 0.3, emission=4.0)

FRONT = -0.016
panel("body", rounded_rect(0.09, 0.148, (0.004, 0.004, 0.02, 0.004)), FRONT, 0.032, body_mat, bevel=0.002)
panel("bezel", place(rounded_rect(0.076, 0.058, (0.003, 0.003, 0.012, 0.003)), 0, 0.036), FRONT - 0.0022, 0.001, bezel_mat)
panel("screen", place(rounded_rect(0.046, 0.041, (0.001,) * 4), 0.004, 0.034), FRONT - 0.0026, 0.0006, screen_mat)
panel("stripe_pink", place(rounded_rect(0.068, 0.0009, (0,) * 4), 0, 0.0615), FRONT - 0.0026, 0.0006, pink_mat)
panel("stripe_violet", place(rounded_rect(0.068, 0.0009, (0,) * 4), 0, 0.0596), FRONT - 0.0026, 0.0006, violet_mat)
panel("led", place(circle(0.0016), -0.031, 0.04), FRONT - 0.0026, 0.0006, led_mat)
panel("dpad_h", place(rounded_rect(0.025, 0.0085, (0.0012,) * 4), -0.022, -0.02), FRONT - 0.005, 0.004, dark_mat, bevel=0.0006)
panel("dpad_v", place(rounded_rect(0.0085, 0.025, (0.0012,) * 4), -0.022, -0.02), FRONT - 0.005, 0.004, dark_mat, bevel=0.0006)
panel("button_a", place(circle(0.0058), 0.027, -0.014), FRONT - 0.0045, 0.004, ab_mat, bevel=0.0008)
panel("button_b", place(circle(0.0058), 0.012, -0.021), FRONT - 0.0045, 0.004, ab_mat, bevel=0.0008)
for i, x in enumerate((-0.009, 0.007)):
    panel(f"pill_{i}", place(rounded_rect(0.012, 0.0042, (0.0021,) * 4), x, -0.046, 25), FRONT - 0.0035, 0.003, pill_mat, bevel=0.0005)
# Speaker slots in the rounded corner, slanted like the original grille.
for i in range(6):
    panel(f"slot_{i}", place(rounded_rect(0.019, 0.0024, (0.0012,) * 4), 0.02 + i * 0.0042, -0.058 + i * 0.0024, 60), FRONT - 0.0003, 0.0004, dark_mat)

# Curves become meshes and join into one object for export.
bpy.ops.object.select_all(action="DESELECT")
for obj in parts:
    obj.select_set(True)
bpy.context.view_layer.objects.active = parts[0]
bpy.ops.object.convert(target="MESH")
bpy.ops.object.join()
model = bpy.context.active_object
model.name = "gameboy"
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
# Origin at the bottom centre like the other icon models.
model.location.z = 0.074
bpy.ops.object.transform_apply(location=True, rotation=False, scale=False)

bpy.ops.export_scene.gltf(
    filepath=os.path.join(OUT, "gameboy.glb"),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
)
print("GAMEBOY_OK")
