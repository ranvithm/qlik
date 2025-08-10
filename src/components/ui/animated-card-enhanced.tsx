"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode
  className?: string
  hoverScale?: number
  hoverY?: number
  glowOnHover?: boolean
}

export const AnimatedCardEnhanced = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ 
    children, 
    className,
    hoverScale = 1.02,
    hoverY = -4,
    glowOnHover = false,
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
          "transition-all duration-300 ease-out cursor-pointer",
          glowOnHover && "hover:shadow-lg hover:shadow-primary/10",
          className
        )}
        whileHover={{ 
          scale: hoverScale,
          y: hoverY,
          transition: { duration: 0.2, ease: [0.25, 0.25, 0, 1] }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { duration: 0.1 }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4, ease: [0.25, 0.25, 0, 1] }
        }}
        {...props}
      >
        {/* Subtle background glow effect */}
        {glowOnHover && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 rounded-lg"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10"
          whileHover={{ x: "200%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    )
  }
)

AnimatedCardEnhanced.displayName = "AnimatedCardEnhanced"

// Floating card variant with subtle bounce
export const FloatingCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-lg border bg-card text-card-foreground shadow-md",
          "transition-all duration-300 ease-out",
          className
        )}
        animate={{
          y: [0, -5, 0],
          opacity: 1,
          scale: 1,
          transition: {
            y: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            },
            opacity: { duration: 0.5, ease: [0.25, 0.25, 0, 1] },
            scale: { duration: 0.5, ease: [0.25, 0.25, 0, 1] }
          }
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        {...props}
      >
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Subtle shadow animation */}
        <motion.div
          className="absolute -bottom-2 left-1/2 w-full h-4 bg-black/5 dark:bg-white/5 rounded-full blur-md transform -translate-x-1/2"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            transition: {
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </motion.div>
    )
  }
)

FloatingCard.displayName = "FloatingCard"

// Card with magnetic hover effect
export const MagneticCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-lg border bg-card text-card-foreground shadow-sm",
          "transition-all duration-300 ease-out cursor-pointer",
          className
        )}
        whileHover="hover"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4, ease: [0.25, 0.25, 0, 1] }
        }}
        {...props}
      >
        <motion.div
          variants={{
            hover: {
              scale: 1.03,
              rotateX: 5,
              rotateY: 5,
              transition: { duration: 0.2 }
            }
          }}
          style={{ 
            perspective: 1000,
            transformStyle: "preserve-3d"
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    )
  }
)

MagneticCard.displayName = "MagneticCard"