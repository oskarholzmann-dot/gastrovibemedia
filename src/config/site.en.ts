/**
 * Englische Inhalte der GastroVibe-Media-Landingpage.
 *
 * Gleicher Aufbau wie site.ts. Bilder, Videos, Kontaktdaten und Social-Links
 * werden aus der deutschen Fassung übernommen und nur dort gepflegt.
 */

import { site } from "./site";
import type { SiteContent } from "./site";

const de = site;

export const siteEn: SiteContent = {
  brand: de.brand,

  meta: {
    title: "GastroVibe Media — More guests. Fully booked tables. Standout content.",
    ogLocale: "en_GB",
    numberLocale: "en-GB",
  },

  ui: {
    toTop: "back to top",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "Auf Deutsch wechseln",
    footerNav: "Page sections",
    footerNavTitle: "Page",
    rightsReserved: "All rights reserved.",
    play: "play",
    pause: "pause",
    compare: (before: string, after: string) => `Compare ${before} and ${after}`,
    adBudgetPrefix: "+ ad budget",
    noAdBudget: "No ad budget needed",
  },

  socials: de.socials,

  legal: [
    { label: "Legal notice", href: de.legal[0].href },
    { label: "Privacy policy", href: de.legal[1].href },
  ],

  nav: [
    { id: "warum", label: "Why us" },
    { id: "leistungen", label: "Services" },
    { id: "portfolio", label: "Portfolio" },
    { id: "pakete", label: "Packages" },
    { id: "anfrage", label: "Contact" },
  ],

  hero: {
    eyebrow: "Social media & performance marketing for hospitality",
    headline: ["More guests.", "Fully booked tables.", "Standout content."],
    subheadline: "The all-in-one social media & performance marketing agency for restaurants, hotels & event venues.",
    primaryCta: "Request a quote",
    secondaryCta: "See our work",
    video: de.hero.video,
    image: { ...de.hero.image, alt: "Guests at a festively laid table by candlelight" },
    stats: [
      { value: "Reels", label: "that make people hungry" },
      { value: "5★", label: "Google reviews, built up" },
      { value: "1 team", label: "for content, ads & website" },
    ],
  },

  problem: {
    eyebrow: "Why hospitality marketing?",
    title: "Great food alone no longer fills tables.",
    intro:
      "Guests decide on Instagram, TikTok and Google where to eat tonight. If you don't win them over there, your tables stay empty – no matter how good the kitchen is.",
    before: {
      label: "Without a strategy",
      image: { ...de.problem.before.image, alt: "An empty restaurant with unoccupied tables" },
      points: [
        "Empty tables during the week",
        "Dark, blurry phone photos on Instagram",
        "Irregular posts without a plan",
        "Few or poor Google reviews",
      ],
    },
    after: {
      label: "With GastroVibe Media",
      image: { ...de.problem.after.image, alt: "A full restaurant with guests eating and laughing together" },
      points: [
        "Professional content that whets the appetite",
        "Automated table bookings straight from social & Google",
        "Measurable guest growth with clear numbers",
        "Actively building 5-star reviews",
      ],
    },
  },

  services: {
    eyebrow: "Core services",
    title: "Everything your venue needs for more guests",
    intro: "Four building blocks, one team. Book them individually or as a complete package.",
    items: [
      {
        icon: "camera",
        title: "Visual & social content",
        points: [
          "Social media reels (short-form video)",
          "Brand films & hospitality videos",
          "Recipe videos & bar specials",
          "Mood images & lifestyle shots",
          "Professional food & menu photography",
        ],
      },
      {
        icon: "messages",
        title: "Social media & community management",
        points: [
          "Content planning & feed posts",
          "Active community management (comments, DMs & engagement)",
          "Giveaways & local promotions",
        ],
      },
      {
        icon: "trending",
        title: "Performance marketing & local SEO",
        points: [
          "Targeted Instagram & Facebook ads",
          "Google Ads (local search)",
          "Google Review Boost (actively building 5-star reviews)",
        ],
      },
      {
        icon: "monitor",
        title: "Websites & digital tools",
        points: [
          "Modern restaurant websites",
          "Seamless integration of booking tools (e.g. OpenTable, SevenRooms, Resmio)",
          "Digital menus & QR code solutions",
        ],
      },
    ],
  },

  portfolio: {
    eyebrow: "Portfolio",
    title: "Content that makes people hungry",
    intro: "Reels for Instagram & TikTok, food photography and mood shots – this is what your venue looks like with us.",
    reelsTitle: "Reels & TikToks",
    reels: [
      { ...de.portfolio.reels[0], category: "Kitchen", poster: { ...de.portfolio.reels[0].poster, alt: "A chef plating a dish under warm light" } },
      { ...de.portfolio.reels[1], category: "Bar special", poster: { ...de.portfolio.reels[1].poster, alt: "A cocktail being poured over ice" } },
      { ...de.portfolio.reels[2], category: "Food", poster: { ...de.portfolio.reels[2].poster, alt: "A freshly baked pizza on a wooden board" } },
      { ...de.portfolio.reels[3], title: "New Menu", category: "Menu", poster: { ...de.portfolio.reels[3].poster, alt: "A plated salmon dish" } },
    ],
    comparison: {
      title: "Phone photo vs. food shoot",
      text: "Drag the slider: the same dish, once snapped quickly on a phone, once professionally lit.",
      beforeLabel: "Phone photo",
      afterLabel: "Food shoot",
      before: { ...de.portfolio.comparison.before, alt: "A burger, dull and yellowish, photographed on a phone" },
      after: { ...de.portfolio.comparison.after, alt: "The same burger, professionally lit and photographed" },
    },
    gridTitle: "Food, mood & location photography",
    grid: [
      "Steak with fries on a plate",
      "A moodily lit bar",
      "Various dishes photographed from above",
      "A restaurant terrace by the water",
      "Guests having breakfast, photographed from above",
      "A leafy restaurant with wooden tables",
    ].map((alt, index) => ({ ...de.portfolio.grid[index], alt })),
  },

  packages: {
    eyebrow: "Packages",
    title: "Transparent packages. No hidden costs.",
    intro: "Cancel monthly after the onboarding phase. All prices plus VAT.",
    adBudgetSwitch: "Show recommended ad budget",
    adBudgetNote:
      "The ad budget for Meta and Google ads is not included in the package price. You pay it directly to the platforms – full transparency, no mark-ups.",
    highlightedLabel: "Most popular",
    cta: "Request package",
    tiers: [
      {
        ...de.packages.tiers[0],
        price: "from €890",
        period: "per month",
        description: "For venues that want to be visible on social media regularly and professionally.",
        features: ["1 content shoot per month", "8 feed posts & 4 reels", "Content planning", "Monthly reporting"],
      },
      {
        ...de.packages.tiers[1],
        price: "from €1,690",
        period: "per month",
        description: "For restaurants that want to win new guests and fill tables in a targeted way.",
        features: ["2 content shoots per month", "12 feed posts & 8 reels", "Community management", "Instagram & Facebook ads", "Google Review Boost"],
        adBudget: "from €300 / month",
      },
      {
        ...de.packages.tiers[2],
        price: "from €2,990",
        period: "per month",
        description: "For venues and groups that want every channel from a single source.",
        features: [
          "Everything in Growth & Media",
          "Brand film & recipe videos",
          "Google Ads (local search)",
          "Restaurant website incl. booking tool",
          "Digital menu & QR codes",
        ],
        adBudget: "from €800 / month",
      },
    ],
  },

  calculator: {
    title: "What would more guests mean for you?",
    text: "A quick sample calculation for your venue.",
    disclaimer: "Sample calculation, no revenue guarantee. Assumes one booking per seat per opening day.",
    seats: { ...de.calculator.seats, label: "Seats" },
    averageSpend: { ...de.calculator.averageSpend, label: "Average spend per guest" },
    openDays: { ...de.calculator.openDays, label: "Opening days per month" },
    uplift: { ...de.calculator.uplift, label: "Additional occupancy" },
    days: "days",
    resultLabel: "Potential extra revenue per month",
    extraGuests: "additional guests",
  },

  contact: {
    eyebrow: "Contact",
    title: "Let's fill your tables",
    intro: "Tell us a little about your venue. We'll get back to you within 24 hours to suggest a free initial consultation.",
    goals: ["Fully booked tables", "Stronger social media presence", "Promote a new menu", "Better Google reviews"],
    fields: {
      business: "Name of your venue / restaurant",
      goal: "What is your main goal right now?",
      package: "Budget / package",
      email: "Email",
      phone: "Phone",
    },
    errors: {
      business: "Please enter the name of your venue.",
      goal: "Please choose your main goal.",
      email: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      phone: "Please enter a phone number.",
      phoneInvalid: "Please enter a valid phone number.",
    },
    packageUndecided: "Not sure yet – advise me",
    submit: "Book a free consultation",
    sending: "Sending …",
    failed: "Something went wrong. Please try again or email us at",
    sendAnother: "Send another request",
    privacy: "We only use your details to contact you about your request.",
    success: {
      title: "Thank you! We've received your request.",
      text: "We'll get back to you within 24 hours to arrange a free initial consultation.",
    },
  },

  footer: {
    tagline: "Social media & performance marketing for restaurants, hotels & event venues.",
  },
};
