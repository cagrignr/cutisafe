"use client";

import Link from "next/link";
import type { Spray } from "@/lib/sprays";

export function SprayInfo({
  spray,
  bg,
  text,
  muted,
  chip,
  cta,
}: {
  spray: Spray;
  bg: string;
  text: string;
  muted: string;
  chip: string;
  cta: string;
}) {
  const quote = () => {
    window.dispatchEvent(new CustomEvent("quote:add", { detail: spray.id }));
    document.getElementById("teklif")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={`px-5 py-24 md:px-10 md:py-32 ${bg} ${text}`}>
      <div className="mx-auto grid max-w-[1200px] gap-14 md:grid-cols-2 md:gap-24">
        <div>
          <h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] font-bold leading-[1] tracking-[-0.03em]">
            Kullanım alanları
          </h3>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {spray.uses.map((u) => (
              <li key={u} className={`rounded-full px-5 py-2.5 text-[1.02rem] font-medium ${chip}`}>
                {u}
              </li>
            ))}
          </ul>
          <p className={`mt-8 text-[1.05rem] ${muted}`}>{spray.english}</p>
        </div>
        <div>
          <p className={`max-w-[56ch] text-[0.98rem] leading-relaxed ${muted}`}>
            <strong className="font-semibold">Uyarı:</strong> {spray.warning}
          </p>
          <Link
            href={`/urunler/${spray.slug}`}
            className="mt-9 mr-3 inline-block rounded-full border-2 border-current/25 px-8 py-4 font-semibold transition-colors hover:border-current"
          >
            Ürün detayı
          </Link>
          <button
            onClick={quote}
            className={`mt-9 rounded-full px-8 py-4 font-semibold transition-transform hover:-translate-y-0.5 ${cta}`}
          >
            {spray.title} için teklif iste
          </button>
        </div>
      </div>
    </div>
  );
}
