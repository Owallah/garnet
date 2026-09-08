/**
 * Sanity Studio, embedded at /studio.
 * Excluded from robots.txt and from the sitemap.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";
export const metadata = { robots: { index: false, follow: false } };

export default function StudioPage() {
  return <NextStudio config={config} />;
}
