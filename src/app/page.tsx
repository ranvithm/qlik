import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { AnimatedCardContent, AnimatedCardDescription, AnimatedCardHeader, AnimatedCardTitle } from "@/components/ui/animated-card"
import { AnimatedCardEnhanced } from "@/components/ui/animated-card-enhanced"
import { AnimatedButton } from "@/components/ui/animated-button"
import { PageTransition, SectionReveal, StaggerContainer, StaggerItem } from "@/components/page-transition"
import { SectionHeader } from "@/components/ui/section-header"
import { GradientBackground } from "@/components/ui/gradient-background"
import { 
  Shield, 
  Cloud, 
  Code, 
  Zap, 
  Database, 
  Users, 
  ArrowRight,
  Star,
  Download,
  GitFork
} from "lucide-react"

export default function Home() {
  return (
    <PageTransition className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <GradientBackground className="relative">
        <section className="py-16 sm:py-24 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-5xl text-center">
              <div className="animate-fade-in-down">
                <Badge variant="secondary" className="mb-6 hover-lift btn-animate">
                  <Star className="h-3 w-3 mr-1" />
                  Now available v5.0.0
                </Badge>
              </div>
              <SectionHeader
                title="Qlik TypeScript SDK"
                description="The official TypeScript SDK for seamless integration with Qlik Sense Enterprise and Qlik Cloud. Build powerful analytics applications with type-safe APIs and modern developer experience."
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  <AnimatedButton 
                    size="lg" 
                    className="group min-w-[140px]" 
                    rippleEffect 
                    glowOnHover
                  >
                    <Link href="/docs" className="flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="outline" 
                    size="lg" 
                    className="min-w-[140px]"
                    magneticEffect
                  >
                    <Link href="/examples">View Examples</Link>
                  </AnimatedButton>
                </div>
                
                {/* Stats */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-10 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 animate-fade-in-up delay-100">
                    <Download className="h-4 w-4 text-primary" />
                    <span className="font-medium">50k+ downloads</span>
                  </div>
                  <div className="flex items-center gap-2 animate-fade-in-up delay-200">
                    <Star className="h-4 w-4 text-primary" />
                    <span className="font-medium">TypeScript first</span>
                  </div>
                  <div className="flex items-center gap-2 animate-fade-in-up delay-300">
                    <GitFork className="h-4 w-4 text-primary" />
                    <span className="font-medium">Open source</span>
                  </div>
                </div>
              </SectionHeader>
            </div>
          </div>
        </section>
      </GradientBackground>

      {/* Quick Start Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <SectionReveal className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Get started in seconds</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Install the package and start building with just a few lines of code
              </p>
            </SectionReveal>
            <SectionReveal delay={0.2} className="space-y-6">
              <CodeBlock language="bash">
                npm install qlik
              </CodeBlock>
              <CodeBlock language="typescript">
{`import Qlik from 'qlik';

const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});

// Authenticate and start building
await qlik.authenticateToQlik();
const apps = await qlik.getAppList();`}
              </CodeBlock>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Everything you need</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive features for building modern Qlik integrations
            </p>
          </div>
          <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <StaggerItem>
              <AnimatedCardEnhanced className="group h-full" glowOnHover>
                <AnimatedCardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCardTitle className="text-xl">🔐 Smart Authentication</AnimatedCardTitle>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <AnimatedCardDescription>
                    Popup and session monitoring with persistent authentication management across your applications.
                  </AnimatedCardDescription>
                </AnimatedCardContent>
              </AnimatedCardEnhanced>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCardEnhanced className="group h-full" glowOnHover>
                <AnimatedCardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Cloud className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCardTitle className="text-xl">☁️ Multi-Platform Support</AnimatedCardTitle>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <AnimatedCardDescription>
                    Works seamlessly with both Qlik Cloud (SaaS) and Qlik Sense Enterprise environments.
                  </AnimatedCardDescription>
                </AnimatedCardContent>
              </AnimatedCardEnhanced>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCardEnhanced className="group h-full" glowOnHover>
                <AnimatedCardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCardTitle className="text-xl">📊 Complete API Coverage</AnimatedCardTitle>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <AnimatedCardDescription>
                    Full access to apps, sheets, objects, data models, and user management APIs.
                  </AnimatedCardDescription>
                </AnimatedCardContent>
              </AnimatedCardEnhanced>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCardEnhanced className="group h-full" glowOnHover>
                <AnimatedCardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCardTitle className="text-xl">🎯 TypeScript First</AnimatedCardTitle>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <AnimatedCardDescription>
                    Built with TypeScript for complete type safety and excellent developer experience.
                  </AnimatedCardDescription>
                </AnimatedCardContent>
              </AnimatedCardEnhanced>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCardEnhanced className="group h-full" glowOnHover>
                <AnimatedCardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCardTitle className="text-xl">🚀 Universal Modules</AnimatedCardTitle>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <AnimatedCardDescription>
                    Supports ESM, CommonJS, and UMD for maximum compatibility across all environments.
                  </AnimatedCardDescription>
                </AnimatedCardContent>
              </AnimatedCardEnhanced>
            </StaggerItem>

            <StaggerItem>
              <AnimatedCardEnhanced className="group h-full" glowOnHover>
                <AnimatedCardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <AnimatedCardTitle className="text-xl">💾 Session Management</AnimatedCardTitle>
                </AnimatedCardHeader>
                <AnimatedCardContent>
                  <AnimatedCardDescription>
                    Intelligent session persistence and automatic token refresh for seamless user experience.
                  </AnimatedCardDescription>
                </AnimatedCardContent>
              </AnimatedCardEnhanced>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 sm:grid-cols-3 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold">v5.0.0</div>
                <div className="text-sm text-muted-foreground">Latest Version</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">TypeScript</div>
                <div className="text-sm text-muted-foreground">Built With</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold">MIT</div>
                <div className="text-sm text-muted-foreground">License</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of developers building amazing analytics applications with Qlik SDK.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/docs">
                  Read the Documentation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="https://github.com/qlik/qlik-sdk" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
