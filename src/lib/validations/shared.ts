import { z } from "zod";

/**
 * Shared field primitives. Every public form composes from these so that
 * limits, trimming and messages stay identical on client and server.
 */
export const nameField = z
  .string()
  .trim()
  .min(2, "Enter your full name")
  .max(120, "Name is too long");

export const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Enter your email address")
  .max(254)
  .email("Enter a valid email address");

/**
 * Accepts Kenyan and international formats: 0712345678, +254712345678,
 * 254712345678, with spaces or dashes. Stored normalised to +254… when the
 * number is clearly Kenyan.
 */
export const phoneField = z
  .string()
  .trim()
  .min(7, "Enter your phone number")
  .max(24)
  .regex(/^[+()\d][\d\s()+-]{6,23}$/, "Enter a valid phone number")
  .transform((value) => value.replace(/[\s()-]/g, ""))
  .refine((value) => /^(\+?254\d{9}|0\d{9}|\+\d{7,15})$/.test(value), "Enter a valid phone number");

export const companyField = z.string().trim().max(160).optional().or(z.literal(""));

export const messageField = z
  .string()
  .trim()
  .min(20, "Tell us a little more (at least 20 characters)")
  .max(2000, "Please keep this under 2,000 characters");

/** Honeypot: must stay empty. Bots fill every field they find. */
export const honeypotField = z.literal("").optional();

export const consentField = z
  .literal(true, { message: "You need to accept before submitting" });

export type FieldErrors = Record<string, string[]>;
