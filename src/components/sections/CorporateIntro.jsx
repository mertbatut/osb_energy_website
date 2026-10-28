import { CORPORATE } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";
import KpiMetric from "../ui/KpiMetric.jsx";

/** Kurumsal intro with KPI metrics on light background. */
export default function CorporateIntro() {
  return (
    <section id="hakkimizda" className="bg-surface-page py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          {/* Text column */}
          <div className="lg:col-span-7">
            <SectionLabel label={CORPORATE.sectionLabel} icon="Building2" />
            <h2 data-animate="headline" className="text-display-lg mt-4 text-text-main">
              {CORPORATE.headline}
            </h2>
            <p data-animate="body" className="mt-6 max-w-xl text-body-lg text-text-muted">
              {CORPORATE.description}
            </p>
          </div>

          {/* KPI column */}
          <div className="lg:col-span-5">
            <div data-animate="stagger-parent" className="grid grid-cols-2 gap-8">
              {CORPORATE.kpis.map((kpi) => (
                <KpiMetric
                  key={kpi.label}
                  value={kpi.value}
                  label={kpi.label}
                  suffix={kpi.suffix}
                  prefix={kpi.prefix}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
