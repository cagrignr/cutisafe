import Link from "next/link";
import { asset } from "@/lib/base";
import { Loupe } from "./Loupe";
import { WaveEdge } from "./WaveEdge";

function Specs({ items }: { items: [string, string][] }) {
  return (
    <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-navy/15 pt-6">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt className="text-[0.92rem] text-navy/60">{k}</dt>
          <dd className="font-display text-[1.35rem] font-semibold leading-tight">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function DetailLink({ slug }: { slug: string }) {
  return (
    <Link
      href={`/urunler/${slug}`}
      className="mt-8 ml-3 inline-block rounded-full border-2 border-navy/25 px-7 py-4 font-semibold transition-colors hover:border-navy"
    >
      Ürün detayı
    </Link>
  );
}

function QuoteButton({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#teklif?urun=${id}`}
      data-quote={id}
      className="mt-8 inline-block rounded-full bg-navy px-7 py-4 font-semibold text-white transition-transform hover:-translate-y-0.5"
    >
      {label}
    </a>
  );
}

export function Supplies() {
  return (
    <section
      id="sarf"
      data-tone="light"
      className="relative bg-sheet px-5 pb-28 pt-[130px] md:px-10 md:pb-44 md:pt-[220px]"
    >
      <WaveEdge color="#f7f9fb" />
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-[14ch] font-display text-[clamp(3rem,7.4vw,7rem)] font-bold leading-[0.92] tracking-[-0.04em]">
          Her gün lazım olan sarflar.
        </h2>
        <p className="mt-6 max-w-[50ch] text-[1.2rem] text-navy/75">
          Yatak başında, muayene odasında, serviste. Sade ambalaj, net bilgi ve her pakette aynı
          Cutisafe güvencesi.
        </p>

        <div className="mt-20 grid items-center gap-10 lg:mt-28 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Loupe
            src={asset("/img/bez.jpg")}
            alt="Cutisafe Hasta Altı Bezi, 30 adet, 60 x 90 cm"
            width={1447}
            height={1087}
            multiply
          />
          <div>
            <h3 className="font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Hasta Altı Bezi
            </h3>
            <p className="mt-3 text-[1.15rem] text-navy/75">
              Emici koruyucu yatak örtüsü. Daha temiz, daha kuru ve daha konforlu bir dinlenme
              için güvenilir koruma.
            </p>
            <ul className="mt-6 space-y-2 text-[1.05rem]">
              <li><strong className="font-semibold">Yüksek emicilik.</strong> Nemi hızla hapseder.</li>
              <li><strong className="font-semibold">Yumuşak ve konforlu.</strong> Cilt dostu yüzey.</li>
              <li><strong className="font-semibold">Sızdırmaz bariyer.</strong> Yüzeyleri kuru ve korunaklı tutar.</li>
            </ul>
            <Specs
              items={[
                ["Boyut", "60 × 90 cm"],
                ["Pakette", "30 adet"],
                ["Kullanım", "Yatak, sandalye"],
                ["Ortam", "Evde, bakım merkezinde"],
              ]}
            />
            <QuoteButton id="bez" label="Hasta altı bezi için teklif iste" />
            <DetailLink slug="hasta-alti-bezi" />
          </div>
        </div>

        <div className="mt-24 grid items-center gap-10 lg:mt-36 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div className="lg:order-1">
            <h3 className="font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Pudralı Lateks Eldiven
            </h3>
            <p className="mt-3 text-[1.15rem] text-navy/75">
              Latex Examination Gloves, Powdered. Muayeneden laboratuvara, her işte yumuşak ve
              esnek.
            </p>
            <div className="mt-6 flex gap-2.5" aria-label="Mevcut bedenler">
              {[
                ["S", "Küçük"],
                ["M", "Orta"],
                ["L", "Büyük"],
                ["XL", "Ekstra büyük"],
              ].map(([s, n]) => (
                <div
                  key={s}
                  className="flex min-w-[68px] flex-col items-center rounded-2xl border-2 border-navy/15 px-3 py-2.5"
                >
                  <span className="font-display text-[1.6rem] font-bold leading-none">{s}</span>
                  <span className="mt-1 text-[0.78rem] text-navy/65">{n}</span>
                </div>
              ))}
            </div>
            <Specs
              items={[
                ["Kutuda", "100 adet"],
                ["Kalite", "AQL 1.5"],
                ["Yapı", "Pudralı lateks"],
                ["Kullanım", "Tek kullanımlık"],
              ]}
            />
            <QuoteButton id="eldiven" label="Eldiven için teklif iste" />
            <DetailLink slug="latex-eldiven" />
          </div>
          <Loupe
            src={asset("/img/eldiven.jpg")}
            alt="Cutisafe Pudralı Lateks Eldiven, 100 adetlik kutu"
            width={1536}
            height={1024}
            multiply
            className="lg:order-2"
          />
        </div>

        <div className="mt-24 lg:mt-36">
          <Loupe
            src={asset("/img/infuzyon.jpg")}
            alt="Cutisafe İnfüzyon Seti ambalajı"
            width={1600}
            height={800}
            zoom={2.8}
            className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-30px_rgba(14,58,91,.35)]"
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h3 className="font-display text-[clamp(2.4rem,4.4vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.03em]">
                İnfüzyon Seti
              </h3>
              <p className="mt-3 text-[1.15rem] text-navy/75">
                Şişe ve biofleks torba ile kullanım içindir. Güvenli ve kontrollü akış, steril ve
                tek kullanımlık.
              </p>
              <QuoteButton id="set" label="İnfüzyon seti için teklif iste" />
            <DetailLink slug="infuzyon-seti" />
            </div>
            <Specs
              items={[
                ["Sterilizasyon", "EO, apirojen"],
                ["Damla faktörü", "20 damla / ml"],
                ["Belge", "CE 0197"],
                ["Kullanım", "Yerçekimi ile akış, 24 saatte bir değiştirin"],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
