import Image from "next/image";
import { cn } from "@/lib/utils";
import { getMediaSlot, type MediaSlotId } from "@/content/media";
import type { SanityImage } from "@/sanity/types";

type MediaSlotProps = {
  /** A declared position from the image manifest. Resolves src, alt and brief. */
  slot?: MediaSlotId;
  /** CMS image, which takes priority over anything the manifest declares. */
  image?: SanityImage | null;
  /** Art direction, for slots that are not in the manifest (CMS-driven pages). */
  brief?: string;
  alt?: string;
  ratio?: "16/9" | "4/3" | "3/2" | "1/1" | "3/4" | "21/9";
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const ratioClass: Record<NonNullable<MediaSlotProps["ratio"]>, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "3/2": "aspect-3/2",
  "1/1": "aspect-square",
  "3/4": "aspect-3/4",
  "21/9": "aspect-21/9",
};

/**
 * Resolution order: CMS image, then a licensed local file from the manifest,
 * then an honest labelled placeholder carrying the brief. Never a decorative
 * gradient standing in for a photograph — a placeholder that looks designed
 * stops anyone from noticing the photograph is missing.
 */
export function MediaSlot({
  slot,
  image,
  brief,
  alt,
  ratio = "3/2",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  className,
}: MediaSlotProps) {
  const declared = slot ? getMediaSlot(slot) : undefined;
  const source = image?.url ?? declared?.src ?? null;
  const description = alt ?? image?.alt ?? declared?.alt ?? "";
  const direction = brief ?? declared?.brief ?? "Image to be supplied.";

  if (source) {
    return (
      <figure className={cn("relief relative m-0 overflow-hidden p-0", ratioClass[ratio], className)}>
        <Image
          src={source}
          alt={description}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image?.lqip ? "blur" : "empty"}
          blurDataURL={image?.lqip}
          className="object-cover"
          style={declared?.position ? { objectPosition: declared.position } : undefined}
        />
        {declared?.credit ? (
          <figcaption className="absolute bottom-0 right-0 bg-oxblood-900/70 px-2 py-1 text-2xs text-limestone-200">
            {declared.credit}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${direction}`}
      className={cn(
        "relief-well flex items-end p-5",
        ratioClass[ratio],
        className,
      )}
    >
      <p className="max-w-[42ch] text-sm text-muted">
        <span className="block text-2xs text-muted">Image slot</span>
        {direction}
      </p>
    </div>
  );
}