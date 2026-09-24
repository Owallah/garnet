/**
 * Seeds Sanity with the drafted content from src/content.
 *
 *   npm run seed          create anything missing, touch nothing that exists
 *   npm run seed -- --force   overwrite the seeded documents
 *   npm run seed -- --dry     print what would happen and exit
 *
 * Default behaviour is create-if-missing, and that is the important part: the
 * client will edit this copy in the studio, and a seed script that overwrites
 * on every run would silently discard their work the next time someone set up
 * a dataset. --force exists for when you genuinely want the drafts back.
 *
 * Document ids are deterministic (service.logistics, industry.agriculture),
 * so re-running is safe and references can be wired without lookups.
 *
 * References are circular — a service points at industries, an industry points
 * back at services — so this runs in two passes: create everything without
 * cross-references, then patch the references in.
 */

import { createClient } from "@sanity/client";
import { services } from "../src/content/services.ts";
import { solutions } from "../src/content/solutions.ts";
import { industries } from "../src/content/industries.ts";
import { faqs } from "../src/content/faqs.ts";
import { leadership } from "../src/content/company.ts";

/**
 * Company constants are repeated here rather than imported from
 * src/lib/site-config, which pulls in the "@/" path alias that Node's own
 * loader cannot resolve outside the Next build.
 */
const company = {
  name: "Garnet Solutions Limited",
  email: "info@garnetsolutionsltd.com",
  description:
    "Garnet Solutions Limited structures and facilitates financing through partner institutions, deploys its own capital into qualifying investments, and coordinates logistics for businesses across Kenya and East Africa.",
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry");

if (!projectId) {
  console.error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Copy .env.example to .env.local first.");
  process.exit(1);
}

if (!token && !dryRun) {
  console.error(
    "SANITY_API_WRITE_TOKEN is not set.\n" +
      "Create one at sanity.io/manage → API → Tokens with Editor permissions.\n" +
      "Keep it out of .env.local if that file is ever committed — this token can write to your dataset.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01",
  useCdn: false,
});

/* ---------------------------------------------------------------- helpers */

let created = 0;
let skipped = 0;
let patched = 0;
let referencesSkipped = 0;

/** Ids actually written this run (created, or replaced under --force). */
const writable = new Set<string>();

const key = (prefix: string, value: string) => `${prefix}.${value}`;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);

/** Plain paragraphs into Portable Text blocks. */
function toPortableText(paragraphs: string[]) {
  return paragraphs.map((text, index) => ({
    _type: "block",
    _key: `b${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${index}`, text, marks: [] }],
  }));
}

const withKeys = <T extends Record<string, unknown>>(items: T[], prefix: string) =>
  items.map((item, index) => ({ ...item, _key: `${prefix}${index}` }));

const reference = (id: string, index: number, prefix: string) => ({
  _type: "reference" as const,
  _ref: id,
  _key: `${prefix}${index}`,
});

async function put(doc: Record<string, unknown> & { _id: string; _type: string }) {
  if (dryRun) {
    console.log(`  would ${force ? "replace" : "create"} ${doc._id}`);
    return;
  }

  if (force) {
    await client.createOrReplace(doc as never);
    created += 1;
    writable.add(doc._id);
    return;
  }

  const existing = await client.getDocument(doc._id);
  if (existing) {
    skipped += 1;
    return;
  }

  await client.create(doc as never);
  created += 1;
  writable.add(doc._id);
}

/* ------------------------------------------------------------ pass 1: docs */

async function seedFaqs() {
  console.log("FAQs");
  for (const [index, faq] of faqs.entries()) {
    await put({
      _id: key("faq", slugify(faq.question)),
      _type: "faq",
      question: faq.question,
      answer: toPortableText(faq.answer),
      category: faq.category,
      order: index,
      published: true,
    });
  }
}

async function seedIndustries() {
  console.log("Industries");
  for (const [index, industry] of industries.entries()) {
    await put({
      _id: key("industry", industry.slug),
      _type: "industry",
      title: industry.title,
      slug: { _type: "slug", current: industry.slug },
      description: industry.description,
      financingNeeds: toPortableText(industry.overview),
      challenges: withKeys(
        industry.challenges.map((item) => ({
          _type: "featureItem",
          title: item.title,
          description: item.description,
        })),
        "c",
      ),
      order: index,
    });
  }
}

async function seedSolutions() {
  console.log("Solutions");
  for (const [index, solution] of solutions.entries()) {
    await put({
      _id: key("solution", solution.slug),
      _type: "solution",
      title: solution.title,
      slug: { _type: "slug", current: solution.slug },
      description: solution.description,
      painPoints: withKeys(
        solution.painPoints.map((item) => ({
          _type: "featureItem",
          title: item.title,
          description: item.description,
        })),
        "p",
      ),
      order: index,
    });
  }
}

