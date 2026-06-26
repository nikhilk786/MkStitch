"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { contactAdminEmail } from "@/lib/email/contact-admin";
import { contactUserEmail } from "@/lib/email/contact-user";
import { newsletterWelcomeEmail } from "@/lib/email/newsletter-welcome";
import { db } from "@/lib/db";
import { newsletterSubscribers } from "@/lib/db/schema";
import { getEmailTransporter, getEmailUser } from "@/lib/nodemailer";

export type EmailActionState = {
  success: boolean;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactRateLimit = new Map<string, number[]>();
const newsletterRateLimit = new Map<string, number[]>();

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function isValidEmail(email: string) {
  return email.length <= 255 && emailPattern.test(email);
}

async function getClientIp() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();

  return (
    forwardedFor ||
    headerStore.get("x-real-ip") ||
    headerStore.get("cf-connecting-ip") ||
    "Not available"
  );
}

function rateLimited(
  store: Map<string, number[]>,
  key: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  const recent = (store.get(key) ?? []).filter((timestamp) => now - timestamp < windowMs);

  if (recent.length >= limit) {
    store.set(key, recent);
    return true;
  }

  recent.push(now);
  store.set(key, recent);
  return false;
}

export async function sendContactEmailAction(
  _state: EmailActionState,
  formData: FormData,
): Promise<EmailActionState> {
  const ip = await getClientIp();
  const name = cleanText(formData.get("name"), 120);
  const email = cleanText(formData.get("email"), 255).toLowerCase();
  const phone = cleanText(formData.get("phone"), 40);
  const subject = cleanText(formData.get("subject"), 160);
  const message = cleanText(formData.get("message"), 3000);

  if (rateLimited(contactRateLimit, `${ip}:${email || "anonymous"}`, 5, 15 * 60 * 1000)) {
    return {
      success: false,
      message: "Too many messages submitted. Please try again later.",
    };
  }

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Please complete all required fields.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  try {
    const transporter = getEmailTransporter();
    const adminEmail = getEmailUser();
    const date = new Date().toISOString();

    await transporter.sendMail({
      from: `"ClothWeb Contact" <${adminEmail}>`,
      to: adminEmail,
      replyTo: email,
      subject: "New Contact Form Submission",
      html: contactAdminEmail({
        name,
        email,
        phone,
        subject,
        message,
        date,
        ip,
      }),
    });

    await transporter.sendMail({
      from: `"ClothWeb Kurti Atelier" <${adminEmail}>`,
      to: email,
      subject: "Thank you for contacting us",
      html: contactUserEmail({ name }),
    });

    return {
      success: true,
      message: "Your message has been sent. We will reply soon.",
    };
  } catch (error) {
    console.error("Contact email failed", error);

    return {
      success: false,
      message: "We could not send your message right now. Please try again later.",
    };
  }
}

export async function subscribeNewsletterAction(
  _state: EmailActionState,
  formData: FormData,
): Promise<EmailActionState> {
  const ip = await getClientIp();
  const email = cleanText(formData.get("email"), 255).toLowerCase();

  if (rateLimited(newsletterRateLimit, `${ip}:${email || "anonymous"}`, 8, 15 * 60 * 1000)) {
    return {
      success: false,
      message: "Too many subscription attempts. Please try again later.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  try {
    const [existing] = await db
      .select({
        id: newsletterSubscribers.id,
        isSubscribed: newsletterSubscribers.isSubscribed,
      })
      .from(newsletterSubscribers)
      .where(eq(newsletterSubscribers.email, email))
      .limit(1);

    if (existing?.isSubscribed) {
      return {
        success: true,
        message: "Already subscribed.",
      };
    }

    if (existing) {
      await db
        .update(newsletterSubscribers)
        .set({ isSubscribed: true, updatedAt: new Date() })
        .where(eq(newsletterSubscribers.id, existing.id));
    } else {
      await db.insert(newsletterSubscribers).values({
        email,
        isSubscribed: true,
      });
    }

    const adminEmail = getEmailUser();
    await getEmailTransporter().sendMail({
      from: `"ClothWeb Kurti Atelier" <${adminEmail}>`,
      to: email,
      subject: "Welcome to ClothWeb",
      html: newsletterWelcomeEmail(),
    });

    return {
      success: true,
      message: "Subscribed successfully. Please check your inbox.",
    };
  } catch (error) {
    console.error("Newsletter subscription failed", error);

    return {
      success: false,
      message: "We could not subscribe you right now. Please try again later.",
    };
  }
}
