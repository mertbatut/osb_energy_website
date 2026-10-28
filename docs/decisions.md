# Architecture Decisions

| Date | Decision | Reason |
|------|----------|--------|
| 2026-10-27 | React (Vite) + Tailwind CSS, JavaScript | SPA web project, fast dev server and build |
| 2026-10-27 | ESLint as linter (eslint + prettier + sonarjs/react/jsx-a11y/import plugins) | Mature plugin ecosystem, wide community support |
| 2026-10-28 | Inter Tight (display) + Inter (body) via Google Fonts CDN | Stitch design reference, premium feel |
| 2026-10-28 | GSAP + ScrollTrigger for scroll animations | Industry standard, fine-grained control, React integration via @gsap/react |
| 2026-10-28 | Lenis for smooth scroll | Lightweight, integrates well with GSAP ScrollTrigger |
| 2026-10-28 | Explicit icon allowlist map (IconMap.jsx) instead of import * from lucide-react | Tree-shaking: prevents bundling all 1000+ icons |
| 2026-10-28 | Three.js/R3F for 3D hero scene | Scroll-driven cinematic camera with real-time blade rotation |
| 2026-10-28 | Tailwind v4 @theme for design tokens | Native CSS custom properties, no tailwind.config.js needed |
| 2026-10-28 | React.lazy for WindScene chunk | Code-split Three.js (1MB) from main bundle (407KB) |
| 2026-10-28 | progressRef pattern instead of useState for scroll | Avoids React re-renders on every scroll event; R3F reads ref in useFrame |
| 2026-10-28 | Module-scope materials in TurbineModel | Prevents GPU memory leak from per-render material allocation |
| 2026-10-28 | Current GLB is prototype only (40KB procedural) | Photorealistic result requires high-poly model + PBR textures — see asset gap report |
| 2026-10-28 | Blender Cycles offline render + GSAP image sequence hero | Real-time Three.js hit quality ceiling; Cycles provides physically-based cinematic quality. Image sequence via canvas + ScrollTrigger keeps scroll-driven interaction. Three.js code retained as dev fallback |
| 2026-10-28 | Canvas drawImage for frame playback (no React re-renders) | Same progressRef pattern as R3F useFrame; rAF loop reads ref directly, no setState on scroll |
| 2026-10-28 | Progressive frame loading with priority zones | First 5 frames load immediately (poster + initial scroll), rest load in background with max 4 concurrent requests |
| 2026-10-28 | Responsive frame tiers: desktop 120f, tablet 90f, mobile poster | Balances visual quality vs download size per viewport class |
| 2026-10-28 | Multi-layer CSS parallax hero with drone photos instead of frame sequence | Real drone photos available; Blender pipeline not yet complete; 3-layer parallax with GSAP scrub provides cinematic scroll experience with minimal payload (~3MB) |
| 2026-10-28 | 5-image cinematic parallax hero replacing 3-layer drone parallax | 5 scene images with GSAP scrub transitions; alternating drift directions; single pin 500% scroll; dedicated config file for easy image swaps |
| 2026-10-28 | Logo-based brand color system (#4956A5) replacing lime (#E1FCAD) | Kurumsal kimlik tutarlılığı; tüm accent/CTA renkleri logonun mavi tonundan türetildi |
| 2026-10-28 | Single-image editorial parallax hero | Tek scene-01, scale(1.2) + translateX/Y parallax, 250vh pin; basit, az payload |
| 2026-10-28 | Ghost/text/neutral button variants, lime CTA removed | Editorial minimal estetik |
| 2026-10-28 | Interactive energy flow diagram (BessTechnology) | useState stage selection, animasyonlu bağlantı çizgileri |
| 2026-10-28 | Bento grid for Engineering Process + Footer dark minimal | Asimetrik panel layout, #060D14 footer bg |
