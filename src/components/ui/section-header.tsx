import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  badge?: string
  className?: string
  children?: React.ReactNode
}

export function SectionHeader({ 
  title, 
  description, 
  badge, 
  className,
  children 
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-2">
        {badge && (
          <div className="animate-fade-in">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-primary/20">
              {badge}
            </span>
          </div>
        )}
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight animate-fade-in-up">
          {title}
        </h1>
        {description && (
          <p className="text-xl text-muted-foreground animate-fade-in-up delay-75">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="animate-fade-in-up delay-100">
          {children}
        </div>
      )}
    </div>
  )
}