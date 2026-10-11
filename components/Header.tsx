"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { products } from "@/lib/catalog";

const tabs = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const path = usePathname();
  const [level, setLevel] = useState(0.5);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(scrollY > 40);
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      setLevel(0.5 + 0.5 * Math.min(1, Math.max(0, scrollY / max)));
      const hit = document
        .elementsFromPoint(innerWidth / 2, 36)
        .find((el) => !ref.current?.contains(el) && el.closest("[data-tone]"));
      const t = hit?.closest<HTMLElement>("[data-tone]")?.dataset.tone;
      setTone(t === "dark" ? "dark" : "light");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [path]);

  useEffect(() => setMenu(false), [path]);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    };
    const out = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    addEventListener("keydown", close);
    addEventListener("pointerdown", out);
    return () => {
      removeEventListener("keydown", close);
      removeEventListener("pointerdown", out);
    };
  }, []);

  const enter = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(false), 160);
  };

  const dark = tone === "dark" && !open;
  const tabClass = (active: boolean) =>
    `rounded-full px-3 py-2 text-[0.95rem] font-medium transition-colors md:px-4 ${
      active ? (dark ? "bg-white/15" : "bg-navy/8") : "opacity-80 hover:opacity-100"
    }`;

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        dark ? "text-white" : "text-navy"
      } ${
        scrolled || open
          ? dark
            ? "bg-deep/70 backdrop-blur-md"
            : "bg-paper/85 backdrop-blur-md"
          : ""
      }`}
    >
      <div className="mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto] items-center px-5 md:grid-cols-[1fr_auto_1fr] md:px-10">
        <Link href="/" className="flex items-center gap-3 justify-self-start" aria-label="Cutisafe ana sayfa">
          <Logo level={level} size={34} />
          <span className="font-display text-[1.15rem] font-semibold tracking-[0.34em]">CUTISAFE</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex md:gap-2" aria-label="Ana menü">
          <Link href="/" className={tabClass(path === "/")}>
            Ana Sayfa
          </Link>
          <div className="hidden md:block" onMouseEnter={enter} onMouseLeave={leave}>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-haspopup="true"
              className={`${tabClass(path.startsWith("/urunler"))} flex items-center gap-1.5`}
            >
              Ürünler
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden className={`transition-transform ${open ? "rotate-180" : ""}`}>
                <path d="M2 4.5 6 8.5 10 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {open && (
              <div className="absolute left-1/2 top-full w-[min(780px,92vw)] -translate-x-1/2 pt-3">
                <div className="rounded-[1.5rem] bg-white p-3 text-navy shadow-[0_30px_80px_-20px_rgba(14,58,91,.35)] ring-1 ring-navy/8">
                  <ul className="grid grid-cols-3 gap-1">
                    {products.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/urunler/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-paper"
                        >
                          <span
                            className="flex size-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl"
                            style={{ background: p.tint }}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={p.thumb}
                              alt=""
                              className={`${p.kind === "spray" ? "h-[88%] w-auto" : "h-full w-full object-contain mix-blend-multiply"}`}
                            />
                          </span>
                          <span>
                            <span className="block font-display text-[1.02rem] font-semibold leading-tight">
                              {p.name.replace("Cutisafe ", "")}
                            </span>
                            <span className="mt-0.5 block text-[0.85rem] leading-snug text-navy/60">{p.subtitle}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex items-center justify-between border-t border-navy/10 px-4 pb-1 pt-3">
                    <span className="text-[0.9rem] text-navy/60">3 sprey, 3 hasta bakım ürünü</span>
                    <Link
                      href="/urunler"
                      onClick={() => setOpen(false)}
                      className="rounded-full bg-navy px-5 py-2 text-[0.9rem] font-semibold text-white"
                    >
                      Tüm ürünler
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {tabs.slice(1).map((t) => (
            <Link key={t.href} href={t.href} className={tabClass(path === t.href)}>
              {t.label}
            </Link>
          ))}
          <Link
            href="/siparis"
            className={`rounded-full px-5 py-2 text-[0.95rem] font-semibold transition-colors duration-500 ${
              dark ? "bg-white text-navy" : "bg-navy text-white"
            }`}
          >
            Sipariş
          </Link>
        </nav>
        <div className="flex items-center justify-self-end gap-1">
          <Link
            href="/siparis"
            className={`rounded-full px-5 py-2.5 text-[0.95rem] font-semibold transition-colors duration-500 md:hidden ${
              dark ? "bg-white text-navy" : "bg-navy text-white"
            }`}
          >
            Sipariş
          </Link>
          <button
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-label="Menüyü aç"
            className="ml-1 flex size-10 items-center justify-center rounded-full md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
              <path d={menu ? "M5 5l12 12M17 5L5 17" : "M3 7h16M3 15h16"} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
      {menu && (
        <div className="border-t border-navy/10 bg-paper px-5 pb-6 pt-3 text-navy md:hidden">
          <ul className="space-y-1">
            {[...tabs.slice(0, 1), { href: "/urunler", label: "Ürünler" }, ...tabs.slice(1), { href: "/siparis", label: "Sipariş" }].map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="block rounded-xl px-3 py-3 font-display text-[1.3rem] font-semibold">
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
