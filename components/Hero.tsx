"use client";

import { useEffect, useRef } from "react";
import { LiquidCircle } from "./LiquidCircle";

const facts = [
  { title: "Spreyler", text: "Barrier, Cold, Remover" },
  { title: "Hasta bakımı", text: "Bez, set, eldiven" },
  { title: "Satış", text: "Toptan ve kurumsal" },
];

export function Hero() {
  const text = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const a = 1 - Math.min(1, scrollY / (innerHeight * 0.55));
      if (text.current) {
        text.current.style.opacity = String(a);
        text.current.style.transform = `translateX(${(1 - a) * -60}px)`;
        text.current.style.visibility = a <= 0 ? "hidden" : "visible";
      }
      if (hint.current) hint.current.style.opacity = String(Math.max(0, 1 - scrollY / 160));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", on, { passive: true });
    return () => {
      removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="hero" data-tone="light" className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <LiquidCircle
          level={0.5}
          fill="#0e3a5b"
          ring="#0e3a5b"
          className="absolute left-1/2 top-[83%] w-[min(88vw,50vh)] -translate-x-1/2 -translate-y-1/2 md:left-[71%] md:top-[55%] md:w-[min(52vw,98vh)]"
        />

        <div
          ref={text}
          className="absolute inset-x-0 top-0 flex h-full flex-col justify-start px-5 pt-[104px] md:justify-center md:px-10 md:pb-6 md:pt-[72px]"
        >
          <div className="md:w-[44vw] md:max-w-[640px]">
            <h1 className="font-display text-[clamp(2.6rem,5.6vw,5.6rem)] font-bold leading-[0.96] tracking-[-0.04em] text-navy">
              Bakımın güvenli seviyesi.
            </h1>
            <p className="mt-5 max-w-[46ch] text-[1.1rem] leading-[1.6] text-navy/80 md:mt-7 md:text-[1.25rem]">
              Yara bakımı, soğutma ve plaster sökme için üç sprey. Hasta altı bezi, infüzyon seti ve
              eldiven. Hastane, eczane, bakım merkezi ve evde kullanım için.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 md:mt-9">
              <a
                href="#family"
                className="rounded-full bg-navy px-7 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Ürünleri incele
              </a>
              <a
                href="#teklif"
                className="rounded-full border-2 border-navy/25 bg-white/70 px-7 py-4 font-semibold text-navy transition-colors hover:border-navy"
              >
                Toptan teklif al
              </a>
            </div>
            <dl className="mt-10 hidden grid-cols-3 gap-6 border-t border-navy/15 pt-6 md:grid">
              {facts.map((f) => (
                <div key={f.title}>
                  <dt className="font-display text-[1.15rem] font-semibold">{f.title}</dt>
                  <dd className="mt-1 text-[0.95rem] text-navy/70">{f.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <a
          ref={hint}
          href="#family"
          className="absolute bottom-5 left-5 text-[0.95rem] text-navy/60 hover:text-navy md:bottom-7 md:left-10"
        >
          Kaydırın
        </a>
      </div>
    </section>
  );
}
