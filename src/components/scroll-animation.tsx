"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, type Variant } from "framer-motion"

type AnimationVariants = {
  hidden: Variant
  visible: Variant
}

type ScrollAnimationProps = {
  children: React.ReactNode
  className?: string
  variants?: AnimationVariants
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
}

const defaultVariants: AnimationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export function ScrollAnimation({
  children,
  className = "",
  variants = defaultVariants,
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
}: ScrollAnimationProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          controls.start("visible")
          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsInView(false)
          controls.start("hidden")
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
  }, [controls, once, threshold])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeIn(props: Omit<ScrollAnimationProps, "variants">) {
  return (
    <ScrollAnimation
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      {...props}
    />
  )
}

export function FadeInUp(props: Omit<ScrollAnimationProps, "variants">) {
  return (
    <ScrollAnimation
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      {...props}
    />
  )
}

export function FadeInDown(props: Omit<ScrollAnimationProps, "variants">) {
  return (
    <ScrollAnimation
      variants={{
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
      }}
      {...props}
    />
  )
}

export function FadeInLeft(props: Omit<ScrollAnimationProps, "variants">) {
  return (
    <ScrollAnimation
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      }}
      {...props}
    />
  )
}

export function FadeInRight(props: Omit<ScrollAnimationProps, "variants">) {
  return (
    <ScrollAnimation
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      {...props}
    />
  )
}

export function ScaleIn(props: Omit<ScrollAnimationProps, "variants">) {
  return (
    <ScrollAnimation
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      }}
      {...props}
    />
  )
}

export function RotateIn(props: Omit<ScrollAnimationProps, "variants">) {
  return (
    <ScrollAnimation
      variants={{
        hidden: { opacity: 0, rotate: -10 },
        visible: { opacity: 1, rotate: 0 },
      }}
      {...props}
    />
  )
}

