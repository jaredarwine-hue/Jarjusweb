// Central content source. Business info MUST exactly match Google Business Profile.
export const BUSINESS = {
  name: "Jarjus Lawn Care LLC",
  short: "Jarjus Lawn Care",
  street: "3528 East 930 North",
  cityStateZip: "Neoga, IL 62447",
  city: "Neoga",
  region: "IL",
  zip: "62447",
  phoneDisplay: "(217) 294-2346",
  phoneHref: "tel:+12172942346",
  hours: "Mon–Sat · 7am–7pm",
};

// Real Google review link provided by the owner.
export const REVIEW_URL = "https://g.page/r/CRi-e9wy46FdEBM/review";

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1642541744624-7a2a89545a32?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800",
  mowing: "https://images.unsplash.com/photo-1780419748459-075ce111534a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  stripes: "https://images.unsplash.com/photo-1628340981113-fe1949fe5cc0?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  field: "https://images.unsplash.com/photo-1752608699480-5c05bacb8aa9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1400",
};

// Mowing tiers with "Starting at" pricing.
export const TIERS = [
  {
    id: "quarter-acre",
    index: "01",
    label: "Up to 1/4 acre",
    range: "$41 – $61",
    testId: "service-card-quarter-acre",
    blurb: "Compact town lots and starter yards. Crisp lines, clean edges, hauled clippings.",
  },
  {
    id: "half-acre",
    index: "02",
    label: "1/4 – 1/2 acre",
    range: "$49 – $69",
    testId: "service-card-half-acre",
    blurb: "The classic Central Illinois homestead yard, front to back with trimmed borders.",
  },
  {
    id: "one-acre",
    index: "03",
    label: "1/2 – 1 acre",
    range: "$59 – $114",
    testId: "service-card-one-acre",
    blurb: "Larger rural properties and acreage. Ride-mow coverage with detailed hand trimming.",
  },
];

export const EXTRAS = [
  "Precision edging & string trimming",
  "Grass clipping cleanup & haul-off",
  "Seasonal yard tidy-ups",
  "Recurring weekly & bi-weekly plans",
];

export const CHAPTERS = [
  {
    n: "01",
    title: "Locally owned, Neoga rooted",
    body: "Jarjus Lawn Care LLC is a family operation working out of Neoga. You deal with the people who actually cut your grass — not a call center three states away.",
  },
  {
    n: "02",
    title: "Clean-cut, straight-line guarantee",
    body: "Level decks, sharp blades, and edged borders every visit. We leave a lawn that looks intentional, striped, and finished — never rushed.",
  },
  {
    n: "03",
    title: "Reliable through rural weather",
    body: "Rain, heat, or a long county drive, we show up on schedule. Dependable service is the whole promise of a small-town lawn crew.",
  },
];

export const TOWNS = [
  { name: "Neoga", testId: "service-area-town-neoga" },
  { name: "Effingham", testId: "service-area-town-effingham" },
  { name: "Mattoon", testId: "service-area-town-mattoon" },
  { name: "Charleston", testId: "service-area-town-charleston" },
  { name: "Toledo", testId: "service-area-town-toledo" },
  { name: "Shumway", testId: "service-area-town-shumway" },
  { name: "Sigel", testId: "service-area-town-sigel" },
  { name: "Montrose", testId: "service-area-town-montrose" },
];

export const LOT_OPTIONS = [
  "Up to 1/4 acre",
  "1/4 – 1/2 acre",
  "1/2 – 1 acre",
  "Over 1 acre",
  "Not sure",
];
