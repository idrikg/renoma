export function ProgressIndicator({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className="mb-10">
      <p className="text-sm font-medium text-muted">
        Schritt {step} von {total}
      </p>
      <div
        className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label={`Schritt ${step} von ${total}`}
      >
        <div
          className="h-full rounded-full bg-clay transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
