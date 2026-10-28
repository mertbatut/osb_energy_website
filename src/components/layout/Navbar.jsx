import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../constants/navigation.js";
import AeroButton from "../ui/AeroButton.jsx";

const MOBILE_MENU_ID = "mobile-nav-menu";

/**
 * Fixed dark header with frosted glass effect on scroll.
 * @param {Object} props
 * @param {boolean} props.scrolled - Whether user has scrolled past threshold
 */
export default function Navbar({ scrolled }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileOpen, closeMobile]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => {
      if (e.matches) closeMobile();
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [closeMobile]);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-dark-hero/80 shadow-lg backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="font-display text-xl font-semibold tracking-tight text-white">
          OSB ENERGY
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
          >
            TR / EN
          </button>
          <AeroButton variant="ghost" href="#iletisim">
            Fizibilite Talebi
          </AeroButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="text-white lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={mobileOpen}
          aria-controls={MOBILE_MENU_ID}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id={MOBILE_MENU_ID}
          role="menu"
          className="border-t border-white/10 bg-dark-hero/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  className="block rounded-lg px-4 py-3 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                  onClick={closeMobile}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="border-t border-white/10 px-6 py-4">
            <AeroButton variant="ghost" href="#iletisim" className="w-full justify-center">
              Fizibilite Talebi
            </AeroButton>
          </div>
        </div>
      )}
    </header>
  );
}
