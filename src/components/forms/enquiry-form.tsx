"use client";

import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/field";
import { enquirySchema, type EnquiryInput } from "@/lib/validations/enquiry.schema";

type Values = Omit<Partial<EnquiryInput>, "consent"> & { consent: boolean };

const interests = [
  { value: "structured-fixed-income", label: "Structured and fixed-income" },
  { value: "real-estate", label: "Real estate" },
  { value: "project", label: "Project investment" },
  { value: "venture", label: "Venture or corporate" },
  { value: "general", label: "Not sure yet" },
];

type Props = {
  /** Set when the form sits on a specific opportunity page. */
  opportunitySlug?: string;
  opportunityTitle?: string;
  /** Preselects the area of interest from the opportunity's category. */
  defaultInterest?: EnquiryInput["interest"];
};

/**
 * Investment enquiries.
 *
 * Collects only what is needed to start a conversation: no financial position,
 * no documents, no identity data. Anything a real assessment requires is
 * discussed directly, not uploaded to a public form — which also keeps this
 * site clear of holding sensitive financial records.
 *
 * On an opportunity page the slug travels with the submission as a hidden
 * field, so the team knows which one prompted the enquiry without the person
 * having to describe it.
 */
export function EnquiryForm({ opportunitySlug, opportunityTitle, defaultInterest }: Props) {
  const [status, setStatus] = React.useState<"editing" | "submitting" | "sent" | "failed">("editing");
  const [formMessage, setFormMessage] = React.useState<string | null>(null);
  const confirmationRef = React.useRef<HTMLParagraphElement>(null);

  const { register, getValues, setError, clearErrors, formState } = useForm<Values>({
    defaultValues: {
      consent: false,
      website: "",
      opportunitySlug: opportunitySlug ?? "",
      interest: defaultInterest,
    },
    shouldFocusError: false,
  });

  const errors = formState.errors;

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    clearErrors();

    const parsed = enquirySchema.safeParse(getValues());
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
      const response = await fetch("/api/enquiry", {
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
      window.requestAnimationFrame(() => confirmationRef.current?.focus());
    } catch {
      setFormMessage("That did not send — check your connection and try again.");
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="corner-brand-sm relief p-8">
        <p ref={confirmationRef} tabIndex={-1} className="text-2xl text-ink outline-none">
          Enquiry received
        </p>
        <p className="mt-4 text-muted">
          A member of the team will be in touch. A copy is on its way to your email.
        </p>
        <p className="mt-4 text-sm text-muted">
          Nothing discussed so far is an offer, solicitation or recommendation to invest.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor="enquiry-website">Website</label>
        <input id="enquiry-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("opportunitySlug")} />

      {opportunityTitle ? (
        <p className="text-sm text-muted sm:col-span-2">
          About <span className="text-ink">{opportunityTitle}</span>. We will reference it when we
          reply.
        </p>
      ) : null}

      <Field label="Full name" htmlFor="enquiry-name" required error={errors.fullName?.message}>
        <Input
          id="enquiry-name"
          autoComplete="name"
          invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "enquiry-name-error" : undefined}
          {...register("fullName")}
        />
      </Field>

      <Field label="Organisation" htmlFor="enquiry-org" error={errors.organisation?.message}>
        <Input id="enquiry-org" autoComplete="organization" {...register("organisation")} />
      </Field>

      <Field label="Email" htmlFor="enquiry-email" required error={errors.email?.message}>
        <Input
          id="enquiry-email"
          type="email"
          autoComplete="email"
          invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "enquiry-email-error" : undefined}
          {...register("email")}
        />
      </Field>

      <Field label="Phone" htmlFor="enquiry-phone" required error={errors.phone?.message}>
        <Input
          id="enquiry-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
          {...register("phone")}
        />
      </Field>

      <Field
        label="Area of interest"
        htmlFor="enquiry-interest"
        required
        error={errors.interest?.message}
        className="sm:col-span-2"
      >
        <Select
          id="enquiry-interest"
          defaultValue={defaultInterest ?? ""}
          invalid={Boolean(errors.interest)}
          {...register("interest")}
        >
          <option value="" disabled>
            Select an area
          </option>
          {interests.map((interest) => (
            <option key={interest.value} value={interest.value}>
              {interest.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        label="What would you like to discuss?"
        htmlFor="enquiry-message"
        required
        hint="Whether you are bringing a project to Garnet or exploring participation."
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="enquiry-message"
          invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "enquiry-message-error" : "enquiry-message-hint"}
          {...register("message")}
        />
      </Field>

      <div className="sm:col-span-2">
        <Checkbox
          invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "enquiry-consent-error" : undefined}
          {...register("consent")}
        >
          I agree that Garnet Solutions Limited may use these details to respond to my enquiry. See
          the{" "}
          <Link href="/privacy-policy" className="text-accent underline underline-offset-4">
            privacy policy
          </Link>
          .
        </Checkbox>
        {errors.consent ? (
          <p id="enquiry-consent-error" className="mt-3 text-sm text-error">
            {errors.consent.message}
          </p>
        ) : null}
      </div>

      <div aria-live="polite" className="sm:col-span-2 empty:hidden">
        {formMessage ? <p className="text-sm text-error">{formMessage}</p> : null}
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
          Submitting this is an enquiry, not a commitment. Nothing on this website is an offer,
          solicitation or recommendation to invest, and no return is promised or implied.
        </p>
      </div>
    </form>
  );
}
