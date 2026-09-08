"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useActiveStep } from "./use-active-step";
import { cn } from "@/lib/utils";

export type NarrativeStep = {
  title: string;
  description: string;
};

type Props = {
  heading: string;
  lede?: string;
  steps: NarrativeStep[];
  tone?: "light" | "dark";
  /** Numbered when the steps are a genuine sequence, unnumbered when not. */
  numbered?: boolean;
  className?: string;
};

/**
 * The scrollytelling primitive: a sticky left panel that responds to a column
 * of steps scrolling past it on the right.
 *
 * Three rules this is built to keep.
 *
 * 1. No scroll-jacking. The page never intercepts, accelerates or fakes
 *    scrolling. Sticky positioning does the pinning; the user's scroll always
 *    does exactly what they expect it to.
 *
 * 2. Text never fades. Dimming inactive steps to 30% opacity is the standard
 *    way to build this and it drops body copy below 4.5:1 — so inactive steps
 *    keep graphite-muted (4.8:1 on the stone ground) and the active one gains
 *    a garnet rule and darker ink. The motion is carried by the indicator and
 *    the sticky panel, not by making the content unreadable.
 *
 * 3. The static version is the real version. Below the large breakpoint, and
 *    for anyone with reduced motion, this is a plain heading followed by a
 *    list — no collapsed layout, nothing hidden, nothing that needed the
 *    animation to make sense.
 */
export function StickyNarrative({
  heading,
  lede,
  steps,
  tone = "light",
  numbered = true,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const { active, setRef } = useActiveStep(steps.length);
  const dark = tone === "dark";

  return (
    <section
      className={cn(
        "py-section lg:py-section-lg",
        dark && "on-dark",
        className,
      )}
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 className="type-display text-(length:--text-opener)/(--text-opener--line-height)">
              {heading}
            </h2>
            {lede ? (
              <p className={cn("mt-6 max-w-md text-lg", dark ? "text-limestone-300" : "text-muted")}>
                {lede}
              </p>
            ) : null}

            {/* Progress. The ascending bars from the logo mark, filling as the
                reader moves down the column. Decorative — the list beneath
                carries the same information in text. */}
            <div aria-hidden className="mt-10 hidden items-end gap-2 lg:flex">
              {steps.map((step, index) => (
                <div key={step.title} className="flex-1">
                  <motion.div
                    className={cn(
                      "origin-bottom rounded-full",
                      dark ? "bg-brass" : "bg-garnet-700",
                    )}
                    initial={false}
                    animate={{
                      height: index <= active ? 8 + index * 6 : 4,
                      opacity: index <= active ? 1 : 0.25,
                    }}
                    transition={
                      reduced ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
                    }
                  />
                </div>
              ))}
            </div>

            {/* The active step's name, echoed large in the sticky panel. */}
            <div aria-hidden className="mt-6 hidden h-8 overflow-hidden lg:block">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={steps[active]?.title}
                  initial={reduced ? false : { y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("text-sm", dark ? "text-brass" : "text-accent")}
                >
                  {numbered ? `${active + 1} of ${steps.length} — ` : ""}
                  {steps[active]?.title}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {steps.map((step, index) => (
            <li
              key={step.title}
              ref={setRef(index)}
              className={cn(
                "border-l-2 py-10 pl-6 transition-colors duration-[--duration-base] lg:py-16 lg:pl-10",
                index === active
                  ? dark
                    ? "border-brass"
                    : "border-garnet-700"
                  : dark
                    ? "border-oxblood-700"
                    : "border-line-2",
              )}
            >
              {numbered ? (
                <span
                  className={cn(
                    "text-sm tabular-nums",
                    index === active
                      ? dark
                        ? "text-brass"
                        : "text-accent"
                      : dark
                        ? "text-limestone-400"
                        : "text-muted",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : null}

              <h3
                className={cn(
                  "mt-3 text-2xl transition-colors duration-[--duration-base]",
                  dark
                    ? index === active
                      ? "text-limestone-50"
                      : "text-limestone-300"
                    : index === active
                      ? "text-ink"
                      : "text-muted",
                )}
              >
                {step.title}
              </h3>

              <p className={cn("mt-4 text-lg", dark ? "text-limestone-300" : "text-muted")}>
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
