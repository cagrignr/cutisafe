import type { ProductId } from "./products";

export type Spray = {
  id: ProductId;
  slug: "barrier" | "cold" | "remover";
  title: string;
  name: string;
  english: string;
  lead: string;
  features: { title: string; text: string }[];
  steps: string[];
  uses: string[];
  warning: string;
};

export const barrier: Spray = {
  id: "barrier",
  slug: "barrier",
  title: "Barrier",
  name: "Yara Bariyeri Sprey",
  english: "Protective Barrier Spray, 150 ml",
  lead: "Hafif yaralanmaların üzerinde koruyucu bir bariyer oluşturarak cildin doğal iyileşme sürecini destekler.",
  features: [
    {
      title: "Koruyucu bariyer",
      text: "Yara üzerinde nefes alabilen koruyucu bir tabaka oluşturur.",
    },
    {
      title: "Yarayı korumaya yardımcı olur",
      text: "Kir, kontaminasyon ve dış etkenlere karşı korumaya yardımcı olur.",
    },
    {
      title: "Kolay sprey uygulaması",
      text: "Hijyenik, temassız uygulama. Küçük yaralardan korunmanıza yardımcı olur.",
    },
  ],
  steps: [
    "Gerekli bölgeyi temizleyin ve kurulayın.",
    "Spreyi bölgeden 10–15 cm uzaklıkta tutun.",
    "Koruyucu tabaka kuruyana kadar birkaç saniye bekleyin.",
    "Gerektiğinde tekrarlayın.",
  ],
  uses: ["Hafif kesikler", "Sıyrıklar", "Aşınmalar", "Günlük ilk yardım", "Spor yaralanmaları"],
  warning:
    "Sadece harici kullanım içindir. Açık yara veya ciddi yaralar üzerinde kullanmayın. Gözlerle temasından kaçının. Çocukların erişemeyeceği yerde saklayın. Basınçlı kap: 50°C üzerindeki sıcaklıklardan koruyun, açık alev ve diğer tutuşma kaynaklarından uzak tutun.",
};

export const cold: Spray = {
  id: "cold",
  slug: "cold",
  title: "Cold",
  name: "Soğutucu Sprey",
  english: "Hızlı ve etkili soğutma, 150 ml",
  lead: "Hızlı soğutma etkisi sağlayan bir spreydir. Spor, günlük yaşam ve acil durumlarda kullanıma uygundur.",
  features: [
    { title: "Hızlı soğutma etkisi", text: "Uygulanan bölgeyi hızla soğutur." },
    { title: "Ağrı hissini azaltmaya yardımcı olur", text: "Rahatlama sağlar." },
    { title: "Kolay sprey uygulaması", text: "Hijyenik, temassız uygulama." },
  ],
  steps: [
    "Uygulanacak bölgeyi temizleyin.",
    "Spreyi bölgeden 10–15 cm uzaklıktan uygulayın.",
    "Birkaç saniye kurumasını bekleyin.",
    "İhtiyaç halinde tekrarlayın.",
  ],
  uses: ["Burkulmalar", "Morluklar", "Küçük spor yaralanmaları", "Günlük hafif yaralanmalar"],
  warning:
    "Sadece harici kullanım içindir. Açık yara veya tahriş olmuş cilt üzerinde kullanmayın. Gözlerle temasından kaçının. Çocukların erişemeyeceği yerde saklayın. Basınçlı kap: direkt güneş ışığından ve 50°C üzerindeki sıcaklıklardan koruyun.",
};

export const remover: Spray = {
  id: "remover",
  slug: "remover",
  title: "Remover",
  name: "Plaster Sökücü Sprey",
  english: "Ciltteki yapışkan kalıntılarını kolayca çözer, 150 ml",
  lead: "Ciltteki yapışkan kalıntılarını nazikçe çözmeye yardımcı olan pratik bir spreydir. Flaster, tıbbi bant ve diğer yapışkan kalıntıların daha kolay ve konforlu şekilde çıkarılmasını sağlar.",
  features: [
    {
      title: "Nazik çıkarma",
      text: "Cildi tahriş etmeden kolay ve konforlu çıkarma sağlar.",
    },
    {
      title: "Yapışkanı çözer",
      text: "Yapışkan kalıntılarının daha kolay uzaklaştırılmasına yardımcı olur.",
    },
    { title: "Kolay sprey uygulaması", text: "Hijyenik, temassız uygulama." },
  ],
  steps: [
    "Gerekli bölgeyi temizleyin ve kurulayın.",
    "Spreyi flaster kenarına veya yapışkan bölgeye 10–15 cm mesafeden uygulayın.",
    "Birkaç saniye bekleyin.",
    "Flasteri nazikçe kaldırın ve çıkarın.",
    "Gerekirse tekrarlayın.",
  ],
  uses: ["Flasterler", "Tıbbi bantlar", "Yapışkan kalıntılar", "Hassas cilt kullanımı", "Günlük kullanım"],
  warning:
    "Sadece harici kullanım içindir. Açık yara veya tahriş olmuş cilt üzerinde kullanmayın. Gözlerle temasından kaçının. Çocukların erişemeyeceği yerde saklayın. Basınçlı kap: direkt güneş ışığından ve 50°C üzerindeki sıcaklıklardan koruyun.",
};
