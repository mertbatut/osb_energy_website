const STATUS_COLORS = Object.freeze({
  Tamamlandı: "bg-green-500/20 text-green-400",
  "Devam Ediyor": "bg-amber-500/20 text-amber-400",
  Planlama: "bg-blue-500/20 text-blue-400",
});

const STATUS_FALLBACK = "bg-white/10 text-white";

/**
 * Project reference card with status badge.
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.capacity
 * @param {string} props.type
 * @param {string} props.status
 * @param {string} props.image
 */
export default function ProjectCard({ title, capacity, type, status, image }) {
  return (
    <div data-animate="stagger-child" className="group overflow-hidden rounded-2xl bg-dark-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
        <span
          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[status] || STATUS_FALLBACK}`}
        >
          {status}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-medium text-white">{title}</h3>
        <p className="mt-1 text-sm text-text-soft">{type}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-lg bg-brand-primary/20 px-2.5 py-1 text-xs font-medium text-brand-primary-light">
            {capacity}
          </span>
        </div>
      </div>
    </div>
  );
}
