import Link from "next/link";
import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/shared/section";
import { industries } from "@/content/industries";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "The sectors Garnet works across in Kenya and East Africa: manufacturing, agriculture, retail and FMCG, construction, and import/export.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <Section>
        <SectionHeading
          level={1}
          title="Every sector holds its capital in a different place"
          lede="Manufacturing ties it up in machinery. Agriculture ties it to a season. Trade ties it to transit. The financing that fits follows from that."
        />
      </Section>

      <Section className="pt-0 lg:pt-0">
        <ul className="grid gap-5 lg:grid-cols-2">
          {industries.map((industry) => (
            <li key={industry.slug} className="relief relief-interactive corner-brand-sm">
              <Link href={`/industries/${industry.slug}`} className="group flex h-full flex-col p-8 lg:p-10">
                <h2 className="text-2xl">{industry.title}</h2>
                <p className="mt-4 grow text-muted">{industry.description}</p>
                <span className="link-draw mt-0 text-sm text-accent">Read more</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
