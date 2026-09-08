import "server-only";
import { Resend } from "resend";

let client: Resend | null = null;

export function resend() {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const mailboxes = {
  from: process.env.EMAIL_FROM ?? "Garnet Solutions <onboarding@resend.dev>",
  contact: process.env.CONTACT_EMAIL,
  financing: process.env.FINANCING_EMAIL ?? process.env.CONTACT_EMAIL,
  investment: process.env.INVESTMENT_EMAIL ?? process.env.CONTACT_EMAIL,
};

/**
 * Sends and never throws into the request path — a failed notification must
 * not turn a valid enquiry into a user-facing error. Failures are logged for
 * the platform, and the caller still records a success for the applicant.
 */
export async function send(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const mailer = resend();
  if (!mailer) {
    console.warn("[email] RESEND_API_KEY missing — skipped:", options.subject);
    return { ok: false as const };
  }

  const { error } = await mailer.emails.send({
    from: mailboxes.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
  });

  if (error) {
    console.error("[email] send failed:", error.message);
    return { ok: false as const };
  }
  return { ok: true as const };
}
