import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeading } from "@/components/shared/section";
import { EmptyState } from "@/components/shared/empty-state";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { sanityFetch } from "@/sanity/lib/fetch";
import { investmentOpportunitiesQuery } from "@/sanity/queries";
import type { InvestmentOpportunity } from "@/sanity/types";
import { servicesByCategory } from "@/content/services";

export const metadata: Metadata = {
  title: "Investments",
  description:
    "Garnet deploys its own capital into qualifying projects, ventures and structured instruments, following its own due diligence.",
  alternates: { canonical: "/investments" },
};

export default async function InvestmentsPage() {
  const opportunities = await sanityFetch<InvestmentOpportunity[]>({
    query: investmentOpportunitiesQuery,
    tags: ["investmentOpportunity"],
    fallback: [],
  });

  return (
    <>
      <Section>
        <SectionHeading
          level={1}
          title="This is the part where Garnet commits its own capital"
          lede="Everything under financing is arranged with partner institutions. Investment is different: Garnet takes the position itself, after its own due diligence."
        />
      </Section>

      <Section tone="muted">
        <ul className="grid gap-5 md:grid-cols-2">
          {[...servicesByCategory.investment].map((service, index) => (
            <li key={service.slug} className="grid">
              <Reveal index={index} className="relief relief-interactive corner-brand-sm">
                <Link href={`/services/${service.slug}`} className="group flex h-full flex-col p-8 lg:p-10">
                  <h2 className="text-2xl">{service.title}</h2>
                  <p className="mt-4 grow text-muted">{service.shortDescription}</p>
                  <ul className="mt-6 space-y-2">
                    {service.capabilities.map((capability) => (
                      <li key={capability.title} className="text-sm text-body">
                        {capability.title}
                      </li>
                    ))}
                  </ul>
                  <span className="link-draw mt-0 text-sm text-accent">Read more</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          title="Due diligence before commitment"
          lede="Project viability, financials and risk are assessed before any capital is committed. The same review determines the terms."
        />
      </Section>

      {/* The section always renders. Opportunities appear only once the client
          publishes approved records; until then it says so rather than
          vanishing, which reads as a bug to whoever is editing the CMS and as
          a dead end to a visitor. */}
      <Section tone="muted">
        <SectionHeading title="Current opportunities" />
        {opportunities.length ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((opportunity, index) => (
              <li key={opportunity._id} className="grid">
                <Reveal index={index} className="relief relief-interactive corner-brand-sm">
                  <Link href={`/investments/${opportunity.slug}`} className="flex h-full flex-col p-8">
                    <h3 className="text-xl">{opportunity.title}</h3>
                    <p className="mt-3 grow text-muted">{opportunity.summary}</p>
                    {opportunity.location ? (
                      <p className="mt-4 text-sm text-muted">{opportunity.location}</p>
                    ) : null}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            className="mt-10"
            title="Nothing open at the moment"
            body="An opportunity is published here only once it has been approved with its own risk disclosure. Tell us what you are looking for and we will be in touch when something fits."
            actionLabel="Send an enquiry"
            actionHref="#enquire"
          />
        )}
      </Section>

      <Section id="enquire" className="scroll-mt-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-10 lg:gap-16">
          <div className="md:col-span-5">
            <h2 className="type-section">
              Discuss an investment
            </h2>
            <p className="mt-6 text-lg text-muted">
              Whether you are bringing a project to Garnet or exploring participation, the
              conversation starts the same way.
            </p>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              We do not ask for financial statements or identity documents here. Those are discussed
              directly once we understand what you have in mind.
            </p>
          </div>

          <div className="md:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </Section>

      {/* Page-level, not form-level. The form carries its own version, but the
          disclosure must not depend on a visitor reaching the bottom of it. */}
      <div className="border-t border-line">
        <div className="shell py-10">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            Nothing on this page is an offer, solicitation or recommendation to invest. No return is
            promised or implied. Any specific opportunity is discussed directly, under its own
            documentation and risk disclosure.
          </p>
        </div>
      </div>
    </>
  );
}
