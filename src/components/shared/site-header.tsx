"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { navigation } from "@/lib/site-config";
import { useUIStore } from "@/stores/ui.store";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: navigation.services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
  { label: "Solutions", href: "/solutions", children: navigation.solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })) },
  { label: "Industries", href: "/industries", children: navigation.industries.map((s) => ({ label: s.title, href: `/industries/${s.slug}` })) },
  { label: "Investments", href: "/investments" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  // Navigating closes the menus. Handled at the point of the click rather
  // than in an effect watching the pathname, which triggered a cascading
  // render on every route change.
  const closeMenus = React.useCallback(() => {
    setMobileMenuOpen(false);
    setOpenMenu(null);
  }, [setMobileMenuOpen]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-(image:--gradient-raised) shadow-(--shadow-relief-sm) backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-oxblood-900 focus:px-4 focus:py-2 focus:text-limestone-50"
      >
        Skip to content
      </a>

      <div className="shell flex h-18 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Garnet Solutions home">
          <Image
            src="/logo-garnet.png"
            alt="Garnet Solutions"
            width={1508}
            height={474}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.children && setOpenMenu(link.label)}
                  onMouseLeave={() => link.children && setOpenMenu(null)}
                >
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={link.children ? openMenu === link.label : undefined}
                    onFocus={() => link.children && setOpenMenu(link.label)}
                    onClick={closeMenus}
                    className={cn(
                      "relative py-2 text-sm transition-colors duration-[--duration-fast]",
                      active ? "text-accent" : "text-body hover:text-ink",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-0 -bottom-px h-px origin-left bg-garnet-700 transition-transform duration-[--duration-fast] ease-[--ease-standard]",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>

                  {link.children && openMenu === link.label ? (
                    <div className="relief-lg corner-brand-sm absolute left-1/2 top-full w-80 -translate-x-1/2 p-2">
                      <ul>
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMenus}
                              className="block rounded-[--radius-sm] px-3 py-2.5 text-sm text-body transition-colors hover:bg-recess hover:text-ink"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <ButtonLink href="/request-financing" size="sm">
            Request financing
          </ButtonLink>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
          {mobileMenuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-(image:--gradient-raised) shadow-(--shadow-relief) lg:hidden"
          >
            <nav aria-label="Primary" className="shell py-6">
              <ul className="space-y-1">
                {primaryLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} onClick={closeMenus} className="block py-2.5 text-base text-ink">
                      {link.label}
                    </Link>
                    {link.children ? (
                      <ul className="mb-2 ml-4 border-l border-line pl-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={closeMenus} className="block py-2 text-sm text-muted">
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
              <ButtonLink href="/request-financing" className="mt-4 w-full">
                Request financing
              </ButtonLink>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
                <span className="text-sm text-muted">Theme</span>
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
