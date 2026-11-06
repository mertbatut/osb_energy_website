import stageSunset from "../../assets/images/stage-sunset.jpg";
import racksInterior from "../../assets/images/racks-interior.jpg";
import { JOURNEY } from "../../constants/content.js";

/** Journey section: pinned scroll container with outer→inner image transition + 3 captions. */
export default function Journey() {
  const captions = JOURNEY.captions;

  return (
    <section
      id="yolculuk"
      className="journey"
      aria-label="Konteynerin içine yolculuk"
      style={{
        position: "relative",
        height: 880,
        overflow: "hidden",
        background: "#0B0C0E",
        color: "#FFFFFF",
      }}
    >
      <img
        className="j-out"
        src={stageSunset}
        alt={JOURNEY.outerAlt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: "66% 62%",
        }}
      />
      <img
        className="j-in"
        src={racksInterior}
        alt={JOURNEY.innerAlt}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0,
          transform: "scale(1.3)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(8,9,11,0.82) 0%, rgba(8,9,11,0.35) 50%, rgba(8,9,11,0.05) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="wrap"
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: 88,
        }}
      >
        {/* Caption 1 */}
        <div
          className="j-cap c1"
          style={{
            position: "absolute",
            left: "var(--gutter)",
            bottom: 88,
            maxWidth: "34rem",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <p className="sh-a" style={{ color: "rgba(255,255,255,0.75)" }}>
            {captions[0].kicker}
          </p>
          <p className="sh-b" style={{ color: "#FFFFFF" }}>
            {captions[0].headline}
          </p>
        </div>

        {/* Caption 2 */}
        <div
          className="j-cap c2"
          style={{
            position: "absolute",
            left: "var(--gutter)",
            bottom: 88,
            maxWidth: "36rem",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: 0,
          }}
        >
          <p className="sh-a" style={{ color: "rgba(255,255,255,0.75)" }}>
            {captions[1].kicker}
          </p>
          <p className="sh-b" style={{ color: "#FFFFFF" }}>
            {captions[1].headline}
          </p>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, maxWidth: "30rem" }}>
            {captions[1].body}
          </p>
        </div>

        {/* Caption 3 */}
        <div
          className="j-cap c3"
          style={{
            position: "absolute",
            left: "var(--gutter)",
            bottom: 88,
            maxWidth: "38rem",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            opacity: 0,
          }}
        >
          <p className="sh-a" style={{ color: "rgba(255,255,255,0.75)" }}>
            {captions[2].kicker}
          </p>
          <p className="sh-b" style={{ color: "#FFFFFF" }}>
            {captions[2].headline}
          </p>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, maxWidth: "30rem" }}>
            {captions[2].body}
          </p>
        </div>
      </div>

      <div
        className="j-bar"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          height: 3,
          width: "100%",
          background: "var(--accent)",
          transform: "scaleX(0)",
          transformOrigin: "left center",
        }}
      />
    </section>
  );
}
