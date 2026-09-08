import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId, sanityConfigured } from "../env";

let builder: ReturnType<typeof createImageUrlBuilder> | null = null;

export function urlFor(source: Image) {
  if (!sanityConfigured) return null;
  builder ??= createImageUrlBuilder({ projectId, dataset });
  return builder.image(source).auto("format").fit("max");
}
