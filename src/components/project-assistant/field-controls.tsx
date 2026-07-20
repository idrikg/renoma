import { Check } from "lucide-react";
import { forwardRef, type ReactNode } from "react";

export function StepShell({
  title,
  description,
  descriptionClassName,
  children,
  onSubmit,
}: {
  title: string;
  description?: string;
  descriptionClassName?: string;
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-7 sm:space-y-8" noValidate>
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p
            className={
              descriptionClassName ??
              "mt-2 text-[15px] leading-relaxed text-muted"
            }
          >
            {description}
          </p>
        )}
      </div>
      {children}
    </form>
  );
}

export function StepNav({
  onBack,
  backLabel = "Zurück",
  nextLabel = "Weiter",
  nextDisabled,
  pending,
  statusLabel,
}: {
  onBack?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  pending?: boolean;
  statusLabel?: string;
}) {
  return (
    <div
      className={`flex pt-2 ${
        statusLabel
          ? "flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          : "items-center justify-between"
      }`}
    >
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="-my-3 rounded-sm px-1 py-3 text-[15px] font-medium text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-sage"
        >
          {backLabel}
        </button>
      ) : statusLabel ? (
        <p className="text-[15px] text-muted">{statusLabel}</p>
      ) : (
        <span />
      )}
      <button
        type="submit"
        disabled={nextDisabled || pending}
        aria-disabled={nextDisabled || pending}
        className={`rounded-full bg-ink px-7 py-3 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:bg-line disabled:text-muted ${
          statusLabel ? "w-full sm:w-auto" : ""
        }`}
      >
        {pending ? "Wird gesendet…" : nextLabel}
      </button>
    </div>
  );
}

export const TextField = forwardRef<
  HTMLInputElement,
  {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    autoComplete?: string;
    required?: boolean;
    error?: string;
    placeholder?: string;
    id?: string;
  }
