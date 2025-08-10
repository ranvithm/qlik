import type { Metadata } from "next";
import { CodeBlock } from "@/components/code-block";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Component } from "lucide-react";

export const metadata: Metadata = {
  title: "React Integration",
  description: "Build React applications with Qlik SDK components and hooks",
};

export default function ReactIntegrationPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="React Integration"
        description="Learn how to integrate the Qlik TypeScript SDK with React applications using modern patterns, hooks, and components."
      />

      {/* Getting Started */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          Getting Started
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Installation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="bash">
              {`# Create React app with TypeScript
npx create-react-app my-qlik-app --template typescript
cd my-qlik-app

# Install Qlik SDK
npm install qlik

# Install additional dependencies for advanced features
npm install @types/react @types/react-dom`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* React Hooks */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          Custom React Hooks
        </h2>

        <Tabs defaultValue="useQlik" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="useQlik">useQlik</TabsTrigger>
            <TabsTrigger value="useQlikApp">useQlikApp</TabsTrigger>
            <TabsTrigger value="useQlikObject">useQlikObject</TabsTrigger>
          </TabsList>

          <TabsContent value="useQlik" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">useQlik Hook</CardTitle>
                <CardDescription>
                  Main hook for managing Qlik SDK instance and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
                  {`// hooks/useQlik.ts
import { useState, useEffect, useCallback } from 'react';
import Qlik from 'qlik';

interface UseQlikOptions {
  host: string;
  webIntegrationId: string;
  autoAuthenticate?: boolean;
}

interface UseQlikReturn {
  qlik: Qlik | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  authenticate: () => Promise<void>;
  logout: () => Promise<void>;
}

export function useQlik({
  host,
  webIntegrationId,
  autoAuthenticate = true
}: UseQlikOptions): UseQlikReturn {
  const [qlik, setQlik] = useState<Qlik | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async () => {
    if (!qlik) return;

    try {
      setIsLoading(true);
      setError(null);
      await qlik.authenticateToQlik();
      setIsAuthenticated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [qlik]);

  const logout = useCallback(async () => {
    if (!qlik) return;

    try {
      await qlik.logout();
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, [qlik]);

  useEffect(() => {
    const initializeQlik = async () => {
      try {
        const qlikInstance = new Qlik({ host, webIntegrationId });
        setQlik(qlikInstance);

        if (autoAuthenticate) {
          const authStatus = await qlikInstance.isAuthenticated();
          if (authStatus) {
            setIsAuthenticated(true);
          } else {
            await qlikInstance.authenticateToQlik();
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize Qlik');
      } finally {
        setIsLoading(false);
      }
    };

    initializeQlik();
  }, [host, webIntegrationId, autoAuthenticate]);

  return {
    qlik,
    isAuthenticated,
    isLoading,
    error,
    authenticate,
    logout
  };
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useQlikApp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">useQlikApp Hook</CardTitle>
                <CardDescription>
                  Hook for managing Qlik application instances
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
                  {`// hooks/useQlikApp.ts
import { useState, useEffect } from 'react';
import Qlik from 'qlik';

interface UseQlikAppOptions {
  qlik: Qlik | null;
  appId: string;
}

interface UseQlikAppReturn {
  app: any | null;
  sheets: any[] | null;
  isLoading: boolean;
  error: string | null;
  refreshApp: () => Promise<void>;
}

export function useQlikApp({ qlik, appId }: UseQlikAppOptions): UseQlikAppReturn {
  const [app, setApp] = useState<any | null>(null);
  const [sheets, setSheets] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadApp = async () => {
    if (!qlik || !appId) return;

    try {
      setIsLoading(true);
      setError(null);

      const appInstance = await qlik.getApp(appId);
      setApp(appInstance);

      const appSheets = await appInstance.getSheets();
      setSheets(appSheets);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load app');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshApp = async () => {
    await loadApp();
  };

  useEffect(() => {
    loadApp();
  }, [qlik, appId]);

  return {
    app,
    sheets,
    isLoading,
    error,
    refreshApp
  };
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="useQlikObject" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">useQlikObject Hook</CardTitle>
                <CardDescription>
                  Hook for managing individual Qlik objects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
                  {`// hooks/useQlikObject.ts
import { useState, useEffect, useCallback } from 'react';

interface UseQlikObjectOptions {
  app: any | null;
  objectId: string;
}

interface UseQlikObjectReturn {
  object: any | null;
  layout: any | null;
  data: any[] | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useQlikObject({ 
  app, 
  objectId 
}: UseQlikObjectOptions): UseQlikObjectReturn {
  const [object, setObject] = useState<any | null>(null);
  const [layout, setLayout] = useState<any | null>(null);
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadObject = useCallback(async () => {
    if (!app || !objectId) return;

    try {
      setIsLoading(true);
      setError(null);

      const objectInstance = await app.getObject(objectId);
      setObject(objectInstance);

      const objectLayout = await objectInstance.getLayout();
      setLayout(objectLayout);

      // Extract data if it's a hypercube object
      if (objectLayout.qHyperCube) {
        const matrix = objectLayout.qHyperCube.qDataPages[0]?.qMatrix || [];
        setData(matrix);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load object');
    } finally {
      setIsLoading(false);
    }
  }, [app, objectId]);

  const refresh = async () => {
    await loadObject();
  };

  useEffect(() => {
    loadObject();
  }, [loadObject]);

  return {
    object,
    layout,
    data,
    isLoading,
    error,
    refresh
  };
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* React Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Component className="h-5 w-5" />
          React Components
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QlikProvider Component</CardTitle>
            <CardDescription>
              Context provider for sharing Qlik instance across components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`// components/QlikProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import { useQlik } from '../hooks/useQlik';

interface QlikContextValue {
  qlik: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  authenticate: () => Promise<void>;
  logout: () => Promise<void>;
}

const QlikContext = createContext<QlikContextValue | undefined>(undefined);

interface QlikProviderProps {
  children: ReactNode;
  config: {
    host: string;
    webIntegrationId: string;
  };
}

export function QlikProvider({ children, config }: QlikProviderProps) {
  const qlikState = useQlik(config);

  return (
    <QlikContext.Provider value={qlikState}>
      {children}
    </QlikContext.Provider>
  );
}

export function useQlikContext() {
  const context = useContext(QlikContext);
  if (context === undefined) {
    throw new Error('useQlikContext must be used within a QlikProvider');
  }
  return context;
}

// Usage in App.tsx
export default function App() {
  return (
    <QlikProvider
      config={{
        host: process.env.REACT_APP_QLIK_HOST!,
        webIntegrationId: process.env.REACT_APP_QLIK_WEB_INTEGRATION_ID!
      }}
    >
      <Dashboard />
    </QlikProvider>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QlikChart Component</CardTitle>
            <CardDescription>
              Reusable component for displaying Qlik visualizations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`// components/QlikChart.tsx
import React, { useRef, useEffect, useState } from 'react';
import { useQlikContext } from './QlikProvider';
import { useQlikApp } from '../hooks/useQlikApp';
import { useQlikObject } from '../hooks/useQlikObject';

interface QlikChartProps {
  appId: string;
  objectId: string;
  height?: number;
  className?: string;
  onError?: (error: string) => void;
}

export function QlikChart({ 
  appId, 
  objectId, 
  height = 400, 
  className = '',
  onError 
}: QlikChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const { qlik, isAuthenticated } = useQlikContext();
  const { app, isLoading: appLoading, error: appError } = useQlikApp({ qlik, appId });
  const { object, layout, isLoading: objectLoading, error: objectError } = useQlikObject({ 
    app, 
    objectId 
  });

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (appError || objectError) {
      onError?.(appError || objectError || 'Unknown error');
    }
  }, [appError, objectError, onError]);

  useEffect(() => {
    if (!object || !chartRef.current || !isAuthenticated || isRendered) return;

    const renderChart = async () => {
      try {
        await object.show(chartRef.current);
        setIsRendered(true);
      } catch (error) {
        console.error('Failed to render chart:', error);
        onError?.(\`Failed to render chart: \${error.message}\`);
      }
    };

    renderChart();
  }, [object, isAuthenticated, isRendered, onError]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded">
        <p>Authentication required</p>
      </div>
    );
  }

  if (appLoading || objectLoading) {
    return (
      <div className="flex items-center justify-center bg-gray-100 rounded" style={{ height }}>
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (appError || objectError) {
    return (
      <div className="flex items-center justify-center bg-red-50 border border-red-200 rounded" style={{ height }}>
        <p className="text-red-600">Error loading chart: {appError || objectError}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {layout && (
        <div className="mb-2">
          <h3 className="text-lg font-semibold">{layout.title}</h3>
          {layout.subtitle && (
            <p className="text-sm text-gray-600">{layout.subtitle}</p>
          )}
        </div>
      )}
      <div 
        ref={chartRef} 
        style={{ height }} 
        className="qlik-chart-container border rounded"
      />
    </div>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">QlikTable Component</CardTitle>
            <CardDescription>
              Component for displaying Qlik data in table format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`// components/QlikTable.tsx
import React from 'react';
import { useQlikContext } from './QlikProvider';
import { useQlikApp } from '../hooks/useQlikApp';
import { useQlikObject } from '../hooks/useQlikObject';

interface QlikTableProps {
  appId: string;
  objectId: string;
  className?: string;
  maxRows?: number;
}

export function QlikTable({ 
  appId, 
  objectId, 
  className = '', 
  maxRows = 100 
}: QlikTableProps) {
  const { qlik } = useQlikContext();
  const { app } = useQlikApp({ qlik, appId });
  const { layout, data, isLoading, error } = useQlikObject({ app, objectId });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!layout || !data) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  const headers = layout.qHyperCube?.qDimensionInfo
    ?.map((dim: any) => dim.qFallbackTitle)
    .concat(layout.qHyperCube?.qMeasureInfo?.map((measure: any) => measure.qFallbackTitle)) || [];

  const displayData = data.slice(0, maxRows);

  return (
    <div className={className}>
      {layout.title && (
        <h3 className="text-lg font-semibold mb-4">{layout.title}</h3>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header, index) => (
                <th key={index} className="border border-gray-200 px-4 py-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell: any, cellIndex: number) => (
                  <td key={cellIndex} className="border border-gray-200 px-4 py-2">
                    {cell.qText || cell.qNum?.toLocaleString() || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length > maxRows && (
        <p className="text-sm text-gray-600 mt-2">
          Showing {maxRows} of {data.length} rows
        </p>
      )}
    </div>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Complete Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Complete Dashboard Example
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Full React Dashboard</CardTitle>
            <CardDescription>
              Complete example showing all components working together
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`// Dashboard.tsx
import React, { useState } from 'react';
import { useQlikContext } from './components/QlikProvider';
import { QlikChart } from './components/QlikChart';
import { QlikTable } from './components/QlikTable';

export function Dashboard() {
  const { qlik, isAuthenticated, isLoading, error, authenticate, logout } = useQlikContext();
  const [selectedAppId, setSelectedAppId] = useState('your-app-id');
  const [chartError, setChartError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={authenticate}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry Authentication
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
          <button
            onClick={authenticate}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign In to Qlik
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {chartError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-600">Chart Error: {chartError}</p>
            <button 
              onClick={() => setChartError(null)}
              className="text-sm underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <QlikChart
              appId={selectedAppId}
              objectId="sales-kpi"
              height={300}
              onError={setChartError}
            />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <QlikChart
              appId={selectedAppId}
              objectId="revenue-trend"
              height={300}
              onError={setChartError}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <QlikTable
              appId={selectedAppId}
              objectId="sales-table"
              maxRows={50}
            />
          </div>
        </div>
      </main>
    </div>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">
            🚀 React Integration Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div>
            <strong>Context Usage:</strong> Use React Context for sharing Qlik
            instances across components
          </div>
          <div>
            <strong>Error Boundaries:</strong> Implement error boundaries to
            catch and handle Qlik-related errors
          </div>
          <div>
            <strong>Loading States:</strong> Always provide loading indicators
            for better UX
          </div>
          <div>
            <strong>Memory Management:</strong> Clean up subscriptions and
            objects in useEffect cleanup
          </div>
          <div>
            <strong>Performance:</strong> Memoize expensive calculations and use
            React.memo for pure components
          </div>
          <div>
            <strong>Type Safety:</strong> Use TypeScript for better development
            experience and error catching
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
