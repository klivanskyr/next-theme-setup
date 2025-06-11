"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface BounceNameProps {
  globalMouseX?: number
  globalMouseY?: number
}

export default function BounceName({ globalMouseX = 0, globalMouseY = 0 }: BounceNameProps) {
  const name = "Ryan Klivansky"
  const words = name.split(" ")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMousePosition({ x: globalMouseX, y: globalMouseY })
  }, [globalMouseX, globalMouseY])

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary">
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            className="inline-block mr-4"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, mousePosition.x * 5, mousePosition.x * -5, 0],
              y: mousePosition.y * 10,
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: wordIndex * 0.5,
              ease: "easeInOut",
            }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  )
}
