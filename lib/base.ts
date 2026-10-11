/** GitHub Pages proje sitesi alt klasörde yayınlanır (/repo-adi). Yerelde boştur. */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (path: string) => `${BASE}${path}`;