async function seedServices() {
  console.log("Services");
  for (const [index, service] of services.entries()) {
    await put({
      _id: key("service", service.slug),
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      category: service.category,
      shortDescription: service.shortDescription,
      overview: toPortableText(service.overview),
      garnetRole: service.garnetRole,
      capabilities: withKeys(
        service.capabilities.map((item) => ({
          _type: "featureItem",
          title: item.title,
          description: item.description,
        })),
        "c",
      ),
      process: withKeys(
        service.process.map((step) => ({
          _type: "processStep",
          title: step.title,
          description: step.description,
        })),
        "s",
      ),
      audience: service.audience,
      order: index,
    });
  }
}

async function seedTeam() {
  console.log("Leadership");
  for (const person of leadership) {
    await put({
      _id: key("team", slugify(person.name)),
      _type: "teamMember",
      name: person.name,
      position: person.position,
      biography: person.biography,
      order: person.order,
      featured: person.order <= 2,
    });
  }
}

async function seedSiteSettings() {
  console.log("Site settings");
  await put({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: company.name,
    tagline: "Integrated financing, investment and logistics solutions",
    email: company.email,
    footerSummary: company.description,
    // Phone, address, WhatsApp, hours and socials are deliberately absent.
    // The client fills these in the studio; the site hides each block until
    // they do, and seeding a placeholder would risk one being published.
    defaultSeo: {
      _type: "seo",
      title: `${company.name} — Financing, Investment and Logistics in Kenya`,
      description: company.description,
      noIndex: false,
    },
  });
  console.log(
    "  note: phone, address, WhatsApp, hours and social links are left empty by design",
  );
}

/* ------------------------------------------------- pass 2: cross-references */

async function linkReferences() {
  if (dryRun) {
    console.log("References: skipped in dry run");
    return;
  }

  console.log("Linking references");

  // A document left alone in pass 1 (already existed, no --force) may have had
  // its references hand-edited in the studio since. Only touch documents this
  // run actually wrote, so that guarantee holds for reference fields too.
  const canPatch = (id: string) => {
    if (force || writable.has(id)) return true;
    referencesSkipped += 1;
    return false;
  };

  for (const service of services) {
    const id = key("service", service.slug);
    if (!canPatch(id)) continue;

    const relatedFaqs = faqs
      .filter((faq) => faq.services?.includes(service.slug))
      .map((faq) => key("faq", slugify(faq.question)));

    await client
      .patch(id)
      .set({
        relatedIndustries: service.relatedIndustries.map((slug, index) =>
          reference(key("industry", slug), index, "ri"),
        ),
        relatedSolutions: service.relatedSolutions.map((slug, index) =>
          reference(key("solution", slug), index, "rs"),
        ),
        faqs: relatedFaqs.map((id, index) => reference(id, index, "fq")),
      })
      .commit();
    patched += 1;
  }

  for (const solution of solutions) {
    const id = key("solution", solution.slug);
    if (!canPatch(id)) continue;

    await client
      .patch(id)
      .set({
        services: solution.services.map((slug, index) =>
          reference(key("service", slug), index, "sv"),
        ),
      })
      .commit();
    patched += 1;
  }

  for (const industry of industries) {
    const id = key("industry", industry.slug);
    if (!canPatch(id)) continue;

    await client
      .patch(id)
      .set({
        relevantServices: industry.relevantServices.map((slug, index) =>
          reference(key("service", slug), index, "sv"),
        ),
      })
      .commit();
    patched += 1;
  }

  if (referencesSkipped > 0) {
    console.log(
      `  ${referencesSkipped} document(s) already existed — their references were left as-is. Use --force to reset them.`,
    );
  }
}

/* -------------------------------------------------------------------- run */

async function main() {
  console.log(
    `Seeding ${projectId}/${dataset}${force ? " (force: existing documents will be replaced)" : ""}${
      dryRun ? " (dry run)" : ""
    }\n`,
  );

  // Order matters: referenced documents must exist before they are pointed at.
  await seedFaqs();
  await seedIndustries();
  await seedSolutions();
  await seedServices();
  await seedTeam();
  await seedSiteSettings();
  await linkReferences();

  console.log(
    `\nDone. ${created} created, ${skipped} left alone, ${patched} reference sets written.`,
  );

  if (skipped > 0 && !force) {
    console.log("Existing documents were not touched. Re-run with --force to overwrite them.");
  }

  console.log(
    "\nStill to do in the studio: upload images, add leadership photos, and fill in the contact details.",
  );}

main().catch((error) => {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
