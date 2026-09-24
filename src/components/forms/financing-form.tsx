"use client";

import Link from "next/link";
import * as React from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, FieldGroup, Input, RadioCard, Select, Textarea } from "@/components/ui/field";
import {
  AMOUNT_BAND_LABELS,
  financingSchema,
  financingStepSchemas,
  type FinancingInput,
  type FinancingStep,
} from "@/lib/validations/financing.schema";
import { FINANCING_NEEDS, FINANCING_NEED_LABELS, KENYA_COUNTIES } from "@/lib/site-config";
import { useFinancingStore } from "@/stores/financing.store";
import { cn } from "@/lib/utils";

/**
 * Consent is a plain boolean in the form because a checkbox starts unchecked;
 * the schema is what insists it ends up true.
 */
type Values = Omit<Partial<FinancingInput>, "consent"> & { consent: boolean };

const steps = [
  { number: 1, title: "What you need", legend: "The financing requirement" },
  { number: 2, title: "About you", legend: "Applicant information" },
  { number: 3, title: "The details", legend: "Financing details" },
  { number: 4, title: "Review", legend: "Review and consent" },
] as const;

const applicantTypes = [
  { value: "sme", label: "A small or medium business", description: "Trading, with staff and customers." },
  { value: "corporate", label: "A corporate organisation", description: "Larger scale, often multiple facilities." },
  { value: "individual", label: "An individual", description: "Personal or household financing." },
];

const timelines = [
  { value: "immediate", label: "As soon as possible" },
  { value: "1-3-months", label: "Within one to three months" },
  { value: "3-6-months", label: "Within three to six months" },
  { value: "exploring", label: "Still exploring options" },
];

const industryOptions = [
  "Manufacturing",
  "Agriculture",
  "Retail & FMCG",
  "Construction",
  "Import & Export",
  "Transport & logistics",
  "Professional services",
  "Hospitality",
  "Healthcare",
  "Education",
  "Other",
];

