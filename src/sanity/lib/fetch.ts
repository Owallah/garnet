import "server-only";
import { getClient } from "./client";

/**
 * Server-side fetch with tag-based revalidation.
 *
 * Returns `fallback` instead of throwing when Sanity is not yet configured or
 * a query fails, so the site builds and renders before the CMS exists. Every
 * caller must therefore handle an empty result.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  fallback: T;
}): Promise<T> {
  const client = getClient();
  if (!client) return fallback;

  try {
    return await client.fetch<T>(query, params, {
      next: { tags, revalidate: 3600 },
      token: process.env.SANITY_API_READ_TOKEN,
    });
  } catch (error) {
    console.error("[sanity] query failed:", error);
    return fallback;
  }
}
