import { useState, useCallback } from "react";
import cabinetImg from "../../assets/images/battery-cabinet.jpg";
import { SOLUTIONS } from "../../constants/content.js";
import SectionHeading from "../ui/SectionHeading.jsx";

/** Inline SVG charts per accordion item. */
const CHARTS = {
  "peak-pricing": (
    <svg
      viewBox="0 0 460 210"
      role="img"
      aria-label="Örnek günlük elektrik fiyatı: gece ve gündüz düşük, akşam puantta en yüksek"
      style={{ flex: "1 1 320px", maxWidth: 440, height: "auto", fontFamily: "var(--font)" }}
    >
      <line x1="20" y1="170" x2="440" y2="170" style={{ stroke: "var(--line)" }} />
      <path
        d="M20,160 L80,156 L140,154 L200,158 L260,160 L320,160 L340,90 L370,22 L400,40 L420,110 L440,140 L440,170 L20,170 Z"
        style={{ fill: "var(--chip)" }}
      />
      <path
        d="M320,160 L340,90 L370,22 L400,40 L420,110 L440,140 L440,170 L320,170 Z"
        opacity="0.85"
        style={{ fill: "var(--brand)" }}
      />
      <path
        d="M20,160 L80,156 L140,154 L200,158 L260,160 L320,160 L340,90 L370,22 L400,40 L420,110 L440,140"
        fill="none"
        strokeWidth="2.5"
        strokeLinejoin="round"
        style={{ stroke: "var(--ink)" }}
      />
      <text
        x="120"
        y="140"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        style={{ fill: "var(--ink)" }}
      >
        Ucuzken depola
      </text>
      <text
        x="300"
        y="40"
        textAnchor="end"
        fontSize="14"
        fontWeight="700"
        style={{ fill: "var(--brand)" }}
      >
        Pahalıyken kullan
      </text>
      <text x="20" y="194" fontSize="13" style={{ fill: "var(--muted)" }}>
        00:00
      </text>
      <text x="230" y="194" textAnchor="middle" fontSize="13" style={{ fill: "var(--muted)" }}>
        12:00
      </text>
      <text x="440" y="194" textAnchor="end" fontSize="13" style={{ fill: "var(--muted)" }}>
        24:00
      </text>
    </svg>
  ),
  "peak-shaving": (
    <svg
      viewBox="0 0 460 210"
      role="img"
      aria-label="Depolama yokken güç talebi pik yapıyor, depolama varken daha dengeli kalıyor"
      style={{ flex: "1 1 320px", maxWidth: 440, height: "auto", fontFamily: "var(--font)" }}
    >
      <line x1="20" y1="170" x2="440" y2="170" style={{ stroke: "var(--line)" }} />
      <path
        d="M20,150 L80,120 L140,80 L190,24 L240,60 L300,120 L380,150 L440,160"
        fill="none"
        strokeWidth="2.5"
        strokeDasharray="7 6"
        style={{ stroke: "var(--ink)" }}
      />
      <path
        d="M20,150 L80,128 L140,108 L190,92 L240,104 L300,124 L380,150 L440,160"
        fill="none"
        strokeWidth="3.5"
        style={{ stroke: "var(--brand)" }}
      />
      <text x="200" y="18" fontSize="13" fontWeight="700" style={{ fill: "var(--ink)" }}>
        Depolama yok
      </text>
      <text x="250" y="96" fontSize="13" fontWeight="700" style={{ fill: "var(--brand)" }}>
        Depolama var
      </text>
      <text x="230" y="196" textAnchor="middle" fontSize="13" style={{ fill: "var(--muted)" }}>
        Gün içinde güç talebi
      </text>
    </svg>
  ),
  "backup-power": (
    <svg
      viewBox="0 0 460 210"
      role="img"
      aria-label="Şebekede kesinti oluyor, fabrikaya giden güç kesilmiyor"
      style={{ flex: "1 1 320px", maxWidth: 440, height: "auto", fontFamily: "var(--font)" }}
    >
      <text x="20" y="34" fontSize="14" fontWeight="600" style={{ fill: "var(--muted)" }}>
        Şebeke
      </text>
      <path
        d="M20,58 H190 L198,110 H246 L254,58 H440"
        fill="none"
        strokeWidth="2.5"
        style={{ stroke: "var(--ink)" }}
      />
      <rect
        x="190"
        y="44"
        width="64"
        height="134"
        opacity="0.14"
        style={{ fill: "var(--brand)" }}
      />
      <text
        x="222"
        y="196"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        style={{ fill: "var(--brand)" }}
      >
        Batarya devrede
      </text>
      <text x="20" y="140" fontSize="14" fontWeight="700" style={{ fill: "var(--brand)" }}>
        Fabrikaya giden
      </text>
      <path d="M20,158 H440" fill="none" strokeWidth="4" style={{ stroke: "var(--brand)" }} />
    </svg>
  ),
  "solar-surplus": (
    <svg
      viewBox="0 0 460 210"
      role="img"
      aria-label="Öğlen güneş üretimi tesis yükünü aşıyor, fazlası depolanıyor"
      style={{ flex: "1 1 320px", maxWidth: 440, height: "auto", fontFamily: "var(--font)" }}
    >
      <defs>
        <clipPath id="osb-c3">
          <rect x="0" y="0" width="460" height="110" />
        </clipPath>
      </defs>
      <path
        d="M20,170 C140,170 160,30 230,30 C300,30 320,170 440,170 Z"
        opacity="0.85"
        clipPath="url(#osb-c3)"
        style={{ fill: "var(--brand)" }}
      />
      <path
        d="M20,170 C140,170 160,30 230,30 C300,30 320,170 440,170"
        fill="none"
        strokeWidth="2.5"
        style={{ stroke: "var(--brand)" }}
      />
      <line
        x1="20"
        y1="110"
        x2="440"
        y2="110"
        strokeWidth="2"
        strokeDasharray="7 6"
        style={{ stroke: "var(--ink)" }}
      />
      <text
        x="440"
        y="132"
        textAnchor="end"
        fontSize="13"
        fontWeight="700"
        style={{ fill: "var(--ink)" }}
      >
        Tesis yükü
      </text>
      <text x="230" y="196" textAnchor="middle" fontSize="13" style={{ fill: "var(--muted)" }}>
        Fazla üretim depoya
      </text>
    </svg>
  ),
};

