import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle } from "lucide-react"

export const metadata: Metadata = {
  title: "Installation",
  description: "Install and set up the Qlik TypeScript SDK in your project",
}

export default function InstallationPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Get the Qlik TypeScript SDK installed and running in your project.
        </p>
      </div>

      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-800 dark:text-green-200">Prerequisites</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm text-green-700 dark:text-green-300">
            • Node.js 16+ or modern browser environment
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            • Qlik Sense Enterprise or Qlik Cloud access
          </div>
          <div className="text-sm text-green-700 dark:text-green-300">
            • Web Integration ID (for Qlik Cloud)
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Package Installation</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">npm</h3>
            <CodeBlock language="bash">npm install qlik</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">yarn</h3>
            <CodeBlock language="bash">yarn add qlik</CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">pnpm</h3>
            <CodeBlock language="bash">pnpm add qlik</CodeBlock>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Browser Support</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Supported Browsers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Chrome</Badge>
                <span className="text-sm text-muted-foreground">88+</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Firefox</Badge>
                <span className="text-sm text-muted-foreground">85+</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Safari</Badge>
                <span className="text-sm text-muted-foreground">14+</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Edge</Badge>
                <span className="text-sm text-muted-foreground">88+</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">TypeScript Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                The package includes built-in TypeScript declarations. No additional @types packages required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Verification</h2>
        <p className="text-muted-foreground">
          Verify your installation by importing and initializing the SDK:
        </p>
        
        <CodeBlock language="typescript">
{`import Qlik from 'qlik';

// Verify the import works
console.log('Qlik SDK version:', Qlik.version);

const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com'
});

console.log('✅ Qlik SDK initialized successfully');`}
        </CodeBlock>
      </div>

      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-amber-800 dark:text-amber-200">Important Notes</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
          <p>
            • The SDK requires a secure context (HTTPS) in production environments
          </p>
          <p>
            • Make sure your Web Integration ID is configured correctly for Qlik Cloud
          </p>
          <p>
            • For Qlik Sense Enterprise, ensure your virtual proxy settings allow the SDK origin
          </p>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="space-y-2">
          <p className="text-muted-foreground">
            Now that you have the SDK installed, you can:
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Follow the <a href="/docs/quick-start" className="text-primary hover:underline">Quick Start Guide</a></li>
            <li>Learn about <a href="/docs/configuration" className="text-primary hover:underline">Configuration Options</a></li>
            <li>Set up <a href="/docs/authentication" className="text-primary hover:underline">Authentication</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}