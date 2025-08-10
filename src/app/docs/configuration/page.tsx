import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Cloud, Server, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Configuration",
  description: "Configure the Qlik TypeScript SDK for your environment",
}

export default function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Configuration"
        description="Configure the Qlik TypeScript SDK for different environments and use cases."
      />

      {/* Constructor Options */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Constructor Options
        </h2>
        
        <p className="text-muted-foreground">
          The Qlik constructor accepts a configuration object with the following options:
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Required Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">host: string</Badge>
                  <Badge variant="destructive" className="text-xs">Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  The hostname of your Qlik environment.
                </p>
                <CodeBlock language="typescript">
{`// Qlik Cloud
host: 'your-tenant.us.qlikcloud.com'

// Qlik Sense Enterprise  
host: 'qlik-server.company.com'`}
                </CodeBlock>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-mono">webIntegrationId: string</Badge>
                  <Badge variant="secondary" className="text-xs">Qlik Cloud only</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your Web Integration ID from the Qlik Cloud Management Console.
                </p>
                <CodeBlock language="typescript">
{`webIntegrationId: 'abcd1234-5678-90ef-ghij-klmnopqrstuv'`}
                </CodeBlock>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Optional Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">port: number</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Custom port number. Defaults to 443 for HTTPS, 80 for HTTP.
                  </p>
                  <CodeBlock language="typescript">
{`port: 4848 // Common for Qlik Sense Enterprise`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">prefix: string</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Virtual proxy prefix for Qlik Sense Enterprise.
                  </p>
                  <CodeBlock language="typescript">
{`prefix: '/my-virtual-proxy'`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">secure: boolean</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use HTTPS. Defaults to true.
                  </p>
                  <CodeBlock language="typescript">
{`secure: false // Only for development environments`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-xs">identity: string</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    User identity for authentication context.
                  </p>
                  <CodeBlock language="typescript">
{`identity: 'DOMAIN\\username' // Enterprise
identity: 'user@company.com' // Cloud`}
                  </CodeBlock>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Environment Examples */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Environment Examples</h2>
        
        <Tabs defaultValue="cloud" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cloud" className="flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Qlik Cloud
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Enterprise
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="cloud" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-blue-500" />
                  Production Qlik Cloud Setup
                </CardTitle>
                <CardDescription>
                  Configuration for production Qlik Cloud environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'company-prod.us.qlikcloud.com',
  webIntegrationId: process.env.QLIK_WEB_INTEGRATION_ID,
  identity: userSession.email,
  // Additional security options
  secure: true
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enterprise" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-green-500" />
                  Development Qlik Enterprise Setup
                </CardTitle>
                <CardDescription>
                  Configuration for on-premise development environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'qlik-dev.company.local',
  port: 4848,
  prefix: '/dev-proxy',
  secure: false, // Only for internal development
  identity: process.env.QLIK_USER_IDENTITY
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Environment Variables */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Environment Variables
        </h2>
        
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/50">
          <CardHeader>
            <CardTitle className="text-amber-800 dark:text-amber-200">Recommended Setup</CardTitle>
            <CardDescription className="text-amber-700 dark:text-amber-300">
              Create a .env file for sensitive configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="bash">
{`# .env
QLIK_HOST=your-tenant.us.qlikcloud.com
QLIK_WEB_INTEGRATION_ID=your-web-integration-id
QLIK_USER_IDENTITY=user@company.com`}
            </CodeBlock>
            
            <CodeBlock language="typescript">
{`// Use in your application
const qlik = new Qlik({
  host: process.env.QLIK_HOST,
  webIntegrationId: process.env.QLIK_WEB_INTEGRATION_ID,
  identity: process.env.QLIK_USER_IDENTITY
});`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Best Practices</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-red-600 dark:text-red-400">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Never commit Web Integration IDs to version control</div>
              <div>• Use environment variables for sensitive configuration</div>
              <div>• Enable HTTPS in production environments</div>
              <div>• Validate user identity before authentication</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div>• Reuse Qlik instances across your application</div>
              <div>• Configure appropriate timeout values</div>
              <div>• Use connection pooling for high-traffic applications</div>
              <div>• Cache authentication tokens when possible</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}