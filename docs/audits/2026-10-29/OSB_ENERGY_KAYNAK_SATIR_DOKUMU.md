# OSB ENERGY — Numaralı kaynak kod dökümü

Tarih: 29 Ekim 2026. Bu ek, inceleme anındaki kaynak kodun satır numaralı kopyasıdır. Aktiflik, `src/main.jsx` girişinden ulaşılabilen import grafiğine göre belirlenmiştir. Tam değerlendirme: [Tasarım ve animasyon raporu](./OSB_ENERGY_TASARIM_VE_ANIMASYON_RAPORU.md).

## src/App.jsx

Durum: Aktif import grafiğinde. Satır: 163. SHA-256: `125f3a1cc5554eaa9f7783e0c1b4958bcc7549fa48f6cb2a3da4195c1047430d`.

İçe aktaranlar: src/main.jsx.

```text
   1 | import { useEffect, useRef } from "react";
   2 | import gsap from "gsap";
   3 | import { ScrollTrigger } from "gsap/ScrollTrigger";
   4 | import Lenis from "lenis";
   5 | import Navbar from "./components/layout/Navbar.jsx";
   6 | import Footer from "./components/layout/Footer.jsx";
   7 | import CinematicHero from "./components/hero/CinematicHero.jsx";
   8 | import StoryboardStrip from "./components/sections/StoryboardStrip.jsx";
   9 | import CorporateIntro from "./components/sections/CorporateIntro.jsx";
  10 | import CoreServices from "./components/sections/CoreServices.jsx";
  11 | import IndustrialMarquee from "./components/sections/IndustrialMarquee.jsx";
  12 | import BessTechnology from "./components/sections/BessTechnology.jsx";
  13 | import FinancialKpi from "./components/sections/FinancialKpi.jsx";
  14 | import HybridSynergy from "./components/sections/HybridSynergy.jsx";
  15 | import SectorApplications from "./components/sections/SectorApplications.jsx";
  16 | import EngineeringProcess from "./components/sections/EngineeringProcess.jsx";
  17 | import ProjectsPortfolio from "./components/sections/ProjectsPortfolio.jsx";
  18 | import CtaContact from "./components/sections/CtaContact.jsx";
  19 | import useReducedMotion from "./hooks/useReducedMotion.js";
  20 | import useOpeningSectionTransitions from "./hooks/useOpeningSectionTransitions.js";
  21 | 
  22 | gsap.registerPlugin(ScrollTrigger);
  23 | 
  24 | export default function App() {
  25 |   const mainRef = useRef(null);
  26 |   const prefersReducedMotion = useReducedMotion();
  27 |   useOpeningSectionTransitions(mainRef);
  28 | 
  29 |   // Lenis smooth scroll
  30 |   useEffect(() => {
  31 |     if (prefersReducedMotion) return;
  32 | 
  33 |     const lenis = new Lenis({ lerp: 0.1 });
  34 |     lenis.on("scroll", ScrollTrigger.update);
  35 | 
  36 |     const tickerCallback = (time) => {
  37 |       lenis.raf(time * 1000);
  38 |     };
  39 |     gsap.ticker.add(tickerCallback);
  40 |     gsap.ticker.lagSmoothing(0);
  41 | 
  42 |     return () => {
  43 |       gsap.ticker.remove(tickerCallback);
  44 |       lenis.destroy();
  45 |     };
  46 |   }, [prefersReducedMotion]);
  47 | 
  48 |   // GSAP section reveal animations
  49 |   useEffect(() => {
  50 |     if (prefersReducedMotion) return;
  51 | 
  52 |     const ctx = gsap.context(() => {
  53 |       // The opening section is scrubbed as a whole by its dedicated timeline.
  54 |       const revealTargets = selector => gsap.utils.toArray(selector)
  55 |         .filter(el => !el.closest("#hakkimizda"));
  56 | 
  57 |       // Reveal headlines
  58 |       revealTargets("[data-animate='headline']").forEach((el) => {
  59 |         gsap.fromTo(
  60 |           el,
  61 |           { y: 60, opacity: 0 },
  62 |           {
  63 |             y: 0,
  64 |             opacity: 1,
  65 |             duration: 1,
  66 |             ease: "power2.out",
  67 |             scrollTrigger: {
  68 |               trigger: el,
  69 |               start: "top 85%",
  70 |               toggleActions: "play none none none",
  71 |             },
  72 |           },
  73 |         );
  74 |       });
  75 | 
  76 |       // Reveal body text
  77 |       revealTargets("[data-animate='body']").forEach((el) => {
  78 |         gsap.fromTo(
  79 |           el,
  80 |           { y: 30, opacity: 0 },
  81 |           {
  82 |             y: 0,
  83 |             opacity: 1,
  84 |             duration: 0.8,
  85 |             delay: 0.15,
  86 |             ease: "power2.out",
  87 |             scrollTrigger: {
  88 |               trigger: el,
  89 |               start: "top 85%",
  90 |               toggleActions: "play none none none",
  91 |             },
  92 |           },
  93 |         );
  94 |       });
  95 | 
  96 |       // Staggered cards
  97 |       revealTargets("[data-animate='stagger-parent']").forEach((parent) => {
  98 |         const children = parent.querySelectorAll("[data-animate='stagger-child']");
  99 |         if (children.length === 0) return;
 100 |         gsap.fromTo(
 101 |           children,
 102 |           { y: 40, opacity: 0 },
 103 |           {
 104 |             y: 0,
 105 |             opacity: 1,
 106 |             duration: 0.6,
 107 |             stagger: 0.1,
 108 |             ease: "power2.out",
 109 |             scrollTrigger: {
 110 |               trigger: parent,
 111 |               start: "top 80%",
 112 |               toggleActions: "play none none none",
 113 |             },
 114 |           },
 115 |         );
 116 |       });
 117 | 
 118 |       // Scale reveal for images
 119 |       revealTargets("[data-animate='scale']").forEach((el) => {
 120 |         gsap.fromTo(
 121 |           el,
 122 |           { scale: 0.95, opacity: 0 },
 123 |           {
 124 |             scale: 1,
 125 |             opacity: 1,
 126 |             duration: 1,
 127 |             ease: "power2.out",
 128 |             scrollTrigger: {
 129 |               trigger: el,
 130 |               start: "top 85%",
 131 |               toggleActions: "play none none none",
 132 |             },
 133 |           },
 134 |         );
 135 |       });
 136 |     }, mainRef);
 137 | 
 138 |     return () => ctx.revert();
 139 |   }, [prefersReducedMotion]);
 140 | 
 141 |   return (
 142 |     <>
 143 |       <Navbar />
 144 |       <main ref={mainRef}>
 145 |         <div data-opening-story className={prefersReducedMotion ? undefined : "opening-story"}>
 146 |           <div data-opening-panel className="bg-dark-hero"><CinematicHero /></div>
 147 |           <div data-opening-panel className="bg-surface-page"><CorporateIntro /></div>
 148 |           <div data-opening-panel className="bg-dark-hero"><StoryboardStrip /></div>
 149 |         </div>
 150 |         <CoreServices />
 151 |         <IndustrialMarquee />
 152 |         <BessTechnology />
 153 |         <FinancialKpi />
 154 |         <HybridSynergy />
 155 |         <SectorApplications />
 156 |         <EngineeringProcess />
 157 |         <ProjectsPortfolio />
 158 |         <CtaContact />
 159 |       </main>
 160 |       <Footer />
 161 |     </>
 162 |   );
 163 | }
```

## src/components/hero/CameraRig.jsx

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 62. SHA-256: `dc6daac7c52dee06a08251d19e32d8f1a6abb653942c6012c2debbfc37267e95`.

İçe aktaranlar: src/components/hero/WindScene.jsx.

```text
   1 | import { useRef, useMemo } from "react";
   2 | import { useFrame, useThree } from "@react-three/fiber";
   3 | import * as THREE from "three";
   4 | 
   5 | /**
   6 |  * Camera positions for 5-stage scroll sequence (in Y-up world space).
   7 |  * After model rotation (-π/2 X): tower Y[0..90], hub at ~(0, 91, 8.1)
   8 |  */
   9 | const CAMERA_POINTS = [
  10 |   // Stage 1: ARRIVAL — Wide establishing shot, low angle
  11 |   new THREE.Vector3(150, 50, 100),
  12 |   // Stage 2: APPROACH — Moving toward turbine
  13 |   new THREE.Vector3(70, 75, 50),
  14 |   // Stage 3: FLY-BY — Alongside nacelle
  15 |   new THREE.Vector3(30, 95, 25),
  16 |   // Stage 4: LANDSCAPE — Pull back wide, higher angle
  17 |   new THREE.Vector3(-90, 70, -50),
  18 |   // Stage 5: TRANSITION — Above, pulling away
  19 |   new THREE.Vector3(-40, 140, -80),
  20 | ];
  21 | 
  22 | const LOOK_AT_POINTS = [
  23 |   new THREE.Vector3(0, 50, 0),
  24 |   new THREE.Vector3(0, 80, 5),
  25 |   new THREE.Vector3(0, 91, 8),
  26 |   new THREE.Vector3(0, 60, 0),
  27 |   new THREE.Vector3(0, 80, 0),
  28 | ];
  29 | 
  30 | /**
  31 |  * Scroll-driven camera controller using CatmullRomCurve3.
  32 |  * Reads progress from a mutable ref to avoid React re-renders on scroll.
  33 |  * @param {Object} props
  34 |  * @param {{ current: number }} props.progressRef - Ref holding scroll progress 0-1
  35 |  */
  36 | export default function CameraRig({ progressRef }) {
  37 |   const { camera } = useThree();
  38 |   const lookAtVec = useRef(new THREE.Vector3());
  39 | 
  40 |   const cameraCurve = useMemo(
  41 |     () => new THREE.CatmullRomCurve3(CAMERA_POINTS, false, "catmullrom", 0.5),
  42 |     [],
  43 |   );
  44 | 
  45 |   const lookAtCurve = useMemo(
  46 |     () => new THREE.CatmullRomCurve3(LOOK_AT_POINTS, false, "catmullrom", 0.5),
  47 |     [],
  48 |   );
  49 | 
  50 |   useFrame(() => {
  51 |     const t = Math.max(0, Math.min(1, progressRef.current));
  52 | 
  53 |     const pos = cameraCurve.getPointAt(t);
  54 |     camera.position.copy(pos);
  55 | 
  56 |     const target = lookAtCurve.getPointAt(t);
  57 |     lookAtVec.current.copy(target);
  58 |     camera.lookAt(lookAtVec.current);
  59 |   });
  60 | 
  61 |   return null;
  62 | }
```

## src/components/hero/CinematicHero.jsx

Durum: Aktif import grafiğinde. Satır: 48. SHA-256: `715bf0141bd4f139d1e8d5679bea7c5258ef4ba5fa064b52dae36729d5bb460d`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { HERO } from "../../constants/content.js";
   2 | import heroImage from "../../assets/images/hero-wind-turbines.png";
   3 | import AeroButton from "../ui/AeroButton.jsx";
   4 | 
   5 | /** The approved single hero; section transitions are managed by the opening story. */
   6 | export default function CinematicHero() {
   7 |   return (
   8 |     <section
   9 |       id="hero"
  10 |       className="relative min-h-[100svh] w-full overflow-hidden bg-dark-hero"
  11 |     >
  12 |       <div
  13 |         className="pointer-events-none absolute -top-16 right-0 -bottom-16 left-0"
  14 |       >
  15 |         <img
  16 |           src={heroImage}
  17 |           alt="Gün batımında yeşil tepeler üzerindeki rüzgâr türbinleri"
  18 |           width={1448}
  19 |           height={1086}
  20 |           loading="eager"
  21 |           fetchPriority="high"
  22 |           className="h-full w-full object-cover object-[60%_top] md:object-[center_top]"
  23 |         />
  24 |         <div aria-hidden="true" className="hero-sun-softener absolute inset-0" />
  25 |       </div>
  26 |       <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-transparent" />
  27 | 
  28 |       <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-end px-6 pt-32 pb-20 sm:pb-28">
  29 |         <div className="w-full max-w-xl lg:w-[48%]">
  30 |           <h1 className="text-display-hero text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
  31 |             {HERO.headline}
  32 |           </h1>
  33 |           <p className="mt-6 text-body-lg text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
  34 |             {HERO.description}
  35 |           </p>
  36 |           <div className="mt-10 flex flex-wrap items-center gap-4">
  37 |             <AeroButton variant="neutral" href="#iletisim">
  38 |               {HERO.ctaPrimary}
  39 |             </AeroButton>
  40 |             <AeroButton variant="text" href="#hizmetler">
  41 |               {HERO.ctaSecondary}
  42 |             </AeroButton>
  43 |           </div>
  44 |         </div>
  45 |       </div>
  46 |     </section>
  47 |   );
  48 | }
```

## src/components/hero/DroneParallaxHero.jsx

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 96. SHA-256: `6e44f9e1956aff4468f21c0926037b4c85f14e24c5829bd373a2bf3363139bd2`.

İçe aktaranlar: src/components/hero/HeroSection.jsx.

```text
   1 | import { useRef, useEffect } from "react";
   2 | import gsap from "gsap";
   3 | import { ScrollTrigger } from "gsap/ScrollTrigger";
   4 | 
   5 | import bgSrc from "../../assets/images/background_approx.webp";
   6 | import revealSrc from "../../assets/images/landscape_reveal.webp";
   7 | import fgSrc from "../../assets/images/turbine_foreground.png";
   8 | 
   9 | gsap.registerPlugin(ScrollTrigger);
  10 | 
  11 | /**
  12 |  * 3-layer parallax hero driven by a GSAP scrub timeline.
  13 |  * Layers (back → front): background landscape, landscape reveal, foreground turbine.
  14 |  * Does NOT pin — pinning is owned by parent HeroSection's ScrollTrigger.
  15 |  *
  16 |  * @param {{ sectionRef: React.RefObject<HTMLElement> }} props
  17 |  */
  18 | export default function DroneParallaxHero({ sectionRef }) {
  19 |   const bgRef = useRef(null);
  20 |   const revealRef = useRef(null);
  21 |   const fgRef = useRef(null);
  22 | 
  23 |   useEffect(() => {
  24 |     const section = sectionRef?.current;
  25 |     if (!section) return;
  26 | 
  27 |     const ctx = gsap.context(() => {
  28 |       const tl = gsap.timeline({
  29 |         scrollTrigger: {
  30 |           trigger: section,
  31 |           start: "top top",
  32 |           end: "+=350%",
  33 |           scrub: 1,
  34 |           // No pin — parent HeroSection owns the pin
  35 |         },
  36 |       });
  37 | 
  38 |       // Background parallax: slow zoom + upward drift (0–100%)
  39 |       tl.fromTo(bgRef.current, { scale: 1, y: "0%" }, { scale: 1.15, y: "-8%", ease: "none" }, 0);
  40 | 
  41 |       // Foreground turbine: scale up + drift left and up (0–100%)
  42 |       tl.fromTo(
  43 |         fgRef.current,
  44 |         { scale: 1, x: "0%", y: "0%" },
  45 |         { scale: 1.3, x: "-15%", y: "-5%", ease: "none" },
  46 |         0,
  47 |       );
  48 | 
  49 |       // Landscape reveal: fade in + settle (65–100%)
  50 |       tl.fromTo(
  51 |         revealRef.current,
  52 |         { opacity: 0, scale: 1.1, y: "5%" },
  53 |         { opacity: 1, scale: 1, y: "0%", ease: "none" },
  54 |         0.65,
  55 |       );
  56 |     }, section);
  57 | 
  58 |     return () => ctx.revert();
  59 |   }, [sectionRef]);
  60 | 
  61 |   const layerBase = "absolute inset-0 h-full w-full object-cover";
  62 | 
  63 |   return (
  64 |     <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
  65 |       {/* Layer 0 — Background landscape */}
  66 |       <img
  67 |         ref={bgRef}
  68 |         src={bgSrc}
  69 |         alt=""
  70 |         className={`${layerBase} z-0 will-change-transform`}
  71 |         loading="eager"
  72 |         decoding="async"
  73 |       />
  74 | 
  75 |       {/* Layer 1 — Landscape reveal (starts invisible) */}
  76 |       <img
  77 |         ref={revealRef}
  78 |         src={revealSrc}
  79 |         alt=""
  80 |         className={`${layerBase} z-[1] opacity-0 will-change-[transform,opacity]`}
  81 |         loading="eager"
  82 |         decoding="async"
  83 |       />
  84 | 
  85 |       {/* Layer 2 — Foreground turbine */}
  86 |       <img
  87 |         ref={fgRef}
  88 |         src={fgSrc}
  89 |         alt=""
  90 |         className={`${layerBase} z-[2] will-change-transform`}
  91 |         loading="eager"
  92 |         decoding="async"
  93 |       />
  94 |     </div>
  95 |   );
  96 | }
```

## src/components/hero/FrameSequencePlayer.jsx

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 108. SHA-256: `abf39235bf9e372aad32cb38cefd5b48d514be48088e80d77867f51bfbed4276`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import { useRef, useEffect } from "react";
   2 | import useFrameLoader from "../../hooks/useFrameLoader.js";
   3 | 
   4 | /**
   5 |  * Canvas-based image sequence renderer driven by scroll progress.
   6 |  * Draws frames via requestAnimationFrame — no React re-renders on scroll.
   7 |  * Uses cover scaling to fill canvas while preserving aspect ratio.
   8 |  *
   9 |  * @param {Object} props
  10 |  * @param {{ current: number }} props.progressRef - Scroll progress 0-1
  11 |  * @param {number} props.frameCount - Total number of frames
  12 |  * @param {string} props.basePath - Base URL path (e.g. "/frames/desktop")
  13 |  * @param {"webp" | "avif" | "jpg"} [props.format="webp"]
  14 |  * @param {(loaded: number, total: number) => void} [props.onLoadProgress]
  15 |  */
  16 | export default function FrameSequencePlayer({
  17 |   progressRef,
  18 |   frameCount,
  19 |   basePath,
  20 |   format = "webp",
  21 |   onLoadProgress,
  22 | }) {
  23 |   const canvasRef = useRef(null);
  24 |   const lastFrameRef = useRef(-1);
  25 |   const getFrameRef = useRef(null);
  26 | 
  27 |   const { getFrame } = useFrameLoader({
  28 |     frameCount,
  29 |     basePath,
  30 |     format,
  31 |     onLoadProgress,
  32 |   });
  33 | 
  34 |   // Keep getFrame ref fresh so rAF loop never restarts
  35 |   useEffect(() => {
  36 |     getFrameRef.current = getFrame;
  37 |   }, [getFrame]);
  38 | 
  39 |   useEffect(() => {
  40 |     const canvas = canvasRef.current;
  41 |     if (!canvas) return;
  42 |     const ctx = canvas.getContext("2d");
  43 |     if (!ctx) return;
  44 | 
  45 |     let rafId = 0;
  46 |     let canvasWidth = 0;
  47 |     let canvasHeight = 0;
  48 | 
  49 |     function updateSize() {
  50 |       const dpr = window.devicePixelRatio || 1;
  51 |       const w = canvas.clientWidth;
  52 |       const h = canvas.clientHeight;
  53 |       const newW = Math.round(w * dpr);
  54 |       const newH = Math.round(h * dpr);
  55 |       if (canvas.width !== newW || canvas.height !== newH) {
  56 |         canvas.width = newW;
  57 |         canvas.height = newH;
  58 |         canvasWidth = newW;
  59 |         canvasHeight = newH;
  60 |         lastFrameRef.current = -1; // Force redraw after resize
  61 |       }
  62 |     }
  63 | 
  64 |     const ro = new ResizeObserver(() => updateSize());
  65 |     ro.observe(canvas);
  66 |     updateSize();
  67 | 
  68 |     function drawCover(img) {
  69 |       if (canvasWidth === 0 || canvasHeight === 0) return;
  70 |       const iw = img.naturalWidth;
  71 |       const ih = img.naturalHeight;
  72 | 
  73 |       // Cover scaling: fill canvas, crop overflow, center
  74 |       const scale = Math.max(canvasWidth / iw, canvasHeight / ih);
  75 |       const dw = iw * scale;
  76 |       const dh = ih * scale;
  77 |       const dx = (canvasWidth - dw) / 2;
  78 |       const dy = (canvasHeight - dh) / 2;
  79 | 
  80 |       ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  81 |       ctx.drawImage(img, dx, dy, dw, dh);
  82 |     }
  83 | 
  84 |     function tick() {
  85 |       const progress = progressRef.current;
  86 |       const targetFrame = Math.round(progress * (frameCount - 1));
  87 | 
  88 |       if (targetFrame !== lastFrameRef.current) {
  89 |         const img = getFrameRef.current?.(targetFrame);
  90 |         if (img) {
  91 |           drawCover(img);
  92 |           lastFrameRef.current = targetFrame;
  93 |         }
  94 |       }
  95 | 
  96 |       rafId = requestAnimationFrame(tick);
  97 |     }
  98 | 
  99 |     rafId = requestAnimationFrame(tick);
 100 | 
 101 |     return () => {
 102 |       cancelAnimationFrame(rafId);
 103 |       ro.disconnect();
 104 |     };
 105 |   }, [progressRef, frameCount]);
 106 | 
 107 |   return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
 108 | }
```

