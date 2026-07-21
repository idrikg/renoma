export type ServiceCard = {
  slug: string;
  href: string;
  title: string;
  description: string;
};

/** Hub cards for /leistungen — unique copy per service. */
export const serviceCards: ServiceCard[] = [
  {
    slug: "badmodernisierung",
    href: "/leistungen/badmodernisierung",
    title: "Badmodernisierung",
    description:
      "Von der ersten Raumidee bis zur abgestimmten Umsetzung: RENOMA begleitet Ihr Badprojekt persönlich und hält die vielen Entscheidungen übersichtlich.",
  },
  {
    slug: "komplettsanierung",
    href: "/leistungen/komplettsanierung",
    title: "Komplettsanierung",
    description:
      "Wenn mehrere Bereiche zusammengehören, braucht es eine klare Reihenfolge und einen festen Ansprechpartner – von der Einordnung bis zur koordinierten Umsetzung.",
  },
  {
    slug: "elektroarbeiten",
    href: "/leistungen/elektroarbeiten",
    title: "Elektroarbeiten",
    description:
      "Steckdosen, Beleuchtung und Anschlüsse werden mit dem Gesamtvorhaben abgestimmt und mit qualifizierten Fachbetrieben koordiniert.",
  },
  {
    slug: "fenster-tueren",
    href: "/leistungen/fenster-tueren",
    title: "Fenster & Türen",
    description:
      "Austausch und Modernisierung von Fenstern und Türen – abgestimmt auf Komfort, Gestaltung und den Charakter Ihres Zuhauses.",
  },
];

export const sharedProcessSteps = [
  {
    number: "01",
    title: "Vorhaben schildern",
    description:
      "Sie beschreiben, was Sie verändern möchten und welche Punkte Ihnen wichtig sind.",
  },
  {
    number: "02",
    title: "Anforderungen abstimmen",
    description:
      "Gemeinsam ordnen wir den Umfang ein und klären die nächsten sinnvollen Schritte.",
  },
  {
    number: "03",
    title: "Umsetzung koordinieren",
    description:
      "Leistungen, Reihenfolge und Ausführungsdetails werden passend zum Projekt abgestimmt.",
  },
  {
    number: "04",
    title: "Persönlich begleitet bleiben",
    description:
      "Während des Projekts haben Sie einen festen Ansprechpartner bei RENOMA.",
  },
] as const;
