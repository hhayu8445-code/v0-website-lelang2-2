"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface ParticlesBackgroundProps {
  count?: number
  color?: string
  secondaryColor?: string
  size?: number
  spread?: number
}

export function ParticlesBackground({
  count = 200,
  color = "#ef4444",
  secondaryColor = "#f59e0b",
  size = 0.05,
  spread = 20,
}: ParticlesBackgroundProps) {
  const pointsRef = useRef<THREE.Points>(null)
  const pointsRef2 = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const positions2 = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Primary particles - outer sphere
      positions[i * 3] = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread

      // Secondary particles - inner concentration
      positions2[i * 3] = (Math.random() - 0.5) * (spread * 0.6)
      positions2[i * 3 + 1] = (Math.random() - 0.5) * (spread * 0.6)
      positions2[i * 3 + 2] = (Math.random() - 0.5) * (spread * 0.6)
    }

    return { positions, positions2 }
  }, [count, spread])

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.015
      pointsRef.current.rotation.x = Math.sin(time * 0.03) * 0.1
    }

    if (pointsRef2.current) {
      pointsRef2.current.rotation.y = -time * 0.02
      pointsRef2.current.rotation.z = Math.cos(time * 0.04) * 0.08
    }
  })

  return (
    <>
      {/* Primary particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
            args={[particles.positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial size={size} color={color} sizeAttenuation transparent opacity={0.6} depthWrite={false} />
      </points>

      {/* Secondary particles */}
      <points ref={pointsRef2}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions2.length / 3}
            array={particles.positions2}
            itemSize={3}
            args={[particles.positions2, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size * 0.8}
          color={secondaryColor}
          sizeAttenuation
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </points>
    </>
  )
}
