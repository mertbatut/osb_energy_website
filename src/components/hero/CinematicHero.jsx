import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { HERO } from "../../constants/content.js";
import scene01 from "../../assets/images/scene-01.jpg";
import AeroButton from "../ui/AeroButton.jsx";
import useReducedMotion from "../../hooks/useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

/**
 * One-time viewport check for cinematic mode eligibility.
 * Not reactive to resize — toggling mid-session would cause layout jumps.
 * @returns {boolean}
 */
function checkCanShowCinematic() {
  if (typeof window === "undefined") return false;
  return window.innerWidth >= 768;
}

/**
 * Full-screen editorial hero with single-image parallax drift.
 * Scroll-pinned for 250vh with GSAP ScrollTrigger scrub.
 * Falls back to static layout on mobile or prefers-reduced-motion.
 */
export default function CinematicHero() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollIndRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [canShowCinematic] = useState(checkCanShowCinematic);

  const showCinematic = canShowCinematic && !prefersReducedMotion;

  useEffect(() => {
    if (!showCinematic) return;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
        },
      });

      // Scroll indicator fades immediately
      tl.to(scrollIndRef.current, { opacity: 0, duration: 0.04 }, 0);

      // Parallax drift (intro → editorial slide)
      tl.fromTo(
        imageRef.current,
        { xPercent: 0, yPercent: 0 },
        { xPercent: 8, yPercent: -5, ease: "none", duration: 0.76 },
        0.04,
      );

      // Text fade-out
      tl.to(descRef.current, { opacity: 0, y: -30, duration: 0.08 }, 0.05);
      tl.to(ctaRef.current, { opacity: 0, duration: 0.06 }, 0.07);
      tl.to(headlineRef.current, { opacity: 0, y: -40, duration: 0.1 }, 0.06);

      // Exit slide-up
      tl.to(innerRef.current, { yPercent: -100, ease: "power2.in", duration: 0.2 }, 0.8);
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
      {showCinematic ? (
        /* Cinematic inner wrapper — slides up on exit, contains image + overlays + text */
        <div ref={innerRef} className="absolute inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <img
              ref={imageRef}
              src={scene01}
              alt="Enerji santrali sahası"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ transform: "scale(1.2)" }}
            />
          </div>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-r from-dark-hero/80 via-dark-hero/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-dark-hero/60 via-transparent to-dark-hero/30" />

          {/* Text overlay */}
          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="max-w-2xl">
                <h1 ref={headlineRef} className="text-display-hero text-white">
                  {HERO.headline}
                </h1>
                <p ref={descRef} className="mt-6 max-w-xl text-body-lg text-white/70">
                  {HERO.description}
                </p>
                <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-4">
                  <AeroButton variant="neutral" href="#iletisim">
                    {HERO.ctaPrimary}
                  </AeroButton>
                  <AeroButton variant="text" href="#hizmetler">
                    {HERO.ctaSecondary}
                  </AeroButton>
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry bar */}
          <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-white/10 bg-dark-hero/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-8 overflow-x-auto">
                {HERO.telemetry.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary-light" />
                    <span className="text-xs text-white/50">{item.label}</span>
                    <span className="font-display text-sm font-medium text-white">
                      {item.value}
                    </span>
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
        </div>
      ) : (
        /* Static fallback for mobile / reduced-motion */
        <>
          <div className="absolute inset-0">
            <img
              src={scene01}
              alt="Enerji santrali sahası"
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-r from-dark-hero/80 via-dark-hero/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-dark-hero/60 via-transparent to-dark-hero/30" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
            <div className="max-w-2xl">
              <h1 className="text-display-hero text-white">{HERO.headline}</h1>
              <p className="mt-6 max-w-xl text-body-lg text-white/70">{HERO.description}</p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <AeroButton variant="neutral" href="#iletisim">
                  {HERO.ctaPrimary}
                </AeroButton>
                <AeroButton variant="text" href="#hizmetler">
                  {HERO.ctaSecondary}
                </AeroButton>
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 z-10 border-t border-white/10 bg-dark-hero/60 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
              <div className="flex items-center gap-8 overflow-x-auto">
                {HERO.telemetry.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 whitespace-nowrap">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-primary-light" />
                    <span className="text-xs text-white/50">{item.label}</span>
                    <span className="font-display text-sm font-medium text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
