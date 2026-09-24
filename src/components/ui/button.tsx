import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons are moulded rather than drawn: each carries relief and presses in
 * on activation. Every variant also keeps a border: on the primary and dark
 * variants the fill supplies the 3:1 boundary, on the quieter ones the border
 * does, because a shadow cannot be relied on to mark an edge.
 *
 * The primary variant keeps literal garnet rather than the semantic accent.
 * It is a brand fill carrying its own foreground, and white on garnet-700 is
 * 9.6:1 in both themes, so it has no reason to flip. Semantic tokens are for
 * surfaces that have to follow the page.
 */
const buttonVariants = cva(
  "relief-interactive inline-flex items-center justify-center gap-2 rounded-(--radius-md) border font-sans text-sm font-medium tracking-tight transition-colors duration-(--duration-fast) ease-(--ease-entrance) disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "border-garnet-800 bg-garnet-700 text-white shadow-(--shadow-relief-sm) hover:bg-garnet-800",
        secondary:
          "border-control bg-(image:--gradient-raised) text-ink shadow-(--shadow-relief-sm) hover:border-ink",
        ghost:
          "border-transparent bg-transparent text-accent shadow-none hover:text-accent-strong hover:shadow-none",
        onDark:
          "border-oxblood-700 bg-(image:--gradient-raised-dark) text-limestone-50 shadow-(--shadow-relief-dark) hover:border-brass hover:text-brass",
        // Literal, not semantic: this chip sits on the oxblood band, which
        // stays dark in both themes, so it must not invert with the page.
        onDarkSolid:
          "border-limestone-300 bg-limestone-50 text-oxblood-900 shadow-(--shadow-relief-dark) hover:bg-limestone-100",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

/**
 * The in-flight mark.
 *
 * Changing the label to "Sending…" is a statement; a moving spinner is
 * evidence. Both, because the label carries the meaning for a screen reader
 * and the spinner carries it for everyone glancing at the button.
 */
function Spinner() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className="spinner size-4">
      <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path
        d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** Shows the spinner, disables the button and marks it aria-busy. */
    loading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}

type ButtonLinkProps = React.ComponentProps<typeof Link> & VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };