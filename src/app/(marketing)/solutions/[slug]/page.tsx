import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";
import { MediaSlot } from "@/components/shared/media-slot";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { StickyNarrative } from "@/components/scrolly";
import { sanityFetch } from "@/sanity/lib/fetch";
import { solutionBySlugQuery } from "@/sanity/queries";
import type { Solution } from "@/sanity/types";
import { solutions, solutionsBySlug } from "@/content/solutions";
import type { MediaSlotId } from "@/content/media";
import { servicesBySlug } from "@/content/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

async function resolve(slug: string) {
  const draft = solutionsBySlug.get(slug);
  if (!draft) return null;

  const cms = await sanityFetch<Solution | null>({
    query: solutionBySlugQuery,
    params: { slug },
    tags: ["solution", `solution:${slug}`],
    fallback: null,
  });

  return {
    ...draft,
    title: cms?.title ?? draft.title,
    description: cms?.description ?? draft.description,
    painPoints: cms?.painPoints?.length ? cms.painPoints : draft.painPoints,
    heroImage: cms?.heroImage,
    seo: cms?.seo,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = await resolve(slug);
  if (!solution) return {};
  return {
    title: solution.seo?.title ?? `${solution.title} — financing, investment and logistics`,
    description: solution.seo?.description ?? solution.description,
    alternates: { canonical: `/solutions/${slug}` },
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = await resolve(slug);
  if (!solution) notFound();

  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-4 text-sm text-accent">{solution.audienceLabel}</p>
            <SectionHeading level={1} title={solution.title} lede={solution.description} />
          </div>
          <div className="lg:col-span-5">
            <MediaSlot
              slot={`solution-${slug}` as MediaSlotId}
              image={solution.heroImage}
              ratio="4/3"
              priority
              className="corner-brand"
              brief={solution.imageBrief}
            />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="max-w-(--container-prose) space-y-6 text-lg">
          {solution.overview.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      {/* Scene — what this audience actually arrives with. */}
      <StickyNarrative
        heading="What we are usually asked for"
        steps={solution.painPoints.map((item) => ({
          title: item.title,
          description: item.description ?? "",
        }))}
        numbered={false}
        tone="dark"
      />


      <Section tone="muted">
        <SectionHeading title="Services that apply" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {solution.services.map((serviceSlug, index) => {
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
          <h2 className="type-section">Start the conversation</h2>
          <p className="mt-6 text-lg text-limestone-300">
            Tell us what you need funded or moved, and we will tell you what is workable.
          </p>
          <ButtonLink href="/request-financing" variant="onDarkSolid" size="lg" className="mt-10">
            Request financing
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
