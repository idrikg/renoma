export function ProgressIndicator({
  step,
  total,
  label,
}: {
  step: number;
  total: number;
  label: string;
}) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className="mb-6 sm:mb-10">
      <p className="text-sm font-medium text-muted">
        Schritt {step} von {total} · {label}
      </p>
      <div
        className="mt-2.5 h-1 w-full overflow-hidden rounded-full bg-line sm:mt-3"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label={`Schritt ${step} von ${total}: ${label}`}
      >
        <div
          className="h-full rounded-full bg-clay transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
