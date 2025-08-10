import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, RefreshCw, Shield, Activity, Timer } from "lucide-react"

export const metadata: Metadata = {
  title: "Session Management",
  description: "Learn how to manage user sessions, tokens, and authentication state in the Qlik TypeScript SDK",
}

export default function SessionManagementPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Session Management"
        description="Master session management, token handling, and authentication persistence in your Qlik applications."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Session Management Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Effective session management ensures your users have a smooth, secure experience while maintaining 
            proper authentication state across their interactions with Qlik applications.
          </p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Clock className="h-3 w-3 mr-1" />
                Token Lifecycle
              </Badge>
              <div className="text-sm text-muted-foreground">
                Automatic token refresh and expiration handling
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Shield className="h-3 w-3 mr-1" />
                Security
              </Badge>
              <div className="text-sm text-muted-foreground">
                Secure storage and transmission of authentication data
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <RefreshCw className="h-3 w-3 mr-1" />
                Auto-Recovery
              </Badge>
              <div className="text-sm text-muted-foreground">
                Automatic session restoration and error recovery
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Lifecycle */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Session Lifecycle Management
        </h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Session Handling</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Session Operations</CardTitle>
                <CardDescription>
                  Fundamental session management operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`import Qlik from 'qlik';

class BasicSessionManager {
  private qlik: Qlik;

  constructor(config: QlikConfig) {
    this.qlik = new Qlik(config);
  }

  // Check current authentication status
  async checkSession(): Promise<boolean> {
    try {
      const isAuthenticated = await this.qlik.isAuthenticated();
      console.log('Session status:', isAuthenticated ? 'Active' : 'Inactive');
      return isAuthenticated;
    } catch (error) {
      console.error('Session check failed:', error);
      return false;
    }
  }

  // Initialize new session
  async createSession(): Promise<void> {
    try {
      await this.qlik.authenticateToQlik();
      console.log('✅ New session created');
      
      // Optional: Set up session monitoring
      this.startSessionMonitoring();
    } catch (error) {
      console.error('❌ Session creation failed:', error);
      throw error;
    }
  }

  // End current session
  async endSession(): Promise<void> {
    try {
      await this.qlik.logout();
      console.log('✅ Session ended');
    } catch (error) {
      console.error('Session logout failed:', error);
    }
  }

  // Get session information
  async getSessionInfo(): Promise<any> {
    try {
      const sessionInfo = await this.qlik.getSessionInfo();
      return {
        userId: sessionInfo.userId,
        tenantId: sessionInfo.tenantId,
        expiry: sessionInfo.expiry,
        lastActivity: new Date().toISOString()
      };
    } catch (error) {
      console.error('Failed to get session info:', error);
      return null;
    }
  }

  private startSessionMonitoring(): void {
    // Monitor session every 5 minutes
    setInterval(async () => {
      const isActive = await this.checkSession();
      if (!isActive) {
        console.warn('Session expired, attempting refresh...');
        await this.handleSessionExpired();
      }
    }, 5 * 60 * 1000);
  }

  private async handleSessionExpired(): Promise<void> {
    try {
      await this.createSession();
    } catch (error) {
      console.error('Session refresh failed:', error);
      // Emit session expired event for UI handling
      this.emitSessionExpired();
    }
  }

  private emitSessionExpired(): void {
    window.dispatchEvent(new CustomEvent('qlik:session-expired'));
  }
}

// Usage
const sessionManager = new BasicSessionManager({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});

// Initialize session
await sessionManager.createSession();

// Check session status
const isActive = await sessionManager.checkSession();

// Get session details
const sessionInfo = await sessionManager.getSessionInfo();`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Session Manager</CardTitle>
                <CardDescription>
                  Enterprise-grade session management with automatic recovery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`class AdvancedSessionManager {
  private qlik: Qlik;
  private sessionTimer: NodeJS.Timeout | null = null;
  private refreshBuffer = 5 * 60 * 1000; // 5 minutes before expiry
  private maxRetries = 3;
  private retryCount = 0;

  constructor(config: QlikConfig) {
    this.qlik = new Qlik(config);
    this.setupEventListeners();
  }

  async initialize(): Promise<void> {
    try {
      // Try to restore existing session
      await this.restoreSession();
      
      if (!(await this.qlik.isAuthenticated())) {
        await this.qlik.authenticateToQlik();
      }

      // Set up automatic token refresh
      await this.scheduleTokenRefresh();
      
      console.log('✅ Session manager initialized');
    } catch (error) {
      console.error('Session manager initialization failed:', error);
      throw error;
    }
  }

  private async restoreSession(): Promise<void> {
    try {
      const storedToken = this.getStoredToken();
      const storedExpiry = this.getStoredTokenExpiry();

      if (storedToken && storedExpiry) {
        const now = Date.now();
        const expiryTime = new Date(storedExpiry).getTime();

        if (expiryTime > now + this.refreshBuffer) {
          // Token is still valid
          this.qlik.setAccessToken(storedToken);
          console.log('✅ Session restored from storage');
          return;
        }
      }
    } catch (error) {
      console.warn('Session restoration failed:', error);
    }
    
    // Clear invalid stored data
    this.clearStoredSession();
  }

  private async scheduleTokenRefresh(): Promise<void> {
    try {
      const tokenInfo = await this.qlik.getTokenInfo();
      const expiryTime = new Date(tokenInfo.expiry).getTime();
      const refreshTime = expiryTime - Date.now() - this.refreshBuffer;

      if (refreshTime > 0) {
        this.sessionTimer = setTimeout(async () => {
          await this.refreshToken();
        }, refreshTime);

        console.log(\`Token refresh scheduled in \${Math.round(refreshTime / 1000 / 60)} minutes\`);
      } else {
        // Token expires soon, refresh immediately
        await this.refreshToken();
      }
    } catch (error) {
      console.error('Failed to schedule token refresh:', error);
    }
  }

  private async refreshToken(): Promise<void> {
    try {
      console.log('🔄 Refreshing authentication token...');
      
      await this.qlik.refreshToken();
      
      // Store new token
      const newToken = await this.qlik.getAccessToken();
      const tokenInfo = await this.qlik.getTokenInfo();
      
      this.storeToken(newToken, tokenInfo.expiry);
      
      // Schedule next refresh
      await this.scheduleTokenRefresh();
      
      console.log('✅ Token refreshed successfully');
      this.retryCount = 0; // Reset retry counter
      
      // Emit refresh event
      this.emitTokenRefreshed();

    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.handleRefreshFailure(error);
    }
  }

  private async handleRefreshFailure(error: any): Promise<void> {
    this.retryCount++;

    if (this.retryCount <= this.maxRetries) {
      console.log(\`Retry \${this.retryCount}/\${this.maxRetries} token refresh in 30 seconds...\`);
      
      setTimeout(async () => {
        await this.refreshToken();
      }, 30000);
    } else {
      console.error('Max retry attempts reached, session expired');
      this.clearStoredSession();
      this.emitSessionExpired();
      
      // Reset retry counter for next session
      this.retryCount = 0;
    }
  }

  private setupEventListeners(): void {
    // Listen for page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Page became visible, check session
        this.checkSessionOnFocus();
      }
    });

    // Listen for online/offline events
    window.addEventListener('online', () => {
      console.log('Network restored, checking session...');
      this.checkSessionOnFocus();
    });
  }

  private async checkSessionOnFocus(): Promise<void> {
    try {
      const isAuthenticated = await this.qlik.isAuthenticated();
      
      if (!isAuthenticated) {
        console.warn('Session expired while away');
        await this.refreshToken();
      }
    } catch (error) {
      console.error('Session check on focus failed:', error);
    }
  }

  // Token storage methods
  private storeToken(token: string, expiry: string): void {
    try {
      localStorage.setItem('qlik-access-token', token);
      localStorage.setItem('qlik-token-expiry', expiry);
    } catch (error) {
      console.warn('Failed to store token:', error);
    }
  }

  private getStoredToken(): string | null {
    try {
      return localStorage.getItem('qlik-access-token');
    } catch {
      return null;
    }
  }

  private getStoredTokenExpiry(): string | null {
    try {
      return localStorage.getItem('qlik-token-expiry');
    } catch {
      return null;
    }
  }

  private clearStoredSession(): void {
    try {
      localStorage.removeItem('qlik-access-token');
      localStorage.removeItem('qlik-token-expiry');
    } catch {
      // Ignore storage errors
    }
  }

  // Event emission
  private emitTokenRefreshed(): void {
    window.dispatchEvent(new CustomEvent('qlik:token-refreshed'));
  }

  private emitSessionExpired(): void {
    window.dispatchEvent(new CustomEvent('qlik:session-expired'));
  }

  // Cleanup
  destroy(): void {
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
      this.sessionTimer = null;
    }
    this.clearStoredSession();
  }
}

// Usage
const sessionManager = new AdvancedSessionManager({
  host: 'your-tenant.us.qlikcloud.com',
  webIntegrationId: 'your-web-integration-id'
});

await sessionManager.initialize();

// Listen for session events
window.addEventListener('qlik:token-refreshed', () => {
  console.log('Token refreshed, continuing operations...');
});

window.addEventListener('qlik:session-expired', () => {
  console.log('Session expired, redirect to login...');
  // Handle session expiry in UI
});`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* React Integration */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          React Session Management
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">useSession Hook</CardTitle>
            <CardDescription>
              React hook for session management with state tracking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`// hooks/useSession.ts
import { useState, useEffect, useCallback, useRef } from 'react';
import Qlik from 'qlik';

interface SessionState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  error: string | null;
  tokenExpiry: Date | null;
}

interface UseSessionReturn extends SessionState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  clearError: () => void;
}

export function useSession(qlik: Qlik): UseSessionReturn {
  const [state, setState] = useState<SessionState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
    tokenExpiry: null
  });

  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize session on mount
  useEffect(() => {
    initializeSession();
    
    // Cleanup on unmount
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, []);

  const initializeSession = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const isAuthenticated = await qlik.isAuthenticated();
      
      if (isAuthenticated) {
        const userInfo = await qlik.getUserInfo();
        const tokenInfo = await qlik.getTokenInfo();
        
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          user: userInfo,
          tokenExpiry: new Date(tokenInfo.expiry),
          isLoading: false
        }));
        
        scheduleTokenRefresh(new Date(tokenInfo.expiry));
      } else {
        setState(prev => ({
          ...prev,
          isAuthenticated: false,
          user: null,
          tokenExpiry: null,
          isLoading: false
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Session initialization failed',
        isLoading: false
      }));
    }
  };

  const login = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await qlik.authenticateToQlik();
      
      const userInfo = await qlik.getUserInfo();
      const tokenInfo = await qlik.getTokenInfo();
      
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        user: userInfo,
        tokenExpiry: new Date(tokenInfo.expiry),
        isLoading: false
      }));
      
      scheduleTokenRefresh(new Date(tokenInfo.expiry));
      
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Login failed',
        isAuthenticated: false,
        isLoading: false
      }));
    }
  }, [qlik]);

  const logout = useCallback(async () => {
    try {
      await qlik.logout();
      
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
        refreshTimerRef.current = null;
      }
      
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
        tokenExpiry: null
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [qlik]);

  const refresh = useCallback(async () => {
    await initializeSession();
  }, []);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const scheduleTokenRefresh = (expiry: Date) => {
    const refreshTime = expiry.getTime() - Date.now() - (5 * 60 * 1000); // 5 min buffer
    
    if (refreshTime > 0) {
      refreshTimerRef.current = setTimeout(async () => {
        try {
          await qlik.refreshToken();
          await initializeSession();
        } catch (error) {
          console.error('Token refresh failed:', error);
          await logout();
        }
      }, refreshTime);
    }
  };

  return {
    ...state,
    login,
    logout,
    refresh,
    clearError
  };
}

// Component usage
function SessionProvider({ children }: { children: React.ReactNode }) {
  const qlik = new Qlik({
    host: 'your-tenant.us.qlikcloud.com',
    webIntegrationId: 'your-web-integration-id'
  });
  
  const session = useSession(qlik);

  if (session.isLoading) {
    return <div>Loading session...</div>;
  }

  if (session.error) {
    return (
      <div>
        <p>Session error: {session.error}</p>
        <button onClick={session.clearError}>Retry</button>
      </div>
    );
  }

  if (!session.isAuthenticated) {
    return (
      <div>
        <button onClick={session.login}>Sign In</button>
      </div>
    );
  }

  return (
    <div>
      <div className="session-info">
        <span>Welcome, {session.user?.name}</span>
        <span>Token expires: {session.tokenExpiry?.toLocaleTimeString()}</span>
        <button onClick={session.logout}>Sign Out</button>
      </div>
      {children}
    </div>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Session Security */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Session Security
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Secure Token Storage</CardTitle>
            <CardDescription>
              Best practices for storing and managing authentication tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`class SecureTokenStorage {
  private readonly TOKEN_KEY = 'qlik_auth_token';
  private readonly EXPIRY_KEY = 'qlik_token_expiry';
  private readonly MAX_AGE = 24 * 60 * 60 * 1000; // 24 hours

  // Store token securely
  storeToken(token: string, expiry: string): boolean {
    try {
      // Validate token before storing
      if (!this.validateToken(token)) {
        throw new Error('Invalid token format');
      }

      const expiryTime = new Date(expiry).getTime();
      const maxExpiryTime = Date.now() + this.MAX_AGE;

      // Ensure expiry is not too far in the future
      if (expiryTime > maxExpiryTime) {
        throw new Error('Token expiry exceeds maximum allowed time');
      }

      // Store with additional metadata
      const tokenData = {
        token,
        expiry,
        stored: Date.now(),
        origin: window.location.origin
      };

      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(tokenData));
      return true;

    } catch (error) {
      console.error('Token storage failed:', error);
      return false;
    }
  }

  // Retrieve token with validation
  getToken(): { token: string; expiry: string } | null {
    try {
      const stored = localStorage.getItem(this.TOKEN_KEY);
      
      if (!stored) {
        return null;
      }

      const tokenData = JSON.parse(stored);

      // Validate stored data structure
      if (!tokenData.token || !tokenData.expiry || !tokenData.origin) {
        this.clearToken();
        return null;
      }

      // Verify origin matches (security check)
      if (tokenData.origin !== window.location.origin) {
        this.clearToken();
        return null;
      }

      // Check if token is expired
      const expiryTime = new Date(tokenData.expiry).getTime();
      if (expiryTime <= Date.now()) {
        this.clearToken();
        return null;
      }

      return {
        token: tokenData.token,
        expiry: tokenData.expiry
      };

    } catch (error) {
      console.error('Token retrieval failed:', error);
      this.clearToken();
      return null;
    }
  }

  // Clear stored tokens
  clearToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Token clearing failed:', error);
    }
  }

  // Validate token format
  private validateToken(token: string): boolean {
    // Basic JWT validation
    if (!token || typeof token !== 'string') {
      return false;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return false; // Not a valid JWT structure
    }

    try {
      // Try to decode header and payload
      atob(parts[0]);
      atob(parts[1]);
      return true;
    } catch {
      return false;
    }
  }

  // Check if storage is available
  isStorageAvailable(): boolean {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}

