import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Server, Database, Webhook, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Node.js Integration",
  description: "Learn how to integrate Qlik TypeScript SDK with Node.js for server-side analytics, data processing, and API development",
}

export default function NodeIntegrationPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Node.js Integration"
        description="Build powerful server-side analytics applications with Node.js using Qlik TypeScript SDK for data processing, API endpoints, and automated reporting."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Node.js + Qlik Integration Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Node.js provides an excellent platform for server-side Qlik integration, enabling automated 
            data processing, API development, scheduled reporting, and real-time data synchronization. 
            This guide covers authentication, data operations, and production patterns.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Server className="h-3 w-3 mr-1" />
                Server APIs
              </Badge>
              <div className="text-sm text-muted-foreground">
                RESTful APIs for Qlik data access
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Database className="h-3 w-3 mr-1" />
                Data Processing
              </Badge>
              <div className="text-sm text-muted-foreground">
                Automated data extraction and transformation
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Webhook className="h-3 w-3 mr-1" />
                Webhooks
              </Badge>
              <div className="text-sm text-muted-foreground">
                Real-time data synchronization
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Shield className="h-3 w-3 mr-1" />
                Authentication
              </Badge>
              <div className="text-sm text-muted-foreground">
                Secure server-to-server communication
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Authentication & Connection */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Server-Side Authentication
        </h2>
        
        <Tabs defaultValue="jwt-auth" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jwt-auth">JWT Authentication</TabsTrigger>
            <TabsTrigger value="api-key">API Key Method</TabsTrigger>
            <TabsTrigger value="oauth-flow">OAuth Flow</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jwt-auth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">JWT-Based Authentication</CardTitle>
                <CardDescription>
                  Secure server-to-server authentication using JWT tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`import express from 'express';
import jwt from 'jsonwebtoken';
import { QlikNodeService } from './services/qlik-node.service';

interface QlikServerConfig {
  host: string;
  port?: number;
  isSecure?: boolean;
  prefix?: string;
  jwtSecret: string;
  userId: string;
  userDirectory: string;
  userGroups?: string[];
}

export class QlikAuthService {
  private config: QlikServerConfig;

  constructor(config: QlikServerConfig) {
    this.config = config;
  }

  /**
   * Generate JWT token for Qlik authentication
   */
  generateJWTToken(userId?: string): string {
    const payload = {
      iss: 'your-server-name',
      aud: 'qlik.api/jwt-login',
      sub: userId || this.config.userId,
      name: userId || this.config.userId,
      email: \`\${userId || this.config.userId}@your-domain.com\`,
      groups: this.config.userGroups || ['Everyone'],
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiry
    };

    return jwt.sign(payload, this.config.jwtSecret, { algorithm: 'HS256' });
  }

  /**
   * Authenticate with Qlik using JWT
   */
  async authenticateWithQlik(): Promise<any> {
    try {
      const token = this.generateJWTToken();
      
      // Configure connection with JWT
      const connectionConfig = {
        host: this.config.host,
        port: this.config.port || 4848,
        isSecure: this.config.isSecure !== false,
        prefix: this.config.prefix || '/',
        headers: {
          'Authorization': \`Bearer \${token}\`,
          'X-Qlik-User': \`UserDirectory=\${this.config.userDirectory}; UserId=\${this.config.userId}\`
        }
      };

      // Initialize Qlik connection
      const qlik = await this.initializeQlikConnection(connectionConfig);
      
      console.log('✅ Qlik JWT authentication successful');
      return qlik;

    } catch (error) {
      console.error('❌ Qlik JWT authentication failed:', error);
      throw error;
    }
  }

  /**
   * Initialize Qlik connection with configuration
   */
  private async initializeQlikConnection(config: any): Promise<any> {
    // This would use the actual Qlik SDK initialization
    // Implementation depends on your specific Qlik setup
    
    const QlikSDK = await import('qlik'); // Adjust import as needed
    return await QlikSDK.connect(config);
  }

  /**
   * Validate JWT token
   */
  validateToken(token: string): any {
    try {
      return jwt.verify(token, this.config.jwtSecret);
    } catch (error) {
      console.error('Token validation failed:', error);
      throw new Error('Invalid token');
    }
  }
}

// Express middleware for Qlik authentication
export function qlikAuthMiddleware(authService: QlikAuthService) {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header required' });
      }

      const token = authHeader.substring(7);
      const decoded = authService.validateToken(token);
      
      // Attach user info to request
      req.user = decoded;
      
      next();
    } catch (error) {
      console.error('Authentication middleware error:', error);
      res.status(401).json({ error: 'Authentication failed' });
    }
  };
}

// Usage example
const app = express();

const qlikConfig: QlikServerConfig = {
  host: process.env.QLIK_HOST || 'localhost',
  port: parseInt(process.env.QLIK_PORT || '4848'),
  isSecure: process.env.QLIK_SECURE === 'true',
  jwtSecret: process.env.JWT_SECRET!,
  userId: process.env.QLIK_USER_ID || 'sa_service_user',
  userDirectory: process.env.QLIK_USER_DIRECTORY || 'INTERNAL',
  userGroups: ['Developers', 'Administrators']
};

const authService = new QlikAuthService(qlikConfig);

// Initialize Qlik connection
let qlikConnection: any = null;

async function initializeQlik() {
  try {
    qlikConnection = await authService.authenticateWithQlik();
    console.log('✅ Qlik connection established');
  } catch (error) {
    console.error('❌ Failed to initialize Qlik:', error);
    process.exit(1);
  }
}

// Start server
initializeQlik().then(() => {
  app.listen(3000, () => {
    console.log('🚀 Server running on port 3000');
  });
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api-key" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">API Key Authentication</CardTitle>
                <CardDescription>
                  Simple API key-based authentication for development environments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`import axios from 'axios';

