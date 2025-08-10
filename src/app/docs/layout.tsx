"use client"

import { useState } from "react"
import { DocsSidebar } from "@/components/docs-sidebar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      {/* Mobile Menu Button */}
      <div className="fixed top-20 left-4 z-40 md:hidden">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="hover-lift btn-animate">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <div className="h-full py-6 px-6 overflow-y-auto">
              <DocsSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-4rem)] w-full shrink-0 md:sticky md:block">
        <div className="h-full py-6 pl-8 pr-6 lg:py-8 overflow-y-auto">
          <DocsSidebar />
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px] page-transition">
        <div className="mx-auto w-full min-w-0 px-4 md:px-0">
          {children}
        </div>
        {/* Table of Contents Placeholder */}
        <div className="hidden xl:block">
          <div className="sticky top-20 h-fit">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">On this page</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="hover:text-foreground cursor-pointer transition-colors">Overview</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Getting Started</div>
                <div className="hover:text-foreground cursor-pointer transition-colors">Examples</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}