"use client";

import { useEffect, useRef, useState } from "react";
import { WaveEdge } from "./WaveEdge";
import { asset } from "@/lib/base";
import type { Spray } from "@/lib/sprays";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const rnd = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
/** Bölümlerin kaydırma aralıkları: temizle, sık, bekle, tekrarla. */
const THRESH = { barrier: [0, 0.22, 0.5, 0.76], cold: [0, 0.22, 0.5, 0.76], remover: [0, 0.14, 0.36, 0.52, 0.86] };
const stepOf = (p: number, kind: keyof typeof THRESH) => THRESH[kind].reduce((a, t, i) => (p >= t ? i : a), 0);

type Pt = { x: number; y: number };

function drawCan(ctx: CanvasRenderingContext2D, img: HTMLImageElement, cx: number, cy: number, hc: number, a: number): Pt {
  if (img.complete && img.naturalWidth) {
    const wc = (hc * img.naturalWidth) / img.naturalHeight;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.25)";
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 14;
    ctx.translate(cx, cy);
    ctx.rotate(a);
    ctx.drawImage(img, -wc / 2, -hc / 2, wc, hc);
    ctx.restore();
  }
  return { x: cx + (hc / 2) * Math.sin(a), y: cy - (hc / 2) * Math.cos(a) };
}