export function FinancingForm() {
  const reduced = useReducedMotion();
  const store = useFinancingStore();

  const [step, setStep] = React.useState<FinancingStep>(1);
  const [status, setStatus] = React.useState<"editing" | "submitting" | "sent" | "failed">("editing");
  const [formMessage, setFormMessage] = React.useState<string | null>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const hasMounted = React.useRef(false);

  const { register, getValues, watch, setError, clearErrors, reset, formState } =
    useForm<Values>({
      defaultValues: { consent: false, currency: "KES", website: "" },
      shouldFocusError: false,
    });

  const errors = formState.errors;

  /**
   * The store persists a part-finished enquiry to sessionStorage. Reading it
   * after mount rather than during render keeps the server and client markup
   * identical - hydrating straight from storage would mismatch.
   */
  React.useEffect(() => {
    if (hasMounted.current) return;
    hasMounted.current = true;
    const saved = useFinancingStore.getState();
    if (Object.keys(saved.formData).length > 0) {
      reset({ consent: false, currency: "KES", website: "", ...saved.formData });
      setStep(saved.currentStep);
    }
  }, [reset]);

  /** Moving between steps shifts focus to the new step heading. */
  const focusHeading = React.useCallback(() => {
    window.requestAnimationFrame(() => headingRef.current?.focus());
  }, []);

  function validateStep(current: FinancingStep) {
    clearErrors();
    const schema = financingStepSchemas[current];
    const result = schema.safeParse(getValues());

    if (result.success) return true;

    for (const issue of result.error.issues) {
      const path = issue.path.join(".") as keyof Values;
      setError(path, { type: "manual", message: issue.message });
    }

    // Focus the first control that failed, so keyboard users are not stranded.
    const first = result.error.issues[0]?.path.join(".");
    if (first) {
      window.requestAnimationFrame(() => {
        document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      });
    }
    return false;
  }

  function goNext() {
    if (!validateStep(step)) return;
    store.setFormData(getValues() as Partial<FinancingInput>);
    const next = Math.min(step + 1, 4) as FinancingStep;
    setStep(next);
    store.nextStep();
    focusHeading();
  }

  function goBack() {
    const previous = Math.max(step - 1, 1) as FinancingStep;
    setStep(previous);
    store.previousStep();
    focusHeading();
  }

  /**
   * The form's single submit path. Steps 1–3 advance, step 4 sends.
   *
   * Routing both through onSubmit rather than onClick is what makes Enter work
   * in a text field, which is the most common keyboard expectation in a
   * multi-step form and the thing its absence is felt for immediately.
   */
  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (step < 4) {
      goNext();
      return;
    }
    void send();
  }

  async function send() {
    if (!validateStep(4)) return;

    const parsed = financingSchema.safeParse(getValues());
    if (!parsed.success) {
      // A failure here means an earlier step was tampered with or cleared.
      setFormMessage("Some earlier details need checking. Step back through the form.");
      setStatus("failed");
      return;
    }

    setStatus("submitting");
    setFormMessage(null);

    try {
      const response = await fetch("/api/financing", {
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

      store.reset();
      setStatus("sent");
      focusHeading();
    } catch {
      setFormMessage("That did not send. Check your connection and try again.");
      setStatus("failed");
    }
  }

  if (status === "sent") {
    return (
      <div className="corner-brand-sm relief p-8 lg:p-12">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
          Your request is with us
        </h2>
        <p className="mt-5 max-w-lg text-muted">
          A member of the team will review the details and come back to you. We have sent a copy to
          the email address you gave.
        </p>
        <p className="mt-5 max-w-lg text-sm text-muted">
          This is an enquiry, not an application to a lender. Garnet structures and facilitates
          financing through partner institutions, and no offer is implied.
        </p>
      </div>
    );
  }

  const values = watch();

  return (
    <div>
      {/* Progress. Numbered because this genuinely is a sequence. */}
      <ol className="flex gap-1" aria-label="Progress through the form">
        {steps.map((item) => {
          const state = item.number === step ? "current" : item.number < step ? "done" : "upcoming";
          return (
            <li key={item.number} className="flex-1">
              <div
                className={cn(
                  "h-1 rounded-full transition-colors duration-(--duration-base)",
                  state === "upcoming"
                    ? "bg-recess shadow-(--shadow-well)"
                    : "bg-accent shadow-(--shadow-relief-sm)",
                )}
              />
              <p
                className={cn(
                  "mt-3 text-sm",
                  state === "current" ? "text-accent" : "text-muted",
                )}
                aria-current={state === "current" ? "step" : undefined}
              >
                <span className="tabular-nums">{item.number}</span>
                <span className="ml-2 hidden sm:inline">{item.title}</span>
              </p>
            </li>
          );
        })}
      </ol>

      <form onSubmit={onSubmit} noValidate className="mt-10">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl outline-none">
          {steps[step - 1].legend}
        </h2>

        {/* Honeypot. Hidden from people, filled by bots, checked on the server. */}
        <div aria-hidden className="absolute left-[-9999px]">
          <label htmlFor="website">Website</label>
          <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {/*
            Asymmetric, and using a full transform string.

            `mode="wait"` serialises exit and enter, so the previous symmetric
            280ms cost 560ms between pressing Continue and seeing anything -
            1.7s across a four-step form. The exit is now the fast half,
            because the user has already decided; the enter is what they are
            waiting to read.

            `transform` rather than the `x` shorthand: the shorthand runs on
            the main thread, which is exactly where a form submission is busy.
          */}
          <motion.div
            key={step}
            initial={reduced ? false : { opacity: 0, transform: "translateX(12px)" }}
            animate={{
              opacity: 1,
              transform: "translateX(0px)",
              transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
            }}
            exit={
              reduced
                ? undefined
                : {
                    opacity: 0,
                    transform: "translateX(-12px)",
                    transition: { duration: 0.12, ease: [0.4, 0, 1, 1] },
                  }
            }
            className="mt-8"
          >
            {step === 1 ? (
              <div className="space-y-10">
                <FieldGroup
                  legend="What is the financing for?"
                  error={errors.financingNeed?.message}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {FINANCING_NEEDS.map((need) => (
                      <RadioCard
                        key={need}
                        value={need}
                        label={FINANCING_NEED_LABELS[need]}
                        {...register("financingNeed")}
                      />
                    ))}
                  </div>
                </FieldGroup>

                <FieldGroup legend="Who is applying?" error={errors.applicantType?.message}>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {applicantTypes.map((type) => (
                      <RadioCard
                        key={type.value}
                        value={type.value}
                        label={type.label}
                        description={type.description}
                        {...register("applicantType")}
                      />
                    ))}
                  </div>
                </FieldGroup>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name" htmlFor="fullName" required error={errors.fullName?.message}>
                  <Input
                    id="fullName"
                    autoComplete="name"
                    invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    {...register("fullName")}
                  />
                </Field>

                <Field label="Company" htmlFor="company" error={errors.company?.message}>
                  <Input id="company" autoComplete="organization" {...register("company")} />
                </Field>

                <Field label="Email" htmlFor="email" required error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                </Field>

                <Field
                  label="Phone"
                  htmlFor="phone"
                  required
                  hint="Kenyan or international format."
                  error={errors.phone?.message}
                >
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
                    {...register("phone")}
                  />
                </Field>

                <Field label="County" htmlFor="county" required error={errors.county?.message}>
                  <Select id="county" invalid={Boolean(errors.county)} defaultValue="" {...register("county")}>
                    <option value="" disabled>
                      Select a county
                    </option>
                    {KENYA_COUNTIES.map((county) => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </Select>
                </Field>

                <Field label="Industry" htmlFor="industry" required error={errors.industry?.message}>
                  <Select id="industry" invalid={Boolean(errors.industry)} defaultValue="" {...register("industry")}>
                    <option value="" disabled>
                      Select an industry
                    </option>
                    {industryOptions.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>
            ) : null}

            {step === 3 ? (
              <div className="space-y-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field
                    label="Approximate amount"
                    htmlFor="amountBand"
                    required
                    hint="A range is enough at this stage."
                    error={errors.amountBand?.message}
                  >
                    <Select
                      id="amountBand"
                      invalid={Boolean(errors.amountBand)}
                      defaultValue=""
                      {...register("amountBand")}
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {Object.entries(AMOUNT_BAND_LABELS).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Currency" htmlFor="currency" required error={errors.currency?.message}>
                    <Select id="currency" {...register("currency")}>
                      <option value="KES">Kenyan shillings (KES)</option>
                      <option value="USD">US dollars (USD)</option>
                    </Select>
                  </Field>
                </div>

                <Field
                  label="What is the financing for?"
                  htmlFor="purpose"
                  required
                  hint="What it will pay for, and how the business expects to service it."
                  error={errors.purpose?.message}
                >
                  <Textarea
                    id="purpose"
                    invalid={Boolean(errors.purpose)}
                    aria-describedby={errors.purpose ? "purpose-error" : "purpose-hint"}
                    {...register("purpose")}
                  />
                </Field>

                <FieldGroup legend="When do you need it?" error={errors.timeline?.message}>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {timelines.map((option) => (
                      <RadioCard
                        key={option.value}
                        value={option.value}
                        label={option.label}
                        {...register("timeline")}
                      />
                    ))}
                  </div>
                </FieldGroup>

                <Field
                  label="Anything else we should know"
                  htmlFor="additionalInformation"
                  error={errors.additionalInformation?.message}
                >
                  <Textarea id="additionalInformation" {...register("additionalInformation")} />
                </Field>
              </div>
            ) : null}

            {step === 4 ? (
              <div className="space-y-10">
                <dl className="corner-brand-sm relief p-6 lg:p-8">
                  {[
                    { label: "Financing need", value: values.financingNeed ? FINANCING_NEED_LABELS[values.financingNeed] : "" },
                    { label: "Applicant", value: applicantTypes.find((t) => t.value === values.applicantType)?.label },
                    { label: "Name", value: values.fullName },
                    { label: "Company", value: values.company },
                    { label: "Email", value: values.email },
                    { label: "Phone", value: values.phone },
                    { label: "County", value: values.county },
                    { label: "Industry", value: values.industry },
                    {
                      label: "Amount",
                      value: values.amountBand
                        ? `${AMOUNT_BAND_LABELS[values.amountBand]} ${values.currency ?? "KES"}`
                        : "",
                    },
                    { label: "Timeline", value: timelines.find((t) => t.value === values.timeline)?.label },
                    { label: "Purpose", value: values.purpose },
                    { label: "Additional information", value: values.additionalInformation },
                  ]
                    .filter((row) => row.value)
                    .map((row) => (
                      <div key={row.label} className="grid gap-1 border-t border-line-2 py-3 first:border-t-0 first:pt-0 sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm text-muted">{row.label}</dt>
                        <dd className="text-body sm:col-span-2">{row.value}</dd>
                      </div>
                    ))}
                </dl>

                <Checkbox
                  invalid={Boolean(errors.consent)}
                  aria-describedby={errors.consent ? "consent-error" : undefined}
                  {...register("consent")}
                >
                  I agree that Garnet Solutions Limited may use these details to assess and respond
                  to my enquiry, and to share them with financing partners where that is necessary to
                  do so. See the{" "}
                  <Link href="/privacy-policy" className="text-accent underline underline-offset-4">
                    privacy policy
                  </Link>
                  .
                </Checkbox>
                {errors.consent ? (
                  <p id="consent-error" className="-mt-6 text-sm text-error">
                    {errors.consent.message}
                  </p>
                ) : null}

                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  Submitting this is an enquiry, not an application to a lender. Garnet structures
                  and facilitates financing through partner institutions and does not lend from its
                  own balance sheet. No offer or approval is implied.
                </p>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {/* Errors and status are announced, not just coloured. */}
        <div aria-live="polite" className="mt-8 empty:mt-0">
          {formMessage ? <p className="text-sm text-error">{formMessage}</p> : null}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-line pt-8">
          {step > 1 ? (
            <Button type="button" variant="secondary" onClick={goBack} disabled={status === "submitting"}>
              Back
            </Button>
          ) : null}

          {step < 4 ? (
            <Button type="submit">Continue</Button>
          ) : (
            <Button type="submit" loading={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send request"}
            </Button>
          )}

          <p className="text-sm text-muted">Step {step} of 4</p>
        </div>
      </form>
    </div>
  );
}