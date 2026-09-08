import type { DraftPerson, Feature } from "./types";

/**
 * Company content drafted from the Garnet Solutions company profile.
 * Vision, mission and values are quoted as written by the client and should
 * not be reworded without their approval.
 */

export const vision =
  "To be East Africa's most trusted partner in financing, investment, and logistics solutions.";

export const mission =
  "To empower SMEs, corporates, and individuals by providing accessible financing, sound investment opportunities, and dependable logistics services that drive growth and efficiency.";

export const values: Feature[] = [
  {
    title: "Integrity",
    description:
      "We tell clients what is workable and what is not, including when the answer is that a request is not ready to go to a financier.",
  },
  {
    title: "Reliability",
    description:
      "An engagement is guided from first assessment through to approval and repayment coordination, not handed over halfway.",
  },
  {
    title: "Client-Centricity",
    description:
      "Each structure is built around the client's cash flow, sector and timeline rather than fitted to a standard product.",
  },
  {
    title: "Innovation",
    description:
      "Where a conventional route does not fit, we look for one that does — including offshore financing for projects that need it.",
  },
  {
    title: "Professionalism",
    description:
      "Documentation, due diligence and reporting are handled to the standard partner institutions expect.",
  },
];

/** Section 2 of the profile — Garnet's role as a partner. */
export const partnerRole: Feature[] = [
  {
    title: "Facilitation and structuring",
    description:
      "Garnet does not lend from its own balance sheet for client financing needs. It structures and facilitates financing on the client's behalf with banking, asset-finance and trade-finance partners, sources large-scale project financing from offshore and international financiers for qualifying undertakings, and connects clients to insurance partners where additional capacity is needed.",
  },
  {
    title: "Advisory support",
    description:
      "Every financing engagement is guided end to end — from initial assessment and documentation through to facility approval with partner institutions and ongoing repayment coordination — rather than left to the client to navigate alone.",
  },
  {
    title: "Proprietary investment",
    description:
      "For its investment activity, Garnet deploys its own capital directly into qualifying projects, ventures and structured instruments, with monitoring and reporting managed in-house.",
  },
  {
    title: "Risk assessment",
    description:
      "Before structuring any facilitation or committing Garnet's own capital, the team carries out a due diligence review of the applicant or asset, recommends risk-mitigation measures, and uses the findings to determine appropriate terms and pricing.",
  },
  {
    title: "Programme management",
    description:
      "Financing schedules, investment activity and logistics arrangements are consolidated into a single point of coordination, so multi-service or multi-year engagements stay aligned.",
  },
];

/**
 * Section 6 of the profile supplies the first three of these. The last two are
 * drawn from section 2 rather than invented — the supplied profile appears to
 * be truncated mid-section, so confirm with the client whether further
 * differentiators exist.
 */
export const differentiators: Feature[] = [
  {
    title: "Integrated financing and investment ecosystem",
    description:
      "Financing facilitation — including access to offshore project capital — sits alongside proprietary investment under one roof, with logistics support where it is needed. One partner instead of several, and capital that moves in step with operations.",
  },
  {
    title: "Deep local rooting and longevity",
    description:
      "Locally registered and operating from Nairobi since 2015, with firsthand understanding of East Africa's regulatory frameworks and logistics corridors.",
  },
  {
    title: "Client-tailored, precision solutions",
    description:
      "Rigid templates are rejected in favour of frameworks built around specific goals: facilitated growth capital for SMEs, structured financing for corporates, and personalised capital-growth pathways for individuals.",
  },
  {
    title: "Due diligence before anything moves",
    description:
      "Applicants, assets and projects are reviewed before a request reaches a financier or Garnet's own capital is committed. It is what makes a request credible to the institutions considering it.",
  },
  {
    title: "One point of coordination",
    description:
      "Where an engagement spans financing, investment and logistics, Garnet consolidates the schedules into a single line of accountability.",
  },
];

/** The five stages a requirement moves through. */
export const method: Feature[] = [
  {
    title: "Assess",
    description:
      "Understand the requirement, the business behind it, and what the risk actually is. A due diligence review of the applicant or asset happens here.",
  },
  {
    title: "Structure",
    description:
      "Shape the request into a form a financier can underwrite — terms, security, repayment profile and the documentation that supports it.",
  },
  {
    title: "Connect",
    description:
      "Take the structured request to the banking, asset-finance, trade-finance or offshore institutions whose appetite matches it.",
  },
  {
    title: "Execute",
    description:
      "Carry the documentation and approval process through with the partner institution to facility approval and drawdown.",
  },
  {
    title: "Coordinate",
    description:
      "Stay with the engagement through repayment coordination, and align logistics where goods or assets need to move.",
  },
];

export const geographicReach = [
  { title: "Nairobi and surrounding counties", description: "Where the company is based and operates day to day." },
  { title: "Nationwide Kenya", description: "Clients and engagements across the country." },
  { title: "Regional East Africa", description: "Structuring that extends into the wider region where a requirement calls for it." },
];

export const industriesServed = [
  "Manufacturing",
  "Agriculture",
  "Retail & FMCG",
  "Construction",
  "Import/Export trade",
];

/**
 * Leadership, from section 5 of the profile. Photos and LinkedIn URLs are
 * still outstanding — the team page renders initials until they arrive.
 */
export const leadership: DraftPerson[] = [
  {
    name: "Christine M. Ilahalwa",
    position: "Director",
    biography:
      "Christine provides overall strategic leadership and governance for Garnet Solutions Limited. She sets the company's long-term direction across its financing, investment and logistics service lines, approves major business decisions, and represents the company at governance and stakeholder level. She oversees policy formulation and risk appetite, and ensures operations align with the company's vision and regulatory obligations.",
    order: 1,
  },
  {
    name: "Oscar Ssenyonga",
    position: "Director",
    biography:
      "Oscar drives growth initiatives, forges logistics and investment partnerships, and oversees the practical execution of board-level decisions across departments. He is a key decision-maker on logistics and business development.",
    order: 2,
  },
  {
    name: "Gerishom Kidaha",
    position: "Finance Manager",
    biography:
      "Gerishom oversees the company's financial management function, covering accounts, budgeting and financial reporting, and ensuring regulatory and tax compliance. He is also the company's link to banks, auditors and financing partners.",
    order: 3,
  },
  {
    name: "Gail Vulifa",
    position: "Human Resources",
    biography:
      "Gail manages the company's human capital function: recruitment and staffing, onboarding and training, employee records and contracts, performance management and staff welfare.",
    order: 4,
  },
  {
    name: "Sarah Oloo",
    position: "Administration",
    biography:
      "Sarah runs the day-to-day administrative functions of the company, including internal communications, scheduling, office documentation, procurement and vendor alignment. She also supports client onboarding paperwork and correspondence.",
    order: 5,
  },
];

export const companyOverview = [
  "Garnet Solutions Limited is a Kenyan-registered company incorporated in 2015 and headquartered in Nairobi. It was established to provide integrated financing, investment and general logistics services to small and medium enterprises, corporate organisations and individuals across the region.",
  "Bringing financing facilitation, structured investment and logistics support under one roof lets Garnet act as a single partner for businesses and individuals who need both access to capital and reliable movement of goods — two problems that are usually solved separately, and rarely in step with each other.",
];