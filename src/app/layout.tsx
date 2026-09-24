import type { Metadata } from "next";
import "./globals.css";
import { kindSans } from "./fonts";
import { themeScript } from "@/components/shared/theme-toggle";
import { siteConfig } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${siteConfig.name} | Financing, Investment and Logistics in Kenya`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/mark-garnet.png", apple: "/apple-icon.png" },
  robots: { index: true, follow: true },
};

/**
 * Organization data uses only what the company profile confirms. Phone and
 * postal address are omitted until the client supplies them - an incomplete
 * entity is better than an invented one.
 */
const organisation = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/logo-garnet.png"),
  email: siteConfig.email,
  foundingDate: String(siteConfig.incorporated),
  address: { "@type": "PostalAddress", addressLocality: siteConfig.city, addressCountry: "KE" },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE" className={kindSans.variable} suppressHydrationWarning>
      <head>
        {/* Blocking and inline on purpose: this must set the theme class
            before the first paint, or the page flashes light then swaps. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
        {children}
      </body>
    </html>
  );
}
