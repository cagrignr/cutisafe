import type { Metadata } from "next";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sipariş | Cutisafe",
  description: "Cutisafe ürünleri için toptan ve kurumsal sipariş formu.",
};

export default function Order() {
  return (
    <>
      <main data-tone="light" className="bg-paper px-5 pb-28 pt-[130px] md:px-10 md:pt-[160px]">
        <div className="mx-auto max-w-[1300px]">
          <h1 className="font-display text-[clamp(3rem,7vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            Sipariş
          </h1>
          <p className="mt-5 max-w-[56ch] text-[1.2rem] text-navy/75">
            Hastane, eczane, bakım merkezi ve bayiler için. Ürünleri ve adetleri seçin, bilgilerinizi
            yazın, siparişiniz hazır mesaj olarak gönderilsin.
          </p>
          <div className="mt-14">
            <OrderForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
