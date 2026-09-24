import { Section } from "@/components/shared/section";
import { cn } from "@/lib/utils";

/**
 * The structural idea of the homepage.
 *
 * A filled garnet panel means Garnet's own capital is committed. An outlined
 * panel means the capital comes from a partner institution. That single
 * convention carries the facilitation/investment distinction visually, so the
 * page does not have to keep restating it in prose - and the caption below
 * makes the convention explicit rather than leaving it to be guessed.
 */
const pillars = [
  {
    name: "Financing",
    source: "Partner institutions",
    body: "A requirement is assessed, structured and taken to the banking, asset-finance and trade-finance institutions best suited to it, including offshore financiers on qualifying projects.",
    href: "/services",
    linkLabel: "See financing services",
    own: false,
  },
  {
    name: "Investment",
    source: "Garnet's own capital",
    body: "Separately, Garnet commits its own capital to qualifying projects, ventures and structured instruments, after its own due diligence.",
    href: "/investments",
    linkLabel: "See how we invest",
    own: true,
  },
  {
    name: "Logistics",
    source: "Delivered by Garnet",
    body: "Freight, warehousing and distribution, so that financed assets and traded goods reach where they are needed.",
    href: "/services/logistics",
    linkLabel: "See logistics services",
    own: false,
  },
];

export function Ecosystem() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-12">
        <h2 className="type-section lg:col-span-7">
          Three capabilities working on the same requirement
        </h2>
        <p className="text-lg text-muted lg:col-span-5">
          Most businesses solve capital and delivery separately, with different partners and no
          shared timeline. Garnet handles them together, without blurring where the money comes
          from.
        </p>
      </div>

      <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pillars.map((pillar) => (
          <li
            key={pillar.name}
            className={cn(
              "corner-brand-sm flex flex-col p-8 lg:p-10",
              pillar.own
                // Literal, not semantic: a brand fill carrying its own
                // foreground (garnet-100 on garnet-700 is 7.5:1), so it has
                // no reason to follow the page theme.
                ? "border border-garnet-800 bg-garnet-700 text-garnet-100 shadow-(--shadow-relief)"
                : "relief",
            )}
          >
            <p className={cn("text-sm", pillar.own ? "text-garnet-200" : "text-muted")}>
              {pillar.source}
            </p>
            <h3 className={cn("mt-3 text-2xl", pillar.own && "text-limestone-50")}>{pillar.name}</h3>
            <p className={cn("mt-5 grow", pillar.own ? "text-garnet-100" : "text-muted")}>
              {pillar.body}
            </p>
            <a
              href={pillar.href}
              className={cn(
                "link-draw mt-8 self-start text-sm",
                pillar.own ? "text-limestone-50" : "text-accent",
              )}
            >
              {pillar.linkLabel}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 max-w-xl text-sm text-muted">
        The filled panel is the one where Garnet commits its own capital. Everywhere else, the
        capital belongs to a partner institution and Garnet arranges it.
      </p>
    </Section>
  );
}