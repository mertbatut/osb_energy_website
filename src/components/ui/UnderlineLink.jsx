/**
 * Underline shrink-on-hover link.
 * @param {{ href: string, className?: string, children: React.ReactNode }} props
 */
export default function UnderlineLink({ href, className = "", children }) {
  return (
    <a href={href} className={`ulink ${className}`.trim()}>
      {children}
    </a>
  );
}
