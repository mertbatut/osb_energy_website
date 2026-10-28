import {
  Activity,
  ArrowRight,
  ArrowRightLeft,
  Battery,
  Boxes,
  Building2,
  Cable,
  Car,
  Circle,
  Clock,
  Combine,
  Cpu,
  Dot,
  Factory,
  FlaskConical,
  FolderKanban,
  GitBranch,
  Grid3X3,
  Layers,
  Mountain,
  Shirt,
  ShieldCheck,
  Timer,
  TrendingUp,
  Truck,
  UtensilsCrossed,
  Wheat,
  Zap,
} from "lucide-react";

/**
 * Explicit icon allowlist map for dynamic icon lookup.
 * Only icons listed here can be resolved by name string.
 * @type {Readonly<Record<string, import("lucide-react").LucideIcon>>}
 */
const ICON_MAP = Object.freeze({
  Activity,
  ArrowRight,
  ArrowRightLeft,
  Battery,
  Boxes,
  Building2,
  Cable,
  Car,
  Circle,
  Clock,
  Combine,
  Cpu,
  Dot,
  Factory,
  FlaskConical,
  FolderKanban,
  GitBranch,
  Grid3X3,
  Layers,
  Mountain,
  Shirt,
  ShieldCheck,
  Timer,
  TrendingUp,
  Truck,
  UtensilsCrossed,
  Wheat,
  Zap,
});

/**
 * Resolves icon component by name string from allowlist.
 * @param {string} name - Icon name
 * @param {import("lucide-react").LucideIcon} [fallback] - Fallback icon
 * @returns {import("lucide-react").LucideIcon}
 */
export function resolveIcon(name, fallback = Circle) {
  return ICON_MAP[name] || fallback;
}

export default ICON_MAP;
