import { Stage } from "@/components/three/Stage";
import { Hero } from "@/components/Hero";
import { Family } from "@/components/Family";
import { Chapter } from "@/components/Chapter";
import { Mechanism } from "@/components/Mechanism";
import { SprayInfo } from "@/components/SprayInfo";
import { Supplies } from "@/components/Supplies";
import { Quote } from "@/components/Quote";
import { Footer } from "@/components/Footer";
import { barrier, cold, remover } from "@/lib/sprays";

export default function Home() {
  return (
    <main>
      <Stage />
      <Hero />
      <Family />

      <Chapter
        spray={barrier}
        side="right"
        tone={{
          tone: "light",
          bg: "bg-[#e6f3ec]",
          edge: "#eef4f9",
          accent: "text-green",
          text: "text-navy",
          muted: "text-navy/70",
          circleFill: "#0e8f5a",
          circleRing: "#0e3a5b",
          dot: "bg-green text-white",
        }}
      />
      <Mechanism spray={barrier} tone="light" edge="#e6f3ec" />
      <SprayInfo
        spray={barrier}
        bg="bg-paper"
        text="text-navy"
        muted="text-navy/70"
        chip="bg-green/12"
        cta="bg-green text-white"
      />

      <Chapter
        spray={cold}
        side="left"
        tone={{
          tone: "dark",
          bg: "bg-deep",
          edge: "#f7f9fb",
          accent: "text-ice",
          text: "text-white",
          muted: "text-white/70",
          circleFill: "#4db6eb",
          circleRing: "#c8ccd4",
          dot: "bg-ice text-deep",
        }}
      />
      <Mechanism spray={cold} tone="dark" edge="#071f33" />
      <SprayInfo
        spray={cold}
        bg="bg-[#0a2740]"
        text="text-white"
        muted="text-white/70"
        chip="bg-white/10"
        cta="bg-ice text-deep"
      />

      <Chapter
        spray={remover}
        side="right"
        tone={{
          tone: "light",
          bg: "bg-[#dff3f2]",
          edge: "#0a2740",
          accent: "text-[#00b7b0]",
          text: "text-navy",
          muted: "text-navy/70",
          circleFill: "#00b7b0",
          circleRing: "#0e3a5b",
          dot: "bg-[#00b7b0] text-deep",
        }}
      />
      <Mechanism spray={remover} tone="light" edge="#dff3f2" />
      <SprayInfo
        spray={remover}
        bg="bg-paper"
        text="text-navy"
        muted="text-navy/70"
        chip="bg-[#00b7b0]/15"
        cta="bg-[#00b7b0] text-deep"
      />

      <Supplies />
      <Quote />
      <Footer />
    </main>
  );
}
