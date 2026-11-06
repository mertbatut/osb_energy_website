import { PROCESS } from "../../constants/content.js";
import SectionHeading from "../ui/SectionHeading.jsx";

/** Process timeline: 6 steps with dot connectors and progress line. */
export default function ProcessTimeline() {
  return (
    <section id="surec" style={{ padding: "var(--section-pad) 0" }}>
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 72 }}>
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
          <SectionHeading kicker={PROCESS.kicker} headline={PROCESS.headline} />
          <p className="lead up" style={{ maxWidth: "28rem" }}>
            {PROCESS.lead}
          </p>
        </div>

        {/* Timeline */}
        <div className="proc" style={{ position: "relative" }}>
          {/* Background line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 11,
              height: 2,
              background: "var(--line)",
            }}
          />
          {/* Progress line (animated in Faz 2) */}
          <div
            className="proc-line"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 11,
              height: 2,
              background: "var(--brand)",
              transformOrigin: "left center",
            }}
          />

          <ol
            style={{
              position: "relative",
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(190px, 100%), 1fr))",
              gap: "40px 28px",
            }}
          >
            {PROCESS.steps.map((step) => (
              <li
                key={step.num}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    background: "var(--bg)",
                    border: "6px solid var(--accent)",
                  }}
                />
                <span
                  className="mont"
                  style={{ fontWeight: 500, fontSize: 15, color: "var(--brand)" }}
                >
                  {step.num}
                </span>
                <h3
                  className="mont"
                  style={{
                    fontWeight: 600,
                    fontSize: 19,
                    lineHeight: 1.25,
                    color: "var(--ink)",
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: "var(--muted)" }}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
