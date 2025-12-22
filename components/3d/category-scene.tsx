"use client"

import { SceneWrapper } from "./scene-wrapper"
import { CategoryIcon3D } from "./category-icon"
import { memo } from "react"

interface CategorySceneProps {
  type: "sedan" | "suv" | "mpv" | "hatchback" | "sport"
  color?: string
  className?: string
}

export const CategoryScene = memo(function CategoryScene({
  type,
  color = "#ef4444",
  className = "",
}: CategorySceneProps) {
  return (
    <div className={`w-full h-32 ${className}`}>
      <SceneWrapper shadows={true} environment="city" cameraPosition={[3, 1.5, 3]} fov={40}>
        <CategoryIcon3D type={type} color={color} scale={0.55} />
      </SceneWrapper>
    </div>
  )
})
