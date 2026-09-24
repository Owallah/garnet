"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { navigation } from "@/lib/site-config";
import { useUIStore } from "@/stores/ui.store";
import { cn } from "@/lib/utils";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: navigation.services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: navigation.solutions.map((s) => ({ label: s.title, href: `/solutions/${s.slug}` })),
  },
  {
    label: "Industries",
    href: "/industries",
    children: navigation.industries.map((s) => ({ label: s.title, href: `/industries/${s.slug}` })),
  },
  { label: "Investments", href: "/investments" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [openMenu, setOpenMenu] = React.useState<string | null>(null);

  const drawerRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const wasOpen = React.useRef(false);

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

  /**
   * Scroll lock.
   *
   * `overflow: hidden` on <body> is not reliably honoured by iOS Safari, which
   * is most of the traffic this drawer will see. Pinning the body and restoring
   * the offset on close is the approach that actually holds.
   */
  React.useEffect(() => {
    if (!mobileMenuOpen) return;

    const y = window.scrollY;
    const { body } = document;
    const previous = { position: body.style.position, top: body.style.top, width: body.style.width };

    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.width = "100%";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.width = previous.width;
      window.scrollTo(0, y);
    };
  }, [mobileMenuOpen]);

  /** Focus moves into the drawer on open and is held there while it is open. */
  React.useEffect(() => {
    const node = drawerRef.current;
    if (!mobileMenuOpen || !node) return;

    const items = () => Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
    items()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = items();
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  /** Closing returns focus to the control that opened it. */
  React.useEffect(() => {
    if (wasOpen.current && !mobileMenuOpen) toggleRef.current?.focus();
    wasOpen.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-(image:--gradient-raised) shadow-(--shadow-relief-sm)">
      <a
        href="#main"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-3 focus-visible:z-50 focus-visible:rounded-(--radius-md) focus-visible:bg-oxblood-900 focus-visible:px-4 focus-visible:py-2 focus-visible:text-limestone-50"
      >
        Skip to content
      </a>

      <div className="shell flex h-18 items-center justify-between gap-6">
        <Link href="/" className="shrink-0" aria-label="Garnet Solutions — home">
          <Image
            src="/logo-garnet.png"
            alt="Garnet Solutions"
            width={1508}
            height={474}
            priority
            className="h-8 w-auto dark:hidden lg:h-9"
          />
          <Image
            src="/logo-garnet-light.png"
            alt="Garnet Solutions"
            width={1508}
            height={474}
            priority
            className="hidden h-8 w-auto dark:block lg:h-9"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {primaryLinks.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              const expanded = openMenu === link.label;
              const panelId = `menu-${link.label.toLowerCase()}`;

              return (
                <li
                  key={link.href}
                  className="relative"
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse" && link.children) setOpenMenu(link.label);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType === "mouse" && link.children) setOpenMenu(null);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setOpenMenu((current) => (current === link.label ? null : current));
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenus}
                      className={cn(
                        "relative py-2 text-sm transition-colors duration-(--duration-fast)",
                        active ? "text-accent" : "text-body hover:text-ink",
                      )}
                    >
                      {link.label}
                      <span
                        className={cn(
                          "absolute inset-x-0 -bottom-px h-px origin-left bg-accent transition-transform duration-(--duration-fast) ease-(--ease-entrance)",
                          active ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>

                    {link.children ? (
                      <button
                        type="button"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        aria-label={`${link.label} submenu`}
                        onClick={() => setOpenMenu(expanded ? null : link.label)}
                        className="-mr-1 ml-0.5 grid size-6 place-items-center rounded-(--radius-sm) text-muted transition-colors duration-(--duration-fast) hover:text-ink"
                      >
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "size-3.5 transition-transform duration-(--duration-fast) ease-(--ease-entrance)",
                            expanded && "rotate-180",
                          )}
                        />
                      </button>
                    ) : null}
                  </div>

                  {link.children ? (
                    <div className="absolute left-1/2 top-full w-80 -translate-x-1/2 pt-2">
                      <AnimatePresence>
                        {expanded ? (
                          <motion.div
                            id={panelId}
                            initial={reduced ? false : { opacity: 0, transform: "scale(0.97)" }}
                            animate={{ opacity: 1, transform: "scale(1)" }}
                            exit={reduced ? undefined : { opacity: 0, transform: "scale(0.97)" }}
                            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                            className="relief-lg corner-brand-sm origin-top p-2"
                          >
                            <ul>
                              {link.children.map((child) => (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={closeMenus}
                                    className="block rounded-(--radius-sm) px-3 py-2.5 text-sm text-body transition-colors duration-(--duration-fast) hover:bg-recess hover:text-ink"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
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
          ref={toggleRef}
          type="button"
          className="-m-2 grid size-10 place-items-center rounded-(--radius-md) text-ink lg:hidden"
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
            ref={drawerRef}
            id="mobile-navigation"
            initial={reduced ? false : { opacity: 0, transform: "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={reduced ? undefined : { opacity: 0, transform: "translateY(-8px)" }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain border-b border-line bg-(image:--gradient-raised) shadow-(--shadow-relief) lg:hidden"
          >
            <nav aria-label="Primary" className="shell py-6">
              <ul className="space-y-1">
                {primaryLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenus}
                      className="block py-2.5 text-base text-ink"
                    >
                      {link.label}
                    </Link>
                    {link.children ? (
                      <ul className="mb-2 ml-4 border-l border-line pl-4">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMenus}
                              className="block py-2 text-sm text-muted"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>

              <ButtonLink href="/request-financing" onClick={closeMenus} className="mt-4 w-full">
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