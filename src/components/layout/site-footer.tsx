import Image from "next/image";
import Link from "next/link";
import { navigation, siteConfig } from "@/lib/site-config";
import type { SiteSettings } from "@/sanity/types";

const columns = [
  {
    heading: "Services",
    links: navigation.services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    heading: "Who we work with",
    links: [
      ...navigation.solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })),
      { label: "Industries", href: "/industries" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Garnet", href: "/about" },
      { label: "Our approach", href: "/about/approach" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Investments", href: "/investments" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

/**
 * Contact rows render only when Sanity supplies them. An unsupplied phone
 * number is absent from the DOM rather than shown as a placeholder — the
 * content rules forbid publishing details the client has not confirmed.
 */
export function SiteFooter({ settings }: { settings?: SiteSettings | null }) {
  const year = new Date().getFullYear();
  const contact = [
    (() => {
      const email = settings?.email ?? siteConfig.email;
      return email ? { label: "Email", value: email, href: `mailto:${email}` } : null;
    })(),
    ...(settings?.phone ?? []).map((phone) => ({
      label: "Phone",
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    })),
    settings?.address ? { label: "Office", value: settings.address, href: null } : null,
    settings?.officeHours ? { label: "Hours", value: settings.officeHours, href: null } : null,
  ].filter(Boolean) as { label: string; value: string; href: string | null }[];

  return (
    <footer className="on-dark">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="max-w-sm">
            <Image
              src="/logo-garnet-light.png"
              alt={settings?.companyName ?? siteConfig.name}
              width={1508}
              height={474}
              className="h-9 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-limestone-300">
              {settings?.footerSummary ?? siteConfig.description}
            </p>

            {contact.length > 0 ? (
              <dl className="mt-8 space-y-3 text-sm">
                {contact.map((item) => (
                  <div key={`${item.label}-${item.value}`} className="flex gap-3">
                    <dt className="w-16 shrink-0 text-limestone-400">{item.label}</dt>
                    <dd className="text-limestone-200">
                      {item.href ? (
                        <a href={item.href} className="transition-colors hover:text-brass">
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {columns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="text-sm text-brass">{column.heading}</h2>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-limestone-300 transition-colors hover:text-limestone-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 border-t border-oxblood-700 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-limestone-400">
            Garnet Solutions Limited structures and facilitates client financing through partner
            banking, asset-finance and trade-finance institutions. It does not lend from its own
            balance sheet. Garnet separately deploys its own capital into qualifying investments.
          </p>

          <div className="mt-6 flex flex-col gap-4 text-xs text-limestone-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {settings?.companyName ?? siteConfig.name}. Registered in Kenya.
            </p>
            <ul className="flex gap-6">
              <li>
                <Link href="/privacy-policy" className="transition-colors hover:text-limestone-200">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="transition-colors hover:text-limestone-200">
                  Terms and conditions
                </Link>
              </li>
            </ul>
          </div>

          {settings?.socialLinks?.length ? (
            <ul className="mt-6 flex gap-5 text-xs">
              {settings.socialLinks.map((social) => (
                <li key={social.url}>
                  <a
                    href={social.url}
                    className="text-limestone-300 transition-colors hover:text-brass"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </footer>
  );
}