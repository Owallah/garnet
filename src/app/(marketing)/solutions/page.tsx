import type { Metadata } from "next";
import { MediaSlot } from "@/components/shared/media-slot";
import { Reveal } from "@/components/shared/reveal";
import { Section, SectionHeading } from "@/components/shared/section";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "How Garnet works with SMEs, corporate organisations and individual clients across financing, investment and logistics.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <Section>
        <SectionHeading
          level={1}
          title="Three audiences, three different first questions"
          lede="An SME asks how to fund the next order. A corporate asks how to structure something at scale. An individual asks what is realistic. The route differs from there."
        />
      </Section>

      <Section className="pt-0 lg:pt-0">
        <ul className="space-y-20">
          {solutions.map((solution, index) => (
            <li key={solution.slug}>
              <Reveal index={index}>
                <a
                  href={`/solutions/${solution.slug}`}
                  className="group grid items-center gap-10 border-t border-line pt-10 lg:grid-cols-12"
                >
                  <div className={index % 2 === 0 ? "lg:col-span-5" : "lg:order-2 lg:col-span-5"}>
                    <MediaSlot ratio="4/3" brief={solution.imageBrief} />
                  </div>
                  <div className={index % 2 === 0 ? "lg:col-span-7" : "lg:order-1 lg:col-span-7"}>
                    <p className="text-sm text-accent">{solution.audienceLabel}</p>
                    <h2 className="mt-3 text-3xl">{solution.title}</h2>
                    <p className="mt-5 text-lg text-muted">{solution.description}</p>
                    <span className="link-draw mt-0 text-sm text-accent">See the full picture</span>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
