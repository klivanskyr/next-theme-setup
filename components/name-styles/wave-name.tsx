"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export default function WaveName() {
  const name = "Ryan Klivansky"
  const letters = name.split("")
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <h1
        className="text-6xl md:text-8xl font-bold mb-6 text-primary flex flex-wrap justify-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className="inline-block"
            animate={{
              y: isHovered ? [0, -30, 0] : [0, -10, 0],
              scale: isHovered ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: isHovered ? 0.6 : 2,
              repeat: isHovered ? 0 : Number.POSITIVE_INFINITY,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  )
}
