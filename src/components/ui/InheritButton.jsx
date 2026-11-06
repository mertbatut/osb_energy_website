/**
 * Transparent border button with blur hover + text slide + arrow.
 * Renders <a> if `href` is provided, <button> otherwise.
 * @param {{ href?: string, light?: boolean, magnet?: boolean, className?: string, type?: string, children: React.ReactNode, onClick?: Function }} props
 */
export default function InheritButton({
  href,
  light,
  magnet,
  className = "",
  type = "button",
  children,
  onClick,
}) {
  const cls = `btn${light ? " light" : ""}${magnet ? " magnet" : ""} ${className}`.trim();

  const inner = (
    <>
      <span className="bt">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span className="arr" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 18 18">
          <path d="M2 9h13M10 4l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
