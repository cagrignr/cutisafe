export type ProductId = "barrier" | "cold" | "remover" | "bez" | "eldiven" | "set";

export const productNames: Record<ProductId, string> = {
  barrier: "Barrier Yara Bariyeri Sprey",
  cold: "Cold Soğutucu Sprey",
  remover: "Remover Plaster Sökücü Sprey",
  bez: "Hasta Altı Bezi",
  eldiven: "Pudralı Lateks Eldiven",
  set: "İnfüzyon Seti",
};

export const whatsapp = "905315204453";

export const faces = ["Ön yüz", "Sol yan", "Arka yüz", "Sağ yan"] as const;
