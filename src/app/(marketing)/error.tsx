"use client";

import * as React from "react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/shared/section";

/**
 * Catches runtime errors in any marketing route. Rendering inside the
 * marketing layout means the header and footer survive, so a failure looks
 * like one broken section rather than a broken site - and the visitor still
 * has navigation and a way to contact us.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Goes to the platform log. Swap for an error reporter when one exists.
    console.error("[route error]", error.digest ?? "", error.message);
  }, [error]);

  return (
    <Section>
      <div className="max-w-(--container-prose)">
        <p className="text-sm text-accent">Something went wrong</p>
        <h1 className="type-display mt-4 text-(length:--text-title)/(--text-title--line-height)">
          This page didn&apos;t load properly
        </h1>
        <p className="mt-6 text-lg text-muted">
          The problem is on our side, not yours. Try again, and if it keeps happening, tell us and
          we will look into it.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Go to homepage
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost" size="lg">
            Contact us
          </ButtonLink>
        </div>

        {/* The digest identifies this error in the server logs. The message
            itself is withheld in production, so this is the only handle
            support has - and it is safe to show, being an opaque hash. */}
        {error.digest ? (
          <p className="mt-10 text-sm text-muted">
            Reference: <span className="text-body">{error.digest}</span>
          </p>
        ) : null}
      </div>
    </Section>
  );
}