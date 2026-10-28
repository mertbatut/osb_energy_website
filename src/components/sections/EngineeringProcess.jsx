import useSectionParallax from "../../hooks/useSectionParallax.js";
import { PROCESS } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";
import AeroButton from "../ui/AeroButton.jsx";

/**
 * Bento panel for a single process step.
 * @param {Object} props
 * @param {Object} props.step - Step data { id, title, description }
 * @param {string} [props.className] - Additional grid/layout classes
 */
function BentoPanel({ step, className = "" }) {
  return (
    <div
      data-animate="stagger-child"
      className={`relative overflow-hidden rounded-2xl border border-white/5 bg-dark-card p-8 transition-all duration-300 hover:scale-[1.01] hover:border-white/10 ${className}`}
    >
      <span className="absolute top-4 right-6 font-display text-6xl font-bold text-white/5">
        {step.id}
      </span>
      <span className="text-label text-brand-primary-light">Adım {step.id}</span>
      <h3 className="mt-3 font-display text-lg font-medium text-white">{step.title}</h3>
      <p className="mt-2 text-sm text-white/60">{step.description}</p>
    </div>
  );
}

/** 6-step bento grid on dark background. */
export default function EngineeringProcess() {
  const sectionRef = useSectionParallax();
  const lastStep = PROCESS.steps[PROCESS.steps.length - 1];
  const gridSteps = PROCESS.steps.slice(0, -1);

  return (
    <section ref={sectionRef} id="surec" className="relative overflow-hidden bg-dark-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div data-section-parallax="-65" className="mx-auto max-w-2xl text-center">
          <SectionLabel label={PROCESS.sectionLabel} icon="GitBranch" theme="dark" />
          <h2 data-animate="headline" className="text-display-lg mt-4 text-white">
            {PROCESS.headline}
          </h2>
        </div>

        <div
          data-section-parallax="55"
          data-animate="stagger-parent"
          className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Row 1: col-span-2 + col-span-1 */}
          <BentoPanel step={gridSteps[0]} className="lg:col-span-2" />
          <BentoPanel step={gridSteps[1]} />

          {/* Row 2: 3 equal columns */}
          {gridSteps.slice(2).map((step) => (
            <BentoPanel key={step.id} step={step} />
          ))}

          {/* Row 3: Full-width CTA panel */}
          <div
            data-animate="stagger-child"
            className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/5 bg-dark-card p-8 sm:flex-row sm:items-center md:col-span-2 lg:col-span-3"
          >
            <div>
              <span className="text-label text-brand-primary-light">Adım {lastStep.id}</span>
              <h3 className="mt-2 font-display text-lg font-medium text-white">{lastStep.title}</h3>
              <p className="mt-1 text-sm text-white/60">{lastStep.description}</p>
            </div>
            <AeroButton variant="ghost" href="#iletisim" className="shrink-0">
              Fizibilite Talebi
            </AeroButton>
          </div>
        </div>
      </div>
    </section>
  );
}
