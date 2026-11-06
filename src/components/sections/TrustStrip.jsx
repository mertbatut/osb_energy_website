import { TRUST_STRIP } from "../../constants/content.js";

/** Trust strip: 4-stat dl grid with border top/bottom. */
export default function TrustStrip() {
  return (
    <section
      aria-label="OSB ENERGY rakamlarla"
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <dl
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))",
          gap: "32px 0",
          paddingTop: 56,
          paddingBottom: 56,
        }}
      >
        {TRUST_STRIP.stats.map((stat, i) => (
          <div
            key={i}
            className="stat up"
            style={{
              padding:
                i === 0
                  ? "0 24px 0 0"
                  : i === TRUST_STRIP.stats.length - 1
                    ? "0 0 0 24px"
                    : "0 24px",
              borderLeft: i > 0 ? "1px solid var(--line)" : undefined,
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <dt
              className="mont"
              style={{
                fontWeight: 500,
                fontSize: "clamp(2.6rem, 4vw, 3.6rem)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {stat.dataCount != null ? (
                <span
                  data-count={stat.dataCount}
                  data-from={stat.dataFrom ?? 0}
                  {...(stat.isYear ? { "data-year": "" } : {})}
                >
                  {stat.value}
                </span>
              ) : (
                stat.value
              )}
              {stat.suffix && <span style={{ color: "var(--accent)" }}>{stat.suffix}</span>}
            </dt>
            <dd style={{ color: "var(--muted)" }}>{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
