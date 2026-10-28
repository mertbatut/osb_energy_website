import { createElement, useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { BESS_TECH } from "../../constants/content.js";
import ICON_MAP from "../ui/IconMap.jsx";
import useReducedMotion from "../../hooks/useReducedMotion.js";
import bessShowcase from "../../assets/images/bess-showcase.png";

const MOBILE_MAX = 768;

/**
 * BESS Technology Showcase — full-width split-screen editorial layout.
 * Left: full-bleed BESS photograph with GSAP parallax.
 * Right: editorial panel with Manrope headline, DM Sans body, 2×2 feature grid, underline CTA.
 */
export default function BessTechnology() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const image = imageRef.current;
    const panel = panelRef.current;
    if (!section || !image || !panel) return;

    const isMobile = window.innerWidth < MOBILE_MAX;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: section,
        start: "top 85%",
        end: "bottom 20%",
        scrub: 0.6,
      };

      if (!isMobile) {
        // Photo: scale down + vertical parallax
        gsap.fromTo(
          image,
          { scale: 1.06, y: -18 },
          { scale: 1, y: 18, ease: "none", scrollTrigger: trigger },
        );
      }

      // Right panel: staggered reveal
      const revealElements = panel.querySelectorAll("[data-reveal]");
      if (revealElements.length > 0) {
        gsap.fromTo(
          revealElements,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              end: "top 35%",
              scrub: 0.5,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="teknoloji" ref={sectionRef} className="w-full overflow-hidden bg-[#FAFBFC]">
      <div className="flex min-h-[600px] flex-col md:min-h-[700px] md:flex-row lg:min-h-[760px] xl:max-h-[900px]">
        {/* Left: full-bleed photograph */}
        <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:w-[58%] lg:w-[63%]">
          <img
            ref={imageRef}
            src={bessShowcase}
            alt="OSB Energy BESS enerji depolama sistemi, geniş açı gün batımı görünümü"
            loading="lazy"
            decoding="async"
            width={1200}
            height={800}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Right: editorial panel */}
        <div
          ref={panelRef}
          className="flex w-full flex-col justify-center bg-[#FAFBFC] px-6 py-12 sm:px-10 md:w-[42%] md:py-16 md:pl-10 md:pr-12 lg:w-[37%] lg:pl-14 lg:pr-16 xl:pl-16 xl:pr-20"
        >
          {/* Eyebrow */}
          <span
            data-reveal
            className="text-xs font-semibold tracking-[0.12em] text-text-soft"
            style={{ fontFamily: "var(--font-bess-body)" }}
          >
            {BESS_TECH.sectionLabel}
          </span>

          {/* Headline */}
          <h2
            data-reveal
            className="mt-4 text-text-main"
            style={{
              fontFamily: "var(--font-bess-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 2.5vw + 0.5rem, 3.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              whiteSpace: "pre-line",
            }}
          >
            {BESS_TECH.headline}
          </h2>

          {/* Description */}
          <p
            data-reveal
            className="mt-5 text-text-muted"
            style={{
              fontFamily: "var(--font-bess-body)",
              fontSize: "clamp(1rem, 0.5vw + 0.875rem, 1.125rem)",
              lineHeight: 1.7,
            }}
          >
            {BESS_TECH.description}
          </p>

          {/* 2×2 feature grid */}
          <div data-reveal className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {BESS_TECH.features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10">
                  {createElement(ICON_MAP[feature.icon] || ICON_MAP.Circle, {
                    className: "h-[18px] w-[18px] text-brand-primary",
                  })}
                </div>
                <div>
                  <h3
                    className="text-sm font-semibold text-text-main"
                    style={{ fontFamily: "var(--font-bess-body)" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="mt-0.5 text-xs leading-relaxed text-text-muted"
                    style={{ fontFamily: "var(--font-bess-body)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            data-reveal
            href="#finansal"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors hover:text-brand-primary-hover"
            style={{ fontFamily: "var(--font-bess-body)" }}
          >
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-75 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              {BESS_TECH.cta}
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[5px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
