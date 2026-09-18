"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Blob {
  className: string;
  size: number;
  left: string;
  top: string;
  duration: number;
}

const blobs: Blob[] = [
  { className: "bg-[#4F46E5]/30", size: 420, left: "-8%", top: "-25%", duration: 18 },
  { className: "bg-[#8B5CF6]/25", size: 360, left: "55%", top: "-15%", duration: 22 },
  { className: "bg-[#EC4899]/15", size: 320, left: "70%", top: "35%", duration: 26 },
  { className: "bg-[#38BDF8]/20", size: 340, left: "5%", top: "40%", duration: 20 },
];

// Soft, slowly-drifting colorful blur halo — the Gemini-style "gradient
// light" glow that sits behind the hero + search bar.
export function GradientGlow() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={{ width: blob.size, height: blob.size, left: blob.left, top: blob.top }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 24, -16, 0],
                  y: [0, -18, 14, 0],
                  scale: [1, 1.08, 0.94, 1],
                }
          }
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
