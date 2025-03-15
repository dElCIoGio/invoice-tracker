import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

type CountUpProps = {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  threshold?: number
}

// // Define a custom interface for our animation values
// interface AnimationControls {
//   count: number
// }

export function CountUp({
  end,
  duration = 2,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  threshold = 0.1,
}: CountUpProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Type assertion to allow custom properties
          controls.start({
            count: end,
            transition: { duration, delay, ease: "easeOut" },
          } as unknown as CountUpProps)
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
  }, [controls, end, duration, delay, threshold])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ count: 0 } as {count: number}}
      animate={controls}
      onUpdate={(latest) => {
        // Ensure we're working with a number
        const newCount = typeof latest.count === 'number' ? latest.count : 0;
        setCount(newCount)
      }}
    >
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </motion.div>
  )
}

