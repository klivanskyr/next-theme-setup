"use client"

import { motion } from "framer-motion"

export default function SplitName() {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <div
        className="text-6xl md:text-8xl font-bold mb-6 text-primary overflow-hidden relative"
        style={{ minHeight: "120px" }}
      >
        <motion.div
          className="flex justify-start"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Ryan
        </motion.div>
        <motion.div
          className="flex justify-end"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Klivansky
        </motion.div>
      </div>
    </motion.div>
  )
}
