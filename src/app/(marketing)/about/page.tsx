import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { MediaSlot } from "@/components/shared/media-slot";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeading } from "@/components/shared/section";
import { PinnedMeasures, StickyNarrative } from "@/components/scrolly";
import {
  companyOverview,
  differentiators,
  geographicReach,
  mission,
  partnerRole,
  values,
  vision,
} from "@/content/company";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Garnet",
  description:
    "A Kenyan-registered company incorporated in 2015 and headquartered in Nairobi, providing integrated financing facilitation, proprietary investment and logistics services.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading
              level={1}
              title="A single partner for capital and for the goods it moves"
              lede={`Garnet Solutions Limited has operated from Nairobi since ${siteConfig.incorporated}, serving SMEs, corporate organisations and individuals across Kenya and East Africa.`}
            />
          </div>
          <div className="lg:col-span-5">
            <MediaSlot slot="about-company" ratio="4/3" priority className="corner-brand" />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-12 lg:grid-cols-12">
          <h2 className="text-3xl lg:col-span-4 lg:text-4xl">Who we are</h2>
          <div className="space-y-6 text-lg lg:col-span-8">
            {companyOverview.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision and mission are the client's own words and are quoted as given. */}
      <Section tone="dark">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="text-sm text-brass">Vision</p>
            <p className="type-display mt-5 text-(length:--text-opener)/(--text-opener--line-height) text-limestone-50">
              {vision}
            </p>
          </div>
          <div>
            <p className="text-sm text-brass">Mission</p>
            <p className="type-display mt-5 text-(length:--text-opener)/(--text-opener--line-height) text-limestone-50">
              {mission}
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="What we hold ourselves to"
          lede="Five values, and what each one means in the day-to-day of an engagement."
        />
        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <Reveal key={value.title} index={index}>
              <div className="border-t border-line pt-5">
                <dt className="text-xl text-ink">{value.title}</dt>
                <dd className="mt-3 text-muted">{value.description}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* Scene 1 — the five things Garnet does, read one at a time. */}
      <StickyNarrative
        heading="Our role as your partner"
        lede="Five things Garnet does, and one it deliberately does not."
        steps={partnerRole.map((item) => ({ title: item.title, description: item.description }))}
        tone="dark"
      />


      {/* Scene 2 — differentiators. Unnumbered: these are not ordered. */}
      <StickyNarrative
        heading="Why clients stay"
        steps={differentiators.map((item) => ({ title: item.title, description: item.description }))}
        numbered={false}
      />


      {/* Scene 3 — reach shown as extent rather than as three equal cards. */}
      <PinnedMeasures
        heading="Where we work"
        lede="From an office in Nairobi outwards, as far as a requirement calls for."
        measures={geographicReach.map((place, index) => ({
          title: place.title,
          description: place.description,
          width: [34, 68, 100][index] ?? 100,
        }))}
      />


      <Section tone="dark">
        <div className="max-w-(--container-prose)">
          <h2 className="text-3xl lg:text-4xl">Start with the requirement</h2>
          <p className="mt-6 text-lg text-limestone-300">
            Tell us what you are trying to finance, build or move, and we will tell you what is
            workable and what a financier would need to see.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/request-financing" variant="onDarkSolid" size="lg">
              Request financing
            </ButtonLink>
            <ButtonLink href="/about/leadership" variant="onDark" size="lg">
              Meet the team
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
