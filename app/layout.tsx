import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Cutisafe | Bakımın güvenli seviyesi",
  description:
    "Cutisafe Barrier, Cutisafe Cold, hasta altı bezi, infüzyon seti ve lateks eldiven. Hastane, eczane ve evde bakım için tıbbi sarf malzemeleri.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
