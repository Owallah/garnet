import type { PortableTextBlock } from "@portabletext/react";

export type SanityImage = {
  url: string;
  lqip?: string;
  alt?: string;
  aspectRatio?: number;
};

export type Seo = {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export type Cta = {
  heading?: string;
  body?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type FeatureItem = { title: string; description?: string; icon?: string };
export type ProcessStep = { title: string; description?: string };

export type ServiceCategory = "financing" | "investment" | "logistics";

export type ServiceSummary = {
  _id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  heroImage?: SanityImage;
};

export type Service = ServiceSummary & {
  overview?: PortableTextBlock[];
  garnetRole: string;
  capabilities?: FeatureItem[];
  benefits?: FeatureItem[];
  process?: ProcessStep[];
  audience?: string[];
  relatedIndustries?: { title: string; slug: string; description?: string }[];
  relatedSolutions?: { title: string; slug: string; description?: string }[];
  faqs?: Faq[];
  cta?: Cta;
  seo?: Seo;
};

export type Solution = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  heroImage?: SanityImage;
  painPoints?: FeatureItem[];
  process?: ProcessStep[];
  services?: Pick<ServiceSummary, "title" | "slug" | "shortDescription" | "category">[];
  cta?: Cta;
  seo?: Seo;
};

export type Industry = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  heroImage?: SanityImage;
  challenges?: FeatureItem[];
  financingNeeds?: PortableTextBlock[];
  logisticsNeeds?: PortableTextBlock[];
  relevantServices?: Pick<ServiceSummary, "title" | "slug" | "shortDescription">[];
  relevantSolutions?: { title: string; slug: string }[];
  cta?: Cta;
  seo?: Seo;
};

export type TeamMember = {
  _id: string;
  name: string;
  position: string;
  biography?: string;
  linkedin?: string;
  featured?: boolean;
  photo?: SanityImage;
};

export type Faq = {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  category?: "financing" | "investment" | "logistics" | "general";
};

export type InvestmentOpportunity = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  description?: PortableTextBlock[];
  location?: string;
  category: string;
  minimumInvestment?: string;
  status: "open" | "under-review" | "closed";
  featuredImage?: SanityImage;
  gallery?: SanityImage[];
  riskDisclosure?: PortableTextBlock[];
  publishedAt?: string;
  seo?: Seo;
};

export type SiteSettings = {
  companyName?: string;
  tagline?: string;
  email?: string;
  phone?: string[];
  whatsapp?: string;
  address?: string;
  officeHours?: string;
  mapEmbedUrl?: string;
  socialLinks?: { platform: string; url: string }[];
  footerSummary?: string;
  seo?: Seo;
};
