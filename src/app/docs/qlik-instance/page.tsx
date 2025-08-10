import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Database, Zap, Shield, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Qlik Instance",
  description: "Understanding the Qlik SDK instance and its lifecycle",
}

export default function QlikInstancePage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Qlik Instance"
        description="Learn about the Qlik SDK instance, its lifecycle, and how to manage it effectively in your applications."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Instance Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The Qlik instance is the main entry point for interacting with Qlik environments. 
            It manages authentication, connection state, and provides access to all Qlik APIs.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Key Responsibilities</h4>
              <div className="text-sm space-y-1">
                <div>• Authentication and session management</div>
                <div>• Connection to Qlik environment</div>
                <div>• API endpoint access</div>
                <div>• Error handling and recovery</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold">Instance State</h4>
              <div className="text-sm space-y-1">
                <div>• <Badge variant="secondary" className="text-xs">Connected</Badge> Ready for operations</div>
                <div>• <Badge variant="outline" className="text-xs">Connecting</Badge> Establishing connection</div>
                <div>• <Badge variant="destructive" className="text-xs">Disconnected</Badge> No active connection</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Creating Instances */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Creating Instances</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Instance Creation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`import Qlik from 'qlik';

// Create a new Qlik instance
const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});

// The instance is ready to use
console.log('Qlik instance created:', qlik);`}
            </CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Multiple Instances</CardTitle>
            <CardDescription>
              You can create multiple instances for different environments or tenants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`// Development environment
const qlikDev = new Qlik({
  host: 'dev-tenant.us.qlikcloud.com',
  webIntegrationId: process.env.DEV_WEB_INTEGRATION_ID
});

// Production environment  
const qlikProd = new Qlik({
  host: 'prod-tenant.us.qlikcloud.com',
  webIntegrationId: process.env.PROD_WEB_INTEGRATION_ID
});

// Use different instances for different purposes
const devApps = await qlikDev.getAppList();
const prodApps = await qlikProd.getAppList();`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Instance Methods */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Instance Methods
        </h2>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connection Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Check Connection Status</h4>
                <CodeBlock language="typescript">
{`// Check if instance is connected and authenticated
const isConnected = await qlik.isAuthenticated();

if (isConnected) {
  console.log('✅ Connected and ready');
  // Proceed with operations
} else {
  console.log('❌ Not connected, authentication required');
  await qlik.authenticateToQlik();
}`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Manual Connection</h4>
                <CodeBlock language="typescript">
{`// Explicit authentication
try {
  await qlik.authenticateToQlik();
  console.log('Authentication successful');
} catch (error) {
  console.error('Authentication failed:', error);
  // Handle authentication failure
}`}
                </CodeBlock>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instance Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="typescript">
{`// Get instance configuration
console.log('Host:', qlik.config.host);
console.log('Secure:', qlik.config.secure);
console.log('Port:', qlik.config.port);

// Get connection info (after authentication)
const connectionInfo = await qlik.getConnectionInfo();
console.log('User ID:', connectionInfo.userId);
console.log('Tenant ID:', connectionInfo.tenantId);`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Instance Lifecycle */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Instance Lifecycle
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lifecycle Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`class QlikService {
  private qlik: Qlik | null = null;

  async initialize(): Promise<void> {
    // Create instance
    this.qlik = new Qlik({
      host: process.env.QLIK_HOST!,
      webIntegrationId: process.env.QLIK_WEB_INTEGRATION_ID!
    });

    // Authenticate
    await this.qlik.authenticateToQlik();
    console.log('✅ Qlik service initialized');
  }

  async checkHealth(): Promise<boolean> {
    if (!this.qlik) return false;
    
    try {
      return await this.qlik.isAuthenticated();
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async reconnect(): Promise<void> {
    if (!this.qlik) {
      throw new Error('Qlik instance not initialized');
    }

    try {
      await this.qlik.authenticateToQlik();
      console.log('✅ Reconnected successfully');
    } catch (error) {
      console.error('❌ Reconnection failed:', error);
      throw error;
    }
  }

  async cleanup(): Promise<void> {
    if (this.qlik) {
      await this.qlik.logout();
      this.qlik = null;
      console.log('✅ Qlik service cleaned up');
    }
  }

  getInstance(): Qlik {
    if (!this.qlik) {
      throw new Error('Qlik service not initialized');
    }
    return this.qlik;
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Best Practices
        </h2>
        
        <div className="grid gap-4">
          <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">✅ Do&apos;s</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <div>• Reuse Qlik instances across your application</div>
              <div>• Implement proper error handling for authentication</div>
              <div>• Check connection status before making API calls</div>
              <div>• Use singleton pattern for single-tenant applications</div>
              <div>• Implement reconnection logic for long-running applications</div>
              <div>• Clean up instances when no longer needed</div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50">
            <CardHeader>
              <CardTitle className="text-red-800 dark:text-red-200">❌ Don&apos;ts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-red-700 dark:text-red-300">
              <div>• Don&apos;t create new instances for every operation</div>
              <div>• Don&apos;t ignore authentication failures</div>
              <div>• Don&apos;t hardcode sensitive configuration values</div>
              <div>• Don&apos;t assume the instance is always connected</div>
              <div>• Don&apos;t forget to handle session expiration</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Error Handling</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Robust Error Handling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`import Qlik, { QlikError, QlikAuthError } from 'qlik';

class RobustQlikService {
  private qlik: Qlik;
  private maxRetries = 3;

  constructor(config: QlikConfig) {
    this.qlik = new Qlik(config);
  }

  async withRetry<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        // Check authentication before operation
        if (!(await this.qlik.isAuthenticated())) {
          await this.qlik.authenticateToQlik();
        }

        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (error instanceof QlikAuthError) {
          console.log(\`Authentication error (attempt \${attempt}): \${error.message}\`);
          // Try to re-authenticate
          await this.qlik.authenticateToQlik();
        } else if (error instanceof QlikError) {
          console.log(\`Qlik error (attempt \${attempt}): \${error.message}\`);
          if (attempt === this.maxRetries) break;
        } else {
          // Network or other errors
          console.log(\`Unexpected error (attempt \${attempt}): \${error.message}\`);
          if (attempt === this.maxRetries) break;
        }

        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }

    throw new Error(\`Operation failed after \${this.maxRetries} attempts: \${lastError.message}\`);
  }

  async getApps() {
    return this.withRetry(() => this.qlik.getAppList());
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}