"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const docsNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Configuration", href: "/docs/configuration" },
      { title: "Authentication", href: "/docs/authentication" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "Qlik Instance", href: "/docs/qlik-instance" },
      { title: "Working with Apps", href: "/docs/apps" },
      { title: "Authentication Flows", href: "/docs/authentication-flows" },
      { title: "Session Management", href: "/docs/session-management" },
      { title: "Error Handling", href: "/docs/error-handling" },
    ],
  },
  {
    title: "Advanced Topics",
    items: [
      { title: "Data Operations", href: "/docs/data-operations" },
      { title: "Custom Objects", href: "/docs/custom-objects" },
      { title: "Performance", href: "/docs/performance" },
      { title: "Deployment", href: "/docs/deployment" },
    ],
  },
  {
    title: "Integration Guides",
    items: [
      { title: "React Integration", href: "/docs/react-integration" },
      { title: "Vue Integration", href: "/docs/vue-integration" },
      { title: "Angular Integration", href: "/docs/angular-integration" },
      { title: "Node.js Integration", href: "/docs/node-integration" },
    ],
  },
]

interface DocsSidebarProps {
  className?: string
}

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4">
        {docsNav.map((section, index) => (
          <div key={index}>
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
              {section.title}
            </h4>
            {section.items?.length && (
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {section.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      pathname === item.href
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}