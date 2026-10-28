import { ArrowRight } from "lucide-react";

/**
 * Editorial CTA button with multiple variants.
 * @param {Object} props
 * @param {string} props.children - Button label
 * @param {"ghost"|"text"|"neutral"|"dark"} [props.variant="ghost"]
 * @param {string} [props.href]
 * @param {Function} [props.onClick]
 * @param {string} [props.className]
 */
export default function AeroButton({ children, variant = "ghost", href, onClick, className = "" }) {
  const isText = variant === "text";

  const base = isText
    ? "group inline-flex items-center gap-2 font-medium transition-all duration-300 text-sm focus-visible:outline-2 focus-visible:outline-offset-2"
    : "group inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300 text-sm px-6 py-3 focus-visible:outline-2 focus-visible:outline-offset-2";

  const variants = {
    ghost:
      "border border-white/20 text-white hover:border-white/40 hover:bg-white/5 focus-visible:outline-white",
    text: "text-white hover:underline focus-visible:outline-white",
    neutral: "bg-white/10 text-white hover:bg-white/15 focus-visible:outline-white",
    dark: "bg-dark-hero text-white hover:bg-dark-accent focus-visible:outline-brand-primary",
  };

  const classes = `${base} ${variants[variant] ?? variants.ghost} ${className}`;

  const arrow = isText ? (
    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
  ) : (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10 transition-transform duration-300 group-hover:translate-x-0.5">
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  );

  const content = (
    <>
      <span>{children}</span>
      {arrow}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
