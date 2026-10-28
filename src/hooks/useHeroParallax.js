import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "./useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

/** Breakpoint thresholds for parallax intensity. */
const DESKTOP_MIN = 1024;
const TABLET_MIN = 768;

/**
 * Applies GSAP ScrollTrigger parallax to hero video and text layers.
 * No pin — hero scrolls naturally. Responsive: full on desktop,
 * 60 % on tablet, disabled on mobile.
 *
 * @returns {{ sectionRef: React.RefObject, videoLayerRef: React.RefObject, textLayerRef: React.RefObject }}
 */
export default function useHeroParallax() {
  const sectionRef = useRef(null);
  const videoLayerRef = useRef(null);
  const textLayerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const videoLayer = videoLayerRef.current;
    const textLayer = textLayerRef.current;
    if (!section || !videoLayer || !textLayer) return;

    // Responsive intensity multiplier (sampled once at mount)
    const vw = window.innerWidth;
    let intensity = 0;
    if (vw >= DESKTOP_MIN) intensity = 1;
    else if (vw >= TABLET_MIN) intensity = 0.6;
    // < TABLET_MIN → intensity stays 0, no parallax

    if (intensity === 0) return;

    const ctx = gsap.context(() => {
      const commonTrigger = {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      };

      // Video layer parallax
      gsap.to(videoLayer, {
        y: -60 * intensity,
        x: 15 * intensity,
        scale: 1 + 0.05 * intensity,
        ease: "none",
        scrollTrigger: { ...commonTrigger },
      });

      // Text layer parallax (text moves faster → visual depth)
      gsap.to(textLayer, {
        y: 40 * intensity,
        ease: "none",
        scrollTrigger: { ...commonTrigger },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return { sectionRef, videoLayerRef, textLayerRef };
}
