export const products = [
  {
    category: "STUDENT ESSENTIALS",
    title: "Classic Study Notebook",
    description: "For notes, revision and classroom use.",
    cover: "STUDY|NOTES",
    coverClass: "cover-red",
    artClass: "art-cream",
  },
  {
    category: "BUSINESS & CORPORATE",
    title: "Branded Office Notebook",
    description: "Professional notebooks with your logo.",
    cover: "YOUR|BRAND",
    coverClass: "cover-navy",
    artClass: "art-blue",
  },
  {
    category: "GIFTING",
    title: "Personalised Gift Journal",
    description: "A thoughtful notebook for special moments.",
    cover: "A LITTLE|GIFT",
    coverClass: "cover-gold",
    artClass: "art-pink",
  },
  {
    category: "EVERYDAY WRITING",
    title: "Minimal Daily Journal",
    description: "Clean design for plans and ideas.",
    cover: "DAILY|JOURNAL",
    coverClass: "cover-paper",
    artClass: "art-green",
  },
];
export const navItems = [
  ["Home", "/"],
  ["Products", "/products"],
  ["Customize Book", "/customize-book"],
  ["About Us", "/about"],
  ["Contact", "/contact"],
];
export const benefits = [
  ["✦", "Custom notebook covers"],
  ["▤", "Multiple sizes & bindings"],
  ["◎", "Branding for businesses"],
  ["↗", "Production-ready workflow"],
];
export const features = [
  ["01", "Choose a size", "A4 · A5 · A6 · Pocket"],
  ["02", "Design the cover", "Text · Colour · Logo"],
  ["03", "Set page details", "Ruled · Plain · Grid"],
  ["04", "Save or enquire", "Keep your design"],
];

/**
 * Clients shown in the home page "Our Clients" carousel.
 *
 * These are PLACEHOLDERS. To use a real client, replace the entry with its
 * name and (optionally) a logo file placed in /public/clients, e.g.
 *   { name: "Acme Stationers", logo: "/clients/acme.png" }
 * Without a logo, a monogram badge is shown instead.
 */
export const clients: { name: string; logo?: string }[] = [
  { name: "Client 1" },
  { name: "Client 2" },
  { name: "Client 3" },
  { name: "Client 4" },
  { name: "Client 5" },
  { name: "Client 6" },
  { name: "Client 7" },
  { name: "Client 8" },
];
