import { baseEmailLayout, escapeHtml } from "@/lib/email/shared";

export type ContactAdminEmailValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  ip: string;
};

export function contactAdminEmail(values: ContactAdminEmailValues) {
  const rows = [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone || "Not provided"],
    ["Subject", values.subject],
    ["Date", values.date],
    ["IP", values.ip || "Not available"],
  ];

  return baseEmailLayout({
    title: "New Contact Form Submission",
    preview: `New message from ${values.name}`,
    children: `
      <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.1;color:#5C4F4A;">New contact form submission</h1>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border-collapse:collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="width:120px;padding:10px 0;font-size:13px;font-weight:700;color:#978F66;">${escapeHtml(label)}</td>
                <td style="padding:10px 0;font-size:14px;color:#5C4F4A;">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <div style="margin-top:22px;padding:18px;border-radius:14px;background:#fbf8ef;border:1px solid rgba(151,143,102,0.18);">
        <div style="margin-bottom:8px;font-size:13px;font-weight:700;color:#978F66;">Message</div>
        <div style="white-space:pre-wrap;font-size:15px;line-height:24px;color:#5C4F4A;">${escapeHtml(values.message)}</div>
      </div>
    `,
  });
}
