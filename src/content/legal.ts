/**
 * LEGAL SCAFFOLDING — NOT LEGAL ADVICE, NOT READY TO PUBLISH.
 *
 * These two documents are a structure for Garnet's lawyer to complete, built
 * around what the site actually does: it collects names, contact details,
 * county, industry, an amount band and a free-text purpose through three
 * forms, and it passes those details to financing partners. That is personal
 * data under Kenya's Data Protection Act 2019, and in some cases financial
 * information about a business.
 *
 * Everything wrapped in [SQUARE BRACKETS] is a decision the client or their
 * counsel must make. The page refuses to render any section that still
 * contains a bracket in production, so an unfinished document cannot go live
 * by accident — see `hasUnresolvedGaps` below.
 *
 * Specific items to raise with counsel:
 *   1. ODPC registration. Kenya's Office of the Data Protection Commissioner
 *      requires registration of data controllers and processors above certain
 *      thresholds. Confirm whether Garnet is registered and include the
 *      registration number if so.
 *   2. Data Protection Officer. Confirm whether one is required and who it is.
 *   3. Retention periods. How long an unsuccessful enquiry is kept.
 *   4. Onward transfer. Naming financing partners, or describing them by
 *      category, and whether any sit outside Kenya — offshore financiers
 *      would make this a cross-border transfer with its own requirements.
 *   5. Whether Garnet is a licensed entity of any kind. The site currently
 *      claims no licence, which is the safe position unless one exists.
 */

export type LegalSection = {
  heading: string;
  body: string[];
  /** Rendered as a list beneath the body where present. */
  list?: string[];
};

export type LegalDocument = {
  title: string;
  intro: string[];
  /** ISO date. Update whenever the text changes. */
  lastUpdated: string;
  sections: LegalSection[];
};

const GAP = /\[[A-Z][^\]]*\]/;

/** True when any bracketed placeholder is still unresolved. */
export function hasUnresolvedGaps(document: LegalDocument): boolean {
  const strings = [
    ...document.intro,
    ...document.sections.flatMap((section) => [...section.body, ...(section.list ?? [])]),
  ];
  return strings.some((text) => GAP.test(text));
}

