import logoWhite from "../../assets/images/logo-white.png";
import logoWhiteHd from "../../assets/images/logo-white-hd.png";
import { FOOTER } from "../../constants/content.js";
import InheritButton from "../ui/InheritButton.jsx";

/** Footer: particle logo canvas area + tagline + CTA + bottom bar. */
export default function Footer() {
  return (
    <footer style={{ background: "var(--dark-2)", color: "var(--on-dark-muted)" }}>
      {/* Logo area */}
      <div
        className="foot-logo"
        style={{
          position: "relative",
          height: "clamp(240px, 30vw, 440px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* GL canvas placeholder for Faz 4 */}
        <canvas
          className="foot-canvas"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
        <img
          className="foot-static"
          src={logoWhiteHd}
          alt="OSB ENERGY"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "min(76%, 1080px)",
            height: "auto",
            transform: "translate(-50%, -50%)",
            transition: "opacity 400ms ease",
          }}
        />
        <p
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 18,
            textAlign: "center",
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {FOOTER.logoHint}
        </p>
      </div>

      {/* Content */}
      <div
        className="wrap"
        style={{
          paddingTop: "clamp(80px, 8vw, 120px)",
          paddingBottom: 40,
          display: "flex",
          flexDirection: "column",
          gap: 72,
        }}
      >
        {/* Tagline + CTA */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 40,
          }}
        >
          <p className="reveal" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span className="ln">
              <span className="sh-a" style={{ color: "var(--on-dark-muted)" }}>
                {FOOTER.taglineKicker}
              </span>
            </span>
            <span className="ln">
              <span className="sh-b" style={{ color: "#FFFFFF" }}>
                {FOOTER.taglineHeadline}
              </span>
            </span>
          </p>
          <InheritButton href="#iletisim" light magnet>
            {FOOTER.cta}
          </InheritButton>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            paddingTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            fontSize: 15,
          }}
        >
          <img src={logoWhite} alt="OSB ENERGY" style={{ height: 36, width: "auto" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px" }}>
            {FOOTER.links.map((link) => (
              <a
                key={link.text}
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                style={{ color: "#FFFFFF", textDecoration: "none" }}
              >
                {link.text}
              </a>
            ))}
            <span>{FOOTER.legal}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
