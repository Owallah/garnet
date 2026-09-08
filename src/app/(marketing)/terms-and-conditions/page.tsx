import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/shared/legal-document";
import { termsAndConditions } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "The terms governing use of the Garnet Solutions Limited website, including that nothing on it is an offer of finance or an offer to invest.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return <LegalDocumentView document={termsAndConditions} />;
}
