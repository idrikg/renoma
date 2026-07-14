# RENOMA — MVP Scope

**Mission:** Launch within 30 days and acquire the first real customer.
**Non-goal:** This is not an enterprise platform. No accounts, no admin dashboard, no CMS, no database in v1.

## 1. What we're building

A single, outstanding, conversion-focused landing page for a premium German renovation company, plus a reliable project-inquiry flow that turns visitors into leads in the owner's inbox.

Two things must be excellent:
1. The **first impression** (hero, trust signals, visual quality) — because premium positioning is won or lost in 3 seconds.
2. The **inquiry form** — because it's the only "product feature" that matters for customer #1.

Everything else is in service of these two things.

## 2. Pages / routes

| Route | Purpose |
|---|---|
| `/` | The landing page — emotional brand story, ends in a teaser (not a big form) |
| `/projekt-starten` | The dedicated, guided project assistant — the actual conversion mechanism (see §4) |
| `/impressum` | Legally required business disclosure (German law — TMG/DDG) |
| `/datenschutz` | Privacy policy (GDPR requirement, especially since we collect form data) |
| `/sitemap.xml`, `/robots.txt` | SEO file conventions (generated) |

No blog, no portfolio detail pages, no login, no multi-language switcher for v1.

## 3. Homepage sections (final approved order)

The homepage tells one emotional story — **Vorfreude → Verständnis → Entlastung → Vertrauen → Begleitung → Projektstart** — and does not end with a form. See `docs/CREATIVE-REVISION.md` for the exact, approved German copy for every section below.

1. **Navigation** — restrained, with anchor links to on-page sections and one consistent CTA, "Projekt starten", linking to `/projekt-starten`.
2. **Hero** — Vorfreude. The desired future (the new home), not construction stress.
3. **Renovieren sollte kein Vollzeitjob sein** — Verständnis. Brief acknowledgment of the coordination burden, framed as a deliberate choice, not incapacity.
4. **Wir kümmern uns.** — Entlastung. A minimal, full-width emotional pause. No cards, no icons, no CTA.
5. **Wir stehen auf Ihrer Seite.** — Kernpositionierung. Why RENOMA is different, expanded with real explanatory copy.
6. **Was sich für Sie ändert** — Kundennutzen. Five customer-centered benefits ("Sie…", not "Wir…").
7. **Referenzen** — echter Beweis. Data-driven, before/after. Renders empty (no visible content) until real, authentic projects are marked publishable — never fabricated placeholders.
8. **So begleiten wir Ihr Projekt** — Orientierung. Five steps, customer as the grammatical subject.
9. **Persönlich begleitet** — menschliches Vertrauen. Text-led; no stock founder photo until a real one exists.
10. **RENOMA Manifest** — Überzeugung. Editorial, no card.
11. **Häufige Fragen** — Klarheit, including the explicit marketplace-distinction question.
12. **Projekt-Assistent-Teaser** — Übergang zum Funnel. Calm handoff to `/projekt-starten`. No large form on the homepage itself.
13. **Finaler emotionaler CTA** — bookends the Hero's promise, links to `/projekt-starten`.
14. **Footer** — brand line + legal links. Contact email / service area only render if configured via environment variables; never a fabricated fallback.

## 4. The project assistant (`/projekt-starten`) — core conversion feature

A focused, one-step-per-screen guided flow (progress indicator, back/forward, data preserved across steps via session storage) that replaces the old single-page contact form as the actual conversion mechanism. The homepage links to it; it does not live on the homepage.

**Steps:**
1. Was möchten Sie verändern? (multi-select: Bad, Küche, Boden, Fenster, Türen, Elektrik, Photovoltaik, Wärmepumpe, Garten, Pool, Smart Home, Anbau, Komplettsanierung, Sonstiges)
2. Ihre Wünsche (optional free text)
3. Bilder (local preview only — see note below on storage)
4. Angaben zum Objekt (PLZ, Ort, Objektart, ungefähre Fläche, Baujahr optional)
5. Gewünschter Start (so bald wie möglich / 1–3 Monate / 3–6 Monate / später)
6. Geplanter Investitionsrahmen (6 bands, incl. "noch unklar")
7. Persönliche Angaben (Vorname, Nachname, E-Mail, Telefon, bevorzugter Kontaktweg)
8. Zusammenfassung & Datenschutz (review, edit any step, required non-preselected consent checkbox)
9. Confirmation — "Willkommen bei RENOMA." No specific response-time promise is made (only operationally guaranteed claims may state a time).