## src/components/hero/HeroSection.jsx

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 250. SHA-256: `b0f3e87ecf688b22b1936e7fec09b4defb66d7097bb45e6706d6e22aad0a5607`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import { useRef, useEffect, useState, lazy, Suspense } from "react";
   2 | import gsap from "gsap";
   3 | import { ScrollTrigger } from "gsap/ScrollTrigger";
   4 | import { ChevronDown } from "lucide-react";
   5 | import { HERO } from "../../constants/content.js";
   6 | import AeroButton from "../ui/AeroButton.jsx";
   7 | import useReducedMotion from "../../hooks/useReducedMotion.js";
   8 | import posterSrc from "../../assets/images/poster.webp";
   9 | 
  10 | // Idempotent — safe even if App.jsx also registers
  11 | gsap.registerPlugin(ScrollTrigger);
  12 | 
  13 | const DroneParallaxHero = lazy(() => import("./DroneParallaxHero.jsx"));
  14 | 
  15 | /**
  16 |  * Cinematic scroll stage labels.
  17 |  */
  18 | const STAGES = Object.freeze([
  19 |   { id: "01", label: "Giriş" },
  20 |   { id: "02", label: "Yaklaşma" },
  21 |   { id: "03", label: "Geçiş" },
  22 |   { id: "04", label: "Manzara" },
  23 |   { id: "05", label: "Keşfet" },
  24 | ]);
  25 | 
  26 | /**
  27 |  * One-time check: viewport large enough for cinematic sequence.
  28 |  * Deliberately not reactive to resize — toggling mid-session
  29 |  * would cause layout jumps and re-downloads.
  30 |  * @returns {boolean}
  31 |  */
  32 | function checkCanShowCinematic() {
  33 |   if (typeof window === "undefined") return false;
  34 |   return window.innerWidth >= 768;
  35 | }
  36 | 
  37 | /**
  38 |  * Full-screen cinematic hero with scroll-driven parallax layers.
  39 |  * Scroll-pinned with 5-stage animation via GSAP ScrollTrigger.
  40 |  * Falls back to static poster on mobile or when prefers-reduced-motion.
  41 |  */
  42 | export default function HeroSection() {
  43 |   const sectionRef = useRef(null);
  44 |   const headlineRef = useRef(null);
  45 |   const descRef = useRef(null);
  46 |   const ctaRef = useRef(null);
  47 |   const scrollIndRef = useRef(null);
  48 |   const fadeRef = useRef(null);
  49 |   const secondHeadlineRef = useRef(null);
  50 |   const secondDescRef = useRef(null);
  51 |   const progressRef = useRef(0);
  52 |   const activeStageRef = useRef(0);
  53 |   const prefersReducedMotion = useReducedMotion();
  54 |   const [canShowCinematic] = useState(checkCanShowCinematic);
  55 |   const [activeStage, setActiveStage] = useState(0);
  56 | 
  57 |   const showCinematic = canShowCinematic && !prefersReducedMotion;
  58 | 
  59 |   // GSAP ScrollTrigger: pin hero and drive text overlay animations
  60 |   useEffect(() => {
  61 |     if (!showCinematic) return;
  62 |     const section = sectionRef.current;
  63 | 
  64 |     const ctx = gsap.context(() => {
  65 |       // Pin the hero section and create 350vh of scroll space
  66 |       ScrollTrigger.create({
  67 |         trigger: section,
  68 |         start: "top top",
  69 |         end: "+=350%",
  70 |         pin: true,
  71 |         onUpdate: (self) => {
  72 |           progressRef.current = self.progress;
  73 |           const stageCount = STAGES.length;
  74 |           const next = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
  75 |           if (next !== activeStageRef.current) {
  76 |             activeStageRef.current = next;
  77 |             setActiveStage(next);
  78 |           }
  79 |         },
  80 |       });
  81 | 
  82 |       // Text overlay timeline — scrubbed to scroll progress
  83 |       const tl = gsap.timeline({
  84 |         scrollTrigger: {
  85 |           trigger: section,
  86 |           start: "top top",
  87 |           end: "+=350%",
  88 |           scrub: 1,
  89 |         },
  90 |       });
  91 | 
  92 |       // Fade scroll indicator immediately on first scroll
  93 |       tl.to(scrollIndRef.current, { opacity: 0, duration: 0.05 }, 0);
  94 |       // Fade primary content out during approach stage (10-28% scroll)
  95 |       tl.to(descRef.current, { opacity: 0, y: -30, duration: 0.12 }, 0.1);
  96 |       tl.to(ctaRef.current, { opacity: 0, duration: 0.1 }, 0.12);
  97 |       tl.to(headlineRef.current, { opacity: 0, y: -50, duration: 0.15 }, 0.13);
  98 |       // Secondary text overlay fade-in during landscape reveal (85-100%)
  99 |       tl.fromTo(
 100 |         secondHeadlineRef.current,
 101 |         { opacity: 0, y: 30 },
 102 |         { opacity: 1, y: 0, duration: 0.15 },
 103 |         0.85,
 104 |       );
 105 |       tl.fromTo(
 106 |         secondDescRef.current,
 107 |         { opacity: 0, y: 20 },
 108 |         { opacity: 1, y: 0, duration: 0.12 },
 109 |         0.88,
 110 |       );
 111 |       // Fade scene to dark at the end for smooth transition to next section
 112 |       tl.fromTo(fadeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.92);
 113 |     }, section);
 114 | 
 115 |     return () => ctx.revert();
 116 |   }, [showCinematic]);
 117 | 
 118 |   return (
 119 |     <section
 120 |       ref={sectionRef}
 121 |       id="hero"
 122 |       className={`relative w-full overflow-hidden bg-dark-hero ${
 123 |         showCinematic ? "h-screen" : "flex min-h-screen items-center pt-24 pb-32"
 124 |       }`}
 125 |     >
 126 |       {/* Parallax layers or static fallback */}
 127 |       {showCinematic ? (
 128 |         <Suspense fallback={null}>
 129 |           <DroneParallaxHero sectionRef={sectionRef} />
 130 |         </Suspense>
 131 |       ) : (
 132 |         <div className="absolute inset-0">
 133 |           <div className="absolute inset-0 bg-gradient-to-br from-dark-hero via-dark-accent to-brand-primary/30" />
 134 |           <img
 135 |             src={posterSrc}
 136 |             alt=""
 137 |             className="absolute inset-0 h-full w-full object-cover"
 138 |             loading="eager"
 139 |           />
 140 |         </div>
 141 |       )}
 142 | 
 143 |       {/* Gradient overlays for text readability over scene */}
 144 |       <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-dark-hero/80 via-dark-hero/40 to-transparent" />
 145 |       <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-dark-hero/60 via-transparent to-dark-hero/30" />
 146 | 
 147 |       {/* Transition overlay — fades scene out at end of cinematic scroll */}
 148 |       {showCinematic && (
 149 |         <div
 150 |           ref={fadeRef}
 151 |           className="pointer-events-none absolute inset-0 z-[4] bg-dark-hero opacity-0"
 152 |         />
 153 |       )}
 154 | 
 155 |       {/* Primary content overlay */}
 156 |       <div
 157 |         className={`relative z-10 mx-auto w-full max-w-7xl px-6 ${
 158 |           showCinematic ? "flex h-full items-center" : ""
 159 |         }`}
 160 |       >
 161 |         <div className="max-w-2xl">
 162 |           <h1 ref={headlineRef} className="text-display-xl text-white">
 163 |             {HERO.headline}
 164 |           </h1>
 165 |           <p ref={descRef} className="mt-6 max-w-xl text-body-lg text-white/70">
 166 |             {HERO.description}
 167 |           </p>
 168 |           <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
 169 |             <AeroButton variant="primary" href="#iletisim">
 170 |               {HERO.ctaPrimary}
 171 |             </AeroButton>
 172 |             <AeroButton variant="ghost" href="#hizmetler">
 173 |               {HERO.ctaSecondary}
 174 |             </AeroButton>
 175 |           </div>
 176 |         </div>
 177 |       </div>
 178 | 
 179 |       {/* Secondary content overlay — visible during landscape reveal (85-100%) */}
 180 |       {showCinematic && (
 181 |         <div className="pointer-events-none absolute inset-0 z-[11] flex items-center">
 182 |           <div className="mx-auto w-full max-w-7xl px-6">
 183 |             <div className="max-w-2xl">
 184 |               <h2 ref={secondHeadlineRef} className="text-display-lg text-white opacity-0">
 185 |                 {HERO.secondaryHeadline}
 186 |               </h2>
 187 |               <p ref={secondDescRef} className="mt-4 max-w-xl text-body-lg text-white/70 opacity-0">
 188 |                 {HERO.secondaryDescription}
 189 |               </p>
 190 |             </div>
 191 |           </div>
 192 |         </div>
 193 |       )}
 194 | 
 195 |       {/* Cinematic stage indicators (cinematic mode only, desktop) */}
 196 |       {showCinematic && (
 197 |         <div className="absolute right-6 bottom-24 z-10 hidden flex-col items-end gap-2 md:flex">
 198 |           {STAGES.map((stage, i) => (
 199 |             <div
 200 |               key={stage.id}
 201 |               className={`flex items-center gap-3 transition-opacity duration-300 ${
 202 |                 i === activeStage ? "opacity-100" : "opacity-30"
 203 |               }`}
 204 |             >
 205 |               <span className="font-display text-xs font-medium tracking-wider text-white/60">
 206 |                 {stage.label}
 207 |               </span>
 208 |               <span
 209 |                 className={`font-display text-sm font-semibold ${
 210 |                   i === activeStage ? "text-brand-lime" : "text-white/40"
 211 |                 }`}
 212 |               >
 213 |                 {stage.id}
 214 |               </span>
 215 |               <div
 216 |                 className={`h-0.5 transition-all duration-300 ${
 217 |                   i === activeStage ? "w-8 bg-brand-lime" : "w-4 bg-white/20"
 218 |                 }`}
 219 |               />
 220 |             </div>
 221 |           ))}
 222 |         </div>
 223 |       )}
 224 | 
 225 |       {/* Telemetry bar */}
 226 |       <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-white/10 bg-dark-hero/60 backdrop-blur-md">
 227 |         <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
 228 |           <div className="flex items-center gap-8 overflow-x-auto">
 229 |             {HERO.telemetry.map((item) => (
 230 |               <div key={item.label} className="flex items-center gap-3 whitespace-nowrap">
 231 |                 <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
 232 |                 <span className="text-xs text-white/50">{item.label}</span>
 233 |                 <span className="font-display text-sm font-medium text-white">{item.value}</span>
 234 |               </div>
 235 |             ))}
 236 |           </div>
 237 |           <a
 238 |             ref={scrollIndRef}
 239 |             href="#storyboard"
 240 |             className="hidden animate-bounce items-center gap-1 text-xs text-white/40 md:flex"
 241 |             aria-label="Aşağı kaydır"
 242 |           >
 243 |             <span>Keşfet</span>
 244 |             <ChevronDown className="h-4 w-4" />
 245 |           </a>
 246 |         </div>
 247 |       </div>
 248 |     </section>
 249 |   );
 250 | }
```

## src/components/hero/HeroVideoBackground.jsx

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 29. SHA-256: `2d279fa8bd31a2a1af5d4404b6bd69f9f15a6bb5c8487cb27c39800560e6a99d`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import heroPoster from "../../assets/images/hero-poster.jpg";
   2 | 
   3 | /** Keep the real video poster visible until playback is ready, including failures. */
   4 | export default function HeroVideoBackground({ videoRef, isVideoReady, hasError }) {
   5 |   const showVideo = isVideoReady && !hasError;
   6 | 
   7 |   return (
   8 |     <>
   9 |       <img
  10 |         src={heroPoster}
  11 |         alt=""
  12 |         fetchPriority="high"
  13 |         className="absolute inset-0 h-full w-full object-cover"
  14 |         style={{ objectPosition: "60% center" }}
  15 |       />
  16 |       <video
  17 |         ref={videoRef}
  18 |         autoPlay
  19 |         poster={heroPoster}
  20 |         muted
  21 |         loop
  22 |         playsInline
  23 |         preload="none"
  24 |         className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-in-out md:object-center"
  25 |         style={{ opacity: showVideo ? 1 : 0, objectPosition: "60% center" }}
  26 |       />
  27 |     </>
  28 |   );
  29 | }
```

## src/components/hero/TurbineModel.jsx

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 74. SHA-256: `246995a71f5903551a73f76d50302889fdc9248957b9b3ceae664d363e73e1f2`.

İçe aktaranlar: src/components/hero/WindScene.jsx.

```text
   1 | import { useRef } from "react";
   2 | import { useGLTF } from "@react-three/drei";
   3 | import { useFrame } from "@react-three/fiber";
   4 | import * as THREE from "three";
   5 | 
   6 | const MODEL_PATH = "/models/wind_turbine_procedural.glb";
   7 | 
   8 | // Hub center in GLB Z-up space, derived from nodes.hub bounding box midpoint.
   9 | // HUB_OFFSET is the inverse — used to shift blade geometry to local origin for rotation.
  10 | const HUB_CENTER = [0, -8.1, 91];
  11 | const HUB_OFFSET = [0, 8.1, -91];
  12 | const BLADE_SPEED = 0.5;
  13 | 
  14 | // Module-scope materials — avoids re-allocation on every render.
  15 | // No dynamic inputs; safe to share across instances.
  16 | const towerMat = new THREE.MeshStandardMaterial({
  17 |   color: "#e8e8e8",
  18 |   metalness: 0.3,
  19 |   roughness: 0.6,
  20 | });
  21 | const nacelleMat = new THREE.MeshStandardMaterial({
  22 |   color: "#d4d4d4",
  23 |   metalness: 0.4,
  24 |   roughness: 0.5,
  25 | });
  26 | const hubMat = new THREE.MeshStandardMaterial({
  27 |   color: "#cccccc",
  28 |   metalness: 0.5,
  29 |   roughness: 0.4,
  30 | });
  31 | const bladeMat = new THREE.MeshStandardMaterial({
  32 |   color: "#f5f5f5",
  33 |   metalness: 0.2,
  34 |   roughness: 0.3,
  35 |   side: THREE.DoubleSide,
  36 | });
  37 | 
  38 | /**
  39 |  * Procedural wind turbine loaded from GLB.
  40 |  * Blades rotate around the hub center on Y axis.
  41 |  * Model uses Z-up coordinates; parent group applies -PI/2 X rotation to convert to Y-up.
  42 |  */
  43 | export default function TurbineModel() {
  44 |   const { nodes } = useGLTF(MODEL_PATH);
  45 |   const rotorRef = useRef();
  46 | 
  47 |   useFrame((_, delta) => {
  48 |     if (rotorRef.current) {
  49 |       rotorRef.current.rotation.y += delta * BLADE_SPEED;
  50 |     }
  51 |   });
  52 | 
  53 |   return (
  54 |     <group rotation={[-Math.PI / 2, 0, 0]}>
  55 |       {/* Static structure */}
  56 |       <mesh geometry={nodes.tower.geometry} material={towerMat} />
  57 |       <mesh geometry={nodes.nacelle.geometry} material={nacelleMat} />
  58 | 
  59 |       {/* Rotor: pivot at hub center, rotate around Y axis */}
  60 |       <group position={HUB_CENTER}>
  61 |         <group ref={rotorRef}>
  62 |           <group position={HUB_OFFSET}>
  63 |             <mesh geometry={nodes.hub.geometry} material={hubMat} />
  64 |             <mesh geometry={nodes.blade_1.geometry} material={bladeMat} />
  65 |             <mesh geometry={nodes.blade_2.geometry} material={bladeMat} />
  66 |             <mesh geometry={nodes.blade_3.geometry} material={bladeMat} />
  67 |           </group>
  68 |         </group>
  69 |       </group>
  70 |     </group>
  71 |   );
  72 | }
  73 | 
  74 | useGLTF.preload(MODEL_PATH);
```

