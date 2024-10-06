"use client";

import { fifties } from "@/types/fonts";
import { motion } from "framer-motion";

export default function LoadingComp() {
  const letters = "bask-it".split("");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-secondary">
      <div className="relative">
        <div className="flex">
          {letters.map((letter, index) => (
            <motion.div
              key={index}
              className={`text-6xl sm:text-8xl font-bold text-main ${fifties.className}`} // Use the fifties font class here
              animate={{
                y: [0, -40, 0],
                scaleY: [1, 1.2, 0.8, 1.2, 1],
                scaleX: [1, 0.8, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
            >
              {letter}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
