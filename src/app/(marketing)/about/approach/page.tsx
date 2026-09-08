import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/shared/section";
import { StickyNarrative } from "@/components/scrolly";
import { method, partnerRole } from "@/content/company";

export const metadata: Metadata = {
  title: "Our approach",
  description:
    "How Garnet assesses a requirement, structures it, connects it to the right financier, and stays with the engagement through execution.",
  alternates: { canonical: "/about/approach" },
};

export default function ApproachPage() {
  return (
    <>
      <Section>
        <SectionHeading
          level={1}
          title="Assess, structure, connect, execute, coordinate"
          lede="Most financing requests are not declined because the business is weak. They are declined because the request reached the institution in the wrong shape."
        />
      </Section>

      <StickyNarrative
        heading="Assess, structure, connect, execute, coordinate"
        lede="The five stages a requirement moves through, in order."
        steps={method.map((step) => ({ title: step.title, description: step.description }))}
        tone="dark"
      />


      <Section>
        <SectionHeading title="What that means in practice" />
        <ol className="mt-14 space-y-4">
          {partnerRole.map((item) => (
            <li key={item.title} className="relief corner-brand-sm p-6 lg:p-10">
              <div className="grid gap-4 lg:grid-cols-12 lg:gap-10">
                <h3 className="text-xl lg:col-span-4">{item.title}</h3>
                <p className="text-muted lg:col-span-8">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted">
        <div className="max-w-(--container-prose)">
          <h2 className="text-3xl">Have a requirement in mind?</h2>
          <p className="mt-5 text-lg text-muted">
            The first conversation is an assessment, not an application.
          </p>
          <ButtonLink href="/request-financing" size="lg" className="mt-8">
            Request financing
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
