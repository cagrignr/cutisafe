import Link from "next/link";
import type { Product } from "@/lib/catalog";

export function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      href={`/urunler/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-navy/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(14,58,91,.4)]"
    >
      <div
        className="relative flex aspect-[4/3.1] items-center justify-center overflow-hidden"
        style={{ background: p.tint }}
      >
        {p.kind === "spray" ? (
          <>
            <span
              aria-hidden
              className="absolute size-[78%] rounded-full opacity-90"
              style={{ background: `radial-gradient(circle at 50% 30%, #fff, ${p.accent}22)` }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.thumb}
              alt={`${p.name}, ${p.subtitle}`}
              className="relative h-[86%] w-auto drop-shadow-[0_18px_22px_rgba(14,58,91,.25)] transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.thumb}
            alt={`${p.name}, ${p.subtitle}`}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.05]"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.9rem] text-navy/60">{p.category}</p>
        <h3 className="mt-1 font-display text-[1.6rem] font-bold leading-[1.05] tracking-[-0.02em]">
          {p.name.replace("Cutisafe ", "")}
        </h3>
        <p className="text-[1rem] font-medium text-navy/75">{p.subtitle}</p>
        <p className="mt-3 flex-1 text-[0.98rem] leading-[1.55] text-navy/70">{p.short}</p>
        <div className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4">
          <span className="text-[0.92rem] text-navy/60">{p.specs[0][0]}: {p.specs[0][1]}</span>
          <span className="rounded-full bg-navy px-4 py-2 text-[0.9rem] font-semibold text-white transition-colors group-hover:bg-green">
            Detayı gör
          </span>
        </div>
      </div>
    </Link>
  );
}