/** Accordion icon per item. */
const ICONS = {
  "chart-bar": (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path
        d="M3 20h18M6 16v-4M11 16V8M16 16V4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
  "chart-spike": (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path
        d="M3 18l5-7 4 4 4-9 5 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),
  lightning: (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path
        d="M13 2L4 14h7l-1 8 9-12h-7z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sun: (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ),
};

/** Solutions section: accordion + SVG charts + sidebar image. Single-open. */
export default function Solutions() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = useCallback((i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }, []);

  return (
    <section id="cozum" style={{ padding: "var(--section-pad) 0" }}>
      <div
        className="wrap"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "56px 96px",
          alignItems: "flex-start",
        }}
      >
        {/* Left sidebar */}
        <div
          style={{
            flex: "1 1 360px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <SectionHeading kicker={SOLUTIONS.kicker} headline={SOLUTIONS.headline} />
          <p className="lead up">{SOLUTIONS.lead}</p>
          <div
            className="frame up"
            style={{
              aspectRatio: "4 / 3",
              maxWidth: 440,
              borderRadius: "var(--r-card)",
              background: "var(--bg-alt)",
            }}
          >
            <img
              data-parallax="6"
              src={cabinetImg}
              alt={SOLUTIONS.imageAlt}
              style={{ objectFit: "contain", padding: 24 }}
            />
          </div>
        </div>

        {/* Accordion */}
        <div
          style={{
            flex: "1.4 1 560px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {SOLUTIONS.items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  className={`q${isOpen ? " on" : ""}`}
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="ic" aria-hidden="true">
                    {ICONS[item.iconKey]}
                  </span>
                  <span className="qt">{item.title}</span>
                  <span className="pm" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M10 2v16M2 10h16" strokeWidth="2" style={{ stroke: "var(--ink)" }} />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="ans">
                    <p style={{ flex: "1 1 240px", color: "var(--muted)", maxWidth: "34ch" }}>
                      {item.text}
                    </p>
                    {CHARTS[item.chartKey]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