**Image handling — important limitation:** step 3 allows selecting multiple images with local, in-browser previews (and removal before submission), but there is **no file-storage backend configured yet** (no S3/Vercel Blob/etc.). Only the image *count* is included in the lead-notification email as metadata — the files themselves are never uploaded or persisted. The UI must not imply otherwise. Adding real persistent image upload is a follow-up task once a storage provider is chosen.

**Behavior (reusing the existing technical foundation):**
- Still a Next.js **Server Action** (`'use server'`), still validated server-side with **Zod**, still protected by the same **honeypot + in-memory rate limiter**, still delivered via **Resend** to the business inbox + a customer confirmation email. The schema is now much richer (9 steps of fields) than the original single-form MVP, but the architecture (validate → rate-limit → email) is unchanged.
- Because the flow is inherently multi-step and stateful, the final step calls the Server Action directly as a function (a documented, supported Next.js pattern) rather than via a single `<form action>` — this necessarily trades away no-JS progressive enhancement for this specific flow, which is an acceptable and deliberate trade-off for a guided assistant.
- No database write in v1 — email is still the system of record.

## 5. Design direction

"Premium German renovation" implies: restrained color palette, generous whitespace, strong photography, serif or high-quality sans headings, no stock-photo clichés, German-language copy with a professional but warm tone.

Concrete defaults I'll use unless you specify otherwise:
- Neutral base (off-white / charcoal) + one accent color (e.g. a deep terracotta or forest green — common in premium Handwerk branding).
- `next/font` for typography (already scaffolded with Geist; may swap for a more editorial pairing).
- `next/image` for all imagery, optimized.
- Tailwind v4 (already in the project) for styling — no additional UI library needed for a page this size, keeps bundle lean.

## 6. Explicitly out of scope for v1

- User accounts / login
- Admin dashboard or CMS for editing content
- Database / lead storage beyond email
- Multi-language support
- Blog / content marketing pages
- Live chat
- Payment processing
- Detailed project/portfolio subpages (single gallery section only)
- Automated testing suite beyond basic type-checking/linting (given the 30-day constraint; can be added post-launch)

## 7. Decisions (confirmed)

1. **Content**: Partial real content exists (e.g. logo/colors). I'll use it wherever provided and fill remaining gaps with clearly-marked, high-quality placeholder copy/imagery that's trivial to swap out. → **Action needed from you**: send over whatever brand assets/copy you have (logo file, brand colors, service list, any project photos) whenever ready; I won't block the build waiting for them.
2. **Email delivery**: **Resend**. I'll wire up the Server Action to send a lead-notification email to the business and a confirmation email to the customer. → **Action needed from you**: a Resend account + API key, and a sending domain (can start with Resend's onboarding domain, but a verified custom domain is strongly recommended for deliverability before real launch).
3. **Domain & hosting**: **Vercel**. Zero-config fit for this Next.js version (Server Actions, image optimization, etc.). → **Action needed from you**: a Vercel account (and domain, when ready — can launch on a `*.vercel.app` URL first if the domain isn't purchased yet).
4. **Legal pages**: Impressum/Datenschutz will ship with **clearly-marked placeholders** (e.g. `[FIRMENNAME]`, `[ADRESSE]`) so the site can be built and previewed now. → **Hard requirement**: these must be filled with real, accurate business/legal details **before** the site goes live publicly — I'll flag this explicitly again before we deploy to production.
5. **Language**: **German only** for v1.
6. **Analytics**: Not yet decided — will propose **Vercel Analytics** (zero-config on Vercel) as the default when we get to that step, unless you'd rather skip analytics for launch.

## 8. Timeline shape (within the 30-day window)

- **Week 1**: Design direction locked, page structure + copy scaffolded, legal pages drafted.
- **Week 2**: Inquiry form fully functional end-to-end (validation, email delivery, spam protection), responsive polish.
- **Week 3**: Content finalized with real assets, SEO/metadata, performance pass (Lighthouse), cross-device QA.
- **Week 4**: Deploy to production, domain + email deliverability verified, soft-launch, first outreach for customer #1.

---

**Status:** The technical foundation (Next.js app, Server Action + Zod validation + Resend email + legal routes + SEO routes) and the emotionally-directed homepage plus the dedicated `/projekt-starten` assistant are implemented per this scope. See `docs/CREATIVE-REVISION.md` for the exact approved copy, and the chat history for outstanding launch blockers (real Impressum/Datenschutz data, real references, Resend domain verification).
