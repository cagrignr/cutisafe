"use client";

import { useId } from "react";

/** Cutisafe işareti: yarı dolu daire. `level` 0–1 arası sıvı seviyesi. */
export function Logo({
  level = 0.5,
  size = 30,
  className,
}: {
  level?: number;
  size?: number;
  className?: string;
}) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <clipPath id={id}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y={100 - level * 100} width="100" height="100" fill="currentColor" />
      </g>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" />
    </svg>
  );
}
