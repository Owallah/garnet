import Link from "next/link";
import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/contact-form";
import { Section } from "@/components/shared/section";
import { sanityFetch } from "@/sanity/lib/fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/sanity/types";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Garnet Solutions Limited in Nairobi about financing, investment or logistics.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
    fallback: null,
  });

  const email = settings?.email ?? siteConfig.email;
  const phones = settings?.phone ?? [];

  /**
   * Contact rows render only where the client has supplied the detail. An
   * unconfirmed phone number or address is absent from the page rather than
   * shown as a placeholder — publishing one Garnet has not given us is worse
   * than showing none.
   */
  const details = [
    email ? { label: "Email", value: email, href: `mailto:${email}` } : null,
    ...phones.map((phone) => ({
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    })),
    settings?.whatsapp
      ? {
          label: "WhatsApp",
          value: settings.whatsapp,
          href: `https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`,
        }
      : null,
    settings?.address ? { label: "Office", value: settings.address, href: null } : null,
    settings?.officeHours ? { label: "Hours", value: settings.officeHours, href: null } : null,
  ].filter(Boolean) as { label: string; value: string; href: string | null }[];

  return (
    <>
      <Section className="pb-0 lg:pb-0">
        <div className="max-w-3xl">
          <h1 className="type-display text-(length:--text-title)/(--text-title--line-height)">
            Talk to the team in Nairobi
          </h1>
          <p className="mt-6 max-w-(--container-prose) text-lg text-muted">
            Financing, investment or logistics — a short description of what you need is enough to
            start.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="text-2xl">Send a message</h2>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-2xl">Details</h2>
            <dl className="mt-8">
              {details.map((detail) => (
                <div
                  key={`${detail.label}-${detail.value}`}
                  className="grid gap-1 border-t border-line py-4 first:border-t-0 first:pt-0 sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="text-sm text-muted">{detail.label}</dt>
                  <dd className="text-body sm:col-span-2">
                    {detail.href ? (
                      <a href={detail.href} className="link-draw text-accent">
                        {detail.value}
                      </a>
                    ) : (
                      <span className="whitespace-pre-line">{detail.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {settings?.socialLinks?.length ? (
              <div className="mt-10 border-t border-line pt-6">
                <h3 className="text-sm text-muted">Elsewhere</h3>
                <ul className="mt-4 space-y-2">
                  {settings.socialLinks.map((social) => (
                    <li key={social.url}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-draw text-accent"
                      >
                        {social.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10 border-t border-line pt-6">
              <h3 className="text-xl">Financing enquiry?</h3>
              <p className="mt-3 text-sm text-muted">
                The financing form asks the right questions in the right order, which gets you a
                faster answer.
              </p>
              <Link href="/request-financing" className="link-draw mt-4 inline-block text-sm text-accent">
                Request financing
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      {/* The map appears only once an embed URL is set in Sanity. */}
      {settings?.mapEmbedUrl ? (
        <Section tone="muted" className="pt-0 lg:pt-0">
          <div className="corner-brand-sm relief aspect-21/9 w-full overflow-hidden p-0">
            <iframe
              src={settings.mapEmbedUrl}
              title={`Map showing the Garnet Solutions office in ${siteConfig.city}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="size-full border-0"
            />
          </div>
        </Section>
      ) : null}
    </>
  );
}
