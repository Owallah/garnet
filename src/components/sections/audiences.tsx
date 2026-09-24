import Link from "next/link";
import { Section } from "@/components/shared/section";
import { MediaSlot } from "@/components/shared/media-slot";
import { solutions } from "@/content/solutions";
import type { MediaSlotId } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Editorial rows rather than three identical cards: each audience gets an
 * asymmetric split that alternates side, and the first row runs wider than
 * the two beneath it.
 */
/** Each audience's declared image position, in the order the cards appear. */
const audienceSlots: Record<string, MediaSlotId> = {
  smes: "solution-smes",
  corporates: "solution-corporates",
  individuals: "solution-individuals",
};

export function Audiences() {
  return (
    <Section tone="muted">
      <h2 className="max-w-2xl type-section">
        Different clients, different first question
      </h2>

      <ul className="mt-16 space-y-16 lg:space-y-20">
        {solutions.map((solution, index) => (
          <li key={solution.slug}>
            <Link
              href={`/solutions/${solution.slug}`}
              className="group grid items-center gap-8 border-t border-line-2 pt-10 md:grid-cols-12 md:gap-10 lg:gap-14"
            >
              <div className={cn("md:col-span-5", index % 2 === 1 && "md:order-2")}>
                <MediaSlot
                  slot={audienceSlots[solution.slug]}
                  ratio={index === 0 ? "3/2" : "4/3"}
                  className="corner-brand-sm"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  brief={solution.imageBrief}
                />
              </div>

              <div className={cn("md:col-span-7", index % 2 === 1 && "md:order-1")}>
                <p className="text-sm text-accent">{solution.audienceLabel}</p>
                <h3 className="mt-3 text-3xl">{solution.title}</h3>
                <p className="mt-5 max-w-xl text-lg text-muted">{solution.description}</p>
                <span className="link-draw mt-7 inline-block text-sm text-accent">
                  How we work with {solution.title.toLowerCase()}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}