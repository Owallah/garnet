# Email setup (Brevo)

The site sends two messages per submission: a notification to Garnet and an
acknowledgement to the person who filled the form. Three routes do this —
`/api/contact`, `/api/financing` and `/api/enquiry` — and all of them go through
`src/lib/email/client.ts`.

Nothing breaks without Brevo configured. The routes validate, rate-limit and
return success, and the send is skipped with a warning in the server log. That
is deliberate, so the forms can be worked on before the account exists.

## 1. Account

Sign up at [brevo.com](https://www.brevo.com). The free tier allows 300
transactional emails a day, which is comfortably more than this site will
generate.

Brevo will ask what you are using it for — choose transactional email, not
marketing campaigns. Marketing sending has stricter approval and is not what
this site does.

## 2. Verify a sender

**Senders, Domains & Dedicated IPs → Senders → Add a sender.**

For development you can verify a single address, for example
`no-reply@garnetsolutionsltd.com`, and Brevo will email a confirmation link to
it. That is enough to start.

**Before launch, verify the whole domain instead.** Under **Domains → Add a
domain**, Brevo gives you DKIM and DMARC records to add to the DNS for
`garnetsolutionsltd.com`. Without domain authentication, mail sent on Garnet's
behalf is far more likely to land in spam — which matters most for the
acknowledgement, since an applicant who does not receive one assumes the form
failed.

Sending will be rejected outright if `EMAIL_FROM` is not a verified sender.

## 3. API key

**SMTP & API → API Keys → Generate a new API key.** Name it `garnet-website`.

Copy it immediately. This key can send mail as Garnet, so it belongs in
`.env.local` and in the hosting provider's environment variables, never in the
repository.

Note this is the **API key**, not the SMTP key. The two are different and only
the API key works here.

## 4. Environment

```
BREVO_API_KEY=xkeysib-...
EMAIL_FROM="Garnet Solutions <no-reply@garnetsolutionsltd.com>"
CONTACT_EMAIL=info@garnetsolutionsltd.com
FINANCING_EMAIL=
INVESTMENT_EMAIL=
EMAIL_SANDBOX=true
```

`EMAIL_FROM` must match a verified sender exactly.

`CONTACT_EMAIL` is the fallback for all three inboxes. Set `FINANCING_EMAIL` and
`INVESTMENT_EMAIL` only if those enquiries should go somewhere different — worth
asking Garnet, because financing requests and investment enquiries often belong
with different people.

## 5. Sandbox mode while developing

Keep `EMAIL_SANDBOX=true` in `.env.local`. Brevo validates the request, returns
success and drops the message: no delivery, no log entry, no quota used. The
entire path — validation, rate limiting, template rendering, the API call — is
exercised for real, so a payload mistake still surfaces.

Set it to `false` when you want to see actual messages, and leave it unset in
production.

## 6. Testing

With `npm run dev` running:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Person",
    "email": "you@example.com",
    "phone": "0712345678",
    "areaOfInterest": "financing",
    "message": "Checking that the contact form reaches the right inbox.",
    "consent": true
  }'
```

Expect `{"ok":true}`. Then work through the real forms at `/contact` and
`/request-financing`.

Check both sides: the notification arriving at `CONTACT_EMAIL`, and the
acknowledgement arriving at the address you submitted. Reply-to on the
notification is set to the enquirer, so replying from the inbox goes straight
back to them.

## 7. What to watch in the logs

All email failures log and none of them surface to the user — a valid enquiry
should never be turned into an error message because a mail provider had a bad
minute.

| Log line | Meaning |
|---|---|
| `BREVO_API_KEY missing` | Not set, or the server was not restarted after editing `.env.local` |
| `Brevo rejected the send (401)` | Wrong key, or the SMTP key was used instead of the API key |
| `Brevo rejected the send (400 invalid_parameter)` | Usually `EMAIL_FROM` is not a verified sender |
| `Brevo rejected the send (402)` | Daily quota exhausted |

## Rate limiting

Each route is limited per IP per minute: five for contact, three each for
financing and investment enquiries. In development this is an in-memory map, so
it resets when the server restarts and does not hold across serverless
instances. Production needs the Upstash variables set, or the limit is
per-instance and effectively porous.