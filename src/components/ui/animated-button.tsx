"use client"

import { motion } from "framer-motion"
import { ReactNode, forwardRef } from "react"
import { VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./button"

interface AnimatedButtonProps extends 
  React.ComponentProps<"button">,
  VariantProps<typeof buttonVariants> {
  children: ReactNode
  rippleEffect?: boolean
  magneticEffect?: boolean
  glowOnHover?: boolean
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    className, 
    rippleEffect = true,
    magneticEffect = false,
    glowOnHover = false,
    ...props 
  }, ref) => {
    return (
      <motion.div
        className="relative inline-block"
        whileHover={magneticEffect ? { scale: 1.05 } : undefined}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2, ease: [0.25, 0.25, 0, 1] }}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            rippleEffect && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
            glowOnHover && "hover:shadow-lg hover:shadow-primary/25",
            className
          )}
          {...props}
        >
          <motion.span
            className="relative z-10 flex items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {children}
          </motion.span>
          
          {/* Ripple effect background */}
          {rippleEffect && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 translate-x-[-100%]"
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          )}
        </Button>
      </motion.div>
    )
  }
)

AnimatedButton.displayName = "AnimatedButton"

// Pulse button variant
export const PulseButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.div
        animate={{
          scale: [1, 1.02, 1],
          transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }
        }}
      >
        <Button
          ref={ref}
          className={cn(
            "relative overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:shadow-primary/25",
            className
          )}
          {...props}
        >
          <motion.span
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.span>
          
          {/* Pulse ring effect */}
          <motion.div
            className="absolute inset-0 border-2 border-primary rounded-md opacity-75"
            animate={{
              scale: [1, 1.5],
              opacity: [0.75, 0],
              transition: {
                duration: 1.5,
                ease: "easeOut",
                repeat: Infinity
              }
            }}
          />
        </Button>
      </motion.div>
    )
  }
)

PulseButton.displayName = "PulseButton"

// Loading button with spinner animation
export const LoadingButton = forwardRef<
  HTMLButtonElement, 
  AnimatedButtonProps & { loading?: boolean }
>(({ children, loading = false, className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      disabled={loading || props.disabled}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        className
      )}
      {...props}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={loading ? { opacity: 0.7 } : { opacity: 1 }}
      >
        {loading && (
          <motion.div
            className="h-4 w-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        <motion.span
          animate={loading ? { x: 10 } : { x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>
      </motion.div>
    </Button>
  )
})

LoadingButton.displayName = "LoadingButton"