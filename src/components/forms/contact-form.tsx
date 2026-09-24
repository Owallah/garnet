"use client";

import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { contactSchema, type ContactInput } from "@/lib/validations/contact.schema";

type Values = Omit<Partial<ContactInput>, "consent"> & { consent: boolean };

const interests = [
  { value: "financing", label: "Financing" },
  { value: "investment", label: "Investment" },
  { value: "logistics", label: "Logistics" },
  { value: "general", label: "Something else" },
];

export function ContactForm() {
  const [status, setStatus] = React.useState<"editing" | "submitting" | "sent" | "failed">("editing");
  const [formMessage, setFormMessage] = React.useState<string | null>(null);
  const headingRef = React.useRef<HTMLParagraphElement>(null);

  const { register, getValues, setError, clearErrors, formState } = useForm<Values>({
    defaultValues: { consent: false, website: "" },
    shouldFocusError: false,
  });

  const errors = formState.errors;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    clearErrors();

    const parsed = contactSchema.safeParse(getValues());
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        setError(issue.path.join(".") as keyof Values, { type: "manual", message: issue.message });
      }
      const first = parsed.error.issues[0]?.path.join(".");
      if (first) {
        window.requestAnimationFrame(() => {
          document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
        });
      }
      return;
    }

    setStatus("submitting");
    setFormMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { message?: string } | null;
        setFormMessage(body?.message ?? "That did not send. Try again in a moment.");
        setStatus("failed");
        return;
      }

      setStatus("sent");
      window.requestAnimationFrame(() => headingRef.current?.focus());
    } catch {
      setFormMessage("That did not send. Check your connection and try again.");
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="corner-brand-sm relief p-8">
        <p ref={headingRef} tabIndex={-1} className="text-2xl text-ink outline-none">
          Message sent
        </p>
        <p className="mt-4 text-muted">
          We have your message and will respond shortly. A copy is on its way to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Field label="Full name" htmlFor="contact-name" required error={errors.fullName?.message}>
        <Input
          id="contact-name"
          autoComplete="name"
          invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "contact-name-error" : undefined}
          {...register("fullName")}
        />
      </Field>

      <Field label="Company" htmlFor="contact-company" error={errors.company?.message}>
        <Input id="contact-company" autoComplete="organization" {...register("company")} />
      </Field>

      <Field label="Email" htmlFor="contact-email" required error={errors.email?.message}>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
      </Field>

      <Field label="Phone" htmlFor="contact-phone" required error={errors.phone?.message}>
        <Input
          id="contact-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "contact-phone-error" : undefined}
          {...register("phone")}
        />
      </Field>

      <Field
        label="What is this about?"
        htmlFor="contact-interest"
        required
        error={errors.areaOfInterest?.message}
        className="sm:col-span-2"
      >
        <Select
          id="contact-interest"
          defaultValue=""
          invalid={Boolean(errors.areaOfInterest)}
          {...register("areaOfInterest")}
        >
          <option value="" disabled>
            Select a topic
          </option>
          {interests.map((interest) => (
            <option key={interest.value} value={interest.value}>
              {interest.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="Message"
        htmlFor="contact-message"
        required
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="contact-message"
          invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Checkbox
          invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "contact-consent-error" : undefined}
          {...register("consent")}
        >
          I agree that Garnet Solutions Limited may use these details to respond to my message. See
          the{" "}
          <Link href="/privacy-policy" className="text-accent underline underline-offset-4">
            privacy policy
          </Link>
          .
        </Checkbox>
        {errors.consent ? (
          <p id="contact-consent-error" className="mt-3 text-sm text-error">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite" className="sm:col-span-2 empty:hidden">
        {formMessage ? <p className="text-sm text-error">{formMessage}</p> : null}
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" loading={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}