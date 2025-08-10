import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  delay?: number
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ className, hover = true, delay = 0, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        "transition-all duration-500 animate-fade-in-up card-hover",
        hover && "hover-lift",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    />
  )
)
AnimatedCard.displayName = "AnimatedCard"

const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardHeader ref={ref} className={cn("", className)} {...props} />
))
AnimatedCardHeader.displayName = "AnimatedCardHeader"

const AnimatedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <CardTitle 
    ref={ref} 
    className={cn("transition-colors group-hover:text-primary", className)} 
    {...props} 
  />
))
AnimatedCardTitle.displayName = "AnimatedCardTitle"

const AnimatedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <CardDescription ref={ref} className={cn("", className)} {...props} />
))
AnimatedCardDescription.displayName = "AnimatedCardDescription"

const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <CardContent ref={ref} className={cn("", className)} {...props} />
))
AnimatedCardContent.displayName = "AnimatedCardContent"

export { 
  AnimatedCard, 
  AnimatedCardHeader, 
  AnimatedCardTitle, 
  AnimatedCardDescription, 
  AnimatedCardContent 
}