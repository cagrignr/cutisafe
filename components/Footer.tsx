import Link from "next/link";
import { Logo } from "./Logo";
import { products } from "@/lib/catalog";

const company = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
  { href: "/siparis", label: "Sipariş" },
];

const link = "transition-colors hover:text-white";

export function Footer() {
  return (
    <footer data-tone="dark" className="bg-deep px-5 pb-8 pt-16 text-white/75 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 text-white" aria-label="Cutisafe ana sayfa">
              <Logo level={0.5} size={34} />
              <span className="font-display text-[1.15rem] font-semibold tracking-[0.34em]">CUTISAFE</span>
            </Link>
            <p className="mt-5 max-w-[34ch] leading-relaxed">
              Hastane, eczane ve evde bakım için tıbbi sarf malzemeleri. Berha Medical Supplies markasıdır.
            </p>
          </div>

          <nav aria-label="Ürünler">
            <h2 className="font-display text-[1.05rem] font-semibold text-white">Ürünler</h2>
            <ul className="mt-4 space-y-2.5">
              {products.map((p) => (
                <li key={p.id}>
                  <Link href={`/urunler/${p.slug}`} className={link}>
                    {p.name.replace("Cutisafe ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Kurumsal">
            <h2 className="font-display text-[1.05rem] font-semibold text-white">Kurumsal</h2>
            <ul className="mt-4 space-y-2.5">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className={link}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-[1.05rem] font-semibold text-white">İletişim</h2>
            <address className="mt-4 space-y-2.5 not-italic">
              <p>
                Çamlık Mah. Dinç Sokak No:4
                <br />
                Muyar Plaza Kat:2 D:16
                <br />
                Ümraniye / İstanbul
              </p>
              <p>
                <a className={link} href="tel:+905315204453">+90 531 520 44 53</a>
              </p>
              <p>
                <a className={link} href="https://www.berha.org">www.berha.org</a>
                <br />
                <a className={link} href="https://instagram.com/berhamedical">@berhamedical</a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-white/15 pt-6 text-[0.9rem] text-white/55 md:flex-row">
          <p>© 2026 Cutisafe. Tüm hakları saklıdır.</p>
          <p>Berha İthalat İhracat A.Ş.</p>
        </div>
      </div>
    </footer>
  );
}
