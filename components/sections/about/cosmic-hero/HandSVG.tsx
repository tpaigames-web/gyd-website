import { forwardRef } from "react";

type Props = {
  className?: string;
  pinholeColor?: string;
};

export const HandSVG = forwardRef<SVGSVGElement, Props>(function HandSVG(
  { className, pinholeColor = "var(--gyd-accent, #F15A24)" },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={5.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        <line x1="320" y1="220" x2="320" y2="80" />
        <line x1="380" y1="240" x2="380" y2="118" />
        <line x1="440" y1="278" x2="440" y2="166" />

        <path d="M 305 226 Q 250 260 240 322 Q 230 410 274 470 L 360 552" />
        <path d="M 460 280 Q 482 330 472 388 L 440 488" />

        <circle cx="220" cy="320" r="58" />

        <path d="M 220 378 Q 222 416 246 442" />

        <path d="M 304 224 Q 264 250 232 272" />

        <path d="M 360 552 Q 392 528 414 504" />
      </g>

      <circle
        data-pinhole="true"
        cx="220"
        cy="320"
        r="4"
        fill={pinholeColor}
      />
    </svg>
  );
});
