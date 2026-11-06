import logoBlue from "../../assets/images/logo-blue.png";
import { NAV_LINKS, NAV_CTA, PHONE, PHONE_HREF } from "../../constants/navigation.js";
import InheritButton from "../ui/InheritButton.jsx";

/** Sticky navbar: blur bg, logo left, 4 navlinks center, phone + CTA right. */
export default function Navbar() {
  return (
    <nav
      className="navbar wrap"
      aria-label="Ana menü"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        paddingTop: 26,
        paddingBottom: 26,
      }}
    >
      <a href="#top" aria-label="OSB ENERGY ana sayfa" style={{ display: "flex" }}>
        <img
          src={logoBlue}
          alt="OSB ENERGY"
          style={{ height: 42, width: "auto", display: "block" }}
        />
      </a>

      <div className="navlinks" style={{ display: "flex", gap: 36 }}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} className="navlink" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <a
          className="navphone"
          href={PHONE_HREF}
          style={{
            color: "var(--ink)",
            fontWeight: 700,
            textDecoration: "none",
            fontSize: 15,
          }}
        >
          {PHONE}
        </a>
        <InheritButton href="#iletisim" className="!min-h-12 !px-[22px] !text-sm">
          {NAV_CTA}
        </InheritButton>
      </div>
    </nav>
  );
}
