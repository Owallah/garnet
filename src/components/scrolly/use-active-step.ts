"use client";

import * as React from "react";

/**
 * Reports which step is currently nearest the middle of the viewport.
 *
 * Deliberately built on IntersectionObserver rather than scroll offsets: the
 * browser does the work off the main thread, there is no scroll listener to
 * throttle, and nothing recalculates on resize. A scroll-position version of
 * this is where scrollytelling usually starts costing frames.
 *
 * The observer only reports which step is active. It never gates whether a
 * step is rendered - every step is in the DOM from first paint, readable and
 * announceable whether or not it has been scrolled past.
 */
export function useActiveStep(count: number) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<Array<HTMLElement | null>>([]);

  const setRef = React.useCallback(
    (index: number) => (node: HTMLElement | null) => {
      refs.current[index] = node;
    },
    [],
  );

  React.useEffect(() => {
    const nodes = refs.current.filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    // A band across the middle of the viewport. A step becomes active when it
    // crosses into it, which matches where a reader's eye actually sits.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [count]);

  return { active, setRef };
}
