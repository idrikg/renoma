import { Check } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { FUNNEL_STEP_FORM_ID } from "@/components/project-assistant/funnel-action-bar";

export function StepShell({
  title,
  description,
  descriptionClassName,
  children,
  onSubmit,
  formId = FUNNEL_STEP_FORM_ID,
  /** Reserve space for the mobile sticky action bar. */
  withStickyFooter = true,
}: {
  title: string;
  description?: string;
  descriptionClassName?: string;
  children: ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formId?: string;
  withStickyFooter?: boolean;
}) {
  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      className={`space-y-5 sm:space-y-8 ${withStickyFooter ? "pb-28 sm:pb-0" : ""}`}
      noValidate
    >
      <div>
        <h1 className="text-[1.375rem] font-medium tracking-tight text-balance text-ink sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p
            className={
              descriptionClassName ??
              "mt-1.5 text-pretty text-[15px] leading-relaxed text-muted sm:mt-2"
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

export const TextField = forwardRef<
  HTMLInputElement,
  {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: string;
    required?: boolean;
    error?: string;
    placeholder?: string;
    id?: string;
    maxLength?: number;
    pattern?: string;
    enterKeyHint?: React.HTMLAttributes<HTMLInputElement>["enterKeyHint"];
  }
>(function TextField(
  {
    label,
    value,
    onChange,
    type = "text",
    inputMode,
    autoComplete,
    required,
    error,
    placeholder,
    id,
    maxLength,
    pattern,
    enterKeyHint,
  },
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
          the desktop layout no longer needs the larger tap target.
          scroll-margin keeps focused fields clear of the sticky action bar. */}
      <input
        ref={ref}
        id={inputId}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        enterKeyHint={enterKeyHint}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full scroll-mt-28 border-b bg-transparent py-2.5 text-base text-ink outline-none transition-colors focus:border-clay sm:scroll-mt-8 sm:text-[15px] ${
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
      <div className={`mt-2.5 grid gap-2.5 sm:mt-3 sm:gap-3 ${large ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map((option) => {
          const checked = value === option.value;
          const Icon = icons?.[option.value];
          return (
            <label
              key={option.value}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border outline-none transition-colors focus-within:ring-2 focus-within:ring-sage ${
                large
                  ? "flex-col justify-center gap-2 px-4 py-4 text-center text-[15px] sm:px-5 sm:py-6"
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
      <div className="mt-2.5 grid gap-2.5 sm:mt-3 sm:grid-cols-2 sm:gap-3">
        {options.map((option) => {
          const checked = values.includes(option.value);
          const Icon = icons[option.value];
          return (
            <label
              key={option.value}
              className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-[15px] outline-none transition-colors focus-within:ring-2 focus-within:ring-sage sm:min-h-16 sm:gap-4 sm:px-5 sm:py-4 ${
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

