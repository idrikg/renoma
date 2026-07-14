import type { ReactNode } from "react";

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
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
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
    <div className="flex items-center justify-between pt-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-[15px] font-medium text-muted transition-colors hover:text-ink"
        >
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      <button
        type="submit"
        disabled={nextDisabled || pending}
        className="rounded-full bg-ink px-7 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-50"
      >
        {pending ? "Wird gesendet…" : nextLabel}
      </button>
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
  error,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium tracking-[0.04em] text-muted">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-line bg-transparent py-2 text-[15px] text-ink outline-none transition-colors focus:border-clay"
      />
      {error && <p className="mt-1.5 text-sm text-clay">{error}</p>}
    </div>
  );
}

export function OptionCardGroup<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: readonly { value: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
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
              className={`flex cursor-pointer items-center rounded-xl border px-4 py-3 text-[15px] transition-colors ${
                checked
                  ? "border-clay bg-paper-dim text-ink"
                  : "border-line text-muted hover:border-clay-soft"
              }`}
            >
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
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
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
