import { forwardRef, type ReactNode } from "react";

export function StepShell({
  title,
  description,
  children,
  onSubmit,
}: {
  title: string;
  description?: string;
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
          <p className="mt-2 text-[15px] leading-relaxed text-muted">
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
}: {
  onBack?: () => void;
  backLabel?: string;
  nextLabel?: string;
  nextDisabled?: boolean;
  pending?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-sm text-[15px] font-medium text-muted outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-clay"
        >
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      <button
        type="submit"
        disabled={nextDisabled || pending}
        aria-disabled={nextDisabled || pending}
        className="rounded-full bg-ink px-7 py-3 text-[15px] font-medium text-paper outline-none transition-colors hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
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
        className={`mt-2 w-full border-b bg-transparent py-2.5 text-[15px] text-ink outline-none transition-colors focus:border-clay ${
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
}: {
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
  error?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium tracking-[0.04em] text-muted">
        {legend}
      </legend>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = value === option.value;
          return (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-[15px] outline-none transition-colors focus-within:ring-2 focus-within:ring-clay ${
                checked
                  ? "border-clay bg-paper-dim text-ink"
                  : "border-line text-muted hover:border-clay-soft"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                  checked ? "border-clay bg-clay" : "border-line"
                }`}
              >
                {checked && <span className="h-1.5 w-1.5 rounded-full bg-paper" />}
              </span>
              <input
                type="radio"
                name={legend}
                value={option.value}
                checked={checked}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
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

export function CategoryToggleGroup({
  legend,
  options,
  values,
  onToggle,
}: {
  legend: string;
  options: readonly { value: string; label: string }[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium tracking-[0.04em] text-muted">
        {legend}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const checked = values.includes(option.value);
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-sm outline-none transition-colors focus-within:ring-2 focus-within:ring-clay ${
                checked
                  ? "border-clay bg-ink text-paper"
                  : "border-line text-muted hover:border-clay-soft"
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