>(function TextField(
  { label, value, onChange, type = "text", autoComplete, required, error, placeholder, id },
  ref
) {
  const inputId = id ?? `field-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${inputId}-error`;

  return (
    <div>
      <label htmlFor={inputId} className="text-sm font-medium tracking-[0.04em] text-muted">
        {label}
      </label>
      {/* text-base (16px) below `sm` — iOS Safari auto-zooms the viewport
          on focus for any text input under 16px, which felt jarring on
          this multi-step form. Reverts to the slightly tighter 15px once
          the desktop layout no longer needs the larger tap target. */}
      <input
        ref={ref}
        id={inputId}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full border-b bg-transparent py-2.5 text-base text-ink outline-none transition-colors focus:border-clay sm:text-[15px] ${
          error ? "border-clay" : "border-line"
        }`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-clay">
          {error}
        </p>
      )}
    </div>
  );
});

export function OptionCardGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
  error,
  icons,
  large,
}: {
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string;
  icons?: Record<string, import("lucide-react").LucideIcon>;
  /** Bigger touch target + icon-forward layout, for a small set of
   *  high-level choices (e.g. Haus / Wohnung / Gewerbe). */
  large?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium tracking-[0.04em] text-muted">
        {legend}
      </legend>
      <div className={`mt-3 grid gap-3 ${large ? "sm:grid-cols-3" : "gap-2 sm:grid-cols-2"}`}>
        {options.map((option) => {
          const checked = value === option.value;
          const Icon = icons?.[option.value];
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border outline-none transition-colors focus-within:ring-2 focus-within:ring-sage ${
                large
                  ? "flex-col justify-center gap-2 px-5 py-6 text-center text-[15px]"
                  : "px-4 py-3 text-[15px]"
              } ${
                checked
                  ? "border-sage bg-soft-sage text-ink"
                  : "border-line text-muted hover:border-clay-soft"
              }`}
            >
              {Icon && (
                <Icon
                  aria-hidden="true"
                  className={`${large ? "h-6 w-6" : "h-4 w-4"} shrink-0 ${checked ? "text-sage-deep" : "text-muted"}`}
                  strokeWidth={1.5}
                />
              )}
              {!large && (
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    checked ? "border-sage bg-sage" : "border-line"
                  }`}
                >
                  {checked && <Check className="h-3.5 w-3.5 text-paper" strokeWidth={2.5} />}
                </span>
              )}
              <input
                type="radio"
                name={legend}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className={large ? "font-medium" : ""}>{option.label}</span>
              {large && checked && (
                <Check className="h-4 w-4 text-sage-deep" strokeWidth={2.5} aria-hidden="true" />
              )}
            </label>
          );
        })}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-clay">
          {error}
        </p>
      )}
    </fieldset>
  );
}

type IconMap = Record<string, import("lucide-react").LucideIcon>;

/**
 * Large, scannable selection rows — one per category — each with a
 * restrained line icon, the label, and an explicit check indicator.
 * Two columns on desktop, one full-width column on mobile/tablet with
 * comfortably large touch targets.
 */
export function CategoryCardGroup({
  legend,
  options,
  values,
  onToggle,
  icons,
}: {
  legend: string;
  options: readonly { value: string; label: string }[];
  values: string[];
  onToggle: (value: string) => void;
  icons: IconMap;
}) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const checked = values.includes(option.value);
          const Icon = icons[option.value];
          return (
            <label
              key={option.value}
              className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-xl border px-5 py-4 text-[15px] outline-none transition-colors focus-within:ring-2 focus-within:ring-sage ${
                checked
                  ? "border-sage bg-soft-sage text-ink"
                  : "border-line text-ink hover:border-clay-soft"
              }`}
            >
              {Icon && (
                <Icon
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 ${checked ? "text-sage-deep" : "text-muted"}`}
                  strokeWidth={1.5}
                />
              )}
              <span className="min-w-0 flex-1 font-medium">{option.label}</span>
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  checked ? "border-sage bg-sage" : "border-line"
                }`}
              >
                {checked && <Check className="h-3.5 w-3.5 text-paper" strokeWidth={2.5} />}
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="sr-only"
              />
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

type CategoryOption = { value: string; label: string };

/**
 * Grouped category selection for Step 1 — calm section labels, subtle
 * dividers, two columns per group on desktop, one column on mobile.
 */
export function GroupedCategoryCardGroup({
  legend,
  groups,
  options,
  values,
  onToggle,
  icons,
}: {
  legend: string;
  groups: readonly { label: string; optionValues: readonly string[] }[];
  options: readonly CategoryOption[];
  values: string[];
  onToggle: (value: string) => void;
  icons: IconMap;
}) {
  const optionsByValue = new Map(options.map((option) => [option.value, option]));

  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="space-y-8">
        {groups.map((group, groupIndex) => (
          <div
            key={group.label}
            className={groupIndex > 0 ? "border-t border-line pt-8" : undefined}
          >
            <p className="text-xs font-medium tracking-[0.14em] text-clay uppercase">
              {group.label}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {group.optionValues.map((value) => {
                const option = optionsByValue.get(value);
                if (!option) return null;

                const checked = values.includes(option.value);
                const Icon = icons[option.value];

                return (
                  <label
                    key={option.value}
                    className={`flex min-h-16 cursor-pointer items-center gap-4 rounded-xl border px-5 py-4 text-[15px] outline-none transition-colors focus-within:ring-2 focus-within:ring-sage ${
                      checked
                        ? "border-sage bg-soft-sage text-ink"
                        : "border-line text-ink hover:border-clay-soft"
                    }`}
                  >
                    {Icon && (
                      <Icon
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 ${checked ? "text-sage-deep" : "text-muted"}`}
                        strokeWidth={1.5}
                      />
                    )}
                    <span className="min-w-0 flex-1 font-medium">{option.label}</span>
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        checked ? "border-sage bg-sage" : "border-line"
                      }`}
                    >
                      {checked && (
                        <Check className="h-3.5 w-3.5 text-paper" strokeWidth={2.5} />
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(option.value)}
                      className="sr-only"
                    />
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
