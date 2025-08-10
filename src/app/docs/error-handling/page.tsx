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
import { AlertTriangle, Shield, RefreshCw, Bug } from "lucide-react";

export const metadata: Metadata = {
  title: "Error Handling",
  description:
    "Comprehensive guide to error handling in the Qlik TypeScript SDK",
};

export default function ErrorHandlingPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Error Handling"
        description="Learn how to handle errors gracefully and build resilient applications with the Qlik TypeScript SDK."
      />

      {/* Error Types */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Bug className="h-5 w-5" />
          Error Types
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">SDK Error Hierarchy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">QlikError</Badge>
                  <span className="text-sm text-muted-foreground">
                    Base error class
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Base class for all Qlik SDK errors. Contains error code,
                  message, and context.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">QlikAuthError</Badge>
                  <span className="text-sm text-muted-foreground">
                    Authentication errors
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Authentication-related errors including failed login, expired
                  sessions, and permission issues.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">QlikAppError</Badge>
                  <span className="text-sm text-muted-foreground">
                    Application errors
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Errors related to app access, app not found, or app operation
                  failures.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">QlikNetworkError</Badge>
                  <span className="text-sm text-muted-foreground">
                    Network errors
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connection timeouts, network unavailable, or server errors.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Basic Error Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Basic Error Handling
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Try-Catch Pattern</CardTitle>
            <CardDescription>
              Basic error handling using try-catch blocks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`import Qlik, { QlikError, QlikAuthError, QlikAppError } from 'qlik';

async function basicErrorHandling() {
  try {
    const qlik = new Qlik({
      host: 'your-tenant.us.qlikcloud.com',
      webIntegrationId: 'your-web-integration-id'
    });

    await qlik.authenticateToQlik();
    const apps = await qlik.getAppList();
    console.log('✅ Success:', apps.length, 'apps found');

  } catch (error) {
    if (error instanceof QlikAuthError) {
      console.error('❌ Authentication Error:', error.message);
      // Handle authentication specific errors
      switch (error.code) {
        case 'POPUP_BLOCKED':
          alert('Please allow popups for authentication');
          break;
        case 'AUTHENTICATION_CANCELLED':
          console.log('User cancelled authentication');
          break;
        case 'INVALID_WEB_INTEGRATION_ID':
          console.error('Invalid Web Integration ID');
          break;
      }
    } else if (error instanceof QlikAppError) {
      console.error('❌ App Error:', error.message);
      // Handle app-specific errors
    } else if (error instanceof QlikError) {
      console.error('❌ Qlik Error:', error.message);
      console.error('Error Code:', error.code);
    } else {
      console.error('❌ Unexpected Error:', error);
    }
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Error Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Advanced Error Handling
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Error Handler Class</CardTitle>
            <CardDescription>
              Centralized error handling with retry logic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`class QlikErrorHandler {
  private maxRetries: number;
  private retryDelay: number;

  constructor(maxRetries = 3, retryDelay = 1000) {
    this.maxRetries = maxRetries;
    this.retryDelay = retryDelay;
  }

  async withRetry<T>(
    operation: () => Promise<T>, 
    context: string = 'operation'
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        const shouldRetry = this.shouldRetry(error, attempt);
        console.warn(\`\${context} failed (attempt \${attempt}/\${this.maxRetries}): \${error.message}\`);

        if (!shouldRetry || attempt === this.maxRetries) {
          break;
        }

        // Wait before retry with exponential backoff
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await this.delay(delay);
      }
    }

    throw this.enhanceError(lastError, context);
  }

  private shouldRetry(error: any, attempt: number): boolean {
    // Don't retry on authentication errors (except session expired)
    if (error instanceof QlikAuthError) {
      return error.code === 'SESSION_EXPIRED' && attempt < this.maxRetries;
    }

    // Retry on network errors
    if (error instanceof QlikNetworkError) {
      return true;
    }

    // Don't retry on app not found errors
    if (error instanceof QlikAppError && error.code === 'APP_NOT_FOUND') {
      return false;
    }

    // Retry on other Qlik errors
    return error instanceof QlikError;
  }

  private enhanceError(error: Error, context: string): Error {
    const enhancedError = new Error(\`\${context} failed after \${this.maxRetries} attempts: \${error.message}\`);
    enhancedError.stack = error.stack;
    return enhancedError;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  logError(error: Error, context: string, additionalInfo?: any) {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      context,
      error: {
        name: error.name,
        message: error.message,
        code: (error as any).code,
        stack: error.stack
      },
      additionalInfo
    };

    console.error('Qlik Error Log:', JSON.stringify(errorInfo, null, 2));
    
    // Send to error tracking service if available
    // this.sendToErrorTracking(errorInfo);
  }
}

// Usage
const errorHandler = new QlikErrorHandler(3, 2000);

async function robustOperation() {
  try {
    return await errorHandler.withRetry(async () => {
      const qlik = new Qlik({ /* config */ });
      await qlik.authenticateToQlik();
      return await qlik.getAppList();
    }, 'Get App List');
  } catch (error) {
    errorHandler.logError(error, 'App List Operation', { userId: 'user123' });
    throw error;
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* React Error Handling */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          React Error Handling
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Error Boundary Component</CardTitle>
            <CardDescription>
              React Error Boundary for handling Qlik errors in components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`// components/QlikErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import { QlikError } from 'qlik';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: any;
}

export class QlikErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log Qlik-specific error details
    if (error instanceof QlikError) {
      console.error('Qlik Error Caught:', {
        code: error.code,
        message: error.message,
        component: errorInfo.componentStack
      });
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 mb-4">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-red-700">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs bg-red-100 p-2 rounded overflow-auto">
                {this.state.error?.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage in App
export default function App() {
  const handleError = (error: Error, errorInfo: any) => {
    // Send error to monitoring service
    console.log('Error boundary caught error:', error, errorInfo);
  };

  return (
    <QlikErrorBoundary onError={handleError}>
      <Dashboard />
    </QlikErrorBoundary>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">useErrorHandler Hook</CardTitle>
            <CardDescription>
              Custom React hook for handling async errors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`// hooks/useErrorHandler.ts
import { useState, useCallback } from 'react';
import { QlikError, QlikAuthError } from 'qlik';

interface UseErrorHandlerReturn {
  error: string | null;
  isLoading: boolean;
  clearError: () => void;
  handleAsync: <T>(promise: Promise<T>) => Promise<T | null>;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleAsync = useCallback(async <T>(promise: Promise<T>): Promise<T | null> => {
    try {
      setIsLoading(true);
      clearError();
      const result = await promise;
      return result;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      
      // Log error for debugging
      console.error('Async operation failed:', err);
      
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [clearError]);

  return { error, isLoading, clearError, handleAsync };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof QlikAuthError) {
    switch (error.code) {
      case 'POPUP_BLOCKED':
        return 'Please allow popups to authenticate with Qlik.';
      case 'AUTHENTICATION_CANCELLED':
        return 'Authentication was cancelled. Please try again.';
      case 'SESSION_EXPIRED':
        return 'Your session has expired. Please log in again.';
      default:
        return \`Authentication error: \${error.message}\`;
    }
  } else if (error instanceof QlikError) {
    return \`Qlik error: \${error.message}\`;
  } else if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred.';
}

// Usage in component
export function QlikDashboard() {
  const { error, isLoading, clearError, handleAsync } = useErrorHandler();

  const loadApps = async () => {
    const apps = await handleAsync(qlik.getAppList());
    if (apps) {
      console.log('Loaded apps:', apps);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600">{error}</p>
          <button onClick={clearError} className="text-sm underline">
            Dismiss
          </button>
        </div>
      )}
      
      <button 
        onClick={loadApps} 
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {isLoading ? 'Loading...' : 'Load Apps'}
      </button>
    </div>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
