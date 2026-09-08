import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeading } from "@/components/shared/section";
import { sanityFetch } from "@/sanity/lib/fetch";
import { teamQuery } from "@/sanity/queries";
import type { TeamMember } from "@/sanity/types";
import { leadership } from "@/content/company";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The directors and managers responsible for Garnet's financing, investment, logistics and governance functions.",
  alternates: { canonical: "/about/leadership" },
};

/** Initials stand in until the client supplies photographs. */
function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter((part) => /^[A-Za-z]/.test(part))
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="relief-well corner-brand-sm flex aspect-4/5 items-center justify-center">
      <span className="text-4xl text-ink/40">{initials}</span>
    </div>
  );
}

export default async function LeadershipPage() {
  const cms = await sanityFetch<TeamMember[]>({ query: teamQuery, tags: ["teamMember"], fallback: [] });

  const team = cms.length
    ? cms
    : leadership.map((person) => ({
        _id: person.name,
        name: person.name,
        position: person.position,
        biography: person.biography,
        photo: undefined,
      }));

  return (
    <>
      <Section>
        <SectionHeading
          level={1}
          title="The people accountable for the work"
          lede="Garnet's leadership covers governance, business development, finance, human capital and administration."
        />
      </Section>

      <Section tone="muted" className="pt-0 lg:pt-0">
        <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person) => (
            <li key={person._id}>
              {person.photo?.url ? (
                <div className="relief corner-brand-sm relative aspect-4/5 overflow-hidden">
                  <Image
                    src={person.photo.url}
                    alt={person.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <Initials name={person.name} />
              )}
              <h2 className="mt-6 text-xl">{person.name}</h2>
              <p className="mt-1 text-sm text-accent">{person.position}</p>
              {person.biography ? (
                <p className="mt-4 text-muted">{person.biography}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
