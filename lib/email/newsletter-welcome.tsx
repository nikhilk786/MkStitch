import { baseEmailLayout } from "@/lib/email/shared";

export function newsletterWelcomeEmail() {
  return baseEmailLayout({
    title: "Welcome to MKSTITCH",
    preview: "Thank you for joining the MKSTITCH boutique letter.",
    children: `
      <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:38px;line-height:1.08;color:#694E4E;">Welcome to MKSTITCH</h1>
      <p style="margin:18px 0 0;font-size:15px;line-height:25px;">
        Thank you for joining our boutique letter.
      </p>
      <p style="margin:14px 0 0;font-size:15px;line-height:25px;">
        MKSTITCH brings together premium kurtis, graceful Indian silhouettes, soft fabrics, and thoughtful finishing for modern women.
      </p>
      <a href="https://mkstitch.vercel.app/shop" style="display:inline-block;margin-top:24px;border-radius:999px;background:#694E4E;color:#ffffff;text-decoration:none;padding:13px 24px;font-size:14px;font-weight:700;">
        Shop Now
      </a>
    `,
  });
}
