import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId, sanityConfigured } from "../env";

let instance: SanityClient | null = null;

/**
 * Created lazily. The Sanity client throws at construction when no project id
 * is set, which would break the build before the CMS exists - so callers get
 * null and fall back instead.
 */
export function getClient(): SanityClient | null {
  if (!sanityConfigured) return null;
  instance ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return instance;
}
