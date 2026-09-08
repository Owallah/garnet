# Garnet Solutions Limited — website

Phase 1 scaffold. Next.js 16 (App Router, Turbopack), TypeScript, Tailwind v4,
Sanity v6, Zod v4, Zustand v5, Resend, Motion.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in what you have; the site runs without any of it
npm run dev
```

The build fetches Archivo and Newsreader from Google Fonts, so the machine
running `next build` needs outbound access to `fonts.googleapis.com`. If a CI
environment blocks it, self-host both families with `next/font/local` — that is
the only change needed.

Nothing is required to boot. With no Sanity project id, `sanityFetch` returns
its fallback and pages render their static skeletons. With no `RESEND_API_KEY`,
form routes validate and return success while logging that the send was
skipped. This is deliberate: the site must be reviewable before the client has
supplied credentials or content.

## What exists

- **Design tokens** — `src/app/globals.css`. Colour, type scale, spacing,
  radius, elevation and motion, all as Tailwind v4 `@theme` variables.
  Components read tokens; they never hard-code values.
- **Layout** — header with dropdown navigation and an animated mobile drawer,
  footer that suppresses any contact row the CMS has not supplied.
- **Homepage** — all nine sections from the brief, structurally complete,
  awaiting art direction.
- **Routes** — every path in the IA, including the seven service routes, five
  industries, three solutions, and the `/investments/[slug]` template.
- **Sanity** — nine schemas, GROQ queries, typed results, Studio at `/studio`.
- **Forms** — Zod schemas shared by client and server, three API routes with
  server revalidation, rate limiting, honeypot, optional Turnstile, body-size
  limits and non-leaking error responses.
- **SEO** — metadata, canonicals, OpenGraph, sitemap, robots.

## Decisions worth knowing

**The brand colour cannot be used on the dark ground.** `#8d0130` on `#280000`
is 2.0:1. Text and icons on `.on-dark` sections use `limestone` or `brass`
instead. The token file says so at the top; please keep that constraint.

**Error red is orange-shifted** (`#b23a18`) so form validation never reads as
brand garnet.

**Financing amount is a band, not a free number.** Bands qualify an enquiry
without implying an offer, and they survive a currency switch.

**Consent is stripped on rehydrate.** The financing store persists to
`sessionStorage` so a part-finished enquiry survives a refresh, but consent must
be given in the session that submits.

**Images are honest placeholders.** `MediaSlot` renders a labelled slot with the
art-direction brief until a real image is attached in Sanity — never a gradient
standing in for a photograph.

**Every page must survive empty CMS content.** `sanityFetch` returns a fallback
rather than throwing, so a missing document degrades a section instead of
breaking a route.

## Still needed from the client

Company profile document · logo files · exact address, phone, WhatsApp, office
hours, map location · social profiles · leadership photos and bios · privacy and
terms copy · approved imagery · Resend sending domain and DNS access · Sanity
project id.

## Next phases

2. Art direction: hero, dark sections, typography in place, motion language.
3. About, approach, leadership.
4. Service template content and all seven routes.
5. Solutions and industries.
6. Investments.
7. FAQs, contact, multi-step financing form.
8–10. Sanity content entry, email wiring, then SEO, accessibility and
performance QA.
