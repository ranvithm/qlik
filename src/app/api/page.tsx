import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "API Reference",
  description: "Complete API documentation for the Qlik TypeScript SDK",
}

export default function APIPage() {
  return (
    <div className="container mx-auto max-w-6xl py-6 lg:py-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">API Reference</h1>
          <p className="text-xl text-muted-foreground">
            Complete reference documentation for the Qlik TypeScript SDK.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Constructor */}
          <Card id="constructor">
            <CardHeader>
              <CardTitle className="text-2xl">Constructor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <code className="text-base">new Qlik(config)</code>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Creates a new Qlik SDK instance with the specified configuration.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded">
                        <Badge variant="outline">config</Badge>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-sm">QlikConfig</span>
                            <Badge variant="destructive" className="text-xs">Required</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Configuration object</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Returns</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">Qlik</Badge>
                      <span className="text-sm text-muted-foreground">New Qlik instance</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example</h4>
                    <CodeBlock language="typescript">
{`const qlik = new Qlik({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});`}
                    </CodeBlock>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Type Definition</h4>
                    <CodeBlock language="typescript">
{`interface QlikConfig {
  host: string;
  webIntegrationId?: string;
  port?: number;
  prefix?: string;
  secure?: boolean;
  identity?: string;
}`}
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Methods */}
          <Card id="authentication">
            <CardHeader>
              <CardTitle className="text-2xl">Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="authenticate" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="authenticate">authenticateToQlik()</TabsTrigger>
                  <TabsTrigger value="isAuthenticated">isAuthenticated()</TabsTrigger>
                  <TabsTrigger value="logout">logout()</TabsTrigger>
                </TabsList>
                
                <TabsContent value="authenticate" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      <code className="text-base">authenticateToQlik()</code>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Initiates authentication flow with Qlik environment.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Returns</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Promise&lt;void&gt;</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Throws</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">QlikAuthError</Badge>
                          <span className="text-sm text-muted-foreground">When authentication fails</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Example</h4>
                        <CodeBlock language="typescript">
{`try {
  await qlik.authenticateToQlik();
  console.log('Authenticated successfully');
} catch (error) {
  console.error('Authentication failed:', error.message);
}`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="isAuthenticated" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      <code className="text-base">isAuthenticated()</code>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Checks current authentication status.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Returns</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Promise&lt;boolean&gt;</Badge>
                          <span className="text-sm text-muted-foreground">True if authenticated</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Example</h4>
                        <CodeBlock language="typescript">
{`const isAuth = await qlik.isAuthenticated();
if (isAuth) {
  // User is authenticated
  const apps = await qlik.getAppList();
}`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="logout" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      <code className="text-base">logout()</code>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Logs out the current user and clears session.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Returns</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Promise&lt;void&gt;</Badge>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Example</h4>
                        <CodeBlock language="typescript">
{`await qlik.logout();
// User is now logged out`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Apps & Spaces */}
          <Card id="apps-spaces">
            <CardHeader>
              <CardTitle className="text-2xl">Apps & Spaces</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="getAppList" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="getAppList">getAppList()</TabsTrigger>
                  <TabsTrigger value="getApp">getApp()</TabsTrigger>
                  <TabsTrigger value="getSpaceList">getSpaceList()</TabsTrigger>
                </TabsList>
                
                <TabsContent value="getAppList" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      <code className="text-base">getAppList()</code>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Retrieves list of accessible applications.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Returns</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Promise&lt;QlikApp[]&gt;</Badge>
                          <span className="text-sm text-muted-foreground">Array of app objects</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Example</h4>
                        <CodeBlock language="typescript">
{`const apps = await qlik.getAppList();
apps.forEach(app => {
  console.log(\`App: \${app.name} (ID: \${app.id})\`);
});`}
                        </CodeBlock>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Return Type</h4>
                        <CodeBlock language="typescript">
{`interface QlikApp {
  id: string;
  name: string;
  description?: string;
  published: boolean;
  publishTime?: string;
  owner: {
    id: string;
    name: string;
  };
}`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="getApp" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      <code className="text-base">getApp(appId)</code>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Opens a specific application for interaction.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Parameters</h4>
                        <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded">
                          <Badge variant="outline">appId</Badge>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-sm">string</span>
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Application identifier</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Returns</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Promise&lt;QlikAppInstance&gt;</Badge>
                          <span className="text-sm text-muted-foreground">App instance for further operations</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Throws</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">QlikAppError</Badge>
                          <span className="text-sm text-muted-foreground">When app cannot be opened</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Example</h4>
                        <CodeBlock language="typescript">
{`const app = await qlik.getApp('app-id-12345');
const sheets = await app.getSheets();`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="getSpaceList" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      <code className="text-base">getSpaceList()</code>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Retrieves available spaces (Qlik Cloud only).
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Returns</h4>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">Promise&lt;QlikSpace[]&gt;</Badge>
                          <span className="text-sm text-muted-foreground">Array of space objects</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Example</h4>
                        <CodeBlock language="typescript">
{`const spaces = await qlik.getSpaceList();
const personalSpace = spaces.find(space => space.type === 'personal');`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Data Operations */}
          <Card id="data-operations">
            <CardHeader>
              <CardTitle className="text-2xl">Data Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  <code className="text-base">createSessionObject(definition)</code>
                </h3>
                <p className="text-muted-foreground mb-4">
                  Creates a session object for data analysis and visualization.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Parameters</h4>
                    <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded">
                      <Badge variant="outline">definition</Badge>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">ObjectDefinition</span>
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Object definition with dimensions and measures</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Example</h4>
                    <CodeBlock language="typescript">
{`const sessionObject = await app.createSessionObject({
  qInfo: { qType: 'my-chart' },
  qHyperCubeDef: {
    qDimensions: [
      { qDef: { qFieldDefs: ['Product'] } }
    ],
    qMeasures: [
      { qDef: { qDef: 'Sum(Sales)' } }
    ]
  }
});`}
                    </CodeBlock>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}