export const privacyPolicy: LegalDocument = {
  title: "Privacy policy",
  lastUpdated: "[DATE OF PUBLICATION]",
  intro: [
    "This policy explains what Garnet Solutions Limited does with personal data collected through this website, and what rights you have over it under the Data Protection Act 2019.",
    "It covers this website only. It does not cover what a financing partner does with your details once a request has been passed to them — those institutions are separate data controllers with their own policies.",
  ],
  sections: [
    {
      heading: "Who we are",
      body: [
        "Garnet Solutions Limited is a company registered in Kenya, incorporated in 2015, with its office in Nairobi. For the purposes of the Data Protection Act 2019, Garnet is the data controller for personal data collected through this website.",
        "[REGISTERED COMPANY NUMBER AND REGISTERED OFFICE ADDRESS]",
        "[ODPC REGISTRATION NUMBER, OR A STATEMENT THAT REGISTRATION IS NOT REQUIRED]",
        "[NAME AND CONTACT DETAILS OF THE DATA PROTECTION OFFICER, OR OF THE PERSON RESPONSIBLE FOR DATA PROTECTION QUERIES]",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "We only collect what you type into one of the forms on this site. We do not ask for financial statements, identity documents or bank records through this website.",
        "Through the financing request form:",
      ],
      list: [
        "Your name, and your company name where you give one",
        "Your email address and phone number",
        "The county you operate in and your industry",
        "The type of financing you are looking for and who is applying",
        "An approximate amount as a range, the currency, your timeline, and what the financing is for",
        "Anything else you choose to write in the free-text fields",
      ],
    },
    {
      heading: "What we collect through the other forms",
      body: [
        "The contact form and investment enquiry form collect your name, email address, phone number, organisation where given, the topic of your enquiry, and your message.",
        "Our servers also record technical information necessary to operate the site securely, including the IP address a submission came from, which is used to limit the rate of submissions and to detect automated abuse. [CONFIRM RETENTION PERIOD FOR THESE LOGS WITH THE HOSTING PROVIDER.]",
      ],
    },
    {
      heading: "Why we use it, and our lawful basis",
      body: [
        "Under section 30 of the Data Protection Act 2019, processing must have a lawful basis. Ours are:",
      ],
      list: [
        "Consent — you tick a box before submitting any form, and you can withdraw that consent at any time by contacting us. Withdrawing it does not affect anything done before you withdrew it.",
        "Steps taken at your request before entering into a contract — assessing your requirement, structuring it, and approaching financing partners on your behalf is the thing you asked us to do.",
        "Our legitimate interests — keeping this website secure and preventing automated abuse, in a way that does not override your rights.",
      ],
    },
    {
      heading: "Who we share it with",
      body: [
        "To do what you have asked, we share the details of a financing request with the partner institutions we believe are best suited to it. We share only what is necessary for that institution to assess the request.",
        "[DESCRIBE THE CATEGORIES OF PARTNER — BANKS, ASSET-FINANCE PROVIDERS, TRADE-FINANCE PROVIDERS, INSURERS — AND CONFIRM WHETHER ANY ARE TO BE NAMED.]",
        "[CONFIRM WHETHER ANY PARTNER IS LOCATED OUTSIDE KENYA. OFFSHORE AND INTERNATIONAL FINANCIERS WOULD MAKE THIS A CROSS-BORDER TRANSFER, WHICH REQUIRES ITS OWN BASIS UNDER PART VI OF THE ACT AND MUST BE DESCRIBED HERE.]",
        "We also use service providers to run the website and send email on our behalf. They process data only on our instructions.",
        "[LIST THE PROCESSORS ACTUALLY USED — HOSTING, EMAIL DELIVERY, CONTENT MANAGEMENT — AND WHERE EACH STORES DATA.]",
        "We do not sell personal data, and we do not share it for anyone else's marketing.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "[SET A RETENTION PERIOD FOR EACH CATEGORY. FOR EXAMPLE: ENQUIRIES THAT DO NOT PROCEED ARE DELETED AFTER X MONTHS; RECORDS RELATING TO A FACILITY THAT WAS ARRANGED ARE KEPT FOR Y YEARS TO MEET TAX AND ANTI-MONEY-LAUNDERING OBLIGATIONS.]",
        "We do not keep personal data longer than we need it for the purpose it was collected for, or longer than the law requires us to.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Under the Data Protection Act 2019 you have the right to be informed about how your data is used, to access a copy of it, to have inaccurate data corrected, to have data deleted, to object to processing, and to be given your data in a portable form.",
        "To exercise any of these, contact us using the details on our contact page. We will respond within the period the Act requires.",
        "If you are unhappy with how we have handled your data, you can complain to the Office of the Data Protection Commissioner.",
      ],
    },
    {
      heading: "Cookies and analytics",
      body: [
        "[CONFIRM WHETHER ANY ANALYTICS OR MARKETING TOOL IS IN USE. IF NONE IS, STATE PLAINLY THAT THE SITE SETS NO ANALYTICS OR ADVERTISING COOKIES AND REMOVE THE CONSENT BANNER. IF ONE IS ADDED LATER, THIS SECTION AND A CONSENT MECHANISM BOTH BECOME REQUIRED.]",
      ],
    },
    {
      heading: "Security",
      body: [
        "Form submissions are transmitted over an encrypted connection. Access to enquiry data is limited to the members of the Garnet team who need it. Credentials for the services we use are held server-side and are never exposed to your browser.",
      ],
    },
    {
      heading: "Changes to this policy",
      body: [
        "We update this policy when what we do with data changes. The date at the top shows when it last changed.",
      ],
    },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms and conditions",
  lastUpdated: "[DATE OF PUBLICATION]",
  intro: [
    "These terms govern your use of this website. They are not the terms of any financing, investment or logistics engagement — those are agreed separately and in writing.",
  ],
  sections: [
    {
      heading: "About this website",
      body: [
        "This website is operated by Garnet Solutions Limited, a company registered in Kenya with its office in Nairobi.",
        "[REGISTERED COMPANY NUMBER AND REGISTERED OFFICE ADDRESS]",
      ],
    },
    {
      heading: "This site is information, not an offer",
      body: [
        "Nothing on this website is an offer of finance, a commitment to arrange finance, an offer of any investment, a solicitation to invest, or a recommendation to buy or sell anything.",
        "Submitting the financing request form is an enquiry. It is not an application to a lender, it creates no obligation on either side, and no facility exists until a partner institution approves one and you sign its documentation.",
      ],
    },
    {
      heading: "How Garnet's services work",
      body: [
        "Garnet does not lend from its own balance sheet for client financing needs. It assesses and structures financing requirements and facilitates them with banking, asset-finance and trade-finance partners. The decision to approve or decline any facility, and the terms of it, belong to that institution and not to Garnet.",
        "Garnet's investment activity is separate and proprietary: it deploys its own capital into qualifying projects, ventures and instruments. Any co-investment opportunity is offered under its own documentation, not under these terms.",
      ],
    },
    {
      heading: "No guarantees about outcomes or returns",
      body: [
        "We do not guarantee that any financing request will be approved, that any facility will be offered on particular terms, or that any timeline will be met.",
        "Where investment opportunities are described on this site, past performance is not a guide to future performance, no return is promised or implied, and the value of an investment can fall as well as rise.",
      ],
    },
    {
      heading: "Not professional advice",
      body: [
        "The content of this site is general information about Garnet's services. It is not financial, investment, legal, tax or accounting advice, and it does not take account of your particular circumstances. Take your own professional advice before acting.",
      ],
    },
    {
      heading: "Accuracy",
      body: [
        "We take care to keep this site accurate and current, but we do not warrant that it is free of error, or that it will always be available. We may change or remove content at any time without notice.",
      ],
    },
    {
      heading: "Links to other sites",
      body: [
        "Where we link to another organisation's website, we do not control it and are not responsible for its content or its privacy practices.",
      ],
    },
    {
      heading: "Intellectual property",
      body: [
        "The content, design, logo and trade marks on this site belong to Garnet Solutions Limited or its licensors. You may read and share the pages; you may not reproduce the content commercially without written permission.",
      ],
    },
    {
      heading: "Limitation of liability",
      body: [
        "[TO BE DRAFTED BY COUNSEL. THIS CLAUSE MUST BE WRITTEN FOR KENYAN LAW AND MUST NOT PURPORT TO EXCLUDE LIABILITY THAT CANNOT LAWFULLY BE EXCLUDED, INCLUDING FOR FRAUD OR FOR DEATH AND PERSONAL INJURY.]",
      ],
    },
    {
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of Kenya, and the courts of Kenya have exclusive jurisdiction over any dispute arising from them.",
      ],
    },
    {
      heading: "Contact",
      body: [
        "Questions about these terms can be sent to us using the details on our contact page.",
      ],
    },
  ],
};