import { useRef, useEffect } from "react";
import useReducedMotion from "./useReducedMotion.js";

/** Native scroll parallax. Image and copy move at different speeds without GSAP. */
export default function useHeroParallax() {
  const sectionRef = useRef(null);
  const imageLayerRef = useRef(null);
  const textLayerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const section = sectionRef.current;
    const imageLayer = imageLayerRef.current;
    const textLayer = textLayerRef.current;
    if (!section || !imageLayer || !textLayer) return;

    let frame = 0;
    let visible = true;
    const update = () => {
      frame = 0;
      const { top, height } = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -top / height));
      const isMobile = window.innerWidth < 768;
      // Move the background against the page's scroll while the copy exits faster.
      // Viewport-relative travel keeps the depth perceptible on different screens.
      const imageDistance = height * (isMobile ? 0.28 : 0.42);
      const textDistance = height * (isMobile ? 0.24 : 0.36);
      imageLayer.style.transform = `translate3d(0, ${progress * imageDistance}px, 0)`;
      textLayer.style.transform = `translate3d(0, ${-progress * textDistance}px, 0)`;
    };
    const schedule = () => {
      if (visible && !frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
      imageLayer.style.removeProperty("transform");
      textLayer.style.removeProperty("transform");
    };
  }, [prefersReducedMotion]);

  return { sectionRef, imageLayerRef, textLayerRef };
}
