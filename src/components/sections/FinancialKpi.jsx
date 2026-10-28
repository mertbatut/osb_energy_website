import { FINANCIAL } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";

/** Financial benefit cards + ROI feasibility box. */
export default function FinancialKpi() {
  return (
    <section className="bg-surface-subtle py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel label={FINANCIAL.sectionLabel} icon="TrendingUp" />
        <h2 data-animate="headline" className="text-display-lg mt-4 text-text-main">
          {FINANCIAL.headline}
        </h2>

        {/* Benefit cards */}
        <div data-animate="stagger-parent" className="mt-12 grid gap-6 sm:grid-cols-3">
          {FINANCIAL.benefits.map((benefit) => (
            <div
              key={benefit.title}
              data-animate="stagger-child"
              className="rounded-2xl border border-border-subtle bg-surface-pure p-8 shadow-sm"
            >
              <span className="text-code-metric text-brand-primary">{benefit.value}</span>
              <h3 className="mt-3 font-display text-lg font-medium text-text-main">
                {benefit.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* ROI box */}
        <div
          data-animate="scale"
          className="mt-8 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-8"
        >
          <h3 className="text-headline-md text-text-main">{FINANCIAL.roi.title}</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FINANCIAL.roi.metrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <span className="font-display text-2xl font-semibold text-brand-primary">
                  {metric.value}
                </span>
                <p className="mt-1 text-sm text-text-muted">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
