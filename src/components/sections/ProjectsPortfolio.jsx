import { Leaf } from "lucide-react";
import { PROJECTS } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";
import ProjectCard from "../ui/ProjectCard.jsx";

/** Reference projects — 2-column editorial layout. */
export default function ProjectsPortfolio() {
  return (
    <section id="projeler" className="bg-dark-hero py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left column — header + sustainability */}
          <div className="lg:col-span-2">
            <SectionLabel label={PROJECTS.sectionLabel} icon="FolderKanban" theme="dark" />
            <h2 data-animate="headline" className="text-display-lg mt-4 text-white">
              {PROJECTS.headline}
            </h2>

            {/* Sustainability card */}
            <div
              data-animate="scale"
              className="mt-10 rounded-2xl border border-white/10 bg-dark-card p-8"
            >
              <div className="inline-flex items-center gap-2 text-brand-primary-light">
                <Leaf className="h-5 w-5" />
                <span className="text-label">{PROJECTS.sustainability.title}</span>
              </div>
              <p className="mt-4 text-body text-white/70">{PROJECTS.sustainability.description}</p>
              <div className="mt-8 flex gap-8">
                {PROJECTS.sustainability.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="font-display text-3xl font-semibold text-brand-primary-light">
                      {stat.value}
                    </span>
                    <p className="mt-1 text-sm text-white/50">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — project cards */}
          <div className="overflow-hidden lg:col-span-3">
            <div data-animate="stagger-parent" className="grid gap-6 sm:grid-cols-2">
              {PROJECTS.items.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
