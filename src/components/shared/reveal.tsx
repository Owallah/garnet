"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger index within a group. Kept small — long delays read as lag. */
  index?: number;
  className?: string;
};

/**
 * One reveal primitive for the whole site, so timing is consistent and
 * reduced-motion is handled in a single place.
 *
 * WHERE IT GOES. Two rules, both learned from getting them wrong:
 *
 * 1. Use it on the repeating items of a grid that is the section's subject —
 *    the cards a reader scans and chooses between. Not on prose, not on
 *    anything above the fold, and not on the cross-reference rows at the foot
 *    of a detail page, which are navigation rather than content. Four card
 *    grids animated and four identical ones did not, which made the motion
 *    read as arbitrary rather than as a rule.
 *
 * 2. `Reveal` must BE the card, not sit inside it. Pass the card's own classes
 *    to `className` and let this component render them. When the relief and
 *    border lived on the parent `<li>` and only the inner content faded, the
 *    card's outline snapped in at full strength and the text drifted up into
 *    an already-drawn box — the one part of the animation a reader notices.
 *    The `<li>` keeps `className="grid"` so its single child still stretches
 *    to the row height.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        // 700ms with a 350ms stagger meant the last card in a row took over a
        // second to settle, which reads as lag rather than polish.
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.15),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
