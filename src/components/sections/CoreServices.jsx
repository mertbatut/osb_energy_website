import { Check } from "lucide-react";
import { SERVICES } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";
import AeroButton from "../ui/AeroButton.jsx";

/** RES + BESS split-showcase cards. */
export default function CoreServices() {
  return (
    <section id="hizmetler" className="bg-surface-subtle py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel label={SERVICES.sectionLabel} icon="Layers" />

        <div data-animate="stagger-parent" className="mt-12 flex flex-col gap-8">
          {SERVICES.items.map((service, i) => (
            <div
              key={service.id}
              data-animate="stagger-child"
              className="grid overflow-hidden rounded-3xl bg-surface-pure shadow-sm lg:grid-cols-2"
            >
              {/* Image */}
              <div
                className={`relative aspect-[4/3] lg:aspect-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div
                className={`flex flex-col justify-center p-8 lg:p-12 ${i % 2 === 1 ? "lg:order-1" : ""}`}
              >
                <span className="text-label text-brand-primary">{service.subtitle}</span>
                <h3 className="text-headline-lg mt-2 text-text-main">{service.title}</h3>
                <p className="mt-4 text-body text-text-muted">{service.description}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary-light/20">
                        <Check className="h-3 w-3 text-brand-primary" />
                      </span>
                      <span className="text-sm text-text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <AeroButton variant="dark" href="#iletisim">
                    Detaylı Bilgi
                  </AeroButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
