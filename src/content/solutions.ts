import type { DraftSolution } from "./types";

/**
 * The three audience journeys, drafted from section 4 of the company profile.
 * Each one leads with the problem that audience actually arrives with, then
 * routes to services — rather than restating the service list three times.
 */
export const solutions: DraftSolution[] = [
  {
    title: "SMEs",
    slug: "smes",
    audienceLabel: "Small and medium enterprises",
    description:
      "Facilitated funding to scale, asset financing to equip, and logistics support to move what you sell.",
    overview: [
      "Small and medium businesses are where the gap between a viable plan and available capital is widest. The order is confirmed, the machine would pay for itself, the branch would work — and none of it can be funded out of this month's cash flow.",
      "Garnet's role is to make the request legible to a financier: assessed properly, structured against real cash flow, and taken to the institutions most likely to underwrite it. Where goods also need moving, logistics runs alongside rather than through a separate supplier.",
    ],
    painPoints: [
      {
        title: "Capital growth",
        description:
          "Facilitated funding strategies to accelerate scaling and market expansion, arranged through partner institutions.",
      },
      {
        title: "Asset financing",
        description:
          "Facilitated financing to secure essential machinery, technology and operational infrastructure.",
      },
      {
        title: "Logistics support",
        description:
          "Supply-chain assistance to optimise distribution and reduce operational friction.",
      },
      {
        title: "Cash tied up in trade",
        description:
          "Invoice discounting and LPO financing for businesses supplying larger buyers on credit terms.",
      },
    ],
    services: [
      "business-sme-financing",
      "asset-equipment-financing",
      "trade-finance-invoice-discounting",
      "logistics",
    ],
    imageBrief:
      "An SME operating environment in Kenya — a workshop, a wholesale operation, a small manufacturing floor with staff at work.",
  },
  {
    title: "Corporates",
    slug: "corporates",
    audienceLabel: "Corporate organisations",
    description:
      "Structured financing at scale, investment partnerships using Garnet's own capital, and coordinated logistics.",
    overview: [
      "Corporate requirements are rarely a single facility. They involve several institutions, longer timelines, and — for infrastructure-adjacent projects — scale, currency and terms that domestic financing alone may not cover.",
      "Garnet structures those arrangements with its partner institutions, sources project capital from offshore and international financiers where the undertaking qualifies, and consolidates financing, investment and logistics into one point of coordination.",
    ],
    painPoints: [
      {
        title: "Structured financing",
        description:
          "Complex, high-tier financing arrangements facilitated with partner institutions for large-scale enterprise needs.",
      },
      {
        title: "Project and offshore financing",
        description:
          "Sourcing and arranging capital for large-scale and infrastructure-adjacent projects through offshore and international financiers.",
      },
      {
        title: "Investment partnerships",
        description:
          "Joint ventures and capital allocation using Garnet's own capital, structured for long-term value.",
      },
      {
        title: "Logistics support",
        description:
          "Coordinated logistics available alongside core financing and investment engagements.",
      },
    ],
    services: [
      "business-sme-financing",
      "asset-equipment-financing",
      "trade-finance-invoice-discounting",
      "project-venture-investment",
      "structured-fixed-income-investment",
      "logistics",
    ],
    imageBrief:
      "A corporate or infrastructure-scale environment — a large industrial site, a project under construction, an executive setting that reads institutional rather than generic.",
  },
  {
    title: "Individuals",
    slug: "individuals",
    audienceLabel: "Individual clients",
    description:
      "Personal and asset financing facilitated through partner institutions, and investment opportunities drawing on Garnet's own capital.",
    overview: [
      "Individuals get the same two things businesses do: an honest assessment of what is workable, and someone who stays with the process instead of handing over a form.",
      "Financing is arranged through partner institutions. Investment opportunities are a separate matter — those draw on Garnet's own capital, and nothing offered is a guarantee of return.",
    ],
    painPoints: [
      {
        title: "Personal financing",
        description:
          "Financing solutions facilitated through partner institutions and tailored to individual milestones.",
      },
      {
        title: "Asset financing",
        description: "Facilitated financing for personal vehicles or household and business equipment.",
      },
      {
        title: "Investment opportunities",
        description:
          "Co-investment and capital-growth opportunities drawing on Garnet's own capital.",
      },
    ],
    services: [
      "personal-consumer-financing",
      "asset-equipment-financing",
      "structured-fixed-income-investment",
    ],
    imageBrief:
      "An individual client context — an advisory conversation in a Nairobi office, or a personal asset in use. Specific and unposed.",
  },
];

export const solutionsBySlug = new Map(solutions.map((solution) => [solution.slug, solution]));