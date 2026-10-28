import { ChevronDown } from "lucide-react";
import { HERO } from "../../constants/content.js";
import scene01 from "../../assets/images/scene-01.jpg";
import AeroButton from "../ui/AeroButton.jsx";
import HeroVideoBackground from "./HeroVideoBackground.jsx";
import useHeroVideoPlayback from "../../hooks/useHeroVideoPlayback.js";
import useHeroParallax from "../../hooks/useHeroParallax.js";

const VIDEO_SRC = "/videos/Wind_turbines_and_solar_panels_159d8ea5_1080p.mp4";

/**
 * Full-screen hero with video background, poster fallback,
 * and GSAP ScrollTrigger parallax (no pin).
 * Reduced-motion / saveData: static poster, no parallax.
 */
export default function CinematicHero() {
  const { videoRef, isVideoReady, hasError, shouldSkipVideo } = useHeroVideoPlayback(VIDEO_SRC);
  const { sectionRef, videoLayerRef, textLayerRef } = useHeroParallax();

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-dark-hero"
      style={{ minHeight: "100svh" }}
    >
      {/* Video / poster background layer — parallax target */}
      <div ref={videoLayerRef} className="absolute inset-0 overflow-hidden">
        {shouldSkipVideo ? (
          <img
            src={scene01}
            alt="Enerji santrali sahası"
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover md:object-center"
            style={{ objectPosition: "60% center" }}
          />
        ) : (
          <HeroVideoBackground
            videoRef={videoRef}
            isVideoReady={isVideoReady}
            hasError={hasError}
          />
        )}

        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-r from-dark-hero/70 via-dark-hero/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-t from-dark-hero/50 via-transparent to-dark-hero/20" />
      </div>

      {/* Text content — independent parallax, bottom-aligned */}
      <div ref={textLayerRef} className="relative z-10 flex h-full items-end pb-28">
        <div className="mx-auto w-full max-w-7xl px-6">
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
      </div>

      {/* Telemetry bar — pinned to bottom, outside parallax */}
      <div className="absolute right-0 bottom-0 left-0 z-20 border-t border-white/10 bg-dark-hero/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8 overflow-x-auto">
            {HERO.telemetry.map((item) => (
              <div key={item.label} className="flex items-center gap-3 whitespace-nowrap">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-primary-light" />
                <span className="text-xs text-white/50">{item.label}</span>
                <span className="font-display text-sm font-medium text-white">{item.value}</span>
              </div>
            ))}
          </div>
          <a
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
