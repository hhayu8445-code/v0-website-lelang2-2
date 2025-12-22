"use client"

import { Canvas } from "@react-three/fiber"
import { ContactShadows, Float, Preload } from "@react-three/drei"
import { Suspense, type ReactNode, memo, useState, useEffect } from "react"

interface SceneWrapperProps {
  children: ReactNode
  className?: string
  shadows?: boolean
  environment?:
    | "apartment"
    | "city"
    | "dawn"
    | "forest"
    | "lobby"
    | "night"
    | "park"
    | "studio"
    | "sunset"
    | "warehouse"
  cameraPosition?: [number, number, number]
  fov?: number
}

export const SceneWrapper = memo(function SceneWrapper({
  children,
  className = "",
  shadows = true,
  environment = "city",
  cameraPosition = [0, 0, 5],
  fov = 45,
}: SceneWrapperProps) {
  const [webglSupported, setWebglSupported] = useState(true)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch {
      setWebglSupported(false)
    }
  }, [])

  if (!webglSupported || contextLost) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-muted/20 rounded-lg ${className}`}>
        <div className="text-center text-muted-foreground text-4xl">🚗</div>
      </div>
    )
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
        onCreated={({ gl }) => {
          const canvas = gl.domElement
          canvas.addEventListener("webglcontextlost", (e) => {
            e.preventDefault()
            setContextLost(true)
          })
          canvas.addEventListener("webglcontextrestored", () => {
            setContextLost(false)
          })
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#3b82f6" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ef4444" />
          <pointLight position={[10, -10, 5]} intensity={0.4} color="#f59e0b" />
          <spotLight position={[0, 10, 0]} angle={0.4} penumbra={1} intensity={0.5} color="#ffffff" castShadow />
          <hemisphereLight intensity={0.3} groundColor="#444444" />

          {children}

          {shadows && <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={12} blur={2.5} far={4.5} />}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
})

export function FloatingElement({
  children,
  speed = 1,
  floatIntensity = 1,
  rotationIntensity = 0.2,
}: {
  children: ReactNode
  speed?: number
  floatIntensity?: number
  rotationIntensity?: number
}) {
  return (
    <Float speed={speed} floatIntensity={floatIntensity} rotationIntensity={rotationIntensity}>
      {children}
    </Float>
  )
}
