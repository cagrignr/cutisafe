import type { Metadata } from "next";
import { CatalogGrid } from "@/components/CatalogGrid";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ürünler | Cutisafe",
  description: "Cutisafe Barrier, Cold, Remover, hasta altı bezi, lateks eldiven ve infüzyon seti.",
};

export default function Products() {
  return (
    <>
      <main data-tone="light" className="bg-paper px-5 pb-28 pt-[130px] md:px-10 md:pt-[160px]">
        <div className="mx-auto max-w-[1300px]">
          <h1 className="font-display text-[clamp(3rem,7vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Ürünler
          </h1>
          <p className="mt-5 max-w-[52ch] text-[1.2rem] text-navy/75">
            Hastane, eczane, bakım merkezi ve evde kullanım için üç sprey ve üç hasta bakım ürünü.
            Bir ürüne tıklayarak detayını okuyabilirsiniz.
          </p>
          <div className="mt-12">
            <CatalogGrid />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
