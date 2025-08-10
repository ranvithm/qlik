import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Component, Zap, Layers, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Vue Integration",
  description: "Build Vue.js applications with Qlik SDK components and composables",
}

export default function VueIntegrationPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Vue Integration"
        description="Learn how to integrate the Qlik TypeScript SDK with Vue.js applications using the Composition API, composables, and reactive patterns."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Component className="h-5 w-5" />
            Vue Integration Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Vue.js provides excellent reactivity and composability features that work seamlessly with the Qlik SDK. 
            This guide covers Vue 3 Composition API patterns, custom composables, and reactive data management.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                Composables
              </Badge>
              <div className="text-sm text-muted-foreground">
                Custom composables for Qlik SDK functionality
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Layers className="h-3 w-3 mr-1" />
                Components
              </Badge>
              <div className="text-sm text-muted-foreground">
                Reusable Vue components for Qlik data
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Settings className="h-3 w-3 mr-1" />
                State Management
              </Badge>
              <div className="text-sm text-muted-foreground">
                Pinia integration for global state
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Component className="h-3 w-3 mr-1" />
                Reactivity
              </Badge>
              <div className="text-sm text-muted-foreground">
                Vue&apos;s reactive system with Qlik data
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Getting Started</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Installation & Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="bash">
{`# Create Vue 3 project
npm create vue@latest qlik-vue-app
cd qlik-vue-app

# Install dependencies
npm install
npm install qlik

# Install additional dependencies for state management
npm install pinia
npm install @vueuse/core  # Useful Vue utilities

# Install development dependencies
npm install --save-dev @types/node`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Vue Composables */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Vue Composables
        </h2>
        
        <Tabs defaultValue="useQlik" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="useQlik">useQlik</TabsTrigger>
            <TabsTrigger value="useQlikApp">useQlikApp</TabsTrigger>
            <TabsTrigger value="useQlikData">useQlikData</TabsTrigger>
          </TabsList>
          
          <TabsContent value="useQlik" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">useQlik Composable</CardTitle>
                <CardDescription>
                  Core composable for managing Qlik SDK instance and authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`// composables/useQlik.ts
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Qlik from 'qlik'
import type { Ref } from 'vue'

interface QlikConfig {
  host: string
  webIntegrationId: string
  autoAuthenticate?: boolean
}

export function useQlik(config: QlikConfig) {
  const qlik = ref<Qlik | null>(null)
  const isConnected = ref(false)
  const isAuthenticating = ref(false)
  const error = ref<string | null>(null)
  const user = ref<any | null>(null)

  // Computed properties
  const isReady = computed(() => qlik.value && isConnected.value)
  const hasError = computed(() => error.value !== null)

  // Initialize Qlik instance
  const initialize = async () => {
    try {
      qlik.value = new Qlik({
        host: config.host,
        webIntegrationId: config.webIntegrationId
      })

      if (config.autoAuthenticate) {
        await authenticate()
      }

      console.log('✅ Qlik SDK initialized')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to initialize Qlik'
      console.error('❌ Qlik initialization failed:', err)
    }
  }

  // Authenticate with Qlik
  const authenticate = async () => {
    if (!qlik.value || isAuthenticating.value) return

    try {
      isAuthenticating.value = true
      error.value = null

      await qlik.value.authenticateToQlik()
      isConnected.value = true

      // Get user info
      try {
        user.value = await qlik.value.getUserInfo()
      } catch (userErr) {
        console.warn('Could not fetch user info:', userErr)
      }

      console.log('✅ Authentication successful')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Authentication failed'
      isConnected.value = false
      console.error('❌ Authentication failed:', err)
    } finally {
      isAuthenticating.value = false
    }
  }

  // Logout
  const logout = async () => {
    if (!qlik.value) return

    try {
      await qlik.value.logout()
      isConnected.value = false
      user.value = null
      console.log('✅ Logged out successfully')
    } catch (err) {
      console.error('❌ Logout failed:', err)
    }
  }

  // Check authentication status
  const checkAuth = async () => {
    if (!qlik.value) return false

    try {
      const authenticated = await qlik.value.isAuthenticated()
      isConnected.value = authenticated
      return authenticated
    } catch (err) {
      console.error('Auth check failed:', err)
      isConnected.value = false
      return false
    }
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  // Lifecycle hooks
  onMounted(() => {
    initialize()
  })

  onUnmounted(() => {
    // Cleanup if needed
  })

  return {
    // State
    qlik: readonly(qlik),
    isConnected: readonly(isConnected),
    isAuthenticating: readonly(isAuthenticating),
    error: readonly(error),
    user: readonly(user),

    // Computed
    isReady,
    hasError,

    // Methods
    authenticate,
    logout,
    checkAuth,
    clearError
  }
}

// Usage in component
export default {
  setup() {
    const {
      qlik,
      isConnected,
      isAuthenticating,
      error,
      user,
      isReady,
      authenticate,
      logout,
      clearError
    } = useQlik({
      host: 'your-tenant.us.qlikcloud.com',
      webIntegrationId: 'your-web-integration-id',
      autoAuthenticate: true
    })

    return {
      qlik,
      isConnected,
      isAuthenticating,
      error,
      user,
      isReady,
      authenticate,
      logout,
      clearError
    }
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="useQlikApp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">useQlikApp Composable</CardTitle>
                <CardDescription>
                  Composable for managing Qlik application instances and sheets
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`// composables/useQlikApp.ts
import { ref, watch, computed } from 'vue'
import type { Ref } from 'vue'

interface UseQlikAppOptions {
  qlik: Ref<any>
  appId: string
}

export function useQlikApp({ qlik, appId }: UseQlikAppOptions) {
  const app = ref<any>(null)
  const sheets = ref<any[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const isReady = computed(() => app.value !== null)
  const hasSheets = computed(() => sheets.value.length > 0)

  // Load app
  const loadApp = async () => {
    if (!qlik.value || !appId || isLoading.value) return

    try {
      isLoading.value = true
      error.value = null

      app.value = await qlik.value.getApp(appId)
      console.log(\`✅ App loaded: \${appId}\`)

      // Load sheets
      await loadSheets()

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load app'
      console.error(\`❌ App load failed: \${appId}\`, err)
    } finally {
      isLoading.value = false
    }
  }

  // Load sheets
  const loadSheets = async () => {
    if (!app.value) return

    try {
      const appSheets = await app.value.getSheets()
      sheets.value = appSheets.map((sheet: any) => ({
        id: sheet.qInfo.qId,
        title: sheet.qMeta.title,
        description: sheet.qMeta.description,
        published: sheet.qMeta.published,
        rank: sheet.rank
      }))
      
      console.log(\`✅ Loaded \${sheets.value.length} sheets\`)
    } catch (err) {
      console.error('❌ Failed to load sheets:', err)
    }
  }

  // Get specific sheet
  const getSheet = async (sheetId: string) => {
    if (!app.value) return null

    try {
      return await app.value.getSheet(sheetId)
    } catch (err) {
      console.error(\`Failed to get sheet \${sheetId}:\`, err)
      return null
    }
  }

  // Make selections
  const selectInField = async (fieldName: string, values: string[]) => {
    if (!app.value) return

    try {
      const field = await app.value.getField(fieldName)
      await field.selectValues(values)
      console.log(\`✅ Selected in \${fieldName}:\`, values)
    } catch (err) {
      console.error(\`Selection failed for \${fieldName}:\`, err)
    }
  }

  // Clear selections
  const clearSelections = async (fieldName?: string) => {
    if (!app.value) return

    try {
      if (fieldName) {
        const field = await app.value.getField(fieldName)
        await field.clear()
      } else {
        await app.value.clearAll()
      }
      console.log('✅ Selections cleared')
    } catch (err) {
      console.error('Clear selections failed:', err)
    }
  }

  // Refresh app data
  const refresh = async () => {
    await loadApp()
  }

  // Watch for Qlik instance changes
  watch(qlik, (newQlik) => {
    if (newQlik && appId) {
      loadApp()
    }
  }, { immediate: true })

  return {
    // State
    app: readonly(app),
    sheets: readonly(sheets),
    isLoading: readonly(isLoading),
    error: readonly(error),

    // Computed
    isReady,
    hasSheets,

    // Methods
    loadApp,
    loadSheets,
    getSheet,
    selectInField,
    clearSelections,
    refresh
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="useQlikData" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">useQlikData Composable</CardTitle>
                <CardDescription>
                  Reactive data fetching and management for Qlik objects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`// composables/useQlikData.ts
import { ref, watch, computed, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface HyperCubeDefinition {
  qDimensions?: any[]
  qMeasures?: any[]
  qInitialDataFetch?: any[]
  qSuppressZero?: boolean
  qSuppressMissing?: boolean
}

interface UseQlikDataOptions {
  app: Ref<any>
  definition: HyperCubeDefinition
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useQlikData({
  app,
  definition,
  autoRefresh = false,
  refreshInterval = 30000
}: UseQlikDataOptions) {
  const data = ref<any[]>([])
  const headers = ref<string[]>([])
  const sessionObject = ref<any>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const lastUpdated = ref<Date | null>(null)

  let refreshTimer: NodeJS.Timeout | null = null

  // Computed
  const hasData = computed(() => data.value.length > 0)
  const isEmpty = computed(() => !isLoading.value && !hasData.value)
  const isStale = computed(() => {
    if (!lastUpdated.value || !autoRefresh) return false
    return Date.now() - lastUpdated.value.getTime() > refreshInterval * 2
  })

  // Create session object and fetch data
  const fetchData = async () => {
    if (!app.value || isLoading.value) return

    try {
      isLoading.value = true
      error.value = null

      // Create session object if it doesn't exist
      if (!sessionObject.value) {
        sessionObject.value = await app.value.createSessionObject({
          qInfo: { qType: 'data-object' },
          qHyperCubeDef: definition
        })
      }

      // Get layout and data
      const layout = await sessionObject.value.getLayout()
      const hypercube = layout.qHyperCube

      if (hypercube) {
        // Extract headers
        const dimensionHeaders = hypercube.qDimensionInfo?.map((dim: any) =>
          dim.qFallbackTitle || dim.qFieldLabels?.[0] || 'Dimension'
        ) || []

        const measureHeaders = hypercube.qMeasureInfo?.map((measure: any) =>
          measure.qFallbackTitle || 'Measure'
        ) || []

        headers.value = [...dimensionHeaders, ...measureHeaders]

        // Extract data
        const matrix = hypercube.qDataPages?.[0]?.qMatrix || []
        data.value = matrix.map((row: any[]) =>
          row.map((cell: any) => ({
            text: cell.qText || '',
            number: cell.qNum,
            state: cell.qState,
            isNumeric: typeof cell.qNum === 'number' && !isNaN(cell.qNum)
          }))
        )

        lastUpdated.value = new Date()
        console.log(\`✅ Data loaded: \${data.value.length} rows\`)
      }

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch data'
      console.error('❌ Data fetch failed:', err)
    } finally {
      isLoading.value = false
    }
  }

  // Refresh data manually
  const refresh = async () => {
    await fetchData()
  }

  // Start auto-refresh
  const startAutoRefresh = () => {
    if (!autoRefresh || refreshTimer) return

    refreshTimer = setInterval(() => {
      fetchData()
    }, refreshInterval)

    console.log(\`🔄 Auto-refresh started: \${refreshInterval}ms\`)
  }

  // Stop auto-refresh
  const stopAutoRefresh = () => {
    if (refreshTimer) {
      clearInterval(refreshTimer)
      refreshTimer = null
      console.log('⏹️ Auto-refresh stopped')
    }
  }

  // Get data with pagination
  const getPage = async (page: number, pageSize: number = 100) => {
    if (!sessionObject.value) return { data: [], totalRows: 0 }

    try {
      const layout = await sessionObject.value.getLayout()
      const totalRows = layout.qHyperCube.qSize.qcy
      const startRow = page * pageSize

      const pageData = await sessionObject.value.getHyperCubeData('/qHyperCubeDef', [{
        qLeft: 0,
        qTop: startRow,
        qWidth: layout.qHyperCube.qSize.qcx,
        qHeight: Math.min(pageSize, totalRows - startRow)
      }])

      const processedData = pageData[0].qMatrix.map((row: any[]) =>
        row.map((cell: any) => ({
          text: cell.qText || '',
          number: cell.qNum,
          state: cell.qState,
          isNumeric: typeof cell.qNum === 'number' && !isNaN(cell.qNum)
        }))
      )

      return {
        data: processedData,
        totalRows,
        page,
        pageSize,
        totalPages: Math.ceil(totalRows / pageSize)
      }

    } catch (err) {
      console.error('Pagination failed:', err)
      return { data: [], totalRows: 0 }
    }
  }

  // Clear data and cleanup
  const clear = async () => {
    stopAutoRefresh()
    
    if (sessionObject.value) {
      try {
        await sessionObject.value.destroy()
      } catch (err) {
        console.error('Failed to destroy session object:', err)
      }
    }

    data.value = []
    headers.value = []
    sessionObject.value = null
    lastUpdated.value = null
    error.value = null
  }

  // Watch for app changes
  watch(app, (newApp) => {
    if (newApp) {
      fetchData()
      if (autoRefresh) {
        startAutoRefresh()
      }
    } else {
      clear()
    }
  }, { immediate: true })

  // Cleanup on unmount
  onUnmounted(() => {
    clear()
  })

  return {
    // State
    data: readonly(data),
    headers: readonly(headers),
    isLoading: readonly(isLoading),
    error: readonly(error),
    lastUpdated: readonly(lastUpdated),

    // Computed
    hasData,
    isEmpty,
    isStale,

    // Methods
    fetchData,
    refresh,
    getPage,
    startAutoRefresh,
    stopAutoRefresh,
    clear
  }
}

// Usage example
export default {
  setup() {
    const { app } = useQlikApp({ /* ... */ })

    const {
      data,
      headers,
      isLoading,
      error,
      hasData,
      refresh
    } = useQlikData({
      app,
      definition: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Product'] } }
        ],
        qMeasures: [
          { qDef: { qDef: 'Sum(Sales)' } }
        ],
        qInitialDataFetch: [
          { qLeft: 0, qTop: 0, qWidth: 2, qHeight: 100 }
        ]
      },
      autoRefresh: true,
      refreshInterval: 30000
    })

    return {
      data,
      headers,
      isLoading,
      error,
      hasData,
      refresh
    }
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Vue Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Vue Components
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reusable Qlik Components</CardTitle>
            <CardDescription>
              Pre-built Vue components for common Qlik visualizations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="vue">
{`<!-- components/QlikChart.vue -->
<template>
  <div class="qlik-chart" :class="{ 'is-loading': isLoading }">
    <div v-if="title" class="chart-header">
      <h3 class="chart-title">{{ title }}</h3>
      <div class="chart-actions">
        <button @click="refresh" :disabled="isLoading" class="btn-refresh">
          <RefreshIcon :class="{ 'animate-spin': isLoading }" />
        </button>
      </div>
    </div>

    <div class="chart-content">
      <!-- Loading state -->
      <div v-if="isLoading" class="chart-loading">
        <div class="loading-spinner"></div>
        <p>Loading chart data...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="chart-error">
        <AlertIcon />
        <p>{{ error }}</p>
        <button @click="refresh" class="btn-retry">Try Again</button>
      </div>

      <!-- Chart content -->
      <div v-else-if="hasData" class="chart-visualization" ref="chartRef">
        <!-- Chart will be rendered here -->
      </div>

      <!-- Empty state -->
      <div v-else class="chart-empty">
        <p>No data available</p>
      </div>
    </div>

    <!-- Chart metadata -->
    <div v-if="showMetadata && lastUpdated" class="chart-metadata">
      <small>Last updated: {{ formatDate(lastUpdated) }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useQlikData } from '@/composables/useQlikData'
import { RefreshIcon, AlertIcon } from 'lucide-vue-next'

interface Props {
  app: any
  definition: any
  title?: string
  height?: number
  showMetadata?: boolean
  autoRefresh?: boolean
  refreshInterval?: number
}

const props = withDefaults(defineProps<Props>(), {
  height: 400,
  showMetadata: true,
  autoRefresh: false,
  refreshInterval: 30000
})

const chartRef = ref<HTMLElement>()

// Use the data composable
const {
  data,
  headers,
  isLoading,
  error,
  hasData,
  lastUpdated,
  refresh
} = useQlikData({
  app: computed(() => props.app),
  definition: props.definition,
  autoRefresh: props.autoRefresh,
  refreshInterval: props.refreshInterval
})

// Chart rendering logic
const renderChart = () => {
  if (!chartRef.value || !hasData.value) return

  // Implement your chart rendering logic here
  // This could use D3.js, Chart.js, or any other visualization library
  console.log('Rendering chart with data:', data.value)
}

// Format date utility
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Watch for data changes
watch(data, () => {
  renderChart()
}, { deep: true })

// Render chart when component mounts
onMounted(() => {
  renderChart()
})
</script>

<style scoped>
.qlik-chart {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;
}

.chart-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.chart-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-refresh {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-refresh:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.btn-refresh:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chart-content {
  position: relative;
  min-height: 400px;
}

.chart-loading,
.chart-error,
.chart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  color: #6b7280;
}

.loading-spinner {
  width: 2rem;
  height: 2rem;
  border: 2px solid #f3f4f6;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.chart-error {
  color: #dc2626;
}

.btn-retry {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid #dc2626;
  border-radius: 0.375rem;
  background-color: white;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-retry:hover {
  background-color: #dc2626;
  color: white;
}

.chart-metadata {
  padding: 0.5rem 1rem;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
  color: #6b7280;
  font-size: 0.875rem;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* State Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-5 w-5" />
          State Management with Pinia
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Qlik Store with Pinia</CardTitle>
            <CardDescription>
              Centralized state management for Qlik data and authentication
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`// stores/qlik.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import Qlik from 'qlik'

export const useQlikStore = defineStore('qlik', () => {
  // State
  const qlik = ref<Qlik | null>(null)
  const isAuthenticated = ref(false)
  const isConnecting = ref(false)
  const user = ref<any | null>(null)
  const error = ref<string | null>(null)
  const apps = ref<any[]>([])
  const currentApp = ref<any | null>(null)

  // Getters
  const isReady = computed(() => qlik.value !== null && isAuthenticated.value)
  const hasApps = computed(() => apps.value.length > 0)
  const currentAppName = computed(() => currentApp.value?.name || 'No app selected')

  // Actions
  const initialize = async (config: { host: string; webIntegrationId: string }) => {
    try {
      isConnecting.value = true
      error.value = null

      qlik.value = new Qlik(config)
      await qlik.value.authenticateToQlik()
      
      isAuthenticated.value = true
      
      // Get user info
      try {
        user.value = await qlik.value.getUserInfo()
      } catch (err) {
        console.warn('Could not fetch user info:', err)
      }

      // Load apps
      await loadApps()

      console.log('✅ Qlik store initialized')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Initialization failed'
      console.error('❌ Qlik store initialization failed:', err)
    } finally {
      isConnecting.value = false
    }
  }

  const loadApps = async () => {
    if (!qlik.value || !isAuthenticated.value) return

    try {
      const appList = await qlik.value.getAppList()
      apps.value = appList.map((app: any) => ({
        id: app.id,
        name: app.name,
        description: app.description,
        published: app.published,
        owner: app.owner
      }))

      console.log(\`✅ Loaded \${apps.value.length} apps\`)
    } catch (err) {
      console.error('❌ Failed to load apps:', err)
    }
  }

  const selectApp = async (appId: string) => {
    if (!qlik.value || !isAuthenticated.value) return

    try {
      const app = await qlik.value.getApp(appId)
      currentApp.value = {
        id: appId,
        instance: app,
        name: apps.value.find(a => a.id === appId)?.name || 'Unknown App'
      }

      console.log(\`✅ Selected app: \${currentApp.value.name}\`)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to select app'
      console.error(\`❌ Failed to select app \${appId}:\`, err)
    }
  }

  const logout = async () => {
    try {
      if (qlik.value) {
        await qlik.value.logout()
      }
      
      // Reset state
      qlik.value = null
      isAuthenticated.value = false
      user.value = null
      apps.value = []
      currentApp.value = null
      error.value = null

      console.log('✅ Logged out successfully')
    } catch (err) {
      console.error('❌ Logout failed:', err)
    }
  }

  const clearError = () => {
    error.value = null
  }

  const refreshApps = async () => {
    await loadApps()
  }

  // Return store interface
  return {
    // State
    qlik: readonly(qlik),
    isAuthenticated: readonly(isAuthenticated),
    isConnecting: readonly(isConnecting),
    user: readonly(user),
    error: readonly(error),
    apps: readonly(apps),
    currentApp: readonly(currentApp),

    // Getters
    isReady,
    hasApps,
    currentAppName,

    // Actions
    initialize,
    loadApps,
    selectApp,
    logout,
    clearError,
    refreshApps
  }
})

// Usage in component
export default {
  setup() {
    const qlikStore = useQlikStore()

    onMounted(() => {
      qlikStore.initialize({
        host: 'your-tenant.us.qlikcloud.com',
        webIntegrationId: 'your-web-integration-id'
      })
    })

    return {
      ...qlikStore
    }
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Complete Vue App Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Complete Vue Application</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Full Dashboard Example</CardTitle>
            <CardDescription>
              Complete Vue.js dashboard using all the patterns above
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="vue">
{`<!-- App.vue -->
<template>
  <div id="app" class="app">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-brand">
        <h1>Qlik Analytics Dashboard</h1>
      </div>
      <div class="nav-actions">
        <div v-if="isAuthenticated" class="user-info">
          <span>Welcome, {{ user?.name || 'User' }}</span>
          <button @click="logout" class="btn-logout">Logout</button>
        </div>
        <div v-else-if="isConnecting" class="connecting">
          <span>Connecting...</span>
        </div>
        <div v-else-if="error" class="error">
          <span>{{ error }}</span>
          <button @click="clearError" class="btn-clear">Clear</button>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="main-content">
      <!-- Loading state -->
      <div v-if="isConnecting" class="loading-screen">
        <div class="loading-spinner large"></div>
        <p>Initializing Qlik connection...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="error-screen">
        <h2>Connection Error</h2>
        <p>{{ error }}</p>
        <button @click="retryConnection" class="btn-retry">Retry Connection</button>
      </div>

      <!-- Authentication required -->
      <div v-else-if="!isAuthenticated" class="auth-screen">
        <h2>Authentication Required</h2>
        <p>Please authenticate to access your Qlik analytics.</p>
      </div>

      <!-- Dashboard -->
      <div v-else class="dashboard">
        <!-- App selector -->
        <div class="app-selector">
          <label for="app-select">Select Application:</label>
          <select 
            id="app-select" 
            v-model="selectedAppId" 
            @change="handleAppChange"
            class="app-select"
          >
            <option value="">Choose an app...</option>
            <option 
              v-for="app in apps" 
              :key="app.id" 
              :value="app.id"
            >
              {{ app.name }}
            </option>
          </select>
        </div>

        <!-- Charts grid -->
        <div v-if="currentApp" class="charts-grid">
          <QlikChart
            :app="currentApp.instance"
            :definition="salesChartDef"
            title="Sales by Product"
            :auto-refresh="true"
            :refresh-interval="30000"
          />
          
          <QlikChart
            :app="currentApp.instance"
            :definition="revenueChartDef"
            title="Revenue Trend"
            :auto-refresh="true"
          />
          
          <QlikDataTable
            :app="currentApp.instance"
            :definition="customerTableDef"
            title="Top Customers"
            :page-size="10"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="empty-state">
          <p>Please select an application to view analytics.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useQlikStore } from './stores/qlik'
import QlikChart from './components/QlikChart.vue'
import QlikDataTable from './components/QlikDataTable.vue'

// Store
const qlikStore = useQlikStore()
const {
  isAuthenticated,
  isConnecting,
  user,
  error,
  apps,
  currentApp,
  isReady,
  initialize,
  selectApp,
  logout,
  clearError
} = qlikStore

// Local state
const selectedAppId = ref('')

// Chart definitions
const salesChartDef = {
  qDimensions: [
    { qDef: { qFieldDefs: ['Product'] } }
  ],
  qMeasures: [
    { qDef: { qDef: 'Sum(Sales)', qLabel: 'Total Sales' } }
  ],
  qInitialDataFetch: [
    { qLeft: 0, qTop: 0, qWidth: 2, qHeight: 100 }
  ]
}

const revenueChartDef = {
  qDimensions: [
    { qDef: { qFieldDefs: ['Month'] } }
  ],
  qMeasures: [
    { qDef: { qDef: 'Sum(Revenue)', qLabel: 'Monthly Revenue' } }
  ],
  qInitialDataFetch: [
    { qLeft: 0, qTop: 0, qWidth: 2, qHeight: 12 }
  ]
}

const customerTableDef = {
  qDimensions: [
    { qDef: { qFieldDefs: ['Customer'] } }
  ],
  qMeasures: [
    { qDef: { qDef: 'Sum(Sales)', qLabel: 'Total Sales' } },
    { qDef: { qDef: 'Count(OrderID)', qLabel: 'Orders' } }
  ],
  qInitialDataFetch: [
    { qLeft: 0, qTop: 0, qWidth: 3, qHeight: 10 }
  ]
}

// Methods
const handleAppChange = () => {
  if (selectedAppId.value) {
    selectApp(selectedAppId.value)
  }
}

const retryConnection = () => {
  initialize({
    host: import.meta.env.VITE_QLIK_HOST,
    webIntegrationId: import.meta.env.VITE_QLIK_WEB_INTEGRATION_ID
  })
}

// Initialize on mount
onMounted(() => {
  retryConnection()
})

// Watch for current app changes
watch(currentApp, (newApp) => {
  if (newApp) {
    selectedAppId.value = newApp.id
  }
})
</script>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #f8fafc;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.nav-brand h1 {
  margin: 0;
  color: #1e293b;
  font-size: 1.5rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-logout,
.btn-clear,
.btn-retry {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-logout:hover,
.btn-clear:hover,
.btn-retry:hover {
  background-color: #f3f4f6;
}

.main-content {
  padding: 2rem;
}

.loading-screen,
.error-screen,
.auth-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loading-spinner.large {
  width: 3rem;
  height: 3rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.app-selector {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-select {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  min-width: 200px;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: #6b7280;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-200">🎯 Vue Integration Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div><strong>Composables:</strong> Use composables for reusable Qlik functionality</div>
          <div><strong>Reactivity:</strong> Leverage Vue&apos;s reactive system for automatic UI updates</div>
          <div><strong>State Management:</strong> Use Pinia for centralized Qlik state management</div>
          <div><strong>Error Handling:</strong> Implement comprehensive error states in components</div>
          <div><strong>Performance:</strong> Use readonly refs and computed properties for optimization</div>
          <div><strong>Cleanup:</strong> Properly cleanup resources in onUnmounted hooks</div>
          <div><strong>TypeScript:</strong> Use TypeScript for better development experience</div>
          <div><strong>Testing:</strong> Write tests for composables and components</div>
        </CardContent>
      </Card>
    </div>
  )
}