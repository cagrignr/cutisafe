"use client";

import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { Can, canHeight } from "./Can";

/**
 * Sahne, sayfadaki bölümlerin konumuna göre üç spreyi yönetir.
 * Anahtar kareler ekran oranıyla verilir: [x, y, kutu yüksekliği/ekran yüksekliği, dönüş].
 */
const IDS = [
  "hero",
  "family",
  "barrier-chapter",
  "barrier-mech",
  "cold-chapter",
  "cold-mech",
  "remover-chapter",
  "remover-mech",
  "sarf",
];
type K = [number, number, number, number];
const SLUGS = ["barrier", "cold", "remover"] as const;
type Slug = (typeof SLUGS)[number];

/** Kutu hero'da durur, kendi bölümünde sahneye gelir, sonra aşağı iner. Arada sağdan bekler. */
function track(hero: K, ch: K, chStage: number): K[] {
  return IDS.map((_, i) => {
    if (i === 0) return hero;
    if (i < chStage) return [1.45, 0.6, 0.6, hero[3]] as K;
    if (i === chStage) return ch;
    return [ch[0], 1.5, ch[2], 0] as K;
  });
}

const DESK: Record<Slug, K[]> = {
  barrier: track([0.55, 0.55, 0.6, -0.3], [0.74, 0.53, 0.78, 0], 2),
  cold: track([0.72, 0.52, 0.72, 0.22], [0.26, 0.53, 0.78, 0], 4),
  remover: track([0.89, 0.58, 0.58, -0.2], [0.74, 0.53, 0.78, 0], 6),
};
const MOB: Record<Slug, K[]> = {
  barrier: track([0.26, 0.78, 0.3, -0.3], [0.5, 0.3, 0.36, 0], 2),
  cold: track([0.5, 0.74, 0.34, 0.22], [0.5, 0.3, 0.36, 0], 4),
  remover: track([0.74, 0.78, 0.3, -0.2], [0.5, 0.3, 0.36, 0], 6),
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);
const TAU = Math.PI * 2;

function Rig() {
  const { camera, size } = useThree();
  const outer = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)];
  const inner = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)];
  const els = useRef<(HTMLElement | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0, sx: 0, sy: 0 });
  const t0 = useRef(performance.now());
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / innerHeight) * 2 - 1;
    };
    addEventListener("pointermove", m, { passive: true });
    return () => removeEventListener("pointermove", m);
  }, []);

  useFrame((state, dt) => {
    const y = scrollY;
    const vh = innerHeight;
    const mobile = innerWidth < 768;
    const cam = camera as THREE.PerspectiveCamera;
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z;
    const visW = visH * (size.width / size.height);

    const tops = IDS.map((id, i) => {
      let el = els.current[i];
      if (!el || !el.isConnected) el = els.current[i] = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + y : Infinity;
    });
    let s = 0;
    for (let i = 1; i < IDS.length; i++) {
      if (y >= tops[i] - vh) s = i - 1 + smooth(clamp((y - (tops[i] - vh)) / vh));
    }

    const chapterSpin = (slug: Slug) => {
      const el = els.current[IDS.indexOf(`${slug}-chapter`)];
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      const p = clamp(-r.top / Math.max(1, r.height - vh));
      return clamp((p - 0.05) / 0.9);
    };

    const ms = mouse.current;
    ms.sx += (ms.x - ms.sx) * Math.min(1, dt * 3);
    ms.sy += (ms.y - ms.sy) * Math.min(1, dt * 3);
    const elapsed = (performance.now() - t0.current) / 1000;
    const kf = mobile ? MOB : DESK;
    const heroW = 1 - clamp(s);

    SLUGS.forEach((slug, n) => {
      const arr = kf[slug];
      const i = Math.min(Math.floor(s), arr.length - 2);
      const f = s - i;
      const a = arr[i];
      const b = arr[i + 1];
      const v = a.map((x, k) => x + (b[k] - x) * f) as K;
      const intro = reduce.current ? 1 : smooth(clamp((elapsed - 0.15 * n) / 2.2));
      const o = outer[n].current;
      const inn = inner[n].current;
      if (!o || !inn) return;
      const H = canHeight(slug);
      const sc = ((v[2] * visH) / H) * (0.78 + 0.22 * intro);
      const bob = reduce.current ? 0 : Math.sin(state.clock.elapsedTime * 1.1 + n * 2) * 0.05;
      o.position.set((v[0] - 0.5) * visW, (0.5 - v[1]) * visH + bob, 0);
      o.scale.setScalar(sc);
      o.rotation.set(0.05 + ms.sy * 0.03, 0, 0);
      o.visible = v[1] < 1.3 && v[0] > -0.3 && v[0] < 1.3;
      const spin = -chapterSpin(slug) * TAU;
      inn.rotation.y =
        v[3] + spin + ms.sx * 0.35 + (1 - intro) * TAU * (n % 2 === 0 ? 1 : -1) + y * 0.0035 * heroW;
    });
  });

  return (
    <>
      {SLUGS.map((slug, n) => (
        <group key={slug} ref={outer[n]}>
          <group ref={inner[n]}>
            <Can slug={slug} />
          </group>
        </group>
      ))}
    </>
  );
}

export function Stage() {
  const [ok, setOk] = useState(false);
  useEffect(() => setOk(true), []);
  if (!ok) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-30" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 16], fov: 17 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.NoToneMapping }}
      >
        <ambientLight intensity={0.35} />
        <Suspense fallback={null}>
          <Environment resolution={256}>
            <color attach="background" args={["#c3cfdb"]} />
            <Lightformer form="rect" intensity={4} position={[-5, 1, 3]} scale={[2.2, 9, 1]} rotation-y={Math.PI / 2} />
            <Lightformer form="rect" intensity={3} position={[5.5, 0, 2]} scale={[1.6, 9, 1]} rotation-y={-Math.PI / 2} />
            <Lightformer form="rect" intensity={2.2} position={[0, 6, 1]} scale={[9, 2.5, 1]} rotation-x={Math.PI / 2} />
            <Lightformer form="rect" intensity={1.4} position={[0, 0, -6]} scale={[10, 10, 1]} />
          </Environment>
          <Rig />
        </Suspense>
      </Canvas>
    </div>
  );
}
