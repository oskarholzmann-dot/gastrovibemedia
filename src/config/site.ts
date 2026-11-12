/**
 * Zentrale Inhalte der GastroVibe-Media-Landingpage.
 *
 * Texte, Bilder, Videos, Preise und Kontaktdaten werden nur hier gepflegt.
 * Englische Texte: site.en.ts (gleicher Aufbau, übernimmt Bilder und Kontaktdaten von hier).
 * Bilder liegen in /public/images; Videos (mp4) gehören nach /public/videos.
 * Externe Bild-URLs müssen zusätzlich in next.config.ts unter
 * images.remotePatterns freigegeben werden.
 *
 * Food-Fotos: eigene Produktionen (oskarholly.com). Nur das leere Restaurant
 * im Vorher/Nachher ist noch ein Unsplash-Platzhalter (https://unsplash.com/license).
 */

export type Media = {
  src: string;
  alt: string;
  /** Optionaler CSS-Filter, z. B. für den „Handyfoto“-Look. */
  filter?: string;
  /** Optionale CSS-Transformation, z. B. ein schief gehaltenes Handy. */
  transform?: string;
};

export type Reel = {
  title: string;
  category: string;
  poster: Media;
  /** Pfad zu einem Hochformat-Video (9:16), z. B. "/videos/reel-1.mp4". Leer = Platzhalter. */
  video?: string;
};

export type PackageTier = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  /** Empfohlenes Werbebudget, das der Kunde direkt an Meta/Google zahlt. */
  adBudget: string | null;
  highlighted?: boolean;
};

