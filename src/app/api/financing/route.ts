import { NextResponse } from "next/server";
import { financingSchema } from "@/lib/validations/financing.schema";
import { AMOUNT_BAND_LABELS } from "@/lib/validations/financing.schema";
import { FINANCING_NEED_LABELS } from "@/lib/site-config";
import { send, mailboxes } from "@/lib/email/client";
import { acknowledgement, internalNotification } from "@/lib/email/templates";
import { clientKey, limit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { badRequest, readJson, serverError, tooMany, validationError } from "../_lib";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { success } = await limit(clientKey(request, "financing"), 3);
  if (!success) return tooMany();

  const body = await readJson(request);
  if (!body || typeof body !== "object") return badRequest();

  const parsed = financingSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const token = (body as { turnstileToken?: string }).turnstileToken;
  if (!(await verifyTurnstile(token))) return badRequest();

  const data = parsed.data;

  try {
    if (mailboxes.financing) {
      await send({
        to: mailboxes.financing,
        replyTo: data.email,
        subject: `Financing request — ${FINANCING_NEED_LABELS[data.financingNeed]} — ${data.fullName}`,
        html: internalNotification({
          heading: "New financing request",
          intro: "Submitted through the request-financing form.",
          data: {
            "Financing need": FINANCING_NEED_LABELS[data.financingNeed],
            "Applicant type": data.applicantType,
            Name: data.fullName,
            Company: data.company,
            Email: data.email,
            Phone: data.phone,
            County: data.county,
            Industry: data.industry,
            Amount: `${AMOUNT_BAND_LABELS[data.amountBand]} ${data.currency}`,
            Timeline: data.timeline,
            Purpose: data.purpose,
            "Additional information": data.additionalInformation,
          },
        }),
      });
    }

    await send({
      to: data.email,
      subject: "Your financing request — Garnet Solutions",
      html: acknowledgement({
        firstName: data.fullName.split(" ")[0],
        heading: "We have your request",
        body:
          "A member of the team will review the details and come back to you. Garnet structures and facilitates financing through partner institutions — this enquiry is not an application to a lender and no offer is implied.",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/financing]", error);
    return serverError();
  }
}
