/**
 * Shown while a route segment is still resolving.
 *
 * Most pages here are prerendered, so this rarely appears on a fast
 * connection - which is the point. It exists for the cases that do wait: an
 * opportunity page hitting Sanity, or a slow network where a tapped nav item
 * would otherwise do nothing visible at all.
 *
 * Quiet placeholders rather than a shimmer. A shimmer is a second animation
 * competing with the page that is about to arrive.
 */
export default function Loading() {
  return (
    <div className="shell py-(--spacing-section) lg:py-(--spacing-section-lg)" aria-busy>
      <span className="sr-only">Loading</span>
      <div aria-hidden className="grid gap-12 md:grid-cols-12">
        <div className="space-y-5 md:col-span-7">
          <div className="relief-well h-4 w-24 rounded-(--radius-md)" />
          <div className="relief-well h-12 w-full rounded-(--radius-md)" />
          <div className="relief-well h-12 w-4/5 rounded-(--radius-md)" />
          <div className="relief-well mt-8 h-4 w-full rounded-(--radius-md)" />
          <div className="relief-well h-4 w-11/12 rounded-(--radius-md)" />
        </div>
        <div className="md:col-span-5">
          <div className="relief-well corner-brand aspect-4/3 w-full" />
        </div>
      </div>
    </div>
  );
}