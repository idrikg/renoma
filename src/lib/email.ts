import { Resend } from "resend";
import { logServerError } from "@/lib/logger";
import { getContactEmail, legalConfig } from "@/lib/legal-config";
import {
  categoryLabels,
  contactPreferenceLabel,
  desiredStartLabel,
  objectDescription,
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
 * Sends the internal lead-notification email to the business inbox, then
 * — only once that has actually succeeded — the customer-facing
 * confirmation email.
 *
 * The internal notification is the priority and the source of truth for
 * whether a lead was received: a project request must never be silently
 * lost. The customer confirmation is intentionally NOT sent if the
 * internal notification failed — telling a customer "we received your
 * request" while the business never heard about it would be misleading.
 * A failed *confirmation* send, on the other hand, does not affect the
 * overall result: the lead is already safely in the business inbox, so
 * this is logged for follow-up rather than surfaced as a failure.
 */
export async function sendProjectRequestEmails(
  input: ProjectRequestInput
): Promise<{ notified: boolean; confirmed: boolean }> {
  const client = getResendClient();

  if (!client) {
    console.warn(
      "[email] RESEND_API_KEY is not set — skipping email delivery. Set it in .env.local to enable lead notifications."
    );
    return { notified: false, confirmed: false };
  }

  if (!notificationAddress) {
    logServerError(
      "[email] Failed to send lead notification:",
      new Error(
        "INQUIRY_NOTIFICATION_EMAIL is not set — no recipient for lead notifications."
      )
    );
    return { notified: false, confirmed: false };
  }

  try {
    await client.emails.send({
      from: fromAddress,
      to: notificationAddress,
      replyTo: input.email,
      subject: `Neues Projekt: ${categoryLabels(input.categories).join(", ")} — ${input.firstName} ${input.lastName}`,
      html: buildNotificationEmail(input),
    });
  } catch (error) {
    logServerError("[email] Failed to send lead notification:", error);
    return { notified: false, confirmed: false };
  }

  let confirmed = false;
  try {
    await client.emails.send({
      from: fromAddress,
      to: input.email,
      replyTo: getContactEmail(),
      subject: "Ihre Projektanfrage ist bei RENOMA eingegangen",
      html: buildConfirmationEmail(input),
      text: buildConfirmationText(input),
    });
    confirmed = true;
  } catch (error) {
    logServerError("[email] Failed to send customer confirmation:", error);
  }

  return { notified: true, confirmed };
}

function buildNotificationEmail(input: ProjectRequestInput): string {
  const rows: Array<[string, string]> = [
    ["Name", `${input.firstName} ${input.lastName}`],
    ["E-Mail", input.email],
    ["Telefon", input.phone || "—"],
    ["Bevorzugter Kontaktweg", contactPreferenceLabel(input.preferredContact)],
    ["Bereiche", categoryLabels(input.categories).join(", ")],
    ["PLZ / Ort", `${input.postalCode} ${input.city}`],
    ["Objektart", objectDescription(input.objectType, input.houseSubtype ?? "")],
    ["Gewünschter Start", desiredStartLabel(input.desiredStart)],
    [
      "Bilder",
      input.imageCount > 0
        ? `${input.imageCount} Bild(er) ausgewählt — Hinweis: permanenter Bild-Upload ist technisch noch nicht angebunden, es wurden keine Dateien übertragen.`
        : "Keine Bilder ausgewählt",
    ],
  ];

  return `
    <div style="font-family: sans-serif; color: #252422; max-width: 560px;">
      <h2 style="font-size: 18px; margin-bottom: 16px;">Neue Projektanfrage über den Projekt-Assistenten</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 6px 0; color: #5a564f; width: 160px; vertical-align: top;">${escapeHtml(label)}</td>
            <td style="padding: 6px 0;">${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
      ${
        input.wishes
          ? `<p style="margin-top: 16px; font-size: 14px; color: #5a564f;">Wünsche & weitere Informationen</p>
             <p style="font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(input.wishes)}</p>`
          : ""
      }
    </div>
  `;
}

/**
 * "Hallo {Vorname}," when a first name can be reliably read from the
 * form, otherwise the neutral "Guten Tag," fallback — never a guessed or
 * partially-parsed name.
 */
function resolveGreetingText(firstNameRaw: string): string {
  const trimmed = firstNameRaw.trim();
  if (trimmed.length === 0) {
    return "Guten Tag,";
  }
  return `Hallo ${trimmed},`;
}

/**
 * Only the fields that are actually present end up in the confirmation
 * summary — no empty values, no internal/technical field names. All of
 * these are required by `projectRequestSchema`, but the emptiness checks
 * are kept as a defensive guard rather than assumed.
 */
function buildConfirmationSummaryRows(
  input: ProjectRequestInput
): Array<[string, string]> {
  const rows: Array<[string, string]> = [];

  const projectArea = categoryLabels(input.categories).join(", ");
  if (projectArea.trim().length > 0) {
    rows.push(["Projektart", projectArea]);
  }

  const objectInfo = objectDescription(input.objectType, input.houseSubtype ?? "");
  if (objectInfo.trim().length > 0) {
    rows.push(["Objektart", objectInfo]);
  }

  const location = `${input.postalCode} ${input.city}`.trim();
  if (location.length > 0) {
    rows.push(["Ort", location]);
  }

  const start = desiredStartLabel(input.desiredStart);
  if (start.trim().length > 0) {
    rows.push(["Gewünschter Beginn", start]);
  }

  return rows;
}

const CONFIRMATION_STATUS_ITEMS = [
  "Anfrage erfolgreich übermittelt",
  "Persönliche Prüfung durch RENOMA",
  "Rückmeldung durch einen Ansprechpartner",
];

/**
 * Customer-facing confirmation email. Table-based layout with fully
 * inline CSS (no <style> block, no external fonts/images/tracking) for
 * broad rendering compatibility across Gmail, Outlook, Apple Mail and
 * webmail clients like STRATO. Every dynamic value is escaped before
 * insertion — see `escapeHtml` — even values that are already
 * label-lookup-safe, as defense in depth against unfiltered form data
 * ever reaching the HTML.
 */
function buildConfirmationEmail(input: ProjectRequestInput): string {
  const greeting = resolveGreetingText(input.firstName);
  const summaryRows = buildConfirmationSummaryRows(input);
  const contactEmail = getContactEmail();
  const siteHost = legalConfig.siteUrl.replace(/^https?:\/\//, "");
  const telHref = legalConfig.phoneInternational.replace(/\s/g, "");

  const statusRows = CONFIRMATION_STATUS_ITEMS.map(
    (item) => `
                  <tr>
                    <td style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#6d7a63;width:24px;vertical-align:top;">&#10003;</td>
                    <td style="padding:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#252422;">${escapeHtml(item)}</td>
                  </tr>`
  ).join("");

  const summarySection =
    summaryRows.length > 0
      ? `
                <div style="border-top:1px solid #dcd3c3;margin:28px 0;"></div>
                <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#5a564f;">Ihre Angaben</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${summaryRows
                    .map(
                      ([label, value]) => `
                  <tr>
                    <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#5a564f;width:170px;vertical-align:top;">${escapeHtml(label)}</td>
                    <td style="padding:6px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#252422;vertical-align:top;">${escapeHtml(value)}</td>
                  </tr>`
                    )
                    .join("")}
                </table>`
      : "";

  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Ihre Projektanfrage ist bei RENOMA eingegangen</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f7f4ee;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">Ihre Projektanfrage ist erfolgreich bei uns eingegangen.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f7f4ee;">
      <tr>
        <td style="padding:32px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" align="center" style="max-width:600px;width:100%;margin:0 auto;">
            <tr>
              <td style="background-color:#ffffff;border:1px solid #dcd3c3;border-radius:12px;padding:40px 32px;">
                <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:13px;letter-spacing:2px;color:#9a6b3f;text-transform:uppercase;">RENOMA</p>
                <h1 style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.3;color:#252422;font-weight:600;">Vielen Dank für Ihr Vertrauen.</h1>
                <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#252422;">${escapeHtml(greeting)}</p>
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#252422;">Ihre Projektanfrage ist erfolgreich bei uns eingegangen. Wir schauen uns Ihre Angaben nun persönlich an und melden uns bei Ihnen.</p>

                <div style="border-top:1px solid #dcd3c3;margin:28px 0;"></div>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${statusRows}
                </table>
                ${summarySection}

                <div style="border-top:1px solid #dcd3c3;margin:28px 0;"></div>

                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#252422;">Bis dahin brauchen Sie nichts weiter zu tun.</p>
                <p style="margin:0 0 28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#252422;">Wir freuen uns darauf, Ihr Renovierungsprojekt begleiten zu dürfen.</p>

                <p style="margin:0 0 4px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#252422;font-weight:600;">RENOMA</p>
                <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.6;color:#5a564f;">Wir stehen auf Ihrer Seite.</p>

                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.7;color:#5a564f;">
                  <a href="mailto:${escapeHtml(contactEmail)}" style="color:#252422;text-decoration:underline;">${escapeHtml(contactEmail)}</a><br />
                  <a href="tel:${escapeHtml(telHref)}" style="color:#252422;text-decoration:underline;">${escapeHtml(legalConfig.phone)}</a><br />
                  <a href="${escapeHtml(legalConfig.siteUrl)}" style="color:#252422;text-decoration:underline;">${escapeHtml(siteHost)}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 8px 0;text-align:center;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#5a564f;">RENOMA ist eine Marke von GOGO Natursteine &amp; Fliesen.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/** Plain-text companion to `buildConfirmationEmail` — same content, no markup. */
function buildConfirmationText(input: ProjectRequestInput): string {
  const greeting = resolveGreetingText(input.firstName);
  const summaryRows = buildConfirmationSummaryRows(input);
  const contactEmail = getContactEmail();

  const lines = [
    greeting,
    "",
    "Vielen Dank für Ihr Vertrauen.",
    "",
    "Ihre Projektanfrage ist erfolgreich bei uns eingegangen. Wir schauen uns Ihre Angaben nun persönlich an und melden uns bei Ihnen.",
    "",
    "- Anfrage erfolgreich übermittelt",
    "- Persönliche Prüfung durch RENOMA",
    "- Rückmeldung durch einen Ansprechpartner",
  ];

  if (summaryRows.length > 0) {
    lines.push("", "Ihre Angaben:");
    for (const [label, value] of summaryRows) {
      lines.push(`${label}: ${value}`);
    }
  }

  lines.push(
    "",
    "Bis dahin brauchen Sie nichts weiter zu tun.",
    "Wir freuen uns darauf, Ihr Renovierungsprojekt begleiten zu dürfen.",
    "",
    "RENOMA",
    "Wir stehen auf Ihrer Seite.",
    "",
    contactEmail,
    legalConfig.phone,
    legalConfig.siteUrl,
    "",
    "RENOMA ist eine Marke von GOGO Natursteine & Fliesen."
  );

  return lines.join("\n");
}
