"""
Renders single props from the room as transparent stills for the inner pages, so the site
reuses the exact objects of the 3D office instead of separate artwork.

Run after build_room.py (it opens blender/out/room.blend):
    blender -b -P blender/render_props.py

Outputs blender/out/props/<name>.png (900x900, transparent background).
"""

import math
import os

import bpy
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out", "props")
os.makedirs(OUT, exist_ok=True)

# name -> (objects in the room, yaw in degrees from straight on, camera height factor, zoom).
# Zoom above 1 crops in. Framing only counts geometry above FRAME_MIN_Z, so the phone cord
# hanging to the floor does not pull the camera away from the phone.
FRAME_MIN_Z = {"phone": 0.76}
PROPS = {
    "computer": (["monitor", "monitor_screen", "computer_case", "keyboard"], -28, 0.45, 1.0),
    "open-sign": (["neon_sign", "neon_border", "neon_panel"], -18, 0.1, 1.0),
    "boombox": (["hifi"], -30, 0.35, 1.0),
    "floppy": (["floppy"], -20, 1.1, 1.0),
    "phone": (["phone"], -32, 0.7, 1.0),
    "plant": (["plant"], -20, 0.35, 1.0),
}
SIZE = 900

bpy.ops.wm.open_mainfile(filepath=os.path.join(HERE, "out", "room.blend"))
scene = bpy.context.scene
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
    distance = radius / math.sin(fov / 2) * 1.05 / zoom
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
    scene.render.filepath = os.path.join(OUT, f"{name}.png")
    bpy.ops.render.render(write_still=True)
    print(f"PROP_OK {name}")
