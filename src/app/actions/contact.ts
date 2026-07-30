"use server";

import nodemailer from "nodemailer";

import type { ContactState } from "@/lib/contact-state";
import { defaultLocale, getDictionary, isLocale } from "@/lib/i18n";
import { CONTACT_EMAIL } from "@/lib/site";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readTransportConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 465);

  return {
    host,
    port,
    /* Port 465 is implicit TLS, everything else upgrades with STARTTLS. */
    secure: port === 465,
    auth: { user, pass },
  };
}

export async function sendContactMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  /* The form carries the language it was rendered in, so replies match it. */
  const submitted = String(formData.get("locale") ?? "");
  const locale = isLocale(submitted) ? submitted : defaultLocale;
  const copy = getDictionary(locale).contact.form;

  /* Hidden field. Bots fill everything, people never see it. */
  if (typeof formData.get("company") === "string" && formData.get("company")) {
    return { status: "success", message: copy.success };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const values = { name, email, message };

  const errors: ContactState["errors"] = {};
  if (name.length < 2) errors.name = copy.errors.name;
  if (!EMAIL_PATTERN.test(email)) errors.email = copy.errors.email;
  if (message.length < 10) errors.message = copy.errors.message;

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const config = readTransportConfig();

  if (!config) {
    console.error(
      "Brak konfiguracji SMTP. Ustaw SMTP_HOST, SMTP_USER i SMTP_PASS w .env.local",
    );
    return { status: "error", message: copy.unavailable, values };
  }

  const recipient = process.env.CONTACT_TO ?? CONTACT_EMAIL;

  try {
    const transporter = nodemailer.createTransport(config);

    await transporter.sendMail({
      from: `"Formularz F&J Studio" <${config.auth.user}>`,
      to: recipient,
      replyTo: `"${name}" <${email}>`,
      subject: `Nowa wiadomość ze strony (${locale}): ${name}`,
      text: [`Imię: ${name}`, `E-mail: ${email}`, "", message].join("\n"),
    });

    return { status: "success", message: copy.success };
  } catch (error) {
    console.error("Nie udało się wysłać wiadomości z formularza", error);
    return { status: "error", message: copy.failed, values };
  }
}
