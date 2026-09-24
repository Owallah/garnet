"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * The whole motion vocabulary for the site, in one file.
 *
 * There are exactly two non-user-triggered moments on the homepage: the hero
 * sequence on load, and the process diagram drawing itself as it enters. Every
 * other section arrives without animation. Fade-and-slide on every band is the
 * generic default and reads as noise once you have scrolled twice.
 *
 * Reduced motion is handled here rather than in each component: when it is
 * set, these render their children with no transform and no delay.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------------
   HERO — orchestrated load sequence
   Rule draws, display lines rise in sequence, supporting text and actions
   follow, image clips open alongside. One moment, then it is over.
   ------------------------------------------------------------------------ */

export function HeroSequence({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
      {children}
    </motion.div>
  );
}

const riseVariants: Variants = {
  hidden: { opacity: 0, y: "0.4em" },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** A display line that rises from behind its own baseline. */
export function HeroLine({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{children}</span>;

  return (
    <span className="block overflow-hidden">
      <motion.span variants={riseVariants} className={className}>
        {children}
      </motion.span>
    </span>
  );
}

export function HeroItem({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A hairline that draws across from the left as the page loads. */
export function HeroRule({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={`h-px bg-accent ${className ?? ""}`} />;

  return (
    <motion.div
      className={`h-px origin-left bg-accent ${className ?? ""}`}
      variants={{
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
      }}
    />
  );
}

/** The hero image opens from its own bottom edge rather than fading in. */
export function HeroMedia({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { clipPath: "inset(0 0 100% 0)" },
        visible: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.1, ease: EASE, delay: 0.15 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------------
   PROCESS DIAGRAM — the one scroll-triggered moment
   ------------------------------------------------------------------------ */

export function StageGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A stage in the process diagram: its measure bar grows from the baseline,
 * echoing the ascending bars held inside the logo mark.
 */
export function Stage({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StageBar({ height, className }: { height: string; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className} style={{ height }} />;

  return (
    <motion.div
      className={`origin-bottom ${className ?? ""}`}
      style={{ height }}
      variants={{
        hidden: { scaleY: 0 },
        visible: { scaleY: 1, transition: { duration: 0.8, ease: EASE } },
      }}
    />
  );
}