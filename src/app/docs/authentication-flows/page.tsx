import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Workflow, Cloud, Shield, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Authentication Flows",
  description:
    "Understand the different authentication flows supported by the Qlik TypeScript SDK",
};

export default function AuthenticationFlowsPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Authentication Flows"
        description="Learn about the different authentication flows available in the Qlik TypeScript SDK and when to use each one."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            Authentication Flow Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The Qlik SDK supports multiple authentication flows depending on
            your environment and use case. Each flow is optimized for specific
            scenarios and security requirements.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Cloud className="h-3 w-3 mr-1" />
                Qlik Cloud Flows
              </Badge>
              <div className="text-sm space-y-1">
                <div>• OAuth 2.0 with Web Integration ID</div>
                <div>• Popup-based authentication</div>
                <div>• JWT token management</div>
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="secondary" className="w-fit">
                <Shield className="h-3 w-3 mr-1" />
                Enterprise Flows
              </Badge>
              <div className="text-sm space-y-1">
                <div>• Windows Authentication</div>
                <div>• SAML/OIDC Integration</div>
                <div>• Custom Authentication Providers</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cloud Authentication */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Qlik Cloud Authentication
        </h2>

        <Tabs defaultValue="oauth" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="oauth">OAuth 2.0 Flow</TabsTrigger>
            <TabsTrigger value="popup">Popup Flow</TabsTrigger>
          </TabsList>

          <TabsContent value="oauth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  OAuth 2.0 Authorization Code Flow
                </CardTitle>
                <CardDescription>
                  Standard OAuth 2.0 flow for web applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Flow Steps</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs">
                        1
                      </Badge>
                      <div>
                        Client redirects user to Qlik Cloud authorization
                        endpoint
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs">
                        2
                      </Badge>
                      <div>User authenticates with Qlik Cloud credentials</div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs">
                        3
                      </Badge>
                      <div>
                        Qlik Cloud redirects back with authorization code
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs">
                        4
                      </Badge>
                      <div>Client exchanges code for access token</div>
                    </div>
                  </div>
                </div>

                <CodeBlock language="typescript">
                  {`const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});

// Initiate OAuth flow
try {
  await qlik.authenticateToQlik();
  console.log('✅ OAuth authentication successful');
  
  // Access token is now stored and managed automatically
  const apps = await qlik.getAppList();
} catch (error) {
  console.error('OAuth authentication failed:', error);
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Popup Authentication Flow
                </CardTitle>
                <CardDescription>
                  Seamless authentication using popup windows
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Implementation</h4>
                  <CodeBlock language="typescript">
                    {`class QlikPopupAuth {
  private qlik: Qlik;

  constructor(config: QlikConfig) {
    this.qlik = new Qlik(config);
  }

  async authenticateWithPopup(): Promise<void> {
    try {
      // Configure popup options
      const popupOptions = {
        width: 500,
        height: 600,
        centerScreen: true
      };

      await this.qlik.authenticateToQlik(popupOptions);
      console.log('✅ Popup authentication successful');

    } catch (error) {
      if (error.code === 'POPUP_BLOCKED') {
        this.handlePopupBlocked();
      } else if (error.code === 'AUTHENTICATION_CANCELLED') {
        console.log('User cancelled authentication');
      } else {
        console.error('Authentication error:', error);
      }
    }
  }

  private handlePopupBlocked(): void {
    // Show user-friendly message
    alert('Please allow popups for this site to authenticate');
  }
}

// Usage
const authManager = new QlikPopupAuth({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});

await authManager.authenticateWithPopup();`}
                  </CodeBlock>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enterprise Authentication */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Enterprise Authentication
        </h2>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Windows Authentication</CardTitle>
              <CardDescription>
                Integrated Windows Authentication for domain environments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="typescript">
                {`// Windows Authentication with Virtual Proxy
const qlik = new Qlik({
  host: 'qlik-server.company.com',
  port: 4848,
  prefix: '/windows-auth',
  secure: true
});

// Authentication is handled by Windows/IIS
// No explicit authentication call needed
try {
  const apps = await qlik.getAppList();
  console.log('✅ Windows authentication successful');
} catch (error) {
  console.error('Windows authentication failed:', error);
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">SAML Authentication</CardTitle>
              <CardDescription>
                SAML-based single sign-on integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="typescript">
                {`// SAML Authentication Configuration
const qlik = new Qlik({
  host: 'qlik-server.company.com',
  port: 4848,
  prefix: '/saml-proxy',
  secure: true,
  // SAML-specific configuration
  identity: 'user@company.com' // Optional: pre-set user identity
});

// Handle SAML authentication flow
async function authenticateWithSAML() {
  try {
    // Check if already authenticated via SAML
    const isAuthenticated = await qlik.isAuthenticated();
    
    if (!isAuthenticated) {
      // Redirect to SAML IdP will be handled by virtual proxy
      await qlik.authenticateToQlik();
    }
    
    console.log('✅ SAML authentication successful');
  } catch (error) {
    console.error('SAML authentication failed:', error);
  }
}

await authenticateWithSAML();`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Flows */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Advanced Authentication Patterns
        </h2>

        {/* Session Management */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5" />
            Session Management in Flows
          </h2>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Persistent Sessions</CardTitle>
              <CardDescription>
                Maintain authentication across page reloads and app restarts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="typescript">
                {`class PersistentAuthManager {
  private storageKey = 'qlik-auth-token';

  async initializeWithPersistedSession(config: QlikConfig): Promise<Qlik> {
    const qlik = new Qlik(config);

    try {
      // Try to restore previous session
      const savedToken = this.getStoredToken();
      
      if (savedToken) {
        // Validate stored token
        const isValid = await this.validateToken(qlik, savedToken);
        
        if (isValid) {
          console.log('✅ Restored session from storage');
          return qlik;
        } else {
          this.clearStoredToken();
        }
      }

      // No valid stored session, authenticate fresh
      await qlik.authenticateToQlik();
      
      // Store the new token
      const newToken = await qlik.getAccessToken();
      this.storeToken(newToken);
      
      console.log('✅ New session created and stored');
      return qlik;

    } catch (error) {
      console.error('Session initialization failed:', error);
      this.clearStoredToken();
      throw error;
    }
  }

  private getStoredToken(): string | null {
    try {
      return localStorage.getItem(this.storageKey);
    } catch {
      return null; // localStorage not available
    }
  }

  private storeToken(token: string): void {
    try {
      localStorage.setItem(this.storageKey, token);
    } catch {
      // localStorage not available, continue without persistence
    }
  }

  private clearStoredToken(): void {
    try {
      localStorage.removeItem(this.storageKey);
    } catch {
      // localStorage not available
    }
  }

  private async validateToken(qlik: Qlik, token: string): Promise<boolean> {
    try {
      // Set the token and test it
      qlik.setAccessToken(token);
      await qlik.getAppList(); // Simple API call to test token
      return true;
    } catch {
      return false;
    }
  }
}

// Usage
const authManager = new PersistentAuthManager();

const qlik = await authManager.initializeWithPersistedSession({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>

        {/* Best Practices */}
        <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
          <CardHeader>
            <CardTitle className="text-blue-800 dark:text-blue-200">
              🔐 Authentication Flow Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
            <div>
              <strong>Security First:</strong> Always use HTTPS in production
              environments
            </div>
            <div>
              <strong>Error Handling:</strong> Implement comprehensive error
              handling for all authentication scenarios
            </div>
            <div>
              <strong>Token Management:</strong> Securely store and manage
              access tokens
            </div>
            <div>
              <strong>Session Persistence:</strong> Consider user experience
              with session restoration
            </div>
            <div>
              <strong>Multi-Environment:</strong> Support different
              authentication methods per environment
            </div>
            <div>
              <strong>Monitoring:</strong> Log authentication events for
              security and debugging
            </div>
            <div>
              <strong>Popup Blockers:</strong> Provide fallback options when
              popups are blocked
            </div>
            <div>
              <strong>Network Issues:</strong> Handle offline scenarios and
              network timeouts gracefully
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
