import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { whatsapp } from "@/lib/products";

export const metadata: Metadata = {
  title: "İletişim | Cutisafe",
  description: "Cutisafe için Berha İthalat İhracat A.Ş. iletişim bilgileri.",
};

const rows: { k: string; v: React.ReactNode }[] = [
  {
    k: "Adres",
    v: (
      <>
        Çamlık Mah. Dinç Sokak No:4
        <br />
        Muyar Plaza Kat:2 D:16
        <br />
        Ümraniye / İstanbul
      </>
    ),
  },
  { k: "Telefon", v: <a className="underline-offset-4 hover:underline" href="tel:+905315204453">+90 531 520 44 53</a> },
  { k: "Web", v: <a className="underline-offset-4 hover:underline" href="https://www.berha.org">www.berha.org</a> },
  { k: "Instagram", v: <a className="underline-offset-4 hover:underline" href="https://instagram.com/berhamedical">@berhamedical</a> },
];

export default function Contact() {
  return (
    <>
      <main data-tone="light" className="bg-paper px-5 pb-28 pt-[130px] md:px-10 md:pt-[160px]">
        <div className="mx-auto max-w-[1300px]">
          <h1 className="font-display text-[clamp(3rem,7vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            İletişim
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.2rem] text-navy/75">
            Ürünler, toptan fiyat ve teslimat için bize yazın veya arayın.
          </p>
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="font-display text-[1.6rem] font-bold tracking-[-0.02em]">Berha İthalat İhracat A.Ş.</h2>
              <dl className="mt-6">
                {rows.map((r) => (
                  <div key={r.k} className="grid gap-1 border-t border-navy/12 py-5 sm:grid-cols-[8rem_1fr] sm:gap-8">
                    <dt className="text-navy/60">{r.k}</dt>
                    <dd className="text-[1.1rem] font-medium leading-relaxed">{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-[2rem] bg-navy p-8 text-white md:p-10">
              <h2 className="font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.03em]">
                En hızlı yol WhatsApp.
              </h2>
              <p className="mt-4 max-w-[40ch] text-[1.1rem] text-white/80">
                Ürün, adet ve şehir bilgisini yazın, size dönüş yapalım.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Merhaba, Cutisafe ürünleri hakkında bilgi almak istiyorum.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-7 py-4 font-semibold text-navy transition-transform hover:-translate-y-0.5"
                >
                  WhatsApp&apos;tan yaz
                </a>
                <Link href="/siparis" className="rounded-full border-2 border-white/30 px-7 py-4 font-semibold transition-colors hover:border-white">
                  Sipariş ver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
