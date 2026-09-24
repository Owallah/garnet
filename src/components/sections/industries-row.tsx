import Link from "next/link";
import { Section } from "@/components/shared/section";
import { industries } from "@/content/industries";

/**
 * Five sectors as a single ruled list. Each row states where capital gets
 * stuck in that sector, so the list carries information rather than acting as
 * a nav menu with five identical tiles.
 */
export function IndustriesRow() {
  return (
    <Section tone="muted">
      <div className="grid gap-8 lg:grid-cols-12">
        <h2 className="type-display text-(length:--text-opener)/(--text-opener--line-height) lg:col-span-6">
          Every sector holds its capital somewhere different
        </h2>
        <p className="text-lg text-muted lg:col-span-5 lg:col-start-8">
          Manufacturing ties it up in machinery. Agriculture ties it to a season. Trade ties it to
          transit. The financing that fits follows from that.
        </p>
      </div>

      <ul className="mt-14">
        {industries.map((industry) => (
          <li key={industry.slug} className="border-t border-line-2 last:border-b">
            <Link
              href={`/industries/${industry.slug}`}
              className="group relief-interactive grid gap-2 rounded-(--radius-md) border border-transparent px-4 py-7 hover:border-line hover:bg-(image:--gradient-raised) hover:shadow-(--shadow-relief-sm) lg:grid-cols-12 lg:gap-8"
            >
              <span className="text-2xl text-ink lg:col-span-4">
                <span className="link-draw">{industry.title}</span>
              </span>
              <span className="text-muted lg:col-span-8">{industry.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}