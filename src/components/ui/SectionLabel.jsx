import { createElement } from "react";
import ICON_MAP from "./IconMap.jsx";

/**
 * Reusable section header with icon + mono label.
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.icon] - Lucide icon name from ICON_MAP
 * @param {"light"|"dark"} [props.theme="light"]
 */
export default function SectionLabel({ label, icon = "Dot", theme = "light" }) {
  const color = theme === "dark" ? "text-brand-primary-light" : "text-brand-primary";

  return (
    <div className={`inline-flex items-center gap-2 ${color}`}>
      {createElement(ICON_MAP[icon] || ICON_MAP.Dot, { className: "h-4 w-4" })}
      <span className="text-label">{label}</span>
    </div>
  );
}
