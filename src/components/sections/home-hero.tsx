"use client";

import { ButtonLink } from "@/components/ui/button";
import { MediaSlot } from "@/components/shared/media-slot";
import { HeroItem, HeroLine, HeroMedia, HeroRule, HeroSequence } from "@/components/shared/motion";

/**
 * The headline is set as three deliberate lines rather than left to wrap:
 * the three nouns are the company, so they get the weight of separate lines
 * and rise in sequence on load.
 */
const headline = ["Integrated financing,", "investment and", "logistics solutions"];

export function HomeHero() {
  return (
    <section className="border-b border-line">
      <div className="shell">
        <HeroSequence>
          <div className="grid items-end gap-12 py-16 lg:grid-cols-12 lg:gap-14 lg:py-24">
            <div className="lg:col-span-7">
              <HeroRule className="mb-10 w-24" />

              <h1 className="type-display text-(length:--text-hero)/(--text-hero--line-height) text-ink">
                {headline.map((line) => (
                  <HeroLine key={line}>{line}</HeroLine>
                ))}
              </h1>

              <HeroItem delay={0.1}>
                <p className="mt-10 max-w-xl text-lg text-muted">
                  Garnet structures access to capital with its financing partners, commits its own
                  capital to qualifying investments, and moves the goods that both pay for.
                </p>
              </HeroItem>

              <HeroItem delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <ButtonLink href="/request-financing" size="lg">
                    Request financing
                  </ButtonLink>
                  <ButtonLink href="/services" variant="secondary" size="lg">
                    Explore services
                  </ButtonLink>
                </div>
              </HeroItem>

              <HeroItem delay={0.24}>
                <p className="mt-10 text-sm text-muted">
                  Operating from Nairobi since 2015.
                </p>
              </HeroItem>
            </div>

            <div className="lg:col-span-5">
              <HeroMedia className="corner-brand">
                <MediaSlot
                  slot="home-hero"
                  ratio="3/4"
                  priority
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </HeroMedia>
            </div>
          </div>
        </HeroSequence>
      </div>
    </section>
  );
}