## src/components/hero/WindScene.jsx

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 117. SHA-256: `0a0d11eeaa41dceadfe19006bba4ce33e9dff13ee058d98147460147caed1a00`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import { Suspense } from "react";
   2 | import { Canvas } from "@react-three/fiber";
   3 | import { Environment } from "@react-three/drei";
   4 | import * as THREE from "three";
   5 | import TurbineModel from "./TurbineModel.jsx";
   6 | import CameraRig from "./CameraRig.jsx";
   7 | 
   8 | /**
   9 |  * Ground plane representing terrain.
  10 |  */
  11 | function Ground() {
  12 |   return (
  13 |     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
  14 |       <planeGeometry args={[2000, 2000]} />
  15 |       <meshStandardMaterial color="#2d4a1e" roughness={1} metalness={0} />
  16 |     </mesh>
  17 |   );
  18 | }
  19 | 
  20 | /**
  21 |  * Distant mountain silhouettes using simple geometry.
  22 |  */
  23 | function Mountains() {
  24 |   const positions = [
  25 |     { pos: [-300, 30, -400], scale: [200, 60, 100], color: "#1a2e14" },
  26 |     { pos: [100, 40, -500], scale: [300, 80, 120], color: "#152910" },
  27 |     { pos: [-100, 25, -350], scale: [250, 50, 90], color: "#1f3518" },
  28 |     { pos: [300, 35, -450], scale: [180, 70, 100], color: "#172c12" },
  29 |     { pos: [-400, 20, -300], scale: [150, 40, 80], color: "#223d1a" },
  30 |   ];
  31 | 
  32 |   return (
  33 |     <group>
  34 |       {positions.map((m, i) => (
  35 |         <mesh key={i} position={m.pos} scale={m.scale}>
  36 |           <sphereGeometry args={[1, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
  37 |           <meshStandardMaterial color={m.color} roughness={1} metalness={0} />
  38 |         </mesh>
  39 |       ))}
  40 |     </group>
  41 |   );
  42 | }
  43 | 
  44 | /**
  45 |  * Atmospheric fog and lighting for sunset feel.
  46 |  */
  47 | function Atmosphere() {
  48 |   return (
  49 |     <>
  50 |       {/* Main directional light — sunset angle */}
  51 |       <directionalLight position={[100, 80, -200]} intensity={2.5} color="#ffa040" castShadow />
  52 |       {/* Ambient fill */}
  53 |       <ambientLight intensity={0.3} color="#8090b0" />
  54 |       {/* Rim light from behind */}
  55 |       <directionalLight position={[-50, 40, -100]} intensity={0.8} color="#ff8030" />
  56 |       {/* Soft sky fill from above */}
  57 |       <hemisphereLight args={["#ffd080", "#1a2e14", 0.4]} />
  58 |     </>
  59 |   );
  60 | }
  61 | 
  62 | /**
  63 |  * Loading fallback shown while GLB loads.
  64 |  */
  65 | function LoadingFallback() {
  66 |   return (
  67 |     <mesh position={[0, 45, 0]}>
  68 |       <boxGeometry args={[4, 90, 4]} />
  69 |       <meshStandardMaterial color="#888" opacity={0.3} transparent />
  70 |     </mesh>
  71 |   );
  72 | }
  73 | 
  74 | /**
  75 |  * Three.js canvas for the wind turbine hero scene.
  76 |  * @param {Object} props
  77 |  * @param {{ current: number }} props.progressRef - Ref holding scroll progress 0-1
  78 |  */
  79 | export default function WindScene({ progressRef }) {
  80 |   return (
  81 |     <Canvas
  82 |       dpr={[1, 1.5]}
  83 |       gl={{
  84 |         antialias: true,
  85 |         toneMapping: THREE.ACESFilmicToneMapping,
  86 |         toneMappingExposure: 1.2,
  87 |       }}
  88 |       camera={{
  89 |         fov: 45,
  90 |         near: 1,
  91 |         far: 3000,
  92 |         position: [150, 50, 100],
  93 |       }}
  94 |       style={{ position: "absolute", inset: 0 }}
  95 |     >
  96 |       {/* Sky color */}
  97 |       <color attach="background" args={["#0A131C"]} />
  98 | 
  99 |       {/* Atmospheric depth fog */}
 100 |       <fog attach="fog" args={["#1a2030", 200, 1200]} />
 101 | 
 102 |       {/* Environment for reflections — loads HDR from polyhaven CDN at runtime.
 103 |           TODO: Replace with self-hosted HDR in /public for production. */}
 104 |       <Environment preset="sunset" background={false} />
 105 | 
 106 |       <Atmosphere />
 107 |       <CameraRig progressRef={progressRef} />
 108 | 
 109 |       <Suspense fallback={<LoadingFallback />}>
 110 |         <TurbineModel />
 111 |       </Suspense>
 112 | 
 113 |       <Ground />
 114 |       <Mountains />
 115 |     </Canvas>
 116 |   );
 117 | }
```

## src/components/layout/Footer.jsx

Durum: Aktif import grafiğinde. Satır: 56. SHA-256: `c350ae35897e0439e56e5d68c4d5316203350b419c07ff2db999a8f56144122c`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import logo from "../../assets/images/osb-energy-logo.png";
   2 | import { FOOTER } from "../../constants/content.js";
   3 | 
   4 | /** Minimal dark footer with bottom bar badges. */
   5 | export default function Footer() {
   6 |   return (
   7 |     <footer className="bg-surface-footer pt-20 pb-8">
   8 |       <div className="mx-auto max-w-7xl px-6">
   9 |         {/* Top grid */}
  10 |         <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
  11 |           {/* Brand column */}
  12 |           <div>
  13 |             <a href="#" className="font-display text-xl font-semibold tracking-tight text-white">
  14 |               <img src={logo} alt={FOOTER.brand} width="1000" height="260" className="h-auto w-44" />
  15 |             </a>
  16 |             <p className="mt-3 text-sm text-white/40">{FOOTER.tagline}</p>
  17 |           </div>
  18 | 
  19 |           {/* Link columns */}
  20 |           {FOOTER.columns.map((col) => (
  21 |             <div key={col.title}>
  22 |               <h4 className="text-label text-white/60">{col.title}</h4>
  23 |               <ul className="mt-4 flex flex-col gap-3">
  24 |                 {col.links.map((link) => (
  25 |                   <li key={link.label}>
  26 |                     <a
  27 |                       href={link.href}
  28 |                       className="text-sm text-white/40 transition-colors duration-200 hover:text-white/60"
  29 |                     >
  30 |                       {link.label}
  31 |                     </a>
  32 |                   </li>
  33 |                 ))}
  34 |               </ul>
  35 |             </div>
  36 |           ))}
  37 |         </div>
  38 | 
  39 |         {/* Bottom bar */}
  40 |         <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
  41 |           <p className="text-xs text-white/40">{FOOTER.legal}</p>
  42 |           <div className="flex flex-wrap gap-2">
  43 |             {FOOTER.badges.map((badge) => (
  44 |               <span
  45 |                 key={badge}
  46 |                 className="rounded-md border border-white/5 px-2.5 py-1 text-xs text-white/40"
  47 |               >
  48 |                 {badge}
  49 |               </span>
  50 |             ))}
  51 |           </div>
  52 |         </div>
  53 |       </div>
  54 |     </footer>
  55 |   );
  56 | }
```

## src/components/layout/Navbar.jsx

Durum: Aktif import grafiğinde. Satır: 137. SHA-256: `1b27cf83be083abef4001623a59a08cc795a9fbd4c51b49b82344a274aa134fc`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import logo from "../../assets/images/osb-energy-logo.png";
   2 | import { useState, useEffect, useCallback, useRef } from "react";
   3 | import { ArrowUpRight, Menu, X } from "lucide-react";
   4 | import { NAV_LINKS } from "../../constants/navigation.js";
   5 | import AeroButton from "../ui/AeroButton.jsx";
   6 | 
   7 | const MOBILE_MENU_ID = "mobile-nav-menu";
   8 | 
   9 | /** Transparent header with an independent, full-screen mobile navigation panel. */
  10 | export default function Navbar() {
  11 |   const [mobileOpen, setMobileOpen] = useState(false);
  12 |   const menuRef = useRef(null);
  13 |   const toggleRef = useRef(null);
  14 |   const closeMobile = useCallback(() => setMobileOpen(false), []);
  15 | 
  16 |   useEffect(() => {
  17 |     if (!mobileOpen) return;
  18 |     const menu = menuRef.current;
  19 |     const toggle = toggleRef.current;
  20 |     const previousOverflow = document.body.style.overflow;
  21 |     document.body.style.overflow = "hidden";
  22 |     menu.querySelector("button").focus();
  23 | 
  24 |     const handleKey = event => {
  25 |       if (event.key === "Escape") {
  26 |         event.preventDefault();
  27 |         closeMobile();
  28 |       }
  29 |       if (event.key !== "Tab") return;
  30 |       const elements = [...menu.querySelectorAll("a[href], button")];
  31 |       const first = elements[0];
  32 |       const last = elements[elements.length - 1];
  33 |       if (event.shiftKey && document.activeElement === first) {
  34 |         event.preventDefault();
  35 |         last.focus();
  36 |       } else if (!event.shiftKey && document.activeElement === last) {
  37 |         event.preventDefault();
  38 |         first.focus();
  39 |       }
  40 |     };
  41 |     document.addEventListener("keydown", handleKey);
  42 |     return () => {
  43 |       document.removeEventListener("keydown", handleKey);
  44 |       document.body.style.overflow = previousOverflow;
  45 |       toggle?.focus({ preventScroll: true });
  46 |     };
  47 |   }, [mobileOpen, closeMobile]);
  48 | 
  49 |   useEffect(() => {
  50 |     const mq = window.matchMedia("(min-width: 1024px)");
  51 |     const handler = event => { if (event.matches) closeMobile(); };
  52 |     mq.addEventListener("change", handler);
  53 |     return () => mq.removeEventListener("change", handler);
  54 |   }, [closeMobile]);
  55 | 
  56 |   return (
  57 |     <header className="fixed top-0 right-0 left-0 z-50 bg-transparent">
  58 |       <nav aria-label="Ana gezinme" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
  59 |         <a href="#" className="-mx-2 -my-1.5 inline-flex shrink-0 rounded-lg bg-surface-page/95 px-2 py-1.5 sm:-mx-3 sm:-my-2 sm:px-3 sm:py-2">
  60 |           <img src={logo} alt="OSB ENERGY" width="1000" height="260" className="h-auto w-28 sm:w-40" />
  61 |         </a>
  62 | 
  63 |         <ul className="hidden items-center gap-4 xl:gap-8 lg:flex">
  64 |           {NAV_LINKS.map(link => (
  65 |             <li key={link.href}>
  66 |               <a href={link.href} className="whitespace-nowrap text-base text-white/70 transition-colors duration-200 hover:text-white">
  67 |                 {link.label}
  68 |               </a>
  69 |             </li>
  70 |           ))}
  71 |         </ul>
  72 | 
  73 |         <div className="hidden shrink-0 items-center gap-4 lg:flex">
  74 |           <button type="button" className="whitespace-nowrap text-base text-white/70 transition-colors duration-200 hover:text-white">
  75 |             TR / EN
  76 |           </button>
  77 |           <AeroButton variant="ghost" href="#iletisim" className="text-base! whitespace-nowrap">
  78 |             Fizibilite Talebi
  79 |           </AeroButton>
  80 |         </div>
  81 | 
  82 |         <button
  83 |           ref={toggleRef}
  84 |           type="button"
  85 |           className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-page/95 text-text-main transition-colors hover:bg-white lg:hidden"
  86 |           onClick={() => setMobileOpen(true)}
  87 |           aria-label="Menüyü aç"
  88 |           aria-expanded={mobileOpen}
  89 |           aria-controls={MOBILE_MENU_ID}
  90 |         >
  91 |           <Menu className="h-5 w-5" />
  92 |         </button>
  93 |       </nav>
  94 | 
  95 |       {mobileOpen && (
  96 |         <div
  97 |           ref={menuRef}
  98 |           id={MOBILE_MENU_ID}
  99 |           role="dialog"
 100 |           aria-modal="true"
 101 |           aria-label="Ana menü"
 102 |           data-lenis-prevent
 103 |           className="animate-fade-in fixed inset-0 z-50 flex h-dvh flex-col bg-surface-page px-6 sm:px-10 lg:hidden"
 104 |         >
 105 |           <div className="flex shrink-0 items-center justify-between border-b border-border-subtle py-5">
 106 |             <a href="#hero" onClick={closeMobile}>
 107 |               <img src={logo} alt="OSB ENERGY ana sayfa" width="1000" height="260" className="h-auto w-28 sm:w-40" />
 108 |             </a>
 109 |             <button type="button" onClick={closeMobile} aria-label="Menüyü kapat" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-text-main transition-colors hover:bg-surface-subtle">
 110 |               <X className="h-5 w-5" />
 111 |             </button>
 112 |           </div>
 113 | 
 114 |           <nav aria-label="Mobil gezinme" className="min-h-0 flex-1 overflow-y-auto py-5 sm:py-8">
 115 |             <ul className="divide-y divide-border-subtle">
 116 |               {NAV_LINKS.map(link => (
 117 |                 <li key={link.href}>
 118 |                   <a href={link.href} onClick={closeMobile} className="group flex min-h-16 items-center justify-between gap-4 py-4 font-display text-2xl font-medium tracking-tight text-text-main transition-colors hover:text-brand-primary sm:min-h-20 sm:text-3xl">
 119 |                     {link.label}
 120 |                     <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
 121 |                   </a>
 122 |                 </li>
 123 |               ))}
 124 |             </ul>
 125 |           </nav>
 126 | 
 127 |           <div className="shrink-0 border-t border-border-subtle pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
 128 |             <a href="#iletisim" onClick={closeMobile} className="flex min-h-14 items-center justify-between gap-4 rounded-full bg-brand-primary px-6 text-base font-medium text-white transition-colors hover:bg-brand-primary-hover">
 129 |               Fizibilite Talebi
 130 |               <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
 131 |             </a>
 132 |           </div>
 133 |         </div>
 134 |       )}
 135 |     </header>
 136 |   );
 137 | }
```

## src/components/sections/BessTechnology.jsx

Durum: Aktif import grafiğinde. Satır: 177. SHA-256: `4953834c5f65ddf374863557fb5621d4b78016a45ad7779d131d66dff51c524a`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { createElement, useEffect, useRef } from "react";
   2 | import gsap from "gsap";
   3 | import { ArrowRight } from "lucide-react";
   4 | import { BESS_TECH } from "../../constants/content.js";
   5 | import ICON_MAP from "../ui/IconMap.jsx";
   6 | import useReducedMotion from "../../hooks/useReducedMotion.js";
   7 | import bessShowcase from "../../assets/images/bess-showcase.png";
   8 | 
   9 | const MOBILE_MAX = 768;
  10 | 
  11 | /**
  12 |  * BESS Technology Showcase — full-width split-screen editorial layout.
  13 |  * Left: full-bleed BESS photograph with GSAP parallax.
  14 |  * Right: editorial panel with Manrope headline, DM Sans body, 2×2 feature grid, underline CTA.
  15 |  */
  16 | export default function BessTechnology() {
  17 |   const prefersReducedMotion = useReducedMotion();
  18 |   const sectionRef = useRef(null);
  19 |   const imageRef = useRef(null);
  20 |   const panelRef = useRef(null);
  21 | 
  22 |   useEffect(() => {
  23 |     if (prefersReducedMotion) return;
  24 | 
  25 |     const section = sectionRef.current;
  26 |     const image = imageRef.current;
  27 |     const panel = panelRef.current;
  28 |     if (!section || !image || !panel) return;
  29 | 
  30 |     const isMobile = window.innerWidth < MOBILE_MAX;
  31 | 
  32 |     const ctx = gsap.context(() => {
  33 |       const trigger = {
  34 |         trigger: section,
  35 |         start: "top 85%",
  36 |         end: "bottom 20%",
  37 |         scrub: 0.6,
  38 |       };
  39 | 
  40 |       if (!isMobile) {
  41 |         // Photo: scale down + vertical parallax
  42 |         gsap.fromTo(
  43 |           image,
  44 |           { scale: 1.06, y: -18 },
  45 |           { scale: 1, y: 18, ease: "none", scrollTrigger: trigger },
  46 |         );
  47 |       }
  48 | 
  49 |       // Right panel: staggered reveal
  50 |       const revealElements = panel.querySelectorAll("[data-reveal]");
  51 |       if (revealElements.length > 0) {
  52 |         gsap.fromTo(
  53 |           revealElements,
  54 |           { y: 32, opacity: 0 },
  55 |           {
  56 |             y: 0,
  57 |             opacity: 1,
  58 |             stagger: 0.1,
  59 |             ease: "power2.out",
  60 |             scrollTrigger: {
  61 |               trigger: panel,
  62 |               start: "top 80%",
  63 |               end: "top 35%",
  64 |               scrub: 0.5,
  65 |             },
  66 |           },
  67 |         );
  68 |       }
  69 |     }, section);
  70 | 
  71 |     return () => ctx.revert();
  72 |   }, [prefersReducedMotion]);
  73 | 
  74 |   return (
  75 |     <section id="teknoloji" ref={sectionRef} className="w-full overflow-hidden bg-[#FAFBFC]">
  76 |       <div className="flex min-h-[600px] flex-col md:min-h-[700px] md:flex-row lg:min-h-[760px] xl:max-h-[900px]">
  77 |         {/* Left: full-bleed photograph */}
  78 |         <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:w-[58%] lg:w-[63%]">
  79 |           <img
  80 |             ref={imageRef}
  81 |             src={bessShowcase}
  82 |             alt="OSB Energy BESS enerji depolama sistemi, geniş açı gün batımı görünümü"
  83 |             loading="lazy"
  84 |             decoding="async"
  85 |             width={1200}
  86 |             height={800}
  87 |             className="h-full w-full object-cover object-center"
  88 |           />
  89 |         </div>
  90 | 
  91 |         {/* Right: editorial panel */}
  92 |         <div
  93 |           ref={panelRef}
  94 |           className="flex w-full flex-col justify-center bg-[#FAFBFC] px-6 py-12 sm:px-10 md:w-[42%] md:py-16 md:pl-10 md:pr-12 lg:w-[37%] lg:pl-14 lg:pr-16 xl:pl-16 xl:pr-20"
  95 |         >
  96 |           {/* Eyebrow */}
  97 |           <span
  98 |             data-reveal
  99 |             className="text-xs font-semibold tracking-[0.12em] text-text-soft"
 100 |             style={{ fontFamily: "var(--font-bess-body)" }}
 101 |           >
 102 |             {BESS_TECH.sectionLabel}
 103 |           </span>
 104 | 
 105 |           {/* Headline */}
 106 |           <h2
 107 |             data-reveal
 108 |             className="mt-4 text-text-main"
 109 |             style={{
 110 |               fontFamily: "var(--font-bess-display)",
 111 |               fontWeight: 700,
 112 |               fontSize: "clamp(2rem, 2.5vw + 0.5rem, 3.5rem)",
 113 |               lineHeight: 1.1,
 114 |               letterSpacing: "-0.02em",
 115 |               whiteSpace: "pre-line",
 116 |             }}
 117 |           >
 118 |             {BESS_TECH.headline}
 119 |           </h2>
 120 | 
 121 |           {/* Description */}
 122 |           <p
 123 |             data-reveal
 124 |             className="mt-5 text-text-muted"
 125 |             style={{
 126 |               fontFamily: "var(--font-bess-body)",
 127 |               fontSize: "clamp(1rem, 0.5vw + 0.875rem, 1.125rem)",
 128 |               lineHeight: 1.7,
 129 |             }}
 130 |           >
 131 |             {BESS_TECH.description}
 132 |           </p>
 133 | 
 134 |           {/* 2×2 feature grid */}
 135 |           <div data-reveal className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
 136 |             {BESS_TECH.features.map((feature) => (
 137 |               <div key={feature.title} className="flex items-start gap-3">
 138 |                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
 139 |                   {createElement(ICON_MAP[feature.icon] || ICON_MAP.Circle, {
 140 |                     className: "h-[18px] w-[18px] text-brand-primary",
 141 |                   })}
 142 |                 </div>
 143 |                 <div>
 144 |                   <h3
 145 |                     className="text-sm font-semibold text-text-main"
 146 |                     style={{ fontFamily: "var(--font-bess-body)" }}
 147 |                   >
 148 |                     {feature.title}
 149 |                   </h3>
 150 |                   <p
 151 |                     className="mt-0.5 text-xs leading-relaxed text-text-muted"
 152 |                     style={{ fontFamily: "var(--font-bess-body)" }}
 153 |                   >
 154 |                     {feature.description}
 155 |                   </p>
 156 |                 </div>
 157 |               </div>
 158 |             ))}
 159 |           </div>
 160 | 
 161 |           {/* CTA */}
 162 |           <a
 163 |             data-reveal
 164 |             href="#finansal"
 165 |             className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover"
 166 |             style={{ fontFamily: "var(--font-bess-body)" }}
 167 |           >
 168 |             <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-75 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
 169 |               {BESS_TECH.cta}
 170 |             </span>
 171 |             <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[5px]" />
 172 |           </a>
 173 |         </div>
 174 |       </div>
 175 |     </section>
 176 |   );
 177 | }
```

## src/components/sections/CoreServices.jsx

Durum: Aktif import grafiğinde. Satır: 61. SHA-256: `b8316540399f497aee8ea7fbfd24c900de83c7a693996f29b1a78daa8f321352`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { Check } from "lucide-react";
   2 | import { SERVICES } from "../../constants/content.js";
   3 | import SectionLabel from "../ui/SectionLabel.jsx";
   4 | import AeroButton from "../ui/AeroButton.jsx";
   5 | 
   6 | /** RES + BESS split-showcase cards. */
   7 | export default function CoreServices() {
   8 |   return (
   9 |     <section id="hizmetler" className="bg-surface-subtle py-24">
  10 |       <div className="mx-auto max-w-7xl px-6">
  11 |         <SectionLabel label={SERVICES.sectionLabel} icon="Layers" />
  12 | 
  13 |         <div data-animate="stagger-parent" className="mt-12 flex flex-col gap-8">
  14 |           {SERVICES.items.map((service, i) => (
  15 |             <div
  16 |               key={service.id}
  17 |               data-animate="stagger-child"
  18 |               className="grid overflow-hidden rounded-3xl bg-surface-pure shadow-sm lg:grid-cols-2"
  19 |             >
  20 |               {/* Image */}
  21 |               <div
  22 |                 className={`relative aspect-[4/3] lg:aspect-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}
  23 |               >
  24 |                 <img
  25 |                   src={service.image}
  26 |                   alt={service.title}
  27 |                   loading="lazy"
  28 |                   className="h-full w-full object-cover"
  29 |                 />
  30 |               </div>
  31 | 
  32 |               {/* Content */}
  33 |               <div
  34 |                 className={`flex flex-col justify-center p-8 lg:p-12 ${i % 2 === 1 ? "lg:order-1" : ""}`}
  35 |               >
  36 |                 <span className="text-label text-brand-primary">{service.subtitle}</span>
  37 |                 <h3 className="text-headline-lg mt-2 text-text-main">{service.title}</h3>
  38 |                 <p className="mt-4 text-body text-text-muted">{service.description}</p>
  39 |                 <ul className="mt-6 flex flex-col gap-3">
  40 |                   {service.features.map((feature) => (
  41 |                     <li key={feature} className="flex items-start gap-3">
  42 |                       <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-light/20">
  43 |                         <Check className="h-3 w-3 text-brand-primary" />
  44 |                       </span>
  45 |                       <span className="text-sm text-text-muted">{feature}</span>
  46 |                     </li>
  47 |                   ))}
  48 |                 </ul>
  49 |                 <div className="mt-8">
  50 |                   <AeroButton variant="dark" href="#iletisim">
  51 |                     Detaylı Bilgi
  52 |                   </AeroButton>
  53 |                 </div>
  54 |               </div>
  55 |             </div>
  56 |           ))}
  57 |         </div>
  58 |       </div>
  59 |     </section>
  60 |   );
  61 | }
```

## src/components/sections/CorporateIntro.jsx

Durum: Aktif import grafiğinde. Satır: 40. SHA-256: `10b70aa460abfb2d44f473cf7aaae4e93104848a7a5c2c0b97aa3fabcb98c529`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { CORPORATE } from "../../constants/content.js";
   2 | import SectionLabel from "../ui/SectionLabel.jsx";
   3 | import KpiMetric from "../ui/KpiMetric.jsx";
   4 | 
   5 | /** Kurumsal intro with KPI metrics on light background. */
   6 | export default function CorporateIntro() {
   7 |   return (
   8 |     <section id="hakkimizda" className="bg-surface-page py-24">
   9 |       <div className="mx-auto max-w-7xl px-6">
  10 |         <div className="grid items-start gap-16 lg:grid-cols-12">
  11 |           {/* Text column */}
  12 |           <div className="lg:col-span-7">
  13 |             <SectionLabel label={CORPORATE.sectionLabel} icon="Building2" />
  14 |             <h2 data-animate="headline" className="text-display-lg mt-4 text-text-main">
  15 |               {CORPORATE.headline}
  16 |             </h2>
  17 |             <p data-animate="body" className="mt-6 max-w-xl text-body-lg text-text-muted">
  18 |               {CORPORATE.description}
  19 |             </p>
  20 |           </div>
  21 | 
  22 |           {/* KPI column */}
  23 |           <div className="lg:col-span-5">
  24 |             <div data-animate="stagger-parent" className="grid grid-cols-2 gap-8">
  25 |               {CORPORATE.kpis.map((kpi) => (
  26 |                 <KpiMetric
  27 |                   key={kpi.label}
  28 |                   value={kpi.value}
  29 |                   label={kpi.label}
  30 |                   suffix={kpi.suffix}
  31 |                   prefix={kpi.prefix}
  32 |                 />
  33 |               ))}
  34 |             </div>
  35 |           </div>
  36 |         </div>
  37 |       </div>
  38 |     </section>
  39 |   );
  40 | }
```

## src/components/sections/CtaContact.jsx

Durum: Aktif import grafiğinde. Satır: 75. SHA-256: `b04bb113c846f87da89395826f71bd71568894b1d9ff9a454b8a18faa2ae2099`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { Mail, Phone, MapPin } from "lucide-react";
   2 | import { CTA } from "../../constants/content.js";
   3 | import AeroButton from "../ui/AeroButton.jsx";
   4 | 
   5 | /** Final CTA section with contact info. */
   6 | export default function CtaContact() {
   7 |   return (
   8 |     <section id="iletisim" className="bg-dark-hero py-24">
   9 |       <div className="mx-auto max-w-7xl px-6">
  10 |         <div className="grid items-center gap-12 lg:grid-cols-2">
  11 |           {/* CTA text */}
  12 |           <div>
  13 |             <h2 data-animate="headline" className="text-display-lg whitespace-pre-line text-white">
  14 |               {CTA.headline}
  15 |             </h2>
  16 |             <p data-animate="body" className="mt-6 max-w-lg text-body-lg text-white/60">
  17 |               {CTA.description}
  18 |             </p>
  19 |             <div className="mt-10">
  20 |               <AeroButton variant="neutral" href="mailto:info@osbenergy.com">
  21 |                 {CTA.ctaPrimary}
  22 |               </AeroButton>
  23 |             </div>
  24 |           </div>
  25 | 
  26 |           {/* Contact card */}
  27 |           <div data-animate="scale" className="rounded-2xl border border-white/10 bg-dark-card p-8">
  28 |             <h3 className="text-headline-md text-white">İletişim Bilgileri</h3>
  29 |             <div className="mt-8 flex flex-col gap-6">
  30 |               <div className="flex items-start gap-4">
  31 |                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20">
  32 |                   <Mail className="h-5 w-5 text-brand-primary-light" />
  33 |                 </div>
  34 |                 <div>
  35 |                   <span className="text-label text-white/50">E-posta</span>
  36 |                   <a
  37 |                     href={`mailto:${CTA.ctaSecondary}`}
  38 |                     className="mt-1 block text-white transition-colors hover:text-brand-primary-light"
  39 |                   >
  40 |                     {CTA.ctaSecondary}
  41 |                   </a>
  42 |                 </div>
  43 |               </div>
  44 | 
  45 |               <div className="flex items-start gap-4">
  46 |                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20">
  47 |                   <Phone className="h-5 w-5 text-brand-primary-light" />
  48 |                 </div>
  49 |                 <div>
  50 |                   <span className="text-label text-white/50">Telefon</span>
  51 |                   <a
  52 |                     href={`tel:${CTA.phone.replace(/\s/g, "")}`}
  53 |                     className="mt-1 block text-white transition-colors hover:text-brand-primary-light"
  54 |                   >
  55 |                     {CTA.phone}
  56 |                   </a>
  57 |                 </div>
  58 |               </div>
  59 | 
  60 |               <div className="flex items-start gap-4">
  61 |                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20">
  62 |                   <MapPin className="h-5 w-5 text-brand-primary-light" />
  63 |                 </div>
  64 |                 <div>
  65 |                   <span className="text-label text-white/50">Adres</span>
  66 |                   <p className="mt-1 text-white">{CTA.address}</p>
  67 |                 </div>
  68 |               </div>
  69 |             </div>
  70 |           </div>
  71 |         </div>
  72 |       </div>
  73 |     </section>
  74 |   );
  75 | }
```

## src/components/sections/EngineeringProcess.jsx

Durum: Aktif import grafiğinde. Satır: 76. SHA-256: `5259f2ea52def667446cb0136fdc8681827e3eb0dcb3b636e23f0f43ab957ccf`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import useSectionParallax from "../../hooks/useSectionParallax.js";
   2 | import { PROCESS } from "../../constants/content.js";
   3 | import SectionLabel from "../ui/SectionLabel.jsx";
   4 | import AeroButton from "../ui/AeroButton.jsx";
   5 | 
   6 | /**
   7 |  * Bento panel for a single process step.
   8 |  * @param {Object} props
   9 |  * @param {Object} props.step - Step data { id, title, description }
  10 |  * @param {string} [props.className] - Additional grid/layout classes
  11 |  */
  12 | function BentoPanel({ step, className = "" }) {
  13 |   return (
  14 |     <div
  15 |       data-animate="stagger-child"
  16 |       className={`relative overflow-hidden rounded-2xl border border-white/5 bg-dark-card p-8 transition-all duration-300 hover:scale-[1.01] hover:border-white/10 ${className}`}
  17 |     >
  18 |       <span className="absolute top-4 right-6 font-display text-6xl font-bold text-white/5">
  19 |         {step.id}
  20 |       </span>
  21 |       <span className="text-label text-brand-primary-light">Adım {step.id}</span>
  22 |       <h3 className="mt-3 font-display text-lg font-medium text-white">{step.title}</h3>
  23 |       <p className="mt-2 text-sm text-white/60">{step.description}</p>
  24 |     </div>
  25 |   );
  26 | }
  27 | 
  28 | /** 6-step bento grid on dark background. */
  29 | export default function EngineeringProcess() {
  30 |   const sectionRef = useSectionParallax();
  31 |   const lastStep = PROCESS.steps[PROCESS.steps.length - 1];
  32 |   const gridSteps = PROCESS.steps.slice(0, -1);
  33 | 
  34 |   return (
  35 |     <section ref={sectionRef} id="surec" className="relative overflow-hidden bg-dark-hero py-24">
  36 |       <div className="mx-auto max-w-7xl px-6">
  37 |         <div data-section-parallax="-65" className="mx-auto max-w-2xl text-center">
  38 |           <SectionLabel label={PROCESS.sectionLabel} icon="GitBranch" theme="dark" />
  39 |           <h2 data-animate="headline" className="text-display-lg mt-4 text-white">
  40 |             {PROCESS.headline}
  41 |           </h2>
  42 |         </div>
  43 | 
  44 |         <div
  45 |           data-section-parallax="55"
  46 |           data-animate="stagger-parent"
  47 |           className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
  48 |         >
  49 |           {/* Row 1: col-span-2 + col-span-1 */}
  50 |           <BentoPanel step={gridSteps[0]} className="lg:col-span-2" />
  51 |           <BentoPanel step={gridSteps[1]} />
  52 | 
  53 |           {/* Row 2: 3 equal columns */}
  54 |           {gridSteps.slice(2).map((step) => (
  55 |             <BentoPanel key={step.id} step={step} />
  56 |           ))}
  57 | 
  58 |           {/* Row 3: Full-width CTA panel */}
  59 |           <div
  60 |             data-animate="stagger-child"
  61 |             className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/5 bg-dark-card p-8 sm:flex-row sm:items-center md:col-span-2 lg:col-span-3"
  62 |           >
  63 |             <div>
  64 |               <span className="text-label text-brand-primary-light">Adım {lastStep.id}</span>
  65 |               <h3 className="mt-2 font-display text-lg font-medium text-white">{lastStep.title}</h3>
  66 |               <p className="mt-1 text-sm text-white/60">{lastStep.description}</p>
  67 |             </div>
  68 |             <AeroButton variant="ghost" href="#iletisim" className="shrink-0">
  69 |               Fizibilite Talebi
  70 |             </AeroButton>
  71 |           </div>
  72 |         </div>
  73 |       </div>
  74 |     </section>
  75 |   );
  76 | }
```

## src/components/sections/FinancialKpi.jsx

Durum: Aktif import grafiğinde. Satır: 51. SHA-256: `a42f8333724a7c265cf48f2b47491888625b75f5159d39bc8f98e932632efde7`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { FINANCIAL } from "../../constants/content.js";
   2 | import SectionLabel from "../ui/SectionLabel.jsx";
   3 | 
   4 | /** Financial benefit cards + ROI feasibility box. */
   5 | export default function FinancialKpi() {
   6 |   return (
   7 |     <section id="finansal" className="bg-surface-subtle py-24">
   8 |       <div className="mx-auto max-w-7xl px-6">
   9 |         <SectionLabel label={FINANCIAL.sectionLabel} icon="TrendingUp" />
  10 |         <h2 data-animate="headline" className="text-display-lg mt-4 text-text-main">
  11 |           {FINANCIAL.headline}
  12 |         </h2>
  13 | 
  14 |         {/* Benefit cards */}
  15 |         <div data-animate="stagger-parent" className="mt-12 grid gap-6 sm:grid-cols-3">
  16 |           {FINANCIAL.benefits.map((benefit) => (
  17 |             <div
  18 |               key={benefit.title}
  19 |               data-animate="stagger-child"
  20 |               className="rounded-2xl border border-border-subtle bg-surface-pure p-8 shadow-sm"
  21 |             >
  22 |               <span className="text-code-metric text-brand-primary">{benefit.value}</span>
  23 |               <h3 className="mt-3 font-display text-lg font-medium text-text-main">
  24 |                 {benefit.title}
  25 |               </h3>
  26 |               <p className="mt-2 text-sm text-text-muted">{benefit.description}</p>
  27 |             </div>
  28 |           ))}
  29 |         </div>
  30 | 
  31 |         {/* ROI box */}
  32 |         <div
  33 |           data-animate="scale"
  34 |           className="mt-8 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-8"
  35 |         >
  36 |           <h3 className="text-headline-md text-text-main">{FINANCIAL.roi.title}</h3>
  37 |           <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  38 |             {FINANCIAL.roi.metrics.map((metric) => (
  39 |               <div key={metric.label} className="text-center">
  40 |                 <span className="font-display text-2xl font-semibold text-brand-primary">
  41 |                   {metric.value}
  42 |                 </span>
  43 |                 <p className="mt-1 text-sm text-text-muted">{metric.label}</p>
  44 |               </div>
  45 |             ))}
  46 |           </div>
  47 |         </div>
  48 |       </div>
  49 |     </section>
  50 |   );
  51 | }
```

## src/components/sections/HybridSynergy.jsx

Durum: Aktif import grafiğinde. Satır: 61. SHA-256: `98e073700a4d83af2b211e6abc333e8fd6371755489115eaf8a9402c3c882ce3`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { createElement } from "react";
   2 | import { HYBRID } from "../../constants/content.js";
   3 | import SectionLabel from "../ui/SectionLabel.jsx";
   4 | import ICON_MAP from "../ui/IconMap.jsx";
   5 | 
   6 | /** Rüzgâr + Depolama dark section with split layout. */
   7 | export default function HybridSynergy() {
   8 |   return (
   9 |     <section className="relative overflow-hidden bg-dark-hero py-24">
  10 |       {/* Glow orb */}
  11 |       <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/15 blur-[150px]" />
  12 | 
  13 |       <div className="relative mx-auto max-w-7xl px-6">
  14 |         <div className="grid items-center gap-12 lg:grid-cols-2">
  15 |           {/* Text */}
  16 |           <div>
  17 |             <SectionLabel label={HYBRID.sectionLabel} icon="Combine" theme="dark" />
  18 |             <h2
  19 |               data-animate="headline"
  20 |               className="text-display-lg mt-4 whitespace-pre-line text-white"
  21 |             >
  22 |               {HYBRID.headline}
  23 |             </h2>
  24 |             <p data-animate="body" className="mt-6 max-w-lg text-body-lg text-white/60">
  25 |               {HYBRID.description}
  26 |             </p>
  27 | 
  28 |             {/* Feature mini-cards */}
  29 |             <div className="mt-10 flex flex-col gap-4 sm:flex-row">
  30 |               {HYBRID.features.map((feature) => (
  31 |                 <div
  32 |                   key={feature.title}
  33 |                   className="flex-1 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
  34 |                 >
  35 |                   {createElement(ICON_MAP[feature.icon] || ICON_MAP.Circle, {
  36 |                     className: "h-5 w-5 text-brand-primary-light",
  37 |                   })}
  38 |                   <h3 className="mt-3 font-display text-sm font-medium text-white">
  39 |                     {feature.title}
  40 |                   </h3>
  41 |                   <p className="mt-1 text-xs text-white/50">{feature.description}</p>
  42 |                 </div>
  43 |               ))}
  44 |             </div>
  45 |           </div>
  46 | 
  47 |           {/* Image */}
  48 |           <div data-animate="scale" className="relative overflow-hidden rounded-3xl">
  49 |             <img
  50 |               src={HYBRID.image}
  51 |               alt="Hibrit enerji sistemi"
  52 |               loading="lazy"
  53 |               className="h-full w-full object-cover"
  54 |             />
  55 |             <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/60 to-transparent" />
  56 |           </div>
  57 |         </div>
  58 |       </div>
  59 |     </section>
  60 |   );
  61 | }
```

## src/components/sections/IndustrialMarquee.jsx

Durum: Aktif import grafiğinde. Satır: 68. SHA-256: `ff50cc261af5b3a75fa1e05e734d66de2a49a02b79351cfda15efe2d59f162d8`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { MARQUEE_IMAGES } from "../../constants/content.js";
   2 | import AeroButton from "../ui/AeroButton.jsx";
   3 | 
   4 | /** Dual-track image marquee with CTA column. */
   5 | export default function IndustrialMarquee() {
   6 |   // Duplicate images for seamless loop
   7 |   const doubledImages = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
   8 | 
   9 |   return (
  10 |     <section className="overflow-hidden bg-dark-hero py-24">
  11 |       <div className="mx-auto max-w-7xl px-6">
  12 |         <div className="grid items-center gap-12 lg:grid-cols-12">
  13 |           {/* CTA column */}
  14 |           <div className="lg:col-span-4">
  15 |             <h2 className="text-display-lg text-white">
  16 |               Sahadan
  17 |               <br />
  18 |               görüntüler.
  19 |             </h2>
  20 |             <p className="mt-4 text-body text-white/60">
  21 |               Türkiye genelinde tamamladığımız projelerin sahadan fotoğrafları.
  22 |             </p>
  23 |             <div className="mt-8">
  24 |               <AeroButton variant="neutral" href="#projeler">
  25 |                 Tüm Projeler
  26 |               </AeroButton>
  27 |             </div>
  28 |           </div>
  29 | 
  30 |           {/* Marquee tracks */}
  31 |           <div className="relative overflow-hidden lg:col-span-8">
  32 |             {/* Gradient edge fades */}
  33 |             <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-dark-hero to-transparent" />
  34 |             <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-dark-hero to-transparent" />
  35 | 
  36 |             {/* Track 1 - left */}
  37 |             <div className="mb-4 flex w-max animate-marquee-left gap-4 hover:[animation-play-state:paused]">
  38 |               {doubledImages.map((img, i) => (
  39 |                 <div key={`t1-${i}`} className="h-48 w-72 shrink-0 overflow-hidden rounded-xl">
  40 |                   <img
  41 |                     src={img}
  42 |                     alt="Saha fotoğrafı"
  43 |                     loading="eager"
  44 |                     className="h-full w-full object-cover"
  45 |                   />
  46 |                 </div>
  47 |               ))}
  48 |             </div>
  49 | 
  50 |             {/* Track 2 - right */}
  51 |             <div className="flex w-max animate-marquee-right gap-4 hover:[animation-play-state:paused]">
  52 |               {doubledImages.map((img, i) => (
  53 |                 <div key={`t2-${i}`} className="h-48 w-72 shrink-0 overflow-hidden rounded-xl">
  54 |                   <img
  55 |                     src={img}
  56 |                     alt="Saha fotoğrafı"
  57 |                     loading="eager"
  58 |                     className="h-full w-full object-cover"
  59 |                   />
  60 |                 </div>
  61 |               ))}
  62 |             </div>
  63 |           </div>
  64 |         </div>
  65 |       </div>
  66 |     </section>
  67 |   );
  68 | }
```

## src/components/sections/ProjectsPortfolio.jsx

Durum: Aktif import grafiğinde. Satır: 56. SHA-256: `c7a71ef2e438d0de07aeaf392e48522bad7b5f25a0917f4a3d3903071b886cd0`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import useSectionParallax from "../../hooks/useSectionParallax.js";
   2 | import { Leaf } from "lucide-react";
   3 | import { PROJECTS } from "../../constants/content.js";
   4 | import SectionLabel from "../ui/SectionLabel.jsx";
   5 | import ProjectCard from "../ui/ProjectCard.jsx";
   6 | 
   7 | /** Reference projects — 2-column editorial layout. */
   8 | export default function ProjectsPortfolio() {
   9 |   const sectionRef = useSectionParallax();
  10 |   return (
  11 |     <section ref={sectionRef} id="projeler" className="relative overflow-hidden border-y border-border-subtle bg-surface-blue py-24">
  12 |       <div className="mx-auto max-w-7xl px-6">
  13 |         <div className="grid gap-12 lg:grid-cols-5">
  14 |           {/* Left column — header + sustainability */}
  15 |           <div data-section-parallax="-60" className="min-w-0 lg:col-span-2">
  16 |             <SectionLabel label={PROJECTS.sectionLabel} icon="FolderKanban" />
  17 |             <h2 data-animate="headline" className="text-display-lg mt-4 text-text-main">
  18 |               {PROJECTS.headline}
  19 |             </h2>
  20 | 
  21 |             {/* Sustainability card */}
  22 |             <div
  23 |               data-animate="scale"
  24 |               className="mt-10 rounded-2xl border border-white/10 bg-dark-card p-8"
  25 |             >
  26 |               <div className="inline-flex items-center gap-2 text-brand-primary-light">
  27 |                 <Leaf className="h-5 w-5" />
  28 |                 <span className="text-label">{PROJECTS.sustainability.title}</span>
  29 |               </div>
  30 |               <p className="mt-4 text-body text-white/70">{PROJECTS.sustainability.description}</p>
  31 |               <div className="mt-8 flex gap-8">
  32 |                 {PROJECTS.sustainability.stats.map((stat) => (
  33 |                   <div key={stat.label}>
  34 |                     <span className="font-display text-3xl font-semibold text-brand-primary-light">
  35 |                       {stat.value}
  36 |                     </span>
  37 |                     <p className="mt-1 text-sm text-white/50">{stat.label}</p>
  38 |                   </div>
  39 |                 ))}
  40 |               </div>
  41 |             </div>
  42 |           </div>
  43 | 
  44 |           {/* Right column — project cards */}
  45 |           <div data-section-parallax="70" className="min-w-0 lg:col-span-3">
  46 |             <div data-animate="stagger-parent" className="grid gap-6 sm:grid-cols-2">
  47 |               {PROJECTS.items.map((project) => (
  48 |                 <ProjectCard key={project.title} {...project} />
  49 |               ))}
  50 |             </div>
  51 |           </div>
  52 |         </div>
  53 |       </div>
  54 |     </section>
  55 |   );
  56 | }
```

## src/components/sections/SectorApplications.jsx

Durum: Aktif import grafiğinde. Satır: 33. SHA-256: `25343f186a94c2eb34f3055b16176a79cb4838204640dedc2cce64350ac43720`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { SECTORS } from "../../constants/content.js";
   2 | import SectionLabel from "../ui/SectionLabel.jsx";
   3 | import SectorCard from "../ui/SectorCard.jsx";
   4 | 
   5 | /** 2x4 grid of sector cards. */
   6 | export default function SectorApplications() {
   7 |   return (
   8 |     <section className="bg-surface-page py-24">
   9 |       <div className="mx-auto max-w-7xl px-6">
  10 |         <div className="mx-auto max-w-2xl text-center">
  11 |           <SectionLabel label={SECTORS.sectionLabel} icon="Grid3X3" />
  12 |           <h2 data-animate="headline" className="text-display-lg mt-4 text-text-main">
  13 |             {SECTORS.headline}
  14 |           </h2>
  15 |         </div>
  16 | 
  17 |         <div
  18 |           data-animate="stagger-parent"
  19 |           className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
  20 |         >
  21 |           {SECTORS.items.map((sector) => (
  22 |             <SectorCard
  23 |               key={sector.title}
  24 |               title={sector.title}
  25 |               icon={sector.icon}
  26 |               image={sector.image}
  27 |             />
  28 |           ))}
  29 |         </div>
  30 |       </div>
  31 |     </section>
  32 |   );
  33 | }
```

## src/components/sections/StoryboardStrip.jsx

Durum: Aktif import grafiğinde. Satır: 139. SHA-256: `f75485319ee66cbe88ecf3a28aacc580c7526feb5fc1aeb1599c1ab466bad9fa`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { useEffect, useRef } from "react";
   2 | import gsap from "gsap";
   3 | import { STORYBOARD } from "../../constants/content.js";
   4 | import useReducedMotion from "../../hooks/useReducedMotion.js";
   5 | 
   6 | /** Scene cuts can be configured in STORYBOARD.frames[].startSeconds. */
   7 | export default function StoryboardStrip() {
   8 |   const rootRef = useRef(null);
   9 |   const videoRef = useRef(null);
  10 |   const selectRef = useRef(() => {});
  11 |   const reducedMotion = useReducedMotion();
  12 | 
  13 |   useEffect(() => {
  14 |     const root = rootRef.current;
  15 |     const video = videoRef.current;
  16 |     const panels = [...root.querySelectorAll("[data-stage-panel]")];
  17 |     const buttons = [...root.querySelectorAll("[data-stage-button]")];
  18 |     const progress = root.querySelector("[data-progress]");
  19 |     const connection = navigator.connection;
  20 |     gsap.set(panels, { opacity: 0, y: 0 });
  21 |     gsap.set(panels[0], { opacity: 1 });
  22 |     panels.forEach((panel, i) => panel.setAttribute("aria-hidden", String(i !== 0)));
  23 |     buttons.forEach((button, i) => i === 0 ? button.setAttribute("aria-current", "step") : button.removeAttribute("aria-current"));
  24 |     let active = 0;
  25 |     let loaded = false;
  26 |     let visible = false;
  27 |     let failed = false;
  28 |     let usingMobile = window.matchMedia("(max-width: 767px)").matches;
  29 |     let animation;
  30 |     const cuts = () => STORYBOARD.frames.map((frame, i) => frame.startSeconds ?? (Number.isFinite(video.duration) ? video.duration * i / 3 : 0));
  31 |     const activate = (index) => {
  32 |       if (index === active) return;
  33 |       animation?.kill();
  34 |       const outgoing = panels[active];
  35 |       const incoming = panels[index];
  36 |       buttons[active].removeAttribute("aria-current");
  37 |       buttons[index].setAttribute("aria-current", "step");
  38 |       outgoing.setAttribute("aria-hidden", "true");
  39 |       incoming.removeAttribute("aria-hidden");
  40 |       if (reducedMotion) {
  41 |         gsap.set(outgoing, { opacity: 0, y: 0 });
  42 |         gsap.set(incoming, { opacity: 1, y: 0 });
  43 |       } else {
  44 |         gsap.set(panels.filter(p => p !== outgoing && p !== incoming), { opacity: 0 });
  45 |         animation = gsap.timeline().to(outgoing, { opacity: 0, duration: 0.15 })
  46 |           .fromTo(incoming, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
  47 |       }
  48 |       active = index;
  49 |     };
  50 |     const sync = () => {
  51 |       if (!Number.isFinite(video.duration) || !video.duration) return;
  52 |       const index = cuts().reduce((result, start, i) => video.currentTime >= start ? i : result, 0);
  53 |       activate(index);
  54 |       progress.style.transform = `scaleX(${Math.min(1, video.currentTime / video.duration)})`;
  55 |     };
  56 |     selectRef.current = index => {
  57 |       if (loaded && !failed && Number.isFinite(video.duration)) video.currentTime = cuts()[index];
  58 |       activate(index);
  59 |     };
  60 |     const play = () => {
  61 |       if (visible && !document.hidden && !failed && !reducedMotion && !connection?.saveData) video.play().catch(() => {});
  62 |       else video.pause();
  63 |     };
  64 |     const onError = () => {
  65 |       if (usingMobile) {
  66 |         usingMobile = false;
  67 |         video.src = STORYBOARD.video;
  68 |         video.load();
  69 |         return;
  70 |       }
  71 |       failed = true;
  72 |       video.style.opacity = "0";
  73 |       root.querySelector("[data-video-status]").hidden = false;
  74 |     };
  75 |     const onReady = () => { video.style.opacity = "1"; play(); };
  76 |     const observer = new IntersectionObserver(([entry]) => {
  77 |       visible = entry.isIntersecting;
  78 |       if (visible && !loaded && !reducedMotion && !connection?.saveData) {
  79 |         loaded = true;
  80 |         video.src = usingMobile ? STORYBOARD.mobileVideo : STORYBOARD.video;
  81 |         video.load();
  82 |       }
  83 |       play();
  84 |     }, { threshold: 0.05 });
  85 |     observer.observe(root);
  86 |     video.addEventListener("timeupdate", sync);
  87 |     video.addEventListener("loadedmetadata", sync);
  88 |     video.addEventListener("canplay", onReady);
  89 |     video.addEventListener("error", onError);
  90 |     document.addEventListener("visibilitychange", play);
  91 |     connection?.addEventListener("change", play);
  92 |     return () => {
  93 |       observer.disconnect();
  94 |       animation?.kill();
  95 |       video.pause();
  96 |       video.removeAttribute("src");
  97 |       video.load();
  98 |       video.removeEventListener("timeupdate", sync);
  99 |       video.removeEventListener("loadedmetadata", sync);
 100 |       video.removeEventListener("canplay", onReady);
 101 |       video.removeEventListener("error", onError);
 102 |       document.removeEventListener("visibilitychange", play);
 103 |       connection?.removeEventListener("change", play);
 104 |       gsap.set(panels, { clearProps: "all" });
 105 |       selectRef.current = () => {};
 106 |     };
 107 |   }, [reducedMotion]);
 108 | 
 109 |   return (
 110 |     <section id="storyboard" ref={rootRef} aria-labelledby="process-heading" className="cinematic-process">
 111 |       <div className="process-intro">
 112 |         <p className="text-label text-brand-primary-light">{STORYBOARD.sectionLabel}</p>
 113 |         <h2 id="process-heading" className="text-display-lg mt-5 text-white">{STORYBOARD.headline}</h2>
 114 |         <p className="mt-6 text-body text-white/65">{STORYBOARD.description}</p>
 115 |       </div>
 116 |       <div className="process-film">
 117 |         <img src={STORYBOARD.poster} alt="Enerji projesinin saha ve mühendislik süreci" loading="lazy" width="1280" height="720" />
 118 |         <video ref={videoRef} autoPlay muted playsInline loop preload="none" poster={STORYBOARD.poster} aria-label="Saha analizi, mühendislik ve kurulum süreci" />
 119 |         <span data-video-status hidden className="sr-only">Süreç videosu yüklenemedi. Poster gösteriliyor.</span>
 120 |       </div>
 121 |       <div className="process-stages">
 122 |         <div className="flex gap-6" role="group" aria-label="Proje aşamaları">
 123 |           {STORYBOARD.frames.map((frame, i) => (
 124 |             <button type="button" key={frame.id} data-stage-button aria-current={i === 0 ? "step" : undefined} aria-label={`${frame.id} ${frame.title}`} onClick={() => selectRef.current(i)} className="process-stage-button font-display">{frame.id}</button>
 125 |           ))}
 126 |         </div>
 127 |         <div className="process-progress" aria-hidden="true"><div data-progress /></div>
 128 |         <div className="process-stage-copy">
 129 |           {STORYBOARD.frames.map((frame, i) => (
 130 |             <div key={frame.id} data-stage-panel aria-hidden={i !== 0 ? true : undefined} style={{ opacity: i === 0 ? 1 : 0 }}>
 131 |               <h3 className="text-headline-md text-white">{frame.title}</h3>
 132 |               <p className="mt-3 text-sm leading-relaxed text-white/60">{frame.description}</p>
 133 |             </div>
 134 |           ))}
 135 |         </div>
 136 |       </div>
 137 |     </section>
 138 |   );
 139 | }
```

## src/components/ui/AeroButton.jsx

Durum: Aktif import grafiğinde. Satır: 57. SHA-256: `bc630b383448bbdd6e940af7d41aed9361ec48cb5e9377c7e908702e9d9c283d`.

İçe aktaranlar: src/components/hero/CinematicHero.jsx, src/components/hero/HeroSection.jsx, src/components/layout/Navbar.jsx, src/components/sections/CoreServices.jsx, src/components/sections/CtaContact.jsx, src/components/sections/EngineeringProcess.jsx, src/components/sections/IndustrialMarquee.jsx.

```text
   1 | import { ArrowRight } from "lucide-react";
   2 | 
   3 | /**
   4 |  * Editorial CTA button with multiple variants.
   5 |  * @param {Object} props
   6 |  * @param {string} props.children - Button label
   7 |  * @param {"ghost"|"text"|"neutral"|"dark"} [props.variant="ghost"]
   8 |  * @param {string} [props.href]
   9 |  * @param {Function} [props.onClick]
  10 |  * @param {string} [props.className]
  11 |  */
  12 | export default function AeroButton({ children, variant = "ghost", href, onClick, className = "" }) {
  13 |   const isText = variant === "text";
  14 | 
  15 |   const base = isText
  16 |     ? "group inline-flex items-center gap-2 font-medium transition-all duration-300 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
  17 |     : "group inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 text-sm px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-2";
  18 | 
  19 |   const variants = {
  20 |     ghost:
  21 |       "border border-white/20 text-white hover:border-white/40 hover:bg-white/5 focus-visible:outline-white",
  22 |     text: "text-white hover:underline focus-visible:outline-white",
  23 |     neutral: "bg-white/10 text-white hover:bg-white/15 focus-visible:outline-white",
  24 |     dark: "bg-dark-hero text-white hover:bg-dark-accent focus-visible:outline-brand-primary",
  25 |   };
  26 | 
  27 |   const classes = `${base} ${variants[variant] ?? variants.ghost} ${className}`;
  28 | 
  29 |   const arrow = isText ? (
  30 |     <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
  31 |   ) : (
  32 |     <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5">
  33 |       <ArrowRight className="h-3.5 w-3.5" />
  34 |     </span>
  35 |   );
  36 | 
  37 |   const content = (
  38 |     <>
  39 |       <span>{children}</span>
  40 |       {arrow}
  41 |     </>
  42 |   );
  43 | 
  44 |   if (href) {
  45 |     return (
  46 |       <a href={href} className={classes}>
  47 |         {content}
  48 |       </a>
  49 |     );
  50 |   }
  51 | 
  52 |   return (
  53 |     <button type="button" onClick={onClick} className={classes}>
  54 |       {content}
  55 |     </button>
  56 |   );
  57 | }
```

## src/components/ui/IconMap.jsx

Durum: Aktif import grafiğinde. Satır: 78. SHA-256: `2bfe9c55f62059511461eab8f65d527e626924ff17888c0206fb37f6c6af665e`.

İçe aktaranlar: src/components/sections/BessTechnology.jsx, src/components/sections/HybridSynergy.jsx, src/components/ui/SectionLabel.jsx, src/components/ui/SectorCard.jsx.

```text
   1 | import {
   2 |   Activity,
   3 |   ArrowRight,
   4 |   ArrowRightLeft,
   5 |   Battery,
   6 |   Boxes,
   7 |   Building2,
   8 |   Cable,
   9 |   Car,
  10 |   Circle,
  11 |   Clock,
  12 |   Combine,
  13 |   Cpu,
  14 |   Dot,
  15 |   Factory,
  16 |   FlaskConical,
  17 |   FolderKanban,
  18 |   GitBranch,
  19 |   Grid3X3,
  20 |   Layers,
  21 |   Mountain,
  22 |   Shirt,
  23 |   ShieldCheck,
  24 |   Timer,
  25 |   TrendingUp,
  26 |   Truck,
  27 |   UtensilsCrossed,
  28 |   Wheat,
  29 |   Zap,
  30 | } from "lucide-react";
  31 | 
  32 | /**
  33 |  * Explicit icon allowlist map for dynamic icon lookup.
  34 |  * Only icons listed here can be resolved by name string.
  35 |  * @type {Readonly<Record<string, import("lucide-react").LucideIcon>>}
  36 |  */
  37 | const ICON_MAP = Object.freeze({
  38 |   Activity,
  39 |   ArrowRight,
  40 |   ArrowRightLeft,
  41 |   Battery,
  42 |   Boxes,
  43 |   Building2,
  44 |   Cable,
  45 |   Car,
  46 |   Circle,
  47 |   Clock,
  48 |   Combine,
  49 |   Cpu,
  50 |   Dot,
  51 |   Factory,
  52 |   FlaskConical,
  53 |   FolderKanban,
  54 |   GitBranch,
  55 |   Grid3X3,
  56 |   Layers,
  57 |   Mountain,
  58 |   Shirt,
  59 |   ShieldCheck,
  60 |   Timer,
  61 |   TrendingUp,
  62 |   Truck,
  63 |   UtensilsCrossed,
  64 |   Wheat,
  65 |   Zap,
  66 | });
  67 | 
  68 | /**
  69 |  * Resolves icon component by name string from allowlist.
  70 |  * @param {string} name - Icon name
  71 |  * @param {import("lucide-react").LucideIcon} [fallback] - Fallback icon
  72 |  * @returns {import("lucide-react").LucideIcon}
  73 |  */
  74 | export function resolveIcon(name, fallback = Circle) {
  75 |   return ICON_MAP[name] || fallback;
  76 | }
  77 | 
  78 | export default ICON_MAP;
```

## src/components/ui/KpiMetric.jsx

Durum: Aktif import grafiğinde. Satır: 21. SHA-256: `4f327d536a536ae53f2f95da88439d46923440be4f536dc11688af2edf61b361`.

İçe aktaranlar: src/components/sections/CorporateIntro.jsx.

```text
   1 | /**
   2 |  * Large number + separator + label for KPI display.
   3 |  * @param {Object} props
   4 |  * @param {string} props.value
   5 |  * @param {string} props.label
   6 |  * @param {string} [props.suffix]
   7 |  * @param {string} [props.prefix]
   8 |  */
   9 | export default function KpiMetric({ value, label, suffix = "", prefix = "" }) {
  10 |   return (
  11 |     <div data-animate="stagger-child" className="flex flex-col items-center text-center">
  12 |       <span className="text-code-metric text-text-main">
  13 |         {prefix}
  14 |         {value}
  15 |         {suffix}
  16 |       </span>
  17 |       <div className="mt-2 h-px w-12 bg-border-subtle" />
  18 |       <span className="mt-2 text-label text-text-muted">{label}</span>
  19 |     </div>
  20 |   );
  21 | }
```

## src/components/ui/ProjectCard.jsx

Durum: Aktif import grafiğinde. Satır: 46. SHA-256: `b1914c51380403c8962195e5c638e6c7f21839d0ad9cd11b20172b30e04a878a`.

İçe aktaranlar: src/components/sections/ProjectsPortfolio.jsx.

```text
   1 | const STATUS_COLORS = Object.freeze({
   2 |   Tamamlandı: "bg-green-500/20 text-green-400",
   3 |   "Devam Ediyor": "bg-amber-500/20 text-amber-400",
   4 |   Planlama: "bg-blue-500/20 text-blue-400",
   5 | });
   6 | 
   7 | const STATUS_FALLBACK = "bg-white/10 text-white";
   8 | 
   9 | /**
  10 |  * Project reference card with status badge.
  11 |  * @param {Object} props
  12 |  * @param {string} props.title
  13 |  * @param {string} props.capacity
  14 |  * @param {string} props.type
  15 |  * @param {string} props.status
  16 |  * @param {string} props.image
  17 |  */
  18 | export default function ProjectCard({ title, capacity, type, status, image }) {
  19 |   return (
  20 |     <div data-animate="stagger-child" className="group overflow-hidden rounded-2xl bg-dark-card">
  21 |       <div className="relative aspect-[16/10] overflow-hidden">
  22 |         <img
  23 |           src={image}
  24 |           alt={title}
  25 |           loading="lazy"
  26 |           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
  27 |         />
  28 |         <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
  29 |         <span
  30 |           className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[status] || STATUS_FALLBACK}`}
  31 |         >
  32 |           {status}
  33 |         </span>
  34 |       </div>
  35 |       <div className="p-5">
  36 |         <h3 className="font-display text-lg font-medium text-white">{title}</h3>
  37 |         <p className="mt-1 text-sm text-text-soft">{type}</p>
  38 |         <div className="mt-3 flex items-center gap-2">
  39 |           <span className="rounded-lg bg-brand-primary/20 px-2.5 py-1 text-xs font-medium text-brand-primary-light">
  40 |             {capacity}
  41 |           </span>
  42 |         </div>
  43 |       </div>
  44 |     </div>
  45 |   );
  46 | }
```

## src/components/ui/SectionLabel.jsx

Durum: Aktif import grafiğinde. Satır: 20. SHA-256: `c104b0c38cb7da0cb7617ab07443319d566e9c993dd17c7d4604fca3177fa771`.

İçe aktaranlar: src/components/sections/CoreServices.jsx, src/components/sections/CorporateIntro.jsx, src/components/sections/EngineeringProcess.jsx, src/components/sections/FinancialKpi.jsx, src/components/sections/HybridSynergy.jsx, src/components/sections/ProjectsPortfolio.jsx, src/components/sections/SectorApplications.jsx.

```text
   1 | import { createElement } from "react";
   2 | import ICON_MAP from "./IconMap.jsx";
   3 | 
   4 | /**
   5 |  * Reusable section header with icon + mono label.
   6 |  * @param {Object} props
   7 |  * @param {string} props.label
   8 |  * @param {string} [props.icon] - Lucide icon name from ICON_MAP
   9 |  * @param {"light"|"dark"} [props.theme="light"]
  10 |  */
  11 | export default function SectionLabel({ label, icon = "Dot", theme = "light" }) {
  12 |   const color = theme === "dark" ? "text-brand-primary-light" : "text-brand-primary";
  13 | 
  14 |   return (
  15 |     <div className={`inline-flex items-center gap-2 ${color}`}>
  16 |       {createElement(ICON_MAP[icon] || ICON_MAP.Dot, { className: "h-4 w-4" })}
  17 |       <span className="text-label">{label}</span>
  18 |     </div>
  19 |   );
  20 | }
```

## src/components/ui/SectorCard.jsx

Durum: Aktif import grafiğinde. Satır: 34. SHA-256: `07c539ff8630af80f774e938c79948cb4fab19a79ff5f0ac9aa33f91c273ec9d`.

İçe aktaranlar: src/components/sections/SectorApplications.jsx.

```text
   1 | import { createElement } from "react";
   2 | import ICON_MAP from "./IconMap.jsx";
   3 | 
   4 | /**
   5 |  * Sector grid card with photography background.
   6 |  * @param {Object} props
   7 |  * @param {string} props.title
   8 |  * @param {string} props.icon - Lucide icon name from ICON_MAP
   9 |  * @param {string} props.image - Image URL
  10 |  */
  11 | export default function SectorCard({ title, icon, image }) {
  12 |   return (
  13 |     <div
  14 |       data-animate="stagger-child"
  15 |       className="group relative overflow-hidden rounded-2xl bg-dark-card aspect-[4/3]"
  16 |     >
  17 |       <img
  18 |         src={image}
  19 |         alt={title}
  20 |         loading="lazy"
  21 |         className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
  22 |       />
  23 |       <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/90 via-dark-hero/40 to-transparent" />
  24 |       <div className="relative flex h-full flex-col justify-end p-5">
  25 |         <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
  26 |           {createElement(ICON_MAP[icon] || ICON_MAP.Building2, {
  27 |             className: "h-5 w-5 text-brand-primary-light",
  28 |           })}
  29 |         </div>
  30 |         <h3 className="font-display text-lg font-medium text-white">{title}</h3>
  31 |       </div>
  32 |     </div>
  33 |   );
  34 | }
```

## src/constants/content.js

Durum: Aktif import grafiğinde. Satır: 327. SHA-256: `d465342228fc8af97578e6e45d64672f6bc7577562074fb18b015cd30f2a7ff0`.

İçe aktaranlar: src/components/hero/CinematicHero.jsx, src/components/hero/HeroSection.jsx, src/components/layout/Footer.jsx, src/components/sections/BessTechnology.jsx, src/components/sections/CoreServices.jsx, src/components/sections/CorporateIntro.jsx, src/components/sections/CtaContact.jsx, src/components/sections/EngineeringProcess.jsx, src/components/sections/FinancialKpi.jsx, src/components/sections/HybridSynergy.jsx, src/components/sections/IndustrialMarquee.jsx, src/components/sections/ProjectsPortfolio.jsx, src/components/sections/SectorApplications.jsx, src/components/sections/StoryboardStrip.jsx.

```text
   1 | // All text content extracted from Stitch design reference.
   2 | // Single source of truth for copy — keeps components data-free.
   3 | 
   4 | export const HERO = Object.freeze({
   5 |   headline: "ENERJİNİN ÖTESİNDE.",
   6 |   description:
   7 |     "Rüzgâr, güneş ve depolama sistemlerini entegre ederek Türkiye'nin enerji altyapısını yeniden tanımlıyoruz. Sanayi için kesintisiz, sürdürülebilir ve maliyet-etkin enerji çözümleri.",
   8 |   ctaPrimary: "Fizibilite Talebi",
   9 |   ctaSecondary: "Çözümlerimiz",
  10 |   secondaryHeadline: "Doğa ile Teknoloji, Bir Arada.",
  11 |   secondaryDescription: "Türkiye'nin enerji geleceğini şekillendiren projeler.",
  12 | });
  13 | 
  14 | // Set startSeconds to measured scene cuts; null uses equal thirds of duration.
  15 | export const STORYBOARD = Object.freeze({
  16 |   sectionLabel: "UÇTAN UCA MÜHENDİSLİK",
  17 |   headline: "Fikirden enerjiye. Her aşamada mühendislik.",
  18 |   description: "Saha potansiyelini analiz ediyor, doğru enerji sistemini tasarlıyor ve projeyi devreye alıyoruz.",
  19 |   video: "/videos/osb-engineering-process.mp4",
  20 |   mobileVideo: "/videos/osb-engineering-process-mobile.mp4",
  21 |   poster: "/videos/osb-engineering-process-poster.jpg",
  22 |   frames: [
  23 |     { id: "01", startSeconds: 0, title: "Saha Analizi", description: "Rüzgâr ve güneş potansiyelinin değerlendirilmesi, arazi koşullarının incelenmesi ve proje ihtiyaçlarının belirlenmesi." },
  24 |     { id: "02", startSeconds: null, title: "Mühendislik", description: "Üretim, depolama ve enerji yönetimi bileşenlerinin proje ihtiyaçlarına uygun şekilde tasarlanması." },
  25 |     { id: "03", startSeconds: null, title: "Kurulum ve Devreye Alma", description: "Saha uygulamalarının koordinasyonu, sistem entegrasyonu, test ve devreye alma süreçlerinin yürütülmesi." },
  26 |   ],
  27 | });
  28 | 
  29 | export const CORPORATE = Object.freeze({
  30 |   sectionLabel: "Kurumsal",
  31 |   headline: "Sanayi için enerji dönüşümü.",
  32 |   description:
  33 |     "2018'den bu yana Türkiye'nin önde gelen sanayi bölgelerinde yenilenebilir enerji ve depolama çözümleri sunuyoruz. Mühendislikten işletmeye, uçtan uca entegre hizmet anlayışımızla sektörün güvenilir iş ortağıyız.",
  34 |   kpis: [
  35 |     { value: "2018", label: "Kuruluş Yılı", suffix: "" },
  36 |     { value: "100", label: "Tamamlanan Proje", suffix: "+" },
  37 |     { value: "100", label: "Yerli Mühendislik", suffix: "%" },
  38 |     { value: "10", label: "Yanıt Süresi", suffix: "ms", prefix: "<" },
  39 |   ],
  40 | });
  41 | 
  42 | export const SERVICES = Object.freeze({
  43 |   sectionLabel: "Hizmetler",
  44 |   items: [
  45 |     {
  46 |       id: "res",
  47 |       title: "Yenilenebilir Enerji Santralleri",
  48 |       subtitle: "RES & GES",
  49 |       description:
  50 |         "Rüzgâr ve güneş enerjisi santrallerinin fizibilite, tasarım, kurulum ve işletme süreçlerini uçtan uca yönetiyoruz.",
  51 |       features: [
  52 |         "Saha analizi ve rüzgâr/güneş ölçümü",
  53 |         "Türbin ve panel seçimi optimizasyonu",
  54 |         "Şebeke bağlantı mühendisliği",
  55 |         "SCADA entegrasyonu ve uzaktan izleme",
  56 |       ],
  57 |       image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
  58 |     },
  59 |     {
  60 |       id: "bess",
  61 |       title: "Enerji Depolama Sistemleri",
  62 |       subtitle: "BESS",
  63 |       description:
  64 |         "Lityum-iyon batarya teknolojisi ile şebeke dengesi, pik yönetimi ve kesintisiz enerji sağlıyoruz.",
  65 |       features: [
  66 |         "Pik tıraşlama ve yük kaydırma",
  67 |         "Frekans regülasyonu desteği",
  68 |         "Kısıntı telafisi ve gelir optimizasyonu",
  69 |         "Modüler ve ölçeklenebilir mimari",
  70 |       ],
  71 |       image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=800&q=80",
  72 |     },
  73 |   ],
  74 | });
  75 | 
  76 | export const MARQUEE_IMAGES = Object.freeze([
  77 |   "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=400&q=80",
  78 |   "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
  79 |   "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80",
  80 |   "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80",
  81 |   "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&q=80",
  82 |   "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80",
  83 | ]);
  84 | 
  85 | export const BESS_TECH = Object.freeze({
  86 |   sectionLabel: "ENERJİ DEPOLAMA TEKNOLOJİSİ",
  87 |   headline: "Enerjinizi yalnızca tüketmeyin. Yönetin.",
  88 |   description:
  89 |     "OSB ENERGY batarya enerji depolama çözümleriyle elektrik tüketiminizi daha kontrollü, esnek ve verimli yönetin. Enerjiyi ihtiyaç duyduğunuz zamanlarda kullanın, yüksek güç taleplerini dengeleyin ve işletmenizin enerji yönetimini güçlendirin.",
  90 |   cta: "BESS çözümlerimizi keşfedin",
  91 |   features: [
  92 |     {
  93 |       title: "Akıllı Enerji Yönetimi",
  94 |       description: "Şarj ve deşarj süreçlerini tesisinizin enerji ihtiyacına göre yönetin.",
  95 |       icon: "Zap",
  96 |     },
  97 |     {
  98 |       title: "Gelişmiş Termal Yönetim",
  99 |       description: "Aktif soğutma teknolojisiyle bataryaların çalışma sıcaklığını kontrol altında tutun.",
 100 |       icon: "ShieldCheck",
 101 |     },
 102 |     {
 103 |       title: "Entegre Güvenlik",
 104 |       description: "BMS izleme, elektriksel koruma ve yangın güvenliği sistemleriyle çok katmanlı koruma.",
 105 |       icon: "Cpu",
 106 |     },
 107 |     {
 108 |       title: "Ölçeklenebilir Altyapı",
 109 |       description: "İşletmenizin enerji ihtiyacına göre genişleyebilen modüler depolama çözümleri.",
 110 |       icon: "Layers",
 111 |     },
 112 |   ],
 113 | });
 114 | 
 115 | export const FINANCIAL = Object.freeze({
 116 |   sectionLabel: "Kazanımlar",
 117 |   headline: "Somut finansal etki.",
 118 |   benefits: [
 119 |     {
 120 |       value: "%20-30",
 121 |       title: "Enerji Maliyeti Düşüşü",
 122 |       description: "Pik tıraşlama ve optimizasyon ile doğrudan maliyet tasarrufu.",
 123 |     },
 124 |     {
 125 |       value: "0 TL",
 126 |       title: "Kısıntı Cezası",
 127 |       description: "Depolama ile kısıntı telafisi, sıfır ceza riski.",
 128 |     },
 129 |     {
 130 |       value: "0",
 131 |       title: "Plansız Duruş",
 132 |       description: "Kesintisiz enerji ile üretim sürekliliği garantisi.",
 133 |     },
 134 |   ],
 135 |   roi: {
 136 |     title: "Yatırım Fizibilitesi",
 137 |     metrics: [
 138 |       { label: "Geri Ödeme", value: "4-6 Yıl" },
 139 |       { label: "IRR", value: "%18-24" },
 140 |       { label: "NPV Pozitif", value: "3. Yıl" },
 141 |       { label: "Ekonomik Ömür", value: "15+ Yıl" },
 142 |     ],
 143 |   },
 144 | });
 145 | 
 146 | export const HYBRID = Object.freeze({
 147 |   sectionLabel: "Hibrit Sinerji",
 148 |   headline: "Rüzgâr + Depolama:\nKesintisiz güç.",
 149 |   description:
 150 |     "Rüzgâr enerjisi üretimi ile BESS'i entegre ederek kısıntı kayıplarını sıfırlar, şebeke dengesini sağlar ve yatırım getirisini maksimize ederiz.",
 151 |   features: [
 152 |     {
 153 |       title: "Kısıntı Sıfırlama",
 154 |       description: "Üretim fazlasını depolayarak kısıntı kayıplarını ortadan kaldırır.",
 155 |       icon: "ShieldCheck",
 156 |     },
 157 |     {
 158 |       title: "Frekans Desteği",
 159 |       description: "Anlık şebeke frekans regülasyonu ile ek gelir kaynağı oluşturur.",
 160 |       icon: "Activity",
 161 |     },
 162 |   ],
 163 |   image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=900&q=80",
 164 | });
 165 | 
 166 | export const SECTORS = Object.freeze({
 167 |   sectionLabel: "Sektörler",
 168 |   headline: "Her sektöre özel enerji çözümü.",
 169 |   items: [
 170 |     {
 171 |       title: "Organize Sanayi",
 172 |       icon: "Factory",
 173 |       image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400&q=80",
 174 |     },
 175 |     {
 176 |       title: "Otomotiv",
 177 |       icon: "Car",
 178 |       image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=80",
 179 |     },
 180 |     {
 181 |       title: "Gıda & İçecek",
 182 |       icon: "UtensilsCrossed",
 183 |       image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
 184 |     },
 185 |     {
 186 |       title: "Tekstil",
 187 |       icon: "Shirt",
 188 |       image: "https://images.unsplash.com/photo-1558171813-01342dfc331a?w=400&q=80",
 189 |     },
 190 |     {
 191 |       title: "Kimya",
 192 |       icon: "FlaskConical",
 193 |       image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80",
 194 |     },
 195 |     {
 196 |       title: "Madencilik",
 197 |       icon: "Mountain",
 198 |       image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=400&q=80",
 199 |     },
 200 |     {
 201 |       title: "Lojistik",
 202 |       icon: "Truck",
 203 |       image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80",
 204 |     },
 205 |     {
 206 |       title: "Tarım",
 207 |       icon: "Wheat",
 208 |       image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&q=80",
 209 |     },
 210 |   ],
 211 | });
 212 | 
 213 | export const PROCESS = Object.freeze({
 214 |   sectionLabel: "Süreç",
 215 |   headline: "Uçtan uca mühendislik süreci.",
 216 |   steps: [
 217 |     {
 218 |       id: "01",
 219 |       title: "Keşif & Analiz",
 220 |       description: "Saha ziyareti, enerji tüketim analizi ve potansiyel değerlendirmesi.",
 221 |     },
 222 |     {
 223 |       id: "02",
 224 |       title: "Fizibilite",
 225 |       description: "Teknik ve finansal fizibilite raporu, yatırım modeli.",
 226 |     },
 227 |     {
 228 |       id: "03",
 229 |       title: "Tasarım",
 230 |       description: "Detaylı mühendislik tasarımı, ekipman seçimi ve tedarik.",
 231 |     },
 232 |     { id: "04", title: "Kurulum", description: "Anahtar teslim inşaat, montaj ve devreye alma." },
 233 |     {
 234 |       id: "05",
 235 |       title: "Entegrasyon",
 236 |       description: "Şebeke bağlantısı, SCADA ve otomasyon entegrasyonu.",
 237 |     },
 238 |     {
 239 |       id: "06",
 240 |       title: "İşletme & Bakım",
 241 |       description: "7/24 uzaktan izleme, periyodik bakım ve performans optimizasyonu.",
 242 |     },
 243 |   ],
 244 | });
 245 | 
 246 | export const PROJECTS = Object.freeze({
 247 |   sectionLabel: "Projeler",
 248 |   headline: "Referans projelerimiz.",
 249 |   items: [
 250 |     {
 251 |       title: "Manisa OSB RES",
 252 |       capacity: "50 MW",
 253 |       type: "Rüzgâr Enerji Santrali",
 254 |       status: "Tamamlandı",
 255 |       image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=600&q=80",
 256 |     },
 257 |     {
 258 |       title: "Kayseri OSB BESS",
 259 |       capacity: "25 MW / 100 MWh",
 260 |       type: "Enerji Depolama",
 261 |       status: "Devam Ediyor",
 262 |       image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=600&q=80",
 263 |     },
 264 |     {
 265 |       title: "Bursa OSB Hibrit",
 266 |       capacity: "30 MW RES + 15 MW BESS",
 267 |       type: "Hibrit Sistem",
 268 |       status: "Planlama",
 269 |       image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
 270 |     },
 271 |   ],
 272 |   sustainability: {
 273 |     title: "Sürdürülebilirlik Taahhüdü",
 274 |     description:
 275 |       "Projelerimiz toplam 840.000 ton CO₂ emisyon azaltımı sağlamış, 12.000'den fazla haneye eşdeğer temiz enerji üretmiştir.",
 276 |     stats: [
 277 |       { value: "840K", label: "Ton CO₂ Azaltım" },
 278 |       { value: "12K+", label: "Hane Eşdeğeri" },
 279 |     ],
 280 |   },
 281 | });
 282 | 
 283 | export const CTA = Object.freeze({
 284 |   headline: "Enerji dönüşümüne\nbugün başlayın.",
 285 |   description:
 286 |     "Tesisiniz için ücretsiz fizibilite raporu talep edin. Mühendislik ekibimiz 48 saat içinde size özel analiz sunacaktır.",
 287 |   ctaPrimary: "Fizibilite Talebi",
 288 |   ctaSecondary: "info@osbenergy.com",
 289 |   phone: "+90 (312) 000 00 00",
 290 |   address: "OSB ENERGY Merkez Ofis, Ankara Sanayi Odası, Türkiye",
 291 | });
 292 | 
 293 | export const FOOTER = Object.freeze({
 294 |   brand: "OSB ENERGY",
 295 |   tagline: "Enerjinin Ötesinde.",
 296 |   columns: [
 297 |     {
 298 |       title: "Hizmetler",
 299 |       links: [
 300 |         { label: "Rüzgâr Enerjisi", href: "#hizmetler" },
 301 |         { label: "Güneş Enerjisi", href: "#hizmetler" },
 302 |         { label: "Enerji Depolama", href: "#hizmetler" },
 303 |         { label: "Hibrit Sistemler", href: "#hizmetler" },
 304 |       ],
 305 |     },
 306 |     {
 307 |       title: "Kurumsal",
 308 |       links: [
 309 |         { label: "Hakkımızda", href: "#hakkimizda" },
 310 |         { label: "Projeler", href: "#projeler" },
 311 |         { label: "Sürdürülebilirlik", href: "#projeler" },
 312 |         { label: "Kariyer", href: "#iletisim" },
 313 |       ],
 314 |     },
 315 |     {
 316 |       title: "İletişim",
 317 |       links: [
 318 |         { label: "info@osbenergy.com", href: "mailto:info@osbenergy.com" },
 319 |         { label: "+90 (312) 000 00 00", href: "tel:+903120000000" },
 320 |         { label: "LinkedIn", href: "#" },
 321 |         { label: "Twitter", href: "#" },
 322 |       ],
 323 |     },
 324 |   ],
 325 |   legal: `© ${new Date().getFullYear()} OSB ENERGY. Tüm hakları saklıdır.`,
 326 |   badges: ["ISO 9001", "ISO 14001", "ISO 45001"],
 327 | });
```

## src/constants/heroScenes.js

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 18. SHA-256: `9746cce8cefe1389e47fa7c00edd6e30ab5dd96d806e06b95e94ae3bba1d308d`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import scene01 from "../assets/images/scene-01.jpg";
   2 | import scene02 from "../assets/images/scene-02.jpg";
   3 | import scene03 from "../assets/images/scene-03.jpg";
   4 | import scene04 from "../assets/images/scene-04.jpg";
   5 | import scene05 from "../assets/images/scene-05.jpg";
   6 | 
   7 | /**
   8 |  * Cinematic hero scene images.
   9 |  * To swap an image, update its import path above.
  10 |  * @type {ReadonlyArray<{id: number, src: string}>}
  11 |  */
  12 | export const HERO_SCENES = Object.freeze([
  13 |   { id: 1, src: scene01 },
  14 |   { id: 2, src: scene02 },
  15 |   { id: 3, src: scene03 },
  16 |   { id: 4, src: scene04 },
  17 |   { id: 5, src: scene05 },
  18 | ]);
```

## src/constants/navigation.js

Durum: Aktif import grafiğinde. Satır: 15. SHA-256: `4d411e06703408a0fc02f6d1611e0e10cb9b71535ea622ded9a32fd91f403745`.

İçe aktaranlar: src/components/layout/Navbar.jsx.

```text
   1 | /**
   2 |  * @typedef {Object} NavLink
   3 |  * @property {string} label
   4 |  * @property {string} href
   5 |  */
   6 | 
   7 | /** @type {Readonly<NavLink[]>} */
   8 | export const NAV_LINKS = Object.freeze([
   9 |   { label: "Hakkımızda", href: "#hakkimizda" },
  10 |   { label: "Hizmetler", href: "#hizmetler" },
  11 |   { label: "Teknoloji", href: "#teknoloji" },
  12 |   { label: "Projeler", href: "#projeler" },
  13 |   { label: "Süreç", href: "#surec" },
  14 |   { label: "İletişim", href: "#iletisim" },
  15 | ]);
```

## src/hooks/useFrameLoader.js

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 175. SHA-256: `b9ab32fc372336fc2061f228a0d1186b549a767d862e2f48db9ab6dab55bb9f9`.

İçe aktaranlar: src/components/hero/FrameSequencePlayer.jsx.

```text
   1 | import { useRef, useState, useEffect, useCallback } from "react";
   2 | 
   3 | const MAX_CONCURRENT = 4;
   4 | const MAX_RETRIES = 2;
   5 | const PRIORITY_FRAME_COUNT = 5;
   6 | 
   7 | /**
   8 |  * Pads a number to 3 digits with leading zeros.
   9 |  * @param {number} n
  10 |  * @returns {string}
  11 |  */
  12 | function pad3(n) {
  13 |   return String(n).padStart(3, "0");
  14 | }
  15 | 
  16 | /**
  17 |  * Builds the URL for a given frame index.
  18 |  * @param {string} basePath
  19 |  * @param {number} index
  20 |  * @param {string} format
  21 |  * @returns {string}
  22 |  */
  23 | function buildFrameUrl(basePath, index, format) {
  24 |   return `${basePath}/frame-${pad3(index)}.${format}`;
  25 | }
  26 | 
  27 | /**
  28 |  * Generates a priority-ordered load queue.
  29 |  * First PRIORITY_FRAME_COUNT frames load first, then the rest in order.
  30 |  * @param {number} frameCount
  31 |  * @returns {number[]}
  32 |  */
  33 | function buildLoadQueue(frameCount) {
  34 |   const priority = [];
  35 |   const rest = [];
  36 |   for (let i = 0; i < frameCount; i++) {
  37 |     if (i < PRIORITY_FRAME_COUNT) {
  38 |       priority.push(i);
  39 |     } else {
  40 |       rest.push(i);
  41 |     }
  42 |   }
  43 |   return [...priority, ...rest];
  44 | }
  45 | 
  46 | /**
  47 |  * Progressive frame preloader for image sequence playback.
  48 |  * Loads frames with priority zones and concurrent loading limits.
  49 |  * Returns nearest loaded frame when requested frame is not yet available.
  50 |  *
  51 |  * @param {Object} options
  52 |  * @param {number} options.frameCount - Total number of frames
  53 |  * @param {string} options.basePath - Base URL path for frames (e.g. "/frames/desktop")
  54 |  * @param {string} options.format - Image format extension (e.g. "webp")
  55 |  * @param {(loaded: number, total: number) => void} [options.onLoadProgress] - Progress callback
  56 |  * @returns {{ getFrame: (index: number) => HTMLImageElement | null, progress: { loaded: number, failed: number, total: number }, ready: boolean }}
  57 |  */
  58 | export default function useFrameLoader({ frameCount, basePath, format, onLoadProgress }) {
  59 |   const cacheRef = useRef(new Map());
  60 |   const [progress, setProgress] = useState(() => ({ loaded: 0, failed: 0, total: frameCount }));
  61 |   const [ready, setReady] = useState(false);
  62 |   const abortRef = useRef(false);
  63 |   const readyFiredRef = useRef(false);
  64 |   const onLoadProgressRef = useRef(onLoadProgress);
  65 | 
  66 |   useEffect(() => {
  67 |     onLoadProgressRef.current = onLoadProgress;
  68 |   }, [onLoadProgress]);
  69 | 
  70 |   useEffect(() => {
  71 |     abortRef.current = false;
  72 |     readyFiredRef.current = false;
  73 |     const cache = new Map();
  74 |     cacheRef.current = cache;
  75 | 
  76 |     const queue = buildLoadQueue(frameCount);
  77 |     let successCount = 0;
  78 |     let failedCount = 0;
  79 |     let queueIndex = 0;
  80 |     let activeCount = 0;
  81 |     const retries = new Map();
  82 |     const activeImages = [];
  83 | 
  84 |     function updateProgress() {
  85 |       setProgress({ loaded: successCount, failed: failedCount, total: frameCount });
  86 |       onLoadProgressRef.current?.(successCount, frameCount);
  87 |     }
  88 | 
  89 |     function checkReady() {
  90 |       if (!readyFiredRef.current && successCount >= Math.min(PRIORITY_FRAME_COUNT, frameCount)) {
  91 |         readyFiredRef.current = true;
  92 |         setReady(true);
  93 |       }
  94 |     }
  95 | 
  96 |     function loadNext() {
  97 |       if (abortRef.current) return;
  98 |       if (queueIndex >= queue.length) return;
  99 |       if (activeCount >= MAX_CONCURRENT) return;
 100 | 
 101 |       activeCount++;
 102 |       const frameIndex = queue[queueIndex++];
 103 |       const url = buildFrameUrl(basePath, frameIndex, format);
 104 |       const img = document.createElement("img");
 105 |       activeImages.push(img);
 106 | 
 107 |       img.onload = () => {
 108 |         activeCount--;
 109 |         if (abortRef.current) return;
 110 |         cache.set(frameIndex, img);
 111 |         successCount++;
 112 |         updateProgress();
 113 |         checkReady();
 114 |         loadNext();
 115 |       };
 116 | 
 117 |       img.onerror = () => {
 118 |         activeCount--;
 119 |         if (abortRef.current) return;
 120 |         const attempt = (retries.get(frameIndex) ?? 0) + 1;
 121 |         retries.set(frameIndex, attempt);
 122 | 
 123 |         if (attempt <= MAX_RETRIES) {
 124 |           queue.push(frameIndex);
 125 |         } else {
 126 |           failedCount++;
 127 |           updateProgress();
 128 |         }
 129 |         loadNext();
 130 |       };
 131 | 
 132 |       img.src = url;
 133 |     }
 134 | 
 135 |     const initialBatch = Math.min(MAX_CONCURRENT, queue.length);
 136 |     for (let i = 0; i < initialBatch; i++) {
 137 |       loadNext();
 138 |     }
 139 | 
 140 |     return () => {
 141 |       abortRef.current = true;
 142 |       // Abort in-flight image loads
 143 |       for (const img of activeImages) {
 144 |         img.onload = null;
 145 |         img.onerror = null;
 146 |         img.src = "";
 147 |       }
 148 |       activeImages.length = 0;
 149 |       cacheRef.current = new Map();
 150 |     };
 151 |   }, [frameCount, basePath, format]);
 152 | 
 153 |   /**
 154 |    * Returns the image for the given frame index, or the nearest loaded frame.
 155 |    * @param {number} index
 156 |    * @returns {HTMLImageElement | null}
 157 |    */
 158 |   const getFrame = useCallback(
 159 |     (index) => {
 160 |       const cache = cacheRef.current;
 161 |       if (cache.has(index)) return cache.get(index);
 162 | 
 163 |       // Nearest-neighbor fallback: search outward from requested index
 164 |       for (let offset = 1; offset < frameCount; offset++) {
 165 |         if (cache.has(index - offset)) return cache.get(index - offset);
 166 |         if (cache.has(index + offset)) return cache.get(index + offset);
 167 |       }
 168 | 
 169 |       return null;
 170 |     },
 171 |     [frameCount],
 172 |   );
 173 | 
 174 |   return { getFrame, progress, ready };
 175 | }
```

## src/hooks/useHeroParallax.js

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 55. SHA-256: `7918e6fab4cb02255e1288fa96e1b127e572535d5aaef0c7308aab0dfa3d6b23`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import { useRef, useEffect } from "react";
   2 | import useReducedMotion from "./useReducedMotion.js";
   3 | 
   4 | /** Native scroll parallax. Image and copy move at different speeds without GSAP. */
   5 | export default function useHeroParallax() {
   6 |   const sectionRef = useRef(null);
   7 |   const imageLayerRef = useRef(null);
   8 |   const textLayerRef = useRef(null);
   9 |   const prefersReducedMotion = useReducedMotion();
  10 | 
  11 |   useEffect(() => {
  12 |     if (prefersReducedMotion) return;
  13 |     const section = sectionRef.current;
  14 |     const imageLayer = imageLayerRef.current;
  15 |     const textLayer = textLayerRef.current;
  16 |     if (!section || !imageLayer || !textLayer) return;
  17 | 
  18 |     let frame = 0;
  19 |     let visible = true;
  20 |     const update = () => {
  21 |       frame = 0;
  22 |       const { top, height } = section.getBoundingClientRect();
  23 |       const progress = Math.max(0, Math.min(1, -top / height));
  24 |       const isMobile = window.innerWidth < 768;
  25 |       // Move the background against the page's scroll while the copy exits faster.
  26 |       // Viewport-relative travel keeps the depth perceptible on different screens.
  27 |       const imageDistance = height * (isMobile ? 0.28 : 0.42);
  28 |       const textDistance = height * (isMobile ? 0.24 : 0.36);
  29 |       imageLayer.style.transform = `translate3d(0, ${progress * imageDistance}px, 0)`;
  30 |       textLayer.style.transform = `translate3d(0, ${-progress * textDistance}px, 0)`;
  31 |     };
  32 |     const schedule = () => {
  33 |       if (visible && !frame) frame = window.requestAnimationFrame(update);
  34 |     };
  35 |     const observer = new IntersectionObserver(([entry]) => {
  36 |       visible = entry.isIntersecting;
  37 |       if (visible) schedule();
  38 |     });
  39 |     observer.observe(section);
  40 |     window.addEventListener("scroll", schedule, { passive: true });
  41 |     window.addEventListener("resize", schedule);
  42 |     schedule();
  43 | 
  44 |     return () => {
  45 |       observer.disconnect();
  46 |       window.removeEventListener("scroll", schedule);
  47 |       window.removeEventListener("resize", schedule);
  48 |       window.cancelAnimationFrame(frame);
  49 |       imageLayer.style.removeProperty("transform");
  50 |       textLayer.style.removeProperty("transform");
  51 |     };
  52 |   }, [prefersReducedMotion]);
  53 | 
  54 |   return { sectionRef, imageLayerRef, textLayerRef };
  55 | }
```

## src/hooks/useHeroVideoPlayback.js

Durum: Mevcut ana sayfanın import grafiğinde değil. Satır: 143. SHA-256: `869c3d870464fdbf1f05c9deb6001cdbb44868015a1e86b6f700004ec409bd60`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import { useRef, useState, useEffect, useCallback } from "react";
   2 | import useReducedMotion from "./useReducedMotion.js";
   3 | 
   4 | /**
   5 |  * Manages hero video lifecycle: lazy-load via IntersectionObserver,
   6 |  * play/pause based on viewport visibility and tab focus,
   7 |  * respects saveData and reduced-motion preferences.
   8 |  *
   9 |  * @param {string} videoSrc - Path to the video file
  10 |  * @returns {{ videoRef: React.RefObject, isPlaying: boolean, hasError: boolean, isVideoReady: boolean }}
  11 |  */
  12 | export default function useHeroVideoPlayback(desktopSrc, mobileSrc) {
  13 |   const [videoSrc] = useState(() => window.matchMedia("(max-width: 767px)").matches && mobileSrc ? mobileSrc : desktopSrc);
  14 |   const videoRef = useRef(null);
  15 |   const [isPlaying, setIsPlaying] = useState(false);
  16 |   const [hasError, setHasError] = useState(false);
  17 |   const [isVideoReady, setIsVideoReady] = useState(false);
  18 |   const isVisibleRef = useRef(false);
  19 |   const isTabActiveRef = useRef(typeof document !== "undefined" ? !document.hidden : true);
  20 |   const loadedSrcRef = useRef(null);
  21 |   const prefersReducedMotion = useReducedMotion();
  22 |   const [saveData] = useState(() => navigator.connection?.saveData === true);
  23 | 
  24 |   const shouldSkipVideo = prefersReducedMotion || saveData;
  25 | 
  26 |   const tryPlay = useCallback(() => {
  27 |     const video = videoRef.current;
  28 |     if (!video || !isVisibleRef.current || !isTabActiveRef.current) return;
  29 |     video.defaultPlaybackRate = 0.7;
  30 |     video.playbackRate = 0.7;
  31 |     if (video.paused) {
  32 |       video.play().catch((err) => {
  33 |         if (err.name === "NotSupportedError") {
  34 |           setHasError(true);
  35 |         }
  36 |         // NotAllowedError and AbortError are expected — poster remains visible
  37 |       });
  38 |     }
  39 |   }, []);
  40 | 
  41 |   const tryPause = useCallback(() => {
  42 |     const video = videoRef.current;
  43 |     if (video && !video.paused) {
  44 |       video.pause();
  45 |     }
  46 |   }, []);
  47 | 
  48 |   // Prioritize the above-the-fold source without waiting for an observer.
  49 |   useEffect(() => {
  50 |     const video = videoRef.current;
  51 |     if (!video || shouldSkipVideo) return;
  52 |     loadedSrcRef.current = videoSrc;
  53 |     video.defaultPlaybackRate = 0.7;
  54 |     video.playbackRate = 0.7;
  55 |     video.src = videoSrc;
  56 |     video.load();
  57 |   }, [videoSrc, shouldSkipVideo]);
  58 | 
  59 |   // Intersection observer: track hero visibility + lazy-load video src
  60 |   useEffect(() => {
  61 |     if (shouldSkipVideo) return;
  62 | 
  63 |     const video = videoRef.current;
  64 |     if (!video) return;
  65 | 
  66 |     const observer = new IntersectionObserver(
  67 |       ([entry]) => {
  68 |         isVisibleRef.current = entry.isIntersecting;
  69 |         if (entry.isIntersecting) {
  70 |           // Lazy-load: set src on first intersection or when videoSrc changes
  71 |           if (loadedSrcRef.current !== videoSrc) {
  72 |             loadedSrcRef.current = videoSrc;
  73 |             video.src = videoSrc;
  74 |             video.load();
  75 |           }
  76 |           tryPlay();
  77 |         } else {
  78 |           tryPause();
  79 |         }
  80 |       },
  81 |       { threshold: 0.1 },
  82 |     );
  83 | 
  84 |     observer.observe(video);
  85 |     return () => observer.disconnect();
  86 |   }, [shouldSkipVideo, videoSrc, tryPlay, tryPause]);
  87 | 
  88 |   // Tab visibility: pause when hidden, resume when visible
  89 |   useEffect(() => {
  90 |     if (shouldSkipVideo) return;
  91 | 
  92 |     function handleVisibilityChange() {
  93 |       isTabActiveRef.current = !document.hidden;
  94 |       if (document.hidden) {
  95 |         tryPause();
  96 |       } else if (isVisibleRef.current) {
  97 |         tryPlay();
  98 |       }
  99 |     }
 100 | 
 101 |     document.addEventListener("visibilitychange", handleVisibilityChange);
 102 |     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
 103 |   }, [shouldSkipVideo, tryPlay, tryPause]);
 104 | 
 105 |   // Video element event listeners
 106 |   useEffect(() => {
 107 |     if (shouldSkipVideo) return;
 108 | 
 109 |     const video = videoRef.current;
 110 |     if (!video) return;
 111 | 
 112 |     function handleCanPlay() {
 113 |       setIsVideoReady(true);
 114 |       // Retry play after video has buffered enough data —
 115 |       // the initial tryPlay() in IO callback may have failed with AbortError
 116 |       tryPlay();
 117 |     }
 118 |     function handlePlaying() {
 119 |       setIsPlaying(true);
 120 |     }
 121 |     function handlePause() {
 122 |       setIsPlaying(false);
 123 |     }
 124 |     function handleError() {
 125 |       setHasError(true);
 126 |       setIsPlaying(false);
 127 |     }
 128 | 
 129 |     video.addEventListener("canplay", handleCanPlay);
 130 |     video.addEventListener("playing", handlePlaying);
 131 |     video.addEventListener("pause", handlePause);
 132 |     video.addEventListener("error", handleError);
 133 | 
 134 |     return () => {
 135 |       video.removeEventListener("canplay", handleCanPlay);
 136 |       video.removeEventListener("playing", handlePlaying);
 137 |       video.removeEventListener("pause", handlePause);
 138 |       video.removeEventListener("error", handleError);
 139 |     };
 140 |   }, [shouldSkipVideo, tryPlay]);
 141 | 
 142 |   return { videoRef, isPlaying, hasError, isVideoReady, shouldSkipVideo };
 143 | }
```

## src/hooks/useOpeningSectionTransitions.js

Durum: Aktif import grafiğinde. Satır: 157. SHA-256: `57a864a9512202c72b29d294147ccf42a66501aa1f79a8ca0905f0e1221cc80e`.

İçe aktaranlar: src/App.jsx.

```text
   1 | import { useEffect, useLayoutEffect, useRef } from "react";
   2 | import gsap from "gsap";
   3 | import { ScrollTrigger } from "gsap/ScrollTrigger";
   4 | import useReducedMotion from "./useReducedMotion.js";
   5 | 
   6 | gsap.registerPlugin(ScrollTrigger);
   7 | 
   8 | /** One pinned timeline for the real Hero → Corporate → Engineering sections. */
   9 | export default function useOpeningSectionTransitions(mainRef) {
  10 |   const reducedMotion = useReducedMotion();
  11 |   const storyRef = useRef(null);
  12 | 
  13 |   useEffect(() => {
  14 |     let disposed = false;
  15 |     let frame = 0;
  16 |     const alignHash = () => {
  17 |       cancelAnimationFrame(frame);
  18 |       frame = requestAnimationFrame(() => {
  19 |         if (disposed || !window.location.hash) return;
  20 |         let id;
  21 |         try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
  22 |         const target = document.getElementById(id);
  23 |         if (!target) return;
  24 |         ScrollTrigger.refresh();
  25 |         const story = storyRef.current;
  26 |         let top;
  27 |         const index = story?.panels.findIndex(panel => panel.contains(target));
  28 |         if (index !== undefined && index >= 0) {
  29 |           const time = story.timeline.labels[`section-${index}`];
  30 |           const trigger = story.timeline.scrollTrigger;
  31 |           top = trigger.start + (trigger.end - trigger.start) * time / story.timeline.duration();
  32 |         } else {
  33 |           const headerHeight = document.querySelector("header > nav")?.getBoundingClientRect().height || 0;
  34 |           top = window.scrollY + target.getBoundingClientRect().top - (id === "hero" ? 0 : headerHeight + 16);
  35 |         }
  36 |         window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  37 |         ScrollTrigger.update();
  38 |       });
  39 |     };
  40 |     document.fonts.ready.then(() => { if (!disposed) alignHash(); });
  41 |     window.addEventListener("hashchange", alignHash);
  42 |     return () => {
  43 |       disposed = true;
  44 |       cancelAnimationFrame(frame);
  45 |       window.removeEventListener("hashchange", alignHash);
  46 |     };
  47 |   }, []);
  48 | 
  49 |   useLayoutEffect(() => {
  50 |     const main = mainRef.current;
  51 |     const stage = main.querySelector("[data-opening-story]");
  52 |     const panels = [...stage.querySelectorAll("[data-opening-panel]")];
  53 |     panels.forEach(panel => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
  54 |     if (reducedMotion) return;
  55 |     let media;
  56 |     let disposed = false;
  57 |     let refreshFrame = 0;
  58 |     const ctx = gsap.context(() => {
  59 |       media = gsap.matchMedia();
  60 |       media.add({ mobile: "(max-width: 767px)", larger: "(min-width: 768px)" }, context => {
  61 |         const mobile = context.conditions.mobile;
  62 |         const height = () => stage.clientHeight;
  63 |         const overflow = index => Math.max(0, panels[index].offsetHeight - height());
  64 |         const boundaries = [];
  65 |         const holds = [];
  66 |         const sweeps = [];
  67 |         const transition = mobile ? 0.7 : 0.85;
  68 |         const header = document.querySelector("header");
  69 |         let active = -1;
  70 |         const setActive = index => {
  71 |           if (index === active) return;
  72 |           active = index;
  73 |           if (header) header.dataset.openingTheme = index === 1 ? "light" : "dark";
  74 |           panels.forEach((panel, i) => {
  75 |             panel.inert = i !== index;
  76 |             if (i !== index) panel.setAttribute("aria-hidden", "true");
  77 |             else panel.removeAttribute("aria-hidden");
  78 |           });
  79 |         };
  80 |         gsap.set(panels, { y: 0 });
  81 |         gsap.set(panels.slice(1), { y: height });
  82 |         setActive(0);
  83 |         let timeline;
  84 |         const reflow = () => {
  85 |           if (!holds.length) return;
  86 |           boundaries.length = 0;
  87 |           holds[0].startTime(0).duration(Math.max(0.2, overflow(0) / height()));
  88 |           let cursor = holds[0].duration();
  89 |           [1, 2].forEach(index => {
  90 |             sweeps[index - 1].forEach(tween => tween.startTime(cursor));
  91 |             boundaries.push(cursor + transition * 0.5);
  92 |             cursor += transition;
  93 |             timeline.labels[`section-${index}`] = cursor;
  94 |             holds[index].startTime(cursor).duration(Math.max(mobile ? 0.2 : 0.35, overflow(index) / height()));
  95 |             cursor += holds[index].duration();
  96 |           });
  97 |         };
  98 |         timeline = gsap.timeline({
  99 |           defaults: { ease: "none" },
 100 |           scrollTrigger: {
 101 |             id: "opening-section-story",
 102 |             trigger: stage,
 103 |             start: "top top",
 104 |             end: () => `+=${Math.round(height() * (timeline?.duration() || 2.6))}`,
 105 |             pin: true,
 106 |             pinSpacing: true,
 107 |             scrub: mobile ? 0.25 : 0.55,
 108 |             anticipatePin: 1,
 109 |             invalidateOnRefresh: true,
 110 |             onRefreshInit: reflow,
 111 |           },
 112 |           onUpdate() {
 113 |             const time = this.time();
 114 |             setActive(time >= boundaries[1] ? 2 : time >= boundaries[0] ? 1 : 0);
 115 |           },
 116 |         });
 117 |         timeline.addLabel("section-0", 0);
 118 |         timeline.to(panels[0], { y: () => -overflow(0), duration: Math.max(0.2, overflow(0) / height()) });
 119 |         holds.push(timeline.recent());
 120 |         [1, 2].forEach(index => {
 121 |           const start = timeline.duration();
 122 |           boundaries.push(start + transition * 0.5);
 123 |           timeline.to(panels[index - 1], {
 124 |             y: () => -overflow(index - 1) - height() * (mobile ? 0.12 : 0.22),
 125 |             duration: transition,
 126 |           }, start);
 127 |           const outgoing = timeline.recent();
 128 |           timeline.fromTo(panels[index], { y: height }, {
 129 |             y: 0, duration: transition, ease: "power2.inOut", immediateRender: false,
 130 |           }, start);
 131 |           sweeps.push([outgoing, timeline.recent()]);
 132 |           timeline.addLabel(`section-${index}`, start + transition);
 133 |           // Long mobile sections remain readable: extra scroll traverses their
 134 |           // actual overflow before the next takeover or the release of the pin.
 135 |           timeline.to(panels[index], {
 136 |             y: () => -overflow(index),
 137 |             duration: Math.max(mobile ? 0.2 : 0.35, overflow(index) / height()),
 138 |           });
 139 |           holds.push(timeline.recent());
 140 |         });
 141 |         storyRef.current = { timeline, panels };
 142 |         return () => { storyRef.current = null; header?.removeAttribute("data-opening-theme"); };
 143 |       });
 144 |     }, main);
 145 |     document.fonts.ready.then(() => {
 146 |       if (!disposed) refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
 147 |     });
 148 |     return () => {
 149 |       disposed = true;
 150 |       cancelAnimationFrame(refreshFrame);
 151 |       media?.revert();
 152 |       ctx.revert();
 153 |       storyRef.current = null;
 154 |       panels.forEach(panel => { panel.inert = false; panel.removeAttribute("aria-hidden"); });
 155 |     };
 156 |   }, [mainRef, reducedMotion]);
 157 | }
```

## src/hooks/useReducedMotion.js

Durum: Aktif import grafiğinde. Satır: 25. SHA-256: `5a12ce292aa1fb33eea80881adf7d59711fbcd7c7978347457f270e9bdbfd501`.

İçe aktaranlar: src/App.jsx, src/components/hero/HeroSection.jsx, src/components/sections/BessTechnology.jsx, src/components/sections/StoryboardStrip.jsx, src/hooks/useHeroParallax.js, src/hooks/useHeroVideoPlayback.js, src/hooks/useOpeningSectionTransitions.js, src/hooks/useSectionParallax.js.

```text
   1 | import { useSyncExternalStore } from "react";
   2 | 
   3 | const query = "(prefers-reduced-motion: reduce)";
   4 | 
   5 | function subscribe(callback) {
   6 |   const mq = window.matchMedia(query);
   7 |   mq.addEventListener("change", callback);
   8 |   return () => mq.removeEventListener("change", callback);
   9 | }
  10 | 
  11 | function getSnapshot() {
  12 |   return window.matchMedia(query).matches;
  13 | }
  14 | 
  15 | function getServerSnapshot() {
  16 |   return false;
  17 | }
  18 | 
  19 | /**
  20 |  * Returns true if user prefers reduced motion.
  21 |  * @returns {boolean}
  22 |  */
  23 | export default function useReducedMotion() {
  24 |   return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  25 | }
```

## src/hooks/useSectionParallax.js

Durum: Aktif import grafiğinde. Satır: 48. SHA-256: `b2557a0a9ee15a46f5ebd9ea708b0b1438ff18fb940577ea7cc8c92d86060493`.

İçe aktaranlar: src/components/sections/EngineeringProcess.jsx, src/components/sections/ProjectsPortfolio.jsx.

```text
   1 | import { useEffect, useRef } from "react";
   2 | import useReducedMotion from "./useReducedMotion.js";
   3 | 
   4 | /** Scroll-driven layers using CSS translate, separate from GSAP reveal transforms. */
   5 | export default function useSectionParallax() {
   6 |   const sectionRef = useRef(null);
   7 |   const reducedMotion = useReducedMotion();
   8 | 
   9 |   useEffect(() => {
  10 |     const section = sectionRef.current;
  11 |     if (!section || reducedMotion) return;
  12 |     const layers = [...section.querySelectorAll("[data-section-parallax]")];
  13 |     let frame = 0;
  14 |     let visible = false;
  15 | 
  16 |     const update = () => {
  17 |       frame = 0;
  18 |       const { top, height } = section.getBoundingClientRect();
  19 |       const viewport = window.innerHeight;
  20 |       const progress = Math.max(-1, Math.min(1, (viewport - height - 2 * top) / (viewport + height)));
  21 |       const intensity = window.innerWidth < 768 ? 0.35 : 1;
  22 |       layers.forEach(layer => {
  23 |         const distance = Number(layer.dataset.sectionParallax) || 0;
  24 |         layer.style.translate = `0 ${progress * distance * intensity}px`;
  25 |       });
  26 |     };
  27 |     const schedule = () => {
  28 |       if (visible && !frame) frame = requestAnimationFrame(update);
  29 |     };
  30 |     const observer = new IntersectionObserver(([entry]) => {
  31 |       visible = entry.isIntersecting;
  32 |       if (visible) schedule();
  33 |     }, { rootMargin: "100px 0px" });
  34 |     observer.observe(section);
  35 |     window.addEventListener("scroll", schedule, { passive: true });
  36 |     window.addEventListener("resize", schedule);
  37 | 
  38 |     return () => {
  39 |       observer.disconnect();
  40 |       window.removeEventListener("scroll", schedule);
  41 |       window.removeEventListener("resize", schedule);
  42 |       cancelAnimationFrame(frame);
  43 |       layers.forEach(layer => layer.style.removeProperty("translate"));
  44 |     };
  45 |   }, [reducedMotion]);
  46 | 
  47 |   return sectionRef;
  48 | }
```

## src/index.css

Durum: Aktif import grafiğinde. Satır: 264. SHA-256: `fa1e1ddc2fd9bd6bad136afda06bc05d6334f5b8c074d005ef3961207161887a`.

İçe aktaranlar: src/main.jsx.

```text
   1 | @import "tailwindcss";
   2 | 
   3 | /* ── Design Tokens ── */
   4 | @theme {
   5 |   /* Dark palette */
   6 |   --color-dark-hero: #0A131C;
   7 |   --color-dark-card: #101820;
   8 |   --color-dark-accent: #17232D;
   9 | 
  10 |   /* Brand */
  11 |   --color-brand-primary: #4956A5;
  12 |   --color-brand-primary-hover: #394785;
  13 |   --color-brand-primary-light: #7180C5;
  14 | 
  15 |   /* Surfaces */
  16 |   --color-surface-page: #F8F9FC;
  17 |   --color-surface-subtle: #EEF0F7;
  18 |   --color-surface-blue: #E9EDFA;
  19 |   --color-surface-pure: #FFFFFF;
  20 |   --color-surface-footer: #060D14;
  21 | 
  22 |   /* Text */
  23 |   --color-text-main: #17213B;
  24 |   --color-text-muted: #556176;
  25 |   --color-text-soft: #7E8B9F;
  26 | 
  27 |   /* Border */
  28 |   --color-border-subtle: #DCE1EA;
  29 | 
  30 |   /* Font families */
  31 |   --font-display: "Inter Tight", sans-serif;
  32 |   --font-body: "Inter", sans-serif;
  33 |   --font-bess-display: "Manrope", sans-serif;
  34 |   --font-bess-body: "DM Sans", sans-serif;
  35 | }
  36 | 
  37 | html {
  38 |   scroll-behavior: smooth;
  39 |   -webkit-font-smoothing: antialiased;
  40 |   -moz-osx-font-smoothing: grayscale;
  41 | }
  42 | 
  43 | body {
  44 |   font-family: var(--font-body);
  45 |   color: var(--color-text-main);
  46 |   background-color: var(--color-surface-page);
  47 |   line-height: 1.6;
  48 | }
  49 | 
  50 | /* ── Typography utility classes ── */
  51 | .text-display-xl {
  52 |   font-family: var(--font-display);
  53 |   font-weight: 600;
  54 |   font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem);
  55 |   line-height: 1.05;
  56 |   letter-spacing: -0.025em;
  57 | }
  58 | 
  59 | .text-display-lg {
  60 |   font-family: var(--font-display);
  61 |   font-weight: 600;
  62 |   font-size: clamp(2rem, 3.5vw + 0.5rem, 3.25rem);
  63 |   line-height: 1.1;
  64 |   letter-spacing: -0.02em;
  65 | }
  66 | 
  67 | .text-headline-lg {
  68 |   font-family: var(--font-display);
  69 |   font-weight: 500;
  70 |   font-size: clamp(1.5rem, 2vw + 0.5rem, 2.25rem);
  71 |   line-height: 1.2;
  72 |   letter-spacing: -0.015em;
  73 | }
  74 | 
  75 | .text-headline-md {
  76 |   font-family: var(--font-display);
  77 |   font-weight: 500;
  78 |   font-size: clamp(1.25rem, 1.5vw + 0.25rem, 1.5rem);
  79 |   line-height: 1.3;
  80 |   letter-spacing: -0.01em;
  81 | }
  82 | 
  83 | .text-body-lg {
  84 |   font-family: var(--font-body);
  85 |   font-weight: 400;
  86 |   font-size: 1.125rem;
  87 |   line-height: 1.7;
  88 | }
  89 | 
  90 | .text-body {
  91 |   font-family: var(--font-body);
  92 |   font-weight: 400;
  93 |   font-size: 1rem;
  94 |   line-height: 1.6;
  95 | }
  96 | 
  97 | .text-label {
  98 |   font-family: var(--font-body);
  99 |   font-weight: 500;
 100 |   font-size: 0.75rem;
 101 |   line-height: 1.4;
 102 |   letter-spacing: 0.08em;
 103 |   text-transform: uppercase;
 104 | }
 105 | 
 106 | .text-display-hero {
 107 |   font-family: var(--font-display);
 108 |   font-weight: 300;
 109 |   font-size: clamp(3rem, 7vw + 1rem, 6rem);
 110 |   line-height: 1;
 111 |   letter-spacing: -0.03em;
 112 | }
 113 | 
 114 | .text-code-metric {
 115 |   font-family: var(--font-display);
 116 |   font-weight: 300;
 117 |   font-size: clamp(2.5rem, 4vw, 4rem);
 118 |   line-height: 1;
 119 |   letter-spacing: -0.03em;
 120 | }
 121 | 
 122 | /* ── Fade-in animation (used by key-remounted elements) ── */
 123 | @keyframes fade-in {
 124 |   from { opacity: 0; }
 125 |   to { opacity: 1; }
 126 | }
 127 | 
 128 | .animate-fade-in {
 129 |   animation: fade-in 300ms ease-out both;
 130 | }
 131 | 
 132 | /* ── Scrollbar hide utility ── */
 133 | .scrollbar-hide {
 134 |   -ms-overflow-style: none;
 135 |   scrollbar-width: none;
 136 | }
 137 | .scrollbar-hide::-webkit-scrollbar {
 138 |   display: none;
 139 | }
 140 | 
 141 | /* ── Marquee animation ── */
 142 | @keyframes marquee-left {
 143 |   0% { transform: translateX(0); }
 144 |   100% { transform: translateX(-50%); }
 145 | }
 146 | 
 147 | @keyframes marquee-right {
 148 |   0% { transform: translateX(-50%); }
 149 |   100% { transform: translateX(0); }
 150 | }
 151 | 
 152 | .animate-marquee-left {
 153 |   animation: marquee-left 30s linear infinite;
 154 | }
 155 | 
 156 | .animate-marquee-right {
 157 |   animation: marquee-right 30s linear infinite;
 158 | }
 159 | 
 160 | /* ── Reduced motion ── */
 161 | @media (prefers-reduced-motion: reduce) {
 162 |   *,
 163 |   *::before,
 164 |   *::after {
 165 |     animation-duration: 0.01ms !important;
 166 |     animation-iteration-count: 1 !important;
 167 |     transition-duration: 0.01ms !important;
 168 |     scroll-behavior: auto !important;
 169 |   }
 170 | }
 171 | 
 172 | /* ── Focus visible ── */
 173 | :focus-visible {
 174 |   outline: 2px solid var(--color-brand-primary);
 175 |   outline-offset: 2px;
 176 | }
 177 | 
 178 | /* ── Selection ── */
 179 | ::selection {
 180 |   background-color: var(--color-brand-primary);
 181 |   color: white;
 182 | }
 183 | 
 184 | /* Cinematic engineering process — scoped to the replacement storyboard. */
 185 | .cinematic-process {
 186 |   display: grid;
 187 |   grid-template-columns: minmax(0, 42fr) minmax(0, 58fr);
 188 |   grid-template-rows: auto 1fr;
 189 |   background: var(--color-dark-hero);
 190 | }
 191 | .process-intro { grid-column: 1; padding: 72px clamp(24px, 4vw, 72px) 0; }
 192 | .process-stages { grid-column: 1; padding: 48px clamp(24px, 4vw, 72px) 64px; min-width: 0; }
 193 | .process-film { grid-column: 2; grid-row: 1 / 3; position: relative; overflow: hidden; min-height: 680px; }
 194 | .process-film img, .process-film video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
 195 | .process-film video { opacity: 0; transition: opacity 400ms ease; }
 196 | .process-stage-button { color: rgb(255 255 255 / .35); font-size: 24px; padding: 4px 0; cursor: pointer; transition: color 200ms; }
 197 | .process-stage-button[aria-current="step"] { color: var(--color-brand-primary-light); }
 198 | .process-progress { height: 1px; background: rgb(255 255 255 / .15); margin: 16px 0 24px; overflow: hidden; }
 199 | .process-progress > div { height: 100%; background: var(--color-brand-primary-light); transform: scaleX(0); transform-origin: left; transition: transform 300ms linear; }
 200 | .process-stage-copy { display: grid; }
 201 | .process-stage-copy > div { grid-area: 1 / 1; min-width: 0; }
 202 | @media (max-width: 1023px) {
 203 |   .cinematic-process { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto auto auto; }
 204 |   .process-intro { padding: 48px 24px 32px; max-width: 720px; }
 205 |   .process-film { grid-column: 1; grid-row: 2; min-height: 0; height: clamp(230px, 52vw, 460px); }
 206 |   .process-stages { grid-row: 3; padding: 28px 24px 40px; }
 207 |   .process-stage-copy { max-width: 640px; }
 208 | }
 209 | 
 210 | /* Feather the bright sunset locally while keeping the right-hand turbines crisp. */
 211 | .hero-sun-softener {
 212 |   background: radial-gradient(ellipse at 8% 32%, rgb(10 19 28 / .22), transparent 65%);
 213 |   -webkit-backdrop-filter: blur(8px) brightness(.8);
 214 |   backdrop-filter: blur(8px) brightness(.8);
 215 |   -webkit-mask-image: radial-gradient(ellipse 48% 58% at 8% 32%, #000 5%, rgb(0 0 0 / .8) 35%, transparent 100%);
 216 |   mask-image: radial-gradient(ellipse 48% 58% at 8% 32%, #000 5%, rgb(0 0 0 / .8) 35%, transparent 100%);
 217 | }
 218 | @media (max-width: 767px) {
 219 |   .hero-sun-softener {
 220 |     -webkit-backdrop-filter: blur(4px) brightness(.88);
 221 |     backdrop-filter: blur(4px) brightness(.88);
 222 |   }
 223 | }
 224 | 
 225 | /* Three real opening sections share one pinned viewport, without changing grids. */
 226 | .opening-story { position: relative; height: 100svh; overflow: hidden; isolation: isolate; background: var(--color-dark-hero); }
 227 | .opening-story > [data-opening-panel] { position: absolute; top: 0; left: 0; width: 100%; min-height: 100svh; }
 228 | 
 229 | /* Layouts for the full-screen opening panels only; normal-flow sections keep their styles. */
 230 | .opening-story #hakkimizda { min-height: 100svh; display: flex; align-items: center; padding-top: 112px; padding-bottom: 80px; }
 231 | .opening-story #hakkimizda > div { width: 100%; }
 232 | .opening-story #hakkimizda > div > div { align-items: center; gap: clamp(40px, 5vw, 80px); }
 233 | .opening-story #hakkimizda h2 { max-width: 10em; font-size: clamp(2.75rem, 4.7vw, 5rem); line-height: 1.06; }
 234 | .opening-story #hakkimizda [data-animate="stagger-parent"] { column-gap: 32px; row-gap: 56px; }
 235 | .opening-story #hakkimizda .text-code-metric { font-size: clamp(3rem, 5vw, 5rem); }
 236 | .opening-story #hakkimizda [data-animate="stagger-child"] > div { width: 80px; margin-top: 20px; }
 237 | .opening-story #hakkimizda [data-animate="stagger-child"] > span:last-child { margin-top: 12px; }
 238 | .opening-story #storyboard { min-height: 100svh; grid-template-rows: 1fr 1fr; }
 239 | .opening-story .process-intro { display: flex; flex-direction: column; justify-content: flex-end; padding-top: 112px; }
 240 | .opening-story .process-intro h2 { font-size: clamp(2.25rem, 3.4vw, 3.75rem); }
 241 | .opening-story .process-stages { padding-top: 40px; padding-bottom: 80px; }
 242 | .opening-story .process-film { min-height: 100svh; }
 243 | header[data-opening-theme="light"] > nav > ul a,
 244 | header[data-opening-theme="light"] > nav > div > button,
 245 | header[data-opening-theme="light"] > nav > div > a { color: var(--color-text-main); }
 246 | header[data-opening-theme="light"] > nav > div > a { border-color: var(--color-border-subtle); }
 247 | @media (max-width: 1023px) {
 248 |   .opening-story #hakkimizda { padding-top: 112px; padding-bottom: 48px; }
 249 |   .opening-story #hakkimizda > div > div { gap: 40px; }
 250 |   .opening-story #hakkimizda h2 { max-width: 14em; }
 251 |   .opening-story #hakkimizda [data-animate="stagger-parent"] { row-gap: 32px; }
 252 |   .opening-story #storyboard { grid-template-rows: auto auto 1fr; }
 253 |   .opening-story .process-intro { display: block; padding: 104px 24px 28px; }
 254 |   .opening-story .process-intro h2 { max-width: 16em; font-size: clamp(2rem, 4.2vw, 3rem); }
 255 |   .opening-story .process-film { min-height: 0; height: clamp(210px, 30svh, 340px); }
 256 |   .opening-story .process-stages { padding: 28px 24px 40px; }
 257 | }
 258 | @media (max-width: 767px) {
 259 |   .opening-story #hakkimizda { padding-top: 100px; padding-bottom: 40px; }
 260 |   .opening-story #hakkimizda h2 { font-size: clamp(2.25rem, 8.8vw, 3rem); }
 261 |   .opening-story #hakkimizda .text-code-metric { font-size: clamp(2.65rem, 10vw, 3.5rem); }
 262 |   .opening-story #hakkimizda [data-animate="stagger-child"] > div { margin-top: 14px; }
 263 |   .opening-story .process-intro { padding-top: 100px; }
 264 | }
```

## src/main.jsx

Durum: Aktif import grafiğinde. Satır: 10. SHA-256: `26ef0ac188568363bdc4a343b410f75cc631330a454c67ca2b5cd63e4cc92d09`.

İçe aktaranlar: Yok / giriş dosyası.

```text
   1 | import { StrictMode } from "react";
   2 | import { createRoot } from "react-dom/client";
   3 | import "./index.css";
   4 | import App from "./App.jsx";
   5 | 
   6 | createRoot(document.getElementById("root")).render(
   7 |   <StrictMode>
   8 |     <App />
   9 |   </StrictMode>,
  10 | );
```

## index.html

```text
   1 | <!doctype html>
   2 | <html lang="tr">
   3 |   <head>
   4 |     <meta charset="UTF-8" />
   5 |     <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png" />
   6 |     <link rel="icon" href="/favicon.ico" sizes="any" />
   7 |     <link rel="apple-touch-icon" sizes="180x180" href="/brand/apple-touch-icon.png" />
   8 |     <link rel="manifest" href="/site.webmanifest" />
   9 |     <meta name="theme-color" content="#4956A5" />
  10 |     <meta name="application-name" content="OSB ENERGY" />
  11 |     <meta name="apple-mobile-web-app-title" content="OSB ENERGY" />
  12 |     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  13 |     <link rel="preconnect" href="https://fonts.googleapis.com" />
  14 |     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  15 |     <link
  16 |       href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=Manrope:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
  17 |       rel="stylesheet"
  18 |     />
  19 |     <title>OSB ENERGY - Enerjinin Ötesinde</title>
  20 |     <meta name="description" content="OSB ENERGY - Yenilenebilir enerji ve depolama sistemleri ile enerjinin ötesinde çözümler." />
  21 |   </head>
  22 |   <body>
  23 |     <div id="root"></div>
  24 |     <script type="module" src="/src/main.jsx"></script>
  25 |   </body>
  26 | </html>
```

## package.json

```text
   1 | {
   2 |   "name": "osb-energy-website",
   3 |   "private": true,
   4 |   "version": "1.0.0",
   5 |   "type": "module",
   6 |   "scripts": {
   7 |     "dev": "vite",
   8 |     "build": "vite build",
   9 |     "preview": "vite preview",
  10 |     "lint": "eslint src/"
  11 |   },
  12 |   "dependencies": {
  13 |     "@gsap/react": "^2.1.2",
  14 |     "@react-three/drei": "^10.7.9",
  15 |     "@react-three/fiber": "^9.8.2",
  16 |     "@tailwindcss/vite": "^4.3.3",
  17 |     "gsap": "^3.15.0",
  18 |     "lenis": "^1.3.27",
  19 |     "lucide-react": "^1.62.0",
  20 |     "react": "^19.3.1",
  21 |     "react-dom": "^19.3.1",
  22 |     "tailwindcss": "^4.3.3",
  23 |     "three": "^0.186.1"
  24 |   },
  25 |   "devDependencies": {
  26 |     "@eslint/js": "^9.39.5",
  27 |     "@vitejs/plugin-react": "^6.1.2",
  28 |     "eslint": "^9.39.5",
  29 |     "eslint-config-prettier": "^10.1.8",
  30 |     "eslint-plugin-react": "^7.37.5",
  31 |     "eslint-plugin-react-hooks": "^7.1.1",
  32 |     "prettier": "^3.9.10",
  33 |     "vite": "^8.3.5"
  34 |   }
  35 | }
```

## vite.config.js

```text
   1 | import react from "@vitejs/plugin-react";
   2 | import tailwindcss from "@tailwindcss/vite";
   3 | import { defineConfig } from "vite";
   4 | 
   5 | export default defineConfig({
   6 |   plugins: [tailwindcss(), react()],
   7 | });
```

## eslint.config.js

```text
   1 | import js from "@eslint/js";
   2 | import reactPlugin from "eslint-plugin-react";
   3 | import reactHooksPlugin from "eslint-plugin-react-hooks";
   4 | import prettierConfig from "eslint-config-prettier";
   5 | 
   6 | export default [
   7 |   js.configs.recommended,
   8 |   {
   9 |     files: ["**/*.{js,jsx}"],
  10 |     plugins: {
  11 |       react: reactPlugin,
  12 |       "react-hooks": reactHooksPlugin,
  13 |     },
  14 |     languageOptions: {
  15 |       ecmaVersion: "latest",
  16 |       sourceType: "module",
  17 |       parserOptions: {
  18 |         ecmaFeatures: { jsx: true },
  19 |       },
  20 |       globals: {
  21 |         document: "readonly",
  22 |         window: "readonly",
  23 |         console: "readonly",
  24 |         setTimeout: "readonly",
  25 |         clearTimeout: "readonly",
  26 |         setInterval: "readonly",
  27 |         clearInterval: "readonly",
  28 |         requestAnimationFrame: "readonly",
  29 |         cancelAnimationFrame: "readonly",
  30 |         IntersectionObserver: "readonly",
  31 |         ResizeObserver: "readonly",
  32 |         navigator: "readonly",
  33 |         matchMedia: "readonly",
  34 |         HTMLElement: "readonly",
  35 |         CustomEvent: "readonly",
  36 |         fetch: "readonly",
  37 |         URL: "readonly",
  38 |         AbortController: "readonly",
  39 |       },
  40 |     },
  41 |     settings: {
  42 |       react: { version: "detect" },
  43 |     },
  44 |     rules: {
  45 |       ...reactPlugin.configs.recommended.rules,
  46 |       ...reactHooksPlugin.configs.recommended.rules,
  47 |       "react/react-in-jsx-scope": "off",
  48 |       "react/prop-types": "off",
  49 |       "react/no-unknown-property": [
  50 |         "error",
  51 |         {
  52 |           ignore: [
  53 |             "args",
  54 |             "attach",
  55 |             "castShadow",
  56 |             "receiveShadow",
  57 |             "position",
  58 |             "rotation",
  59 |             "scale",
  60 |             "intensity",
  61 |             "geometry",
  62 |             "material",
  63 |             "roughness",
  64 |             "metalness",
  65 |             "transparent",
  66 |             "side",
  67 |             "opacity",
  68 |           ],
  69 |         },
  70 |       ],
  71 |       "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  72 |     },
  73 |   },
  74 |   prettierConfig,
  75 | ];
```

## public/site.webmanifest

```text
   1 | {"name":"OSB ENERGY","short_name":"OSB ENERGY","start_url":"/","display":"browser","theme_color":"#4956A5","background_color":"#F8F9FC","icons":[{"src":"/brand/icon-192.png","sizes":"192x192","type":"image/png"},{"src":"/brand/icon-512.png","sizes":"512x512","type":"image/png"}]}
```
