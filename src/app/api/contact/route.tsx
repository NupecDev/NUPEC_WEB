import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const CONTACT_RECIPIENTS = (process.env.CONTACT_EMAIL_TO ?? "nupec@gponutec.com,nupec_info@nupec.com")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, state, contactType, subject, message } = await req.json();

    if (!name || !email || !phone || !state || !contactType || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP,
      port: Number(process.env.EMAIL_PORT ?? 587),
      secure: Number(process.env.EMAIL_PORT ?? 587) === 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const contactTypeLabel = contactType === "vet" ? "Médico veterinario" : "Consumidor";

    await transporter.sendMail({
      from: `"NUPEC - Formulario de contacto" <${process.env.EMAIL_FROM}>`,
      to: CONTACT_RECIPIENTS,
      replyTo: email,
      subject: `Nuevo contacto: ${subject}`,
      html: `
        <h2>Nuevo mensaje desde el formulario de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Estado:</strong> ${escapeHtml(state)}</p>
        <p><strong>Tipo de contacto:</strong> ${escapeHtml(contactTypeLabel)}</p>
        <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Message received!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
