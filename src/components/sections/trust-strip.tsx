import { siteConfig } from "@/lib/site-config";

/**
 * Four facts, all verifiable from the company profile. No metrics, no
 * counters, nothing that needs a footnote.
 */
const facts = [
  { label: "Incorporated", value: String(siteConfig.incorporated) },
  { label: "Headquarters", value: `${siteConfig.city}, ${siteConfig.country}` },
  { label: "Clients", value: "SMEs, corporates, individuals" },
  { label: "Reach", value: "Kenya and East Africa" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-line bg-(image:--gradient-raised) shadow-(--shadow-relief-sm)">
      <dl className="shell grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4 lg:gap-0">
        {facts.map((fact, index) => (
          <div
            key={fact.label}
            className={index > 0 ? "lg:border-l lg:border-line-2 lg:pl-8" : "lg:pr-8"}
          >
            <dt className="text-sm text-muted">{fact.label}</dt>
            <dd className="mt-1.5 text-lg text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