interface QlikAPIConfig {
  host: string;
  apiKey: string;
  tenantId: string;
  isCloud?: boolean;
}

export class QlikAPIService {
  private config: QlikAPIConfig;
  private baseURL: string;

  constructor(config: QlikAPIConfig) {
    this.config = config;
    this.baseURL = config.isCloud 
      ? \`https://\${config.host}/api/v1\`
      : \`https://\${config.host}:4242/qrs\`;
  }

  /**
   * Create authenticated HTTP client
   */
  private createHttpClient() {
    return axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': \`Bearer \${this.config.apiKey}\`,
        'Content-Type': 'application/json',
        ...(this.config.isCloud && {
          'qlik-web-integration-id': process.env.QLIK_WEB_INTEGRATION_ID
        })
      },
      timeout: 30000
    });
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const client = this.createHttpClient();
      const response = await client.get('/users/me');
      
      console.log('✅ API connection successful:', response.data);
      return true;
      
    } catch (error) {
      console.error('❌ API connection failed:', error);
      return false;
    }
  }

  /**
   * Get available applications
   */
  async getApplications(): Promise<any[]> {
    try {
      const client = this.createHttpClient();
      const response = await client.get('/items', {
        params: {
          resourceType: 'app',
          limit: 100
        }
      });

      console.log(\`✅ Found \${response.data.data.length} applications\`);
      return response.data.data;
      
    } catch (error) {
      console.error('❌ Failed to get applications:', error);
      throw error;
    }
  }

  /**
   * Execute reload task
   */
  async executeReload(appId: string): Promise<any> {
    try {
      const client = this.createHttpClient();
      const response = await client.post(\`/apps/\${appId}/reloads\`, {
        mode: 'FULL',
        debug: false
      });

      console.log(\`✅ Reload task started for app \${appId}:\`, response.data.id);
      return response.data;
      
    } catch (error) {
      console.error(\`❌ Failed to start reload for app \${appId}:\`, error);
      throw error;
    }
  }

  /**
   * Monitor reload status
   */
  async monitorReload(appId: string, reloadId: string): Promise<any> {
    try {
      const client = this.createHttpClient();
      
      let status = 'QUEUED';
      let attempts = 0;
      const maxAttempts = 60; // 5 minutes with 5-second intervals
      
      while (!['SUCCEEDED', 'FAILED', 'ABORTED'].includes(status) && attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
        
        const response = await client.get(\`/apps/\${appId}/reloads/\${reloadId}\`);
        status = response.data.status;
        attempts++;
        
        console.log(\`📊 Reload status for \${appId}: \${status} (attempt \${attempts})\`);
      }

      if (status === 'SUCCEEDED') {
        console.log(\`✅ Reload completed successfully for app \${appId}\`);
      } else {
        console.error(\`❌ Reload failed for app \${appId}: \${status}\`);
      }

      return { status, attempts };
      
    } catch (error) {
      console.error('❌ Failed to monitor reload:', error);
      throw error;
    }
  }

  /**
   * Get app metadata and content
   */
  async getAppMetadata(appId: string): Promise<any> {
    try {
      const client = this.createHttpClient();
      const response = await client.get(\`/apps/\${appId}\`);

      const metadata = {
        id: response.data.attributes.id,
        name: response.data.attributes.name,
        description: response.data.attributes.description,
        lastReloaded: response.data.attributes.lastReloadTime,
        size: response.data.attributes.dynamicProperties?.qFileSize,
        sheets: response.data.attributes.dynamicProperties?.qHasData
      };

      console.log(\`✅ Retrieved metadata for app \${appId}:\`, metadata);
      return metadata;
      
    } catch (error) {
      console.error(\`❌ Failed to get app metadata for \${appId}:\`, error);
      throw error;
    }
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="oauth-flow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">OAuth 2.0 Flow</CardTitle>
                <CardDescription>
                  Production-ready OAuth 2.0 implementation for secure access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`import express from 'express';
import axios from 'axios';
import crypto from 'crypto';

interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  qlikHost: string;
  scopes: string[];
}

export class QlikOAuthService {
  private config: OAuthConfig;
  private tokenStore = new Map<string, any>(); // In production, use Redis or DB

