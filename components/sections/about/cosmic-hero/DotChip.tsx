import { forwardRef } from "react";

type Props = {
  label: string;
  className?: string;
  style?: React.CSSProperties;
};

export const DotChip = forwardRef<HTMLDivElement, Props>(function DotChip(
  { label, className = "", style },
  ref,
) {
  return (
    <div
      ref={ref}
      className={
        "pointer-events-none absolute inline-flex items-center gap-2 rounded-full " +
        "px-4 py-2 text-sm font-semibold shadow-sm backdrop-blur-sm " +
        "bg-[var(--gyd-accent-soft)]/85 text-[var(--gyd-fg)] " +
        "ring-1 ring-[var(--gyd-line)] " +
        className
      }
      style={style}
    >
      <span
        aria-hidden="true"
        className="inline-block size-1.5 rounded-full bg-[var(--gyd-accent)]"
      />
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
});
