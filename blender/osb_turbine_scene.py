"""
OSB Energy — Blender Cycles scene setup for cinematic hero image sequence.

Run inside Blender:
  blender --background --python osb_turbine_scene.py

Produces 120 frames (0-119) of drone-perspective turbine animation:
  Frame 0:    Wide establishing shot
  Frame 29:   Approach — nacelle level
  Frame 59:   Fly-by — close to blades
  Frame 89:   Landscape reveal — pull back
  Frame 119:  Transition — sky fade-out

Prerequisites:
  - High-poly turbine model (GLB/FBX) at ./assets/turbine.glb
  - Golden-hour mountain HDRI at ./assets/golden_hour.hdr
  See ASSET_REQUIREMENTS.md for full asset checklist.
"""

import bpy
import math
import os

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

FRAME_START = 0
FRAME_END = 119
MASTER_RES_X = 3840
MASTER_RES_Y = 2160
SAMPLES = 256
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "render_output")

# Asset paths (relative to this script)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TURBINE_PATH = os.path.join(SCRIPT_DIR, "assets", "turbine.glb")
HDRI_PATH = os.path.join(SCRIPT_DIR, "assets", "golden_hour.hdr")

# Turbine placement
TURBINE_LOCATION = (0, 0, 0)
TURBINE_SCALE = (1, 1, 1)

# Background turbine (optional, placed further away)
BG_TURBINE_LOCATION = (-80, -120, 0)
BG_TURBINE_SCALE = (0.9, 0.9, 0.9)


def clear_scene():
    """Remove all default objects."""
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def setup_render_engine():
    """Configure Cycles with GPU if available, CPU fallback."""
    scene = bpy.context.scene
    scene.render.engine = "CYCLES"
    scene.cycles.samples = SAMPLES
    scene.cycles.use_denoising = True

    # Try GPU compute first
    prefs = bpy.context.preferences.addons.get("cycles")
    if prefs:
        cprefs = prefs.preferences
        # Try OptiX > CUDA > HIP > Metal > CPU
        for device_type in ("OPTIX", "CUDA", "HIP", "METAL"):
            try:
                cprefs.compute_device_type = device_type
                cprefs.get_devices()
                scene.cycles.device = "GPU"
                # Enable all available GPU devices
                for device in cprefs.devices:
                    device.use = device.type != "CPU"
                print(f"Cycles GPU: {device_type}")
                break
            except Exception:
                continue
        else:
            scene.cycles.device = "CPU"
            print("Cycles GPU unavailable, using CPU")

    # Denoiser
    scene.cycles.denoiser = "OPENIMAGEDENOISE"
    if scene.cycles.device == "GPU":
        try:
            scene.cycles.denoiser = "OPTIX"
        except Exception:
            pass


def setup_resolution():
    """Master resolution for offline render."""
    scene = bpy.context.scene
    scene.render.resolution_x = MASTER_RES_X
    scene.render.resolution_y = MASTER_RES_Y
    scene.render.resolution_percentage = 100
    scene.render.image_settings.file_format = "PNG"
    scene.render.image_settings.color_depth = "16"
    # ### = 3-digit zero-padded frame number (matches JS useFrameLoader pad3)
    scene.render.filepath = os.path.join(OUTPUT_DIR, "frame-###")

    # Color management
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium Contrast"


def setup_frame_range():
    """Set animation range."""
    scene = bpy.context.scene
    scene.frame_start = FRAME_START
    scene.frame_end = FRAME_END
    scene.frame_current = FRAME_START


