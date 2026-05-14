type Props = {
  className?: string;
};

export function HandSVG({ className }: Props) {
  return (
    <img
      src="/about/ok-hand.svg"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={{
        userSelect: "none",
        WebkitUserDrag: "none" as never,
      }}
    />
  );
}
