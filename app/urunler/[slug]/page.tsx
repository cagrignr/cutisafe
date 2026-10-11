import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { bySlug, products } from "@/lib/catalog";
import { whatsapp } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  return { title: `${p.name} | Cutisafe`, description: p.short };
}

const h2 = "font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-bold leading-[1] tracking-[-0.03em]";

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<main data-tone="light" className="min-h-screen bg-paper" />}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: Props) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();
  const others = products.filter((x) => x.id !== p.id).slice(0, 3);
  const msg = encodeURIComponent(`Merhaba, ${p.name} için teklif almak istiyorum.`);

  return (
    <>
      <main data-tone="light" className="bg-paper px-5 pb-28 pt-[100px] md:px-10 md:pt-[120px]">
        <div className="mx-auto max-w-[1300px]">
          <nav aria-label="Konum" className="text-[0.95rem] text-navy/60">
            <Link href="/urunler" className="hover:text-navy">Ürünler</Link>
            <span className="mx-2">/</span>
            <span className="text-navy">{p.name.replace("Cutisafe ", "")}</span>
          </nav>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-[100px]">
              <ProductGallery p={p} />
            </div>
            <div>
              <p className="text-[1rem] text-navy/60">{p.category}</p>
              <h1 className="mt-2 font-display text-[clamp(2.6rem,5.4vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
                {p.name.replace("Cutisafe ", "")}
              </h1>
              <p className="mt-2 font-display text-[1.5rem] font-semibold text-navy/80">{p.subtitle}</p>
              <p className="mt-6 max-w-[56ch] text-[1.2rem] leading-[1.6] text-navy/85">{p.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${whatsapp}?text=${msg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-navy px-7 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  WhatsApp&apos;ta teklif iste
                </a>
                <Link href="/urunler" className="rounded-full border-2 border-navy/25 px-7 py-4 font-semibold transition-colors hover:border-navy">
                  Tüm ürünler
                </Link>
              </div>

              <section className="mt-14">
                <h2 className={h2}>Özellikler</h2>
                <dl className="mt-6">
                  {p.features.map((f) => (
                    <div key={f.title} className="grid gap-1 border-t border-navy/12 py-4 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-8">
                      <dt className="font-display text-[1.15rem] font-semibold leading-snug">{f.title}</dt>
                      <dd className="text-navy/70">{f.text}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {p.steps && (
                <section className="mt-12">
                  <h2 className={h2}>{p.stepsTitle}</h2>
                  {p.ordered ? (
                    <ol className="mt-6 space-y-3.5">
                      {p.steps.map((s, i) => (
                        <li key={s} className="flex items-start gap-4">
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-[0.95rem] font-bold text-white">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{s}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul className="mt-6 list-disc space-y-2.5 pl-6 marker:text-navy/40">
                      {p.steps.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              <section className="mt-12">
                <h2 className={h2}>Kullanım alanları</h2>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {p.uses.map((u) => (
                    <li key={u} className={`rounded-full px-5 py-2.5 font-medium ${p.chip}`}>
                      {u}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-12">
                <h2 className={h2}>Teknik bilgiler</h2>
                <dl className="mt-6">
                  {p.specs.map(([k, v]) => (
                    <div key={k} className="grid gap-1 border-t border-navy/12 py-3.5 sm:grid-cols-[minmax(0,12rem)_1fr] sm:gap-8">
                      <dt className="text-navy/60">{k}</dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              {p.warning && (
                <section className="mt-12 rounded-2xl bg-navy/6 p-6">
                  <h2 className="font-display text-[1.25rem] font-semibold">Uyarılar</h2>
                  <p className="mt-2 leading-relaxed text-navy/75">{p.warning}</p>
                </section>
              )}
            </div>
          </div>

          <section className="mt-24">
            <h2 className={h2}>Diğer ürünler</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((o) => (
                <li key={o.id} className="flex">
                  <div className="flex w-full">
                    <ProductCard p={o} />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
