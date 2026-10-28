import { STORYBOARD } from "../../constants/content.js";

/** 4-frame preview cards on dark background. */
export default function StoryboardStrip() {
  return (
    <section id="storyboard" className="bg-dark-hero py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div data-animate="stagger-parent" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORYBOARD.frames.map((frame) => (
            <div
              key={frame.id}
              data-animate="stagger-child"
              className="group relative overflow-hidden rounded-2xl bg-dark-card transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={frame.image}
                  alt={frame.title}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/30 to-transparent" />
              </div>
              <div className="absolute right-0 bottom-0 left-0 p-5">
                <span className="font-display text-xs font-medium text-brand-primary-light">
                  {frame.id}
                </span>
                <h3 className="mt-1 font-display text-lg font-medium text-white">{frame.title}</h3>
                <p className="mt-1 text-sm text-white/60">{frame.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
