import type { DraftIndustry } from "./types";

/**
 * IMPORTANT - every entry here is marked `requiresApproval`.
 *
 * The company profile names these five sectors but says nothing about how
 * Garnet works within each one. The sector characteristics below are general
 * and uncontroversial (harvest cycles, retainage, credit terms), and none of
 * them claims a Garnet track record, client, deal or specialism. Even so, the
 * client should confirm each page before launch - a sector page that overstates
 * familiarity is the easiest way to lose credibility with a prospect who works
 * in it.
 */
export const industries: DraftIndustry[] = [
  {
    title: "Manufacturing",
    slug: "manufacturing",
    description:
      "Capital equipment, raw-material cycles and the working capital that sits between production and payment.",
    overview: [
      "Manufacturing ties up capital in two places at once: in the machinery that produces, and in the raw materials and finished stock waiting to convert. Both compete for the same cash.",
      "Garnet facilitates asset financing for production equipment, working capital for the input cycle, and trade facilities where inputs are imported, with logistics available for inbound materials and outbound distribution.",
    ],
    challenges: [
      { title: "Equipment that outlasts the cash to buy it", description: "Production machinery earns over years but is paid for at once unless it is financed against the asset." },
      { title: "Input cycles ahead of revenue", description: "Raw materials are bought and converted well before the resulting invoice is settled." },
      { title: "Imported inputs", description: "Suppliers abroad often need paying before goods arrive, which is a trade-finance problem rather than a working-capital one." },
    ],
    relevantServices: [
      "asset-equipment-financing",
      "business-sme-financing",
      "trade-finance-invoice-discounting",
      "logistics",
    ],
    imageBrief: "A working production floor in Kenya: machinery, operators, materials in process.",
    requiresApproval: true,
  },
  {
    title: "Agriculture",
    slug: "agriculture",
    description:
      "Seasonal cash flow, equipment, and getting produce to market before it loses value.",
    overview: [
      "Agricultural income arrives in concentrated periods while costs run continuously. A repayment schedule built for a monthly-revenue business does not fit a harvest cycle, and this is exactly what repayment structuring exists to solve.",
      "Garnet facilitates financing structured around seasonality, arranges equipment and vehicle finance, and supports movement and storage of produce where time and handling determine what it is worth on arrival.",
    ],
    challenges: [
      { title: "Income arrives in seasons, costs do not", description: "Repayment schedules need to be aligned to harvest and payment cycles rather than to a flat monthly assumption." },
      { title: "Equipment and vehicles", description: "Machinery and transport are often the constraint on how much of a crop can be handled and moved." },
      { title: "Time-sensitive movement", description: "Produce loses value in transit, so storage and distribution decisions carry a direct cost." },
    ],
    relevantServices: [
      "business-sme-financing",
      "asset-equipment-financing",
      "logistics",
      "trade-finance-invoice-discounting",
    ],
    imageBrief:
      "Kenyan agricultural operations at commercial scale: harvest handling, grading, produce being loaded. Working agriculture, not a landscape.",
    requiresApproval: true,
  },
  {
    title: "Retail & FMCG",
    slug: "retail-fmcg",
    description: "Stock, shelf space, credit terms and distribution across many delivery points.",
    overview: [
      "Fast-moving goods businesses live on turnover, and turnover needs stock. Supplying larger retailers usually means extending credit terms and waiting, while the next order still has to be funded.",
      "Garnet facilitates working capital and invoice discounting against confirmed receivables, arranges LPO financing for confirmed orders, and supports distribution across delivery points.",
    ],
    challenges: [
      { title: "Cash tied up in receivables", description: "Goods delivered on credit terms hold cash that the next order needs." },
      { title: "Confirmed orders that cannot be funded", description: "An LPO from a large buyer is only useful if the stock can be financed to fulfil it." },
      { title: "Distribution across many points", description: "Last-mile delivery cost and reliability affect margin directly." },
    ],
    relevantServices: [
      "trade-finance-invoice-discounting",
      "business-sme-financing",
      "logistics",
      "asset-equipment-financing",
    ],
    imageBrief:
      "Distribution or retail supply in Kenya: a wholesale depot, goods being loaded for delivery, stocked shelves in a commercial setting.",
    requiresApproval: true,
  },
  {
    title: "Construction",
    slug: "construction",
    description: "Project-length timelines, staged payments, plant and equipment.",
    overview: [
      "Construction runs on certified stages and retained payments, so cost is incurred long before it is recovered. Plant and equipment add a second capital demand on top.",
      "Garnet facilitates project and working-capital financing structured to certification stages, arranges equipment finance, and sources large-scale financing from offshore and international financiers where a project qualifies. Garnet may also participate directly in qualifying projects using its own capital.",
    ],
    challenges: [
      { title: "Payment lags the work", description: "Certification and retention hold cash after the cost has already been incurred." },
      { title: "Plant and equipment", description: "Machinery is a large, separate capital requirement alongside project costs." },
      { title: "Scale beyond domestic facilities", description: "Larger and infrastructure-adjacent projects may need offshore capital to match their scale, currency and terms." },
    ],
    relevantServices: [
      "business-sme-financing",
      "asset-equipment-financing",
      "project-venture-investment",
      "logistics",
    ],
    imageBrief:
      "An active Kenyan construction or infrastructure site: structure taking shape, plant in use. Architectural framing.",
    requiresApproval: true,
  },
  {
    title: "Import & Export",
    slug: "import-export",
    description: "Supplier payments, transit time, and the gap between paying and being paid.",
    overview: [
      "Cross-border trade stretches the cash-flow gap in both directions: suppliers want paying before goods ship, and buyers pay after they arrive. In between sits transit, clearance and storage.",
      "Garnet facilitates trade-finance facilities covering supplier payments, arranges invoice discounting on the receivable side, and handles freight, warehousing and distribution once goods land.",
    ],
    challenges: [
      { title: "Paying before shipping", description: "Suppliers frequently require payment ahead of dispatch, well before any revenue arrives." },
      { title: "Transit and clearance time", description: "Goods in transit are capital that is neither cash nor stock on a shelf." },
      { title: "Currency and terms", description: "Cross-border transactions carry terms that a standard domestic facility may not accommodate." },
    ],
    relevantServices: [
      "trade-finance-invoice-discounting",
      "logistics",
      "business-sme-financing",
      "asset-equipment-financing",
    ],
    imageBrief:
      "Import/export infrastructure serving Kenya: container handling, a freight corridor, cargo being cleared or loaded.",
    requiresApproval: true,
  },
];

export const industriesBySlug = new Map(industries.map((industry) => [industry.slug, industry]));