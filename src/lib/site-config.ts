import { services } from "@/content/services";

/**
 * Fallback site constants.
 *
 * Anything the client must supply (address, phone, WhatsApp, socials, hours)
 * lives in Sanity `siteSettings`. The values here are ONLY structural
 * fallbacks so the site renders before content is loaded. Components must
 * hide a block when the Sanity value is absent rather than invent one.
 */
export const siteConfig = {
  name: "Garnet Solutions Limited",
  shortName: "Garnet",
  incorporated: 2015,
  city: "Nairobi",
  country: "Kenya",
  description:
    "Garnet Solutions Limited structures and facilitates financing through partner institutions, deploys its own capital into qualifying investments, and coordinates logistics for businesses across Kenya and East Africa.",
  /** Under 160 characters, or search results truncate it. */
  metaDescription:
    "Financing facilitated through partner institutions, proprietary investment, and logistics for SMEs, corporates and individuals across Kenya.",
  // Confirmed in the company profile.
  email: "info@garnetsolutionsltd.com",
  website: "www.garnetsolutions.co.ke",
  // Still outstanding — rendered only once supplied through Sanity.
  contact: {
    phone: null as string | null,
    whatsapp: null as string | null,
    address: null as string | null,
    hours: null as string | null,
  },
} as const;

export const navigation = {
  services: services.map(({ title, slug }) => ({ title, slug })),
  solutions: [
    { title: "SMEs", slug: "smes" },
    { title: "Corporates", slug: "corporates" },
    { title: "Individuals", slug: "individuals" },
  ],
  industries: [
    { title: "Manufacturing", slug: "manufacturing" },
    { title: "Agriculture", slug: "agriculture" },
    { title: "Retail & FMCG", slug: "retail-fmcg" },
    { title: "Construction", slug: "construction" },
    { title: "Import & Export", slug: "import-export" },
  ],
} as const;

export const FINANCING_NEEDS = [
  "working-capital",
  "business-expansion",
  "vehicle-fleet",
  "machinery-equipment",
  "invoice-discounting",
  "lpo-financing",
  "trade-finance",
  "project-finance",
  "other",
] as const;

export const FINANCING_NEED_LABELS: Record<(typeof FINANCING_NEEDS)[number], string> = {
  "working-capital": "Working capital",
  "business-expansion": "Business expansion",
  "vehicle-fleet": "Vehicle or fleet",
  "machinery-equipment": "Machinery or equipment",
  "invoice-discounting": "Invoice discounting",
  "lpo-financing": "LPO financing",
  "trade-finance": "Trade finance",
  "project-finance": "Project finance",
  other: "Something else",
};

export const AREAS_OF_INTEREST = ["financing", "investment", "logistics", "general"] as const;

/** 47 counties, used by the financing form's county select. */
export const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu", "Garissa",
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
  "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
  "Outside Kenya",
] as const;
