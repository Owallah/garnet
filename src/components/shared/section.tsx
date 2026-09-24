import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  tone?: "light" | "muted" | "dark";
  as?: "section" | "div" | "footer" | "header";
};

/**
 * Every top-level band on a page goes through here so vertical rhythm is
 * defined once. Tone switches the ground; components inside never branch on
 * theme themselves - `.on-dark` overrides the tokens they already use.
 */
export function Section({
  tone = "light",
  as: Tag = "section",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "py-(--spacing-section) lg:py-(--spacing-section-lg)",
        tone === "muted" && "bg-band shadow-(--shadow-well)",
        tone === "dark" && "on-dark",
        className,
      )}
      {...props}
    >
      <div className="shell">{children}</div>
    </Tag>
  );
}

type HeadingProps = {
  /** Only use when it carries information the title does not, e.g. a category. */
  eyebrow?: string;
  title: string;
  lede?: string;
  level?: 1 | 2 | 3;
  className?: string;
};

/**
 * The eyebrow is optional and should carry real information (a section
 * number in a sequence, a category) rather than restate the heading.
 */
export function SectionHeading({ eyebrow, title, lede, level = 2, className }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? <p className="mb-4 font-sans text-sm text-accent">{eyebrow}</p> : null}
      <Tag className={level === 1 ? "type-page" : "type-section"}>
        {title}
      </Tag>
      {lede ? <p className="mt-6 max-w-(--container-prose) text-lg text-muted">{lede}</p> : null}
    </div>
  );
}