import { FOOTER } from "../../constants/content.js";

/** Minimal dark footer with bottom bar badges. */
export default function Footer() {
  return (
    <footer className="bg-surface-footer pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <a href="#" className="font-display text-xl font-semibold tracking-tight text-white">
              {FOOTER.brand}
            </a>
            <p className="mt-3 text-sm text-white/40">{FOOTER.tagline}</p>
          </div>

          {/* Link columns */}
          {FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-label text-white/60">{col.title}</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/40 transition-colors duration-200 hover:text-white/60"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">{FOOTER.legal}</p>
          <div className="flex flex-wrap gap-2">
            {FOOTER.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-md border border-white/5 px-2.5 py-1 text-xs text-white/40"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
