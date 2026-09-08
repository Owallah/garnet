"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Form primitives.
 *
 * Every control is labelled, every error is tied to its input with
 * aria-describedby, and invalid state is carried by aria-invalid rather than
 * colour alone. Error text is orange-shifted (#b23a18) so it never reads as
 * brand garnet — a red that matches the brand colour stops registering as a
 * warning.
 */

/**
 * Inputs are sunk into the page rather than sitting on it, which is the
 * clearest possible signal that a surface is for typing into. The border is
 * limestone-500 (3:1 against the ground) and does the accessibility work; the
 * inset shadow only makes it feel like a well.
 */
const controlBase =
  "w-full rounded-[--radius-md] border bg-recess px-4 text-base text-body shadow-(--shadow-well) transition-colors duration-[--duration-fast] placeholder:text-muted focus:outline-none focus-visible:border-garnet-700";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm text-body">
        {label}
        {required ? null : <span className="ml-2 text-limestone-400">Optional</span>}
      </label>
      {hint ? (
        <p id={`${htmlFor}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        "h-12",
        invalid ? "border-error" : "border-control",
        className,
      )}
      {...props}
    />
  );
});

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        "min-h-32 py-3 leading-relaxed",
        invalid ? "border-error" : "border-control",
        className,
      )}
      {...props}
    />
  );
});

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        "h-12 appearance-none bg-size-[14px] bg-position-[right_1rem_center] bg-no-repeat pr-10",
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b6062%22 stroke-width=%221.5%22><path d=%22M6 9l6 6 6-6%22/></svg>')]",
        invalid ? "border-error" : "border-control",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

/**
 * A selectable card built on a real radio input, so keyboard and screen-reader
 * behaviour is the browser's rather than something reimplemented with divs.
 */
export const RadioCard = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string; description?: string }
>(function RadioCard({ label, description, className, ...props }, ref) {
  return (
    <label
      className={cn(
        "corner-brand-sm relief-sm relief-interactive group relative flex cursor-pointer flex-col gap-1 border-control p-5",
        "hover:border-ink",
        "has-checked:border-garnet-700 has-checked:bg-selected has-checked:bg-none has-checked:shadow-(--shadow-pressed)",
        "has-focus-visible:outline has-focus-visible:outline-offset-2 has-focus-visible:outline-garnet-700",
        className,
      )}
    >
      <input ref={ref} type="radio" className="sr-only" {...props} />
      <span className="text-base text-ink">{label}</span>
      {description ? <span className="text-sm text-muted">{description}</span> : null}
    </label>
  );
});

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { children: React.ReactNode; invalid?: boolean }
>(function Checkbox({ children, className, invalid, ...props }, ref) {
  return (
    <label className={cn("flex cursor-pointer items-start gap-3", className)}>
      <input
        ref={ref}
        type="checkbox"
        aria-invalid={invalid || undefined}
        className={cn(
          "mt-1 size-4.5 shrink-0 appearance-none rounded-[--radius-xs] border bg-recess shadow-(--shadow-well)",
          "checked:border-garnet-800 checked:bg-garnet-700 checked:shadow-(--shadow-relief-sm)",
          "checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22><path d=%22M5 13l4 4L19 7%22/></svg>')] checked:bg-size-[12px] checked:bg-center checked:bg-no-repeat",
          invalid ? "border-error" : "border-control",
        )}
        {...props}
      />
      <span className="text-sm leading-relaxed text-body">{children}</span>
    </label>
  );
});

/** Fieldset for grouped controls, so the group has an accessible name. */
export function FieldGroup({
  legend,
  hint,
  error,
  children,
  className,
}: {
  legend: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("min-w-0", className)}>
      <legend className="text-sm text-body">{legend}</legend>
      {hint ? <p className="mt-1 text-sm text-muted">{hint}</p> : null}
      <div className="mt-4">{children}</div>
      {error ? <p className="mt-3 text-sm text-error">{error}</p> : null}
    </fieldset>
  );
}
