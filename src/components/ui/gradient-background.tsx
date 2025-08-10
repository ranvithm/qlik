import { cn } from "@/lib/utils"

interface GradientBackgroundProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "muted"
}

export function GradientBackground({ 
  children, 
  className, 
  variant = "muted" 
}: GradientBackgroundProps) {
  const variants = {
    primary: "bg-gradient-to-br from-primary/5 via-background to-primary/10",
    secondary: "bg-gradient-to-br from-secondary/5 via-background to-secondary/10", 
    muted: "bg-gradient-to-br from-muted/30 via-background to-muted/5"
  }

  return (
    <div className={cn(
      "relative overflow-hidden",
      variants[variant],
      className
    )}>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="relative">
        {children}
      </div>
    </div>
  )
}