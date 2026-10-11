"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const LENS = 176;

/** İmleç altında, logodaki gibi yarı dolu halkalı bir büyüteç açar. */
export function Loupe({
  src,
  alt,
  width,
  height,
  zoom = 2.4,
  multiply,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  zoom?: number;
  multiply?: boolean;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number; w: number; h: number } | null>(null);

  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = box.current!.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height });
  };

  return (
    <div
      ref={box}
      className={`relative ${pos ? "cursor-none" : ""} ${className}`}
      onPointerMove={move}
      onPointerLeave={() => setPos(null)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`h-auto w-full ${multiply ? "mix-blend-multiply" : ""}`}
      />
      {pos && (
        <div
          aria-hidden
          className="pointer-events-none absolute overflow-hidden rounded-full border-[7px] border-navy shadow-2xl"
          style={{
            width: LENS,
            height: LENS,
            left: pos.x - LENS / 2,
            top: pos.y - LENS / 2,
            backgroundColor: "#fff",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${pos.w * zoom}px ${pos.h * zoom}px`,
            backgroundPosition: `${-(pos.x * zoom - LENS / 2)}px ${-(pos.y * zoom - LENS / 2)}px`,
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-navy/10" />
        </div>
      )}
    </div>
  );
}
