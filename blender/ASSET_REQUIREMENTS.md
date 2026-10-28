# Asset Requirements — OSB Energy Cinematic Hero

Blender Cycles render pipeline for the hero image sequence.

## Required Assets

- [ ] **High-poly turbine model** (nacelle + blade + hub + tower)
  - Format: GLB or FBX
  - Place at: `blender/assets/turbine.glb`
  - Minimum: 50K+ triangles for close-up detail
  - Blade geometry must be watertight for proper lighting

- [ ] **PBR texture set** for turbine
  - Base Color, Normal, Roughness, AO maps
  - 4K resolution minimum for nacelle/blade (hero close-up areas)
  - 2K acceptable for tower

- [ ] **Mountain valley HDRI** (golden hour)
  - Format: HDR or EXR
  - Resolution: 4K+ (8K preferred for reflections)
  - Place at: `blender/assets/golden_hour.hdr`
  - Requirements: Low sun angle, warm tones, mountain silhouettes

- [ ] **Terrain mesh or displacement map**
  - Rolling hills / mountain valley terrain
  - Can be simple mesh with displacement modifier
  - Grass/vegetation texture optional

## Optional Assets

- [ ] Second turbine model (background, can be lower-poly)
- [ ] Vegetation scatter (grass, low shrubs)
- [ ] Atmospheric particles (dust, pollen) for volumetric depth
- [ ] Cloud layer plane with alpha texture

## Free Asset Sources

| Asset | Source | License |
|-------|--------|---------|
| HDRI environments | [Poly Haven](https://polyhaven.com/hdris) | CC0 |
| Terrain textures | [ambientCG](https://ambientcg.com/) | CC0 |
| Turbine reference | [Sketchfab CC0](https://sketchfab.com/search?q=wind+turbine&type=models&licenses=cc0) | CC0 |

## Render Pipeline

1. Place assets in `blender/assets/`
2. Run scene setup: `blender --background --python osb_turbine_scene.py`
3. Render animation: Open `.blend`, press F12 (or Ctrl+F12 for animation)
4. Export to WebP: `./export_frames.sh`
5. Verify in browser: `npm run dev` and scroll through hero
