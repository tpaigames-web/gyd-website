"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type MutableRefObject,
} from "react";

export interface BullCanvasHandle {
  drawFrame: (idx: number) => void;
}

interface BullCanvasProps {
  framesRef: MutableRefObject<HTMLImageElement[]>;
}

export const BullCanvas = forwardRef<BullCanvasHandle, BullCanvasProps>(
  function BullCanvas({ framesRef }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(
      ref,
      () => ({
        drawFrame(idx: number) {
          const canvas = canvasRef.current;
          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          const img = framesRef.current[idx];
          if (!img || !img.complete) return;

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const ar = img.naturalWidth / img.naturalHeight;
          const cAr = canvas.width / canvas.height;
          let dw: number;
          let dh: number;
          if (ar > cAr) {
            dw = canvas.width;
            dh = dw / ar;
          } else {
            dh = canvas.height;
            dw = dh * ar;
          }
          const dx = (canvas.width - dw) / 2;
          const dy = (canvas.height - dh) / 2;
          ctx.drawImage(img, dx, dy, dw, dh);
        },
      }),
      [framesRef],
    );

    return (
      <canvas
        ref={canvasRef}
        width={1280}
        height={1280}
        className="absolute inset-0 h-full w-full object-contain"
      />
    );
  },
);
