import { z } from "zod";
import { AREAS_OF_INTEREST } from "@/lib/site-config";
import {
  companyField,
  consentField,
  emailField,
  honeypotField,
  messageField,
  nameField,
  phoneField,
} from "./shared";

export const contactSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  company: companyField,
  areaOfInterest: z.enum(AREAS_OF_INTEREST, { message: "Choose what this is about" }),
  message: messageField,
  consent: consentField,
  website: honeypotField,
});

export type ContactInput = z.infer<typeof contactSchema>;
