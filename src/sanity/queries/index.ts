import { groq } from "next-sanity";

const seoProjection = `seo { title, description, canonical, noIndex, "ogImage": ogImage.asset->url }`;
const imageProjection = `{ "url": asset->url, "lqip": asset->metadata.lqip, alt, "aspectRatio": asset->metadata.dimensions.aspectRatio }`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName, tagline, email, phone, whatsapp, address, officeHours, mapEmbedUrl,
  socialLinks[]{ platform, url }, footerSummary, ${seoProjection}
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  _id, title, "slug": slug.current, category, shortDescription,
  "heroImage": heroImage${imageProjection}
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, category, shortDescription, overview, garnetRole,
  "heroImage": heroImage${imageProjection},
  capabilities[]{ title, description, icon },
  benefits[]{ title, description, icon },
  process[]{ title, description },
  audience,
  "relatedIndustries": relatedIndustries[]->{ title, "slug": slug.current, description },
  "relatedSolutions": relatedSolutions[]->{ title, "slug": slug.current, description },
  "faqs": faqs[]->{ _id, question, answer },
  cta, ${seoProjection}
}`;

export const serviceSlugsQuery = groq`*[_type == "service" && defined(slug.current)][].slug.current`;

export const solutionBySlugQuery = groq`*[_type == "solution" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, description,
  "heroImage": heroImage${imageProjection},
  painPoints[]{ title, description, icon },
  process[]{ title, description },
  "services": services[]->{ title, "slug": slug.current, shortDescription, category },
  cta, ${seoProjection}
}`;

export const industryBySlugQuery = groq`*[_type == "industry" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, description, financingNeeds, logisticsNeeds,
  "heroImage": heroImage${imageProjection},
  challenges[]{ title, description, icon },
  "relevantServices": relevantServices[]->{ title, "slug": slug.current, shortDescription },
  "relevantSolutions": relevantSolutions[]->{ title, "slug": slug.current },
  cta, ${seoProjection}
}`;

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc){
  _id, name, position, biography, linkedin, featured,
  "photo": photo{ "url": asset->url, "lqip": asset->metadata.lqip }
}`;

export const faqsQuery = groq`*[_type == "faq" && published == true] | order(order asc){
  _id, question, answer, category
}`;

export const investmentOpportunitiesQuery = groq`*[_type == "investmentOpportunity" && status != "closed"] | order(publishedAt desc){
  _id, title, "slug": slug.current, summary, location, category, status, publishedAt,
  "featuredImage": featuredImage${imageProjection}
}`;

export const investmentOpportunityBySlugQuery = groq`*[_type == "investmentOpportunity" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, summary, description, location, category,
  minimumInvestment, status, riskDisclosure, publishedAt,
  "featuredImage": featuredImage${imageProjection},
  "gallery": gallery[]{ "url": asset->url, "lqip": asset->metadata.lqip },
  ${seoProjection}
}`;

export const opportunitySlugsQuery = groq`*[_type == "investmentOpportunity" && status == "open" && defined(slug.current)][].slug.current`;

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title, "slug": slug.current, intro, body, ${seoProjection}
}`;
