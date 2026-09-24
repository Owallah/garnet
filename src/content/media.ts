/**
 * The image manifest.
 *
 * Every fixed image position on the site is declared here once: its intended
 * aspect ratio, the art direction brief, the alt text, and the credit line the
 * licence requires. A slot renders its photograph the moment `src` points at a
 * real file in /public/images - until then it renders the labelled placeholder
 * carrying the brief.
 *
 * Two rules for whoever fills these:
 *   1. Alt text describes what is in the frame, for someone who cannot see it.
 *      It is written here rather than left to the photo researcher, because
 *      alt text written at upload time is always worse.
 *   2. `credit` is not optional where the licence requires attribution.
 *      Unsplash and Pexels do not legally require it; AfricanStockPhoto,
 *      Getty and iStock have their own terms. Check before publishing.
 *
 * Content-driven images - services, solutions, industries, opportunities -
 * are not listed here. Those come from Sanity, with their briefs held
 * alongside the copy in the content files.
 */

import { services } from "./services";
import { industries } from "./industries";

export type MediaSlotId =
  | "home-hero"
  | "home-reach"
  | "about-company"
  | "contact-office"
  | `service-${string}`
  | `industry-${string}`
  /* One per audience. Used twice each: the homepage cards and the hero of the
     matching /solutions page, so a single file covers both positions. */
  | "solution-smes"
  | "solution-corporates"
  | "solution-individuals";

export type MediaSlotDefinition = {
  /** Path under /public. Null until a licensed file is in place. */
  src: string | null;
  alt: string;
  brief: string;
  credit?: string;
  /** Where the subject sits, when the crop is tight. */
  position?: string;
};

export const mediaSlots: Partial<Record<MediaSlotId, MediaSlotDefinition>> = {
  "home-hero": {
    src: "/images/home-hero.webp",
    alt: "",
    brief:
      "Hero, 3:4 portrait. A Nairobi commercial or industrial environment mid-activity: a working port, plant or trading floor. Natural light, editorial framing, people at work rather than posed. No handshakes, no stock boardroom, no laptop-and-coffee.",
    position: "center",
  },
  "home-reach": {
    src: "/images/home-reach.webp",
    alt: "",
    brief:
      "Regional reach, 4:3. A Kenyan logistics corridor, container terminal or highway interchange carrying real traffic. Wide, unpeopled, infrastructure-publication framing. Mombasa port, the Nairobi Expressway or the Northern Corridor all work.",
  },
  "about-company": {
    src: "/images/about-company.webp",
    alt: "",
    brief:
      "About page, 4:3. The Garnet office or team in Nairobi. This one should be commissioned rather than licensed. A real photograph of the actual company is worth more here than any stock image, and its absence is noticeable on an about page.",
  },
  "solution-smes": {
    src: "/images/solution-smes.webp",
    alt: "",
    brief:
      "SMEs. An owner-operated Kenyan business at work: a workshop floor, a wholesale operation, a small production line. Staff visibly doing the job. Cropped 3:2 on the homepage and 4:3 on the solutions page, so keep the subject off the extreme edges.",
  },
  "solution-corporates": {
    src: "/images/solution-corporates.webp",
    alt: "",
    brief:
      "Corporates. Scale rather than people: a large industrial site, a project under construction, a plant at capacity. Should read institutional next to the SME image, not simply bigger.",
  },
  "solution-individuals": {
    src: "/images/solution-individuals.webp",
    alt: "",
    brief:
      "Individuals. One person in a considered moment: an advisory conversation, a vehicle being handed over. Specific and unposed. Avoid the smiling-family-with-keys register.",
  },
  "contact-office": {
    src: null,
    alt: "",
    brief:
      "Contact page, 16:9. The building exterior or street, so a visitor can recognise it on arrival. Commissioned, not stock.",
  },
};

/* ---------------------------------------------------------------------------
   SERVICE AND INDUSTRY IMAGES

   Twelve positions, one per service and per industry, each used on that page's
   hero. Only `src` and `alt` live here - the art-direction brief for each one
   already sits next to its copy in services.ts and industries.ts, and stating
   it twice is how the two versions end up disagreeing.

   To attach an image: save it as /public/images/service-<slug>.jpg, then fill
   in the two fields below. Leave an entry null and that page keeps its
   labelled placeholder.
   --------------------------------------------------------------------------- */

type ImageFile = { src: string | null; alt: string };

const empty: ImageFile = { src: null, alt: "" };

export const serviceImages: Record<string, ImageFile> = {
    "business-sme-financing": {
    src: "/images/service-business-sme-financing.webp",
    alt: "A workshop owner checking stock against an order sheet",
  },
  "asset-equipment-financing": {
    src: "/images/service-asset-equipment-financing.webp",
    alt: "A heavy machine on a construction site",
  },
  "trade-finance-invoice-discounting": {
    src: "/images/service-trade-finance-invoice-discounting.webp",
    alt: "A business owner reviewing invoices",
  },
  "personal-consumer-financing": {
    src: "/images/service-personal-consumer-financing.webp",
    alt: "A person shopping for consumer goods",
  },
  "structured-fixed-income-investment": {
    src: "/images/service-structured-fixed-income-investment.webp",
    alt: "A financial market graph on a screen",
  },
  "project-venture-investment": {
    src: "/images/service-project-venture-investment.webp",
    alt: "A large construction project under development",
  },
  "logistics": {
    src: "/images/service-logistics.webp",
    alt: "supply-chain activity",
  },
};

export const industryImages: Record<string, ImageFile> = {
  "manufacturing": {
    src: "/images/industry-manufacturing.webp",
    alt: "A manufacturing plant in operation",
  },
  "agriculture": {
    src: "/images/industry-agriculture.webp",
    alt: "Agricultural field in operation",
  },
  "retail-fmcg": {
    src: "/images/industry-retail-fmcg.webp",
    alt: "A modern retail store interior",
  },
  "construction": {
    src: "/images/industry-construction.webp",
    alt: "A construction site in progress",
  },
  "import-export": {
    src: "/images/industry-import-export.webp",
    alt: "A bustling port with cargo ships",
  },
};

/** Slot definitions assembled from the tables above and the content briefs. */
const contentSlots: Record<string, MediaSlotDefinition> = {
  ...Object.fromEntries(
    services.map((service) => [
      `service-${service.slug}`,
      {
        src: serviceImages[service.slug]?.src ?? null,
        alt: serviceImages[service.slug]?.alt ?? "",
        brief: service.imageBrief,
      },
    ]),
  ),
  ...Object.fromEntries(
    industries.map((industry) => [
      `industry-${industry.slug}`,
      {
        src: industryImages[industry.slug]?.src ?? null,
        alt: industryImages[industry.slug]?.alt ?? "",
        brief: industry.imageBrief,
      },
    ]),
  ),
};

/**
 * Returns undefined for an id that has no declaration, so a page requesting a
 * slot that does not exist falls back to its inline brief rather than throwing.
 */
export function getMediaSlot(id: MediaSlotId): MediaSlotDefinition | undefined {
  return mediaSlots[id] ?? contentSlots[id as string];
}

/** Slots still waiting on a file. Used by the audit script and in review. */
export function unfilledSlots(): MediaSlotId[] {
  const all: Record<string, MediaSlotDefinition> = {
    ...(mediaSlots as Record<string, MediaSlotDefinition>),
    ...contentSlots,
  };
  return Object.keys(all).filter((id) => !all[id].src) as MediaSlotId[];
}