"use client";

import { useEffect, useState } from "react";
import { LiquidCircle } from "./LiquidCircle";
import { WaveEdge } from "./WaveEdge";
import { productNames, whatsapp, type ProductId } from "@/lib/products";

const ids = Object.keys(productNames) as ProductId[];

export function Quote() {
  const [picked, setPicked] = useState<ProductId[]>([]);
  const [org, setOrg] = useState("");
  const [person, setPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const add = (e: Event) => {
      const id = (e as CustomEvent<ProductId>).detail;
      setPicked((p) => (p.includes(id) ? p : [...p, id]));
    };
    const click = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLElement>("[data-quote]");
      if (!a) return;
      e.preventDefault();
      add(new CustomEvent("x", { detail: a.dataset.quote }));
      document.getElementById("teklif")?.scrollIntoView({ behavior: "smooth" });
    };
    addEventListener("quote:add", add);
    document.addEventListener("click", click);
    return () => {
      removeEventListener("quote:add", add);
      document.removeEventListener("click", click);
    };
  }, []);

  const toggle = (id: ProductId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!org.trim() || !person.trim()) return setError("Kurum adı ve yetkili kişi gerekli.");
    if (!picked.length) return setError("En az bir ürün seçin.");
    setError("");
    const text = [
      "Merhaba, Cutisafe ürünleri için teklif almak istiyorum.",
      `Kurum: ${org}`,
      `Yetkili: ${person}`,
      phone && `Telefon: ${phone}`,
      `Ürünler: ${picked.map((i) => productNames[i]).join(", ")}`,
      note && `Adet ve not: ${note}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const field =
    "w-full rounded-2xl border-2 border-white/20 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/45 transition-colors focus:border-ice focus:outline-none";

  return (
    <section
      id="teklif"
      data-tone="dark"
      className="relative bg-navy px-5 pb-28 pt-[130px] text-white md:px-10 md:pb-40 md:pt-[220px]"
    >
      <WaveEdge color="#fefefe" />
      <div className="mx-auto grid max-w-[1400px] items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-[120px]">
          <h2 className="font-display text-[clamp(3rem,7vw,6.6rem)] font-bold leading-[0.92] tracking-[-0.04em]">
            Seviyeyi
            <br />
            siz belirleyin.
          </h2>
          <p className="mt-6 max-w-[42ch] text-[1.2rem] text-white/80">
            Hastane, eczane, bakım merkezi ve bayiler için toptan teklif. Ürünleri seçtikçe
            daire dolar. Mesajınız WhatsApp&apos;ta hazır gelir.
          </p>
          <LiquidCircle
            level={0.1 + 0.8 * (picked.length / ids.length)}
            fill="#4db6eb"
            ring="#ffffff"
            className="mx-auto mt-12 hidden w-full max-w-[420px] lg:block"
          />
        </div>

        <form onSubmit={send} className="space-y-8" noValidate>
          <fieldset>
            <legend className="mb-4 font-display text-[1.4rem] font-semibold">Ürünler</legend>
            <div className="flex flex-wrap gap-2.5">
              {ids.map((id) => {
                const on = picked.includes(id);
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() => toggle(id)}
                    aria-pressed={on}
                    className={`rounded-full border-2 px-5 py-3 font-medium transition-colors ${
                      on
                        ? "border-ice bg-ice text-deep"
                        : "border-white/25 text-white hover:border-white/60"
                    }`}
                  >
                    {productNames[id]}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[0.95rem] text-white/75">Kurum adı</span>
              <input className={field} value={org} onChange={(e) => setOrg(e.target.value)} autoComplete="organization" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[0.95rem] text-white/75">Yetkili kişi</span>
              <input className={field} value={person} onChange={(e) => setPerson(e.target.value)} autoComplete="name" />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-[0.95rem] text-white/75">Telefon</span>
              <input className={field} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-[0.95rem] text-white/75">Tahmini adet ve notunuz</span>
              <textarea className={field} rows={4} value={note} onChange={(e) => setNote(e.target.value)} />
            </label>
          </div>

          {error && (
            <p role="alert" className="font-medium text-ice">
              {error}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="submit"
              className="rounded-full bg-white px-8 py-4 font-semibold text-navy transition-transform hover:-translate-y-0.5"
            >
              WhatsApp&apos;ta gönder
            </button>
            <p className="max-w-[36ch] text-[0.95rem] text-white/65">
              Bireysel alımlar için de aynı numaradan yazabilirsiniz.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
