import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import useReducedMotion from "./hooks/useReducedMotion.js";
import useMotion from "./hooks/useMotion.js";

import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Hero from "./components/sections/Hero.jsx";
import TrustStrip from "./components/sections/TrustStrip.jsx";
import Solutions from "./components/sections/Solutions.jsx";
import StageScene from "./components/sections/StageScene.jsx";
import FinancialImpact from "./components/sections/FinancialImpact.jsx";
import Journey from "./components/sections/Journey.jsx";
import ProcessTimeline from "./components/sections/ProcessTimeline.jsx";
import SectorMarquee from "./components/sections/SectorMarquee.jsx";
import Contact from "./components/sections/Contact.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const rootRef = useRef(null);
  const lenisRef = useRef(null);
  const [scrollPhase, setScrollPhase] = useState(null);
  const [isPinned, setIsPinned] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95 });
    lenis.on("scroll", ScrollTrigger.update);
    lenisRef.current = lenis;

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  // All GSAP animations — state setters are stable, so this object is safe to recreate
  useMotion(rootRef, prefersReducedMotion, lenisRef, {
    onStagePhase: setScrollPhase,
    onStagePinToggle: setIsPinned,
  });

  return (
    <div ref={rootRef} style={{ overflowX: "clip" }}>
      <Navbar />
      <Hero />
      <TrustStrip />
      <main>
        <Solutions />
        <StageScene scrollPhase={scrollPhase} isPinned={isPinned} />
        <FinancialImpact />
        <Journey />
        <ProcessTimeline />
        <SectorMarquee />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
