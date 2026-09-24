import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ButtonLink } from "@/components/ui/button";
import { MediaSlot } from "@/components/shared/media-slot";
import { Section, SectionHeading } from "@/components/shared/section";
import { StickyNarrative } from "@/components/scrolly";
import { sanityFetch } from "@/sanity/lib/fetch";
import { serviceBySlugQuery } from "@/sanity/queries";
import type { Service } from "@/sanity/types";
import { services, servicesBySlug } from "@/content/services";
import type { MediaSlotId } from "@/content/media";
import { faqsForService } from "@/content/faqs";
import { industriesBySlug } from "@/content/industries";
import { solutionsBySlug } from "@/content/solutions";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/**
 * Sanity wins field by field; the drafted content fills whatever the CMS has
 * not been given yet. That way an editor can rewrite one section without
 * emptying the rest of the page.
 */
async function resolve(slug: string) {
  const draft = servicesBySlug.get(slug);
  if (!draft) return null;

  const cms = await sanityFetch<Service | null>({
    query: serviceBySlugQuery,
    params: { slug },
    tags: ["service", `service:${slug}`],
    fallback: null,
  });

  return {
    title: cms?.title ?? draft.title,
    shortDescription: cms?.shortDescription ?? draft.shortDescription,
    overviewBlocks: cms?.overview,
    overview: draft.overview,
    garnetRole: cms?.garnetRole ?? draft.garnetRole,
    capabilities: cms?.capabilities?.length ? cms.capabilities : draft.capabilities,
    process: cms?.process?.length ? cms.process : draft.process,
    audience: cms?.audience?.length ? cms.audience : draft.audience,
    heroImage: cms?.heroImage,
    imageBrief: draft.imageBrief,
    relatedIndustries: draft.relatedIndustries,
    relatedSolutions: draft.relatedSolutions,
    faqs: faqsForService(slug),
    seo: cms?.seo,
    slug,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await resolve(slug);
  if (!service) return {};

  return {
    title: service.seo?.title ?? service.title,
    description: service.seo?.description ?? service.shortDescription,
    alternates: { canonical: `/services/${slug}` },
    robots: service.seo?.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await resolve(slug);
  if (!service) notFound();

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: service.title, item: absoluteUrl(`/services/${slug}`) },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Section>
        <nav aria-label="Breadcrumb" className="mb-10 text-sm text-muted">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/" className="hover:text-ink">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/services" className="hover:text-ink">Services</Link></li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="text-ink">{service.title}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading level={1} title={service.title} lede={service.shortDescription} />
            <ButtonLink href="/request-financing" size="lg" className="mt-10">
              Request financing
            </ButtonLink>
          </div>
          <div className="lg:col-span-5">
            <MediaSlot
              slot={`service-${slug}` as MediaSlotId}
              image={service.heroImage}
              ratio="4/3"
              priority
              className="corner-brand"
              brief={service.imageBrief}
            />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-3xl lg:col-span-4">Context</h2>
          <div className="space-y-6 text-lg lg:col-span-8">
            {service.overviewBlocks ? (
              <PortableText value={service.overviewBlocks} />
            ) : (
              service.overview.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
            )}
          </div>
        </div>
      </Section>

      {/* Scene 1 — capabilities. Unnumbered: they are a set, not an order. */}
      <StickyNarrative
        heading="What this covers"
        steps={service.capabilities.map((item) => ({
          title: item.title,
          description: item.description ?? "",
        }))}
        numbered={false}
      />


      {/* The load-bearing section. Never remove it from this template. */}
      <Section tone="dark">
        <div className="max-w-(--container-prose)">
          <h2 className="text-3xl">Garnet&apos;s role</h2>
          <p className="mt-6 text-lg leading-relaxed text-limestone-200">{service.garnetRole}</p>
        </div>
      </Section>

      {service.audience.length ? (
        <Section>
          <SectionHeading title="Who this is for" />
          <ul className="mt-10 flex flex-wrap gap-3">
            {service.audience.map((audience) => (
              <li key={audience} className="border border-line-2 px-5 py-2.5 text-sm text-ink">
                {audience}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {/* Scene 2 — the process. Numbered, because a requirement moves
          through these in order. */}
      <StickyNarrative
        heading="How it works"
        steps={service.process.map((step) => ({
          title: step.title,
          description: step.description ?? "",
        }))}
        tone="dark"
      />


      {service.relatedIndustries.length || service.relatedSolutions.length ? (
        <Section>
          <div className="grid gap-14 lg:grid-cols-2">
            {service.relatedIndustries.length ? (
              <div>
                <h2 className="text-2xl">Relevant industries</h2>
                <ul className="mt-6 space-y-4">
                  {service.relatedIndustries.map((industrySlug) => {
                    const industry = industriesBySlug.get(industrySlug);
                    if (!industry) return null;
                    return (
                      <li key={industrySlug} className="relief relief-interactive corner-brand-sm">
                        <Link
                          href={`/industries/${industrySlug}`}
                          className="group flex items-center justify-between gap-4 p-5"
                        >
                          <span>{industry.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {service.relatedSolutions.length ? (
              <div>
                <h2 className="text-2xl">Who we work with</h2>
                <ul className="mt-6 space-y-4">
                  {service.relatedSolutions.map((solutionSlug) => {
                    const solution = solutionsBySlug.get(solutionSlug);
                    if (!solution) return null;
                    return (
                      <li key={solutionSlug} className="relief relief-interactive corner-brand-sm">
                        <Link
                          href={`/solutions/${solutionSlug}`}
                          className="group flex items-center justify-between gap-4 p-5"
                        >
                          <span>{solution.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {service.faqs.length ? (
        <Section tone="muted">
          <SectionHeading title="Questions about this service" />
          <div className="mt-10 max-w-(--container-prose)">
            {service.faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-line-2 py-5">
                <summary className="cursor-pointer list-none text-lg text-ink marker:hidden">
                  {faq.question}
                </summary>
                <div className="mt-4 space-y-4 text-muted">
                  {faq.answer.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </Section>
      ) : null}

      <Section tone="dark">
        <div className="max-w-(--container-prose)">
          <h2 className="text-3xl lg:text-4xl">Tell us about the requirement</h2>
          <p className="mt-6 text-lg text-limestone-300">
            Four short steps. No documents, no obligation, and an honest answer about what is
            workable.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/request-financing" variant="onDarkSolid" size="lg">
              Request financing
            </ButtonLink>
            <ButtonLink href="/contact" variant="onDark" size="lg">
              Contact the team
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
