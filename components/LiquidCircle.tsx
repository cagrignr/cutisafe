"use client";

import { useId } from "react";

const wave =
  "M-200 0q50-14 100 0t100 0t100 0t100 0t100 0t100 0V300H-200Z";

/** Yarı dolu daire motifi. Dalga akar, seviye CSS geçişiyle yükselir. */
export function LiquidCircle({
  level,
  fill,
  ring,
  className,
  style,
}: {
  level: number;
  fill: string;
  ring: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const id = useId();
  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden>
      <defs>
        <clipPath id={id}>
          <circle cx="100" cy="100" r="96" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <g
          style={{
            transform: `translateY(${(1 - level) * 200}px)`,
            transition: "transform 1.2s cubic-bezier(.3,.7,.2,1)",
          }}
        >
          <g className="wave-b" style={{ transform: "translateY(-5px)" }} opacity=".45">
            <path d={wave} fill={fill} />
          </g>
          <g className="wave-a">
            <path d={wave} fill={fill} />
          </g>
        </g>
      </g>
      <circle cx="100" cy="100" r="96" fill="none" stroke={ring} strokeWidth="6" />
    </svg>
  );
}
