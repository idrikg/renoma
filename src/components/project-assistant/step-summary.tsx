"use client";

import { useState } from "react";
import {
  budgetLabel,
  categoryLabels,
  contactPreferenceLabel,
  desiredStartLabel,
  propertyTypeLabel,
} from "@/lib/validation";
import { StepNav, StepShell } from "@/components/project-assistant/field-controls";
import type { WizardData } from "@/components/project-assistant/types";

const STEP_FOR_FIELD = {
  categories: 1,
  wishes: 2,
  images: 3,
  object: 4,
  desiredStart: 5,
  budgetRange: 6,
  contact: 7,
} as const;

export function StepSummary({
  data,
  imageCount,
  onBack,
  onGoToStep,
  onConsentChange,
  onSubmit,
  pending,
  submitError,
}: {
  data: WizardData;
  imageCount: number;
  onBack: () => void;
  onGoToStep: (step: number) => void;
  onConsentChange: (checked: boolean) => void;
  onSubmit: () => void;
  pending: boolean;
  submitError?: string;
}) {
  const [consentError, setConsentError] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!data.consent) {
      setConsentError("Bitte stimmen Sie der Datenschutzerklärung zu.");
      return;
    }
    setConsentError(null);
    onSubmit();
  }

  const rows: Array<{ label: string; value: string; field: keyof typeof STEP_FOR_FIELD }> = [
    { label: "Bereiche", value: categoryLabels(data.categories).join(", ") || "—", field: "categories" },
    { label: "Ihre Wünsche", value: data.wishes || "—", field: "wishes" },
    { label: "Bilder", value: imageCount > 0 ? `${imageCount} ausgewählt` : "Keine", field: "images" },
    {
      label: "Objekt",
      value: `${data.postalCode} ${data.city} · ${propertyTypeLabel(data.propertyType)}`,
      field: "object",
    },
    { label: "Gewünschter Start", value: desiredStartLabel(data.desiredStart), field: "desiredStart" },
    { label: "Investitionsrahmen", value: budgetLabel(data.budgetRange), field: "budgetRange" },
    {
      label: "Kontakt",
      value: `${data.firstName} ${data.lastName} · ${data.email}${data.phone ? ` · ${data.phone}` : ""} · ${contactPreferenceLabel(data.preferredContact)}`,
      field: "contact",
    },
  ];

  return (
    <StepShell
      title="Zusammenfassung und Datenschutz"
      description="Bitte prüfen Sie Ihre Angaben. Sie können jeden Schritt einzeln bearbeiten."
      onSubmit={handleSubmit}
    >
      <dl className="divide-y divide-line rounded-2xl border border-line">
        {rows.map((row) => (
          <div key={row.field} className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              <dt className="text-sm font-medium text-muted">{row.label}</dt>
              <dd className="mt-1 text-[15px] text-ink">{row.value}</dd>
            </div>
            <button
              type="button"
              onClick={() => onGoToStep(STEP_FOR_FIELD[row.field])}
              className="shrink-0 rounded-sm text-sm font-medium text-clay underline underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-clay"
            >
              Bearbeiten
            </button>
          </div>
        ))}
      </dl>

      <ConsentCheckbox checked={data.consent} onChange={onConsentChange} />

      {consentError && (
        <p role="alert" className="text-sm text-clay">
          {consentError}
        </p>
      )}
      {submitError && (
        <p role="alert" className="text-sm text-clay">
          {submitError}
        </p>
      )}

      <StepNav
        onBack={onBack}
        nextLabel="Projekt starten"
        nextDisabled={!data.consent}
        pending={pending}
      />
    </StepShell>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line px-4 py-4 text-[15px] leading-relaxed text-ink outline-none focus-within:ring-2 focus-within:ring-clay">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        required
        className="mt-0.5 h-4 w-4 accent-clay"
      />
      <span>
        Ich habe die{" "}
        <a href="/datenschutz" target="_blank" className="underline underline-offset-4 hover:text-clay">
          Datenschutzerklärung
        </a>{" "}
        gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung
        meiner Anfrage zu.
      </span>
    </label>
  );
}
