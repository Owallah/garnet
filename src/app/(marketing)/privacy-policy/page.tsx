import type { Metadata } from "next";
import { LegalDocumentView } from "@/components/shared/legal-document";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How Garnet Solutions Limited collects, uses and protects personal data submitted through this website, and your rights under Kenya's Data Protection Act 2019.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalDocumentView document={privacyPolicy} />;
}