// Usage with session manager
class SecureSessionManager {
  private storage = new SecureTokenStorage();
  private qlik: Qlik;

  constructor(config: QlikConfig) {
    this.qlik = new Qlik(config);
  }

  async initializeSecureSession(): Promise<void> {
    if (!this.storage.isStorageAvailable()) {
      console.warn('Secure storage not available, using memory-only session');
    }

    // Try to restore from secure storage
    const storedTokens = this.storage.getToken();
    
    if (storedTokens) {
      try {
        this.qlik.setAccessToken(storedTokens.token);
        
        // Validate the restored token
        const isValid = await this.qlik.isAuthenticated();
        
        if (isValid) {
          console.log('✅ Secure session restored');
          return;
        }
      } catch (error) {
        console.warn('Stored token validation failed:', error);
      }
    }

    // Clear invalid tokens and start fresh
    this.storage.clearToken();
    await this.qlik.authenticateToQlik();
    
    // Store new tokens securely
    const token = await this.qlik.getAccessToken();
    const tokenInfo = await this.qlik.getTokenInfo();
    
    this.storage.storeToken(token, tokenInfo.expiry);
    console.log('✅ New secure session established');
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">⚡ Session Management Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div><strong>Automatic Refresh:</strong> Implement proactive token refresh before expiration</div>
          <div><strong>Secure Storage:</strong> Use secure storage methods and validate stored tokens</div>
          <div><strong>Error Recovery:</strong> Handle network issues and authentication failures gracefully</div>
          <div><strong>User Experience:</strong> Provide clear feedback on session status and actions</div>
          <div><strong>Memory Management:</strong> Clean up timers and event listeners on component unmount</div>
          <div><strong>Multi-tab Support:</strong> Coordinate sessions across multiple browser tabs</div>
          <div><strong>Offline Handling:</strong> Gracefully handle offline scenarios and reconnection</div>
          <div><strong>Security Validation:</strong> Always validate tokens and session data integrity</div>
        </CardContent>
      </Card>
    </div>
  )
}