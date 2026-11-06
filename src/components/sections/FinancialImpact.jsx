import { FINANCIAL } from "../../constants/content.js";
import SectionHeading from "../ui/SectionHeading.jsx";
import InheritButton from "../ui/InheritButton.jsx";

/** Financial impact: 2x2 metric grid + fin-line + disclaimer + CTA. */
export default function FinancialImpact() {
  return (
    <section id="finans" style={{ background: "var(--bg-alt)", padding: "var(--section-pad) 0" }}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 64 }}>
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
          <SectionHeading kicker={FINANCIAL.kicker} headline={FINANCIAL.headline} />
          <p className="lead up" style={{ maxWidth: "30rem" }}>
            {FINANCIAL.lead}
          </p>
        </div>

        {/* Metrics grid */}
        <dl
          className="fin"
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))",
          }}
        >
          <span
            className="fin-line"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 2,
              background: "var(--ink)",
              transformOrigin: "left center",
            }}
          />
          {FINANCIAL.metrics.map((m, i) => {
            const isRight = i % 2 === 1;
            return (
              <div
                key={i}
                className="up"
                style={{
                  padding: isRight ? "36px 32px" : "36px 32px 36px 0",
                  borderBottom: "1px solid var(--line)",
                  borderLeft: isRight ? "1px solid var(--line)" : undefined,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <dt style={{ color: "var(--muted)" }}>{m.label}</dt>
                <dd
                  className="mont"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(2.2rem, 3.6vw, 3.4rem)",
                    lineHeight: 1,
                    color: m.highlighted ? "var(--brand)" : "var(--ink)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {m.dataCount != null ? (
                    <span data-count={m.dataCount} data-from="0">
                      {m.value}
                    </span>
                  ) : (
                    m.value
                  )}{" "}
                  <span style={{ fontSize: "0.45em", fontWeight: 700 }}>{m.unit}</span>
                </dd>
              </div>
            );
          })}
        </dl>

        {/* Disclaimer + CTA */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
          }}
        >
          <p style={{ fontSize: 14, color: "var(--muted)", maxWidth: "60ch" }}>
            {FINANCIAL.disclaimer}
          </p>
          <InheritButton href="#iletisim" magnet>
            {FINANCIAL.cta}
          </InheritButton>
        </div>
      </div>
    </section>
  );
}
