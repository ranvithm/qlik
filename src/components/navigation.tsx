"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Menu, ExternalLink } from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { FaNpm } from "react-icons/fa6";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Documentation", href: "/docs" },
  { name: "API Reference", href: "/api" },
  { name: "Examples", href: "/examples" },
];

const externalLinks = [
  {
    name: "npm Package",
    href: "https://www.npmjs.com/package/qlik",
    icon: FaNpm,
  },
  { name: "GitHub", href: "https://github.com/ranvithm/qlik", icon: FiGithub },
];

export function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <div className="mr-4 flex">
          <Link
            className="mr-6 flex items-center space-x-2 group transition-transform hover:scale-105"
            href="/"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm group-hover:shadow-md transition-shadow">
              <span className="text-sm font-bold text-primary-foreground">
                Q
              </span>
            </div>
            <span className="font-bold text-foreground group-hover:text-primary transition-colors sm:inline-block">
              Qlik SDK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 rounded-md transition-all duration-200",
                  "hover:text-foreground hover:bg-accent/50",
                  pathname === item.href
                    ? "text-foreground bg-accent font-medium"
                    : "text-foreground/70"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-primary rounded-full animate-scale-in" />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Search component placeholder */}
          </div>

          {/* Desktop External Links and Theme Switcher */}
          <nav className="hidden md:flex items-center space-x-1">
            <ThemeSwitcher />
            {externalLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="icon"
                asChild
                className="hover-lift"
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <link.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover-lift">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle className="text-left">Navigation</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Mobile Navigation Links */}
                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg transition-all duration-200",
                        "hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground font-medium border-l-4 border-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile Theme Switcher */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="px-4 text-sm font-medium text-muted-foreground">
                    Settings
                  </h4>
                  <div className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        Theme
                      </span>
                      <ThemeSwitcher />
                    </div>
                  </div>
                </div>

                {/* Mobile External Links */}
                <div className="space-y-2 pt-4 border-t">
                  <h4 className="px-4 text-sm font-medium text-muted-foreground">
                    External Links
                  </h4>
                  {externalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                    >
                      <link.icon className="h-4 w-4 mr-3" />
                      {link.name}
                      <ExternalLink className="h-3 w-3 ml-auto" />
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
