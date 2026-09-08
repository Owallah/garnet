import { Stage, StageBar, StageGroup } from "@/components/shared/motion";
import { method } from "@/content/company";
import { cn } from "@/lib/utils";

/**
 * The signature section, and the one place on the homepage where boldness is
 * spent.
 *
 * The logo mark holds a set of ascending bars inside its container. That is
 * the device here: five stages, each with a measure bar a step taller than the
 * last, drawing up from a shared baseline as the section enters. Numbering is
 * used because this genuinely is a sequence — a requirement moves through
 * these stages in order.
 *
 * The bar row is decorative and hidden from assistive technology; the ordered
 * list beneath it carries the content. Mobile turns the bars into a left-hand
 * rule so the progression still reads vertically.
 */
const barHeights = ["2.5rem", "3.75rem", "5rem", "6.25rem", "7.5rem"];

export function Method() {
  return (
    <section className="on-dark py-section lg:py-section-lg">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12">
          <h2 className="type-display text-(length:--text-opener)/(--text-opener--line-height) lg:col-span-6">
            How a requirement moves through Garnet
          </h2>
          <p className="text-lg text-limestone-300 lg:col-span-5 lg:col-start-8">
            Most requests are not declined because the business is weak. They are declined because
            they reached the institution in the wrong shape.
          </p>
        </div>

        <StageGroup className="mt-20">
          <div className="hidden lg:block">
            <div aria-hidden className="flex items-end gap-6">
              {method.map((stage, index) => (
                <Stage key={stage.title} className="flex-1">
                  <StageBar
                    height={barHeights[index]}
                    className={cn(
                      "w-full",
                      index === method.length - 1 ? "bg-brass" : "bg-brass/25",
                    )}
                  />
                </Stage>
              ))}
            </div>

            <ol className="flex gap-6 border-t border-oxblood-700">
              {method.map((stage, index) => (
                <Stage key={stage.title} className="flex-1 pt-6">
                  <li>
                    <span className="font-sans text-sm text-brass">{index + 1}</span>
                    <h3 className="mt-2 text-xl">{stage.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-limestone-300">
                      {stage.description}
                    </p>
                  </li>
                </Stage>
              ))}
            </ol>
          </div>

          <ol className="space-y-8 lg:hidden">
            {method.map((stage, index) => (
              <Stage key={stage.title}>
                <li className="flex gap-5">
                  <div aria-hidden className="flex w-8 shrink-0 flex-col items-center">
                    <span className="font-sans text-sm text-brass">{index + 1}</span>
                    <StageBar height={barHeights[index]} className="mt-3 w-px bg-brass/40" />
                  </div>
                  <div>
                    <h3 className="text-xl">{stage.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-limestone-300">
                      {stage.description}
                    </p>
                  </div>
                </li>
              </Stage>
            ))}
          </ol>
        </StageGroup>
      </div>
    </section>
  );
}