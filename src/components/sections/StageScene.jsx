import { useState, useCallback, useEffect, useRef } from "react";
import stageNight from "../../assets/images/stage-night.jpg";
import stageSunset from "../../assets/images/stage-sunset.jpg";
import { STAGE } from "../../constants/content.js";
import SectionHeading from "../ui/SectionHeading.jsx";

const AUTO_ADVANCE_MS = 5200;

/**
 * BESS stage scene: photo layers + info card + phase tablist with auto-advance.
 * @param {{ scrollPhase?: number|null, isPinned?: boolean }} props
 */
export default function StageScene({ scrollPhase = null, isPinned = false }) {
  const [localPhase, setLocalPhase] = useState(0);
  const timerRef = useRef(null);
  const prevPinnedRef = useRef(false);

  // When pinned, scroll controls phase; otherwise local state (auto-advance or manual pick)
  const phase = isPinned && scrollPhase != null ? scrollPhase : localPhase;

  const pick = useCallback((i) => {
    setLocalPhase(i);
    clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  // Auto-advance: pauses when pinned (scroll drives phase instead)
  useEffect(() => {
    if (isPinned) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      return;
    }
    timerRef.current = setInterval(() => {
      setLocalPhase((prev) => (prev + 1) % STAGE.phases.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [isPinned]);

  // Sync local phase from scroll when pin releases, so auto-advance continues from scroll position
  useEffect(() => {
    if (prevPinnedRef.current && !isPinned && scrollPhase != null) {
      setLocalPhase(scrollPhase);
    }
    prevPinnedRef.current = isPinned;
  }, [isPinned, scrollPhase]);

  const current = STAGE.phases[phase];

  return (
    <section
      id="gun"
      style={{
        background: "var(--dark-2)",
        color: "#FFFFFF",
        padding: "var(--section-pad) 0",
      }}
    >
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "28px 80px",
          }}
        >
          <SectionHeading kicker={STAGE.kicker} headline={STAGE.headline} light />
          <p
            className="up"
            style={{ color: "var(--on-dark-muted)", maxWidth: "34rem", fontSize: 17 }}
          >
            {STAGE.lead}
          </p>
        </div>

        {/* Stage viewport */}
        <div
          className="stage up"
          style={{
            position: "relative",
            height: "clamp(440px, 50vw, 720px)",
            borderRadius: "var(--r-stage)",
            overflow: "hidden",
            background: "var(--dark-2)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Photo layers */}
          <div
            className={`stage-imgs tone${phase}`}
            role="img"
            aria-label={`Sahada OSB ENERGY batarya konteyneri, aşama: ${current.title}`}
          >
            <img className="si night" src={stageNight} alt="" />
            <img className="si sun" src={stageSunset} alt="" />
          </div>
          <div className={`stage-tint tone${phase}`} aria-hidden="true" />

          {/* GL canvas placeholder for Faz 4 */}
          <canvas
            className="stage-gl"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
              opacity: 0,
              transition: "opacity 600ms ease",
            }}
          />

          {/* Info card */}
          <div
            aria-live="polite"
            style={{
              position: "absolute",
              left: "clamp(16px, 2.5vw, 32px)",
              top: "clamp(16px, 2.5vw, 32px)",
              width: "min(340px, calc(100% - 32px))",
              padding: "20px 22px",
              borderRadius: "var(--r-stage)",
              background: "color-mix(in srgb, var(--dark-2) 62%, transparent)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: "var(--on-dark-muted)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {current.time}
            </span>
            <span style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.02em" }}>
              {current.title}
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 15,
                color: "#FFFFFF",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 12px var(--accent)",
                }}
              />
              {current.flow}
            </span>
          </div>
        </div>

        {/* Phase tablist */}
        <ol
          role="tablist"
          aria-label="Çalışma aşamaları"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
            gap: 0,
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {STAGE.phases.map((m, i) => {
            const isActive = phase === i;
            return (
              <li key={i} style={{ display: "flex" }}>
                <button
                  className={`step${isActive ? " on" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => pick(i)}
                >
                  <span className="bar" aria-hidden="true">
                    {isActive && <span className="fill" />}
                  </span>
                  <span className="st-n">{m.num}</span>
                  <span className="st-t">{m.title}</span>
                  <span className="st-d">{m.text}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
