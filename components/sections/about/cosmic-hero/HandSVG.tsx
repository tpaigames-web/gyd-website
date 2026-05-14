import type { CSSProperties } from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
};

export function HandSVG({ className, style }: Props) {
  return (
    <img
      src="/about/ok-hand.svg"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{
        userSelect: "none",
        ...style,
      }}
    />
  );
}