function mist(
  ctx: CanvasRenderingContext2D,
  from: Pt,
  to: Pt,
  time: number,
  amt: number,
  rgb: string,
  spread = 80,
) {
  const N = 110;
  for (let i = 0; i < N; i++) {
    if (i / N > amt) continue;
    const k = (time * 0.85 + i / N + rnd(i, 3)) % 1;
    const x = lerp(from.x, to.x, k) + (rnd(i, 1) - 0.5) * k * spread;
    const y = lerp(from.y, to.y, k) + (rnd(i, 2) - 0.5) * k * spread;
    ctx.fillStyle = `rgba(${rgb},${(1 - k) * 0.5 * Math.min(1, amt * 2)})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.6 + k * 8, 0, Math.PI * 2);
    ctx.fill();
  }
}

function label(ctx: CanvasRenderingContext2D, font: string, text: string, x: number, y: number, tx: number, ty: number, color: string, alpha: number) {
  if (alpha <= 0.01) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(tx, ty);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(x, y, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = font;
  ctx.textAlign = tx < x ? "right" : "left";
  ctx.fillText(text, tx + (tx < x ? -8 : 8), ty + 5);
  ctx.restore();
}

/* ---------- Barrier: yara yüzeyi kesiti ---------- */
function barrierScene(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, time: number, img: HTMLImageElement, font: string) {
  const base = h * 0.6;
  const cx = w * 0.46;
  const ww = w * 0.11;
  const depth = h * 0.13;
  const surf = (x: number) =>
    base + Math.sin(x * 0.018) * 3 + (Math.abs(x - cx) < ww ? depth * (1 - ((x - cx) / ww) ** 2) : 0);

  // deri
  const g = ctx.createLinearGradient(0, base, 0, h);
  g.addColorStop(0, "#f2c6aa");
  g.addColorStop(0.35, "#e7a98c");
  g.addColorStop(1, "#c98068");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(0, h);
  for (let x = 0; x <= w; x += 4) ctx.lineTo(x, surf(x));
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#c0392b";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let x = cx - ww; x <= cx + ww; x += 3) (x === cx - ww ? ctx.moveTo : ctx.lineTo).call(ctx, x, surf(x));
  ctx.stroke();

  // 1. temizlik: bez siler, kirler gider
  const wipeX = lerp(w * 0.04, w * 1.0, clamp(p / 0.2));
  for (let i = 0; i < 26; i++) {
    const x = w * (0.05 + 0.9 * rnd(i, 5));
    if (Math.abs(x - cx) < ww + 6 || p >= 0.2 || x < wipeX) continue;
    ctx.fillStyle = "rgba(92,72,58,.85)";
    ctx.beginPath();
    ctx.arc(x, surf(x) - 2, 2 + rnd(i, 6) * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  if (p < 0.24) {
    const a = p < 0.2 ? 1 : 1 - (p - 0.2) / 0.04;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,.2)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(wipeX - 48, surf(wipeX) - 34, 96, 34, 8);
    ctx.fill();
    ctx.restore();
  }

  // 2. sprey
  const tIn = ease(clamp((p - 0.16) / 0.08));
  const tOut = ease(clamp((p - 0.52) / 0.08));
  const off = (1 - tIn + tOut) * w * 0.35;
  const hc = h * 0.4;
  const nozzle = drawCan(ctx, img, w * 0.8 + off, h * 0.3, hc, -0.28);
  const aim = { x: cx, y: surf(cx) - 4 };
  const amt = clamp((p - 0.24) / 0.04) * clamp((0.5 - p) / 0.04);
  if (amt > 0) mist(ctx, nozzle, aim, time, amt, "196,238,218", 70);

  // 3. koruyucu film oluşur
  const gF = ease(clamp((p - 0.42) / 0.2));
  const film = gF > 0;
  if (film) {
    const half = gF * w * 0.3;
    ctx.beginPath();
    for (let x = cx - half; x <= cx + half; x += 3) {
      const inside = Math.abs(x - cx) < ww;
      const y = (inside ? base - 3 + Math.sin(time * 1.4) * 0.8 : surf(x)) - 3;
      (x === cx - half ? ctx.moveTo : ctx.lineTo).call(ctx, x, y);
    }
    ctx.lineCap = "round";
    ctx.lineWidth = 12 * gF;
    ctx.strokeStyle = `rgba(60,200,160,${0.7 + 0.25 * clamp((p - 0.6) / 0.1)})`;
    ctx.stroke();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,.85)";
    ctx.stroke();
  }
  const filmY = base - 6;

  // 4. kir geri sıçrar, hava geçer
  const prot = clamp((p - 0.7) / 0.08);
  if (prot > 0) {
    for (let i = 0; i < 24; i++) {
      const x0 = w * (0.12 + 0.76 * rnd(i, 11));
      if (Math.abs(x0 - cx) > w * 0.27) continue;
      const u = (time * (0.16 + 0.2 * rnd(i, 12)) + rnd(i, 13)) % 1;
      let x = x0;
      let y: number;
      if (u < 0.68) y = (u / 0.68) * filmY;
      else {
        const k = (u - 0.68) / 0.32;
        y = filmY - Math.sin(k * Math.PI) * 30;
        x += (rnd(i, 14) - 0.5) * 2 * k * 46;
      }
      ctx.fillStyle = `rgba(92,72,58,${prot * (u > 0.9 ? (1 - u) * 10 : 0.9)})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.5 + rnd(i, 15) * 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 16; i++) {
      const x = cx - w * 0.22 + (i / 15) * w * 0.44;
      const y = filmY + Math.sin(time * 2 + i * 1.7) * 26 - 4;
      ctx.fillStyle = `rgba(77,182,235,${prot * 0.9})`;
      ctx.beginPath();
      ctx.arc(x, y, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    label(ctx, font, "Kir ve dış etkenler", cx - w * 0.2, filmY - 46, cx - w * 0.2 - 18, filmY - 90, "#0e3a5b", prot);
    label(ctx, font, "Nefes alabilen tabaka", cx + w * 0.17, filmY, cx + w * 0.17 + 24, filmY + 64, "#0e8f5a", prot);
  }
}

/* ---------- Cold: bacağa uygulama ---------- */
function legPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.beginPath();
  ctx.moveTo(w * 0.6, -h * 0.05);
  ctx.bezierCurveTo(w * 0.58, h * 0.2, w * 0.56, h * 0.36, w * 0.535, h * 0.46);
  ctx.bezierCurveTo(w * 0.52, h * 0.55, w * 0.57, h * 0.65, w * 0.59, h * 0.85);
  ctx.lineTo(w * 0.6, h * 1.05);
  ctx.lineTo(w * 0.76, h * 1.05);
  ctx.bezierCurveTo(w * 0.8, h * 0.85, w * 0.88, h * 0.74, w * 0.85, h * 0.62);
  ctx.bezierCurveTo(w * 0.82, h * 0.5, w * 0.86, h * 0.36, w * 0.88, h * 0.3);
  ctx.bezierCurveTo(w * 0.89, h * 0.15, w * 0.88, h * 0.05, w * 0.86, -h * 0.05);
  ctx.closePath();
}

