"use client"

import { SceneWrapper, FloatingElement } from "./scene-wrapper"
import { Icon3D } from "./icon-3d"
import { memo } from "react"

interface IconSceneProps {
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
  size?: string
  className?: string
}

export const IconScene = memo(function IconScene({
  type,
  color = "#ef4444",
  secondaryColor = "#f59e0b",
  size = "80px",
  className = "",
}: IconSceneProps) {
  return (
    <div className={className} style={{ width: size, height: size }}>
      <SceneWrapper shadows={false} environment="studio">
        <FloatingElement speed={2} floatIntensity={0.4} rotationIntensity={0.15}>
          <Icon3D type={type} color={color} secondaryColor={secondaryColor} scale={0.7} />
        </FloatingElement>
      </SceneWrapper>
    </div>
  )
})
