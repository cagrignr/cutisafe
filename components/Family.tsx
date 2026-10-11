"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/base";

const FOCI = [
  { id: "cold-chapter", name: "Cold", sub: "Soğutucu sprey", left: "0%" },
  { id: "remover-chapter", name: "Remover", sub: "Plaster sökücü sprey", left: "33.33%" },
  { id: "barrier-chapter", name: "Barrier", sub: "Yara bariyeri sprey", left: "66.66%" },
];

/** 3'lü aile görseli ekrana tam sığar. Her üçte bir bölüm ilgili ürüne gider. */
export function Family() {
  const sec = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sec.current!.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, 1 - r.top / innerHeight));
      const e = t * t * (3 - 2 * t);
      if (frame.current) {
        frame.current.style.transform = `scale(${0.9 + 0.1 * e})`;
        frame.current.style.opacity = String(0.4 + 0.6 * e);
      }
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
    <section
      ref={sec}
      id="family"
      data-tone="light"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#eef4f9] px-4 pb-10 pt-[96px] md:px-10"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset("/img/aile.jpg")}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-80 blur-3xl"
      />
      <div
        ref={frame}
        className="relative aspect-[3/2] w-[min(100%,calc((100vh-150px)*1.5))] origin-center will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/img/aile.jpg")}
          alt="Cutisafe 3'lü medikal sprey ailesi: Cold, Remover ve Barrier"
          width={1536}
          height={1024}
          className="h-full w-full rounded-[1.25rem] shadow-[0_40px_100px_-40px_rgba(14,58,91,.45)]"
          draggable={false}
        />
        <div className="absolute inset-0 hidden md:block">
          {FOCI.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              aria-label={`${f.name}, ${f.sub}`}
              className="group absolute inset-y-0 w-1/3 rounded-[1.25rem] transition-colors duration-300 hover:bg-white/15"
              style={{ left: f.left }}
            >
              <span className="absolute bottom-[14%] left-1/2 -translate-x-1/2 translate-y-2 whitespace-nowrap rounded-full bg-navy px-5 py-2.5 text-[0.95rem] font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {f.name} sprey, incele
              </span>
            </a>
          ))}
        </div>
      </div>
      <div className="relative mt-5 flex flex-wrap justify-center gap-2.5 md:hidden">
        {FOCI.map((f) => (
          <a
            key={f.id}
            href={`#${f.id}`}
            className="rounded-full bg-navy px-5 py-2.5 text-[0.95rem] font-semibold text-white"
          >
            {f.name}
          </a>
        ))}
      </div>
    </section>
  );
}
