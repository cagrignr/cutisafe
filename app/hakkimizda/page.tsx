import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Hakkımızda | Cutisafe",
  description: "Cutisafe, Berha Medical Supplies'ın tıbbi sarf malzemeleri markasıdır.",
};

export default function About() {
  const groups = [
    { title: "Spreyler", items: products.filter((p) => p.category === "Spreyler") },
    { title: "Hasta bakımı", items: products.filter((p) => p.category === "Hasta bakımı") },
  ];
  return (
    <>
      <main data-tone="light" className="bg-paper px-5 pb-28 pt-[130px] md:px-10 md:pt-[160px]">
        <div className="mx-auto max-w-[1300px]">
          <div className="flex items-center gap-5">
            <Logo level={0.5} size={64} className="text-navy" />
            <h1 className="font-display text-[clamp(3rem,7vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              Hakkımızda
            </h1>
          </div>
          <p className="mt-8 max-w-[34ch] font-display text-[clamp(1.6rem,3.2vw,2.8rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
            Cutisafe, Berha Medical Supplies&apos;ın tıbbi sarf malzemeleri markasıdır.
          </p>
          <p className="mt-6 max-w-[62ch] text-[1.2rem] leading-[1.65] text-navy/80">
            Hastane, eczane, bakım merkezi ve evde kullanım için yara bakımı, soğutma, plaster sökme,
            yatak koruma, infüzyon ve eldiven ürünleri sunuyoruz. Ambalajlarımızda kullanım
            talimatını ve uyarıları açıkça yazıyoruz, çünkü bakımda güven, net bilgiyle başlar.
          </p>

          <div className="mt-20 grid gap-12 md:grid-cols-2">
            {groups.map((g) => (
              <section key={g.title}>
                <h2 className="font-display text-[1.8rem] font-bold tracking-[-0.03em]">{g.title}</h2>
                <ul className="mt-5">
                  {g.items.map((p) => (
                    <li key={p.id} className="border-t border-navy/12">
                      <Link href={`/urunler/${p.slug}`} className="flex items-center justify-between gap-6 py-5 transition-colors hover:text-green">
                        <span>
                          <span className="block font-display text-[1.25rem] font-semibold">{p.name.replace("Cutisafe ", "")}</span>
                          <span className="block text-[0.98rem] text-navy/65">{p.subtitle}</span>
                        </span>
                        <span className="shrink-0 text-[0.95rem] font-semibold">Detay</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-20 flex flex-wrap gap-3">
            <Link href="/urunler" className="rounded-full bg-navy px-7 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5">
              Tüm ürünler
            </Link>
            <Link href="/iletisim" className="rounded-full border-2 border-navy/25 px-7 py-4 font-semibold transition-colors hover:border-navy">
              İletişim
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
