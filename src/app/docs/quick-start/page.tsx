import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Quick Start",
  description: "Get started with the Qlik TypeScript SDK in minutes",
}

export default function QuickStartPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Quick Start</h1>
        <p className="text-xl text-muted-foreground">
          Get up and running with the Qlik TypeScript SDK in just a few minutes.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Basic Setup</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Import and Initialize</h3>
            <CodeBlock language="typescript">
{`import Qlik from 'qlik';

const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com', // or your on-premise server
  webIntegrationId: 'your-web-integration-id' // Qlik Cloud only
});`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">2. Authenticate</h3>
            <CodeBlock language="typescript">
{`try {
  await qlik.authenticateToQlik();
  console.log('Authentication successful!');
} catch (error) {
  console.error('Authentication failed:', error);
}`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">3. Fetch Your First App</h3>
            <CodeBlock language="typescript">
{`// Get all available apps
const apps = await qlik.getAppList();
console.log('Available apps:', apps);

// Open a specific app
const app = await qlik.getApp('your-app-id');`}
            </CodeBlock>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Environment-Specific Setup</h2>
        
        <Tabs defaultValue="cloud" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cloud">Qlik Cloud</TabsTrigger>
            <TabsTrigger value="enterprise">Qlik Enterprise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cloud" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge>SaaS</Badge>
                  Qlik Cloud Configuration
                </CardTitle>
                <CardDescription>
                  Configuration for Qlik Cloud environments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id',
  // Optional: custom authentication settings
  identity: 'your-user-identity'
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enterprise" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary">On-Premise</Badge>
                  Qlik Sense Enterprise Configuration
                </CardTitle>
                <CardDescription>
                  Configuration for on-premise Qlik Sense Enterprise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'your-qlik-server.company.com',
  port: 4848, // Default is 443
  prefix: '/your-virtual-proxy', // If using virtual proxy
  secure: true, // HTTPS
  // Authentication handled by your infrastructure
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Common Patterns</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Check Authentication Status</h3>
            <CodeBlock language="typescript">
{`if (await qlik.isAuthenticated()) {
  // User is authenticated, proceed with operations
  const spaces = await qlik.getSpaceList();
} else {
  // Redirect to authentication
  await qlik.authenticateToQlik();
}`}
            </CodeBlock>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Error Handling</h3>
            <CodeBlock language="typescript">
{`try {
  const apps = await qlik.getAppList();
  // Process apps
} catch (error) {
  if (error.code === 'AUTHENTICATION_REQUIRED') {
    await qlik.authenticateToQlik();
    // Retry operation
  } else {
    console.error('Unexpected error:', error);
  }
}`}
            </CodeBlock>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Complete Example</h2>
        <p className="text-muted-foreground">
          Here&apos;s a complete example that demonstrates the basic workflow:
        </p>
        
        <CodeBlock language="typescript">
{`import Qlik from 'qlik';

async function initializeQlik() {
  // Initialize the SDK
  const qlik = new Qlik({
    host: process.env.QLIK_HOST,
    webIntegrationId: process.env.QLIK_WEB_INTEGRATION_ID
  });

  try {
    // Authenticate
    console.log('Authenticating...');
    await qlik.authenticateToQlik();
    console.log('✅ Authentication successful');

    // Get apps
    console.log('Fetching apps...');
    const apps = await qlik.getAppList();
    console.log(\`Found \${apps.length} apps\`);

    // Open first app
    if (apps.length > 0) {
      const app = await qlik.getApp(apps[0].id);
      console.log(\`Opened app: \${apps[0].name}\`);
      
      // Get app sheets
      const sheets = await app.getSheets();
      console.log(\`App has \${sheets.length} sheets\`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Initialize when DOM is ready
initializeQlik();`}
        </CodeBlock>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Next Steps</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Learn Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Explore all configuration options for different environments and use cases.
              </CardDescription>
              <a href="/docs/configuration" className="text-primary hover:underline text-sm font-medium">
                Configuration Guide →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Explore Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Deep dive into authentication flows for both Qlik Cloud and Enterprise.
              </CardDescription>
              <a href="/docs/authentication" className="text-primary hover:underline text-sm font-medium">
                Authentication Guide →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>See Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Real-world implementation examples with React, Vue, and Node.js.
              </CardDescription>
              <a href="/examples" className="text-primary hover:underline text-sm font-medium">
                View Examples →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                Complete API documentation with method signatures and parameters.
              </CardDescription>
              <a href="/api" className="text-primary hover:underline text-sm font-medium">
                Browse API →
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}