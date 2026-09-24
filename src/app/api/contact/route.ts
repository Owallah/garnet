import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact.schema";
import { send, mailboxes } from "@/lib/email/client";
import { acknowledgement, internalNotification } from "@/lib/email/templates";
import { clientKey, limit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { badRequest, readJson, serverError, tooMany, validationError } from "../_lib";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { success } = await limit(clientKey(request, "contact"), 5);
  if (!success) return tooMany();

  const body = await readJson(request);
  if (!body || typeof body !== "object") return badRequest();

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);
  // Honeypot filled - accept silently so bots learn nothing.
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const token = (body as { turnstileToken?: string }).turnstileToken;
  if (!(await verifyTurnstile(token))) return badRequest();

  const data = parsed.data;

  try {
    if (mailboxes.contact) {
      await send({
        to: mailboxes.contact,
        replyTo: data.email,
        subject: `Website enquiry | ${data.areaOfInterest} | ${data.fullName}`,
        html: internalNotification({
          heading: "New contact enquiry",
          intro: "Submitted through the website contact form.",
          data: {
            Name: data.fullName,
            Email: data.email,
            Phone: data.phone,
            Company: data.company,
            "Area of interest": data.areaOfInterest,
            Message: data.message,
          },
        }),
      });
    }

    await send({
      to: data.email,
      subject: "We have your message | Garnet Solutions",
      toName: data.fullName,
      html: acknowledgement({
        firstName: data.fullName.split(" ")[0],
        heading: "Thank you for getting in touch",
        body: "We have received your message and a member of the team will respond shortly.",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/contact]", error);
    return serverError();
  }
}