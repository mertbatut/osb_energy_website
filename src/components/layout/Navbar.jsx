import logo from "../../assets/images/osb-energy-logo.png";
import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../constants/navigation.js";
import AeroButton from "../ui/AeroButton.jsx";

const MOBILE_MENU_ID = "mobile-nav-menu";

/** Transparent header with an independent, full-screen mobile navigation panel. */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;
    const menu = menuRef.current;
    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.querySelector("button").focus();

    const handleKey = event => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobile();
      }
      if (event.key !== "Tab") return;
      const elements = [...menu.querySelectorAll("a[href], button")];
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      toggle?.focus({ preventScroll: true });
    };
  }, [mobileOpen, closeMobile]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = event => { if (event.matches) closeMobile(); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [closeMobile]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-transparent">
      <nav aria-label="Ana gezinme" className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a href="#" className="-mx-3 -my-2 inline-flex shrink-0 rounded-lg bg-surface-page/95 px-3 py-2">
          <img src={logo} alt="OSB ENERGY" width="1000" height="260" className="h-auto w-36 sm:w-40" />
        </a>

        <ul className="hidden items-center gap-4 xl:gap-8 lg:flex">
          {NAV_LINKS.map(link => (
            <li key={link.href}>
              <a href={link.href} className="whitespace-nowrap text-base text-white/70 transition-colors duration-200 hover:text-white">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden shrink-0 items-center gap-4 lg:flex">
          <button type="button" className="whitespace-nowrap text-base text-white/70 transition-colors duration-200 hover:text-white">
            TR / EN
          </button>
          <AeroButton variant="ghost" href="#iletisim" className="text-base! whitespace-nowrap">
            Fizibilite Talebi
          </AeroButton>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-page/95 text-text-main transition-colors hover:bg-white lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Menüyü aç"
          aria-expanded={mobileOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {mobileOpen && (
        <div
          ref={menuRef}
          id={MOBILE_MENU_ID}
          role="dialog"
          aria-modal="true"
          aria-label="Ana menü"
          data-lenis-prevent
          className="animate-fade-in fixed inset-0 z-50 flex h-dvh flex-col bg-surface-page px-6 sm:px-10 lg:hidden"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-border-subtle py-5">
            <a href="#hero" onClick={closeMobile}>
              <img src={logo} alt="OSB ENERGY ana sayfa" width="1000" height="260" className="h-auto w-36 sm:w-40" />
            </a>
            <button type="button" onClick={closeMobile} aria-label="Menüyü kapat" className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-text-main transition-colors hover:bg-surface-subtle">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav aria-label="Mobil gezinme" className="min-h-0 flex-1 overflow-y-auto py-5 sm:py-8">
            <ul className="divide-y divide-border-subtle">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMobile} className="group flex min-h-16 items-center justify-between gap-4 py-4 font-display text-2xl font-medium tracking-tight text-text-main transition-colors hover:text-brand-primary sm:min-h-20 sm:text-3xl">
                    {link.label}
                    <ArrowUpRight aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-border-subtle pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <a href="#iletisim" onClick={closeMobile} className="flex min-h-14 items-center justify-between gap-4 rounded-full bg-brand-primary px-6 text-base font-medium text-white transition-colors hover:bg-brand-primary-hover">
              Fizibilite Talebi
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
