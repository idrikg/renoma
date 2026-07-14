"use server";

import { headers } from "next/headers";
import { sendProjectRequestEmails } from "@/lib/email";
import { logServerError } from "@/lib/logger";
import { isRateLimited } from "@/lib/rate-limit";
import {
  projectRequestSchema,
  type ProjectRequestFieldErrors,
} from "@/lib/validation";

export type ProjectRequestResult =
  | { status: "success" }
  | {
      status: "error";
      message: string;
      fieldErrors?: ProjectRequestFieldErrors;
    };

async function getClientIdentifier(): Promise<string> {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return headerList.get("x-real-ip") ?? "unknown";
}

/**
 * Submits the completed project assistant. Invoked directly as a function
 * call from the client (rather than bound to a single `<form action>`)
 * because the input is assembled across nine sequential steps rather than
 * one physical form. This is a supported Server Function invocation
 * pattern — see Next.js docs on invoking Server Functions from event
 * handlers.
 */
export async function submitProjectRequest(
  input: unknown
): Promise<ProjectRequestResult> {
  // Honeypot: real visitors never fill this hidden field. Return a
  // success-looking result without sending any email, so a bot has no
  // signal it was detected.
  const raw = input as Record<string, unknown> | null;
  if (
    raw &&
    typeof raw.company === "string" &&
    raw.company.trim() !== ""
  ) {
    return { status: "success" };
  }

  const identifier = await getClientIdentifier();
  if (isRateLimited(identifier)) {
    return {
      status: "error",
      message:
        "Sie haben in kurzer Zeit mehrfach angefragt. Bitte versuchen Sie es in einigen Minuten erneut.",
    };
  }

  const parsed = projectRequestSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: ProjectRequestFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !(field in fieldErrors)) {
        fieldErrors[field as keyof ProjectRequestFieldErrors] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Bitte überprüfen Sie Ihre Angaben.",
      fieldErrors,
    };
  }

  try {
    await sendProjectRequestEmails(parsed.data);
  } catch (error) {
    logServerError("[actions] Failed to process project request:", error);
    return {
      status: "error",
      message:
        "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt eine E-Mail.",
    };
  }

  return { status: "success" };
}
