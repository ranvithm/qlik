"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 1.02 }}
      transition={{ duration: 0.4, staggerChildren: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual section animation component
export function SectionReveal({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up" 
}: { 
  children: ReactNode
  delay?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}) {
  const getInitialTransform = () => {
    switch (direction) {
      case "up": return { y: 40 }
      case "down": return { y: -40 }
      case "left": return { x: 40 }
      case "right": return { x: -40 }
      default: return { y: 40 }
    }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0,
        ...getInitialTransform()
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0,
        transition: { duration: 0.6, delay }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for animating children sequentially
export function StaggerContainer({ 
  children, 
  className = "",
  delayChildren = 0,
  staggerChildren = 0.1 
}: { 
  children: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{
        delayChildren,
        staggerChildren
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Individual item animation for stagger containers
export function StaggerItem({ 
  children, 
  className = "" 
}: { 
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: 0.95
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5 }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}