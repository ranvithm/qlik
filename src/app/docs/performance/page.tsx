import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Clock, Database, Monitor } from "lucide-react"

export const metadata: Metadata = {
  title: "Performance Optimization",
  description: "Learn how to optimize performance in your Qlik TypeScript SDK applications",
}

export default function PerformancePage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Performance Optimization"
        description="Master performance optimization techniques to build fast, responsive Qlik applications that scale efficiently."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Performance Optimization Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Performance optimization in Qlik applications involves efficient data loading, smart caching strategies, 
            optimized queries, and proper resource management to deliver excellent user experiences.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Database className="h-3 w-3 mr-1" />
                Data Loading
              </Badge>
              <div className="text-sm text-muted-foreground">
                Efficient data fetching and pagination strategies
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Clock className="h-3 w-3 mr-1" />
                Caching
              </Badge>
              <div className="text-sm text-muted-foreground">
                Intelligent caching of objects and data
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                Query Optimization
              </Badge>
              <div className="text-sm text-muted-foreground">
                Optimized hypercube and selection strategies
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Monitor className="h-3 w-3 mr-1" />
                Monitoring
              </Badge>
              <div className="text-sm text-muted-foreground">
                Performance monitoring and profiling
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Loading Optimization */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Loading Optimization
        </h2>
        
        <Tabs defaultValue="pagination" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pagination">Smart Pagination</TabsTrigger>
            <TabsTrigger value="lazy">Lazy Loading</TabsTrigger>
            <TabsTrigger value="streaming">Data Streaming</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pagination" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smart Pagination Strategy</CardTitle>
                <CardDescription>
                  Implement efficient pagination for large datasets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`class SmartPagination {
  private sessionObject: any;
  private pageSize: number = 100;
  private cache = new Map<number, any[]>();
  private totalRows: number = 0;
  private prefetchPages = 2; // Prefetch next 2 pages

  constructor(sessionObject: any, pageSize: number = 100) {
    this.sessionObject = sessionObject;
    this.pageSize = pageSize;
  }

  async initialize(): Promise<void> {
    const layout = await this.sessionObject.getLayout();
    this.totalRows = layout.qHyperCube.qSize.qcy;
    console.log(\`Initialized pagination for \${this.totalRows} rows\`);
  }

  async getPage(pageNumber: number): Promise<{
    data: any[];
    page: number;
    totalPages: number;
    totalRows: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }> {
    // Check cache first
    if (this.cache.has(pageNumber)) {
      console.log(\`📋 Page \${pageNumber} loaded from cache\`);
      return this.buildPageResponse(pageNumber, this.cache.get(pageNumber)!);
    }

    try {
      // Fetch current page
      const pageData = await this.fetchPageData(pageNumber);
      this.cache.set(pageNumber, pageData);

      // Prefetch nearby pages in background
      this.prefetchNearbyPages(pageNumber);

      console.log(\`📄 Page \${pageNumber} loaded from server\`);
      return this.buildPageResponse(pageNumber, pageData);

    } catch (error) {
      console.error(\`Failed to load page \${pageNumber}:\`, error);
      throw error;
    }
  }

  private async fetchPageData(pageNumber: number): Promise<any[]> {
    const startRow = pageNumber * this.pageSize;
    const layout = await this.sessionObject.getLayout();
    const hypercube = layout.qHyperCube;

    const dataPage = await this.sessionObject.getHyperCubeData('/qHyperCubeDef', [{
      qLeft: 0,
      qTop: startRow,
      qWidth: hypercube.qSize.qcx,
      qHeight: Math.min(this.pageSize, this.totalRows - startRow)
    }]);

    return dataPage[0].qMatrix;
  }

  private async prefetchNearbyPages(currentPage: number): Promise<void> {
    const totalPages = Math.ceil(this.totalRows / this.pageSize);
    const pagesToPrefetch: number[] = [];

    // Prefetch next pages
    for (let i = 1; i <= this.prefetchPages; i++) {
      const nextPage = currentPage + i;
      if (nextPage < totalPages && !this.cache.has(nextPage)) {
        pagesToPrefetch.push(nextPage);
      }
    }

    // Prefetch previous pages
    for (let i = 1; i <= this.prefetchPages; i++) {
      const prevPage = currentPage - i;
      if (prevPage >= 0 && !this.cache.has(prevPage)) {
        pagesToPrefetch.push(prevPage);
      }
    }

    // Fetch in background without blocking
    pagesToPrefetch.forEach(pageNum => {
      this.fetchPageData(pageNum)
        .then(data => {
          this.cache.set(pageNum, data);
          console.log(\`🔄 Prefetched page \${pageNum}\`);
        })
        .catch(error => {
          console.warn(\`Prefetch failed for page \${pageNum}:\`, error);
        });
    });
  }

  private buildPageResponse(pageNumber: number, data: any[]): any {
    const totalPages = Math.ceil(this.totalRows / this.pageSize);
    
    return {
      data,
      page: pageNumber,
      totalPages,
      totalRows: this.totalRows,
      hasNext: pageNumber < totalPages - 1,
      hasPrevious: pageNumber > 0
    };
  }

  // Cache management
  clearCache(): void {
    this.cache.clear();
    console.log('🗑️ Pagination cache cleared');
  }

  getCacheStats(): any {
    return {
      cachedPages: this.cache.size,
      totalPages: Math.ceil(this.totalRows / this.pageSize),
      cacheHitRatio: this.cache.size / Math.ceil(this.totalRows / this.pageSize),
      memoryUsageEstimate: this.cache.size * this.pageSize * 8 // Rough estimate
    };
  }
}

// Usage
async function implementSmartPagination(app: any) {
  // Create large dataset hypercube
  const largeDataObject = await app.createSessionObject({
    qInfo: { qType: 'large-dataset' },
    qHyperCubeDef: {
      qDimensions: [
        { qDef: { qFieldDefs: ['Product'] } },
        { qDef: { qFieldDefs: ['Customer'] } },
        { qDef: { qFieldDefs: ['Date'] } }
      ],
      qMeasures: [
        { qDef: { qDef: 'Sum(Sales)' } },
        { qDef: { qDef: 'Count(OrderID)' } }
      ],
      qInitialDataFetch: [] // Don't fetch initially
    }
  });

  const pagination = new SmartPagination(largeDataObject, 50);
  await pagination.initialize();

  // Load first page
  const firstPage = await pagination.getPage(0);
  console.log('First page:', firstPage);

  // Navigation example
  const nextPage = await pagination.getPage(1);
  console.log('Next page loaded');

  // Check cache performance
  const cacheStats = pagination.getCacheStats();
  console.log('Cache stats:', cacheStats);
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="lazy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lazy Loading Pattern</CardTitle>
                <CardDescription>
                  Load data only when needed with intelligent preloading
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`class LazyDataLoader {
  private app: any;
  private loadedObjects = new Map<string, any>();
  private loadingPromises = new Map<string, Promise<any>>();

  constructor(app: any) {
    this.app = app;
  }

  // Lazy load hypercube with caching
  async lazyLoadHyperCube(config: {
    id: string;
    definition: any;
    priority?: 'high' | 'normal' | 'low';
  }): Promise<any> {
    
    // Return cached object if available
    if (this.loadedObjects.has(config.id)) {
      console.log(\`📋 HyperCube \${config.id} loaded from cache\`);
      return this.loadedObjects.get(config.id);
    }

    // Return existing loading promise if in progress
    if (this.loadingPromises.has(config.id)) {
      console.log(\`⏳ Waiting for \${config.id} to load...\`);
      return await this.loadingPromises.get(config.id);
    }

    // Start loading
    const loadingPromise = this.loadHyperCube(config);
    this.loadingPromises.set(config.id, loadingPromise);

    try {
      const result = await loadingPromise;
      this.loadedObjects.set(config.id, result);
      this.loadingPromises.delete(config.id);
      
      console.log(\`✅ HyperCube \${config.id} loaded successfully\`);
      return result;

    } catch (error) {
      this.loadingPromises.delete(config.id);
      console.error(\`❌ Failed to load HyperCube \${config.id}:\`, error);
      throw error;
    }
  }

  private async loadHyperCube(config: any): Promise<any> {
    // Add loading delay based on priority
    if (config.priority === 'low') {
      await this.delay(100); // Slight delay for low priority
    }

    const sessionObject = await this.app.createSessionObject(config.definition);
    
    // Pre-fetch initial data based on priority
    const initialFetchSize = this.getInitialFetchSize(config.priority);
    
    if (initialFetchSize > 0) {
      await sessionObject.getHyperCubeData('/qHyperCubeDef', [{
        qLeft: 0,
        qTop: 0,
        qWidth: 10, // Adjust based on dimensions + measures
        qHeight: initialFetchSize
      }]);
    }

    return sessionObject;
  }

  // Lazy load with intersection observer (for UI components)
  createIntersectionLoader(
    elementId: string, 
    loadFunction: () => Promise<any>,
    options?: IntersectionObserverInit
  ): IntersectionObserver {
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log(\`🔍 Element \${elementId} is visible, loading data...\`);
            
            loadFunction()
              .then(() => {
                console.log(\`✅ Lazy load completed for \${elementId}\`);
                observer.disconnect(); // Stop observing after loading
              })
              .catch(error => {
                console.error(\`❌ Lazy load failed for \${elementId}:\`, error);
              });
          }
        });
      },
      {
        rootMargin: '50px', // Load 50px before entering viewport
        threshold: 0.1,
        ...options
      }
    );

    const element = document.getElementById(elementId);
    if (element) {
      observer.observe(element);
    }

    return observer;
  }

  // Batch loading for multiple objects
  async batchLazyLoad(configs: Array<{
    id: string;
    definition: any;
    priority?: 'high' | 'normal' | 'low';
  }>): Promise<Map<string, any>> {
    
    // Group by priority
    const highPriority = configs.filter(c => c.priority === 'high');
    const normalPriority = configs.filter(c => c.priority !== 'high' && c.priority !== 'low');
    const lowPriority = configs.filter(c => c.priority === 'low');

    const results = new Map<string, any>();

    // Load high priority first
    for (const config of highPriority) {
      try {
        const result = await this.lazyLoadHyperCube(config);
        results.set(config.id, result);
      } catch (error) {
        console.error(\`High priority load failed for \${config.id}:\`, error);
      }
    }

    // Load normal priority in parallel
    const normalPromises = normalPriority.map(async config => {
      try {
        const result = await this.lazyLoadHyperCube(config);
        results.set(config.id, result);
      } catch (error) {
        console.error(\`Normal priority load failed for \${config.id}:\`, error);
      }
    });

    await Promise.all(normalPromises);

    // Load low priority with delays
    for (const config of lowPriority) {
      try {
        const result = await this.lazyLoadHyperCube(config);
        results.set(config.id, result);
        
        // Small delay between low priority loads
        await this.delay(50);
      } catch (error) {
        console.error(\`Low priority load failed for \${config.id}:\`, error);
      }
    }

    console.log(\`🎯 Batch loading completed: \${results.size}/\${configs.length} successful\`);
    return results;
  }

  private getInitialFetchSize(priority?: string): number {
    switch (priority) {
      case 'high': return 100;
      case 'normal': return 50;
      case 'low': return 10;
      default: return 50;
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Cleanup
  cleanup(): void {
    this.loadedObjects.clear();
    this.loadingPromises.clear();
    console.log('🗑️ Lazy loader cache cleared');
  }
}

// React Hook for Lazy Loading
function useLazyLoad<T>(
  loadFunction: () => Promise<T>,
  dependencies: any[] = []
): {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  reload: () => void;
} {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await loadFunction();
      setData(result);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Load failed');
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  const reload = useCallback(() => {
    load();
  }, [load]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, isLoading, error, reload };
}

// Usage in React
function LazyChartComponent({ app, chartConfig }: any) {
  const { data: chartObject, isLoading, error } = useLazyLoad(
    () => app.createSessionObject(chartConfig),
    [chartConfig]
  );

  if (isLoading) return <div>Loading chart...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!chartObject) return null;

  return <div>Chart loaded successfully!</div>;
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="streaming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Real-time Data Streaming</CardTitle>
                <CardDescription>
                  Efficient streaming for live data updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`class DataStreamManager {
  private streams = new Map<string, any>();
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  // Create efficient data stream
  async createDataStream(config: {
    id: string;
    sessionObject: any;
    updateInterval: number;
    batchSize?: number;
    onDataUpdate: (data: any, metadata: any) => void;
    onError?: (error: any) => void;
  }): Promise<{ stop: () => void; pause: () => void; resume: () => void }> {

    const stream = {
      id: config.id,
      isActive: true,
      isPaused: false,
      updateCount: 0,
      lastUpdate: null as Date | null,
      errors: 0,
      sessionObject: config.sessionObject
    };

    this.streams.set(config.id, stream);

    const updateData = async () => {
      if (!stream.isActive || stream.isPaused) {
        return;
      }

      try {
        const startTime = performance.now();
        
        // Get layout to check for changes
        const layout = await config.sessionObject.getLayout();
        const lastModified = layout.qMeta?.lastReloadTime;

        // Only fetch data if there are actual changes
        if (stream.lastUpdate && lastModified && 
            new Date(lastModified) <= stream.lastUpdate) {
          console.log(\`⏭️ No changes detected for stream \${config.id}\`);
          this.scheduleNextUpdate(config, updateData);
          return;
        }

        // Fetch data efficiently
        const batchSize = config.batchSize || 100;
        const dataPage = await config.sessionObject.getHyperCubeData(
          '/qHyperCubeDef', 
          [{
            qLeft: 0,
            qTop: 0,
            qWidth: 10, // Adjust based on your needs
            qHeight: batchSize
          }]
        );

        const endTime = performance.now();
        const loadTime = endTime - startTime;

        // Update stream metadata
        stream.updateCount++;
        stream.lastUpdate = new Date();

        const metadata = {
          streamId: config.id,
          updateCount: stream.updateCount,
          loadTime,
          dataSize: dataPage[0]?.qMatrix?.length || 0,
          timestamp: stream.lastUpdate.toISOString()
        };

        // Notify with new data
        config.onDataUpdate(dataPage[0]?.qMatrix || [], metadata);

        console.log(\`📊 Stream \${config.id} updated: \${metadata.dataSize} rows in \${loadTime.toFixed(2)}ms\`);

      } catch (error) {
        stream.errors++;
        console.error(\`❌ Stream \${config.id} error #\${stream.errors}:\`, error);
        
        if (config.onError) {
          config.onError(error);
        }

        // Exponential backoff for errors
        const delay = Math.min(config.updateInterval * Math.pow(2, stream.errors - 1), 30000);
        setTimeout(updateData, delay);
        return;
      }

      // Reset error count on success
      stream.errors = 0;
      this.scheduleNextUpdate(config, updateData);
    };

    // Start streaming
    updateData();

    return {
      stop: () => {
        stream.isActive = false;
        this.streams.delete(config.id);
        console.log(\`🛑 Stream \${config.id} stopped\`);
      },
      pause: () => {
        stream.isPaused = true;
        console.log(\`⏸️ Stream \${config.id} paused\`);
      },
      resume: () => {
        stream.isPaused = false;
        console.log(\`▶️ Stream \${config.id} resumed\`);
        updateData();
      }
    };
  }

  private scheduleNextUpdate(config: any, updateFunction: () => Promise<void>): void {
    setTimeout(updateFunction, config.updateInterval);
  }

  // Get all stream statistics
  getStreamStatistics(): any {
    const stats = {
      activeStreams: 0,
      pausedStreams: 0,
      totalUpdates: 0,
      totalErrors: 0,
      streams: [] as any[]
    };

    for (const [id, stream] of this.streams) {
      if (stream.isActive) {
        stats.activeStreams++;
      }
      if (stream.isPaused) {
        stats.pausedStreams++;
      }

      stats.totalUpdates += stream.updateCount;
      stats.totalErrors += stream.errors;

      stats.streams.push({
        id,
        isActive: stream.isActive,
        isPaused: stream.isPaused,
        updateCount: stream.updateCount,
        errors: stream.errors,
        lastUpdate: stream.lastUpdate
      });
    }

    return stats;
  }

  // Stop all streams
  stopAllStreams(): void {
    for (const [id, stream] of this.streams) {
      stream.isActive = false;
    }
    this.streams.clear();
    console.log('🛑 All streams stopped');
  }
}

// Usage
async function setupRealTimeStreaming(app: any) {
  const streamManager = new DataStreamManager(app);

  // Create real-time KPI object
  const kpiObject = await app.createSessionObject({
    qInfo: { qType: 'realtime-kpi' },
    qHyperCubeDef: {
      qMeasures: [
        { qDef: { qDef: 'Sum(Sales)' } },
        { qDef: { qDef: 'Count(Orders)' } }
      ],
      qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 2, qHeight: 1 }]
    }
  });

  // Create data stream
  const kpiStream = await streamManager.createDataStream({
    id: 'realtime-kpi',
    sessionObject: kpiObject,
    updateInterval: 5000, // 5 seconds
    batchSize: 50,
    onDataUpdate: (data, metadata) => {
      console.log(\`KPI Update: \${data.length} rows, Load time: \${metadata.loadTime}ms\`);
      // Update your UI here
    },
    onError: (error) => {
      console.error('KPI stream error:', error);
      // Handle error in UI
    }
  });

  // Stream controls
  setTimeout(() => kpiStream.pause(), 30000); // Pause after 30 seconds
  setTimeout(() => kpiStream.resume(), 45000); // Resume after 45 seconds
  setTimeout(() => kpiStream.stop(), 120000); // Stop after 2 minutes

  return streamManager;
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Caching Strategies */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Caching Strategies
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Multi-Level Caching</CardTitle>
            <CardDescription>
              Implement sophisticated caching for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`class MultiLevelCache {
  private memoryCache = new Map<string, any>();
  private sessionCache = new Map<string, any>();
  private persistentCache = new Map<string, any>();
  private cacheMetrics = new Map<string, any>();

  constructor(
    private maxMemoryItems: number = 100,
    private maxSessionItems: number = 500,
    private maxPersistentItems: number = 1000
  ) {}

  // Get data with automatic cache level selection
  async get(key: string, fetchFunction?: () => Promise<any>): Promise<any> {
    const startTime = performance.now();
    let cacheLevel = 'miss';

    try {
      // Level 1: Memory cache (fastest)
      if (this.memoryCache.has(key)) {
        cacheLevel = 'memory';
        const cached = this.memoryCache.get(key);
        
        if (this.isValid(cached)) {
          this.updateMetrics(key, 'memory', performance.now() - startTime);
          return cached.data;
        } else {
          this.memoryCache.delete(key);
        }
      }

      // Level 2: Session cache
      if (this.sessionCache.has(key)) {
        cacheLevel = 'session';
        const cached = this.sessionCache.get(key);
        
        if (this.isValid(cached)) {
          // Promote to memory cache
          this.set(key, cached.data, 'memory', cached.ttl);
          this.updateMetrics(key, 'session', performance.now() - startTime);
          return cached.data;
        } else {
          this.sessionCache.delete(key);
        }
      }

      // Level 3: Persistent cache (localStorage)
      const persistentData = this.getPersistent(key);
      if (persistentData && this.isValid(persistentData)) {
        cacheLevel = 'persistent';
        
        // Promote to higher levels
        this.set(key, persistentData.data, 'session', persistentData.ttl);
        this.set(key, persistentData.data, 'memory', persistentData.ttl);
        
        this.updateMetrics(key, 'persistent', performance.now() - startTime);
        return persistentData.data;
      }

      // Cache miss - fetch data
      if (fetchFunction) {
        cacheLevel = 'miss';
        const data = await fetchFunction();
        
        // Store in all levels with appropriate TTL
        this.set(key, data, 'memory', 5 * 60 * 1000); // 5 minutes
        this.set(key, data, 'session', 30 * 60 * 1000); // 30 minutes
        this.set(key, data, 'persistent', 24 * 60 * 60 * 1000); // 24 hours
        
        this.updateMetrics(key, 'miss', performance.now() - startTime);
        return data;
      }

      return null;

    } finally {
      console.log(\`🎯 Cache \${cacheLevel} for key '\${key}' in \${(performance.now() - startTime).toFixed(2)}ms\`);
    }
  }

  // Set data in specific cache level
  set(key: string, data: any, level: 'memory' | 'session' | 'persistent', ttl: number = 5 * 60 * 1000): void {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      ttl,
      expires: Date.now() + ttl
    };

    switch (level) {
      case 'memory':
        this.enforceLimit(this.memoryCache, this.maxMemoryItems);
        this.memoryCache.set(key, cacheEntry);
        break;
        
      case 'session':
        this.enforceLimit(this.sessionCache, this.maxSessionItems);
        this.sessionCache.set(key, cacheEntry);
        break;
        
      case 'persistent':
        this.setPersistent(key, cacheEntry);
        break;
    }
  }

  // Intelligent cache invalidation
  invalidate(pattern: string | RegExp): number {
    let invalidatedCount = 0;
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

    // Invalidate across all levels
    [this.memoryCache, this.sessionCache].forEach(cache => {
      const keysToDelete = Array.from(cache.keys()).filter(key => regex.test(key));
      keysToDelete.forEach(key => {
        cache.delete(key);
        invalidatedCount++;
      });
    });

    // Invalidate persistent cache
    try {
      const persistentKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('qlik-cache-') && regex.test(key.substring(11))
      );
      persistentKeys.forEach(key => {
        localStorage.removeItem(key);
        invalidatedCount++;
      });
    } catch (error) {
      console.warn('Failed to invalidate persistent cache:', error);
    }

    console.log(\`🗑️ Invalidated \${invalidatedCount} cache entries matching pattern: \${pattern}\`);
    return invalidatedCount;
  }

  // Cache warming for frequently accessed data
  async warmCache(warmingPlan: Array<{
    key: string;
    fetchFunction: () => Promise<any>;
    priority: 'high' | 'normal' | 'low';
    levels: ('memory' | 'session' | 'persistent')[];
  }>): Promise<void> {
    
    console.log(\`🔥 Starting cache warming for \${warmingPlan.length} items\`);

    // Sort by priority
    const sortedPlan = warmingPlan.sort((a, b) => {
      const priorities = { high: 3, normal: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });

    for (const item of sortedPlan) {
      try {
        const data = await item.fetchFunction();
        
        // Store in requested levels
        item.levels.forEach(level => {
          const ttl = this.getTTLForLevel(level);
          this.set(item.key, data, level, ttl);
        });

        console.log(\`✅ Warmed cache for '\${item.key}' in levels: \${item.levels.join(', ')}\`);

        // Small delay for low priority items
        if (item.priority === 'low') {
          await new Promise(resolve => setTimeout(resolve, 10));
        }

      } catch (error) {
        console.error(\`❌ Cache warming failed for '\${item.key}':\`, error);
      }
    }

    console.log('🎯 Cache warming completed');
  }

  // Get comprehensive cache statistics
  getStatistics(): any {
    const memoryStats = this.getCacheStats(this.memoryCache, 'Memory');
    const sessionStats = this.getCacheStats(this.sessionCache, 'Session');
    const persistentStats = this.getPersistentStats();

    const hitRateStats = Array.from(this.cacheMetrics.entries()).reduce((acc, [key, metrics]) => {
      acc.totalRequests += metrics.requests;
      acc.totalHits += metrics.hits;
      return acc;
    }, { totalRequests: 0, totalHits: 0 });

    return {
      levels: {
        memory: memoryStats,
        session: sessionStats,
        persistent: persistentStats
      },
      hitRate: hitRateStats.totalRequests > 0 ? 
        (hitRateStats.totalHits / hitRateStats.totalRequests) * 100 : 0,
      totalRequests: hitRateStats.totalRequests,
      totalHits: hitRateStats.totalHits
    };
  }

  private isValid(cacheEntry: any): boolean {
    return cacheEntry && Date.now() < cacheEntry.expires;
  }

  private enforceLimit(cache: Map<string, any>, maxItems: number): void {
    while (cache.size >= maxItems) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  }

  private getPersistent(key: string): any {
    try {
      const stored = localStorage.getItem(\`qlik-cache-\${key}\`);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  private setPersistent(key: string, cacheEntry: any): void {
    try {
      // Enforce persistent cache limit
      const keys = Object.keys(localStorage).filter(k => k.startsWith('qlik-cache-'));
      while (keys.length >= this.maxPersistentItems) {
        localStorage.removeItem(keys.shift()!);
      }

      localStorage.setItem(\`qlik-cache-\${key}\`, JSON.stringify(cacheEntry));
    } catch (error) {
      console.warn(\`Failed to set persistent cache for \${key}:\`, error);
    }
  }

  private getTTLForLevel(level: string): number {
    switch (level) {
      case 'memory': return 5 * 60 * 1000; // 5 minutes
      case 'session': return 30 * 60 * 1000; // 30 minutes
      case 'persistent': return 24 * 60 * 60 * 1000; // 24 hours
      default: return 5 * 60 * 1000;
    }
  }

  private updateMetrics(key: string, level: string, time: number): void {
    if (!this.cacheMetrics.has(key)) {
      this.cacheMetrics.set(key, { requests: 0, hits: 0, avgTime: 0 });
    }

    const metrics = this.cacheMetrics.get(key);
    metrics.requests++;
    if (level !== 'miss') metrics.hits++;
    metrics.avgTime = (metrics.avgTime + time) / 2;
  }

  private getCacheStats(cache: Map<string, any>, name: string): any {
    const validEntries = Array.from(cache.values()).filter(entry => this.isValid(entry));
    
    return {
      name,
      size: cache.size,
      validEntries: validEntries.length,
      expiredEntries: cache.size - validEntries.length,
      utilizationPercent: (cache.size / this.getMaxForCache(name)) * 100
    };
  }

  private getMaxForCache(name: string): number {
    switch (name) {
      case 'Memory': return this.maxMemoryItems;
      case 'Session': return this.maxSessionItems;
      default: return 100;
    }
  }

  private getPersistentStats(): any {
    try {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('qlik-cache-'));
      return {
        name: 'Persistent',
        size: keys.length,
        utilizationPercent: (keys.length / this.maxPersistentItems) * 100
      };
    } catch {
      return { name: 'Persistent', size: 0, utilizationPercent: 0 };
    }
  }
}

// Usage
async function implementAdvancedCaching(app: any) {
  const cache = new MultiLevelCache(50, 200, 500);

  // Warm frequently used data
  await cache.warmCache([
    {
      key: 'sales-summary',
      fetchFunction: async () => {
        const obj = await app.createSessionObject({
          qHyperCubeDef: {
            qMeasures: [{ qDef: { qDef: 'Sum(Sales)' } }],
            qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 1, qHeight: 1 }]
          }
        });
        const layout = await obj.getLayout();
        return layout.qHyperCube.qDataPages[0].qMatrix[0][0];
      },
      priority: 'high',
      levels: ['memory', 'session', 'persistent']
    }
  ]);

  // Use cached data
  const salesData = await cache.get('sales-summary');
  console.log('Sales data from cache:', salesData);

  // Get cache performance stats
  const stats = cache.getStatistics();
  console.log('Cache performance:', stats);

  return cache;
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Performance Monitoring */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Monitor className="h-5 w-5" />
          Performance Monitoring
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Monitoring & Profiling</CardTitle>
            <CardDescription>
              Monitor and analyze performance metrics in real-time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`class PerformanceMonitor {
  private metrics = new Map<string, any>();
  private alerts: any[] = [];
  private isMonitoring = false;

  // Start comprehensive performance monitoring
  startMonitoring(): void {
    this.isMonitoring = true;
    console.log('📊 Performance monitoring started');

    // Monitor frame rate
    this.monitorFrameRate();
    
    // Monitor memory usage
    this.monitorMemoryUsage();
    
    // Monitor network performance
    this.monitorNetworkPerformance();
  }

  // Monitor Qlik operation performance
  async measureOperation<T>(
    operationName: string,
    operation: () => Promise<T>,
    thresholds?: { warning: number; critical: number }
  ): Promise<T> {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();

    try {
      const result = await operation();
      const endTime = performance.now();
      const endMemory = this.getMemoryUsage();

      const metrics = {
        operationName,
        duration: endTime - startTime,
        memoryDelta: endMemory.usedJSHeapSize - startMemory.usedJSHeapSize,
        timestamp: new Date().toISOString(),
        status: 'success'
      };

      this.recordMetrics(operationName, metrics);

      // Check thresholds
      if (thresholds) {
        this.checkThresholds(operationName, metrics.duration, thresholds);
      }

      console.log(\`⚡ \${operationName}: \${metrics.duration.toFixed(2)}ms, Memory: +\${(metrics.memoryDelta / 1024 / 1024).toFixed(2)}MB\`);
      
      return result;

    } catch (error) {
      const endTime = performance.now();
      const errorMetrics = {
        operationName,
        duration: endTime - startTime,
        timestamp: new Date().toISOString(),
        status: 'error',
        error: error.message
      };

      this.recordMetrics(operationName, errorMetrics);
      console.error(\`❌ \${operationName} failed after \${(endTime - startTime).toFixed(2)}ms:\`, error);
      
      throw error;
    }
  }

  // Get comprehensive performance report
  getPerformanceReport(): any {
    const report = {
      summary: this.getSummaryStats(),
      operations: this.getOperationStats(),
      alerts: this.alerts.slice(-10), // Last 10 alerts
      systemMetrics: this.getSystemMetrics(),
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  private recordMetrics(operationName: string, metrics: any): void {
    if (!this.metrics.has(operationName)) {
      this.metrics.set(operationName, {
        calls: 0,
        totalDuration: 0,
        avgDuration: 0,
        minDuration: Infinity,
        maxDuration: 0,
        errors: 0,
        lastCall: null
      });
    }

    const operationMetrics = this.metrics.get(operationName);
    operationMetrics.calls++;
    operationMetrics.lastCall = metrics.timestamp;

    if (metrics.status === 'success') {
      operationMetrics.totalDuration += metrics.duration;
      operationMetrics.avgDuration = operationMetrics.totalDuration / operationMetrics.calls;
      operationMetrics.minDuration = Math.min(operationMetrics.minDuration, metrics.duration);
      operationMetrics.maxDuration = Math.max(operationMetrics.maxDuration, metrics.duration);
    } else {
      operationMetrics.errors++;
    }
  }

  private checkThresholds(operationName: string, duration: number, thresholds: any): void {
    if (duration > thresholds.critical) {
      this.addAlert('critical', \`\${operationName} took \${duration.toFixed(2)}ms (critical threshold: \${thresholds.critical}ms)\`);
    } else if (duration > thresholds.warning) {
      this.addAlert('warning', \`\${operationName} took \${duration.toFixed(2)}ms (warning threshold: \${thresholds.warning}ms)\`);
    }
  }

  private addAlert(level: string, message: string): void {
    const alert = {
      level,
      message,
      timestamp: new Date().toISOString()
    };

    this.alerts.push(alert);
    console.warn(\`🚨 Performance Alert [\${level.toUpperCase()}]: \${message}\`);

    // Keep only last 50 alerts
    if (this.alerts.length > 50) {
      this.alerts.shift();
    }
  }

  private monitorFrameRate(): void {
    let lastFrame = performance.now();
    let frameCount = 0;
    let totalFrameTime = 0;

    const measureFrame = (currentFrame: number) => {
      if (!this.isMonitoring) return;

      const deltaTime = currentFrame - lastFrame;
      frameCount++;
      totalFrameTime += deltaTime;

      // Report every 60 frames
      if (frameCount === 60) {
        const avgFrameTime = totalFrameTime / frameCount;
        const fps = 1000 / avgFrameTime;

        if (fps < 30) {
          this.addAlert('warning', \`Low frame rate detected: \${fps.toFixed(1)} FPS\`);
        }

        frameCount = 0;
        totalFrameTime = 0;
      }

      lastFrame = currentFrame;
      requestAnimationFrame(measureFrame);
    };

    requestAnimationFrame(measureFrame);
  }

  private monitorMemoryUsage(): void {
    setInterval(() => {
      if (!this.isMonitoring) return;

      const memory = this.getMemoryUsage();
      const memoryUsageMB = memory.usedJSHeapSize / 1024 / 1024;

      if (memoryUsageMB > 100) { // 100MB threshold
        this.addAlert('warning', \`High memory usage: \${memoryUsageMB.toFixed(2)}MB\`);
      }

      if (memoryUsageMB > 200) { // 200MB threshold
        this.addAlert('critical', \`Critical memory usage: \${memoryUsageMB.toFixed(2)}MB\`);
      }
    }, 10000); // Check every 10 seconds
  }

  private monitorNetworkPerformance(): void {
    // Monitor fetch performance
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        const duration = endTime - startTime;

        if (duration > 5000) { // 5 second threshold
          this.addAlert('warning', \`Slow network request: \${duration.toFixed(2)}ms to \${args[0]}\`);
        }

        return response;
      } catch (error) {
        const endTime = performance.now();
        this.addAlert('error', \`Network request failed after \${(endTime - startTime).toFixed(2)}ms: \${error.message}\`);
        throw error;
      }
    };
  }

  private getMemoryUsage(): any {
    if ('memory' in performance) {
      return (performance as any).memory;
    }
    return { usedJSHeapSize: 0, totalJSHeapSize: 0 };
  }

  private getSummaryStats(): any {
    const totalCalls = Array.from(this.metrics.values()).reduce((sum, m) => sum + m.calls, 0);
    const totalErrors = Array.from(this.metrics.values()).reduce((sum, m) => sum + m.errors, 0);
    
    return {
      totalOperations: this.metrics.size,
      totalCalls,
      totalErrors,
      errorRate: totalCalls > 0 ? (totalErrors / totalCalls) * 100 : 0,
      monitoringDuration: this.isMonitoring ? 'Active' : 'Stopped'
    };
  }

  private getOperationStats(): any[] {
    return Array.from(this.metrics.entries()).map(([name, stats]) => ({
      operation: name,
      ...stats,
      successRate: stats.calls > 0 ? ((stats.calls - stats.errors) / stats.calls) * 100 : 0
    }));
  }

  private getSystemMetrics(): any {
    const memory = this.getMemoryUsage();
    
    return {
      memoryUsage: {
        used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memory.totalJSHeapSize / 1024 / 1024),
        limit: Math.round((memory as any).jsHeapSizeLimit / 1024 / 1024)
      },
      connection: navigator.onLine ? 'online' : 'offline',
      userAgent: navigator.userAgent
    };
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const operationStats = this.getOperationStats();

    // Check for slow operations
    operationStats.forEach(stat => {
      if (stat.avgDuration > 2000) {
        recommendations.push(\`Consider optimizing '\${stat.operation}' - avg duration: \${stat.avgDuration.toFixed(2)}ms\`);
      }
    });

    // Check error rates
    operationStats.forEach(stat => {
      if (stat.successRate < 95 && stat.calls > 10) {
        recommendations.push(\`High error rate for '\${stat.operation}': \${(100 - stat.successRate).toFixed(1)}%\`);
      }
    });

    // Memory recommendations
    const memory = this.getMemoryUsage();
    const memoryUsageMB = memory.usedJSHeapSize / 1024 / 1024;
    if (memoryUsageMB > 50) {
      recommendations.push('Consider implementing more aggressive caching or object cleanup');
    }

    return recommendations.length > 0 ? recommendations : ['Performance looks good! 🎉'];
  }

  stopMonitoring(): void {
    this.isMonitoring = false;
    console.log('📊 Performance monitoring stopped');
  }
}

// Usage
async function implementPerformanceMonitoring(app: any) {
  const monitor = new PerformanceMonitor();
  monitor.startMonitoring();

  // Monitor Qlik operations
  const salesData = await monitor.measureOperation(
    'getSalesData',
    async () => {
      const obj = await app.createSessionObject({
        qHyperCubeDef: {
          qDimensions: [{ qDef: { qFieldDefs: ['Product'] } }],
          qMeasures: [{ qDef: { qDef: 'Sum(Sales)' } }],
          qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 2, qHeight: 100 }]
        }
      });
      return await obj.getLayout();
    },
    { warning: 1000, critical: 3000 }
  );

  // Get performance report
  const report = monitor.getPerformanceReport();
  console.log('Performance Report:', report);

  return monitor;
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardHeader>
          <CardTitle className="text-orange-800 dark:text-orange-200">🚀 Performance Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-orange-700 dark:text-orange-300">
          <div><strong>Data Loading:</strong> Use pagination and lazy loading for large datasets</div>
          <div><strong>Caching:</strong> Implement multi-level caching with appropriate TTL values</div>
          <div><strong>Object Management:</strong> Clean up session objects when no longer needed</div>
          <div><strong>Query Optimization:</strong> Limit initial data fetch sizes and use efficient expressions</div>
          <div><strong>Memory Management:</strong> Monitor memory usage and implement cleanup strategies</div>
          <div><strong>Network Optimization:</strong> Batch requests and use compression when possible</div>
          <div><strong>UI Performance:</strong> Debounce user interactions and use virtual scrolling</div>
          <div><strong>Monitoring:</strong> Continuously monitor performance metrics and set up alerts</div>
        </CardContent>
      </Card>
    </div>
  )
}