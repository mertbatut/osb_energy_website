import { useMemo } from "react";
import heroImg from "../../assets/images/hero-container-cutout.png";
import { HERO } from "../../constants/content.js";
import InheritButton from "../ui/InheritButton.jsx";
import UnderlineLink from "../ui/UnderlineLink.jsx";

/**
 * Returns the index of the currently active battery stage based on the current hour.
 * @returns {number}
 */
function getActiveStage() {
  const hour = new Date().getHours();
  return HERO.batteryStages.findIndex((stage) => hour >= stage.hours[0] && hour < stage.hours[1]);
}

/** Hero section: backword, h1, product cutout, battery status, scroll indicator. */
export default function Hero() {
  const activeStage = useMemo(() => getActiveStage(), []);

  return (
    <header
      id="top"
      className="hero"
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: 820,
      }}
    >
      <p className="backword" aria-hidden="true">
        {HERO.backword}
      </p>

      {/* Main content */}
      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px 56px",
          alignItems: "center",
          paddingTop: "clamp(16px, 3vw, 40px)",
          paddingBottom: 32,
        }}
      >
        {/* Left: text */}
        <div
          style={{
            flex: "1 1 500px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <h1 style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span className="ln">
              <span className="sh-a">{HERO.kicker}</span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                fontWeight: "var(--disp-w)",
                fontSize: "clamp(3.4rem, 7vw, 7.2rem)",
                lineHeight: 0.94,
                letterSpacing: "var(--disp-track)",
                color: "var(--ink)",
              }}
            >
              <span className="ln">
                <span>{HERO.h1Lines[0]}</span>
              </span>
              <span className="ln">
                <span>
                  {HERO.h1Lines[1]}
                  <span style={{ color: "var(--accent)" }}>.</span>
                </span>
              </span>
            </span>
          </h1>

          <p className="hero-fade lead" style={{ maxWidth: "30rem" }}>
            {HERO.lead}
          </p>

          <div
            className="hero-fade"
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px 36px",
            }}
          >
            <InheritButton href="#iletisim" magnet>
              {HERO.cta}
            </InheritButton>
            <UnderlineLink href="#gun">{HERO.ctaSecondary}</UnderlineLink>
          </div>
        </div>

        {/* Right: product image */}
        <div
          style={{
            flex: "1.35 1 520px",
            minWidth: 0,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            className="hero-prod"
            style={{
              position: "relative",
              width: "min(100%, 820px)",
              marginRight: "-5%",
              overflow: "hidden",
            }}
          >
            <span className="prod-shadow" aria-hidden="true" />
            <img
              className="hero-static"
              src={heroImg}
              alt={HERO.productAlt}
              fetchPriority="high"
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="wrap"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 24,
          paddingBottom: 36,
        }}
      >
        {/* Scroll indicator */}
        <a
          href="#cozum"
          className="hero-fade"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            color: "var(--ink)",
            textDecoration: "none",
            fontSize: 14,
            padding: "10px 0",
          }}
        >
          <svg width="16" height="24" viewBox="0 0 16 24" aria-hidden="true">
            <rect
              x="1"
              y="1"
              width="14"
              height="22"
              rx="7"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            />
            <path d="M8 6v5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          {HERO.scrollLabel}
        </a>

        {/* Battery status */}
        <ul
          className="hero-fade"
          aria-label="Bataryanın şu anki durumu"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {HERO.batteryStages.map((stage, i) => (
            <li key={i} className={`stg${i === activeStage ? " on" : ""}`}>
              <span>{stage.label}</span>
              <span className="d" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
