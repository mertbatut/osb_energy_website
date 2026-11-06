/**
 * Section heading with kicker (sh-a) + headline (sh-b) wrapped in .ln reveal containers.
 * @param {{ kicker?: string, headline: string | string[], light?: boolean, className?: string }} props
 */
export default function SectionHeading({ kicker, headline, light, className = "" }) {
  const headlines = Array.isArray(headline) ? headline : [headline];

  return (
    <h2 className={`reveal flex flex-col gap-2 ${className}`.trim()}>
      {kicker && (
        <span className="ln">
          <span className="sh-a" style={light ? { color: "var(--on-dark-muted)" } : undefined}>
            {kicker}
          </span>
        </span>
      )}
      {headlines.map((line, i) => (
        <span className="ln" key={i}>
          <span className="sh-b" style={light ? { color: "#FFFFFF" } : undefined}>
            {line}
          </span>
        </span>
      ))}
    </h2>
  );
}
