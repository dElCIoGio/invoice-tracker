
import React from "react"

import { useRef, useEffect } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"

type StaggeredChildrenProps = {
  children: React.ReactNode
  className?: string
  childClassName?: string
  staggerDelay?: number
  duration?: number
  threshold?: number
  childVariants?: {
    hidden: Variant
    visible: Variant
  }
}

export function StaggeredChildren({
  children,
  className = "",
  childClassName = "",
  staggerDelay = 0.1,
  duration = 0.5,
  threshold = 0.1,
  childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
}: StaggeredChildrenProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const childrenArray = React.Children.toArray(children)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible")
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls, threshold])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div ref={ref} className={className} initial="hidden" animate={controls} variants={containerVariants}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          className={childClassName}
          variants={childVariants}
          transition={{ duration, ease: "easeOut" }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

