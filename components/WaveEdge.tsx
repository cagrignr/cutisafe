/** Bir önceki bölümün rengini dalgalı bir kenarla sonraki bölümün üstüne indirir. */
export function WaveEdge({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 110"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-0 top-0 h-[60px] w-full -translate-y-px md:h-[110px]"
    >
      <path
        d="M0 0H1440V50C1320 100 1180 105 1020 70S720-5 520 30S160 105 0 55Z"
        fill={color}
      />
    </svg>
  );
}
