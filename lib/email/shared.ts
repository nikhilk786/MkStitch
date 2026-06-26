export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function baseEmailLayout({
  title,
  preview,
  children,
}: {
  title: string;
  preview: string;
  children: string;
}) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;background:#F5F5F5;color:#694E4E;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;">${escapeHtml(preview)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F5F5F5;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#FFFFFF;border:1px solid rgba(151,143,102,0.24);border-radius:18px;overflow:hidden;">
            <tr>
              <td style="background:#FFCEE3;padding:24px 28px;">
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;color:#694E4E;">MKSTITCH</div>
                <div style="margin-top:6px;font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:#694E4E;font-weight:700;">Kurti Atelier</div>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 28px;">
                ${children}
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid rgba(151,143,102,0.22);padding:18px 28px;font-size:12px;line-height:20px;color:rgba(92,79,74,0.72);">
                MKSTITCH Kurti Atelier<br />
                Premium ethnic wear, graceful silhouettes, and soft fabrics for modern women.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
