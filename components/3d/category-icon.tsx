"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Cylinder } from "@react-three/drei"
import type * as THREE from "three"

interface CategoryIcon3DProps {
  type: "sedan" | "suv" | "mpv" | "hatchback" | "sport"
  color?: string
  scale?: number
}

export function CategoryIcon3D({ type, color = "#ef4444", scale = 1 }: CategoryIcon3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.05
    }
  })

  const renderWheel = (pos: [number, number, number], index: number, wheelSize = 0.18) => (
    <group key={`wheel-${index}`} position={pos}>
      <Cylinder args={[wheelSize, wheelSize, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" metalness={0.4} roughness={0.7} />
      </Cylinder>
      <Cylinder args={[wheelSize * 0.65, wheelSize * 0.65, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
      </Cylinder>
    </group>
  )

  const renderVehicle = () => {
    const wheelPositions: [number, number, number][] = [
      [-0.6, -0.2, 0.45],
      [0.6, -0.2, 0.45],
      [-0.6, -0.2, -0.45],
      [0.6, -0.2, -0.45],
    ]

    switch (type) {
      case "sedan":
        return (
          <group>
            {/* Body */}
            <RoundedBox args={[2, 0.4, 0.9]} radius={0.12} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Cabin */}
            <RoundedBox args={[1.1, 0.35, 0.82]} radius={0.1} position={[0, 0.3, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Windows */}
            <RoundedBox args={[0.9, 0.26, 0.78]} radius={0.06} position={[0, 0.32, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.05} />
            </RoundedBox>
            {/* Headlights */}
            <RoundedBox args={[0.05, 0.1, 0.22]} radius={0.02} position={[0.98, 0, 0.28]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
            </RoundedBox>
            <RoundedBox args={[0.05, 0.1, 0.22]} radius={0.02} position={[0.98, 0, -0.28]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
            </RoundedBox>
            {wheelPositions.map((pos, i) => renderWheel(pos, i, 0.18))}
          </group>
        )

      case "suv":
        return (
          <group>
            {/* Body - taller */}
            <RoundedBox args={[1.9, 0.5, 1]} radius={0.12} position={[0, 0.05, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Cabin - boxy */}
            <RoundedBox args={[1.3, 0.52, 0.92]} radius={0.1} position={[-0.1, 0.52, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Windows */}
            <RoundedBox args={[1.1, 0.38, 0.88]} radius={0.06} position={[-0.1, 0.54, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.05} />
            </RoundedBox>
            {/* Roof rails */}
            <RoundedBox args={[1.2, 0.04, 0.04]} radius={0.01} position={[-0.1, 0.82, 0.42]}>
              <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
            </RoundedBox>
            <RoundedBox args={[1.2, 0.04, 0.04]} radius={0.01} position={[-0.1, 0.82, -0.42]}>
              <meshStandardMaterial color="#404040" metalness={0.9} roughness={0.1} />
            </RoundedBox>
            {(
              [
                [-0.55, -0.2, 0.52],
                [0.55, -0.2, 0.52],
                [-0.55, -0.2, -0.52],
                [0.55, -0.2, -0.52],
              ] as [number, number, number][]
            ).map((pos, i) => renderWheel(pos, i, 0.22))}
          </group>
        )

      case "mpv":
        return (
          <group>
            {/* Body - extended */}
            <RoundedBox args={[2.2, 0.45, 1]} radius={0.12} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Cabin - high roof */}
            <RoundedBox args={[1.7, 0.58, 0.92]} radius={0.12} position={[-0.1, 0.48, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Windows */}
            <RoundedBox args={[1.5, 0.42, 0.88]} radius={0.06} position={[-0.1, 0.5, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.05} />
            </RoundedBox>
            {/* Sliding door hint */}
            <RoundedBox args={[0.02, 0.4, 0.88]} radius={0.005} position={[-0.3, 0.25, 0.47]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
            </RoundedBox>
            {(
              [
                [-0.7, -0.2, 0.5],
                [0.7, -0.2, 0.5],
                [-0.7, -0.2, -0.5],
                [0.7, -0.2, -0.5],
              ] as [number, number, number][]
            ).map((pos, i) => renderWheel(pos, i, 0.2))}
          </group>
        )

      case "hatchback":
        return (
          <group>
            {/* Body - compact */}
            <RoundedBox args={[1.6, 0.4, 0.85]} radius={0.12} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Cabin - sloped rear */}
            <RoundedBox args={[1, 0.4, 0.78]} radius={0.1} position={[-0.15, 0.32, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Windows */}
            <RoundedBox args={[0.8, 0.3, 0.74]} radius={0.05} position={[-0.15, 0.34, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.05} />
            </RoundedBox>
            {(
              [
                [-0.5, -0.18, 0.42],
                [0.5, -0.18, 0.42],
                [-0.5, -0.18, -0.42],
                [0.5, -0.18, -0.42],
              ] as [number, number, number][]
            ).map((pos, i) => renderWheel(pos, i, 0.16))}
          </group>
        )

      case "sport":
        return (
          <group>
            {/* Body - sleek, low */}
            <RoundedBox args={[2, 0.28, 0.9]} radius={0.1} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.92} roughness={0.08} envMapIntensity={1.5} />
            </RoundedBox>
            {/* Cabin - very low, aerodynamic */}
            <RoundedBox args={[0.88, 0.28, 0.78]} radius={0.08} position={[0, 0.22, 0]}>
              <meshStandardMaterial color={color} metalness={0.92} roughness={0.08} envMapIntensity={1.5} />
            </RoundedBox>
            {/* Windows */}
            <RoundedBox args={[0.7, 0.2, 0.74]} radius={0.05} position={[0, 0.24, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.98} roughness={0.02} />
            </RoundedBox>
            {/* Front air intake */}
            <RoundedBox args={[0.05, 0.15, 0.6]} radius={0.02} position={[0.98, -0.05, 0]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
            </RoundedBox>
            {/* Rear spoiler */}
            <RoundedBox args={[0.12, 0.15, 0.82]} radius={0.03} position={[-0.95, 0.2, 0]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.15} />
            </RoundedBox>
            {/* Side vents */}
            <RoundedBox args={[0.2, 0.08, 0.04]} radius={0.02} position={[0.4, 0.05, 0.46]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
            </RoundedBox>
            <RoundedBox args={[0.2, 0.08, 0.04]} radius={0.02} position={[0.4, 0.05, -0.46]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
            </RoundedBox>
            {/* Exhaust */}
            <Cylinder args={[0.04, 0.04, 0.08]} rotation={[0, 0, Math.PI / 2]} position={[-1, -0.08, 0.22]}>
              <meshStandardMaterial color="#303030" metalness={0.95} roughness={0.1} />
            </Cylinder>
            <Cylinder args={[0.04, 0.04, 0.08]} rotation={[0, 0, Math.PI / 2]} position={[-1, -0.08, -0.22]}>
              <meshStandardMaterial color="#303030" metalness={0.95} roughness={0.1} />
            </Cylinder>
            {(
              [
                [-0.6, -0.12, 0.48],
                [0.6, -0.12, 0.48],
                [-0.6, -0.12, -0.48],
                [0.6, -0.12, -0.48],
              ] as [number, number, number][]
            ).map((pos, i) => renderWheel(pos, i, 0.18))}
          </group>
        )

      default:
        return null
    }
  }

  return (
    <group ref={groupRef} scale={scale}>
      {renderVehicle()}
    </group>
  )
}