def setup_environment():
    """Load HDRI environment or create procedural sky fallback."""
    world = bpy.data.worlds.new("OSB_World")
    bpy.context.scene.world = world
    world.use_nodes = True
    tree = world.node_tree
    tree.nodes.clear()

    bg_node = tree.nodes.new("ShaderNodeBackground")
    output_node = tree.nodes.new("ShaderNodeOutputWorld")

    if os.path.exists(HDRI_PATH):
        env_tex = tree.nodes.new("ShaderNodeTexEnvironment")
        env_tex.image = bpy.data.images.load(HDRI_PATH)
        mapping = tree.nodes.new("ShaderNodeMapping")
        tex_coord = tree.nodes.new("ShaderNodeTexCoord")

        tree.links.new(tex_coord.outputs["Generated"], mapping.inputs["Vector"])
        tree.links.new(mapping.outputs["Vector"], env_tex.inputs["Vector"])
        tree.links.new(env_tex.outputs["Color"], bg_node.inputs["Color"])
        bg_node.inputs["Strength"].default_value = 1.0
        print(f"HDRI loaded: {HDRI_PATH}")
    else:
        # Procedural golden-hour sky fallback
        sky_tex = tree.nodes.new("ShaderNodeTexSky")
        sky_tex.sky_type = "NISHITA"
        sky_tex.sun_elevation = math.radians(8)  # Low sun for golden hour
        sky_tex.sun_rotation = math.radians(220)
        sky_tex.altitude = 800
        tree.links.new(sky_tex.outputs["Color"], bg_node.inputs["Color"])
        bg_node.inputs["Strength"].default_value = 1.5
        print("HDRI not found, using procedural Nishita sky")

    tree.links.new(bg_node.outputs["Background"], output_node.inputs["Surface"])


