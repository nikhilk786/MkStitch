import { baseEmailLayout, escapeHtml } from "@/lib/email/shared";

export function contactUserEmail({ name }: { name: string }) {
  return baseEmailLayout({
    title: "Thank you for contacting us",
    preview: "We received your message and will reply soon.",
    children: `
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.1;color:#694E4E;">Thank you for contacting us</h1>
      <p style="margin:18px 0 0;font-size:15px;line-height:25px;">Dear ${escapeHtml(name)},</p>
      <p style="margin:14px 0 0;font-size:15px;line-height:25px;">
        We have received your message and our boutique team will get back to you soon.
      </p>
      <p style="margin:14px 0 0;font-size:15px;line-height:25px;">
        Thank you for reaching out to MKSTITCH Kurti Atelier. We are happy to help with styling, orders, and collection questions.
      </p>
      <a href="https://mkstitch.vercel.app/shop" style="display:inline-block;margin-top:24px;border-radius:999px;background:#694E4E;color:#ffffff;text-decoration:none;padding:13px 22px;font-size:14px;font-weight:700;">
        Explore the Collection
      </a>
    `,
  });
}
