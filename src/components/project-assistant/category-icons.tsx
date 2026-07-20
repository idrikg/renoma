import {
  Bath,
  Briefcase,
  Building,
  Building2,
  Combine,
  DoorOpen,
  Ellipsis,
  Flame,
  Gauge,
  Hammer,
  Home,
  HousePlus,
  Layers,
  PaintRoller,
  Sun,
  Trees,
  Utensils,
  Waves,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";

/**
 * Restrained line icons for the project assistant's visual selection
 * steps. Deliberately plain, single-color line icons — no illustrations,
 * no color fills — matching the calm, editorial RENOMA direction.
 */
export const categoryIcons: Record<string, LucideIcon> = {
  "bad-sanitaer": Bath,
  kueche: Utensils,
  boden: Layers,
  "waende-decken": PaintRoller,
  "fenster-tueren": DoorOpen,
  elektrik: Zap,
  "heizung-waermepumpe": Flame,
  photovoltaik: Sun,
  "dach-fassade": Building2,
  "garten-aussenbereich": Trees,
  pool: Waves,
  smart_home: Wifi,
  "anbau-erweiterung": HousePlus,
  komplettsanierung: Hammer,
  "innen-aussenbereich": Combine,
  "energie-gebaeude": Gauge,
  sonstiges: Ellipsis,
};

export const objectTypeIcons: Record<string, LucideIcon> = {
  haus: Home,
  wohnung: Building,
  gewerbe: Briefcase,
};

/** Restrained icons for the three Step 1 main-area cards. */
export const mainAreaIcons: Record<string, LucideIcon> = {
  innen: Home,
  aussen: Trees,
  gesamt: Layers,
};
