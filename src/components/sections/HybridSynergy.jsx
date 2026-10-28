import { createElement } from "react";
import { HYBRID } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";
import ICON_MAP from "../ui/IconMap.jsx";

/** Rüzgâr + Depolama dark section with split layout. */
export default function HybridSynergy() {
  return (
    <section className="relative overflow-hidden bg-dark-hero py-24">
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-primary/15 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div>
            <SectionLabel label={HYBRID.sectionLabel} icon="Combine" theme="dark" />
            <h2
              data-animate="headline"
              className="text-display-lg mt-4 whitespace-pre-line text-white"
            >
              {HYBRID.headline}
            </h2>
            <p data-animate="body" className="mt-6 max-w-lg text-body-lg text-white/60">
              {HYBRID.description}
            </p>

            {/* Feature mini-cards */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              {HYBRID.features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                >
                  {createElement(ICON_MAP[feature.icon] || ICON_MAP.Circle, {
                    className: "h-5 w-5 text-brand-primary-light",
                  })}
                  <h3 className="mt-3 font-display text-sm font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/50">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div data-animate="scale" className="relative overflow-hidden rounded-3xl">
            <img
              src={HYBRID.image}
              alt="Hibrit enerji sistemi"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/60 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
