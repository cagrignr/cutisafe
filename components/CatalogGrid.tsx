"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "@/lib/catalog";

const tabs = ["Tümü", "Spreyler", "Hasta bakımı"] as const;

export function CatalogGrid() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tümü");
  const list = products.filter((p) => tab === "Tümü" || p.category === tab);
  const count = (t: string) => (t === "Tümü" ? products.length : products.filter((p) => p.category === t).length);
  return (
    <>
      <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Ürün kategorileri">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-full px-5 py-2.5 font-semibold transition-colors ${
              tab === t ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-navy/15 hover:ring-navy/40"
            }`}
          >
            {t} <span className={tab === t ? "text-white/70" : "text-navy/50"}>{count(t)}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-navy/60">{list.length} ürün</p>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.id} className="flex">
            <div className="flex w-full">
              <ProductCard p={p} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
