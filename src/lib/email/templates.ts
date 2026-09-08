import "server-only";

const escape = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const shell = (title: string, body: string) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" />
<title>${escape(title)}</title></head>
<body style="margin:0;background:#faf9f8;font-family:Helvetica,Arial,sans-serif;color:#3a3234;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e6e2de;">
        <tr><td style="background:#280000;padding:20px 28px;">
          <span style="color:#faf9f8;font-size:15px;letter-spacing:.04em;">Garnet Solutions Limited</span>
        </td></tr>
        <tr><td style="padding:28px;">${body}</td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid #e6e2de;font-size:12px;color:#6b6062;">
          Garnet facilitates and structures financing through partner institutions. It does not lend from its own balance sheet.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const rows = (data: Record<string, unknown>) =>
  Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([key, value]) => `<tr>
        <td style="padding:8px 0;width:180px;vertical-align:top;font-size:13px;color:#6b6062;">${escape(key)}</td>
        <td style="padding:8px 0;font-size:14px;color:#3a3234;">${escape(value)}</td>
      </tr>`,
    )
    .join("");

export function internalNotification(input: {
  heading: string;
  intro: string;
  data: Record<string, unknown>;
}) {
  return shell(
    input.heading,
    `<h1 style="margin:0 0 8px;font-size:20px;color:#280000;font-weight:600;">${escape(input.heading)}</h1>
     <p style="margin:0 0 20px;font-size:14px;color:#6b6062;">${escape(input.intro)}</p>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows(input.data)}</table>`,
  );
}

export function acknowledgement(input: {
  firstName: string;
  heading: string;
  body: string;
}) {
  return shell(
    input.heading,
    `<h1 style="margin:0 0 12px;font-size:20px;color:#280000;font-weight:600;">${escape(input.heading)}</h1>
     <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Hello ${escape(input.firstName)},</p>
     <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">${escape(input.body)}</p>
     <p style="margin:0;font-size:15px;line-height:1.6;">Garnet Solutions Limited</p>`,
  );
}
