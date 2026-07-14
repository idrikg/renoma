/**
 * Minimal in-memory rate limiter for the public inquiry Server Action.
 *
 * Server Actions are reachable via direct POST requests, not just through
 * the UI, so this guards against basic abuse. It is intentionally simple
 * for the MVP: state lives in the Node.js process memory, so it resets on
 * redeploys/cold starts and is not shared across serverless instances.
 * If abuse becomes a real problem, replace this with a durable store
 * (e.g. Upstash Redis) without changing the calling code below.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

type Bucket = {
  count: number;
  windowStart: number;
};

const buckets = new Map<string, Bucket>();

function sweepExpired(now: number) {
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart > WINDOW_MS) {
      buckets.delete(key);
    }
  }
}

export function isRateLimited(key: string): boolean {
  const now = Date.now();

  // Opportunistic cleanup so the map doesn't grow unbounded over the
  // lifetime of the process.
  if (buckets.size > 500) {
    sweepExpired(now);
  }

  const bucket = buckets.get(key);

  if (!bucket || now - bucket.windowStart > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }

  bucket.count += 1;

  if (bucket.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  return false;
}
