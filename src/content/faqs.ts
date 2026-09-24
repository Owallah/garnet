import type { DraftFaq } from "./types";

/**
 * FAQs drafted from the company profile.
 *
 * The first entry is the one the technical specification calls out as
 * critical. It is deliberately the first question in the financing category
 * and should stay there - it is the single most likely misunderstanding a
 * visitor arrives with.
 */
export const faqs: DraftFaq[] = [
  {
    question: "Does Garnet lend money directly?",
    category: "financing",
    answer: [
      "No. Garnet does not lend from its own balance sheet for client financing needs.",
      "It assesses and structures a financing requirement, then facilitates it with its banking, asset-finance and trade-finance partners (including offshore and international financiers for qualifying large-scale projects), and guides the engagement through to approval and repayment coordination.",
      "Garnet's own capital is used separately, for its proprietary investment activity in qualifying projects, ventures and structured instruments.",
    ],
  },
  {
    question: "What is the difference between Garnet's financing and its investment work?",
    category: "general",
    answer: [
      "They use different money. Financing services arrange capital from partner institutions on a client's behalf; Garnet lends nothing itself.",
      "Investment activity is proprietary: Garnet commits its own capital, after its own due diligence, into projects, ventures and structured instruments.",
    ],
  },
  {
    question: "What does Garnet actually do for me that I could not do by approaching a bank myself?",
    category: "financing",
    answer: [
      "Most requests that are declined are not declined because the business is weak. They are declined because the request was not structured or documented in the way the institution needed to see.",
      "Garnet assesses the requirement first, structures it against your cash flow, prepares the documentation, and takes it to the institutions whose appetite matches it. The team stays with the engagement through approval and into repayment coordination.",
    ],
  },
  {
    question: "Can Garnet tell me whether my request is likely to be approved?",
    category: "financing",
    answer: [
      "Garnet can tell you honestly whether a request is one it can take forward and what a financier would need to see. The approval decision belongs to the partner institution, and nothing Garnet says about a request should be read as an offer or an approval.",
    ],
  },
  {
    question: "What information should I have ready before enquiring?",
    category: "financing",
    answer: [
      "A clear description of what the financing is for, an approximate amount, your timeline, and the basic details of the business or individual applying.",
      "The website form deliberately does not ask for financial statements or identity documents. Anything further is discussed directly with the team once the requirement is understood.",
    ],
  },
  {
    question: "Which sectors does Garnet work across?",
    category: "general",
    answer: [
      "Manufacturing, agriculture, retail and FMCG, construction, and import/export trade.",
      "Garnet is based in Nairobi, works nationally across Kenya, and structures regionally across East Africa where a requirement calls for it.",
    ],
  },
  {
    question: "Does Garnet work with individuals as well as businesses?",
    category: "financing",
    answer: [
      "Yes. Alongside SMEs and corporate organisations, Garnet facilitates personal and asset financing for individual clients through its partner institutions.",
    ],
    services: ["personal-consumer-financing"],
  },
  {
    question: "Can Garnet arrange financing for a large-scale project?",
    category: "financing",
    answer: [
      "For qualifying corporate and infrastructure-adjacent undertakings, Garnet sources and arranges financing through a network of offshore and international financiers, structured for the scale, currency and terms such projects require.",
      "Whether a project qualifies is determined case by case, following due diligence.",
    ],
    services: ["business-sme-financing", "project-venture-investment"],
  },
  {
    question: "Can I invest through Garnet?",
    category: "investment",
    answer: [
      "Garnet's investment activity is proprietary: it deploys its own capital into qualifying projects, ventures and structured instruments, and also sources property-based opportunities in partnership with real-estate and financing partners.",
      "Where co-investment opportunities are available, they are published individually with their own risk disclosure. Nothing on this website is an offer, solicitation or recommendation to invest, and no return is promised or implied.",
    ],
  },
  {
    question: "What returns can I expect on an investment?",
    category: "investment",
    answer: [
      "Garnet does not publish or promise returns, and no figure on this website should be read as an indication of performance. Any specific opportunity is discussed directly, with its risk disclosure, before anything is committed.",
    ],
  },
  {
    question: "How does Garnet assess risk?",
    category: "general",
    answer: [
      "Before structuring any financing facilitation, or committing its own capital to an investment, Garnet carries out a due diligence review of the applicant, asset or project.",
      "The review recommends risk-mitigation measures and informs the terms and pricing that are put forward.",
    ],
  },
  {
    question: "Does Garnet's logistics service work independently of its financing?",
    category: "logistics",
    answer: [
      "Yes. Freight, warehousing and distribution are available on their own, and also run alongside a financed trade transaction or equipment purchase where a client wants both handled together.",
    ],
    services: ["logistics"],
  },
  {
    question: "Where does Garnet operate?",
    category: "general",
    answer: [
      "Garnet is headquartered in Nairobi and works across Nairobi and surrounding counties, nationwide in Kenya, and regionally across East Africa.",
    ],
  },
  {
    question: "How long has Garnet been operating?",
    category: "general",
    answer: [
      "Garnet Solutions Limited is a Kenyan-registered company incorporated in 2015, and has operated from Nairobi since.",
    ],
  },
];

export const faqCategories = [
  { id: "financing", label: "Financing" },
  { id: "investment", label: "Investment" },
  { id: "logistics", label: "Logistics" },
  { id: "general", label: "General" },
] as const;

export const faqsByCategory = faqCategories.map((category) => ({
  ...category,
  items: faqs.filter((faq) => faq.category === category.id),
}));

export const faqsForService = (slug: string) => faqs.filter((faq) => faq.services?.includes(slug));