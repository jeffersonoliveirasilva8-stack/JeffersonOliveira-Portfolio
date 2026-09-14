export default function PlaceholderBox({
  label,
  aspect = "aspect-[4/5]",
}: {
  label: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} w-full flex items-center justify-center rounded-2xl bg-surface border border-border text-center px-6`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent, transparent 11px, var(--color-border) 11px, var(--color-border) 12px)",
      }}
    >
      <span className="font-sans text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}
