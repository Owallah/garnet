import "server-only";
import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export const MAX_BODY_BYTES = 32 * 1024;

/** Reads and size-limits a JSON body. Oversized or unparseable bodies are rejected. */
export async function readJson(request: Request): Promise<unknown | null> {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return null;

  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Field errors only - never echoes the submitted values back. */
export function validationError(error: ZodError) {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "form";
    (fieldErrors[key] ??= []).push(issue.message);
  }
  return NextResponse.json(
    { ok: false, message: "Some details need checking.", fieldErrors },
    { status: 422 },
  );
}

export const tooMany = () =>
  NextResponse.json(
    { ok: false, message: "Too many submissions. Please try again in a minute." },
    { status: 429 },
  );

export const badRequest = () =>
  NextResponse.json({ ok: false, message: "That request could not be read." }, { status: 400 });

/** Generic by design: internal failures never leak detail to the client. */
export const serverError = () =>
  NextResponse.json(
    { ok: false, message: "Something went wrong on our side. Please try again." },
    { status: 500 },
  );
