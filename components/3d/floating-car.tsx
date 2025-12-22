"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

import { RoundedBox, Cylinder, Sphere, MeshDistortMaterial } from "@react-three/drei"

interface FloatingCarProps {
  color?: string
  scale?: number
}

export function FloatingCar({ color = "#ef4444", scale = 1 }: FloatingCarProps) {
  const groupRef = useRef<THREE.Group>(null)
  const wheelRefs = useRef<THREE.Mesh[]>([])
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.2
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.15 + 0.3
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.03
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }
    // Wheel rotation
    wheelRefs.current.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.x += 0.04
      }
    })
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.3
      glowRef.current.scale.setScalar(1 + pulse * 0.2)
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main body - sleeker design */}
      <RoundedBox args={[3.8, 0.55, 1.5]} radius={0.18} position={[0, 0.1, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </RoundedBox>

      {/* Body accent line */}
      <RoundedBox args={[3.6, 0.08, 1.52]} radius={0.02} position={[0, 0.2, 0]}>
        <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.05} />
      </RoundedBox>

      {/* Cabin - sportier profile */}
      <RoundedBox args={[1.9, 0.5, 1.35]} radius={0.15} position={[0, 0.52, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </RoundedBox>

      {/* Windows - darker tint */}
      <RoundedBox args={[1.6, 0.38, 1.3]} radius={0.1} position={[0, 0.55, 0]}>
        <meshStandardMaterial color="#0a1628" metalness={0.98} roughness={0.02} transparent opacity={0.95} />
      </RoundedBox>

      {/* Front windshield pillar */}
      <RoundedBox args={[0.1, 0.45, 1.38]} radius={0.03} position={[0.8, 0.52, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Rear windshield pillar */}
      <RoundedBox args={[0.1, 0.45, 1.38]} radius={0.03} position={[-0.8, 0.52, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Front hood - aggressive */}
      <RoundedBox args={[1.3, 0.22, 1.45]} radius={0.12} position={[1.35, 0.18, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </RoundedBox>

      {/* Hood vents */}
      <RoundedBox args={[0.4, 0.06, 0.2]} radius={0.02} position={[1.2, 0.32, 0.3]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[0.4, 0.06, 0.2]} radius={0.02} position={[1.2, 0.32, -0.3]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Rear trunk */}
      <RoundedBox args={[1, 0.22, 1.45]} radius={0.12} position={[-1.25, 0.18, 0]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </RoundedBox>

      {/* Rear spoiler */}
      <RoundedBox args={[0.12, 0.18, 1.3]} radius={0.03} position={[-1.7, 0.38, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
      </RoundedBox>

      {/* Headlights - LED style */}
      <RoundedBox args={[0.1, 0.12, 0.4]} radius={0.04} position={[1.82, 0.15, 0.48]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
      </RoundedBox>
      <RoundedBox args={[0.1, 0.12, 0.4]} radius={0.04} position={[1.82, 0.15, -0.48]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
      </RoundedBox>

      {/* DRL strips */}
      <RoundedBox args={[0.05, 0.03, 0.35]} radius={0.01} position={[1.85, 0.22, 0.48]}>
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.05, 0.03, 0.35]} radius={0.01} position={[1.85, 0.22, -0.48]}>
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={0.8} />
      </RoundedBox>

      {/* Taillights - LED bar */}
      <RoundedBox args={[0.08, 0.1, 0.35]} radius={0.03} position={[-1.78, 0.2, 0.52]}>
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.08, 0.1, 0.35]} radius={0.03} position={[-1.78, 0.2, -0.52]}>
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.9} />
      </RoundedBox>

      {/* Taillight connector bar */}
      <RoundedBox args={[0.05, 0.05, 1.1]} radius={0.02} position={[-1.8, 0.2, 0]}>
        <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.5} />
      </RoundedBox>

      {/* Grille */}
      <RoundedBox args={[0.06, 0.2, 0.9]} radius={0.02} position={[1.86, 0, 0]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.95} roughness={0.05} />
      </RoundedBox>

      {/* Side mirrors */}
      <RoundedBox args={[0.18, 0.1, 0.14]} radius={0.03} position={[0.55, 0.48, 0.82]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.1, 0.14]} radius={0.03} position={[0.55, 0.48, -0.82]}>
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Door handles - chrome */}
      <RoundedBox args={[0.18, 0.04, 0.06]} radius={0.015} position={[0.2, 0.32, 0.76]}>
        <meshStandardMaterial color="#e5e5e5" metalness={0.98} roughness={0.02} />
      </RoundedBox>
      <RoundedBox args={[0.18, 0.04, 0.06]} radius={0.015} position={[0.2, 0.32, -0.76]}>
        <meshStandardMaterial color="#e5e5e5" metalness={0.98} roughness={0.02} />
      </RoundedBox>

      {/* Side skirts */}
      <RoundedBox args={[2.2, 0.08, 0.08]} radius={0.02} position={[0, -0.12, 0.72]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <RoundedBox args={[2.2, 0.08, 0.08]} radius={0.02} position={[0, -0.12, -0.72]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* Wheels with premium rims */}
      {[
        [-1.05, -0.22, 0.78],
        [1.05, -0.22, 0.78],
        [-1.05, -0.22, -0.78],
        [1.05, -0.22, -0.78],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          {/* Tire */}
          <Cylinder
            ref={(el) => {
              if (el) wheelRefs.current[i] = el
            }}
            args={[0.35, 0.35, 0.24]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial color="#1a1a2e" metalness={0.2} roughness={0.9} />
          </Cylinder>
          {/* Rim outer */}
          <Cylinder args={[0.25, 0.25, 0.26]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#d4d4d4" metalness={0.98} roughness={0.02} />
          </Cylinder>
          {/* Rim inner */}
          <Cylinder args={[0.18, 0.18, 0.27]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
          </Cylinder>
          {/* Rim center cap */}
          <Cylinder args={[0.08, 0.08, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color={color} metalness={0.95} roughness={0.05} />
          </Cylinder>
          {/* Brake caliper hint */}
          <RoundedBox args={[0.1, 0.15, 0.08]} radius={0.02} position={[0, -0.08, pos[2] > 0 ? -0.1 : 0.1]}>
            <meshStandardMaterial color="#ef4444" metalness={0.7} roughness={0.3} />
          </RoundedBox>
        </group>
      ))}

      {/* Ground glow effect */}
      <Sphere ref={glowRef} args={[1.8, 32, 32]} position={[0, -0.6, 0]} scale={[1.6, 0.08, 0.9]}>
        <MeshDistortMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={0.4}
          transparent
          opacity={0.35}
          distort={0.15}
          speed={3}
        />
      </Sphere>

      {/* Secondary glow ring */}
      <Sphere args={[2.2, 32, 32]} position={[0, -0.65, 0]} scale={[1.4, 0.04, 0.75]}>
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.2} transparent opacity={0.2} />
      </Sphere>
    </group>
  )
}
