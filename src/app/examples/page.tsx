import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export const metadata: Metadata = {
  title: "Examples",
  description: "Browser-based integration examples using the Qlik TypeScript SDK for Qlik Cloud and Enterprise",
}

export default function ExamplesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-6 lg:py-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Examples</h1>
          <p className="text-xl text-muted-foreground">
            Browser-based integration examples for Qlik Cloud and Qlik Sense Enterprise using modern web frameworks.
          </p>
        </div>

        {/* Browser-Only Notice */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">🌐 Browser-Only Examples</h3>
          <p className="text-blue-700 text-sm">
            All examples are designed for <strong>browser environments only</strong>. The Qlik SDK supports modern module formats (ESM, CommonJS, UMD) and works with Qlik Cloud and Qlik Sense Enterprise.
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">All</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Qlik Cloud</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Qlik Enterprise</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Vanilla JS</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">React</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Vue</Badge>
        </div>

        <div className="space-y-8">
          {/* Qlik Cloud Vanilla JS Example */}
          <Card id="qlik-cloud-vanilla">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-2xl">Qlik Cloud Integration with Vanilla JavaScript</CardTitle>
                    <Badge>Qlik Cloud</Badge>
                    <Badge variant="outline">Vanilla JS</Badge>
                  </div>
                  <CardDescription>
                    Connect to Qlik Cloud using vanilla JavaScript with the browser-based SDK. This example demonstrates authentication, app loading, and basic visualization embedding.
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Qlik Cloud authentication</li>
                    <li>• App and object embedding</li>
                    <li>• Session management</li>
                    <li>• Error handling</li>
                    <li>• Responsive layout</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Requirements</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Modern Browser</Badge>
                    <Badge variant="secondary" className="text-xs">Qlik Cloud Tenant</Badge>
                    <Badge variant="secondary" className="text-xs">Web Integration ID</Badge>
                    <Badge variant="secondary" className="text-xs">HTTPS</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">1. Setup HTML Page</h4>
                <CodeBlock language="html">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qlik Cloud Integration</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .chart-container { 
            width: 100%; height: 400px; border: 1px solid #ddd; 
            margin: 20px 0; border-radius: 8px; 
        }
        #status { padding: 10px; border-radius: 4px; margin: 10px 0; }
        .success { background-color: #d4edda; color: #155724; }
        .error { background-color: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Qlik Cloud Dashboard</h1>
        <div id="status">Initializing...</div>
        
        <div class="chart-container" id="chart1">
            <p style="text-align: center; padding: 150px 0; color: #666;">
                Chart will load here...
            </p>
        </div>
        
        <div class="chart-container" id="chart2">
            <p style="text-align: center; padding: 150px 0; color: #666;">
                Second chart will load here...
            </p>
        </div>
    </div>

    <!-- Load Qlik SDK -->
    <script src="https://cdn.jsdelivr.net/npm/qlik@5.0.0/dist/qlik.min.js"></script>
    <script src="./app.js"></script>
</body>
</html>`}
                </CodeBlock>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">2. JavaScript Integration (app.js)</h4>
                <CodeBlock language="javascript">
{`// app.js - Qlik Cloud Integration
class QlikCloudDashboard {
    constructor() {
        this.qlik = null;
        this.app = null;
        this.config = {
            // Replace with your Qlik Cloud tenant URL
            host: 'your-tenant.us.qlikcloud.com',
            // Replace with your Web Integration ID from Qlik Cloud Console
            webIntegrationId: 'your-web-integration-id',
            // Replace with your app ID
            appId: 'your-app-id'
        };
    }

    async initialize() {
        const statusEl = document.getElementById('status');
        
        try {
            statusEl.textContent = 'Connecting to Qlik Cloud...';
            statusEl.className = '';
            
            // Initialize Qlik SDK
            this.qlik = new window.Qlik({
                host: this.config.host,
                webIntegrationId: this.config.webIntegrationId
            });

            // Authenticate to Qlik Cloud
            await this.qlik.authenticate();
            
            statusEl.textContent = 'Connected! Loading app...';
            statusEl.className = 'success';
            
            // Open the app
            this.app = await this.qlik.openApp(this.config.appId);
            
            statusEl.textContent = 'App loaded! Rendering charts...';
            
            // Load visualizations
            await this.loadCharts();
            
            statusEl.textContent = 'Dashboard ready!';
            
        } catch (error) {
            console.error('Qlik initialization failed:', error);
            statusEl.textContent = \`Error: \${error.message}\`;
            statusEl.className = 'error';
        }
    }

    async loadCharts() {
        try {
            // Load first chart - replace 'chart-object-id-1' with actual object ID
            const chart1 = await this.app.getObject('chart-object-id-1');
            await chart1.show('chart1');
            
            // Load second chart - replace 'chart-object-id-2' with actual object ID
            const chart2 = await this.app.getObject('chart-object-id-2');
            await chart2.show('chart2');
            
        } catch (error) {
            console.error('Failed to load charts:', error);
            document.getElementById('status').textContent = \`Chart loading error: \${error.message}\`;
            document.getElementById('status').className = 'error';
        }
    }

    // Method to handle selections and interactions
    async makeSelection(fieldName, values) {
        if (this.app) {
            const field = await this.app.field(fieldName);
            await field.select(values);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new QlikCloudDashboard();
    dashboard.initialize();
});`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">3. Configuration Steps</h4>
                <CodeBlock language="text">
{`Steps to configure this example:

1. Get Qlik Cloud Credentials:
   • Log into your Qlik Cloud tenant
   • Go to Console > Web Integrations
   • Create a new Web Integration ID
   • Note your tenant URL (e.g., your-tenant.us.qlikcloud.com)

2. Update Configuration:
   • Replace 'your-tenant.us.qlikcloud.com' with your tenant URL
   • Replace 'your-web-integration-id' with your actual Web Integration ID
   • Replace 'your-app-id' with an actual app ID from your tenant

3. Object IDs:
   • Open your app in Qlik Cloud
   • Right-click on charts > Developer > Copy Object ID
   • Replace 'chart-object-id-1' and 'chart-object-id-2' with actual IDs

4. Deploy:
   • Host the HTML file on HTTPS (required for Qlik Cloud)
   • Test the integration in your browser`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">4. Expected Output</h4>
                <CodeBlock language="text">
{`When successful, you'll see:

✅ Status: "Dashboard ready!"
✅ Two interactive Qlik charts embedded in the page
✅ Charts respond to user interactions (selections, filters)
✅ Session maintained across page refreshes

Common Issues:
❌ CORS errors → Check Web Integration ID and HTTPS
❌ Authentication popup blocked → Allow popups for your domain
❌ Charts not loading → Verify object IDs and app permissions`}
                </CodeBlock>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Concepts Demonstrated</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>Qlik Cloud Authentication</strong> - Using Web Integration ID for secure browser-based auth</div>
                  <div><strong>Chart Embedding</strong> - Loading and displaying Qlik visualizations in web pages</div>
                  <div><strong>Error Handling</strong> - Proper error handling for connection and loading failures</div>
                  <div><strong>Session Management</strong> - Maintaining Qlik session state in the browser</div>
                  <div><strong>HTTPS Requirement</strong> - Browser security requirements for Qlik Cloud integration</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Qlik Enterprise Example */}
          <Card id="qlik-enterprise">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-2xl">Qlik Sense Enterprise Integration</CardTitle>
                    <Badge>Qlik Enterprise</Badge>
                    <Badge variant="outline">On-Premise</Badge>
                  </div>
                  <CardDescription>
                    Connect to Qlik Sense Enterprise on-premise deployment using certificate authentication and virtual proxy configuration.
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Certificate-based authentication</li>
                    <li>• Virtual proxy configuration</li>
                    <li>• Session management</li>
                    <li>• Cross-domain integration</li>
                    <li>• Enterprise security compliance</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Requirements</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Qlik Sense Enterprise</Badge>
                    <Badge variant="secondary" className="text-xs">Virtual Proxy</Badge>
                    <Badge variant="secondary" className="text-xs">HTTPS</Badge>
                    <Badge variant="secondary" className="text-xs">Valid Certificate</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">1. HTML Setup for Enterprise</h4>
                <CodeBlock language="html">
{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qlik Sense Enterprise Dashboard</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; background: #f5f5f5; }
        .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
        .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .chart-container { 
            background: white; border-radius: 8px; padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1); height: 400px; 
        }
        .full-width { grid-column: 1 / -1; }
        #status { padding: 12px; border-radius: 6px; margin: 15px 0; font-weight: 500; }
        .success { background: #d1f2d1; color: #0d5016; border: 1px solid #4caf50; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #dc3545; }
        .loading { background: #fff3cd; color: #856404; border: 1px solid #ffc107; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Qlik Sense Enterprise Dashboard</h1>
            <p>Connected to on-premise Qlik Sense deployment</p>
            <div id="status" class="loading">Initializing connection to Qlik Sense Enterprise...</div>
        </div>
        
        <div class="dashboard-grid">
            <div class="chart-container" id="kpi-chart">
                <h3>Key Performance Indicators</h3>
                <div id="kpi-content">Loading KPI chart...</div>
            </div>
            
            <div class="chart-container" id="trend-chart">
                <h3>Sales Trend Analysis</h3>
                <div id="trend-content">Loading trend chart...</div>
            </div>
            
            <div class="chart-container full-width" id="table-chart">
                <h3>Detailed Data Table</h3>
                <div id="table-content">Loading data table...</div>
            </div>
        </div>
    </div>

    <!-- Load Qlik SDK -->
    <script src="https://cdn.jsdelivr.net/npm/qlik@5.0.0/dist/qlik.min.js"></script>
    <script src="./enterprise-app.js"></script>
</body>
</html>`}
                </CodeBlock>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">2. JavaScript Integration (enterprise-app.js)</h4>
                <CodeBlock language="javascript">
{`// enterprise-app.js - Qlik Sense Enterprise Integration
class QlikEnterpriseIntegration {
    constructor() {
        this.qlik = null;
        this.app = null;
        this.config = {
            // Replace with your Qlik Sense server details
            host: 'qlik-server.company.com',
            prefix: '/virtual-proxy/',  // Virtual proxy prefix
            port: 443,
            isSecure: true,
            
            // Authentication settings for Enterprise
            authentication: {
                method: 'certificate', // or 'header' for header authentication
                userId: 'DOMAIN\\\\username',  // For Windows domain users
                // For certificate auth, include certificate details
                certificate: {
                    pfx: '/path/to/certificate.pfx',  // Not used in browser
                    passphrase: 'cert-password'       // Not used in browser
                }
            },
            
            // App configuration
            appId: 'your-qlik-sense-app-id',
            
            // Object IDs for visualizations
            objects: {
                kpiChart: 'kpi-object-id',
                trendChart: 'trend-object-id', 
                dataTable: 'table-object-id'
            }
        };
    }

    async initialize() {
        const statusEl = document.getElementById('status');
        
        try {
            statusEl.textContent = 'Connecting to Qlik Sense Enterprise...';
            statusEl.className = 'loading';
            
            // Configure Qlik SDK for Enterprise
            this.qlik = new window.Qlik({
                host: this.config.host,
                prefix: this.config.prefix,
                port: this.config.port,
                isSecure: this.config.isSecure,
                
                // Enterprise-specific configuration
                authentication: {
                    method: 'session',  // Browser uses session-based auth
                    userId: this.config.authentication.userId
                }
            });

            // For Enterprise, authentication typically happens via proxy
            // The browser will redirect to authentication if needed
            statusEl.textContent = 'Authenticating via Enterprise proxy...';
            
            await this.qlik.authenticate();
            
            statusEl.textContent = 'Connected! Opening application...';
            statusEl.className = 'success';
            
            // Open the Qlik Sense application
            this.app = await this.qlik.openApp(this.config.appId);
            
            statusEl.textContent = 'App opened! Loading visualizations...';
            
            // Load all visualizations
            await this.loadDashboard();
            
            statusEl.textContent = 'Enterprise dashboard ready!';
            
        } catch (error) {
            console.error('Qlik Enterprise initialization failed:', error);
            statusEl.textContent = \`Connection Error: \${error.message}\`;
            statusEl.className = 'error';
            
            // Provide helpful error messages for common Enterprise issues
            this.handleEnterpriseError(error, statusEl);
        }
    }

    async loadDashboard() {
        const loadPromises = [
            this.loadVisualization(this.config.objects.kpiChart, 'kpi-content', 'KPI Chart'),
            this.loadVisualization(this.config.objects.trendChart, 'trend-content', 'Trend Chart'),
            this.loadVisualization(this.config.objects.dataTable, 'table-content', 'Data Table')
        ];
        
        await Promise.all(loadPromises);
    }

    async loadVisualization(objectId, containerId, displayName) {
        try {
            const object = await this.app.getObject(objectId);
            const container = document.getElementById(containerId);
            
            if (!container) {
                console.warn(\`Container \${containerId} not found for \${displayName}\`);
                return;
            }
            
            await object.show(container);
            console.log(\`✅ \${displayName} loaded successfully\`);
            
        } catch (error) {
            console.error(\`Failed to load \${displayName}:\`, error);
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = \`<div style="color: #dc3545; text-align: center; padding: 50px;">
                    <strong>Error loading \${displayName}</strong><br>
                    \${error.message}
                </div>\`;
            }
        }
    }

    handleEnterpriseError(error, statusEl) {
        let helpText = '';
        
        if (error.message.includes('CORS')) {
            helpText = '\\n\\nTip: Check virtual proxy CORS settings and whitelist your domain.';
        } else if (error.message.includes('authentication')) {
            helpText = '\\n\\nTip: Verify authentication method and user permissions.';
        } else if (error.message.includes('certificate')) {
            helpText = '\\n\\nTip: Check certificate configuration and trust chain.';
        }
        
        statusEl.textContent += helpText;
    }

    // Method to make selections in the Enterprise app
    async makeSelection(fieldName, values) {
        if (!this.app) return;
        
        try {
            const field = await this.app.field(fieldName);
            await field.select(values);
            console.log(\`Selection made in \${fieldName}:\`, values);
        } catch (error) {
            console.error('Selection failed:', error);
        }
    }

    // Method to clear all selections
    async clearAllSelections() {
        if (!this.app) return;
        
        try {
            await this.app.clearAll();
            console.log('All selections cleared');
        } catch (error) {
            console.error('Clear selections failed:', error);
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const enterprise = new QlikEnterpriseIntegration();
    enterprise.initialize();
    
    // Make the enterprise instance globally available for debugging
    window.qlikEnterprise = enterprise;
});`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">3. Enterprise Configuration Steps</h4>
                <CodeBlock language="text">
{`Configuration for Qlik Sense Enterprise:

1. Virtual Proxy Setup:
   • Create virtual proxy in QMC (Qlik Management Console)
   • Configure authentication method (Windows, SAML, JWT, etc.)
   • Set up CORS whitelist to include your web app domain
   • Configure session cookies and timeout settings

2. Authentication Method:
   • Windows Authentication: Uses domain credentials
   • Certificate Authentication: Requires client certificates
   • Header Authentication: Custom header-based auth
   • SAML/OIDC: Single sign-on integration

3. Update JavaScript Configuration:
   • Replace 'qlik-server.company.com' with your Qlik server hostname
   • Update virtual proxy prefix (e.g., '/sales/', '/analytics/')
   • Set correct port (default: 443 for HTTPS)
   • Configure authentication method matching your proxy

4. App and Object Setup:
   • Get App ID from Qlik Sense Hub or via API
   • Get Object IDs by right-clicking charts in Qlik Sense
   • Ensure user has access permissions to the app and objects

5. Security Considerations:
   • Use HTTPS for all communications
   • Configure proper CORS settings
   • Implement proper certificate trust chains
   • Test authentication flow thoroughly`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">4. Expected Behavior</h4>
                <CodeBlock language="text">
{`Successful Enterprise Integration Results:

✅ Authentication Flow:
   - Browser redirects to enterprise authentication (if needed)
   - Session established with virtual proxy
   - User credentials validated by enterprise identity provider

✅ Dashboard Loading:
   - Three visualization panels load with real data
   - KPI chart shows key performance metrics
   - Trend chart displays time-series analysis
   - Data table shows detailed records

✅ Interactive Features:
   - Click-to-filter functionality across all charts
   - Selection state synchronized across visualizations
   - Clear selections button resets all filters

Common Enterprise Issues:
❌ Virtual proxy not configured → 404 or connection errors
❌ CORS not whitelisted → Cross-origin request blocked
❌ Authentication mismatch → Redirect loops or auth failures
❌ Certificate issues → SSL/TLS handshake failures
❌ Insufficient permissions → Object loading failures`}
                </CodeBlock>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Enterprise Features</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>Virtual Proxy Integration</strong> - Seamless integration with enterprise proxy configuration</div>
                  <div><strong>Enterprise Authentication</strong> - Support for Windows, SAML, certificate-based auth</div>
                  <div><strong>Session Management</strong> - Proper handling of enterprise session lifecycle</div>
                  <div><strong>CORS Configuration</strong> - Cross-origin support for web applications</div>
                  <div><strong>Security Compliance</strong> - Enterprise-grade security and access controls</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* React Integration Example */}
          <Card id="react-integration">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-2xl">React + Qlik Cloud Integration</CardTitle>
                    <Badge>React</Badge>
                    <Badge variant="outline">TypeScript</Badge>
                  </div>
                  <CardDescription>
                    Build a modern React application with TypeScript that integrates Qlik Cloud visualizations using hooks and context.
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• React hooks for Qlik integration</li>
                    <li>• TypeScript for type safety</li>
                    <li>• Context-based state management</li>
                    <li>• Responsive component design</li>
                    <li>• Error boundary handling</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">React 18</Badge>
                    <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs">Qlik SDK</Badge>
                    <Badge variant="secondary" className="text-xs">Vite</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">1. Project Setup</h4>
                <CodeBlock language="bash">
{`# Create new React app with TypeScript
npm create vite@latest qlik-react-app -- --template react-ts
cd qlik-react-app

# Install dependencies
npm install
npm install qlik

# Install additional UI dependencies (optional)
npm install @radix-ui/react-dialog @radix-ui/react-toast`}
                </CodeBlock>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">2. Qlik Context Provider</h4>
                <CodeBlock language="typescript">
{`// src/contexts/QlikContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Qlik from 'qlik';

interface QlikContextType {
  qlik: Qlik | null;
  app: any | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const QlikContext = createContext<QlikContextType | undefined>(undefined);

interface QlikProviderProps {
  children: ReactNode;
  config: {
    host: string;
    webIntegrationId: string;
    appId: string;
  };
}

export const QlikProvider: React.FC<QlikProviderProps> = ({ children, config }) => {
  const [qlik, setQlik] = useState<Qlik | null>(null);
  const [app, setApp] = useState<any | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Initialize Qlik SDK
      const qlikInstance = new Qlik({
        host: config.host,
        webIntegrationId: config.webIntegrationId
      });

      // Authenticate
      await qlikInstance.authenticate();
      setQlik(qlikInstance);

      // Open app
      const appInstance = await qlikInstance.openApp(config.appId);
      setApp(appInstance);

      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to Qlik');
      console.error('Qlik connection failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    if (qlik) {
      // Clean up connection
      setQlik(null);
      setApp(null);
      setIsConnected(false);
    }
  };

  // Auto-connect on mount
  useEffect(() => {
    connect();
    
    // Cleanup on unmount
    return () => disconnect();
  }, []);

  const value: QlikContextType = {
    qlik,
    app,
    isConnected,
    isLoading,
    error,
    connect,
    disconnect
  };

  return (
    <QlikContext.Provider value={value}>
      {children}
    </QlikContext.Provider>
  );
};

export const useQlik = () => {
  const context = useContext(QlikContext);
  if (context === undefined) {
    throw new Error('useQlik must be used within a QlikProvider');
  }
  return context;
};`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">3. Qlik Chart Component</h4>
                <CodeBlock language="typescript">
{`// src/components/QlikChart.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useQlik } from '../contexts/QlikContext';

interface QlikChartProps {
  objectId: string;
  title?: string;
  className?: string;
}

export const QlikChart: React.FC<QlikChartProps> = ({ 
  objectId, 
  title, 
  className = '' 
}) => {
  const { app, isConnected } = useQlik();
  const chartRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadChart = async () => {
      if (!app || !chartRef.current || !isConnected) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Get the Qlik object
        const qlikObject = await app.getObject(objectId);
        
        // Only proceed if component is still mounted
        if (!isMounted) return;

        // Clear any existing content
        if (chartRef.current) {
          chartRef.current.innerHTML = '';
          
          // Show the visualization in the container
          await qlikObject.show(chartRef.current);
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load chart';
          setError(errorMessage);
          console.error(\`Error loading chart \${objectId}:\`, err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadChart();

    // Cleanup function
    return () => {
      isMounted = false;
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
      }
    };
  }, [app, objectId, isConnected]);

  if (!isConnected) {
    return (
      <div className={\`qlik-chart-placeholder \${className}\`}>
        <div className="text-center text-gray-500 p-8">
          <div>Not connected to Qlik</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={\`qlik-chart-error \${className}\`}>
        <div className="text-center text-red-500 p-8">
          <div className="font-semibold">Error loading chart</div>
          <div className="text-sm mt-2">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={\`qlik-chart-container \${className}\`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          {title}
        </h3>
      )}
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <div className="text-gray-600">Loading chart...</div>
          </div>
        </div>
      )}
      
      <div 
        ref={chartRef} 
        className="qlik-chart w-full h-full min-h-[300px] relative"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
};`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">4. Main App Component</h4>
                <CodeBlock language="typescript">
{`// src/App.tsx
import React from 'react';
import { QlikProvider } from './contexts/QlikContext';
import { QlikChart } from './components/QlikChart';
import './App.css';

// Configuration - replace with your Qlik Cloud details
const qlikConfig = {
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id',
  appId: 'your-app-id'
};

function App() {
  return (
    <QlikProvider config={qlikConfig}>
      <div className="App">
        <header className="app-header">
          <h1>React + Qlik Cloud Dashboard</h1>
          <p>Modern React integration with TypeScript</p>
        </header>

        <main className="dashboard-grid">
          <div className="chart-section">
            <QlikChart 
              objectId="sales-kpi-object-id" 
              title="Sales KPIs"
              className="chart-card"
            />
          </div>

          <div className="chart-section">
            <QlikChart 
              objectId="trend-chart-object-id" 
              title="Revenue Trends"
              className="chart-card"
            />
          </div>

          <div className="chart-section full-width">
            <QlikChart 
              objectId="data-table-object-id" 
              title="Detailed Analysis"
              className="chart-card"
            />
          </div>
        </main>
      </div>
    </QlikProvider>
  );
}

export default App;`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">5. CSS Styling (App.css)</h4>
                <CodeBlock language="css">
{`/* src/App.css */
.App {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.app-header {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  text-align: center;
}

.app-header h1 {
  color: #1f2937;
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
}

.app-header p {
  color: #6b7280;
  margin: 0;
  font-size: 1.1rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.chart-section {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.chart-section.full-width {
  grid-column: 1 / -1;
  min-height: 500px;
}

.chart-card {
  width: 100%;
  height: 100%;
}

/* Responsive design */
@media (max-width: 768px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .app-header h1 {
    font-size: 2rem;
  }
  
  .chart-section {
    min-height: 300px;
  }
}`}
                </CodeBlock>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key React Integration Features</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>React Hooks Pattern</strong> - Custom useQlik hook for easy integration</div>
                  <div><strong>Context-based State</strong> - Global Qlik state management across components</div>
                  <div><strong>TypeScript Safety</strong> - Full type safety for props and state</div>
                  <div><strong>Error Boundaries</strong> - Graceful error handling and user feedback</div>
                  <div><strong>Component Reusability</strong> - Reusable QlikChart component for any visualization</div>
                  <div><strong>Lifecycle Management</strong> - Proper cleanup on component unmount</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Browser Integration Examples</CardTitle>
            <CardDescription>
              More browser-based integration patterns and resources for Qlik Cloud and Enterprise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold">Framework Integrations</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="text-primary hover:underline">Vue.js + Qlik Cloud Dashboard</a></li>
                  <li><a href="#" className="text-primary hover:underline">Angular + Qlik Enterprise Portal</a></li>
                  <li><a href="#" className="text-primary hover:underline">Svelte + Qlik Embedded Analytics</a></li>
                  <li><a href="#" className="text-primary hover:underline">Next.js Static Site with Qlik</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Integration Patterns</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="text-primary hover:underline">Single Sign-On (SSO) Integration</a></li>
                  <li><a href="#" className="text-primary hover:underline">Multi-Tenant Dashboard Setup</a></li>
                  <li><a href="#" className="text-primary hover:underline">Custom Theme & Branding</a></li>
                  <li><a href="#" className="text-primary hover:underline">Mobile-First Responsive Design</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Deployment Examples</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="text-primary hover:underline">CDN-hosted Static Dashboard</a></li>
                  <li><a href="#" className="text-primary hover:underline">GitHub Pages Deployment</a></li>
                  <li><a href="#" className="text-primary hover:underline">Netlify + Qlik Integration</a></li>
                  <li><a href="#" className="text-primary hover:underline">Vercel Edge Functions</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Enterprise Scenarios</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="text-primary hover:underline">Active Directory Integration</a></li>
                  <li><a href="#" className="text-primary hover:underline">Certificate Authentication Setup</a></li>
                  <li><a href="#" className="text-primary hover:underline">Load Balancer Configuration</a></li>
                  <li><a href="#" className="text-primary hover:underline">Reverse Proxy Setup</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}