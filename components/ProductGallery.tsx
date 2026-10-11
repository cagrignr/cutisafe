"use client";

import { useState } from "react";
import { LiquidCircle } from "./LiquidCircle";
import { Loupe } from "./Loupe";
import { faces } from "@/lib/products";
import type { Product } from "@/lib/catalog";

export function ProductGallery({ p }: { p: Product }) {
  const [face, setFace] = useState(0);

  if (p.kind === "photo") {
    const im = p.images[0];
    return (
      <div className="rounded-[2rem] bg-sheet p-4 ring-1 ring-navy/10 md:p-8">
        <Loupe src={im.src} alt={`${p.name}, ${p.subtitle}`} width={im.w} height={im.h} multiply className="mx-auto max-w-[760px]" />
        <p className="mt-3 text-center text-sm text-navy/55">İmleci görselin üzerinde gezdirerek yakınlaştırın.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-[2rem] p-4 md:p-8"
      style={{ background: p.tint }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") setFace((f) => (f + 1) % 4);
        if (e.key === "ArrowLeft") setFace((f) => (f + 3) % 4);
      }}
    >
      <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center" tabIndex={0} role="group" aria-label={`${p.name} görselleri. Yüz değiştirmek için ok tuşlarını kullanın.`}>
        <LiquidCircle level={0.5} fill={p.accent} ring="#0e3a5b" className="absolute inset-0 h-full w-full" />
        <div className="relative aspect-[266/822] h-[84%]">
          {p.images.map((im, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={im.src}
              src={im.src}
              alt={i === face ? `${p.name}, ${faces[i].toLowerCase()}` : ""}
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity: i === face ? 1 : 0,
                transform: `scaleX(${i === face ? 1 : 0.18})`,
                transition: "opacity .32s ease, transform .5s cubic-bezier(.2,.8,.2,1)",
              }}
              draggable={false}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {faces.map((f, i) => (
          <button
            key={f}
            onClick={() => setFace(i)}
            aria-pressed={i === face}
            className={`rounded-full px-4 py-2 text-[0.95rem] font-medium transition-colors ${
              i === face ? "bg-navy text-white" : "bg-white/70 text-navy hover:bg-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
