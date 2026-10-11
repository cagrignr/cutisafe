"use client";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { asset } from "@/lib/base";

/** Kutu yüksekliği / çap oranı, ambalaj görsellerinden ölçüldü. */
const RATIO = { barrier: 3.595, cold: 3.665, remover: 3.604 } as const;
export const CAN_R = 0.5;
export const canHeight = (slug: keyof typeof RATIO) => CAN_R * 2 * RATIO[slug];

export function Can({ slug }: { slug: keyof typeof RATIO }) {
  const [body, top] = useTexture([asset(`/tex/${slug}.jpg`), asset(`/tex/top-${slug}.jpg`)]);
  body.colorSpace = THREE.SRGBColorSpace;
  body.wrapS = THREE.RepeatWrapping;
  body.anisotropy = 16;
  top.colorSpace = THREE.SRGBColorSpace;
  top.anisotropy = 8;
  const H = canHeight(slug);

  return (
    <group>
      <mesh>
        <cylinderGeometry args={[CAN_R, CAN_R, H, 128, 1, true]} />
        <meshPhysicalMaterial
          map={body}
          color="#b8b8b8"
          emissive="#ffffff"
          emissiveMap={body}
          emissiveIntensity={0.55}
          roughness={0.4}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.14}
          envMapIntensity={1.15}
        />
      </mesh>
      <mesh position={[0, H / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CAN_R * 0.985, 64]} />
        <meshStandardMaterial
          map={top}
          emissive="#ffffff"
          emissiveMap={top}
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, H / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[CAN_R * 0.99, 0.014, 16, 128]} />
        <meshStandardMaterial color="#e3e7ee" metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[0, -H / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[CAN_R * 0.985, 48]} />
        <meshStandardMaterial color="#aeb4be" metalness={0.9} roughness={0.35} />
      </mesh>
    </group>
  );
}
