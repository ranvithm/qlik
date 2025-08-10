"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themes = [
  { name: "Light", value: "light", icon: Sun },
  { name: "Dark", value: "dark", icon: Moon },
  { name: "System", value: "system", icon: Monitor },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-4 w-4 animate-pulse bg-muted rounded" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = themes.find(t => t.value === theme) || themes[2]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 hover-lift focus-animate relative overflow-hidden group"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <currentTheme.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle background animation on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
          
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="animate-fade-in-down bg-background/95 backdrop-blur-md border shadow-lg"
        sideOffset={8}
      >
        {themes.map((themeOption, index) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`
              relative cursor-pointer transition-all duration-200 group
              hover:bg-accent hover:text-accent-foreground
              ${theme === themeOption.value ? 'bg-accent/50 text-accent-foreground font-medium' : ''}
            `}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.05,
                duration: 0.3,
                ease: "easeOut"
              }}
              className="flex items-center gap-2 w-full"
            >
              <themeOption.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span>{themeOption.name}</span>
              
              {theme === themeOption.value && (
                <motion.div
                  layoutId="activeTheme"
                  className="absolute left-0 top-0 h-full w-1 bg-primary rounded-full"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}