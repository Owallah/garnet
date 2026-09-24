import "server-only";

/**
 * Brevo transactional email.
 *
 * Called directly over HTTPS rather than through @getbrevo/brevo: the whole
 * integration is one POST to one endpoint, and the SDK would add a dependency,
 * a generated client and its own version churn for nothing.
 *
 * Docs: https://developers.brevo.com/docs/send-a-transactional-email
 */

const ENDPOINT = "https://api.brevo.com/v3/smtp/email";

type Address = { email: string; name?: string };

export const mailboxes = {
  from: process.env.EMAIL_FROM ?? "Garnet Solutions <no-reply@example.com>",
  contact: process.env.CONTACT_EMAIL,
  financing: process.env.FINANCING_EMAIL ?? process.env.CONTACT_EMAIL,
  investment: process.env.INVESTMENT_EMAIL ?? process.env.CONTACT_EMAIL,
};

/** Splits `Garnet Solutions <no-reply@garnet.co.ke>` into Brevo's sender object. */
function parseAddress(value: string): Address {
  const match = value.match(/^\s*(.*?)\s*<\s*([^>]+)\s*>\s*$/);
  if (match) return { name: match[1] || undefined, email: match[2] };
  return { email: value.trim() };
}

/**
 * A plain-text alternative, derived from the HTML.
 *
 * Not optional in practice: a transactional email with no text part scores
 * worse with spam filters, and the acknowledgement going to an applicant is
 * exactly the message that must not land in junk.
 */
function toPlainText(html: string) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/(p|div|tr|h1|h2|h3|li)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

/**
 * Sends, and never throws into the request path — a failed notification must
 * not turn a valid enquiry into a user-facing error. Failures are logged for
 * the platform while the applicant still sees a success.
 *
 * Set EMAIL_SANDBOX=true to exercise the whole path without delivering
 * anything: Brevo validates the request, returns success, and drops the
 * message. That is how to test the forms in development without a verified
 * sender and without burning the daily quota.
 */
export async function send(options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  toName?: string;
}) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn("[email] BREVO_API_KEY missing — skipped:", options.subject);
    return { ok: false as const };
  }

  const headers: Record<string, string> = {
    accept: "application/json",
    "content-type": "application/json",
    "api-key": apiKey,
  };

  if (process.env.EMAIL_SANDBOX === "true") {
    headers["X-Sib-Sandbox"] = "drop";
  }

  const body = {
    sender: parseAddress(mailboxes.from),
    to: [{ email: options.to, ...(options.toName ? { name: options.toName } : {}) }],
    subject: options.subject,
    htmlContent: options.html,
    textContent: toPlainText(options.html),
    ...(options.replyTo ? { replyTo: { email: options.replyTo } } : {}),
    // Shows up in Brevo's logs, so a delivery problem can be traced back to
    // the site without opening the message.
    tags: ["garnet-website"],
  };

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      // Brevo returns { code, message }; the code is what identifies an
      // unverified sender or an exhausted quota.
      const detail = (await response.json().catch(() => null)) as
        | { code?: string; message?: string }
        | null;
      console.error(
        `[email] Brevo rejected the send (${response.status}${
          detail?.code ? ` ${detail.code}` : ""
        }): ${detail?.message ?? "no detail"}`,
      );
      return { ok: false as const };
    }

    return { ok: true as const };
  } catch (error) {
    console.error("[email] Brevo request failed:", error);
    return { ok: false as const };
  }
}