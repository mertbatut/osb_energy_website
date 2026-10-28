import { SECTORS } from "../../constants/content.js";
import SectionLabel from "../ui/SectionLabel.jsx";
import SectorCard from "../ui/SectorCard.jsx";

/** 2x4 grid of sector cards. */
export default function SectorApplications() {
  return (
    <section className="bg-surface-page py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel label={SECTORS.sectionLabel} icon="Grid3X3" />
          <h2 data-animate="headline" className="text-display-lg mt-4 text-text-main">
            {SECTORS.headline}
          </h2>
        </div>

        <div
          data-animate="stagger-parent"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {SECTORS.items.map((sector) => (
            <SectorCard
              key={sector.title}
              title={sector.title}
              icon={sector.icon}
              image={sector.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
