import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import CinematicHero from "./components/hero/CinematicHero.jsx";
import StoryboardStrip from "./components/sections/StoryboardStrip.jsx";
import CorporateIntro from "./components/sections/CorporateIntro.jsx";
import CoreServices from "./components/sections/CoreServices.jsx";
import IndustrialMarquee from "./components/sections/IndustrialMarquee.jsx";
import BessTechnology from "./components/sections/BessTechnology.jsx";
import FinancialKpi from "./components/sections/FinancialKpi.jsx";
import HybridSynergy from "./components/sections/HybridSynergy.jsx";
import SectorApplications from "./components/sections/SectorApplications.jsx";
import EngineeringProcess from "./components/sections/EngineeringProcess.jsx";
import ProjectsPortfolio from "./components/sections/ProjectsPortfolio.jsx";
import CtaContact from "./components/sections/CtaContact.jsx";
import useReducedMotion from "./hooks/useReducedMotion.js";

gsap.registerPlugin(ScrollTrigger);

const SCROLL_THRESHOLD = 50;

function subscribeScroll(callback) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}
function getScrollSnapshot() {
  const hero = document.getElementById("hero");
  if (!hero) return window.scrollY > SCROLL_THRESHOLD;
  // While pinned rect.top stays 0; after unpin it scrolls negative
  return hero.getBoundingClientRect().top < -1;
}
function getScrollServerSnapshot() {
  return false;
}

export default function App() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot,
  );
  const mainRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  // Lenis smooth scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  // GSAP section reveal animations
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal headlines
      gsap.utils.toArray("[data-animate='headline']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Reveal body text
      gsap.utils.toArray("[data-animate='body']").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Staggered cards
      gsap.utils.toArray("[data-animate='stagger-parent']").forEach((parent) => {
        const children = parent.querySelectorAll("[data-animate='stagger-child']");
        if (children.length === 0) return;
        gsap.fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: parent,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Scale reveal for images
      gsap.utils.toArray("[data-animate='scale']").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <>
      <Navbar scrolled={scrolled} />
      <main ref={mainRef}>
        <CinematicHero />
        <CorporateIntro />
        <StoryboardStrip />
        <CoreServices />
        <IndustrialMarquee />
        <BessTechnology />
        <FinancialKpi />
        <HybridSynergy />
        <SectorApplications />
        <EngineeringProcess />
        <ProjectsPortfolio />
        <CtaContact />
      </main>
      <Footer />
    </>
  );
}
