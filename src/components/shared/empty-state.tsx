import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * An empty collection is not a reason to remove a section.
 *
 * The investments index previously rendered nothing at all when the CMS
 * returned no opportunities, which reads as a bug to the client editing the
 * CMS and as a dead end to a visitor. An empty state says what is going on
 * and offers the next move.
 *
 * Recessed rather than raised, matching the empty image slots: this is a
 * space waiting to be filled, not a surface carrying content.
 */
export function EmptyState({
  title,
  body,
  actionLabel,
  actionHref,
  className,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}) {
  return (
    <div className={cn("relief-well corner-brand-sm p-8 lg:p-12", className)}>
      <h3 className="text-2xl text-ink">{title}</h3>
      <p className="mt-4 max-w-lg text-muted">{body}</p>
      {actionLabel && actionHref ? (
        <ButtonLink href={actionHref} variant="secondary" className="mt-8">
          {actionLabel}
        </ButtonLink>
      ) : null}
    </div>
  );
}