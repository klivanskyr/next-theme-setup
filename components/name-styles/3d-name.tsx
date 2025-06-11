"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"

interface ThreeDNameProps {
  globalMouseX: number
  globalMouseY: number
}

export default function ThreeDName({ globalMouseX, globalMouseY }: ThreeDNameProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLHeadingElement>(null)

  return (
    <motion.div
      className="perspective-1000 w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <motion.h1
        ref={ref}
        className="text-6xl md:text-8xl font-bold mb-6 text-primary relative"
        style={{
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${globalMouseY * 10}deg) rotateY(${globalMouseX * 10}deg)`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="block">Ryan Klivansky</span>
        <motion.span
          className="absolute inset-0 text-blue-400/50"
          style={{
            transform: "translateZ(-20px)",
          }}
        >
          Ryan Klivansky
        </motion.span>
        <motion.span
          className="absolute inset-0 text-purple-400/30"
          style={{
            transform: "translateZ(-40px)",
          }}
        >
          Ryan Klivansky
        </motion.span>
      </motion.h1>
    </motion.div>
  )
}
