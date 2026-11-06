import { SECTORS } from "../../constants/content.js";

/** Sector marquee: 2 rows of large text, opposite scroll directions. */
export default function SectorMarquee() {
  return (
    <section
      aria-label="Kullanım alanları"
      style={{ padding: "0 0 var(--section-pad)", overflow: "hidden" }}
    >
      <div className="wrap" style={{ paddingBottom: 40 }}>
        <h2 className="reveal" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="ln">
            <span className="sh-a">{SECTORS.kicker}</span>
          </span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Row 1: left direction */}
        <p className="mq" data-dir="-1" aria-label={SECTORS.row1.map((s) => s.text).join(", ")}>
          {SECTORS.row1.map((item, i) => (
            <span key={i} className={item.variant}>
              {item.text}
            </span>
          ))}
        </p>

        {/* Row 2: right direction */}
        <p
          className="mq"
          data-dir="1"
          aria-label={SECTORS.row2.map((s) => s.text).join(", ")}
          style={{ marginLeft: "-40%" }}
        >
          {SECTORS.row2.map((item, i) => (
            <span key={i} className={item.variant}>
              {item.text}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
