import { createElement } from "react";
import ICON_MAP from "./IconMap.jsx";

/**
 * Sector grid card with photography background.
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.icon - Lucide icon name from ICON_MAP
 * @param {string} props.image - Image URL
 */
export default function SectorCard({ title, icon, image }) {
  return (
    <div
      data-animate="stagger-child"
      className="group relative overflow-hidden rounded-2xl bg-dark-card aspect-[4/3]"
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-hero/90 via-dark-hero/40 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-5">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
          {createElement(ICON_MAP[icon] || ICON_MAP.Building2, {
            className: "h-5 w-5 text-brand-primary-light",
          })}
        </div>
        <h3 className="font-display text-lg font-medium text-white">{title}</h3>
      </div>
    </div>
  );
}
