import nodemailer from "nodemailer";

export function getEmailTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASS are required for email delivery.");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });
}

export function getEmailUser() {
  const user = process.env.EMAIL_USER;

  if (!user) {
    throw new Error("EMAIL_USER is required for email delivery.");
  }

  return user;
}
