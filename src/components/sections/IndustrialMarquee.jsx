import { MARQUEE_IMAGES } from "../../constants/content.js";
import AeroButton from "../ui/AeroButton.jsx";

/** Dual-track image marquee with CTA column. */
export default function IndustrialMarquee() {
  // Duplicate images for seamless loop
  const doubledImages = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section className="overflow-hidden bg-dark-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* CTA column */}
          <div className="lg:col-span-4">
            <h2 className="text-display-lg text-white">
              Sahadan
              <br />
              görüntüler.
            </h2>
            <p className="mt-4 text-body text-white/60">
              Türkiye genelinde tamamladığımız projelerin sahadan fotoğrafları.
            </p>
            <div className="mt-8">
              <AeroButton variant="neutral" href="#projeler">
                Tüm Projeler
              </AeroButton>
            </div>
          </div>

          {/* Marquee tracks */}
          <div className="relative overflow-hidden lg:col-span-8">
            {/* Gradient edge fades */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-16 bg-gradient-to-r from-dark-hero to-transparent" />
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-16 bg-gradient-to-l from-dark-hero to-transparent" />

            {/* Track 1 - left */}
            <div className="mb-4 flex w-max animate-marquee-left gap-4 hover:[animation-play-state:paused]">
              {doubledImages.map((img, i) => (
                <div key={`t1-${i}`} className="h-48 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt="Saha fotoğrafı"
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Track 2 - right */}
            <div className="flex w-max animate-marquee-right gap-4 hover:[animation-play-state:paused]">
              {doubledImages.map((img, i) => (
                <div key={`t2-${i}`} className="h-48 w-72 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={img}
                    alt="Saha fotoğrafı"
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
