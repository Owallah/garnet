# Sanity setup

Everything on the site renders without Sanity — pages fall back to the drafted
content in `src/content`. Connecting Sanity hands editing to the client; it does
not change what the site looks like on day one.

## 1. Create the project

At [sanity.io/manage](https://sanity.io/manage), create a project and a dataset
called `production`. Note the project ID.

Add the deployed site and `http://localhost:3000` to **API → CORS origins**,
with credentials allowed, or the embedded studio cannot talk to the dataset.

## 2. Tokens

Create these under **API → Tokens**:

| Token | Permission | Used by |
|---|---|---|
| `SANITY_API_READ_TOKEN` | Viewer | server-side fetching of drafts, optional today |
| `SANITY_API_WRITE_TOKEN` | Editor | `npm run seed` only — never deployed |

The write token can modify the dataset. Keep it in `.env.local`, out of version
control, and delete it once seeding is done if you would rather not hold it.

## 3. Environment

In `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=
SANITY_REVALIDATE_SECRET=some-long-random-string
```

Set the same values (minus the write token) in the hosting provider.

## 4. Seed

```bash
npm run seed -- --dry     # show what would happen, change nothing
npm run seed              # create anything missing
npm run seed -- --force   # overwrite the seeded documents
```

The default is **create-if-missing**. Re-running never overwrites an edit the
client has made in the studio — that is the whole point, because this copy is
meant to be edited. Use `--force` only when you deliberately want the drafts
back.

Document IDs are deterministic (`service.logistics`, `industry.agriculture`), so
the script is safe to run repeatedly and references resolve without lookups.
References are wired in a second pass, because services and industries point at
each other.

Seeded: 14 FAQs, 5 industries, 3 solutions, 7 services, 5 leadership records,
and site settings.

**Not seeded, deliberately:** phone, address, WhatsApp, office hours and social
links. Each block stays hidden on the site until the client fills it in, and
seeding a placeholder risks one being published as though it were real.

## 5. Studio

Visit `/studio`. It is excluded from `robots.txt` and the sitemap.

`Site settings` is a singleton — it cannot be duplicated, unpublished or
deleted from the studio, so the site can never end up reading the wrong one.

## 6. Webhook

Content is cached with `revalidate: 3600`, so without this an edit takes up to
an hour to appear. Under **API → Webhooks**, add:

- **URL** `https://your-site/api/revalidate`
- **Trigger on** create, update, delete
- **Filter** `_type in ["siteSettings","service","solution","industry","teamMember","faq","investmentOpportunity","page"]`
- **Projection** `{_type, "slug": slug.current}`
- **HTTP header** `x-sanity-secret: <SANITY_REVALIDATE_SECRET>`

Only the tags for the changed document are invalidated — the site is not
rebuilt.

## How content resolves

Sanity wins field by field; the drafts fill whatever the CMS has not been given.
An editor can rewrite one section of a service page without emptying the rest of
it, and a failed query degrades a section instead of breaking the route.

## What the client should do first

1. Upload the hero and reach photographs, and the two commissioned shots.
2. Add the five leadership portraits.
3. Fill in the contact details.
4. Read through the service pages, checking `Garnet's role` on each — that is
   the field that must never drift from the facilitation-versus-own-capital
   distinction.