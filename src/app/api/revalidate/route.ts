import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Sanity webhook target.
 *
 * Content is fetched with `revalidate: 3600`, so without this an edit takes up
 * to an hour to appear. The webhook invalidates only the tags for the document
 * that changed, rather than rebuilding the site.
 *
 * Configure in Sanity under API → Webhooks:
 *   URL     https://<site>/api/revalidate
 *   Trigger create, update, delete
 *   Filter  _type in ["siteSettings","service","solution","industry","teamMember","faq","investmentOpportunity","page"]
 *   Projection  {_type, "slug": slug.current}
 *   Secret  the value of SANITY_REVALIDATE_SECRET
 */
export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // Sanity signs the payload; the shared secret header is the simple check.
  const provided = request.headers.get("x-sanity-secret") ?? request.headers.get("authorization");
  if (provided !== secret && provided !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let body: { _type?: string; slug?: string };
  try {
    body = (await request.json()) as { _type?: string; slug?: string };
  } catch {
    return NextResponse.json({ ok: false, message: "Unreadable payload" }, { status: 400 });
  }

  if (!body._type) {
    return NextResponse.json({ ok: false, message: "Missing _type" }, { status: 400 });
  }

  const tags = [body._type];
  if (body.slug) tags.push(`${body._type}:${body.slug}`);

  // Next 16 requires a cacheLife profile alongside the tag. "max" purges
  // entries regardless of which profile cached them, which is what a content
  // edit needs.
  for (const tag of tags) revalidateTag(tag, "max");

  return NextResponse.json({ ok: true, revalidated: tags, now: Date.now() });
}