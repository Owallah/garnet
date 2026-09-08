import type { MetadataRoute } from "next";
import { navigation } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/fetch";
import { opportunitySlugsQuery } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "/",
    "/about",
    "/about/approach",
    "/about/leadership",
    "/services",
    "/solutions",
    "/industries",
    "/investments",
    "/faqs",
    "/contact",
    "/request-financing",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  const contentRoutes = [
    ...navigation.services.map((item) => `/services/${item.slug}`),
    ...navigation.solutions.map((item) => `/solutions/${item.slug}`),
    ...navigation.industries.map((item) => `/industries/${item.slug}`),
  ];

  const opportunities = await sanityFetch<string[]>({
    query: opportunitySlugsQuery,
    tags: ["investmentOpportunity"],
    fallback: [],
  });

  return [...staticRoutes, ...contentRoutes, ...opportunities.map((slug) => `/investments/${slug}`)].map(
    (path) => ({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : path.split("/").length > 2 ? 0.6 : 0.8,
    }),
  );
}
