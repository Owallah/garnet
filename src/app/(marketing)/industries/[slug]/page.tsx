import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { MediaSlot } from "@/components/shared/media-slot";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StickyNarrative } from "@/components/scrolly";
import { sanityFetch } from "@/sanity/lib/fetch";
import { industryBySlugQuery } from "@/sanity/queries";
import type { Industry } from "@/sanity/types";
import { industries, industriesBySlug } from "@/content/industries";
import type { MediaSlotId } from "@/content/media";
import { servicesBySlug } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

async function resolve(slug: string) {
  const draft = industriesBySlug.get(slug);
  if (!draft) return null;

  const cms = await sanityFetch<Industry | null>({
    query: industryBySlugQuery,
    params: { slug },
    tags: ["industry", `industry:${slug}`],
    fallback: null,
  });

  return {
    ...draft,
    title: cms?.title ?? draft.title,
    description: cms?.description ?? draft.description,
    challenges: cms?.challenges?.length ? cms.challenges : draft.challenges,
    heroImage: cms?.heroImage,
    seo: cms?.seo,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = await resolve(slug);
  if (!industry) return {};
  return {
    title: industry.seo?.title ?? `${industry.title} financing and logistics`,
    description: industry.seo?.description ?? industry.description,
    alternates: { canonical: `/industries/${slug}` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = await resolve(slug);
  if (!industry) notFound();

  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 text-sm text-accent">Industry</p>
            <SectionHeading level={1} title={industry.title} lede={industry.description} />
          </div>
          <div className="lg:col-span-5">
            <MediaSlot
              slot={`industry-${slug}` as MediaSlotId}
              image={industry.heroImage}
              ratio="4/3"
              priority
              className="corner-brand"
              brief={industry.imageBrief}
            />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="max-w-(--container-prose) space-y-6 text-lg">
          {industry.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Scene — the sector-specific constraints, one at a time. */}
      <StickyNarrative
        heading="Where capital gets stuck in this sector"
        steps={industry.challenges.map((item) => ({
          title: item.title,
          description: item.description ?? "",
        }))}
        numbered={false}
        tone="dark"
      />


      <Section tone="muted">
        <SectionHeading title="What Garnet brings to it" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {industry.relevantServices.map((serviceSlug, index) => {
            const service = servicesBySlug.get(serviceSlug);
            if (!service) return null;
            return (
              <li key={serviceSlug} className="grid">
                <Reveal index={index} className="relief relief-interactive corner-brand-sm">
                  <Link href={`/services/${serviceSlug}`} className="group flex h-full flex-col p-8">
                    <h3 className="text-xl">{service.title}</h3>
                    <p className="mt-3 grow text-muted">{service.shortDescription}</p>
                    <span className="link-draw mt-0 text-sm text-accent">Read more</span>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="dark">
        <div className="max-w-(--container-prose)">
          <h2 className="type-section">Working in {industry.title.toLowerCase()}?</h2>
          <p className="mt-6 text-lg text-limestone-300">
            Tell us the requirement and we will tell you which route fits it.
          </p>
          <ButtonLink href="/request-financing" variant="onDarkSolid" size="lg" className="mt-10">
            Request financing
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
