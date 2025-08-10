import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Lock, Key, AlertTriangle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Authentication",
  description: "Learn how to authenticate with Qlik Cloud and Qlik Sense Enterprise",
}

export default function AuthenticationPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Authentication"
        description="Learn how to authenticate with Qlik Cloud and Qlik Sense Enterprise environments."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The Qlik SDK supports different authentication methods depending on your Qlik environment. 
            Authentication is handled automatically once configured, with support for session management and token refresh.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">Qlik Cloud</Badge>
              <div className="text-sm space-y-1">
                <div>• OAuth 2.0 with Web Integration ID</div>
                <div>• Popup-based authentication flow</div>
                <div>• Automatic token refresh</div>
                <div>• Session persistence</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">Qlik Sense Enterprise</Badge>
              <div className="text-sm space-y-1">
                <div>• Windows Authentication</div>
                <div>• SAML/OIDC integration</div>
                <div>• Virtual proxy configuration</div>
                <div>• Custom authentication providers</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication Methods */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Authentication Methods</h2>
        
        <Tabs defaultValue="cloud" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cloud">Qlik Cloud</TabsTrigger>
            <TabsTrigger value="enterprise">Qlik Enterprise</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cloud" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Web Integration ID Setup
                </CardTitle>
                <CardDescription>
                  Configure OAuth 2.0 authentication for Qlik Cloud
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">1. Create Web Integration in Qlik Cloud</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Navigate to Management Console → Integrations → Web</div>
                    <div>• Click &quot;Create new&quot; and configure your integration</div>
                    <div>• Add your domain to allowed origins</div>
                    <div>• Copy the Web Integration ID</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">2. Initialize SDK</h4>
                  <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">3. Authenticate</h4>
                  <CodeBlock language="typescript">
{`try {
  await qlik.authenticateToQlik();
  console.log('Authentication successful!');
  
  // Now you can make API calls
  const apps = await qlik.getAppList();
} catch (error) {
  console.error('Authentication failed:', error);
}`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-green-800 dark:text-green-200">Authentication Flow</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-green-700 dark:text-green-300">
                <div>1. SDK opens popup window for Qlik Cloud login</div>
                <div>2. User authenticates with their Qlik Cloud credentials</div>
                <div>3. Popup closes and SDK receives authorization code</div>
                <div>4. SDK exchanges code for access token</div>
                <div>5. Token is stored and used for API requests</div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enterprise" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Enterprise Authentication
                </CardTitle>
                <CardDescription>
                  Configure authentication for on-premise environments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Windows Authentication</h4>
                  <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'qlik-server.company.com',
  port: 4848,
  prefix: '/virtual-proxy', // Optional
  secure: true
});

// Authentication handled by Windows/IIS
await qlik.authenticateToQlik();`}
                  </CodeBlock>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Custom Authentication Provider</h4>
                  <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'qlik-server.company.com',
  port: 4848,
  prefix: '/saml-proxy',
  identity: 'DOMAIN\\username'
});`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200">Virtual Proxy Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                <div>• Configure virtual proxy in QMC (Qlik Management Console)</div>
                <div>• Add your application&apos;s URL to allowed origins</div>
                <div>• Set appropriate authentication method (Windows, SAML, OIDC)</div>
                <div>• Configure session timeout and security settings</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Session Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Session Management</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Check Authentication Status</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="typescript">
{`// Check if user is authenticated
const isAuth = await qlik.isAuthenticated();

if (isAuth) {
  // User is authenticated, proceed
  const apps = await qlik.getAppList();
} else {
  // Redirect to authentication
  await qlik.authenticateToQlik();
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Logout</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="typescript">
{`// Logout and clear session
await qlik.logout();

// User is now logged out
// Redirect to login page or show login UI`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Error Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Error Handling</h2>
        
        <Card>
          <CardHeader>
            <CardTitle>Authentication Error Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <CodeBlock language="typescript">
{`import Qlik, { QlikAuthError } from 'qlik';

try {
  await qlik.authenticateToQlik();
} catch (error) {
  if (error instanceof QlikAuthError) {
    switch (error.code) {
      case 'POPUP_BLOCKED':
        // Handle popup blocker
        showPopupBlockedMessage();
        break;
        
      case 'AUTHENTICATION_CANCELLED':
        // User cancelled authentication
        showCancelledMessage();
        break;
        
      case 'INVALID_WEB_INTEGRATION_ID':
        // Configuration error
        showConfigErrorMessage();
        break;
        
      default:
        // Generic authentication error
        showGenericAuthError(error.message);
    }
  } else {
    // Network or other error
    console.error('Unexpected error:', error);
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Troubleshooting */}
      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-amber-800 dark:text-amber-200">Common Issues</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
          <div><strong>Popup Blocked:</strong> Ensure popup blockers are disabled for your domain</div>
          <div><strong>CORS Errors:</strong> Add your domain to allowed origins in Web Integration settings</div>
          <div><strong>Invalid Web Integration ID:</strong> Verify the ID is correct and the integration is active</div>
          <div><strong>Session Expired:</strong> Implement automatic re-authentication using isAuthenticated()</div>
          <div><strong>Network Issues:</strong> Check firewall settings and proxy configuration</div>
        </CardContent>
      </Card>
    </div>
  )
}