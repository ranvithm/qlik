import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AnimatedCard, AnimatedCardContent, AnimatedCardDescription, AnimatedCardHeader, AnimatedCardTitle } from "@/components/ui/animated-card"
import { SectionHeader } from "@/components/ui/section-header"
import { ArrowRight, Book, Zap, Code, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Complete guide to using the Qlik TypeScript SDK",
}

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Documentation"
        description="Everything you need to build amazing analytics applications with the Qlik TypeScript SDK."
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <AnimatedCard delay={0} className="group">
          <AnimatedCardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <AnimatedCardTitle>Quick Start</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <AnimatedCardDescription className="mb-4">
              Get up and running with the Qlik SDK in minutes. Perfect for developers who want to start building immediately.
            </AnimatedCardDescription>
            <Button asChild className="hover-lift group">
              <Link href="/docs/quick-start">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedCardContent>
        </AnimatedCard>

        <AnimatedCard delay={100} className="group">
          <AnimatedCardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <AnimatedCardTitle>Installation Guide</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <AnimatedCardDescription className="mb-4">
              Detailed installation instructions for different environments and package managers.
            </AnimatedCardDescription>
            <Button variant="outline" asChild className="hover-lift group">
              <Link href="/docs/installation">
                Read Guide
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedCardContent>
        </AnimatedCard>

        <AnimatedCard delay={200} className="group">
          <AnimatedCardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <AnimatedCardTitle>API Reference</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <AnimatedCardDescription className="mb-4">
              Complete API documentation with method signatures, parameters, and return types.
            </AnimatedCardDescription>
            <Button variant="outline" asChild className="hover-lift group">
              <Link href="/api">
                Browse API
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedCardContent>
        </AnimatedCard>

        <AnimatedCard delay={300} className="group">
          <AnimatedCardHeader>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <AnimatedCardTitle>Examples</AnimatedCardTitle>
          </AnimatedCardHeader>
          <AnimatedCardContent>
            <AnimatedCardDescription className="mb-4">
              Real-world examples and integration patterns for popular frameworks and use cases.
            </AnimatedCardDescription>
            <Button variant="outline" asChild className="hover-lift group">
              <Link href="/examples">
                View Examples
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedCardContent>
        </AnimatedCard>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Popular Topics</h2>
        <div className="grid gap-4">
          <Link
            href="/docs/authentication"
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <div>
              <div className="font-medium">Authentication</div>
              <div className="text-sm text-muted-foreground">
                Learn how to authenticate with Qlik Cloud and Qlik Sense Enterprise
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>

          <Link
            href="/docs/apps"
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <div>
              <div className="font-medium">Working with Apps</div>
              <div className="text-sm text-muted-foreground">
                Access and manipulate Qlik apps, sheets, and objects
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>

          <Link
            href="/docs/react-integration"
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
          >
            <div>
              <div className="font-medium">React Integration</div>
              <div className="text-sm text-muted-foreground">
                Build React applications with Qlik SDK components and hooks
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  )
}