const isProduction = process.env.NODE_ENV === "production";

/**
 * Logs a failure without ever printing lead/customer data to the
 * production console. Outside production, the full error (which may
 * reference request context useful for debugging) is logged as-is. In
 * production, only a generic message and the error's own `message`
 * (never arbitrary context objects that could carry PII) are logged.
 */
export function logServerError(scope: string, error: unknown): void {
  if (!isProduction) {
    console.error(scope, error);
    return;
  }
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`${scope} ${message}`);
}
