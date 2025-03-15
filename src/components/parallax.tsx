
import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

type ParallaxProps = {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export function Parallax({ children, className = "", speed = 0.5, direction = "up" }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up"
      ? ["0%", `${-speed * 100}%`]
      : direction === "down"
        ? ["0%", `${speed * 100}%`]
        : direction === "left"
          ? ["0%", `${-speed * 100}%`]
          : ["0%", `${speed * 100}%`],
  )

  const style = direction === "up" || direction === "down" ? { y: transform } : { x: transform }

  return (
    <motion.div ref={ref} className={className} style={style}>
      {children}
    </motion.div>
  )
}

