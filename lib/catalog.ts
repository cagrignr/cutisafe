import { asset } from "./base";
import type { ProductId } from "./products";
import { barrier, cold, remover } from "./sprays";

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  category: "Spreyler" | "Hasta bakımı";
  subtitle: string;
  short: string;
  lead: string;
  kind: "spray" | "photo";
  thumb: string;
  /** Spreyler için dört yüz, diğerleri için tek fotoğraf. */
  images: { src: string; w: number; h: number }[];
  tint: string;
  accent: string;
  chip: string;
  features: { title: string; text: string }[];
  stepsTitle?: string;
  steps?: string[];
  ordered?: boolean;
  uses: string[];
  specs: [string, string][];
  warning?: string;
};

const faces = (slug: string) => [0, 1, 2, 3].map((i) => ({ src: asset(`/img/${slug}-${i}.png`), w: 266, h: 822 }));

export const products: Product[] = [
  {
    id: "barrier",
    slug: "barrier",
    name: "Cutisafe Barrier",
    category: "Spreyler",
    subtitle: "Yara Bariyeri Sprey",
    short: "Hafif yaralanmaların üzerinde nefes alabilen koruyucu bir bariyer oluşturur.",
    lead: barrier.lead,
    kind: "spray",
    thumb: asset("/img/barrier-0.png"),
    images: faces("barrier"),
    tint: "#e6f3ec",
    accent: "#0e8f5a",
    chip: "bg-green/12",
    features: barrier.features,
    stepsTitle: "Nasıl kullanılır",
    steps: barrier.steps,
    ordered: true,
    uses: barrier.uses,
    specs: [
      ["Hacim", "150 ml"],
      ["Ambalaj", "Alüminyum, basınçlı kap"],
      ["Uygulama", "Sprey, temassız"],
      ["Üretim", "Türkiye"],
    ],
    warning: barrier.warning,
  },
  {
    id: "cold",
    slug: "cold",
    name: "Cutisafe Cold",
    category: "Spreyler",
    subtitle: "Soğutucu Sprey",
    short: "Uygulanan bölgeyi hızla soğutur. Spor, günlük yaşam ve acil durumlar için.",
    lead: cold.lead,
    kind: "spray",
    thumb: asset("/img/cold-0.png"),
    images: faces("cold"),
    tint: "#dcebf6",
    accent: "#2a8fd0",
    chip: "bg-ice/20",
    features: cold.features,
    stepsTitle: "Nasıl kullanılır",
    steps: cold.steps,
    ordered: true,
    uses: cold.uses,
    specs: [
      ["Hacim", "150 ml"],
      ["Ambalaj", "Alüminyum, basınçlı kap"],
      ["Uygulama", "Sprey, temassız"],
      ["Üretim", "Türkiye"],
    ],
    warning: cold.warning,
  },
  {
    id: "remover",
    slug: "remover",
    name: "Cutisafe Remover",
    category: "Spreyler",
    subtitle: "Plaster Sökücü Sprey",
    short: "Flaster ve tıbbi bant kalıntılarını nazikçe çözmeye yardımcı olur.",
    lead: remover.lead,
    kind: "spray",
    thumb: asset("/img/remover-0.png"),
    images: faces("remover"),
    tint: "#d9f1f0",
    accent: "#00a39d",
    chip: "bg-[#00b7b0]/15",
    features: remover.features,
    stepsTitle: "Nasıl kullanılır",
    steps: remover.steps,
    ordered: true,
    uses: remover.uses,
    specs: [
      ["Hacim", "150 ml"],
      ["Ambalaj", "Alüminyum, basınçlı kap"],
      ["Uygulama", "Sprey, temassız"],
      ["Üretim", "Türkiye"],
    ],
    warning: remover.warning,
  },
  {
    id: "bez",
    slug: "hasta-alti-bezi",
    name: "Cutisafe Hasta Altı Bezi",
    category: "Hasta bakımı",
    subtitle: "Emici koruyucu yatak örtüsü",
    short: "Daha temiz, daha kuru ve daha konforlu bir dinlenme için. 60 × 90 cm, 30 adet.",
    lead: "Daha temiz, daha kuru ve daha konforlu bir dinlenme için güvenilir koruma. Evde, hastanelerde ve bakım merkezlerinde kullanıma uygundur.",
    kind: "photo",
    thumb: asset("/img/bez.jpg"),
    images: [{ src: asset("/img/bez.jpg"), w: 1447, h: 1087 }],
    tint: "#fefefe",
    accent: "#1e6fb0",
    chip: "bg-navy/8",
    features: [
      { title: "Yüksek emicilik", text: "Nemi hızla hapseder." },
      { title: "Yumuşak ve konforlu", text: "Cilt dostu yüzey." },
      { title: "Sızdırmaz bariyer", text: "Yüzeyleri kuru ve korunaklı tutar." },
      { title: "Günlük kullanım için ideal", text: "Evde, hastanelerde ve bakım merkezlerinde kullanıma uygundur." },
    ],
    uses: ["Yatak koruma", "Sandalye koruma", "Hasta bakımı", "Evde bakım"],
    specs: [
      ["Boyut", "60 × 90 cm (23,6″ × 35,4″)"],
      ["Pakette", "30 adet"],
      ["Paket", "Ekonomik"],
    ],
  },
  {
    id: "eldiven",
    slug: "latex-eldiven",
    name: "Cutisafe Pudralı Lateks Eldiven",
    category: "Hasta bakımı",
    subtitle: "Latex Examination Gloves, Powdered",
    short: "Muayeneden laboratuvara her işte yumuşak ve esnek. 100 adet, S–XL.",
    lead: "Pudralı lateks muayene eldiveni. Yumuşak, konforlu ve yüksek esnekliğe sahip. Muayene, hastane, laboratuvar, diş ve genel kullanım için.",
    kind: "photo",
    thumb: asset("/img/eldiven.jpg"),
    images: [{ src: asset("/img/eldiven.jpg"), w: 1536, h: 1024 }],
    tint: "#fefefe",
    accent: "#1e6fb0",
    chip: "bg-navy/8",
    features: [
      { title: "Yumuşak ve konforlu", text: "Soft and comfortable" },
      { title: "Yüksek esneklik", text: "High elasticity" },
      { title: "Pudralı", text: "Powdered" },
      { title: "Tek kullanımlık", text: "Single use only" },
    ],
    uses: ["Muayene", "Hastane", "Laboratuvar", "Diş", "Genel kullanım"],
    specs: [
      ["Kutuda", "100 adet"],
      ["Bedenler", "S, M, L, XL"],
      ["Kalite", "AQL 1.5"],
      ["Yapı", "Pudralı lateks"],
      ["Kullanım", "Tek kullanımlık"],
    ],
  },
  {
    id: "set",
    slug: "infuzyon-seti",
    name: "Cutisafe İnfüzyon Seti",
    category: "Hasta bakımı",
    subtitle: "Infusion Set",
    short: "Şişe ve biofleks torba ile kullanılan steril, tek kullanımlık set.",
    lead: "Şişe ve biofleks torba ile kullanım içindir. Güvenli ve kontrollü akış sağlar, steril ve tek kullanımlıktır.",
    kind: "photo",
    thumb: asset("/img/infuzyon.jpg"),
    images: [{ src: asset("/img/infuzyon.jpg"), w: 1600, h: 800 }],
    tint: "#fefefe",
    accent: "#1e6fb0",
    chip: "bg-navy/8",
    features: [
      { title: "Güvenli ve kontrollü akış", text: "Safe and controlled flow" },
      { title: "Steril ve tek kullanımlık", text: "Sterile and single use" },
      { title: "Şişe ve torba ile uyumlu", text: "Compatible with bottle and biofleks bag" },
      { title: "Kullanımı kolay", text: "Easy to use" },
    ],
    stepsTitle: "Kullanım talimatı",
    steps: [
      "Sadece yerçekimi ile çalışır.",
      "Aseptik koşullarda uygulanmalıdır.",
      "Serin ve kuru yerde saklayınız.",
      "Ambalajı hasar görmüş ürünleri kullanmayınız.",
      "24 saatten uzun süreli kullanılmamalıdır.",
      "Kullanılmış ürünler tıbbi atık statüsünde değerlendirilmelidir.",
      "Solüsyon akış yolu steril ve apirojendir.",
    ],
    ordered: false,
    uses: ["Şişe ile kullanım", "Biofleks torba ile kullanım"],
    specs: [
      ["Sterilizasyon", "EO, apirojen"],
      ["Damla faktörü", "20 damla / ml"],
      ["Belge", "CE 0197"],
      ["Akış", "Yerçekimi ile"],
      ["Değişim", "24 saatte bir"],
      ["Üretici", "Shandong Yiguang Medical Instruments Co., Ltd., Çin"],
      ["İthalatçı", "Berha İthalat İhracat A.Ş."],
    ],
  },
];

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
