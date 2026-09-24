"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export type Measure = {
  title: string;
  description: string;
  /** Final width as a percentage of the column. */
  width: number;
};

/**
 * A pinned scene: the panel holds still while three measures extend across it.
 *
 * This is the one place scroll position drives animation directly, because
 * the thing being shown is an extent - something reaching further out - and
 * tying that to how far the reader has travelled is the point.
 *
 * Pinning only happens at the large breakpoint. On a phone a sticky viewport
 * plus a tall track is where these designs fall apart, so mobile gets the
 * measures at full width in a plain list. Reduced motion gets the same.
 */
export function PinnedMeasures({
  heading,
  lede,
  measures,
  tone = "light",
}: {
  heading: string;
  lede?: string;
  measures: Measure[];
  tone?: "light" | "dark";
}) {
  const reduced = useReducedMotion();
  const track = React.useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });

  return (
    <section className={cn(dark && "on-dark")}>
      <div ref={track} className="relative md:h-[240vh]">
        <div className="md:sticky md:top-0 md:flex md:h-dvh md:items-center">
          <div className="shell w-full py-(--spacing-section) md:py-0">
            <div className="grid gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
              <div className="md:col-span-5">
                <h2 className="type-section">
                  {heading}
                </h2>
                {lede ? (
                  <p
                    className={cn(
                      "mt-6 max-w-md text-lg",
                      dark ? "text-limestone-300" : "text-muted",
                    )}
                  >
                    {lede}
                  </p>
                ) : null}
              </div>

              <dl className="space-y-10 md:col-span-7">
                {measures.map((measure, index) => (
                  <MeasureRow
                    key={measure.title}
                    measure={measure}
                    index={index}
                    total={measures.length}
                    progress={scrollYProgress}
                    reduced={Boolean(reduced)}
                    dark={dark}
                  />
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MeasureRow({
  measure,
  index,
  total,
  progress,
  reduced,
  dark,
}: {
  measure: Measure;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
  dark: boolean;
}) {
  // Each measure extends over its own slice of the scroll, so they arrive one
  // after another rather than all at once.
  const start = (index / total) * 0.8;
  const end = start + 0.8 / total;

  /**
   * scaleX rather than width.
   *
   * This is the one animation on the site driven directly by scroll position,
   * so it recalculates on every frame of a continuous gesture. Width is a
   * layout property: animating it forced layout, paint and composite for the
   * whole subtree each time. A transform touches none of that.
   *
   * The fill is laid out at full width and scaled down from the left, so the
   * track clips its end rather than the fill needing its own radius.
   */
  const scaleX = useTransform(progress, [start, end], [0.08, measure.width / 100]);

  return (
    <div>
      <dt className="text-xl">{measure.title}</dt>
      <div
        aria-hidden
        className={cn(
          "mt-4 h-1.5 overflow-hidden rounded-full",
          dark ? "bg-oxblood-800" : "bg-recess shadow-(--shadow-well)",
        )}
      >
        <motion.div
          className={cn("h-full w-full origin-left", dark ? "bg-brass" : "bg-accent")}
          style={reduced ? { transform: `scaleX(${measure.width / 100})` } : { scaleX }}
        />
      </div>
      <dd className={cn("mt-4 text-lg", dark ? "text-limestone-300" : "text-muted")}>
        {measure.description}
      </dd>
    </div>
  );
}