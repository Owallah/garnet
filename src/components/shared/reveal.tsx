"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: React.ReactNode;
  /** Stagger index within a group. Kept small - long delays read as lag. */
  index?: number;
  className?: string;
};

/**
 * One reveal primitive for the whole site, so timing is consistent and
 * reduced-motion is handled in a single place. Deliberately not applied to
 * every element: use it for the one thing in a section worth announcing.
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