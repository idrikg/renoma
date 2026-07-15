import fs from "node:fs";
import path from "node:path";

/**
 * Checks whether a `/public`-relative path actually exists as a real file
 * on disk (server-side only — this must never run in client code).
 *
 * next/image does not verify local file existence for you: a missing
 * file simply 404s in the browser, which either shows a broken-image
 * icon or, worse, an empty frame with only its `alt` text visible.
 * Callers should use this to decide between rendering the real image and
 * an intentional fallback, rather than assuming a configured `src` is
 * actually there.
 */
export function publicAssetExists(publicPath: string): boolean {
  try {
    const relative = publicPath.replace(/^\/+/, "");
    const absolute = path.join(process.cwd(), "public", relative);
    return fs.statSync(absolute).isFile();
  } catch {
    return false;
  }
}
