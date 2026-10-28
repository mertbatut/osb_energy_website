import { createElement, useState } from "react";
import { BESS_TECH } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";
import ICON_MAP from "../ui/IconMap.jsx";

/**
 * Interactive energy flow diagram with dark theme.
 * Click a node to see its description in the detail panel.
 */
export default function BessTechnology() {
  const [activeIndex, setActiveIndex] = useState(2);
  const activeStep = BESS_TECH.flowSteps[activeIndex];

  return (
    <section id="teknoloji" className="bg-dark-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel label={BESS_TECH.sectionLabel} icon="Battery" theme="dark" />
          <h2 data-animate="headline" className="text-display-lg mt-4 text-white">
            {BESS_TECH.headline}
          </h2>
          <p data-animate="body" className="mt-4 text-body-lg text-white/60">
            {BESS_TECH.description}
          </p>
        </div>

        {/* Flow diagram — Desktop: horizontal, Mobile: vertical buttons */}
        <div className="mt-16">
          {/* Desktop flow */}
          <div className="hidden items-center justify-center md:flex">
            {BESS_TECH.flowSteps.map((step, i) => (
              <div key={step.id} className="flex items-center">
                <button
                  type="button"
                  aria-pressed={i === activeIndex}
                  onClick={() => setActiveIndex(i)}
                  className={`flex flex-col items-center gap-3 rounded-2xl border px-6 py-5 transition-all duration-300 ${
                    i === activeIndex
                      ? "scale-110 border-brand-primary bg-brand-primary/20"
                      : "border-white/10 bg-dark-card hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                      i === activeIndex ? "bg-brand-primary/30" : "bg-white/10"
                    }`}
                  >
                    {createElement(ICON_MAP[step.icon] || ICON_MAP.Circle, {
                      className: `h-6 w-6 ${i === activeIndex ? "text-brand-primary-light" : "text-white/60"}`,
                    })}
                  </div>
                  <span className="text-label text-white/50">{step.id}</span>
                  <span
                    className={`font-display text-sm font-medium ${
                      i === activeIndex ? "text-white" : "text-white/70"
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {i < BESS_TECH.flowSteps.length - 1 && (
                  <div className="mx-2 h-0.5 w-12 bg-gradient-to-r from-brand-primary/40 to-white/10" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile flow */}
          <div className="flex flex-col gap-2 md:hidden">
            {BESS_TECH.flowSteps.map((step, i) => (
              <button
                key={step.id}
                type="button"
                aria-pressed={i === activeIndex}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                  i === activeIndex
                    ? "border-brand-primary bg-brand-primary/20"
                    : "border-white/10 bg-dark-card"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    i === activeIndex ? "bg-brand-primary/30" : "bg-white/10"
                  }`}
                >
                  {createElement(ICON_MAP[step.icon] || ICON_MAP.Circle, {
                    className: `h-5 w-5 ${i === activeIndex ? "text-brand-primary-light" : "text-white/60"}`,
                  })}
                </div>
                <div>
                  <span className="text-label text-white/50">{step.id}</span>
                  <span
                    className={`ml-2 font-display text-sm font-medium ${
                      i === activeIndex ? "text-white" : "text-white/70"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="mt-10 flex items-center justify-center">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-dark-card p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-brand-primary/20">
              {createElement(ICON_MAP[activeStep.icon] || ICON_MAP.Circle, {
                className: "h-7 w-7 text-brand-primary-light",
              })}
            </div>
            <h3 className="mt-4 font-display text-lg font-medium text-white">{activeStep.label}</h3>
            <p className="mt-2 text-body text-white/60">{activeStep.description}</p>
          </div>
        </div>

        {/* Tech pillars */}
        <div
          data-animate="stagger-parent"
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {BESS_TECH.pillars.map((pillar) => (
            <div
              key={pillar.title}
              data-animate="stagger-child"
              className="rounded-2xl border border-white/10 bg-dark-card p-6 transition-shadow duration-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                {createElement(ICON_MAP[pillar.icon] || ICON_MAP.Circle, {
                  className: "h-5 w-5 text-brand-primary-light",
                })}
              </div>
              <h3 className="mt-4 font-display text-base font-medium text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-white/60">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
