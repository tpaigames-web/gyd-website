import { forwardRef } from "react";

type Props = {
  coreLabel: string;
  className?: string;
};

export const CoreLogo = forwardRef<HTMLDivElement, Props>(function CoreLogo(
  { coreLabel, className = "" },
  ref,
) {
  return (
    <div
      ref={ref}
      className={
        "relative flex size-[clamp(140px,18vmin,220px)] flex-col items-center " +
        "justify-center rounded-full bg-white text-[var(--gyd-fg)] " +
        "shadow-[0_30px_90px_-20px_rgba(241,90,36,0.55)] " +
        "ring-1 ring-[var(--gyd-line)] " +
        className
      }
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(255,230,212,0.9) 0%, rgba(255,230,212,0) 70%)",
        }}
      />
      <span
        className="relative text-[clamp(28px,4.6vmin,52px)] font-black tracking-tight text-[var(--gyd-accent)] lowercase leading-none"
      >
        gyd
      </span>
      <span className="relative mt-1 text-[10px] font-bold tracking-[0.32em] text-[var(--gyd-muted)]">
        {coreLabel}
      </span>
    </div>
  );
});
