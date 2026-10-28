import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgSrc from "../../assets/images/background_approx.webp";
import revealSrc from "../../assets/images/landscape_reveal.webp";
import fgSrc from "../../assets/images/turbine_foreground.png";

gsap.registerPlugin(ScrollTrigger);

/**
 * 3-layer parallax hero driven by a GSAP scrub timeline.
 * Layers (back → front): background landscape, landscape reveal, foreground turbine.
 * Does NOT pin — pinning is owned by parent HeroSection's ScrollTrigger.
 *
 * @param {{ sectionRef: React.RefObject<HTMLElement> }} props
 */
export default function DroneParallaxHero({ sectionRef }) {
  const bgRef = useRef(null);
  const revealRef = useRef(null);
  const fgRef = useRef(null);

  useEffect(() => {
    const section = sectionRef?.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          // No pin — parent HeroSection owns the pin
        },
      });

      // Background parallax: slow zoom + upward drift (0–100%)
      tl.fromTo(bgRef.current, { scale: 1, y: "0%" }, { scale: 1.15, y: "-8%", ease: "none" }, 0);

      // Foreground turbine: scale up + drift left and up (0–100%)
      tl.fromTo(
        fgRef.current,
        { scale: 1, x: "0%", y: "0%" },
        { scale: 1.3, x: "-15%", y: "-5%", ease: "none" },
        0,
      );

      // Landscape reveal: fade in + settle (65–100%)
      tl.fromTo(
        revealRef.current,
        { opacity: 0, scale: 1.1, y: "5%" },
        { opacity: 1, scale: 1, y: "0%", ease: "none" },
        0.65,
      );
    }, section);

    return () => ctx.revert();
  }, [sectionRef]);

  const layerBase = "absolute inset-0 h-full w-full object-cover";

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Layer 0 — Background landscape */}
      <img
        ref={bgRef}
        src={bgSrc}
        alt=""
        className={`${layerBase} z-0 will-change-transform`}
        loading="eager"
        decoding="async"
      />

      {/* Layer 1 — Landscape reveal (starts invisible) */}
      <img
        ref={revealRef}
        src={revealSrc}
        alt=""
        className={`${layerBase} z-[1] opacity-0 will-change-[transform,opacity]`}
        loading="eager"
        decoding="async"
      />

      {/* Layer 2 — Foreground turbine */}
      <img
        ref={fgRef}
        src={fgSrc}
        alt=""
        className={`${layerBase} z-[2] will-change-transform`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
