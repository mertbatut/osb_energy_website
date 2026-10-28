import { Mail, Phone, MapPin } from "lucide-react";
import { CTA } from "../../constants/content.js";
import AeroButton from "../ui/AeroButton.jsx";

/** Final CTA section with contact info. */
export default function CtaContact() {
  return (
    <section id="iletisim" className="bg-dark-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* CTA text */}
          <div>
            <h2 data-animate="headline" className="text-display-lg whitespace-pre-line text-white">
              {CTA.headline}
            </h2>
            <p data-animate="body" className="mt-6 max-w-lg text-body-lg text-white/60">
              {CTA.description}
            </p>
            <div className="mt-10">
              <AeroButton variant="neutral" href="mailto:info@osbenergy.com">
                {CTA.ctaPrimary}
              </AeroButton>
            </div>
          </div>

          {/* Contact card */}
          <div data-animate="scale" className="rounded-2xl border border-white/10 bg-dark-card p-8">
            <h3 className="text-headline-md text-white">İletişim Bilgileri</h3>
            <div className="mt-8 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20">
                  <Mail className="h-5 w-5 text-brand-primary-light" />
                </div>
                <div>
                  <span className="text-label text-white/50">E-posta</span>
                  <a
                    href={`mailto:${CTA.ctaSecondary}`}
                    className="mt-1 block text-white transition-colors hover:text-brand-primary-light"
                  >
                    {CTA.ctaSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20">
                  <Phone className="h-5 w-5 text-brand-primary-light" />
                </div>
                <div>
                  <span className="text-label text-white/50">Telefon</span>
                  <a
                    href={`tel:${CTA.phone.replace(/\s/g, "")}`}
                    className="mt-1 block text-white transition-colors hover:text-brand-primary-light"
                  >
                    {CTA.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20">
                  <MapPin className="h-5 w-5 text-brand-primary-light" />
                </div>
                <div>
                  <span className="text-label text-white/50">Adres</span>
                  <p className="mt-1 text-white">{CTA.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
