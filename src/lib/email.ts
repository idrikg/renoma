import { Resend } from "resend";
import {
  budgetLabel,
  categoryLabels,
  contactPreferenceLabel,
  desiredStartLabel,
  propertyTypeLabel,
  type ProjectRequestInput,
} from "@/lib/validation";

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const fromAddress =
  process.env.RESEND_FROM_EMAIL ?? "RENOMA <onboarding@resend.dev>";
const notificationAddress = process.env.INQUIRY_NOTIFICATION_EMAIL;

/**
 * Sends the internal lead-notification email to the business inbox and a
 * short confirmation email to the customer. Both sends are best-effort and
 * failures are logged rather than thrown, so a missing/invalid API key in
 * early development does not block the on-page success state — the
 * Server Action caller decides how to surface partial failures.
 */
export async function sendProjectRequestEmails(input: ProjectRequestInput) {
  const client = getResendClient();

  if (!client) {
    console.warn(
      "[email] RESEND_API_KEY is not set — skipping email delivery. Set it in .env.local to enable lead notifications."
    );
    return { notified: false, confirmed: false };
  }

  const results = await Promise.allSettled([
    notificationAddress
      ? client.emails.send({
          from: fromAddress,
          to: notificationAddress,
          replyTo: input.email,
          subject: `Neues Projekt: ${categoryLabels(input.categories).join(", ")} — ${input.firstName} ${input.lastName}`,
          html: buildNotificationEmail(input),
        })
      : Promise.reject(
          new Error(
            "INQUIRY_NOTIFICATION_EMAIL is not set — no recipient for lead notifications."
          )
        ),
    client.emails.send({
      from: fromAddress,
      to: input.email,
      subject: "Willkommen bei RENOMA",
      html: buildConfirmationEmail(input),
    }),
  ]);

  const [notification, confirmation] = results;

  if (notification.status === "rejected") {
    console.error("[email] Failed to send lead notification:", notification.reason);
  }
  if (confirmation.status === "rejected") {
    console.error("[email] Failed to send customer confirmation:", confirmation.reason);
  }

  return {
    notified: notification.status === "fulfilled",
    confirmed: confirmation.status === "fulfilled",
  };
}

function buildNotificationEmail(input: ProjectRequestInput): string {
  const rows: Array<[string, string]> = [
    ["Name", `${input.firstName} ${input.lastName}`],
    ["E-Mail", input.email],
    ["Telefon", input.phone || "—"],
    ["Bevorzugter Kontaktweg", contactPreferenceLabel(input.preferredContact)],
    ["Bereiche", categoryLabels(input.categories).join(", ")],
    ["PLZ / Ort", `${input.postalCode} ${input.city}`],
    ["Objektart", propertyTypeLabel(input.propertyType)],
    ["Ungefähre Fläche", input.areaSqm || "—"],
    ["Baujahr", input.constructionYear || "—"],
    ["Gewünschter Start", desiredStartLabel(input.desiredStart)],
    ["Investitionsrahmen", budgetLabel(input.budgetRange)],
    [
      "Bilder",
      input.imageCount > 0
        ? `${input.imageCount} Bild(er) ausgewählt — Hinweis: permanenter Bild-Upload ist technisch noch nicht angebunden, es wurden keine Dateien übertragen.`
        : "Keine Bilder ausgewählt",
    ],
  ];

  return `
    <div style="font-family: sans-serif; color: #14110f; max-width: 560px;">
      <h2 style="font-size: 18px; margin-bottom: 16px;">Neue Projektanfrage über den Projekt-Assistenten</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 6px 0; color: #6f6a62; width: 160px; vertical-align: top;">${escapeHtml(label)}</td>
            <td style="padding: 6px 0;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      ${
        input.wishes
          ? `<p style="margin-top: 16px; font-size: 14px; color: #6f6a62;">Wünsche</p>
             <p style="font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(input.wishes)}</p>`
          : ""
      }
    </div>
  `;
}

function buildConfirmationEmail(input: ProjectRequestInput): string {
  return `
    <div style="font-family: sans-serif; color: #14110f; max-width: 480px;">
      <p style="font-size: 16px; letter-spacing: 0.05em; color: #a8703f; margin-bottom: 24px;">RENOMA</p>
      <h2 style="font-size: 22px; margin-bottom: 12px;">Willkommen bei RENOMA.</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #322c26;">
        Vielen Dank für Ihr Vertrauen, ${escapeHtml(input.firstName)}.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #322c26; margin-top: 12px;">
        Ab jetzt stehen wir auf Ihrer Seite. Ihr persönlicher Ansprechpartner
        meldet sich schnellstmöglich bei Ihnen.
      </p>
      <p style="font-size: 14px; color: #6f6a62; margin-top: 32px;">Das RENOMA Team</p>
    </div>
  `;
}
