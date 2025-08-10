import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CodeBlock } from "@/components/code-block"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

export const metadata: Metadata = {
  title: "Examples",
  description: "Real-world implementation examples using the Qlik TypeScript SDK",
}

export default function ExamplesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-6 lg:py-8">
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Examples</h1>
          <p className="text-xl text-muted-foreground">
            Real-world implementations using the Qlik TypeScript SDK with popular frameworks.
          </p>
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">All</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">React</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Vue</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Node.js</Badge>
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Data Visualization</Badge>
        </div>

        <div className="space-y-8">
          {/* React Dashboard Example */}
          <Card id="react-dashboard">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-2xl">React Analytics Dashboard</CardTitle>
                    <Badge>React</Badge>
                    <Badge variant="outline">Data Visualization</Badge>
                  </div>
                  <CardDescription>
                    Build a responsive analytics dashboard with React and the Qlik SDK featuring real-time data updates, interactive charts, and user authentication.
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
                    <li>• Real-time data updates</li>
                    <li>• Interactive charts and visualizations</li>
                    <li>• User authentication flow</li>
                    <li>• Responsive design</li>
                    <li>• TypeScript support</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">React 18</Badge>
                    <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs">Qlik SDK</Badge>
                    <Badge variant="secondary" className="text-xs">Tailwind CSS</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Setup</h4>
                <CodeBlock language="bash">
{`npx create-react-app qlik-dashboard --template typescript
cd qlik-dashboard
npm install qlik @types/react`}
                </CodeBlock>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Core Component</h4>
                <CodeBlock language="typescript">
{`// src/QlikDashboard.tsx
import React, { useEffect, useState } from 'react';
import Qlik from 'qlik';

interface DashboardProps {
  appId: string;
}

export const QlikDashboard: React.FC<DashboardProps> = ({ appId }) => {
  const [qlik, setQlik] = useState<Qlik | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeQlik = async () => {
      try {
        const qlikInstance = new Qlik({
          host: process.env.REACT_APP_QLIK_HOST!,
          webIntegrationId: process.env.REACT_APP_QLIK_WEB_INTEGRATION_ID!
        });

        await qlikInstance.authenticateToQlik();
        setQlik(qlikInstance);
        setIsAuthenticated(true);

        const appInstance = await qlikInstance.getApp(appId);
        setApp(appInstance);
      } catch (error) {
        console.error('Qlik initialization failed:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeQlik();
  }, [appId]);

  if (loading) return <div>Loading Qlik dashboard...</div>;
  if (!isAuthenticated) return <div>Authentication required</div>;

  return (
    <div className="qlik-dashboard">
      <header>
        <h1>Sales Analytics Dashboard</h1>
        <p>Real-time insights from Qlik Sense</p>
      </header>
      
      <div className="dashboard-grid">
        <QlikChart app={app} objectId="sales-kpi" />
        <QlikChart app={app} objectId="revenue-trend" />
        <QlikTable app={app} objectId="top-products" />
      </div>
    </div>
  );
};`}
                </CodeBlock>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Chart Component</h4>
                <CodeBlock language="typescript">
{`// src/QlikChart.tsx
import React, { useEffect, useRef, useState } from 'react';

interface QlikChartProps {
  app: any;
  objectId: string;
}

export const QlikChart: React.FC<QlikChartProps> = ({ app, objectId }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!app || !chartRef.current) return;

    const loadChart = async () => {
      try {
        const object = await app.getObject(objectId);
        await object.show(chartRef.current);
      } catch (err) {
        setError(\`Failed to load chart: \${err.message}\`);
      }
    };

    loadChart();
  }, [app, objectId]);

  if (error) {
    return <div className="chart-error">{error}</div>;
  }

  return <div ref={chartRef} className="qlik-chart" />;
};`}
                </CodeBlock>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Concepts Demonstrated</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>React Hooks Integration</strong> - Using useEffect and useState for Qlik lifecycle management</div>
                  <div><strong>Error Handling</strong> - Graceful error handling for authentication and chart loading</div>
                  <div><strong>Component Architecture</strong> - Reusable chart components with props-based configuration</div>
                  <div><strong>Environment Configuration</strong> - Using environment variables for sensitive configuration</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Node.js Data Pipeline Example */}
          <Card id="nodejs-pipeline">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-2xl">Node.js Data Processing Pipeline</CardTitle>
                    <Badge>Node.js</Badge>
                    <Badge variant="outline">ETL</Badge>
                  </div>
                  <CardDescription>
                    Process and transform Qlik Sense data using Node.js for automated ETL workflows, data exports, and scheduled processing.
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
                  <h4 className="font-semibold">Use Case</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Extract data from multiple Qlik apps</li>
                    <li>• Transform and enrich data</li>
                    <li>• Export to external systems</li>
                    <li>• Schedule automated runs</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Node.js</Badge>
                    <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs">csv-writer</Badge>
                    <Badge variant="secondary" className="text-xs">node-cron</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Setup</h4>
                <CodeBlock language="bash">
{`mkdir qlik-data-pipeline
cd qlik-data-pipeline
npm init -y
npm install qlik dotenv csv-writer node-cron
npm install -D @types/node typescript ts-node`}
                </CodeBlock>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Main Pipeline Class</h4>
                <CodeBlock language="typescript">
{`// src/pipeline.ts
import Qlik from 'qlik';
import { createObjectCsvWriter } from 'csv-writer';
import dotenv from 'dotenv';

dotenv.config();

interface SalesRecord {
  date: string;
  product: string;
  revenue: number;
  units: number;
  region: string;
}

class QlikDataPipeline {
  private qlik: Qlik;

  constructor() {
    this.qlik = new Qlik({
      host: process.env.QLIK_HOST!,
      webIntegrationId: process.env.QLIK_WEB_INTEGRATION_ID!
    });
  }

  async initialize(): Promise<void> {
    try {
      await this.qlik.authenticateToQlik();
      console.log('✅ Authenticated to Qlik');
    } catch (error) {
      throw new Error(\`Authentication failed: \${error.message}\`);
    }
  }

  async extractSalesData(appId: string): Promise<SalesRecord[]> {
    const app = await this.qlik.getApp(appId);
    
    const sessionObject = await app.createSessionObject({
      qInfo: { qType: 'my-data-extract' },
      qHyperCubeDef: {
        qDimensions: [
          { qDef: { qFieldDefs: ['Date'] } },
          { qDef: { qFieldDefs: ['Product'] } },
          { qDef: { qFieldDefs: ['Region'] } }
        ],
        qMeasures: [
          { qDef: { qDef: 'Sum(Revenue)' } },
          { qDef: { qDef: 'Sum(Units)' } }
        ]
      }
    });

    const layout = await sessionObject.getLayout();
    const matrix = layout.qHyperCube.qDataPages[0].qMatrix;

    return matrix.map(row => ({
      date: row[0].qText,
      product: row[1].qText,
      region: row[2].qText,
      revenue: row[3].qNum,
      units: row[4].qNum
    }));
  }

  async runPipeline(appId: string): Promise<void> {
    console.log('🚀 Starting data pipeline...');
    
    try {
      await this.initialize();
      
      console.log('📊 Extracting data from Qlik...');
      const rawData = await this.extractSalesData(appId);
      
      console.log('🔄 Transforming data...');
      const transformedData = this.transformData(rawData);
      
      console.log('💾 Exporting to CSV...');
      await this.exportToCsv(transformedData, 'sales-data.csv');
      
      console.log('✅ Pipeline completed successfully!');
    } catch (error) {
      console.error('❌ Pipeline failed:', error);
      throw error;
    }
  }
}`}
                </CodeBlock>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Key Features</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>Authentication Management</strong> - Secure authentication handling</div>
                  <div><strong>Data Extraction</strong> - Using hypercubes for efficient data retrieval</div>
                  <div><strong>Data Transformation</strong> - Server-side data processing and enrichment</div>
                  <div><strong>Multiple Export Formats</strong> - CSV, JSON, database integration</div>
                  <div><strong>Scheduling</strong> - Automated pipeline execution with cron</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vue.js Interactive Visualization Example */}
          <Card id="vue-visualization">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-2xl">Vue.js Interactive Data Visualization</CardTitle>
                    <Badge>Vue</Badge>
                    <Badge variant="outline">D3.js</Badge>
                  </div>
                  <CardDescription>
                    Create interactive visualizations with Vue.js and D3.js, featuring dynamic filtering, real-time updates, and custom visualizations.
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
                    <li>• Dynamic filtering with Qlik selections</li>
                    <li>• Real-time chart updates</li>
                    <li>• Custom D3.js visualizations</li>
                    <li>• Responsive design</li>
                    <li>• Vue 3 Composition API</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Vue 3</Badge>
                    <Badge variant="secondary" className="text-xs">TypeScript</Badge>
                    <Badge variant="secondary" className="text-xs">D3.js</Badge>
                    <Badge variant="secondary" className="text-xs">Qlik SDK</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Setup</h4>
                <CodeBlock language="bash">
{`vue create qlik-viz-app --typescript
cd qlik-viz-app
npm install qlik d3 @types/d3`}
                </CodeBlock>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Main Vue Component</h4>
                <CodeBlock language="vue">
{`<template>
  <div class="qlik-visualization">
    <div class="controls">
      <select v-model="selectedRegion" @change="applyFilters">
        <option value="">All Regions</option>
        <option v-for="region in regions" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
    </div>
    
    <div class="chart-container">
      <svg ref="chartSvg" width="800" height="400"></svg>
    </div>
    
    <div class="data-table">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Sales</th>
            <th>Growth</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in chartData" :key="item.product">
            <td>{{ item.product }}</td>
            <td>{{ formatCurrency(item.sales) }}</td>
            <td :class="item.growth >= 0 ? 'positive' : 'negative'">
              {{ item.growth.toFixed(1) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Qlik from 'qlik';
import * as d3 from 'd3';

// Reactive data
const qlik = ref<Qlik | null>(null);
const chartData = ref([]);
const regions = ref<string[]>([]);
const selectedRegion = ref('');

const initializeQlik = async () => {
  const qlikInstance = new Qlik({
    host: import.meta.env.VITE_QLIK_HOST,
    webIntegrationId: import.meta.env.VITE_QLIK_WEB_INTEGRATION_ID
  });

  await qlikInstance.authenticateToQlik();
  qlik.value = qlikInstance;
  
  await loadData();
};

onMounted(() => {
  initializeQlik();
});
</script>`}
                </CodeBlock>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Advanced Features</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>Vue 3 Composition API</strong> - Modern Vue.js patterns with reactive data</div>
                  <div><strong>D3.js Integration</strong> - Custom visualizations with D3.js</div>
                  <div><strong>Interactive Filtering</strong> - Dynamic data filtering with Qlik selections</div>
                  <div><strong>Real-time Updates</strong> - Automatic chart updates when data changes</div>
                  <div><strong>TypeScript Support</strong> - Full type safety throughout the component</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>
              More examples and resources to help you build with the Qlik SDK
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold">Community Examples</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="text-primary hover:underline">Angular Dashboard Template</a></li>
                  <li><a href="#" className="text-primary hover:underline">Svelte Integration Guide</a></li>
                  <li><a href="#" className="text-primary hover:underline">Express.js API Server</a></li>
                  <li><a href="#" className="text-primary hover:underline">Electron Desktop App</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Starter Templates</h4>
                <ul className="text-sm space-y-1">
                  <li><a href="#" className="text-primary hover:underline">Next.js + Qlik Starter</a></li>
                  <li><a href="#" className="text-primary hover:underline">Vite + Vue + Qlik</a></li>
                  <li><a href="#" className="text-primary hover:underline">Create React App + Qlik</a></li>
                  <li><a href="#" className="text-primary hover:underline">NestJS Backend Template</a></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}