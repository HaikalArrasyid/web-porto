"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Blobs() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the whole document
  const { scrollYProgress } = useScroll();

  // Larger scroll-driven transforms (x/y translations) so blobs drift widely as the user scrolls
  const blob1X = useTransform(scrollYProgress, [0, 1], ["-15vw", "25vw"]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["-10vh", "45vh"]);

  const blob2X = useTransform(scrollYProgress, [0, 1], ["10vw", "-30vw"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["-20vh", "35vh"]);

  const blob3X = useTransform(scrollYProgress, [0, 1], ["20vw", "-25vw"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["10vh", "-60vh"]);

  const blob4X = useTransform(scrollYProgress, [0, 1], ["-10vw", "30vw"]);
  const blob4Y = useTransform(scrollYProgress, [0, 1], ["25vh", "-35vh"]);

  const blob5X = useTransform(scrollYProgress, [0, 1], ["-25vw", "25vw"]);
  const blob5Y = useTransform(scrollYProgress, [0, 1], ["15vh", "-45vh"]);

  // Morphing liquid shapes definitions
  const liquidMorph1 = [
    "42% 58% 70% 30% / 45% 45% 55% 55%",
    "70% 30% 52% 48% / 60% 40% 60% 40%",
    "40% 60% 30% 70% / 40% 60% 40% 60%",
    "42% 58% 70% 30% / 45% 45% 55% 55%"
  ];

  const liquidMorph2 = [
    "50% 50% 30% 70% / 50% 60% 40% 50%",
    "30% 70% 70% 30% / 50% 30% 70% 50%",
    "70% 30% 30% 70% / 40% 70% 30% 60%",
    "50% 50% 30% 70% / 50% 60% 40% 50%"
  ];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Top-left blob (Red blur, morhping shape, scroll-active translation) */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        animate={{
          borderRadius: liquidMorph1,
          rotate: [0, 120, 240, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[5%] left-[2%] w-[45vw] max-w-[500px] aspect-square bg-red-500/25 rounded-full blur-[80px] md:blur-[120px] opacity-40"
      />

      {/* Center blob */}
      <motion.div
        style={{ x: blob2X, y: blob2Y }}
        animate={{
          borderRadius: liquidMorph2,
          rotate: [360, 240, 120, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[40%] left-[30%] w-[38vw] max-w-[440px] aspect-square bg-red-500/15 rounded-full blur-[100px] md:blur-[140px] opacity-30"
      />

      {/* Top-right blob */}
      <motion.div
        style={{ x: blob3X, y: blob3Y }}
        animate={{
          borderRadius: liquidMorph1,
          rotate: [0, -120, -240, -360]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[8%] right-[5%] w-[40vw] max-w-[480px] aspect-square bg-red-500/20 rounded-full blur-[80px] md:blur-[120px] opacity-35"
      />

      {/* Bottom-right blob */}
      <motion.div
        style={{ x: blob4X, y: blob4Y }}
        animate={{
          borderRadius: liquidMorph2,
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[10%] right-[3%] w-[35vw] max-w-[400px] aspect-square bg-red-500/15 rounded-full blur-[90px] md:blur-[130px] opacity-35"
      />

      {/* Bottom-center blob */}
      <motion.div
        style={{ x: blob5X, y: blob5Y }}
        animate={{
          borderRadius: liquidMorph1,
          rotate: [360, 180, 0]
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] left-[35%] w-[35vw] max-w-[420px] aspect-square bg-red-600/10 rounded-full blur-[100px] md:blur-[150px] opacity-25"
      />
    </div>
  );
}
