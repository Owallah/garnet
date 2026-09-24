import Link from "next/link";
import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeading } from "@/components/shared/section";
import { servicesByCategory } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Financing facilitated through partner institutions, investment using Garnet's own capital, and logistics that moves what the capital pays for.",
  alternates: { canonical: "/services" },
};

const groups = [
  {
    id: "financing",
    title: "Financing",
    note: "Arranged with partner institutions. Garnet does not lend from its own balance sheet.",
    services: servicesByCategory.financing,
  },
  {
    id: "investment",
    title: "Investment",
    note: "Garnet's own capital, committed after its own due diligence.",
    services: servicesByCategory.investment,
  },
  {
    id: "logistics",
    title: "Logistics",
    note: "Delivered and coordinated directly, alongside a financed transaction or on its own.",
    services: servicesByCategory.logistics,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section>
        <SectionHeading
          level={1}
          title="Seven services, two different kinds of money"
          lede="Financing is arranged for you with partner institutions. Investment is Garnet's own capital. The distinction matters, so it is stated on every page it applies to."
        />
      </Section>

      {groups.map((group, groupIndex) => (
        <Section key={group.id} tone={groupIndex === 1 ? "muted" : "light"} className="pt-0 lg:pt-0">
          <div className="border-t border-line pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="text-2xl">{group.title}</h2>
              <p className="max-w-md text-sm text-muted">{group.note}</p>
            </div>

            <ul className="mt-10 grid gap-5 md:grid-cols-2">
              {group.services.map((service, index) => (
                <li key={service.slug} className="grid">
                  <Reveal index={index} className="relief relief-interactive corner-brand-sm">
                    <Link href={`/services/${service.slug}`} className="group flex h-full flex-col p-8 lg:p-10">
                      <h3 className="text-xl">{service.title}</h3>
                      <p className="mt-3 grow text-muted">{service.shortDescription}</p>
                      <span className="link-draw mt-0 text-sm text-accent">Read more</span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}

      <Section tone="dark">
        <div className="max-w-(--container-prose)">
          <h2 className="type-section">Not sure which of these you need?</h2>
          <p className="mt-6 text-lg text-limestone-300">
            Describe the requirement and we will tell you which route fits, or whether it is not yet
            ready to go to a financier.
          </p>
          <ButtonLink href="/request-financing" variant="onDarkSolid" size="lg" className="mt-10">
            Request financing
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