def create_ground_plane():
    """Simple terrain ground plane (placeholder for displacement map)."""
    bpy.ops.mesh.primitive_plane_add(size=2000, location=(0, 0, -0.5))
    ground = bpy.context.active_object
    ground.name = "Terrain"

    mat = bpy.data.materials.new("Terrain_Material")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (0.12, 0.18, 0.08, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.95
    ground.data.materials.append(mat)

    return ground


def import_turbine(location, scale, name_suffix=""):
    """Import turbine model if available, create placeholder otherwise."""
    if os.path.exists(TURBINE_PATH):
        bpy.ops.import_scene.gltf(filepath=TURBINE_PATH)
        turbine = bpy.context.selected_objects[0]
        turbine.location = location
        turbine.scale = scale
        turbine.name = f"Turbine{name_suffix}"
        print(f"Turbine imported: {TURBINE_PATH}")
        return turbine

    # Placeholder: tower + nacelle + hub
    print("Turbine model not found, creating placeholder geometry")

    # Tower (cylinder)
    bpy.ops.mesh.primitive_cylinder_add(
        radius=2, depth=90, location=(location[0], location[1], location[2] + 45)
    )
    tower = bpy.context.active_object
    tower.name = f"Tower{name_suffix}"

    # Nacelle (cube)
    bpy.ops.mesh.primitive_cube_add(
        size=1, location=(location[0], location[1], location[2] + 90)
    )
    nacelle = bpy.context.active_object
    nacelle.scale = (8, 3, 3)
    nacelle.name = f"Nacelle{name_suffix}"

    # Hub (sphere)
    bpy.ops.mesh.primitive_uv_sphere_add(
        radius=2, location=(location[0] + 8, location[1], location[2] + 90)
    )
    hub = bpy.context.active_object
    hub.name = f"Hub{name_suffix}"

    # Blades (3x thin cubes)
    blades = []
    for i in range(3):
        angle = math.radians(i * 120)
        bx = location[0] + 8
        by = location[1] + math.sin(angle) * 30
        bz = location[2] + 90 + math.cos(angle) * 30
        bpy.ops.mesh.primitive_cube_add(size=1, location=(bx, by, bz))
        blade = bpy.context.active_object
        blade.scale = (0.5, 1.5, 30)
        blade.rotation_euler = (angle, 0, 0)
        blade.name = f"Blade{name_suffix}_{i}"
        blades.append(blade)

    # Apply white material to turbine parts
    mat = bpy.data.materials.new(f"Turbine_Material{name_suffix}")
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (0.85, 0.85, 0.85, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.3
    bsdf.inputs["Metallic"].default_value = 0.1

    for obj in [tower, nacelle, hub] + blades:
        obj.data.materials.append(mat)

    return tower


def setup_camera():
    """Create and keyframe the cinematic camera path."""
    bpy.ops.object.camera_add(location=(150, -80, 50))
    cam = bpy.context.active_object
    cam.name = "CinematicCamera"
    bpy.context.scene.camera = cam

    cam.data.lens = 35
    cam.data.clip_start = 0.5
    cam.data.clip_end = 5000
    cam.data.dof.use_dof = True
    cam.data.dof.aperture_fstop = 2.8

    # Camera keyframes matching the approved storyboard (0-indexed)
    keyframes = [
        # (frame, location, rotation_euler_degrees, focal_length)
        (0, (200, -150, 60), (-75, 0, 35), 24),        # Wide establishing
        (29, (80, -60, 85), (-82, 0, 20), 35),          # Approach to nacelle
        (59, (12, -8, 92), (-88, 0, 10), 50),           # Fly-by close to blades
        (89, (-60, -120, 70), (-72, 0, -25), 28),       # Pull back, landscape reveal
        (119, (-30, -80, 130), (-60, 0, -15), 24),      # Sky transition
    ]

    for frame, loc, rot_deg, focal in keyframes:
        cam.location = loc
        cam.rotation_euler = tuple(math.radians(d) for d in rot_deg)
        cam.data.lens = focal

        cam.keyframe_insert(data_path="location", frame=frame)
        cam.keyframe_insert(data_path="rotation_euler", frame=frame)
        cam.data.keyframe_insert(data_path="lens", frame=frame)

    # Smooth interpolation between keyframes
    if cam.animation_data and cam.animation_data.action:
        for fcurve in cam.animation_data.action.fcurves:
            for kp in fcurve.keyframe_points:
                kp.interpolation = "BEZIER"
                kp.handle_left_type = "AUTO_CLAMPED"
                kp.handle_right_type = "AUTO_CLAMPED"

    return cam


def setup_sun_light():
    """Golden hour directional light."""
    bpy.ops.object.light_add(type="SUN", location=(100, -200, 80))
    sun = bpy.context.active_object
    sun.name = "GoldenHourSun"
    sun.data.energy = 3.0
    sun.data.color = (1.0, 0.75, 0.45)
    sun.data.angle = math.radians(1)  # Soft shadows
    sun.rotation_euler = (math.radians(75), math.radians(10), math.radians(-30))
    return sun


def setup_compositing():
    """Basic compositing: glare + color grading."""
    scene = bpy.context.scene
    scene.use_nodes = True
    tree = scene.node_tree
    tree.nodes.clear()

    render_layers = tree.nodes.new("CompositorNodeRLayers")
    composite = tree.nodes.new("CompositorNodeComposite")

    # Glare for bloom effect
    glare = tree.nodes.new("CompositorNodeGlare")
    glare.glare_type = "FOG_GLOW"
    glare.quality = "HIGH"
    glare.mix = -0.95  # Subtle

    tree.links.new(render_layers.outputs["Image"], glare.inputs["Image"])
    tree.links.new(glare.outputs["Image"], composite.inputs["Image"])


def main():
    """Assemble the full scene."""
    print("=" * 60)
    print("OSB Energy — Blender Scene Setup")
    print("=" * 60)

    clear_scene()
    setup_render_engine()
    setup_resolution()
    setup_frame_range()
    setup_environment()
    create_ground_plane()
    import_turbine(TURBINE_LOCATION, TURBINE_SCALE)
    import_turbine(BG_TURBINE_LOCATION, BG_TURBINE_SCALE, name_suffix="_BG")
    setup_camera()
    setup_sun_light()
    setup_compositing()

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print("=" * 60)
    print(f"Scene ready. Output: {OUTPUT_DIR}")
    print(f"Render: bpy.ops.render.render(animation=True)")
    print("=" * 60)

    # Save .blend file
    blend_path = os.path.join(SCRIPT_DIR, "osb_turbine_scene.blend")
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    print(f"Saved: {blend_path}")


if __name__ == "__main__":
    main()
