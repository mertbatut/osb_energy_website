import { useEffect, useRef } from "react";
import useReducedMotion from "./useReducedMotion.js";

/** Scroll-driven layers using CSS translate, separate from GSAP reveal transforms. */
export default function useSectionParallax() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reducedMotion) return;
    const layers = [...section.querySelectorAll("[data-section-parallax]")];
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const { top, height } = section.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = Math.max(-1, Math.min(1, (viewport - height - 2 * top) / (viewport + height)));
      const intensity = window.innerWidth < 768 ? 0.35 : 1;
      layers.forEach(layer => {
        const distance = Number(layer.dataset.sectionParallax) || 0;
        layer.style.translate = `0 ${progress * distance * intensity}px`;
      });
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }, { rootMargin: "100px 0px" });
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
      layers.forEach(layer => layer.style.removeProperty("translate"));
    };
  }, [reducedMotion]);

  return sectionRef;
}
