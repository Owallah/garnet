import type { DraftService } from "./types";

/**
 * The seven services, drafted from section 3 of the company profile.
 *
 * `garnetRole` is the load-bearing field on every one of these pages. Services
 * 1–4 and 7 are facilitation or delivery; 5 and 6 are the only ones where
 * Garnet's own capital is involved. Nothing here states a rate, a limit, a
 * turnaround time or an approval likelihood, because the profile supports none
 * of those.
 */
export const services: DraftService[] = [
  {
    title: "Business & SME Financing",
    slug: "business-sme-financing",
    category: "financing",
    shortDescription:
      "Working capital and growth financing for small and medium enterprises, arranged through Garnet's banking and financing partners.",
    overview: [
      "Most small and medium businesses do not fail for lack of demand. They run short of working capital at the wrong moment, or they reach a growth step — a second branch, a bigger order, a new line — that their cash flow cannot fund on its own.",
      "Garnet works on the request before it goes anywhere near a financier: understanding the business, testing what it can carry, and structuring the ask into something a bank or financing partner can underwrite. The engagement then continues through documentation, approval and repayment coordination.",
    ],
    garnetRole:
      "Garnet does not lend from its own balance sheet. It assesses, structures and facilitates the financing on the client's behalf with its banking and financing partners, and stays with the engagement through approval and repayment coordination.",
    capabilities: [
      {
        title: "Working capital facilitation",
        description:
          "Arranging short-to-medium term working capital financing to bridge cash-flow gaps in day-to-day operations.",
      },
      {
        title: "Growth and expansion financing",
        description:
          "Structuring and facilitating capital for business expansion, new branches or scaling of operations, sourced through financing partners.",
      },
      {
        title: "Repayment structuring",
        description:
          "Advisory support in negotiating repayment schedules aligned to the client's cash-flow cycle — which matters most for seasonal businesses.",
      },
      {
        title: "International and offshore project financing",
        description:
          "Sourcing and arranging financing for large-scale corporate and infrastructure-adjacent projects through a network of offshore and international financiers, structured for the scale, currency and terms such undertakings require.",
      },
      {
        title: "Support for first-time borrowers",
        description:
          "Financial literacy guidance and basic business-plan review, where a business is approaching formal financing for the first time.",
      },
    ],
    audience: ["SMEs", "Corporates"],
    process: [
      { title: "Assess", description: "Review the business, the requirement and the risk, and establish what it can realistically carry." },
      { title: "Structure", description: "Shape the request and its documentation into a form a financier can underwrite." },
      { title: "Connect", description: "Take it to the partner institutions whose appetite matches the request." },
      { title: "Execute", description: "Work the approval process through to facility approval and drawdown." },
      { title: "Coordinate", description: "Stay involved through repayment coordination for the life of the facility." },
    ],
    relatedIndustries: ["manufacturing", "agriculture", "retail-fmcg", "construction", "import-export"],
    relatedSolutions: ["smes", "corporates"],
    imageBrief:
      "An owner-operated Kenyan business at work — a workshop floor, a distribution operation, a production line. Real staff, real premises, editorial rather than posed.",
  },
  {
    title: "Asset & Equipment Financing",
    slug: "asset-equipment-financing",
    category: "financing",
    shortDescription:
      "Financing for vehicles, machinery and logistics equipment, arranged through Garnet's asset-finance partners.",
    overview: [
      "An asset that earns its keep should not have to be bought outright. Vehicles, production machinery and warehousing equipment can usually be financed against the asset itself, which keeps working capital where it is needed.",
      "Garnet structures the acquisition with its asset-finance partners, and where a business is carrying several facilities across different assets, consolidates them under one coordinated repayment schedule and reporting structure.",
    ],
    garnetRole:
      "Garnet facilitates asset and equipment financing through its asset-finance partners. It does not fund the acquisition itself; it structures the arrangement, arranges it with the financier and coordinates the schedule.",
    capabilities: [
      {
        title: "Vehicle and fleet financing",
        description: "Facilitation of acquisition financing for commercial and logistics vehicles.",
      },
      {
        title: "Machinery and equipment financing",
        description: "Facilitation of financing for production, construction or warehousing equipment.",
      },
      {
        title: "Hire-purchase arrangements",
        description: "Structuring of ownership-transfer financing over an agreed term, arranged with partner financiers.",
      },
      {
        title: "Asset consolidation",
        description:
          "Consolidation of financing facilities across multiple assets under one coordinated repayment schedule and reporting structure.",
      },
    ],
    audience: ["SMEs", "Corporates", "Individuals"],
    process: [
      { title: "Assess", description: "Review the asset, its use in the business and the client's capacity to service the facility." },
      { title: "Structure", description: "Set the term, deposit and repayment profile against how the asset will earn." },
      { title: "Connect", description: "Arrange the facility with the asset-finance partner best suited to the asset class." },
      { title: "Execute", description: "Carry documentation and approval through to delivery of the asset." },
      { title: "Coordinate", description: "Consolidate schedules where several assets are financed together." },
    ],
    relatedIndustries: ["manufacturing", "construction", "agriculture", "import-export"],
    relatedSolutions: ["smes", "corporates", "individuals"],
    imageBrief:
      "Commercial vehicles or production machinery in active use — a fleet yard, a plant floor. Equipment working, not showroom stock.",
  },
  {
    title: "Trade Finance & Invoice Discounting",
    slug: "trade-finance-invoice-discounting",
    category: "financing",
    shortDescription:
      "Short-term financing that unlocks cash tied up in trade transactions, unpaid invoices and confirmed orders.",
    overview: [
      "A confirmed order and an unpaid invoice are both assets. Neither pays salaries. For businesses supplying larger buyers on credit terms, the gap between delivering and being paid is the single most common cash-flow constraint.",
      "Garnet facilitates the short-term financing that closes that gap — against invoices, against confirmed local purchase orders, and across import and export transactions where suppliers need paying before goods arrive.",
    ],
    garnetRole:
      "Garnet arranges these facilities through its trade-finance and financing partners. It does not advance funds itself; it structures the transaction and facilitates it with the institution providing the facility.",
    capabilities: [
      {
        title: "Invoice discounting",
        description:
          "Facilitation of advance funding against unpaid client invoices, arranged through financing partners, to improve cash flow.",
      },
      {
        title: "Trade finance facilities",
        description:
          "Facilitation of financing to support import and export transactions, including supplier payments.",
      },
      {
        title: "Local Purchase Order (LPO) financing",
        description: "Facilitation of funding to fulfil confirmed orders ahead of client payment.",
      },
    ],
    audience: ["SMEs", "Corporates"],
    process: [
      { title: "Assess", description: "Review the transaction, the counterparty and the strength of the receivable or order." },
      { title: "Structure", description: "Match the facility to the transaction cycle so repayment falls where the cash arrives." },
      { title: "Connect", description: "Arrange the facility with a trade-finance partner." },
      { title: "Execute", description: "Work documentation through to disbursement against the invoice or order." },
      { title: "Coordinate", description: "Align logistics where goods need to move against the financed transaction." },
    ],
    relatedIndustries: ["import-export", "retail-fmcg", "manufacturing", "agriculture"],
    relatedSolutions: ["smes", "corporates"],
    imageBrief:
      "Trade in motion — cargo handling, containers, a warehouse dispatch bay. Goods and documentation, the physical side of a financed transaction.",
  },
  {
    title: "Personal & Consumer Financing",
    slug: "personal-consumer-financing",
    category: "financing",
    shortDescription:
      "Financing for individual clients, facilitated through Garnet's partner institutions.",
    overview: [
      "Individuals come to Garnet with the same underlying problem businesses do: a need that arrives ahead of the funds, and a set of financing options that is hard to compare from the outside.",
      "Garnet assesses the requirement, structures it, and arranges it with a partner institution — with the same due diligence and end-to-end guidance applied to its business engagements.",
    ],
    garnetRole:
      "Garnet facilitates personal financing through partner institutions. It is not a lender, and this is not a loan application — it is a structured introduction to a financier, guided through to approval.",
    capabilities: [
      {
        title: "Personal financing",
        description: "Facilitation of short-to-medium term financing for individual needs.",
      },
      {
        title: "Asset financing for individuals",
        description: "Facilitation of financing for personal vehicles or household and business equipment.",
      },
    ],
    audience: ["Individuals"],
    process: [
      { title: "Assess", description: "Understand the requirement and review what a financier will need to see." },
      { title: "Structure", description: "Set the request against a realistic repayment capacity." },
      { title: "Connect", description: "Arrange it with the partner institution best matched to it." },
      { title: "Execute", description: "Guide the documentation and approval process through." },
      { title: "Coordinate", description: "Support repayment coordination once the facility is in place." },
    ],
    relatedIndustries: [],
    relatedSolutions: ["individuals"],
    imageBrief:
      "A considered personal-finance moment in a Kenyan setting — an advisory conversation, a vehicle handover. Warm and specific, never a stock family stock photo.",
  },
  {
    title: "Structured & Fixed-Income Investment",
    slug: "structured-fixed-income-investment",
    category: "investment",
    shortDescription:
      "Garnet's own capital placed into structured, lower-risk instruments, alongside facilitated access to property-based opportunities.",
    overview: [
      "This is where Garnet's own balance sheet is at work. The company places its capital into structured, lower-risk fixed-income and money-market instruments as part of its proprietary investment activity.",
      "Alongside that, Garnet sources and structures property-based investment opportunities in partnership with real-estate and financing partners.",
    ],
    garnetRole:
      "Unlike Garnet's financing services, this is proprietary activity: Garnet commits its own capital, with monitoring and reporting managed in-house. Nothing on this page is an offer, a solicitation or a recommendation to invest, and no return is promised or implied.",
    capabilities: [
      {
        title: "Fixed income and money market placements",
        description:
          "Garnet's own capital placed into structured, lower-risk fixed-income and money-market instruments as part of its proprietary investment activity.",
      },
      {
        title: "Real estate investment facilitation",
        description:
          "Sourcing and structuring of property-based investment opportunities, in partnership with real-estate and financing partners.",
      },
    ],
    audience: ["Corporates", "Individuals"],
    process: [
      { title: "Assess", description: "Review the instrument or property opportunity and the risk attached to it." },
      { title: "Structure", description: "Determine terms, exposure and the appropriate form of participation." },
      { title: "Commit", description: "Deploy capital where the opportunity meets Garnet's criteria." },
      { title: "Monitor", description: "Track performance and report on it in-house." },
    ],
    relatedIndustries: ["construction"],
    relatedSolutions: ["corporates", "individuals"],
    imageBrief:
      "Commercial property or an institutional setting — a completed development, a considered interior. Restrained and architectural, not aspirational-luxury.",
    requiresApproval: true,
  },
  {
    title: "Project & Venture Investment",
    slug: "project-venture-investment",
    category: "investment",
    shortDescription:
      "Direct participation using Garnet's own capital in qualifying projects and business ventures.",
    overview: [
      "Some opportunities need a partner willing to take a position rather than arrange one. Garnet participates directly in vetted commercial and infrastructure-adjacent projects, and structures equity or quasi-equity arrangements for growing businesses.",
      "Capital is committed only after a due diligence review of viability, financials and risk. Where a project also needs facilitated debt or logistics coordination, those sit alongside — but the investment decision is Garnet's own.",
    ],
    garnetRole:
      "This is proprietary investment. Garnet commits its own funds after its own due diligence. It is distinct from the financing services, where Garnet arranges capital from partner institutions and lends nothing itself.",
    capabilities: [
      {
        title: "Project investment",
        description:
          "Capital participation, using Garnet's own funds, in vetted commercial or infrastructure-adjacent projects.",
      },
      {
        title: "Venture and corporate investment structuring",
        description:
          "Structuring of equity or quasi-equity investment arrangements for growing businesses, funded from Garnet's own capital.",
      },
      {
        title: "Investment due diligence",
        description: "Assessment of project viability, financials and risk prior to any capital commitment.",
      },
    ],
    audience: ["Corporates"],
    process: [
      { title: "Review", description: "Assess the project or venture against Garnet's investment criteria." },
      { title: "Diligence", description: "Examine viability, financials and risk before anything is committed." },
      { title: "Structure", description: "Agree the form of participation — equity, quasi-equity or project stake." },
      { title: "Commit", description: "Deploy Garnet's own capital." },
      { title: "Monitor", description: "Track the position and report on it in-house." },
    ],
    relatedIndustries: ["construction", "manufacturing", "agriculture"],
    relatedSolutions: ["corporates"],
    imageBrief:
      "A project under way — construction, infrastructure, industrial build-out. Scale and progress, shot with an infrastructure-publication eye.",
    requiresApproval: true,
  },
  {
    title: "General Logistics Services",
    slug: "logistics",
    category: "logistics",
    shortDescription:
      "Freight, warehousing and distribution support for clients moving goods within and beyond Nairobi.",
    overview: [
      "Financing a consignment and moving it are usually two conversations with two suppliers. Garnet's logistics services exist so they can be one — freight and distribution assistance that runs alongside a financed trade transaction or an equipment purchase rather than separately from it.",
      "The service is also available on its own, for clients who need goods moved and stored dependably.",
    ],
    garnetRole:
      "Logistics is a service Garnet delivers and coordinates directly, complementing its financing and investment work rather than depending on it.",
    capabilities: [
      {
        title: "Freight and cargo transportation",
        description: "Road freight services for the movement of goods between locations.",
      },
      {
        title: "Warehousing and distribution",
        description: "Storage and last-mile delivery support for goods in transit.",
      },
    ],
    audience: ["SMEs", "Corporates"],
    process: [
      { title: "Scope", description: "Establish what is moving, from where, to where, and on what schedule." },
      { title: "Plan", description: "Set the route, handling and storage requirements." },
      { title: "Move", description: "Transport the consignment." },
      { title: "Coordinate", description: "Align delivery with the financing or trade transaction behind it where one exists." },
    ],
    relatedIndustries: ["import-export", "retail-fmcg", "manufacturing", "agriculture"],
    relatedSolutions: ["smes", "corporates"],
    imageBrief:
      "A Kenyan logistics corridor or warehouse operation — trucks loading, palletised goods, a dispatch yard at work.",
  },
];

export const servicesBySlug = new Map(services.map((service) => [service.slug, service]));

export const servicesByCategory = {
  financing: services.filter((service) => service.category === "financing"),
  investment: services.filter((service) => service.category === "investment"),
  logistics: services.filter((service) => service.category === "logistics"),
};