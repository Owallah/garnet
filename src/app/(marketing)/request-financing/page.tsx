import type { Metadata } from "next";
import { FinancingForm } from "@/components/forms/financing-form";
import { Section } from "@/components/shared/section";
import { method } from "@/content/company";

export const metadata: Metadata = {
  title: "Request financing",
  description:
    "Tell Garnet what you are financing. Four short steps, no documents, and an honest answer about what a financier would need to see.",
  alternates: { canonical: "/request-financing" },
};

/**
 * The form is the page. The supporting column states what happens next and
 * what is not being asked for, because the two things that stop people
 * completing a finance form are not knowing where it goes and expecting to be
 * asked for documents.
 */
export default function RequestFinancingPage() {
  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <div className="max-w-3xl">
          <h1 className="type-display text-(length:--text-title)/(--text-title--line-height)">
            Tell us what you are financing
          </h1>
          <p className="mt-6 max-w-(--container-prose) text-lg text-muted">
            Four short steps. We will come back to you with whether it is something we can structure,
            and what a financier would need to see.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <FinancingForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-line pt-8">
              <h2 className="text-xl">What happens next</h2>
              <ol className="mt-6 space-y-5">
                {method.slice(0, 3).map((stage, index) => (
                  <li key={stage.title} className="flex gap-4">
                    <span className="text-sm text-accent tabular-nums">{index + 1}</span>
                    <div>
                      <h3 className="text-base text-ink">{stage.title}</h3>
                      <p className="mt-1 text-sm text-muted">{stage.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <h2 className="text-xl">What we do not ask for</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                No financial statements, no identity documents and no bank records at this stage.
                Those are discussed directly once we understand the requirement — never uploaded to
                a web form.
              </p>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <h2 className="text-xl">Where the money comes from</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Garnet does not lend from its own balance sheet. It structures the request and
                facilitates it with its banking, asset-finance and trade-finance partners.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
