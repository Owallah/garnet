import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/shared/section";
import { faqCategories, faqsByCategory as draftFaqsByCategory, faqs as draftFaqs } from "@/content/faqs";
import { sanityFetch } from "@/sanity/lib/fetch";
import { faqsQuery } from "@/sanity/queries";
import type { Faq } from "@/sanity/types";
import { absoluteUrl } from "@/lib/utils";
import { PortableText } from "@portabletext/react";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "How Garnet facilitates financing through partner institutions, how its proprietary investment activity differs, and what to have ready before enquiring.",
  alternates: { canonical: "/faqs" },
};

type ResolvedFaq = {
  id: string;
  question: string;
  /** One of the two is set: blocks from Sanity, paragraphs from the drafts. */
  blocks?: Faq["answer"];
  paragraphs?: string[];
};

export default async function FaqsPage() {
  const cms = await sanityFetch<Faq[]>({ query: faqsQuery, tags: ["faq"], fallback: [] });

  const grouped = faqCategories.map((category) => ({
    ...category,
    items: cms.length
      ? cms
          .filter((faq) => faq.category === category.id)
          .map<ResolvedFaq>((faq) => ({ id: faq._id, question: faq.question, blocks: faq.answer }))
      : draftFaqsByCategory
          .find((group) => group.id === category.id)!
          .items.map<ResolvedFaq>((faq) => ({
            id: faq.question,
            question: faq.question,
            paragraphs: faq.answer,
          })),
  })).filter((category) => category.items.length > 0);

  /* FAQPage structured data — the page genuinely is a Q&A list, so it
     qualifies. Built from the drafts, which always have plain-text answers;
     Portable Text would need flattening and Google only reads the text. */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl("/faqs"),
    mainEntity: draftFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Section>
        <SectionHeading
          level={1}
          title="Questions people ask before they get in touch"
          lede="Starting with the one that matters most: Garnet does not lend its own money to clients."
        />
      </Section>

      <Section className="pt-0 lg:pt-0">
        <div className="grid gap-14 lg:grid-cols-12">
          <nav aria-label="FAQ categories" className="lg:col-span-3">
            <ul className="sticky top-28 space-y-2 border-l border-limestone-200 pl-5">
              {grouped.map((category) => (
                <li key={category.id}>
                  <a href={`#${category.id}`} className="text-sm text-graphite-muted hover:text-garnet-700">
                    {category.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-9">
            {grouped.map((category) => (
              <section key={category.id} id={category.id} className="scroll-mt-28 pb-14 last:pb-0">
                <h2 className="text-2xl">{category.label}</h2>
                <div className="mt-6">
                  {category.items.map((faq) => (
                    <details key={faq.id} className="group border-b border-limestone-200 py-5">
                      <summary className="cursor-pointer list-none text-lg text-oxblood-900 marker:hidden">
                        {faq.question}
                      </summary>
                      <div className="mt-4 max-w-(--container-prose) space-y-4 text-graphite-muted">
                        {faq.blocks ? (
                          <PortableText value={faq.blocks} />
                        ) : (
                          faq.paragraphs?.map((paragraph) => (
                            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                          ))
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="dark">
        <div className="max-w-(--container-prose)">
          <h2 className="text-3xl lg:text-4xl">Still not sure?</h2>
          <p className="mt-6 text-lg text-limestone-300">
            Ask directly. A short description of the requirement is enough to start.
          </p>
          <ButtonLink href="/contact" variant="onDarkSolid" size="lg" className="mt-10">
            Contact the team
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}