export const site = {
  brand: {
    name: "GastroVibe Media",
    email: "hallo@gastrovibe.media",
    phone: "+49 172 4003738",
    copyrightYear: 2026,
  },

  meta: {
    title: "GastroVibe Media — Mehr Gäste. Ausgebuchte Tische. Starker Content.",
    ogLocale: "de_DE",
    /** Zahlen- und Währungsformat, z. B. für den Umsatzrechner. */
    numberLocale: "de-DE",
  },

  /** Kleine Texte der Bedienoberfläche (Navigation, Screenreader, Hinweise). */
  ui: {
    toTop: "zum Seitenanfang",
    mainNav: "Hauptnavigation",
    mobileNav: "Mobile Navigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    switchLanguage: "Switch to English",
    footerNav: "Seitenbereiche",
    footerNavTitle: "Seite",
    rightsReserved: "Alle Rechte vorbehalten.",
    play: "abspielen",
    pause: "pausieren",
    compare: (before: string, after: string) => `${before} und ${after} vergleichen`,
    adBudgetPrefix: "+ Werbebudget",
    noAdBudget: "Kein Werbebudget nötig",
  },

  /** Social-Media-Profile für den Footer. Leere URLs werden ausgeblendet. */
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
  ],

  /** Pflichtseiten. Ziel-URLs eintragen, sobald die Seiten existieren. */
  legal: [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
  ],

  nav: [
    { id: "warum", label: "Warum wir" },
    { id: "leistungen", label: "Leistungen" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pakete", label: "Pakete" },
    { id: "anfrage", label: "Anfrage" },
  ],

  hero: {
    eyebrow: "Social Media & Performance Marketing für die Gastronomie",
    headline: ["Mehr Gäste.", "Ausgebuchte Tische.", "Starker Content."],
    subheadline:
      "Die All-in-One Social Media & Performance Marketing Agentur für die Gastronomie, Hotellerie & Event-Locations.",
    primaryCta: "Angebot anfragen",
    secondaryCta: "Unsere Arbeit sehen",
    /** Hintergrund-Loop (mp4, ohne Ton). Leer = das Bild wird mit sanftem Zoom gezeigt. */
    video: "",
    image: {
      src: "/images/hero-bowls-hands.jpg",
      alt: "Viele Hände halten bunte Bowls über einem Tisch zusammen, von oben fotografiert",
    } satisfies Media,
    stats: [
      { value: "Reels", label: "die Hunger machen" },
      { value: "5★", label: "Google-Bewertungen aufbauen" },
      { value: "1 Team", label: "für Content, Ads & Website" },
    ],
  },

  problem: {
    eyebrow: "Warum Gastro-Marketing?",
    title: "Gutes Essen allein füllt keine Tische mehr.",
    intro:
      "Gäste entscheiden auf Instagram, TikTok und Google, wo sie heute Abend essen. Wer dort nicht überzeugt, bleibt leer – egal wie gut die Küche ist.",
    before: {
      label: "Ohne Strategie",
      image: {
        src: "/images/empty-restaurant.jpg",
        alt: "Ein leeres Restaurant mit unbesetzten Tischen",
        filter: "grayscale(0.85) brightness(0.8)",
      } satisfies Media,
      points: [
        "Leere Tische unter der Woche",
        "Dunkle, unscharfe Handyfotos auf Instagram",
        "Unregelmäßige Posts ohne Plan",
        "Kaum oder schlechte Google-Bewertungen",
      ],
    },
    after: {
      label: "Mit GastroVibe Media",
      image: {
        src: "/images/guest-dinner.jpg",
        alt: "Ein lächelnder Gast genießt Austern bei Kerzenlicht im Restaurant",
      } satisfies Media,
      points: [
        "Professioneller Content, der Appetit macht",
        "Automatisierte Tischreservierungen direkt aus Social & Google",
        "Messbares Gäste-Wachstum mit klaren Zahlen",
        "Aktiver Aufbau von 5-Sterne-Bewertungen",
      ],
    },
  },

  services: {
    eyebrow: "Kernleistungen",
    title: "Alles, was dein Betrieb für mehr Gäste braucht",
    intro: "Vier Bausteine, ein Team. Einzeln buchbar oder als Komplettpaket.",
    items: [
      {
        icon: "camera",
        title: "Visual & Social Content",
        points: [
          "Social Media Reels (Short-Form Video)",
          "Imagefilme & Hospitality-Videos",
          "Rezeptvideos & Bar-Specials",
          "Mood-Bilder & Lifestyle-Shots",
          "Professionelle Food- & Speisekarten-Fotografie",
        ],
      },
      {
        icon: "messages",
        title: "Social Media & Community Management",
        points: [
          "Redaktionsplanung & Feedposts",
          "Aktives Community Management (Kommentare, DMs & Interaktion)",
          "Gewinnspiele & lokale Aktionen",
        ],
      },
      {
        icon: "trending",
        title: "Performance Marketing & Local SEO",
        points: [
          "Zielgerichtete Instagram & Facebook Ads",
          "Google Ads (Local Search)",
          "Google Review Boost (aktiver Aufbau von 5-Sterne-Bewertungen)",
        ],
      },
      {
        icon: "monitor",
        title: "Websites & Digital Tools",
        points: [
          "Moderne Restaurant-Websites",
          "Nahtlose Integration von Reservierungstools (z. B. OpenTable, SevenRooms, Resmio)",
          "Digitale Speisekarten & QR-Code-Lösungen",
        ],
      },
    ],
  },

  portfolio: {
    eyebrow: "Portfolio",
    title: "Content, der Hunger macht",
    intro: "Reels für Instagram & TikTok, Food-Fotografie und Mood-Shots – so sieht dein Betrieb mit uns aus.",
    reelsTitle: "Reels & TikToks",
    reels: [
      {
        title: "Opening Night",
        category: "Event",
        poster: { src: "/images/reel-opening.jpg", alt: "Eine Crêpe wird auf der heißen Platte mit Schoko-Aufstrich bestrichen" },
        video: "/videos/reel-opening.mp4",
      },
      {
        title: "Pizza Sunday",
        category: "Food",
        poster: { src: "/images/reel-pizza.jpg", alt: "Frisch gebackene Pizza wird bei einem Event mit Käse bestreut" },
        video: "/videos/reel-pizza.mp4",
      },
      {
        title: "Pasta Carbonara",
        category: "Küche",
        poster: { src: "/images/reel-carbonara.jpg", alt: "Frische Tagliatelle Carbonara werden mit der Zange aus der Pfanne gehoben" },
        video: "/videos/reel-carbonara.mp4",
      },
      {
        title: "Sweet Jar",
        category: "Dessert",
        poster: { src: "/images/reel-dessert.jpg", alt: "Ein Dessert im Glas mit Kirschen und Streuseln" },
        video: "/videos/reel-dessert.mp4",
      },
    ] satisfies Reel[],
    comparison: {
      title: "Handyfoto vs. Food-Shooting",
      text: "Ziehe den Regler: Dasselbe Gericht, einmal schnell mit dem Handy fotografiert, einmal professionell ausgeleuchtet.",
      beforeLabel: "Handyfoto",
      afterLabel: "Food-Shooting",
      /**
       * Platzhalter: Das „Handyfoto“ ist eine entsättigte, leicht verpixelte Kopie des Profi-Fotos.
       * Für echte Vergleiche ein eigenes Handyfoto desselben Gerichts eintragen
       * und filter/transform entfernen.
       */
      before: {
        src: "/images/pizza-handyfoto.jpg",
        alt: "Eine Pizza, flau und gelbstichig mit dem Handy fotografiert",
        filter: "brightness(0.9) sepia(0.15)",
        transform: "scale(1.18) rotate(-3deg) translate(3%, 4%)",
      } satisfies Media,
      after: {
        src: "/images/pizza.jpg",
        alt: "Dieselbe Pizza, professionell ausgeleuchtet und fotografiert",
      } satisfies Media,
    },
    gridTitle: "Food-, Mood- & Location-Fotografie",
    grid: [
      { src: "/images/grid-fish.jpg", alt: "Fischfilet auf Gemüsereis, angerichtet auf einem Holztisch" },
      { src: "/images/grid-dish.jpg", alt: "Ein cremiges Gericht mit Granatapfel und Nüssen" },
      { src: "/images/grid-festival.jpg", alt: "Zwei Hände stoßen mit Salat-Bowls an, im Hintergrund ein sommerliches Kornfeld" },
      { src: "/images/grid-table.jpg", alt: "Ein reich gedeckter Frühstückstisch mit Bowls, Toasts und Cappuccino von oben" },
      { src: "/images/grid-motion.jpg", alt: "Ein Gericht mit Pilzen in einer Dreh-Aufnahme mit warmen Lichtspuren" },
      { src: "/images/grid-sundaes.jpg", alt: "Eisbecher mit Sahne und Toppings auf einem Holztisch" },
    ] satisfies Media[],
  },

  packages: {
    eyebrow: "Pakete",
    title: "Transparente Pakete. Keine versteckten Kosten.",
    intro: "Monatlich kündbar nach der Startphase. Alle Preise zzgl. MwSt.",
    adBudgetSwitch: "Empfohlenes Werbebudget anzeigen",
    adBudgetNote:
      "Das Werbebudget für Meta- und Google-Ads ist nicht im Paketpreis enthalten. Du zahlst es direkt an die Plattformen – volle Transparenz, keine Aufschläge.",
    highlightedLabel: "Beliebteste Wahl",
    cta: "Paket anfragen",
    /** PLATZHALTER-PREISE: vor dem Livegang durch die echten Preise ersetzen. */
    tiers: [
      {
        id: "basic-social",
        name: "Basic Social",
        price: "ab 890 €",
        period: "pro Monat",
        description: "Für Betriebe, die regelmäßig und professionell auf Social Media sichtbar sein wollen.",
        features: ["1 Content-Shooting pro Monat", "8 Feedposts & 4 Reels", "Redaktionsplanung", "Monatliches Reporting"],
        adBudget: null,
      },
      {
        id: "growth-media",
        name: "Growth & Media",
        price: "ab 1.690 €",
        period: "pro Monat",
        description: "Für Restaurants, die gezielt neue Gäste gewinnen und Tische füllen wollen.",
        features: [
          "2 Content-Shootings pro Monat",
          "12 Feedposts & 8 Reels",
          "Community Management",
          "Instagram- & Facebook-Ads",
          "Google Review Boost",
        ],
        adBudget: "ab 300 € / Monat",
        highlighted: true,
      },
      {
        id: "full-performance",
        name: "Full Performance",
        price: "ab 2.990 €",
        period: "pro Monat",
        description: "Für Betriebe und Gruppen, die alle Kanäle aus einer Hand wollen.",
        features: [
          "Alles aus Growth & Media",
          "Imagefilm & Rezeptvideos",
          "Google Ads (Local Search)",
          "Restaurant-Website inkl. Reservierungstool",
          "Digitale Speisekarte & QR-Codes",
        ],
        adBudget: "ab 800 € / Monat",
      },
    ] satisfies PackageTier[],
  },

  calculator: {
    title: "Was bringen dir mehr Gäste?",
    text: "Eine schnelle Beispielrechnung für deinen Betrieb.",
    disclaimer: "Beispielrechnung, keine Umsatzgarantie. Annahme: eine Belegung pro Platz und Öffnungstag.",
    seats: { label: "Sitzplätze", min: 20, max: 300, step: 5, default: 60 },
    averageSpend: { label: "Ø Umsatz pro Gast", min: 10, max: 150, step: 5, default: 35 },
    openDays: { label: "Öffnungstage pro Monat", min: 8, max: 31, step: 1, default: 26 },
    uplift: { label: "Zusätzliche Auslastung", min: 5, max: 30, step: 1, default: 10 },
    days: "Tage",
    resultLabel: "Möglicher Mehrumsatz pro Monat",
    extraGuests: "zusätzliche Gäste",
  },

  contact: {
    eyebrow: "Anfrage",
    title: "Lass uns deine Tische füllen",
    intro: "Erzähl uns kurz von deinem Betrieb. Wir melden uns innerhalb von 24 Stunden mit einem Vorschlag für ein kostenloses Erstgespräch.",
    goals: ["Tische ausbuchen", "Mehr Social Media Präsenz", "Neue Speisekarte bewerben", "Bessere Google-Bewertungen"],
    fields: {
      business: "Name des Betriebs / Restaurant",
      goal: "Was ist dein aktuelles Hauptziel?",
      package: "Wunsch-Budget / Paket",
      email: "E-Mail",
      phone: "Telefon",
    },
    errors: {
      business: "Bitte gib den Namen deines Betriebs an.",
      goal: "Bitte wähle dein Hauptziel.",
      email: "Bitte gib deine E-Mail-Adresse an.",
      emailInvalid: "Bitte gib eine gültige E-Mail-Adresse an.",
      phone: "Bitte gib eine Telefonnummer an.",
      phoneInvalid: "Bitte gib eine gültige Telefonnummer an.",
    },
    packageUndecided: "Noch unklar – berät mich",
    submit: "Kostenloses Erstgespräch vereinbaren",
    sending: "Wird gesendet …",
    failed: "Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns an",
    sendAnother: "Weitere Anfrage senden",
    privacy: "Wir nutzen deine Angaben nur, um dich zu deiner Anfrage zu kontaktieren.",
    success: {
      title: "Danke! Deine Anfrage ist da.",
      text: "Wir melden uns innerhalb von 24 Stunden bei dir, um ein kostenloses Erstgespräch zu vereinbaren.",
    },
  },

  /** Unterseite „Über uns“ (/ueber-uns bzw. /en/about). */
  about: {
    navLabel: "Über uns",
    metaTitle: "Über uns — GastroVibe Media",
    metaDescription: "Vuong Vo und Oskar Holzmann: zwei gleichberechtigte Gründer, Fotografen und das Team hinter GastroVibe Media.",
    eyebrow: "Über uns",
    title: "Zwei Gründer. Ein Team. Content, der Gäste bringt.",
    intro:
      "Hinter GastroVibe Media stehen Vuong Vo und Oskar Holzmann – zwei Fotografen, die als gleichberechtigte Partner eine Agentur aufbauen, in der Kreativität und Zahlen zusammengehören.",
    photo: {
      src: "/images/team-gruender.jpg",
      alt: "Die Gründer Oskar Holzmann und Vuong Vo sitzen Arm in Arm nebeneinander und lächeln in die Kamera",
    } satisfies Media,
    storyTitle: "Warum es uns gibt",
    story: [
      "Wir kommen beide von der Fotografie und arbeiten mit Restaurants, Bars und Event-Locations. Was wir dabei immer wieder sehen: Gutes Essen geht online unter, wenn der Content nicht stimmt – und guter Content verpufft, wenn niemand misst, was er bringt.",
      "Deshalb haben wir unsere Stärken zusammengelegt. Oskar sorgt dafür, dass dein Laden auf Instagram, TikTok und Google so gut aussieht, wie er schmeckt. Vuong sorgt dafür, dass daraus messbar mehr Anfragen, Reservierungen und Gäste werden.",
      "Wir sind gleichberechtigte Partner und treffen wichtige Entscheidungen gemeinsam. Für dich heißt das: ein fester Ansprechpartner pro Projekt, klare Preise und Absprachen – und zwei Gründer, die selbst hinter der Kamera stehen.",
    ],
    foundersTitle: "Die Gründer",
    focusLabel: "Schwerpunkte",
    founders: [
      {
        name: "Vuong Vo",
        role: "Co-Founder · Fotografie & Performance",
        text: "Vuong steht in erster Linie als Fotograf hinter der Kamera. Darüber hinaus ist er dein erster Ansprechpartner: Er führt das Erstgespräch, findet heraus, was deinen Laden wirklich weiterbringt, und stellt das passende Paket zusammen. Nach dem Start behält er Kampagnen, Reichweite und Anfragen im Blick und macht sichtbar, was dein Marketing tatsächlich bringt.",
        focus: ["Fotografie", "Kundengewinnung & Beratung", "Performance & Kampagnen", "Reporting & Messbarkeit"],
      },
      {
        name: "Oskar Holzmann",
        role: "Co-Founder · Creative Director",
        text: "Oskar ist der kreative Kopf hinter unserem Content. Er fotografiert, filmt und schneidet selbst, entwickelt Konzepte, Shotlists, Marketingpläne und Strategien und hält die Bildsprache über alle Kanäle stimmig. Er verantwortet das Fulfillment: Jedes Projekt kommt pünktlich und in der vereinbarten Qualität bei dir an.",
        focus: ["Foto, Video & Schnitt", "Konzept & Content-Strategie", "Marketingpläne", "Fulfillment & Qualitätskontrolle"],
      },
    ],
    valuesTitle: "So arbeiten wir",
    values: [
      {
        title: "Kreativ und messbar",
        text: "Jedes Bild hat ein Ziel. Wir planen Content so, dass er gut aussieht und sich in Reservierungen und Gästen bemerkbar macht.",
      },
      {
        title: "Klare Absprachen",
        text: "Ein fester Ansprechpartner, transparente Preise und ein klar definierter Leistungsumfang – ohne versteckte Kosten.",
      },
      {
        title: "Direkt mit den Gründern",
        text: "Du arbeitest direkt mit den Menschen, die deinen Content machen. Für größere Produktionen holen wir erprobte Freelancer dazu.",
      },
    ],
    family: "GastroVibe Media ist Teil von Vibe Media – zusammen mit WeddingVibe für Hochzeiten und ResortVibe für Hotels & Resorts.",
    cta: {
      title: "Lass uns kennenlernen",
      text: "Erzähl uns von deinem Laden – wir melden uns innerhalb von 24 Stunden.",
      button: "Kostenloses Erstgespräch",
    },
  },

  footer: {
    tagline: "Social Media & Performance Marketing für Gastronomie, Hotellerie & Event-Locations.",
  },
};

export type SiteContent = typeof site;

export type SectionId = (typeof site.nav)[number]["id"];
