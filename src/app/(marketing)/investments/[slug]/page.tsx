import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { Section, SectionHeading } from "@/components/shared/section";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { MediaSlot } from "@/components/shared/media-slot";
import { sanityFetch } from "@/sanity/lib/fetch";
import { investmentOpportunityBySlugQuery, opportunitySlugsQuery } from "@/sanity/queries";
import type { InvestmentOpportunity } from "@/sanity/types";

type Props = { params: Promise<{ slug: string }> };

/**
 * Opportunity pages exist only for records the client has published with an
 * approved risk disclosure. No opportunity in Sanity means no route — the
 * template must never render an example.
 */
export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>({
    query: opportunitySlugsQuery,
    tags: ["investmentOpportunity"],
    fallback: [],
  });
  return slugs.map((slug) => ({ slug }));
}

async function getOpportunity(slug: string) {
  return sanityFetch<InvestmentOpportunity | null>({
    query: investmentOpportunityBySlugQuery,
    params: { slug },
    tags: ["investmentOpportunity", `investmentOpportunity:${slug}`],
    fallback: null,
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const opportunity = await getOpportunity(slug);
  if (!opportunity) return {};
  return {
    title: opportunity.seo?.title ?? opportunity.title,
    description: opportunity.seo?.description ?? opportunity.summary,
    alternates: { canonical: `/investments/${slug}` },
  };
}

/** Opportunity categories map onto the enquiry form's interest options. */
const interestForCategory: Record<string, "structured-fixed-income" | "real-estate" | "project" | "venture" | "general"> = {
  "structured-fixed-income": "structured-fixed-income",
  "real-estate": "real-estate",
  project: "project",
  venture: "venture",
  corporate: "venture",
};

export default async function OpportunityPage({ params }: Props) {
  const { slug } = await params;
  const opportunity = await getOpportunity(slug);

  if (!opportunity || opportunity.status === "closed") notFound();

  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading level={1} title={opportunity.title} lede={opportunity.summary} />
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {opportunity.location ? (
                <div>
                  <dt className="text-sm text-muted">Location</dt>
                  <dd className="mt-1 text-ink">{opportunity.location}</dd>
                </div>
              ) : null}
              <div>
                <dt className="text-sm text-muted">Status</dt>
                <dd className="mt-1 text-ink">{opportunity.status}</dd>
              </div>
              {/* Rendered only when the client has approved a figure. */}
              {opportunity.minimumInvestment ? (
                <div>
                  <dt className="text-sm text-muted">Minimum</dt>
                  <dd className="mt-1 text-ink">{opportunity.minimumInvestment}</dd>
                </div>
              ) : null}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <MediaSlot
              image={opportunity.featuredImage}
              ratio="4/3"
              priority
              brief="Opportunity image supplied and approved by the client."
            />
          </div>
        </div>
      </Section>

      {opportunity.description ? (
        <Section tone="muted">
          <div className="max-w-(--container-prose) space-y-5 text-lg">
            <PortableText value={opportunity.description} />
          </div>
        </Section>
      ) : null}

      <Section tone="muted">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="type-display text-(length:--text-opener)/(--text-opener--line-height)">
              Enquire about this opportunity
            </h2>
            <p className="mt-6 text-lg text-muted">
              Tell us what you would like to know and a member of the team will come back to you.
            </p>
          </div>
          <div className="lg:col-span-7">
            <EnquiryForm
              opportunitySlug={opportunity.slug}
              opportunityTitle={opportunity.title}
              defaultInterest={interestForCategory[opportunity.category] ?? "general"}
            />
          </div>
        </div>
      </Section>

      {opportunity.riskDisclosure ? (
        <Section>
          <div className="max-w-(--container-prose) border-l-2 border-accent pl-6">
            <h2 className="text-2xl">Risk disclosure</h2>
            <div className="mt-4 space-y-4 text-muted">
              <PortableText value={opportunity.riskDisclosure} />
            </div>
          </div>
        </Section>
      ) : null}
    </>
  );
}