function star(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI) / 3;
    ctx.moveTo(x - Math.cos(a) * r, y - Math.sin(a) * r);
    ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
  }
  ctx.stroke();
}

function coldScene(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, time: number, img: HTMLImageElement, font: string) {
  const knee = { x: w * 0.55, y: h * 0.47 };
  const R = w * 0.24;
  const c = ease(clamp((p - 0.46) / 0.28)); // 0 sıcak, 1 soğuk

  // bacak
  const sk = ctx.createLinearGradient(w * 0.52, 0, w * 0.9, 0);
  sk.addColorStop(0, "#f1c4a6");
  sk.addColorStop(1, "#d99c80");
  legPath(ctx, w, h);
  ctx.fillStyle = sk;
  ctx.fill();

  // ısı veya soğuk alanı, bacağın içinde
  ctx.save();
  legPath(ctx, w, h);
  ctx.clip();
  const r = lerp(255, 120, c), gg = lerp(96, 205, c), b = lerp(60, 255, c);
  const gl = ctx.createRadialGradient(knee.x, knee.y, 4, knee.x, knee.y, R * lerp(1.05, 1.25, c));
  gl.addColorStop(0, `rgba(${r},${gg},${b},${lerp(0.85, 0.75, c)})`);
  gl.addColorStop(1, `rgba(${r},${gg},${b},0)`);
  ctx.fillStyle = gl;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();

  // ağrı halkaları, soğudukça söner
  for (let i = 0; i < 3; i++) {
    const k = (time * 0.45 + i / 3) % 1;
    ctx.strokeStyle = `rgba(255,96,60,${(1 - k) * 0.5 * (1 - c)})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(knee.x, knee.y, 10 + k * R * 0.9, 0, Math.PI * 2);
    ctx.stroke();
  }

  // 1. temizlik
  if (p < 0.24) {
    const wp = clamp(p / 0.2);
    const a = p < 0.2 ? 1 : 1 - (p - 0.2) / 0.04;
    const yy = lerp(h * 0.3, h * 0.62, wp);
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,.25)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(w * 0.5, yy - 16 + Math.sin(time * 9) * 5, w * 0.24, 32, 10);
    ctx.fill();
    ctx.restore();
  }

  // 2. sprey: kutu soldan, dizin hizasına
  const hc = h * 0.5;
  const tIn = ease(clamp((p - 0.16) / 0.08));
  const tOut = ease(clamp((p - 0.52) / 0.08));
  const tIn2 = ease(clamp((p - 0.76) / 0.06));
  const tOut2 = ease(clamp((p - 0.9) / 0.06));
  const slide = 1 - Math.max(tIn - tOut, tIn2 - tOut2);
  const nozzle = drawCan(ctx, img, w * 0.2 - slide * w * 0.4, h * 0.36, hc, 1.2);
  const aim = { x: knee.x - w * 0.015, y: knee.y };
  const amt = Math.max(clamp((p - 0.24) / 0.04) * clamp((0.5 - p) / 0.04), 0.7 * clamp((p - 0.8) / 0.03) * clamp((0.9 - p) / 0.03));
  if (amt > 0) mist(ctx, nozzle, aim, time, amt, "190,230,255", 60);

  // 3. buğu ve don kristalleri
  ctx.save();
  for (let i = 0; i < 18; i++) {
    const k = (time * 0.18 + rnd(i, 21)) % 1;
    const x = knee.x - w * 0.05 + (rnd(i, 22) - 0.5) * R * 1.6 - k * 24;
    const y = knee.y + (rnd(i, 23) - 0.5) * R * 1.4 - k * 40;
    ctx.fillStyle = `rgba(200,236,255,${Math.sin(k * Math.PI) * 0.35 * clamp(c * 1.5 + (amt > 0 ? 0.6 : 0))})`;
    ctx.beginPath();
    ctx.arc(x, y, 6 + rnd(i, 24) * 14, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
  ctx.save();
  legPath(ctx, w, h);
  ctx.clip();
  ctx.lineWidth = 1.6;
  for (let i = 0; i < 14; i++) {
    const a = rnd(i, 31) * Math.PI * 2;
    const d = Math.sqrt(rnd(i, 32)) * R * 0.85;
    const tw = 0.5 + 0.5 * Math.sin(time * 2.2 + i * 2);
    ctx.strokeStyle = `rgba(255,255,255,${c * (0.4 + 0.6 * tw)})`;
    star(ctx, knee.x + Math.cos(a) * d, knee.y + Math.sin(a) * d, 8 + rnd(i, 33) * 12);
  }
  ctx.restore();

  label(ctx, font, "Uygulanan bölge", knee.x - R * 0.2, knee.y - R * 0.75, knee.x - R * 0.2 - 10, knee.y - R * 1.15, "#4db6eb", clamp((p - 0.24) / 0.05));
  label(ctx, font, "Soğutma etkisi", knee.x + R * 0.7, knee.y + R * 0.2, knee.x + R * 1.25, knee.y + R * 0.2, "#c8ccd4", clamp((p - 0.62) / 0.06));
}


/* ---------- Remover: flaster sökme ---------- */
function removerScene(ctx: CanvasRenderingContext2D, w: number, h: number, p: number, time: number, img: HTMLImageElement, font: string) {
  const limbTop = h * 0.3;
  const limbBot = h * 0.84;
  const x0 = w * 0.2;
  const W = w * 0.6;
  const py = limbTop + (limbBot - limbTop) * 0.24;
  const ph = h * 0.22;
  const g = ease(clamp((p - 0.52) / 0.32)); // sökülme

  // kol
  const sk = ctx.createLinearGradient(0, limbTop, 0, limbBot);
  sk.addColorStop(0, "#f3cbb1");
  sk.addColorStop(0.55, "#e9b496");
  sk.addColorStop(1, "#cf8f74");
  ctx.fillStyle = sk;
  ctx.beginPath();
  ctx.roundRect(-w * 0.05, limbTop, w * 1.1, limbBot - limbTop, 70);
  ctx.fill();

  // flasterin altındaki soluk iz
  ctx.fillStyle = "rgba(255,238,228,.45)";
  ctx.beginPath();
  ctx.roundRect(x0, py, W, ph, 6);
  ctx.fill();

  // 1. temizlik
  if (p < 0.16) {
    const a = p < 0.13 ? 1 : 1 - (p - 0.13) / 0.03;
    const xx = lerp(w * 0.08, w * 0.72, clamp(p / 0.13));
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = "#fff";
    ctx.shadowColor = "rgba(0,0,0,.2)";
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(xx, py - ph * 0.9 + Math.sin(time * 9) * 4, w * 0.2, 30, 10);
    ctx.fill();
    ctx.restore();
  }

  // yapışkan kalıntı: flaster kalkınca görünür, tekrar püskürtmeyle temizlenir
  const clean = ease(clamp((p - 0.9) / 0.08));
  const resA = clamp((g - 0.1) * 2) * (1 - clean);
  if (resA > 0.01) {
    for (let i = 0; i < 34; i++) {
      const x = x0 + W * (0.04 + 0.92 * rnd(i, 41));
      const y = py + ph * (0.08 + 0.84 * rnd(i, 42));
      ctx.fillStyle = `rgba(176,128,86,${0.75 * resA})`;
      ctx.beginPath();
      ctx.arc(x, y, 1.6 + rnd(i, 43) * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // flaster: bağlı kısım + kalkan kanat
  const hinge = x0 + g * W;
  const fade = 1 - ease(clamp((g - 0.96) / 0.04));
  const lift = ease(clamp((g - 0.9) / 0.1));
  ctx.save();
  ctx.globalAlpha = fade;
  ctx.translate(lift * w * 0.12, -lift * h * 0.18);
  if (hinge < x0 + W - 1) {
    const ag = ctx.createLinearGradient(0, py, 0, py + ph);
    ag.addColorStop(0, "#efc9a4");
    ag.addColorStop(1, "#dca983");
    ctx.fillStyle = ag;
    ctx.shadowColor = "rgba(0,0,0,.18)";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.roundRect(hinge, py, x0 + W - hinge, ph, 6);
    ctx.fill();
    ctx.shadowBlur = 0;
    // emici ped
    const padL = Math.max(hinge, x0 + W * 0.34);
    const padR = x0 + W * 0.66;
    if (padR > padL) {
      ctx.fillStyle = "#f8f4ee";
      ctx.fillRect(padL, py + ph * 0.1, padR - padL, ph * 0.8);
      ctx.fillStyle = "rgba(0,0,0,.08)";
      for (let i = 0; i < 28; i++) ctx.fillRect(padL + ((i * 17) % Math.max(8, padR - padL)), py + ph * 0.15 + ((i * 11) % (ph * 0.7)), 2, 2);
    }
    ctx.fillStyle = "rgba(255,255,255,.35)";
    for (let i = 0; i < 40; i++) {
      const x = hinge + ((i * 23) % Math.max(4, x0 + W - hinge));
      ctx.beginPath();
      ctx.arc(x, py + 5 + ((i * 7) % (ph - 10)), 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // sprey ıslaklığı, kenardan içeri ilerler
  const wet = ease(clamp((p - 0.3) / 0.22));
  if (wet > 0 && g < 0.95) {
    const wl = Math.min(W * 0.4 * wet, x0 + W - hinge);
    const wg = ctx.createLinearGradient(hinge, 0, hinge + wl, 0);
    wg.addColorStop(0, "rgba(0,183,176,.55)");
    wg.addColorStop(1, "rgba(0,183,176,0)");
    ctx.fillStyle = wg;
    ctx.fillRect(hinge, py, wl, ph);
  }
  // kalkan kanat, sol uçtan menteşeye
  if (g > 0.005) {
    const L = g * W;
    const th = lerp(0.1, 1.15, ease(g));
    const ex = hinge - Math.cos(th) * L;
    const ey = Math.sin(th) * L * 0.62;
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,.25)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 8;
    const fg = ctx.createLinearGradient(ex, py - ey, hinge, py);
    fg.addColorStop(0, "#fbfaf6");
    fg.addColorStop(1, "#ecd9c4");
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.moveTo(hinge, py);
    ctx.lineTo(ex, py - ey);
    ctx.lineTo(ex + Math.sin(th) * 6, py + ph - ey);
    ctx.lineTo(hinge, py + ph);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // alt yüzeydeki yapışkan parıltısı
    ctx.strokeStyle = "rgba(0,183,176,.65)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(hinge, py + 2);
    ctx.lineTo(hinge, py + ph - 2);
    ctx.stroke();
  }
  ctx.restore();

  // 2 ve 5. sprey
  const win = (a: number, b: number) => ease(clamp((p - a) / 0.05)) * (1 - ease(clamp((p - b) / 0.05)));
  const cIn = Math.max(win(0.1, 0.36), win(0.84, 0.98));
  const hc = h * 0.4;
  const nozzle = drawCan(ctx, img, w * 0.84 + (1 - cIn) * w * 0.35, h * 0.3, hc, -0.3);
  const first = p < 0.6;
  const aim = first ? { x: x0 + 6, y: py + ph / 2 } : { x: x0 + W * 0.5, y: py + ph / 2 };
  const amt = Math.max(clamp((p - 0.18) / 0.04) * clamp((0.36 - p) / 0.04), 0.6 * clamp((p - 0.88) / 0.03) * clamp((0.96 - p) / 0.03));
  if (amt > 0) mist(ctx, nozzle, aim, time, amt, "130,228,222", 55);

  label(ctx, font, "Yapışkan çözülür", x0 + W * 0.12, py + ph * 0.5, x0 + W * 0.32, py - ph * 0.8, "#007d78", clamp((p - 0.4) / 0.06) * (1 - clamp((p - 0.78) / 0.05)));
  label(ctx, font, "Nazik çıkarma", x0 + W * 0.5, py + ph * 0.6, x0 + W * 0.5 + w * 0.06, py + ph * 1.9, "#0e3a5b", clamp((p - 0.9) / 0.05));
}

export function Mechanism({
  spray,
  tone,
  edge,
}: {
  spray: Spray;
  tone: "light" | "dark";
  edge: string;
}) {
  const sec = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [step, setStep] = useState(0);
  const kind = spray.slug;
  const dark = tone === "dark";

  useEffect(() => {
    const canvas = cv.current!;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = asset(`/img/${kind}-0.png`);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font = `600 15px ${getComputedStyle(document.body).fontFamily}`;
    let w = 0,
      h = 0,
      raf = 0,
      last = -1;
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const el = sec.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = clamp(-r.top / Math.max(1, r.height - innerHeight));
      const s = stepOf(p, kind);
      if (s !== last) {
        last = s;
        setStep(s);
      }
      ctx.clearRect(0, 0, w, h);
      const t = reduce ? 0 : now / 1000;
      ({ barrier: barrierScene, cold: coldScene, remover: removerScene })[kind](ctx, w, h, p, t, img, font);
    };
    resize();
    addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, [kind]);

  return (
    <section
      ref={sec}
      id={`${kind}-mech`}
      data-tone={tone}
      className={`relative h-[420vh] ${dark ? "bg-[#0a2740] text-white" : "bg-paper text-navy"}`}
    >
      <WaveEdge color={edge} />
      <div className="sticky top-0 grid h-screen grid-rows-[46vh_1fr] gap-6 px-5 pb-6 pt-[84px] md:grid-cols-[1fr_1.1fr] md:grid-rows-1 md:items-center md:gap-14 md:px-10 md:pb-10 md:pt-[96px]">
        <div className="order-2 md:order-1 md:pl-[2vw]">
          <h2 className="font-display text-[clamp(2.2rem,5.4vw,5.2rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            Nasıl kullanılır
          </h2>
          <ol className="mt-6 space-y-3 md:mt-10 md:space-y-5">
            {spray.steps.map((s, i) => (
              <li
                key={s}
                className="flex items-start gap-4 transition-opacity duration-500"
                style={{ opacity: i === step ? 1 : 0.32 }}
              >
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[1rem] font-bold transition-colors duration-500 md:size-11 md:text-[1.15rem] ${
                    i === step
                      ? kind === "barrier"
                        ? "bg-green text-white"
                        : kind === "cold"
                          ? "bg-ice text-deep"
                          : "bg-[#00b7b0] text-deep"
                      : dark
                        ? "bg-white/15"
                        : "bg-navy/12"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="pt-1 text-[1.05rem] leading-snug md:pt-1.5 md:text-[1.4rem]">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <div
          className={`relative order-1 h-full overflow-hidden rounded-[2rem] md:order-2 md:max-h-[80vh] ${
            dark
              ? "bg-[radial-gradient(120%_90%_at_30%_20%,#143e63,#071f33)]"
              : kind === "remover"
                ? "bg-[radial-gradient(120%_90%_at_30%_20%,#ffffff,#d2efee)]"
                : "bg-[radial-gradient(120%_90%_at_30%_20%,#ffffff,#dcefe6)]"
          }`}
        >
          <canvas ref={cv} className="absolute inset-0 h-full w-full" aria-hidden />
          <p className={`absolute bottom-3 left-5 text-[0.8rem] ${dark ? "text-white/55" : "text-navy/55"}`}>
            Şematik gösterim
          </p>
        </div>
      </div>
    </section>
  );
}
