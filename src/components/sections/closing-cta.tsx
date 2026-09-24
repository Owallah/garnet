import { ButtonLink } from "@/components/ui/button";

/**
 * The closing panel carries the brand corner at full size - the same shape as
 * the hero image, bracketing the page. It stays on the dark ground rather than
 * filling with garnet, because a filled garnet surface means Garnet's own
 * capital everywhere else on this page.
 */
export function ClosingCta() {
  return (
    <section className="py-(--spacing-section) lg:py-(--spacing-section-lg)">
      <div className="shell">
        <div className="corner-brand on-dark bg-(image:--gradient-raised-dark) px-8 py-16 shadow-(--shadow-relief-lg) lg:px-16 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="type-section">
              Tell us what you are trying to finance
            </h2>
            <p className="mt-6 text-lg text-limestone-300">
              Four short steps, no documents, no obligation. You will get an honest answer about
              whether it is something we can structure, and what a financier would need to see.
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
        </div>
      </div>
    </section>
  );
}