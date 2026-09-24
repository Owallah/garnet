import Link from "next/link";
import { Section } from "@/components/shared/section";
import { hasUnresolvedGaps, type LegalDocument } from "@/content/legal";

/**
 * Renders a legal document, and refuses to render an unfinished one in
 * production.
 *
 * The bracketed placeholders are useful to the client's lawyer and dangerous
 * to a visitor — a privacy policy that says [RETENTION PERIOD] is worse than
 * no policy, because it looks like a policy. In development the gaps show,
 * marked, so they can be worked through. In production the page states plainly
 * that the document is not yet published and points to the contact page.
 */
export function LegalDocumentView({ document }: { document: LegalDocument }) {
  const incomplete = hasUnresolvedGaps(document);
  const showGaps = process.env.NODE_ENV !== "production";

  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <div className="max-w-3xl">
          <h1 className="type-display text-(length:--text-title)/(--text-title--line-height)">
            {document.title}
          </h1>
          {!incomplete ? (
            <p className="mt-6 text-sm text-muted">
              Last updated {document.lastUpdated}
            </p>
          ) : null}
        </div>
      </Section>

      {incomplete && !showGaps ? (
        <Section>
          <div className="max-w-(--container-prose) border-l-2 border-accent pl-6">
            <p className="text-lg">
              This document is being finalised with our legal advisers and is not yet published.
            </p>
            <p className="mt-4 text-muted">
              If you need to know how we handle your information before then, contact us and we will
              tell you directly.
            </p>
            <Link href="/contact" className="link-draw mt-6 inline-block text-accent">
              Contact us
            </Link>
          </div>
        </Section>
      ) : (
        <Section>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Section index. Long legal documents are navigated, not read. */}
            <nav aria-label="Contents" className="lg:col-span-3">
              <ol className="sticky top-28 space-y-2 border-l border-line pl-5">
                {document.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#section-${index + 1}`}
                      className="link-draw text-sm text-muted hover:text-accent"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="lg:col-span-8 lg:col-start-5">
              {incomplete && showGaps ? (
                <p className="mb-10 border border-dashed border-error px-5 py-4 text-sm text-error">
                  Draft. Bracketed passages are unresolved and must be completed by the client&apos;s
                  legal adviser. This banner and the gaps below are hidden in production, where the
                  page shows a holding message instead.
                </p>
              ) : null}

              <div className="max-w-(--container-prose) space-y-5 text-lg">
                {document.intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-14 space-y-14">
                {document.sections.map((section, index) => (
                  <section
                    key={section.heading}
                    id={`section-${index + 1}`}
                    className="max-w-(--container-prose) scroll-mt-28"
                  >
                    <h2 className="text-2xl">{section.heading}</h2>
                    <div className="mt-5 space-y-4 text-muted">
                      {section.body.map((paragraph) => (
                        <p key={paragraph.slice(0, 30)}>{paragraph}</p>
                      ))}
                    </div>
                    {section.list ? (
                      <ul className="mt-5 space-y-3">
                        {section.list.map((item) => (
                          <li key={item.slice(0, 30)} className="border-l border-line-2 pl-5 text-muted">
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}