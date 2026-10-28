import { useRef, useEffect, useState, lazy, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { HERO } from "../../constants/content.js";
import AeroButton from "../ui/AeroButton.jsx";
import useReducedMotion from "../../hooks/useReducedMotion.js";
import posterSrc from "../../assets/images/poster.webp";

// Idempotent — safe even if App.jsx also registers
gsap.registerPlugin(ScrollTrigger);

const DroneParallaxHero = lazy(() => import("./DroneParallaxHero.jsx"));

/**
 * Cinematic scroll stage labels.
 */
const STAGES = Object.freeze([
  { id: "01", label: "Giriş" },
  { id: "02", label: "Yaklaşma" },
  { id: "03", label: "Geçiş" },
  { id: "04", label: "Manzara" },
  { id: "05", label: "Keşfet" },
]);

/**
 * One-time check: viewport large enough for cinematic sequence.
 * Deliberately not reactive to resize — toggling mid-session
 * would cause layout jumps and re-downloads.
 * @returns {boolean}
 */
function checkCanShowCinematic() {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768;
}

/**
 * Full-screen cinematic hero with scroll-driven parallax layers.
 * Scroll-pinned with 5-stage animation via GSAP ScrollTrigger.
 * Falls back to static poster on mobile or when prefers-reduced-motion.
 */
export default function HeroSection() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndRef = useRef(null);
  const fadeRef = useRef(null);
  const secondHeadlineRef = useRef(null);
  const secondDescRef = useRef(null);
  const progressRef = useRef(0);
  const activeStageRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const [canShowCinematic] = useState(checkCanShowCinematic);
  const [activeStage, setActiveStage] = useState(0);

  const showCinematic = canShowCinematic && !prefersReducedMotion;

  // GSAP ScrollTrigger: pin hero and drive text overlay animations
  useEffect(() => {
    if (!showCinematic) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      // Pin the hero section and create 350vh of scroll space
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=350%",
        pin: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          const stageCount = STAGES.length;
          const next = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
          if (next !== activeStageRef.current) {
            activeStageRef.current = next;
            setActiveStage(next);
          }
        },
      });

      // Text overlay timeline — scrubbed to scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",
          scrub: 1,
        },
      });

      // Fade scroll indicator immediately on first scroll
      tl.to(scrollIndRef.current, { opacity: 0, duration: 0.05 }, 0);
      // Fade primary content out during approach stage (10-28% scroll)
      tl.to(descRef.current, { opacity: 0, y: -30, duration: 0.12 }, 0.1);
      tl.to(ctaRef.current, { opacity: 0, duration: 0.1 }, 0.12);
      tl.to(headlineRef.current, { opacity: 0, y: -50, duration: 0.15 }, 0.13);
      // Secondary text overlay fade-in during landscape reveal (85-100%)
      tl.fromTo(
        secondHeadlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.15 },
        0.85,
      );
      tl.fromTo(
        secondDescRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.12 },
        0.88,
      );
      // Fade scene to dark at the end for smooth transition to next section
      tl.fromTo(fadeRef.current, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.92);
    }, section);

    return () => ctx.revert();
  }, [showCinematic]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative w-full overflow-hidden bg-dark-hero ${
        showCinematic ? "h-screen" : "flex min-h-screen items-center pt-24 pb-32"
      }`}
    >
      {/* Parallax layers or static fallback */}
      {showCinematic ? (
        <Suspense fallback={null}>
          <DroneParallaxHero sectionRef={sectionRef} />
        </Suspense>
      ) : (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-hero via-dark-accent to-brand-primary/30" />
          <img
            src={posterSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Gradient overlays for text readability over scene */}
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-r from-dark-hero/80 via-dark-hero/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-dark-hero/60 via-transparent to-dark-hero/30" />

      {/* Transition overlay — fades scene out at end of cinematic scroll */}
      {showCinematic && (
        <div
          ref={fadeRef}
          className="pointer-events-none absolute inset-0 z-[4] bg-dark-hero opacity-0"
        />
      )}

      {/* Primary content overlay */}
      <div
        className={`relative z-10 mx-auto w-full max-w-7xl px-6 ${
          showCinematic ? "flex h-full items-center" : ""
        }`}
      >
        <div className="max-w-2xl">
          <h1 ref={headlineRef} className="text-display-xl text-white">
            {HERO.headline}
          </h1>
          <p ref={descRef} className="mt-6 max-w-xl text-body-lg text-white/70">
            {HERO.description}
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
            <AeroButton variant="primary" href="#iletisim">
              {HERO.ctaPrimary}
            </AeroButton>
            <AeroButton variant="ghost" href="#hizmetler">
              {HERO.ctaSecondary}
            </AeroButton>
          </div>
        </div>
      </div>

      {/* Secondary content overlay — visible during landscape reveal (85-100%) */}
      {showCinematic && (
        <div className="pointer-events-none absolute inset-0 z-[11] flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-2xl">
              <h2 ref={secondHeadlineRef} className="text-display-lg text-white opacity-0">
                {HERO.secondaryHeadline}
              </h2>
              <p ref={secondDescRef} className="mt-4 max-w-xl text-body-lg text-white/70 opacity-0">
                {HERO.secondaryDescription}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic stage indicators (cinematic mode only, desktop) */}
      {showCinematic && (
        <div className="absolute right-6 bottom-24 z-10 hidden flex-col items-end gap-2 md:flex">
          {STAGES.map((stage, i) => (
            <div
              key={stage.id}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                i === activeStage ? "opacity-100" : "opacity-30"
              }`}
            >
              <span className="font-display text-xs font-medium tracking-wider text-white/60">
                {stage.label}
              </span>
              <span
                className={`font-display text-sm font-semibold ${
                  i === activeStage ? "text-brand-lime" : "text-white/40"
                }`}
              >
                {stage.id}
              </span>
              <div
                className={`h-0.5 transition-all duration-300 ${
                  i === activeStage ? "w-8 bg-brand-lime" : "w-4 bg-white/20"
                }`}
              />
            </div>
          ))}
        </div>
      )}

      {/* Telemetry bar */}
      <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-white/10 bg-dark-hero/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8 overflow-x-auto">
            {HERO.telemetry.map((item) => (
              <div key={item.label} className="flex items-center gap-3 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-lime" />
                <span className="text-xs text-white/50">{item.label}</span>
                <span className="font-display text-sm font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <a
            ref={scrollIndRef}
            href="#storyboard"
            className="hidden animate-bounce items-center gap-1 text-xs text-white/40 md:flex"
            aria-label="Aşağı kaydır"
          >
            <span>Keşfet</span>
            <ChevronDown className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
