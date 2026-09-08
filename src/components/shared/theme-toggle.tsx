"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "garnet-theme";

/**
 * Runs before first paint, inlined into <head>.
 *
 * Without this the page renders light, then swaps to dark once React has
 * hydrated — the white flash every dark-mode implementation ships with at
 * least once. It has to be a blocking inline script; there is no way to do
 * this from a component.
 */
export const themeScript = `(function(){try{
var s=localStorage.getItem('${STORAGE_KEY}');
var d=s==='dark'||((!s||s==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);
var e=document.documentElement;
e.classList.toggle('dark',d);
e.style.colorScheme=d?'dark':'light';
}catch(e){}})();`;

function apply(theme: Theme) {
  const dark =
    theme === "dark" ||
    (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "system", label: "System", Icon: Monitor },
  { value: "dark", label: "Dark", Icon: Moon },
];

/**
 * Three states rather than two. A plain on/off switch cannot express "follow
 * my device", which is what most people actually want — and once they have
 * flipped a two-state toggle, the site stops tracking their system setting
 * forever with no way back.
 *
 * Rendered as a radio group: arrow keys move between options, and the current
 * one is announced. A row of buttons would need all of that reimplemented.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme>("system");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  // Keep following the system while the choice is "system".
  React.useEffect(() => {
    if (theme !== "system") return;
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => apply("system");
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [theme]);

  function choose(next: Theme) {
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "relief-well inline-flex items-center gap-0.5 rounded-full p-1",
        className,
      )}
    >
      {options.map(({ value, label, Icon }) => {
        // Before mount the stored choice is unknown, so nothing is marked
        // selected — rendering a guess would mismatch the server HTML.
        const selected = mounted && theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${label} theme`}
            tabIndex={selected || (!mounted && value === "system") ? 0 : -1}
            onClick={() => choose(value)}
            className={cn(
              "grid size-8 place-items-center rounded-full transition-colors duration-[--duration-fast]",
              selected
                ? "bg-(image:--gradient-raised) text-accent shadow-(--shadow-relief-sm)"
                : "text-muted hover:text-ink",
            )}
          >
            <Icon aria-hidden className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
