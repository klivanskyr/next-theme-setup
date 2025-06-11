"use client"

import { motion } from "framer-motion"

export default function RainbowName() {
  const name = "Ryan Klivansky"
  const letters = name.split("")
  const colors = [
    "#ff0000",
    "#ff8000",
    "#ffff00",
    "#80ff00",
    "#00ff00",
    "#00ff80",
    "#00ffff",
    "#0080ff",
    "#0000ff",
    "#8000ff",
    "#ff00ff",
    "#ff0080",
  ]

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <h1 className="text-6xl md:text-8xl font-bold mb-6 flex flex-wrap justify-center">
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              color: colors[index % colors.length],
            }}
            animate={{
              color: colors.map((_, i) => colors[(index + i) % colors.length]),
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  )
}
