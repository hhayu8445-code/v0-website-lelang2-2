"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox, Sphere, Torus, Cylinder, Cone } from "@react-three/drei"
import type * as THREE from "three"

interface Icon3DProps {
  type:
    | "car"
    | "shield"
    | "gift"
    | "zap"
    | "search"
    | "users"
    | "trophy"
    | "chart"
    | "lock"
    | "award"
    | "check"
    | "wallet"
    | "bell"
    | "star"
    | "heart"
    | "clock"
    | "document"
    | "settings"
  color?: string
  secondaryColor?: string
  scale?: number
  animate?: boolean
}

export function Icon3D({
  type,
  color = "#ef4444",
  secondaryColor = "#f59e0b",
  scale = 1,
  animate = true,
}: Icon3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.05
    }
  })

  const renderIcon = () => {
    switch (type) {
      case "car":
        return (
          <group>
            {/* Car body - enhanced */}
            <RoundedBox args={[1.8, 0.45, 0.8]} radius={0.12} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Car roof */}
            <RoundedBox args={[0.95, 0.38, 0.72]} radius={0.1} position={[0, 0.32, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} envMapIntensity={1.2} />
            </RoundedBox>
            {/* Windows */}
            <RoundedBox args={[0.75, 0.28, 0.68]} radius={0.06} position={[0, 0.34, 0]}>
              <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.05} />
            </RoundedBox>
            {/* Wheels */}
            {[
              [-0.55, -0.22, 0.42],
              [0.55, -0.22, 0.42],
              [-0.55, -0.22, -0.42],
              [0.55, -0.22, -0.42],
            ].map((pos, i) => (
              <group key={i} position={pos as [number, number, number]}>
                <Cylinder args={[0.18, 0.18, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
                  <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.6} />
                </Cylinder>
                <Cylinder args={[0.12, 0.12, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
                  <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
                </Cylinder>
              </group>
            ))}
            {/* Headlights */}
            <RoundedBox args={[0.05, 0.1, 0.2]} radius={0.02} position={[0.88, 0, 0.25]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
            </RoundedBox>
            <RoundedBox args={[0.05, 0.1, 0.2]} radius={0.02} position={[0.88, 0, -0.25]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
            </RoundedBox>
            {/* Taillights */}
            <RoundedBox args={[0.05, 0.08, 0.18]} radius={0.02} position={[-0.88, 0.05, 0.28]}>
              <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} />
            </RoundedBox>
            <RoundedBox args={[0.05, 0.08, 0.18]} radius={0.02} position={[-0.88, 0.05, -0.28]}>
              <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.6} />
            </RoundedBox>
          </group>
        )

      case "shield":
        return (
          <group>
            {/* Main shield body */}
            <RoundedBox args={[1, 1.15, 0.18]} radius={0.18}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} envMapIntensity={1} />
            </RoundedBox>
            {/* Shield bottom point */}
            <Cone args={[0.5, 0.45, 4]} position={[0, -0.78, 0]} rotation={[Math.PI, 0, Math.PI / 4]}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} envMapIntensity={1} />
            </Cone>
            {/* Inner accent */}
            <RoundedBox args={[0.7, 0.8, 0.2]} radius={0.12} position={[0, 0.05, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.6} roughness={0.4} />
            </RoundedBox>
            {/* Check mark - short part */}
            <RoundedBox args={[0.12, 0.4, 0.22]} radius={0.04} position={[-0.12, -0.05, 0]} rotation={[0, 0, -0.5]}>
              <meshStandardMaterial color="#22c55e" metalness={0.5} roughness={0.5} />
            </RoundedBox>
            {/* Check mark - long part */}
            <RoundedBox args={[0.12, 0.6, 0.22]} radius={0.04} position={[0.18, 0.08, 0]} rotation={[0, 0, 0.35]}>
              <meshStandardMaterial color="#22c55e" metalness={0.5} roughness={0.5} />
            </RoundedBox>
          </group>
        )

      case "gift":
        return (
          <group>
            {/* Box body */}
            <RoundedBox args={[1, 0.75, 0.8]} radius={0.1} position={[0, -0.12, 0]}>
              <meshStandardMaterial color={color} metalness={0.65} roughness={0.35} />
            </RoundedBox>
            {/* Lid */}
            <RoundedBox args={[1.1, 0.18, 0.9]} radius={0.06} position={[0, 0.38, 0]}>
              <meshStandardMaterial color={color} metalness={0.65} roughness={0.35} />
            </RoundedBox>
            {/* Ribbon vertical */}
            <RoundedBox args={[0.14, 1.05, 0.85]} radius={0.02} position={[0, 0.05, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.55} roughness={0.45} />
            </RoundedBox>
            {/* Ribbon horizontal */}
            <RoundedBox args={[1.05, 0.14, 0.85]} radius={0.02} position={[0, 0.05, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.55} roughness={0.45} />
            </RoundedBox>
            {/* Bow loops */}
            <Torus args={[0.14, 0.045, 8, 16]} position={[-0.14, 0.58, 0]} rotation={[0, 0, 0.5]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.55} roughness={0.45} />
            </Torus>
            <Torus args={[0.14, 0.045, 8, 16]} position={[0.14, 0.58, 0]} rotation={[0, 0, -0.5]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.55} roughness={0.45} />
            </Torus>
            {/* Bow center */}
            <Sphere args={[0.08]} position={[0, 0.55, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.55} roughness={0.45} />
            </Sphere>
          </group>
        )

      case "zap":
        return (
          <group>
            {/* Lightning bolt - top */}
            <RoundedBox args={[0.45, 0.55, 0.14]} radius={0.05} position={[0.12, 0.38, 0]} rotation={[0, 0, -0.35]}>
              <meshStandardMaterial
                color={secondaryColor}
                emissive={secondaryColor}
                emissiveIntensity={0.5}
                metalness={0.75}
                roughness={0.25}
              />
            </RoundedBox>
            {/* Lightning bolt - middle */}
            <RoundedBox args={[0.55, 0.28, 0.14]} radius={0.05} position={[0, 0, 0]}>
              <meshStandardMaterial
                color={secondaryColor}
                emissive={secondaryColor}
                emissiveIntensity={0.5}
                metalness={0.75}
                roughness={0.25}
              />
            </RoundedBox>
            {/* Lightning bolt - bottom */}
            <RoundedBox args={[0.45, 0.55, 0.14]} radius={0.05} position={[-0.12, -0.38, 0]} rotation={[0, 0, -0.35]}>
              <meshStandardMaterial
                color={secondaryColor}
                emissive={secondaryColor}
                emissiveIntensity={0.5}
                metalness={0.75}
                roughness={0.25}
              />
            </RoundedBox>
            {/* Glow effect */}
            <Sphere args={[0.6]} position={[0, 0, 0]}>
              <meshStandardMaterial
                color={secondaryColor}
                emissive={secondaryColor}
                emissiveIntensity={0.15}
                transparent
                opacity={0.2}
              />
            </Sphere>
          </group>
        )

      case "search":
        return (
          <group>
            {/* Magnifying glass ring */}
            <Torus args={[0.38, 0.1, 16, 32]} position={[0, 0.1, 0]}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} />
            </Torus>
            {/* Handle */}
            <Cylinder args={[0.08, 0.06, 0.5]} position={[0.35, -0.35, 0]} rotation={[0, 0, -0.785]}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} />
            </Cylinder>
            {/* Glass lens */}
            <Sphere args={[0.28]} position={[0, 0.1, 0]}>
              <meshStandardMaterial color="#60a5fa" transparent opacity={0.35} metalness={0.95} roughness={0.05} />
            </Sphere>
            {/* Reflection highlight */}
            <Sphere args={[0.08]} position={[-0.1, 0.2, 0.15]}>
              <meshStandardMaterial
                color="#ffffff"
                emissive="#ffffff"
                emissiveIntensity={0.3}
                transparent
                opacity={0.6}
              />
            </Sphere>
          </group>
        )

      case "users":
        return (
          <group>
            {/* Main user - head */}
            <Sphere args={[0.24]} position={[0, 0.38, 0]}>
              <meshStandardMaterial color={color} metalness={0.65} roughness={0.35} />
            </Sphere>
            {/* Main user - body */}
            <Cylinder args={[0.28, 0.38, 0.48, 16]} position={[0, -0.1, 0]}>
              <meshStandardMaterial color={color} metalness={0.65} roughness={0.35} />
            </Cylinder>
            {/* Left user - head */}
            <Sphere args={[0.16]} position={[-0.48, 0.28, -0.18]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.65} roughness={0.35} />
            </Sphere>
            {/* Left user - body */}
            <Cylinder args={[0.2, 0.28, 0.38, 16]} position={[-0.48, -0.05, -0.18]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.65} roughness={0.35} />
            </Cylinder>
            {/* Right user - head */}
            <Sphere args={[0.16]} position={[0.48, 0.28, -0.18]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.65} roughness={0.35} />
            </Sphere>
            {/* Right user - body */}
            <Cylinder args={[0.2, 0.28, 0.38, 16]} position={[0.48, -0.05, -0.18]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.65} roughness={0.35} />
            </Cylinder>
          </group>
        )

      case "trophy":
        return (
          <group>
            {/* Cup bowl */}
            <Cylinder args={[0.38, 0.28, 0.55, 16]} position={[0, 0.18, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.95} roughness={0.05} envMapIntensity={1.5} />
            </Cylinder>
            {/* Cup rim */}
            <Torus args={[0.38, 0.05, 8, 32]} position={[0, 0.45, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.95} roughness={0.05} />
            </Torus>
            {/* Stem */}
            <Cylinder args={[0.12, 0.18, 0.2, 16]} position={[0, -0.18, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.95} roughness={0.05} />
            </Cylinder>
            {/* Base */}
            <Cylinder args={[0.32, 0.38, 0.12, 16]} position={[0, -0.32, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.95} roughness={0.05} />
            </Cylinder>
            {/* Handles */}
            <Torus args={[0.18, 0.045, 8, 16]} position={[-0.42, 0.22, 0]} rotation={[0, Math.PI / 2, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.95} roughness={0.05} />
            </Torus>
            <Torus args={[0.18, 0.045, 8, 16]} position={[0.42, 0.22, 0]} rotation={[0, Math.PI / 2, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.95} roughness={0.05} />
            </Torus>
            {/* Star decoration */}
            <Cone args={[0.1, 0.12, 5]} position={[0, 0.1, 0.18]} rotation={[Math.PI / 2, 0, Math.PI]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Cone>
          </group>
        )

      case "chart":
        return (
          <group>
            {/* Bar 1 */}
            <RoundedBox args={[0.22, 0.45, 0.22]} radius={0.04} position={[-0.38, -0.28, 0]}>
              <meshStandardMaterial color={color} metalness={0.65} roughness={0.35} />
            </RoundedBox>
            {/* Bar 2 */}
            <RoundedBox args={[0.22, 0.75, 0.22]} radius={0.04} position={[0, -0.12, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.65} roughness={0.35} />
            </RoundedBox>
            {/* Bar 3 */}
            <RoundedBox args={[0.22, 1.05, 0.22]} radius={0.04} position={[0.38, 0.02, 0]}>
              <meshStandardMaterial color={color} metalness={0.65} roughness={0.35} />
            </RoundedBox>
            {/* Trend arrow */}
            <Cone args={[0.12, 0.22, 4]} position={[0.38, 0.65, 0]}>
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.4} />
            </Cone>
            {/* Arrow line */}
            <Cylinder args={[0.04, 0.04, 0.4]} position={[0.1, 0.35, 0]} rotation={[0, 0, -0.6]}>
              <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.3} />
            </Cylinder>
          </group>
        )

      case "lock":
        return (
          <group>
            {/* Lock body */}
            <RoundedBox args={[0.75, 0.65, 0.28]} radius={0.1} position={[0, -0.18, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.85} roughness={0.15} />
            </RoundedBox>
            {/* Shackle */}
            <Torus args={[0.22, 0.075, 16, 32, Math.PI]} position={[0, 0.32, 0]}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} />
            </Torus>
            {/* Shackle sides */}
            <Cylinder args={[0.075, 0.075, 0.32]} position={[-0.22, 0.16, 0]}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} />
            </Cylinder>
            <Cylinder args={[0.075, 0.075, 0.32]} position={[0.22, 0.16, 0]}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} />
            </Cylinder>
            {/* Keyhole */}
            <Cylinder args={[0.06, 0.06, 0.3]} position={[0, -0.1, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#1a1a2e" />
            </Cylinder>
            <RoundedBox args={[0.05, 0.12, 0.3]} position={[0, -0.2, 0.12]}>
              <meshStandardMaterial color="#1a1a2e" />
            </RoundedBox>
          </group>
        )

      case "award":
        return (
          <group>
            {/* Medal disc */}
            <Cylinder args={[0.38, 0.38, 0.08, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.95} roughness={0.05} />
            </Cylinder>
            {/* Outer ring */}
            <Torus args={[0.38, 0.045, 16, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} />
            </Torus>
            {/* Inner design - star */}
            <Cone args={[0.15, 0.18, 5]} position={[0, 0.02, 0.04]} rotation={[Math.PI / 2, 0, Math.PI]}>
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.4} />
            </Cone>
            {/* Ribbon left */}
            <RoundedBox args={[0.14, 0.48, 0.04]} radius={0.02} position={[-0.14, 0.48, 0]} rotation={[0, 0, 0.18]}>
              <meshStandardMaterial color={color} metalness={0.55} roughness={0.45} />
            </RoundedBox>
            {/* Ribbon right */}
            <RoundedBox args={[0.14, 0.48, 0.04]} radius={0.02} position={[0.14, 0.48, 0]} rotation={[0, 0, -0.18]}>
              <meshStandardMaterial color={color} metalness={0.55} roughness={0.45} />
            </RoundedBox>
          </group>
        )

      case "check":
        return (
          <group>
            {/* Circle background */}
            <Cylinder args={[0.5, 0.5, 0.1, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#22c55e" metalness={0.7} roughness={0.3} />
            </Cylinder>
            {/* Check mark - short */}
            <RoundedBox args={[0.1, 0.32, 0.12]} radius={0.03} position={[-0.1, -0.05, 0.05]} rotation={[0, 0, -0.5]}>
              <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.4} />
            </RoundedBox>
            {/* Check mark - long */}
            <RoundedBox args={[0.1, 0.52, 0.12]} radius={0.03} position={[0.14, 0.08, 0.05]} rotation={[0, 0, 0.4]}>
              <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.4} />
            </RoundedBox>
          </group>
        )

      case "wallet":
        return (
          <group>
            {/* Wallet body */}
            <RoundedBox args={[1.1, 0.7, 0.25]} radius={0.08} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </RoundedBox>
            {/* Wallet flap */}
            <RoundedBox args={[1.15, 0.35, 0.28]} radius={0.06} position={[0, 0.25, 0]}>
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </RoundedBox>
            {/* Clasp */}
            <Cylinder args={[0.08, 0.08, 0.3]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.08, 0.12]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.9} roughness={0.1} />
            </Cylinder>
            {/* Card slots hint */}
            <RoundedBox args={[0.8, 0.08, 0.28]} radius={0.02} position={[0, -0.15, 0]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.5} />
            </RoundedBox>
          </group>
        )

      case "bell":
        return (
          <group>
            {/* Bell body */}
            <Cylinder args={[0.35, 0.15, 0.6, 16]} position={[0, 0.1, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.85} roughness={0.15} />
            </Cylinder>
            {/* Bell rim */}
            <Torus args={[0.35, 0.06, 8, 32]} position={[0, -0.2, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.85} roughness={0.15} />
            </Torus>
            {/* Bell top */}
            <Sphere args={[0.15]} position={[0, 0.45, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.85} roughness={0.15} />
            </Sphere>
            {/* Clapper */}
            <Sphere args={[0.1]} position={[0, -0.15, 0]}>
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Sphere>
            {/* Notification dot */}
            <Sphere args={[0.12]} position={[0.3, 0.4, 0]}>
              <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
            </Sphere>
          </group>
        )

      case "star":
        return (
          <group>
            {/* Star points using cones */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <Cone
                key={i}
                args={[0.25, 0.5, 4]}
                position={[Math.sin((angle * Math.PI) / 180) * 0.25, Math.cos((angle * Math.PI) / 180) * 0.25, 0]}
                rotation={[0, 0, (-angle * Math.PI) / 180]}
              >
                <meshStandardMaterial
                  color={secondaryColor}
                  metalness={0.9}
                  roughness={0.1}
                  emissive={secondaryColor}
                  emissiveIntensity={0.3}
                />
              </Cone>
            ))}
            {/* Center */}
            <Sphere args={[0.25]} position={[0, 0, 0]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.9} roughness={0.1} />
            </Sphere>
          </group>
        )

      case "heart":
        return (
          <group>
            {/* Left lobe */}
            <Sphere args={[0.3]} position={[-0.2, 0.15, 0]}>
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </Sphere>
            {/* Right lobe */}
            <Sphere args={[0.3]} position={[0.2, 0.15, 0]}>
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </Sphere>
            {/* Bottom point */}
            <Cone args={[0.42, 0.6, 32]} position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} />
            </Cone>
          </group>
        )

      case "clock":
        return (
          <group>
            {/* Clock face */}
            <Cylinder args={[0.5, 0.5, 0.1, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.75} roughness={0.25} />
            </Cylinder>
            {/* Inner face */}
            <Cylinder args={[0.42, 0.42, 0.12, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.7} />
            </Cylinder>
            {/* Hour hand */}
            <RoundedBox args={[0.06, 0.22, 0.14]} radius={0.02} position={[0, 0.08, 0.02]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
            </RoundedBox>
            {/* Minute hand */}
            <RoundedBox args={[0.04, 0.32, 0.14]} radius={0.015} position={[0.08, 0, 0.02]} rotation={[0, 0, -1.2]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
            </RoundedBox>
            {/* Center dot */}
            <Sphere args={[0.05]} position={[0, 0, 0.06]}>
              <meshStandardMaterial color={secondaryColor} metalness={0.9} roughness={0.1} />
            </Sphere>
          </group>
        )

      case "document":
        return (
          <group>
            {/* Paper */}
            <RoundedBox args={[0.8, 1, 0.08]} radius={0.04} position={[0, 0, 0]}>
              <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
            </RoundedBox>
            {/* Folded corner */}
            <RoundedBox args={[0.2, 0.2, 0.1]} radius={0.02} position={[0.3, 0.4, 0.02]} rotation={[0, 0, 0.785]}>
              <meshStandardMaterial color="#e5e5e5" metalness={0.2} roughness={0.8} />
            </RoundedBox>
            {/* Text lines */}
            <RoundedBox args={[0.5, 0.06, 0.1]} radius={0.01} position={[-0.05, 0.2, 0.04]}>
              <meshStandardMaterial color={color} metalness={0.4} roughness={0.6} />
            </RoundedBox>
            <RoundedBox args={[0.6, 0.05, 0.1]} radius={0.01} position={[0, 0, 0.04]}>
              <meshStandardMaterial color="#a3a3a3" metalness={0.3} roughness={0.7} />
            </RoundedBox>
            <RoundedBox args={[0.55, 0.05, 0.1]} radius={0.01} position={[-0.025, -0.15, 0.04]}>
              <meshStandardMaterial color="#a3a3a3" metalness={0.3} roughness={0.7} />
            </RoundedBox>
            <RoundedBox args={[0.4, 0.05, 0.1]} radius={0.01} position={[-0.1, -0.3, 0.04]}>
              <meshStandardMaterial color="#a3a3a3" metalness={0.3} roughness={0.7} />
            </RoundedBox>
          </group>
        )

      case "settings":
        return (
          <group>
            {/* Main gear */}
            <Cylinder args={[0.45, 0.45, 0.15, 8]} position={[0, 0, 0]}>
              <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            </Cylinder>
            {/* Gear teeth */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <RoundedBox
                key={i}
                args={[0.15, 0.2, 0.16]}
                radius={0.03}
                position={[Math.sin((angle * Math.PI) / 180) * 0.48, Math.cos((angle * Math.PI) / 180) * 0.48, 0]}
                rotation={[0, 0, (-angle * Math.PI) / 180]}
              >
                <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
              </RoundedBox>
            ))}
            {/* Inner circle */}
            <Cylinder args={[0.18, 0.18, 0.18, 16]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#1a1a2e" metalness={0.6} roughness={0.4} />
            </Cylinder>
          </group>
        )

      default:
        return (
          <Sphere args={[0.5]}>
            <meshStandardMaterial color={color} metalness={0.6} roughness={0.4} />
          </Sphere>
        )
    }
  }

  return (
    <group ref={groupRef} scale={scale}>
      {renderIcon()}
    </group>
  )
}
