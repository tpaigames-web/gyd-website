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
        "pointer-events-none absolute inline-flex items-center gap-1.5 rounded-full " +
        "px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm " +
        "md:gap-2 md:px-4 md:py-2 md:text-sm " +
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
