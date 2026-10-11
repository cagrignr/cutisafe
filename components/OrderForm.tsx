"use client";

import { useState } from "react";
import { products } from "@/lib/catalog";
import { whatsapp } from "@/lib/products";

export function OrderForm() {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [org, setOrg] = useState("");
  const [person, setPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const set = (id: string, v: number) => setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(99999, v || 0)) }));
  const lines = products.filter((p) => (qty[p.id] ?? 0) > 0);
  const total = lines.reduce((a, p) => a + (qty[p.id] ?? 0), 0);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lines.length) return setError("En az bir ürün için adet girin.");
    if (!org.trim() || !person.trim() || !phone.trim()) return setError("Kurum adı, yetkili kişi ve telefon gerekli.");
    setError("");
    const text = [
      "Merhaba, Cutisafe ürünleri için sipariş vermek istiyorum.",
      "",
      ...lines.map((p) => `- ${p.name}: ${qty[p.id]} adet`),
      "",
      `Kurum: ${org}`,
      `Yetkili: ${person}`,
      `Telefon: ${phone}`,
      city ? `Teslimat şehri: ${city}` : null,
      note ? `Not: ${note}` : null,
    ]
      .filter((l): l is string => l !== null)
      .join("\n");
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const field =
    "w-full rounded-2xl border-2 border-navy/15 bg-white px-4 py-3.5 transition-colors placeholder:text-navy/40 focus:border-navy focus:outline-none";

  return (
    <form onSubmit={send} noValidate className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
      <fieldset>
        <legend className="mb-5 font-display text-[1.6rem] font-bold tracking-[-0.02em]">Ürünler ve adetler</legend>
        <ul className="divide-y divide-navy/10 rounded-[1.5rem] bg-white ring-1 ring-navy/10">
          {products.map((p) => (
            <li key={p.id} className="flex items-center gap-4 p-4">
              <span
                className="flex size-[68px] shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                style={{ background: p.tint }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.thumb}
                  alt=""
                  className={p.kind === "spray" ? "h-[88%] w-auto" : "h-full w-full object-contain mix-blend-multiply"}
                />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[1.12rem] font-semibold leading-tight">{p.name.replace("Cutisafe ", "")}</p>
                <p className="text-[0.88rem] text-navy/60">{p.subtitle}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label={`${p.name} adedini azalt`}
                  onClick={() => set(p.id, (qty[p.id] ?? 0) - 1)}
                  className="size-10 rounded-full bg-navy/8 text-xl font-semibold hover:bg-navy/15"
                >
                  −
                </button>
                <input
                  inputMode="numeric"
                  aria-label={`${p.name} adedi`}
                  value={qty[p.id] ? String(qty[p.id]) : ""}
                  placeholder="0"
                  onChange={(e) => set(p.id, parseInt(e.target.value.replace(/\D/g, ""), 10))}
                  className="w-16 rounded-xl border-2 border-navy/15 py-2 text-center font-semibold focus:border-navy focus:outline-none"
                />
                <button
                  type="button"
                  aria-label={`${p.name} adedini artır`}
                  onClick={() => set(p.id, (qty[p.id] ?? 0) + 1)}
                  className="size-10 rounded-full bg-navy/8 text-xl font-semibold hover:bg-navy/15"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      </fieldset>

      <div className="lg:sticky lg:top-[100px] lg:self-start">
        <h2 className="mb-5 font-display text-[1.6rem] font-bold tracking-[-0.02em]">Sipariş bilgileri</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[0.95rem] text-navy/70">Kurum adı</span>
            <input className={field} value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.95rem] text-navy/70">Yetkili kişi</span>
            <input className={field} value={person} onChange={(e) => setPerson(e.target.value)} autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.95rem] text-navy/70">Telefon</span>
            <input className={field} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.95rem] text-navy/70">Teslimat şehri</span>
            <input className={field} value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level1" />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-2 block text-[0.95rem] text-navy/70">Notunuz</span>
            <textarea className={field} rows={3} value={note} onChange={(e) => setNote(e.target.value)} />
          </label>
        </div>
        <div className="mt-6 rounded-2xl bg-navy/6 p-5">
          <p className="font-display text-[1.15rem] font-semibold">
            {lines.length ? `${lines.length} ürün, toplam ${total} adet` : "Henüz ürün seçilmedi"}
          </p>
          <p className="mt-1 text-[0.92rem] text-navy/65">
            Siparişiniz WhatsApp&apos;ta hazır bir mesaj olarak açılır. Fiyat ve teslimat bilgisi size mesajla iletilir.
          </p>
        </div>
        {error && (
          <p role="alert" className="mt-4 font-medium text-[#b3261e]">
            {error}
          </p>
        )}
        <button type="submit" className="mt-5 w-full rounded-full bg-navy px-8 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5">
          Siparişi WhatsApp&apos;ta gönder
        </button>
      </div>
    </form>
  );
}
