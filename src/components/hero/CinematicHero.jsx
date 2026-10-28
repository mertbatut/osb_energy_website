import { HERO } from "../../constants/content.js";
import heroImage from "../../assets/images/hero-wind-turbines.png";
import AeroButton from "../ui/AeroButton.jsx";
import useHeroParallax from "../../hooks/useHeroParallax.js";

/** Static hero artwork with native scroll parallax; no video or GSAP. */
export default function CinematicHero() {
  const { sectionRef, imageLayerRef, textLayerRef } = useHeroParallax();

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-dark-hero"
    >
      <div
        ref={imageLayerRef}
        className="pointer-events-none absolute -top-16 right-0 -bottom-16 left-0"
      >
        <img
          src={heroImage}
          alt="Gün batımında yeşil tepeler üzerindeki rüzgâr türbinleri"
          width={1448}
          height={1086}
          loading="eager"
          fetchPriority="high"
          className="h-full w-full object-cover object-[60%_top] md:object-[center_top]"
        />
        <div aria-hidden="true" className="hero-sun-softener absolute inset-0" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/15 via-black/5 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-end px-6 pt-32 pb-20 sm:pb-28">
        <div ref={textLayerRef} className="w-full max-w-xl lg:w-[48%]">
          <h1 className="text-display-hero text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
            {HERO.headline}
          </h1>
          <p className="mt-6 text-body-lg text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
            {HERO.description}
          </p>
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
    </section>
  );
}
