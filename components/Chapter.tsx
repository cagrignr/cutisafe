"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidCircle } from "./LiquidCircle";
import { WaveEdge } from "./WaveEdge";
import { faces } from "@/lib/products";
import type { Spray } from "@/lib/sprays";

type Tone = {
  tone: "light" | "dark";
  bg: string;
  edge: string;
  accent: string;
  text: string;
  muted: string;
  circleFill: string;
  circleRing: string;
  dot: string;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** Kutu kaydırdıkça döner; her çeyrek turda bir özellik anlatılır. */
export function Chapter({ spray, side, tone }: { spray: Spray; side: "left" | "right"; tone: Tone }) {
  const sec = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = sec.current!.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - innerHeight));
      const spin = clamp((p - 0.05) / 0.9);
      setStep(Math.min(3, Math.floor(spin * 4)));
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

  const steps = [
    { h: spray.name, t: spray.lead },
    ...spray.features.map((f) => ({ h: f.title, t: f.text })),
  ];
  const cx = side === "right" ? "74%" : "26%";

  return (
    <section
      ref={sec}
      id={`${spray.slug}-chapter`}
      data-tone={tone.tone}
      className={`relative h-[480vh] ${tone.bg}`}
    >
      <WaveEdge color={tone.edge} />
      <div className="sticky top-0 h-screen overflow-hidden">
        <LiquidCircle
          level={0.5}
          fill={tone.circleFill}
          ring={tone.circleRing}
          className="absolute left-1/2 top-[30%] w-[min(80vw,42vh)] -translate-x-1/2 -translate-y-1/2 md:left-[var(--cx)] md:top-[53%] md:w-[min(48vw,92vh)]"
          style={{ ["--cx" as string]: cx }}
        />

        <div
          className={`absolute inset-x-5 bottom-14 md:inset-x-auto md:bottom-auto md:top-1/2 md:w-[40vw] md:-translate-y-1/2 ${
            side === "right" ? "md:left-[6vw]" : "md:right-[6vw]"
          } ${tone.text}`}
        >
          <h2
            className={`font-display text-[clamp(4.2rem,13vw,12rem)] font-extrabold leading-[0.8] tracking-[-0.035em] ${tone.accent}`}
          >
            {spray.title}
          </h2>
          <div className="relative mt-5 min-h-[12.5rem] md:mt-10 md:min-h-[14rem]">
            {steps.map((s, i) => (
              <div
                key={s.h}
                className="absolute inset-x-0 top-0 transition-all duration-500"
                style={{
                  opacity: i === step ? 1 : 0,
                  transform: `translateY(${i === step ? 0 : i < step ? -18 : 18}px)`,
                  pointerEvents: i === step ? "auto" : "none",
                }}
                aria-hidden={i !== step}
              >
                <p className="font-display text-[clamp(1.6rem,3.2vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                  {s.h}
                </p>
                <p className={`mt-3 max-w-[40ch] text-[1.08rem] leading-[1.55] md:text-[1.25rem] ${tone.muted}`}>
                  {s.t}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 text-[0.85rem] md:bottom-7 ${tone.muted}`}
          aria-hidden
        >
          {faces.map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-3 py-1.5 transition-colors duration-500 ${
                i === step ? tone.dot : ""
              }`}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
