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
  {
    slug: "innenrenovierung",
    href: "/leistungen/innenrenovierung",
    title: "Innenrenovierung",
    description:
      "Einzelne Räume oder mehrere Innenbereiche: Oberflächen, Böden und Ausbau werden aufeinander abgestimmt und persönlich begleitet.",
  },
  {
    slug: "boden-fliesen",
    href: "/leistungen/boden-fliesen",
    title: "Boden & Fliesen",
    description:
      "Material, Format und Verlegung prägen die Raumwirkung. RENOMA begleitet die Auswahl und stimmt die Umsetzung mit angrenzenden Arbeiten ab.",
  },
  {
    slug: "fassade-aussenbereich",
    href: "/leistungen/fassade-aussenbereich",
    title: "Fassade & Außenbereich",
    description:
      "Fassade, Eingang und Außenflächen werden gestalterisch und zeitlich aufeinander abgestimmt – mit klarer Koordination der nächsten Schritte.",
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
