"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

function ElectricityParticles() {
  const ref = useRef<THREE.Points>(null!)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(3000 * 3)
    const colors = new Float32Array(3000 * 3)

    for (let i = 0; i < 3000; i++) {
      // Create branching electricity patterns
      const branch = Math.floor(i / 100)
      const angle = (branch / 30) * Math.PI * 2
      const radius = 20 + Math.random() * 40
      const height = (Math.random() - 0.5) * 60

      positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = height + Math.sin(i * 0.1) * 5
      positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 10
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      // Add electricity flickering effect
      const positions = ref.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 9) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 10 + i) * 0.1
      }
      ref.current.geometry.attributes.position.needsUpdate = true

      // Update colors based on theme
      const colors = ref.current.geometry.attributes.color.array as Float32Array
      for (let i = 0; i < colors.length; i += 3) {
        if (isDark) {
          // Blue electricity for dark mode
          colors[i] = 0.2 + Math.random() * 0.1 // R
          colors[i + 1] = 0.4 + Math.random() * 0.2 // G
          colors[i + 2] = 0.8 + Math.random() * 0.2 // B
        } else {
          // White electricity with slight blue tint for light mode
          const intensity = 0.8 + Math.random() * 0.2
          colors[i] = intensity // R
          colors[i + 1] = intensity // G
          colors[i + 2] = 1.0 // B
        }
      }
      ref.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={3}
        sizeAttenuation={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function CoolOrbitingSphere() {
  const groupRef = useRef<THREE.Group>(null!)
  const sphereRef = useRef<THREE.Mesh>(null!)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useFrame((state) => {
    if (groupRef.current && sphereRef.current) {
      // Main orbital motion
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3

      // Sphere self-rotation and pulsing
      sphereRef.current.rotation.x = state.clock.elapsedTime * 2
      sphereRef.current.rotation.z = state.clock.elapsedTime * 1.5

      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      sphereRef.current.scale.setScalar(scale)
    }
  })

  // Theme-based color
  const sphereColor = isDark ? "#3b82f6" : "#3b82f6"
  const trailColor = isDark ? "#3b82f6" : "#3b82f6"

  return (
    <group ref={groupRef}>
      <mesh ref={sphereRef} position={[25, 0, 0]}>
        <icosahedronGeometry args={[2, 2]} />
        <meshBasicMaterial color={sphereColor} wireframe transparent opacity={0.6} />
      </mesh>
      {/* Add trailing spheres */}
      <mesh position={[20, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color={trailColor} transparent opacity={0.3} />
      </mesh>
      <mesh position={[15, 0, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color={trailColor} transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 3
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.5) * 2
    }
  })

  // Theme-based color
  const geometryColor = isDark ? "#3b82f6" : "#3b82f6"

  return (
    <mesh ref={meshRef} position={[10, 0, -10]}>
      <octahedronGeometry args={[3, 2]} />
      <meshBasicMaterial color={geometryColor} wireframe transparent opacity={0.4} />
    </mesh>
  )
}

function SceneBackground() {
  const { scene } = useThree()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const isDark = resolvedTheme === "dark"
    scene.background = new THREE.Color(isDark ? "#000000" : "#ffffff")
  }, [resolvedTheme, scene])

  return null
}

export default function ThreeBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-background" />
  }

  return (
    <motion.div
      className="fixed inset-0 -z-10"
      animate={{
        backgroundColor: resolvedTheme === "dark" ? "rgba(0, 0, 0, 0.9)" : "rgba(255, 255, 255, 0.9)",
      }}
      transition={{ duration: 0.5 }}
    >
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }}>
        <SceneBackground />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.5} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <ElectricityParticles />
        <FloatingGeometry />
        <CoolOrbitingSphere />
      </Canvas>
    </motion.div>
  )
}
