import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/validations/enquiry.schema";
import { send, mailboxes } from "@/lib/email/client";
import { acknowledgement, internalNotification } from "@/lib/email/templates";
import { clientKey, limit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { badRequest, readJson, serverError, tooMany, validationError } from "../_lib";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { success } = await limit(clientKey(request, "enquiry"), 3);
  if (!success) return tooMany();

  const body = await readJson(request);
  if (!body || typeof body !== "object") return badRequest();

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const token = (body as { turnstileToken?: string }).turnstileToken;
  if (!(await verifyTurnstile(token))) return badRequest();

  const data = parsed.data;

  try {
    if (mailboxes.investment) {
      await send({
        to: mailboxes.investment,
        replyTo: data.email,
        subject: `Investment enquiry — ${data.interest} — ${data.fullName}`,
        html: internalNotification({
          heading: "New investment enquiry",
          intro: "Submitted through an investment page.",
          data: {
            Name: data.fullName,
            Email: data.email,
            Phone: data.phone,
            Organisation: data.organisation,
            Interest: data.interest,
            Opportunity: data.opportunitySlug,
            Message: data.message,
          },
        }),
      });
    }

    await send({
      to: data.email,
      subject: "Your investment enquiry — Garnet Solutions",
      html: acknowledgement({
        firstName: data.fullName.split(" ")[0],
        heading: "Thank you for your enquiry",
        body:
          "We have received your enquiry and will be in touch. Nothing on this website is an offer, solicitation or recommendation to invest.",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/enquiry]", error);
    return serverError();
  }
}
