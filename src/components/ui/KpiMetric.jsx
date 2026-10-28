/**
 * Large number + separator + label for KPI display.
 * @param {Object} props
 * @param {string} props.value
 * @param {string} props.label
 * @param {string} [props.suffix]
 * @param {string} [props.prefix]
 */
export default function KpiMetric({ value, label, suffix = "", prefix = "" }) {
  return (
    <div data-animate="stagger-child" className="flex flex-col items-center text-center">
      <span className="text-code-metric text-text-main">
        {prefix}
        {value}
        {suffix}
      </span>
      <div className="mt-2 h-px w-12 bg-border-subtle" />
      <span className="mt-2 text-label text-text-muted">{label}</span>
    </div>
  );
}
