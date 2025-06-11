"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function MatrixName() {
  const [matrixChars, setMatrixChars] = useState<string[]>([])
  const finalName = "Ryan Klivansky"
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*"

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setMatrixChars((prev) =>
        finalName.split("").map((letter, index) => {
          if (index < iteration) {
            return finalName[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        }),
      )

      if (iteration >= finalName.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary font-mono whitespace-nowrap">
        {matrixChars.join("")}
      </h1>
    </motion.div>
  )
}