  constructor(config: OAuthConfig) {
    this.config = config;
  }

  /**
   * Generate OAuth authorization URL
   */
  generateAuthURL(state?: string): string {
    const authState = state || crypto.randomBytes(16).toString('hex');
    const codeChallenge = crypto.randomBytes(32).toString('base64url');
    
    // Store code challenge for verification
    this.tokenStore.set(\`challenge_\${authState}\`, codeChallenge);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: this.config.scopes.join(' '),
      state: authState,
      code_challenge: crypto.createHash('sha256').update(codeChallenge).digest('base64url'),
      code_challenge_method: 'S256'
    });

    return \`https://\${this.config.qlikHost}/oauth/authorize?\${params.toString()}\`;
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForToken(code: string, state: string): Promise<any> {
    try {
      const codeVerifier = this.tokenStore.get(\`challenge_\${state}\`);
      
      if (!codeVerifier) {
        throw new Error('Invalid state parameter or expired challenge');
      }

      const tokenResponse = await axios.post(\`https://\${this.config.qlikHost}/oauth/token\`, {
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code: code,
        redirect_uri: this.config.redirectUri,
        code_verifier: codeVerifier
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const tokenData = tokenResponse.data;
      
      // Store tokens securely
      const sessionId = crypto.randomBytes(16).toString('hex');
      this.tokenStore.set(\`token_\${sessionId}\`, {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresIn: tokenData.expires_in,
        tokenType: tokenData.token_type,
        createdAt: Date.now()
      });

      // Clean up challenge
      this.tokenStore.delete(\`challenge_\${state}\`);

      console.log('✅ OAuth token exchange successful');
      return { sessionId, tokenData };

    } catch (error) {
      console.error('❌ OAuth token exchange failed:', error);
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshAccessToken(sessionId: string): Promise<any> {
    try {
      const tokenData = this.tokenStore.get(\`token_\${sessionId}\`);
      
      if (!tokenData || !tokenData.refreshToken) {
        throw new Error('No valid refresh token found');
      }

      const response = await axios.post(\`https://\${this.config.qlikHost}/oauth/token\`, {
        grant_type: 'refresh_token',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        refresh_token: tokenData.refreshToken
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const newTokenData = response.data;
      
      // Update stored tokens
      this.tokenStore.set(\`token_\${sessionId}\`, {
        ...tokenData,
        accessToken: newTokenData.access_token,
        refreshToken: newTokenData.refresh_token || tokenData.refreshToken,
        expiresIn: newTokenData.expires_in,
        createdAt: Date.now()
      });

      console.log('✅ Access token refreshed');
      return newTokenData;

    } catch (error) {
      console.error('❌ Token refresh failed:', error);
      throw error;
    }
  }

  /**
   * Get valid access token (refresh if needed)
   */
  async getValidAccessToken(sessionId: string): Promise<string> {
    const tokenData = this.tokenStore.get(\`token_\${sessionId}\`);
    
    if (!tokenData) {
      throw new Error('No token data found for session');
    }

    // Check if token needs refresh (refresh 5 minutes before expiry)
    const expiryTime = tokenData.createdAt + (tokenData.expiresIn * 1000);
    const refreshThreshold = Date.now() + (5 * 60 * 1000); // 5 minutes

    if (refreshThreshold >= expiryTime) {
      console.log('🔄 Refreshing access token...');
      await this.refreshAccessToken(sessionId);
      
      // Get updated token
      const updatedTokenData = this.tokenStore.get(\`token_\${sessionId}\`);
      return updatedTokenData.accessToken;
    }

    return tokenData.accessToken;
  }

  /**
   * Create authenticated API client
   */
  async createAuthenticatedClient(sessionId: string) {
    const accessToken = await this.getValidAccessToken(sessionId);
    
    return axios.create({
      baseURL: \`https://\${this.config.qlikHost}/api/v1\`,
      headers: {
        'Authorization': \`Bearer \${accessToken}\`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
  }

  /**
   * Revoke tokens and cleanup
   */
  async revokeTokens(sessionId: string): Promise<void> {
    try {
      const tokenData = this.tokenStore.get(\`token_\${sessionId}\`);
      
      if (tokenData && tokenData.accessToken) {
        // Revoke access token
        await axios.post(\`https://\${this.config.qlikHost}/oauth/revoke\`, {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          token: tokenData.accessToken,
          token_type_hint: 'access_token'
        });
      }

      // Remove from store
      this.tokenStore.delete(\`token_\${sessionId}\`);
      
      console.log('✅ Tokens revoked and session cleaned up');
      
    } catch (error) {
      console.error('❌ Token revocation failed:', error);
      // Still clean up local storage
      this.tokenStore.delete(\`token_\${sessionId}\`);
    }
  }
}

// Express routes for OAuth flow
export function createOAuthRoutes(oauthService: QlikOAuthService): express.Router {
  const router = express.Router();

  // Step 1: Redirect to authorization server
  router.get('/auth', (req, res) => {
    const authURL = oauthService.generateAuthURL();
    res.redirect(authURL);
  });

  // Step 2: Handle callback and exchange code for token
  router.get('/callback', async (req, res) => {
    try {
      const { code, state } = req.query;
      
      if (!code || !state) {
        return res.status(400).json({ error: 'Missing code or state parameter' });
      }

      const { sessionId } = await oauthService.exchangeCodeForToken(code as string, state as string);
      
      // Set session cookie
      res.cookie('qlik_session', sessionId, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.redirect('/dashboard'); // Redirect to your app
      
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.status(500).json({ error: 'Authentication failed' });
    }
  });

  // Step 3: Logout and revoke tokens
  router.post('/logout', async (req, res) => {
    try {
      const sessionId = req.cookies.qlik_session;
      
      if (sessionId) {
        await oauthService.revokeTokens(sessionId);
      }
      
      res.clearCookie('qlik_session');
      res.json({ success: true });
      
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ error: 'Logout failed' });
    }
  });

  return router;
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Data Processing APIs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Processing APIs
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">RESTful API for Qlik Data</CardTitle>
            <CardDescription>
              Complete API implementation for data extraction and processing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`import express from 'express';
import { QlikDataProcessor } from './services/qlik-data-processor';

interface DataRequest {
  appId: string;
  dimensions: string[];
  measures: string[];
  filters?: Record<string, any>;
  limit?: number;
  offset?: number;
}

export class QlikDataAPI {
  private app: express.Application;
  private dataProcessor: QlikDataProcessor;

  constructor(dataProcessor: QlikDataProcessor) {
    this.app = express();
    this.dataProcessor = dataProcessor;
    this.setupRoutes();
    this.setupMiddleware();
  }

  private setupMiddleware(): void {
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    
    // CORS configuration
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      next();
    });
  }

  private setupRoutes(): void {
    const router = express.Router();

    // Health check endpoint
    router.get('/health', (req, res) => {
      res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    // Get available applications
    router.get('/apps', async (req, res) => {
      try {
        const apps = await this.dataProcessor.getApplications();
        
        res.json({
          success: true,
          data: apps,
          count: apps.length
        });

      } catch (error) {
        console.error('Get apps error:', error);
        res.status(500).json({
          success: false,
          error: error.message || 'Failed to get applications'
        });
      }
    });

    // Get app metadata
    router.get('/apps/:appId/metadata', async (req, res) => {
      try {
        const { appId } = req.params;
        const metadata = await this.dataProcessor.getAppMetadata(appId);
        
        res.json({
          success: true,
          data: metadata
        });

      } catch (error) {
        console.error('Get app metadata error:', error);
        res.status(500).json({
          success: false,
          error: error.message || 'Failed to get app metadata'
        });
      }
    });

    // Execute data query
    router.post('/apps/:appId/query', async (req, res) => {
      try {
        const { appId } = req.params;
        const queryRequest: DataRequest = req.body;
        
        // Validate request
        if (!queryRequest.dimensions || !queryRequest.measures) {
          return res.status(400).json({
            success: false,
            error: 'Dimensions and measures are required'
          });
        }

        const result = await this.dataProcessor.executeQuery(appId, {
          dimensions: queryRequest.dimensions,
          measures: queryRequest.measures,
          filters: queryRequest.filters,
          pagination: {
            limit: queryRequest.limit || 1000,
            offset: queryRequest.offset || 0
          }
        });
        
        res.json({
          success: true,
          data: result.data,
          metadata: {
            totalRows: result.totalRows,
            headers: result.headers,
            executionTime: result.executionTime,
            timestamp: new Date().toISOString()
          }
        });

      } catch (error) {
        console.error('Query execution error:', error);
        res.status(500).json({
          success: false,
          error: error.message || 'Query execution failed'
        });
      }
    });

    // Export data to various formats
    router.post('/apps/:appId/export', async (req, res) => {
      try {
        const { appId } = req.params;
        const { format = 'json', ...queryRequest } = req.body;
        
        const result = await this.dataProcessor.executeQuery(appId, queryRequest);
        
        switch (format.toLowerCase()) {
          case 'csv':
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', \`attachment; filename="export_\${appId}.csv"\`);
            res.send(this.convertToCSV(result));
            break;
            
          case 'excel':
            const excelBuffer = await this.convertToExcel(result);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', \`attachment; filename="export_\${appId}.xlsx"\`);
            res.send(excelBuffer);
            break;
            
          case 'json':
          default:
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-Disposition', \`attachment; filename="export_\${appId}.json"\`);
            res.json({
              exportTime: new Date().toISOString(),
              appId: appId,
              ...result
            });
            break;
        }

      } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({
          success: false,
          error: error.message || 'Export failed'
        });
      }
    });

    // Batch processing endpoint
    router.post('/batch', async (req, res) => {
      try {
        const { requests } = req.body;
        
        if (!Array.isArray(requests)) {
          return res.status(400).json({
            success: false,
            error: 'Requests must be an array'
          });
        }

        const results = await Promise.allSettled(
          requests.map(async (request: DataRequest & { id?: string }) => {
            const result = await this.dataProcessor.executeQuery(request.appId, request);
            return { id: request.id, ...result };
          })
        );

        const successful = results
          .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
          .map(result => result.value);

        const failed = results
          .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
          .map(result => ({ error: result.reason.message }));

        res.json({
          success: true,
          successful: successful.length,
          failed: failed.length,
          results: successful,
          errors: failed
        });

      } catch (error) {
        console.error('Batch processing error:', error);
        res.status(500).json({
          success: false,
          error: error.message || 'Batch processing failed'
        });
      }
    });

    // Schedule data processing job
    router.post('/schedule', async (req, res) => {
      try {
        const { schedule, query, webhook } = req.body;
        
        const jobId = await this.dataProcessor.scheduleJob({
          schedule: schedule, // Cron expression
          query: query,
          webhook: webhook,
          createdAt: new Date().toISOString()
        });

        res.json({
          success: true,
          jobId: jobId,
          message: 'Job scheduled successfully'
        });

      } catch (error) {
        console.error('Schedule job error:', error);
        res.status(500).json({
          success: false,
          error: error.message || 'Failed to schedule job'
        });
      }
    });

    this.app.use('/api', router);
  }

  private convertToCSV(result: any): string {
    const headers = result.headers.join(',');
    const rows = result.data.map((row: any[]) => 
      row.map((cell: any) => \`"\${String(cell.text || cell.number || '').replace(/"/g, '""')}"\`).join(',')
    );
    
    return [headers, ...rows].join('\\n');
  }

  private async convertToExcel(result: any): Promise<Buffer> {
    // Implementation would use a library like 'exceljs'
    // This is a placeholder implementation
    const ExcelJS = await import('exceljs');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers
    worksheet.addRow(result.headers);

    // Add data rows
    result.data.forEach((row: any[]) => {
      const values = row.map((cell: any) => cell.text || cell.number || '');
      worksheet.addRow(values);
    });

    // Style the headers
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    return await workbook.xlsx.writeBuffer() as Buffer;
  }

  public getApp(): express.Application {
    return this.app;
  }
}

// Data processor service
export class QlikDataProcessor {
  private qlikService: any; // Your Qlik service instance

  constructor(qlikService: any) {
    this.qlikService = qlikService;
  }

  async getApplications(): Promise<any[]> {
    // Implementation to get available apps
    return await this.qlikService.getApplications();
  }

  async getAppMetadata(appId: string): Promise<any> {
    // Implementation to get app metadata
    return await this.qlikService.getAppMetadata(appId);
  }

  async executeQuery(appId: string, options: any): Promise<any> {
    const startTime = Date.now();
    
    try {
      // Open app
      const app = await this.qlikService.openApp(appId);
      
      // Create hypercube definition
      const hypercubeDef = {
        qInfo: { qType: 'api-query' },
        qHyperCubeDef: {
          qDimensions: options.dimensions.map((dim: string) => ({
            qDef: { qFieldDefs: [dim] }
          })),
          qMeasures: options.measures.map((measure: string) => ({
            qDef: { qDef: measure }
          })),
          qInitialDataFetch: [{
            qLeft: 0,
            qTop: options.pagination?.offset || 0,
            qWidth: options.dimensions.length + options.measures.length,
            qHeight: options.pagination?.limit || 1000
          }]
        }
      };

      // Apply filters if provided
      if (options.filters) {
        await this.applyFilters(app, options.filters);
      }

      // Create session object and get data
      const sessionObject = await app.createSessionObject(hypercubeDef);
      const layout = await sessionObject.getLayout();
      const dataPages = await sessionObject.getHyperCubeData('/qHyperCubeDef', hypercubeDef.qHyperCubeDef.qInitialDataFetch);

      // Process results
      const hypercube = layout.qHyperCube;
      const headers = [
        ...hypercube.qDimensionInfo.map((dim: any) => dim.qFallbackTitle),
        ...hypercube.qMeasureInfo.map((measure: any) => measure.qFallbackTitle)
      ];

      const data = dataPages[0].qMatrix.map((row: any[]) => 
        row.map((cell: any) => ({
          text: cell.qText,
          number: cell.qNum,
          state: cell.qState
        }))
      );

      // Clean up
      await sessionObject.destroy();

      const executionTime = Date.now() - startTime;

      return {
        headers,
        data,
        totalRows: hypercube.qSize.qcy,
        totalColumns: hypercube.qSize.qcx,
        executionTime
      };

    } catch (error) {
      console.error('Query execution failed:', error);
      throw error;
    }
  }

  async scheduleJob(job: any): Promise<string> {
    // Implementation for job scheduling
    // This could use node-cron or similar library
    const jobId = \`job_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`;
    
    console.log(\`📅 Scheduled job \${jobId}:\`, job);
    
    // Store job in database or job queue
    // Set up cron schedule
    
    return jobId;
  }

  private async applyFilters(app: any, filters: Record<string, any>): Promise<void> {
    const filterPromises = Object.entries(filters).map(async ([field, values]) => {
      const fieldHandle = await app.getField(field);
      
      if (Array.isArray(values)) {
        await fieldHandle.selectValues(values);
      } else {
        await fieldHandle.selectValues([values]);
      }
    });

    await Promise.all(filterPromises);
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Webhooks & Real-time */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Webhook className="h-5 w-5" />
          Webhooks & Real-time Processing
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Webhook Integration System</CardTitle>
            <CardDescription>
              Real-time data synchronization and event processing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`import express from 'express';
import { EventEmitter } from 'events';
import WebSocket from 'ws';
import cron from 'node-cron';

interface WebhookConfig {
  endpoint: string;
  secret: string;
  events: string[];
  retries: number;
  timeout: number;
}

export class QlikWebhookManager extends EventEmitter {
  private webhooks = new Map<string, WebhookConfig>();
  private wsServer: WebSocket.Server;
  private activeConnections = new Set<WebSocket>();

  constructor(port: number = 8080) {
    super();
    
    // Initialize WebSocket server for real-time updates
    this.wsServer = new WebSocket.Server({ port });
    this.setupWebSocketHandlers();
    
    console.log(\`🔗 WebSocket server started on port \${port}\`);
  }

  /**
   * Register webhook endpoint
   */
  registerWebhook(id: string, config: WebhookConfig): void {
    this.webhooks.set(id, config);
    console.log(\`📡 Registered webhook: \${id} -> \${config.endpoint}\`);
  }

  /**
   * Trigger webhook for specific event
   */
  async triggerWebhook(event: string, data: any): Promise<void> {
    const relevantWebhooks = Array.from(this.webhooks.entries())
      .filter(([_, config]) => config.events.includes(event) || config.events.includes('*'));

    if (relevantWebhooks.length === 0) {
      console.log(\`ℹ️  No webhooks registered for event: \${event}\`);
      return;
    }

    console.log(\`📤 Triggering \${relevantWebhooks.length} webhooks for event: \${event}\`);

    const webhookPromises = relevantWebhooks.map(([id, config]) => 
      this.sendWebhookRequest(id, config, event, data)
    );

    const results = await Promise.allSettled(webhookPromises);
    
    // Log results
    results.forEach((result, index) => {
      const [webhookId] = relevantWebhooks[index];
      
      if (result.status === 'fulfilled') {
        console.log(\`✅ Webhook \${webhookId} delivered successfully\`);
      } else {
        console.error(\`❌ Webhook \${webhookId} failed:\`, result.reason);
      }
    });
  }

  /**
   * Send webhook request with retries
   */
  private async sendWebhookRequest(
    webhookId: string, 
    config: WebhookConfig, 
    event: string, 
    data: any
  ): Promise<void> {
    
    const payload = {
      event,
      timestamp: new Date().toISOString(),
      webhookId,
      data
    };

    const signature = this.generateSignature(JSON.stringify(payload), config.secret);

    let lastError: any = null;
    
    for (let attempt = 1; attempt <= config.retries + 1; attempt++) {
      try {
        const response = await fetch(config.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Qlik-Signature': signature,
            'X-Qlik-Event': event,
            'X-Qlik-Timestamp': payload.timestamp,
            'User-Agent': 'Qlik-Webhook/1.0'
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(config.timeout)
        });

        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }

        console.log(\`✅ Webhook \${webhookId} delivered on attempt \${attempt}\`);
        return;

      } catch (error) {
        lastError = error;
        console.warn(\`⚠️  Webhook \${webhookId} attempt \${attempt} failed:\`, error.message);

        if (attempt <= config.retries) {
          // Exponential backoff
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
          console.log(\`⏳ Retrying webhook \${webhookId} in \${delay}ms\`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw new Error(\`Webhook \${webhookId} failed after \${config.retries + 1} attempts: \${lastError?.message}\`);
  }

  /**
   * Setup WebSocket handlers for real-time updates
   */
  private setupWebSocketHandlers(): void {
    this.wsServer.on('connection', (ws: WebSocket) => {
      console.log('🔌 New WebSocket connection established');
      this.activeConnections.add(ws);

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message.toString());
          this.handleWebSocketMessage(ws, data);
        } catch (error) {
          console.error('❌ Invalid WebSocket message:', error);
          ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }
      });

      ws.on('close', () => {
        console.log('🔌 WebSocket connection closed');
        this.activeConnections.delete(ws);
      });

      ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
        this.activeConnections.delete(ws);
      });

      // Send welcome message
      ws.send(JSON.stringify({
        type: 'connection',
        message: 'Connected to Qlik real-time updates',
        timestamp: new Date().toISOString()
      }));
    });
  }

  /**
   * Handle incoming WebSocket messages
   */
  private handleWebSocketMessage(ws: WebSocket, data: any): void {
    switch (data.type) {
      case 'subscribe':
        // Subscribe to specific data streams
        this.subscribeToDataStream(ws, data.appId, data.objectId);
        break;
        
      case 'unsubscribe':
        // Unsubscribe from data streams
        this.unsubscribeFromDataStream(ws, data.appId, data.objectId);
        break;
        
      case 'ping':
        // Health check
        ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }));
        break;
        
      default:
        ws.send(JSON.stringify({ error: \`Unknown message type: \${data.type}\` }));
    }
  }

  /**
   * Subscribe WebSocket to data stream
   */
  private subscribeToDataStream(ws: WebSocket, appId: string, objectId: string): void {
    const subscriptionKey = \`\${appId}:\${objectId}\`;
    
    // Add subscription metadata to WebSocket
    if (!(ws as any).subscriptions) {
      (ws as any).subscriptions = new Set();
    }
    
    (ws as any).subscriptions.add(subscriptionKey);
    
    console.log(\`📡 WebSocket subscribed to \${subscriptionKey}\`);
    
    ws.send(JSON.stringify({
      type: 'subscribed',
      appId,
      objectId,
      timestamp: new Date().toISOString()
    }));
  }

  /**
   * Unsubscribe WebSocket from data stream
   */
  private unsubscribeFromDataStream(ws: WebSocket, appId: string, objectId: string): void {
    const subscriptionKey = \`\${appId}:\${objectId}\`;
    
    if ((ws as any).subscriptions) {
      (ws as any).subscriptions.delete(subscriptionKey);
    }
    
    console.log(\`📡 WebSocket unsubscribed from \${subscriptionKey}\`);
    
    ws.send(JSON.stringify({
      type: 'unsubscribed',
      appId,
      objectId,
      timestamp: new Date().toISOString()
    }));
  }

  /**
   * Broadcast data update to subscribed WebSocket clients
   */
  broadcastDataUpdate(appId: string, objectId: string, data: any): void {
    const subscriptionKey = \`\${appId}:\${objectId}\`;
    
    const message = JSON.stringify({
      type: 'data-update',
      appId,
      objectId,
      data,
      timestamp: new Date().toISOString()
    });

    let broadcastCount = 0;

    this.activeConnections.forEach(ws => {
      if ((ws as any).subscriptions?.has(subscriptionKey)) {
        try {
          ws.send(message);
          broadcastCount++;
        } catch (error) {
          console.error('❌ Failed to send WebSocket message:', error);
          this.activeConnections.delete(ws);
        }
      }
    });

    if (broadcastCount > 0) {
      console.log(\`📡 Broadcasted update for \${subscriptionKey} to \${broadcastCount} clients\`);
    }
  }

  /**
   * Generate HMAC signature for webhook validation
   */
  private generateSignature(payload: string, secret: string): string {
    const crypto = require('crypto');
    return 'sha256=' + crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
  }

  /**
   * Setup scheduled data monitoring
   */
  setupDataMonitoring(appId: string, schedule: string): void {
    cron.schedule(schedule, async () => {
      try {
        console.log(\`🔍 Running scheduled monitoring for app \${appId}\`);
        
        // Get current data snapshot
        const currentData = await this.getCurrentDataSnapshot(appId);
        
        // Compare with previous snapshot (stored in database)
        const hasChanges = await this.detectDataChanges(appId, currentData);
        
        if (hasChanges) {
          console.log(\`📊 Data changes detected in app \${appId}\`);
          
          // Trigger webhooks
          await this.triggerWebhook('data-change', {
            appId,
            timestamp: new Date().toISOString(),
            changes: currentData
          });
          
          // Broadcast to WebSocket clients
          this.broadcastDataUpdate(appId, '*', currentData);
        }
        
      } catch (error) {
        console.error(\`❌ Monitoring failed for app \${appId}:\`, error);
      }
    });
    
    console.log(\`⏰ Scheduled monitoring for app \${appId} with schedule: \${schedule}\`);
  }

  private async getCurrentDataSnapshot(appId: string): Promise<any> {
    // Implementation would fetch current data from Qlik
    // This is a placeholder
    return {
      appId,
      timestamp: new Date().toISOString(),
      checksum: Math.random().toString(36)
    };
  }

  private async detectDataChanges(appId: string, currentData: any): Promise<boolean> {
    // Implementation would compare with stored previous snapshot
    // This is a placeholder that randomly returns true for demo
    return Math.random() > 0.7;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.wsServer.close();
    this.activeConnections.clear();
    this.webhooks.clear();
    console.log('🧹 Webhook manager destroyed');
  }
}

// Express middleware for webhook endpoints
export function createWebhookEndpoints(webhookManager: QlikWebhookManager): express.Router {
  const router = express.Router();

  // Register new webhook
  router.post('/webhooks', (req, res) => {
    try {
      const { id, endpoint, secret, events, retries = 3, timeout = 5000 } = req.body;
      
      if (!id || !endpoint || !secret || !events) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      webhookManager.registerWebhook(id, {
        endpoint,
        secret,
        events,
        retries,
        timeout
      });

      res.json({ success: true, message: \`Webhook \${id} registered\` });
      
    } catch (error) {
      console.error('Register webhook error:', error);
      res.status(500).json({ error: 'Failed to register webhook' });
    }
  });

  // Test webhook delivery
  router.post('/webhooks/:id/test', async (req, res) => {
    try {
      const { id } = req.params;
      const testData = req.body || { test: true, timestamp: new Date().toISOString() };
      
      await webhookManager.triggerWebhook('test', { webhookId: id, ...testData });
      
      res.json({ success: true, message: \`Test webhook sent to \${id}\` });
      
    } catch (error) {
      console.error('Test webhook error:', error);
      res.status(500).json({ error: 'Failed to send test webhook' });
    }
  });

  return router;
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">🚀 Node.js + Qlik Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div><strong>Security:</strong> Use proper authentication and validate all webhook signatures</div>
          <div><strong>Error Handling:</strong> Implement comprehensive error handling and logging</div>
          <div><strong>Rate Limiting:</strong> Implement rate limiting for API endpoints</div>
          <div><strong>Caching:</strong> Use Redis or memory caching for frequently accessed data</div>
          <div><strong>Monitoring:</strong> Implement health checks and performance monitoring</div>
          <div><strong>Scalability:</strong> Use clustering and load balancing for production</div>
          <div><strong>Data Validation:</strong> Validate all input data and sanitize outputs</div>
          <div><strong>Documentation:</strong> Maintain comprehensive API documentation</div>
        </CardContent>
      </Card>
    </div>
  )
}