import { Section } from "@/components/shared/section";
import { differentiators } from "@/content/company";

/**
 * A ledger: label column on the left, substance on the right. No numbers -
 * these five are not a sequence, and numbering them would imply an order
 * that does not exist.
 */
export function WhyGarnet() {
  return (
    <Section>
      <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-14">
        <h2 className="type-section md:col-span-4">
          Why clients stay
        </h2>

        <dl className="md:col-span-8">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="grid gap-2 border-t border-line py-7 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-8"
            >
              <dt className="text-xl text-ink lg:col-span-5">{item.title}</dt>
              <dd className="text-muted lg:col-span-7">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}