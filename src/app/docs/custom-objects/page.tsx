import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Puzzle, Layers, Paintbrush, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Custom Objects",
  description: "Learn how to create and manage custom objects and visualizations with the Qlik TypeScript SDK",
}

export default function CustomObjectsPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Custom Objects"
        description="Create powerful custom visualizations and interactive objects that extend Qlik's native capabilities with your own business logic and styling."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Puzzle className="h-5 w-5" />
            Custom Objects Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Custom objects in Qlik allow you to create specialized visualizations, interactive components, 
            and business-specific analytics that go beyond standard charts and tables.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Layers className="h-3 w-3 mr-1" />
                Session Objects
              </Badge>
              <div className="text-sm text-muted-foreground">
                Temporary objects for analysis and calculation
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Paintbrush className="h-3 w-3 mr-1" />
                Visualizations
              </Badge>
              <div className="text-sm text-muted-foreground">
                Custom charts and visual components
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                Interactions
              </Badge>
              <div className="text-sm text-muted-foreground">
                Interactive elements with custom behavior
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Puzzle className="h-3 w-3 mr-1" />
                Extensions
              </Badge>
              <div className="text-sm text-muted-foreground">
                Reusable custom object templates
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Objects */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Session Objects
        </h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Session Objects</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Creating Session Objects</CardTitle>
                <CardDescription>
                  Build temporary objects for custom analysis and calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`class CustomSessionObjects {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  // Create a custom KPI calculator
  async createKPICalculator(config: {
    title: string;
    measure: string;
    comparisonPeriod?: string;
    threshold?: { warning: number; critical: number };
  }): Promise<any> {
    
    const kpiDefinition = {
      qInfo: {
        qType: 'custom-kpi',
        qId: \`kpi-\${Date.now()}\`
      },
      qHyperCubeDef: {
        qDimensions: [],
        qMeasures: [
          {
            qDef: {
              qDef: config.measure,
              qLabel: config.title
            }
          }
        ],
        qInitialDataFetch: [
          {
            qLeft: 0,
            qTop: 0,
            qWidth: 1,
            qHeight: 1
          }
        ]
      },
      // Custom properties for KPI behavior
      customProperties: {
        title: config.title,
        threshold: config.threshold,
        comparisonPeriod: config.comparisonPeriod
      }
    };

    // Add comparison measure if specified
    if (config.comparisonPeriod) {
      kpiDefinition.qHyperCubeDef.qMeasures.push({
        qDef: {
          qDef: \`\${config.measure.replace(/}/g, ', Period={\${config.comparisonPeriod}}}\`)},
          qLabel: \`\${config.title} (Previous)\`
        }
      });
      
      // Add variance calculation
      kpiDefinition.qHyperCubeDef.qMeasures.push({
        qDef: {
          qDef: \`(\${config.measure} - \${config.measure.replace(/}/g, ', Period={\${config.comparisonPeriod}}}')}) / \${config.measure.replace(/}/g, ', Period={\${config.comparisonPeriod}}'})\`,
          qLabel: 'Variance %'
        }
      });
    }

    const sessionObject = await this.app.createSessionObject(kpiDefinition);
    console.log(\`✅ KPI calculator created: \${config.title}\`);
    
    return sessionObject;
  }

  // Create a custom trend analyzer
  async createTrendAnalyzer(config: {
    dimensions: string[];
    measure: string;
    periods: number;
    trendType: 'linear' | 'polynomial' | 'exponential';
  }): Promise<any> {

    const trendDefinition = {
      qInfo: {
        qType: 'custom-trend-analyzer',
        qId: \`trend-\${Date.now()}\`
      },
      qHyperCubeDef: {
        qDimensions: config.dimensions.map(dim => ({
          qDef: {
            qFieldDefs: [dim],
            qSortBy: { qSortByAscii: 1 }
          }
        })),
        qMeasures: [
          {
            qDef: {
              qDef: config.measure,
              qLabel: 'Current Value'
            }
          },
          {
            qDef: {
              qDef: this.getTrendCalculation(config.measure, config.trendType),
              qLabel: 'Trend Value'
            }
          },
          {
            qDef: {
              qDef: \`If(\${this.getTrendCalculation(config.measure, config.trendType)} > \${config.measure}, '↗️', If(\${this.getTrendCalculation(config.measure, config.trendType)} < \${config.measure}, '↘️', '➡️'))\`,
              qLabel: 'Trend Direction'
            }
          }
        ],
        qInitialDataFetch: [
          {
            qLeft: 0,
            qTop: 0,
            qWidth: config.dimensions.length + 3,
            qHeight: 1000
          }
        ]
      },
      customProperties: {
        trendType: config.trendType,
        periods: config.periods
      }
    };

    const sessionObject = await this.app.createSessionObject(trendDefinition);
    console.log('✅ Trend analyzer created');
    
    return sessionObject;
  }

  // Create a custom ranking object
  async createRankingObject(config: {
    dimension: string;
    measure: string;
    topN: number;
    includeOthers: boolean;
  }): Promise<any> {

    const rankingDefinition = {
      qInfo: {
        qType: 'custom-ranking',
        qId: \`ranking-\${Date.now()}\`
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: [config.dimension],
              qSortBy: { qSortByLoadOrder: 1 }
            },
            qOtherTotalSpec: config.includeOthers ? {
              qOtherMode: 'OTHER_COUNTED',
              qOtherCounted: { qv: config.topN.toString() }
            } : undefined
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: config.measure,
              qLabel: 'Value'
            },
            qSortBy: { qSortByNumeric: -1 } // Descending order
          },
          {
            qDef: {
              qDef: \`Rank(\${config.measure})\`,
              qLabel: 'Rank'
            }
          },
          {
            qDef: {
              qDef: \`(\${config.measure} / Sum(Total \${config.measure})) * 100\`,
              qLabel: 'Percentage'
            }
          }
        ],
        qInitialDataFetch: [
          {
            qLeft: 0,
            qTop: 0,
            qWidth: 4,
            qHeight: config.includeOthers ? config.topN + 1 : config.topN
          }
        ]
      }
    };

    const sessionObject = await this.app.createSessionObject(rankingDefinition);
    console.log('✅ Ranking object created');
    
    return sessionObject;
  }

  private getTrendCalculation(measure: string, trendType: string): string {
    switch (trendType) {
      case 'linear':
        return \`Avg(\${measure})\`; // Simplified linear trend
      case 'polynomial':
        return \`Median(\${measure})\`; // Simplified polynomial trend
      case 'exponential':
        return \`Exp(Avg(Log(\${measure})))\`; // Geometric mean for exponential
      default:
        return measure;
    }
  }
}

// Usage Examples
async function createCustomAnalytics(app: any) {
  const customObjects = new CustomSessionObjects(app);

  // 1. Sales KPI with comparison
  const salesKPI = await customObjects.createKPICalculator({
    title: 'Monthly Sales',
    measure: 'Sum({<Month={$(=Max(Month))}>} Sales)',
    comparisonPeriod: 'Previous Month',
    threshold: { warning: 80, critical: 60 }
  });

  // 2. Customer growth trend
  const customerTrend = await customObjects.createTrendAnalyzer({
    dimensions: ['Month'],
    measure: 'Count(distinct Customer)',
    periods: 12,
    trendType: 'linear'
  });

  // 3. Top products ranking
  const productRanking = await customObjects.createRankingObject({
    dimension: 'Product',
    measure: 'Sum(Sales)',
    topN: 10,
    includeOthers: true
  });

  return { salesKPI, customerTrend, productRanking };
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Session Object Patterns</CardTitle>
                <CardDescription>
                  Complex session objects with dynamic behavior and calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`class AdvancedCustomObjects {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  // Create a dynamic pivot analyzer
  async createPivotAnalyzer(config: {
    rowDimensions: string[];
    columnDimensions: string[];
    measures: string[];
    calculations: 'sum' | 'avg' | 'count' | 'custom';
    customExpression?: string;
  }): Promise<any> {

    const pivotDefinition = {
      qInfo: {
        qType: 'custom-pivot-analyzer',
        qId: \`pivot-\${Date.now()}\`
      },
      // Use qPivotTableDef for advanced pivoting
      qPivotTableDef: {
        qDimensions: [
          ...config.rowDimensions.map(dim => ({
            qDef: { qFieldDefs: [dim] },
            qNullSuppression: true
          })),
          ...config.columnDimensions.map(dim => ({
            qDef: { qFieldDefs: [dim] },
            qNullSuppression: true,
            qPivot: true // Mark as pivot dimension
          }))
        ],
        qMeasures: config.measures.map(measure => ({
          qDef: {
            qDef: this.buildMeasureExpression(measure, config.calculations, config.customExpression),
            qLabel: measure
          }
        })),
        qInitialDataFetch: [
          {
            qLeft: 0,
            qTop: 0,
            qWidth: config.rowDimensions.length + config.columnDimensions.length + config.measures.length,
            qHeight: 500
          }
        ]
      },
      customProperties: {
        pivotConfig: config,
        createdAt: new Date().toISOString()
      }
    };

    const sessionObject = await this.app.createSessionObject(pivotDefinition);
    console.log('✅ Advanced pivot analyzer created');
    
    return sessionObject;
  }

  // Create a statistical analysis object
  async createStatisticalAnalysis(config: {
    dimension: string;
    measure: string;
    statistics: ('mean' | 'median' | 'mode' | 'stddev' | 'variance' | 'quartiles')[];
  }): Promise<any> {

    const measureExpressions = config.statistics.map(stat => {
      switch (stat) {
        case 'mean':
          return { expr: \`Avg(\${config.measure})\`, label: 'Mean' };
        case 'median':
          return { expr: \`Median(\${config.measure})\`, label: 'Median' };
        case 'mode':
          return { expr: \`Mode(\${config.measure})\`, label: 'Mode' };
        case 'stddev':
          return { expr: \`Stdev(\${config.measure})\`, label: 'Standard Deviation' };
        case 'variance':
          return { expr: \`Var(\${config.measure})\`, label: 'Variance' };
        case 'quartiles':
          return { expr: \`Quartile(\${config.measure}, 1) & '|' & Quartile(\${config.measure}, 3)\`, label: 'Q1|Q3' };
        default:
          return { expr: config.measure, label: 'Value' };
      }
    });

    const statsDefinition = {
      qInfo: {
        qType: 'custom-statistical-analysis',
        qId: \`stats-\${Date.now()}\`
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: [config.dimension]
            }
          }
        ],
        qMeasures: [
          ...measureExpressions.map(me => ({
            qDef: {
              qDef: me.expr,
              qLabel: me.label
            }
          })),
          // Add percentile calculations
          {
            qDef: {
              qDef: \`Fractile(\${config.measure}, 0.25)\`,
              qLabel: '25th Percentile'
            }
          },
          {
            qDef: {
              qDef: \`Fractile(\${config.measure}, 0.75)\`,
              qLabel: '75th Percentile'
            }
          },
          {
            qDef: {
              qDef: \`Max(\${config.measure}) - Min(\${config.measure})\`,
              qLabel: 'Range'
            }
          }
        ],
        qInitialDataFetch: [
          {
            qLeft: 0,
            qTop: 0,
            qWidth: 1 + measureExpressions.length + 3,
            qHeight: 1000
          }
        ]
      }
    };

    const sessionObject = await this.app.createSessionObject(statsDefinition);
    console.log('✅ Statistical analysis object created');
    
    return sessionObject;
  }

  // Create a correlation matrix object
  async createCorrelationMatrix(fields: string[]): Promise<any> {
    const correlationPairs: any[] = [];
    
    // Generate all field pair combinations
    for (let i = 0; i < fields.length; i++) {
      for (let j = i + 1; j < fields.length; j++) {
        correlationPairs.push({
          field1: fields[i],
          field2: fields[j],
          expr: \`Correl(\${fields[i]}, \${fields[j]})\`
        });
      }
    }

    const correlationDefinition = {
      qInfo: {
        qType: 'custom-correlation-matrix',
        qId: \`corr-\${Date.now()}\`
      },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: [\"'Field Pair'\"],
              qValueExpression: \"Field1 & ' vs ' & Field2\"
            }
          }
        ],
        qMeasures: correlationPairs.map((pair, index) => ({
          qDef: {
            qDef: pair.expr,
            qLabel: \`\${pair.field1} vs \${pair.field2}\`
          }
        })),
        qInitialDataFetch: [
          {
            qLeft: 0,
            qTop: 0,
            qWidth: correlationPairs.length + 1,
            qHeight: correlationPairs.length
          }
        ]
      },
      customProperties: {
        fields: fields,
        pairCount: correlationPairs.length
      }
    };

    const sessionObject = await this.app.createSessionObject(correlationDefinition);
    console.log('✅ Correlation matrix created');
    
    return sessionObject;
  }

  private buildMeasureExpression(measure: string, calculation: string, customExpression?: string): string {
    if (calculation === 'custom' && customExpression) {
      return customExpression.replace(/\{MEASURE}/g, measure);
    }

    switch (calculation) {
      case 'sum':
        return \`Sum(\${measure})\`;
      case 'avg':
        return \`Avg(\${measure})\`;
      case 'count':
        return \`Count(\${measure})\`;
      default:
        return measure;
    }
  }
}

// Usage of Advanced Objects
async function createAdvancedAnalytics(app: any) {
  const advancedObjects = new AdvancedCustomObjects(app);

  // 1. Sales pivot analysis
  const pivotAnalysis = await advancedObjects.createPivotAnalyzer({
    rowDimensions: ['Product', 'Category'],
    columnDimensions: ['Region', 'Quarter'],
    measures: ['Sales', 'Profit'],
    calculations: 'sum'
  });

  // 2. Sales statistical analysis
  const statsAnalysis = await advancedObjects.createStatisticalAnalysis({
    dimension: 'Product',
    measure: 'Sales',
    statistics: ['mean', 'median', 'stddev', 'quartiles']
  });

  // 3. Field correlation matrix
  const correlationMatrix = await advancedObjects.createCorrelationMatrix([
    'Sales', 'Profit', 'Quantity', 'Discount', 'Price'
  ]);

  return { pivotAnalysis, statsAnalysis, correlationMatrix };
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Custom Visualizations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Paintbrush className="h-5 w-5" />
          Custom Visualizations
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Building Custom Charts</CardTitle>
            <CardDescription>
              Create interactive visualizations with D3.js, Chart.js, or other libraries
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`class CustomVisualizationBuilder {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  // Create a custom D3.js visualization
  async createD3Visualization(config: {
    containerId: string;
    sessionObject: any;
    chartType: 'bubble' | 'network' | 'treemap' | 'sankey';
    options?: any;
  }): Promise<void> {

    const layout = await config.sessionObject.getLayout();
    const data = await this.extractVisualizationData(config.sessionObject);
    
    const container = document.getElementById(config.containerId);
    if (!container) {
      throw new Error(\`Container not found: \${config.containerId}\`);
    }

    switch (config.chartType) {
      case 'bubble':
        await this.createBubbleChart(container, data, config.options);
        break;
      case 'network':
        await this.createNetworkChart(container, data, config.options);
        break;
      case 'treemap':
        await this.createTreemapChart(container, data, config.options);
        break;
      case 'sankey':
        await this.createSankeyChart(container, data, config.options);
        break;
    }

    console.log(\`✅ \${config.chartType} visualization created\`);
  }

  private async createBubbleChart(container: HTMLElement, data: any, options: any): Promise<void> {
    // This would integrate with D3.js
    const bubbleData = data.map((row: any, index: number) => ({
      id: index,
      name: row[0]?.text || \`Item \${index}\`,
      x: row[1]?.number || 0,
      y: row[2]?.number || 0,
      size: row[3]?.number || 10,
      category: row[4]?.text || 'default'
    }));

    // Simplified D3.js bubble chart implementation
    container.innerHTML = \`
      <svg width="\${options?.width || 600}" height="\${options?.height || 400}">
        \${bubbleData.map((d: any, i: number) => \`
          <circle 
            cx="\${50 + (d.x % 500)}" 
            cy="\${50 + (d.y % 300)}" 
            r="\${Math.max(5, d.size / 10)}" 
            fill="\${this.getColorByCategory(d.category)}"
            stroke="#333"
            stroke-width="1"
            opacity="0.7"
            title="\${d.name}: \${d.size}"
          />
          <text 
            x="\${50 + (d.x % 500)}" 
            y="\${55 + (d.y % 300)}" 
            text-anchor="middle" 
            font-size="10"
            fill="#333"
          >\${d.name}</text>
        \`).join('')}
      </svg>
    \`;
  }

  private async createNetworkChart(container: HTMLElement, data: any, options: any): Promise<void> {
    // Network/Graph visualization
    const nodes = new Set();
    const links: any[] = [];

    data.forEach((row: any) => {
      const source = row[0]?.text;
      const target = row[1]?.text;
      const weight = row[2]?.number || 1;

      if (source && target) {
        nodes.add(source);
        nodes.add(target);
        links.push({ source, target, weight });
      }
    });

    const networkData = {
      nodes: Array.from(nodes).map(node => ({ id: node, name: node })),
      links: links
    };

    // Simplified network visualization
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', (options?.width || 600).toString());
    svg.setAttribute('height', (options?.height || 400).toString());
    
    // Add basic network visualization here
    container.innerHTML = '';
    container.appendChild(svg);
  }

  private async createTreemapChart(container: HTMLElement, data: any, options: any): Promise<void> {
    // Treemap visualization for hierarchical data
    const hierarchyData = this.buildHierarchy(data);
    
    container.innerHTML = \`
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 2px; height: \${options?.height || 400}px;">
        \${hierarchyData.map((item: any) => \`
          <div style="
            background-color: \${this.getColorByCategory(item.category)};
            padding: 8px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: \${Math.max(50, item.value / 100)}px;
            opacity: 0.8;
          ">
            <div style="font-weight: bold; font-size: 12px; text-align: center;">\${item.name}</div>
            <div style="font-size: 10px; color: #666;">\${item.value}</div>
          </div>
        \`).join('')}
      </div>
    \`;
  }

  private async createSankeyChart(container: HTMLElement, data: any, options: any): Promise<void> {
    // Sankey diagram for flow visualization
    const flowData = this.processFlowData(data);
    
    // Simplified Sankey representation
    container.innerHTML = \`
      <div style="display: flex; flex-direction: column; gap: 4px; height: \${options?.height || 400}px;">
        \${flowData.map((flow: any) => \`
          <div style="
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px;
            background-color: #f0f0f0;
            border-radius: 4px;
          ">
            <div style="
              background-color: \${this.getColorByCategory(flow.source)};
              padding: 4px 8px;
              border-radius: 2px;
              font-size: 12px;
            ">\${flow.source}</div>
            <div style="
              flex: 1;
              height: 4px;
              background: linear-gradient(to right, \${this.getColorByCategory(flow.source)}, \${this.getColorByCategory(flow.target)});
            "></div>
            <div style="font-size: 10px; color: #666;">\${flow.value}</div>
            <div style="
              background-color: \${this.getColorByCategory(flow.target)};
              padding: 4px 8px;
              border-radius: 2px;
              font-size: 12px;
            ">\${flow.target}</div>
          </div>
        \`).join('')}
      </div>
    \`;
  }

  private async extractVisualizationData(sessionObject: any): Promise<any[]> {
    const layout = await sessionObject.getLayout();
    const hypercube = layout.qHyperCube;
    
    if (!hypercube) return [];
    
    return hypercube.qDataPages[0]?.qMatrix || [];
  }

  private buildHierarchy(data: any[]): any[] {
    return data.map((row, index) => ({
      name: row[0]?.text || \`Item \${index}\`,
      value: row[1]?.number || 0,
      category: row[2]?.text || 'default'
    })).sort((a, b) => b.value - a.value);
  }

  private processFlowData(data: any[]): any[] {
    return data.map(row => ({
      source: row[0]?.text || 'Source',
      target: row[1]?.text || 'Target',
      value: row[2]?.number || 1
    }));
  }

  private getColorByCategory(category: string): string {
    const colors: Record<string, string> = {
      'default': '#3498db',
      'sales': '#e74c3c',
      'profit': '#2ecc71',
      'customer': '#f39c12',
      'product': '#9b59b6'
    };
    
    return colors[category.toLowerCase()] || colors['default'];
  }
}

// Usage
async function createCustomVisualizations(app: any) {
  const vizBuilder = new CustomVisualizationBuilder(app);

  // Create data objects for visualizations
  const bubbleData = await app.createSessionObject({
    qInfo: { qType: 'bubble-data' },
    qHyperCubeDef: {
      qDimensions: [{ qDef: { qFieldDefs: ['Product'] } }],
      qMeasures: [
        { qDef: { qDef: 'Sum(Sales)' } },
        { qDef: { qDef: 'Sum(Profit)' } },
        { qDef: { qDef: 'Count(OrderID)' } }
      ],
      qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 4, qHeight: 100 }]
    }
  });

  // Create bubble chart
  await vizBuilder.createD3Visualization({
    containerId: 'bubble-chart-container',
    sessionObject: bubbleData,
    chartType: 'bubble',
    options: { width: 800, height: 500 }
  });

  console.log('✅ Custom visualizations created');
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Object Management */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Object Lifecycle Management
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Managing Custom Object Lifecycle</CardTitle>
            <CardDescription>
              Best practices for creating, updating, and destroying custom objects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`class CustomObjectManager {
  private app: any;
  private managedObjects = new Map<string, any>();

  constructor(app: any) {
    this.app = app;
  }

  // Create and register a managed object
  async createManagedObject(id: string, definition: any): Promise<any> {
    try {
      const sessionObject = await this.app.createSessionObject(definition);
      
      // Store reference for management
      this.managedObjects.set(id, {
        object: sessionObject,
        definition: definition,
        created: new Date(),
        lastUpdated: new Date()
      });

      console.log(\`✅ Managed object created: \${id}\`);
      return sessionObject;
      
    } catch (error) {
      console.error(\`Failed to create managed object \${id}:\`, error);
      throw error;
    }
  }

  // Update existing object
  async updateManagedObject(id: string, newDefinition: any): Promise<any> {
    const managed = this.managedObjects.get(id);
    
    if (!managed) {
      throw new Error(\`Managed object not found: \${id}\`);
    }

    try {
      // Update the object properties
      await managed.object.setProperties(newDefinition);
      
      // Update our tracking
      managed.definition = newDefinition;
      managed.lastUpdated = new Date();
      
      console.log(\`✅ Managed object updated: \${id}\`);
      return managed.object;
      
    } catch (error) {
      console.error(\`Failed to update managed object \${id}:\`, error);
      throw error;
    }
  }

  // Get managed object
  getManagedObject(id: string): any | null {
    const managed = this.managedObjects.get(id);
    return managed ? managed.object : null;
  }

  // Destroy specific object
  async destroyManagedObject(id: string): Promise<void> {
    const managed = this.managedObjects.get(id);
    
    if (!managed) {
      console.warn(\`Managed object not found: \${id}\`);
      return;
    }

    try {
      await managed.object.destroy();
      this.managedObjects.delete(id);
      console.log(\`✅ Managed object destroyed: \${id}\`);
      
    } catch (error) {
      console.error(\`Failed to destroy managed object \${id}:\`, error);
    }
  }

  // Destroy all managed objects
  async destroyAllManagedObjects(): Promise<void> {
    const destroyPromises = Array.from(this.managedObjects.keys()).map(id => 
      this.destroyManagedObject(id)
    );

    await Promise.all(destroyPromises);
    console.log('✅ All managed objects destroyed');
  }

  // Get object statistics
  getObjectStatistics(): any {
    const stats = {
      totalObjects: this.managedObjects.size,
      objectsByType: new Map<string, number>(),
      oldestObject: null as Date | null,
      newestObject: null as Date | null
    };

    for (const [id, managed] of this.managedObjects) {
      // Count by type
      const type = managed.definition.qInfo?.qType || 'unknown';
      stats.objectsByType.set(type, (stats.objectsByType.get(type) || 0) + 1);

      // Track creation dates
      if (!stats.oldestObject || managed.created < stats.oldestObject) {
        stats.oldestObject = managed.created;
      }
      if (!stats.newestObject || managed.created > stats.newestObject) {
        stats.newestObject = managed.created;
      }
    }

    return stats;
  }

  // Auto-cleanup old objects
  async cleanupOldObjects(maxAgeHours: number = 24): Promise<number> {
    const cutoffTime = new Date(Date.now() - (maxAgeHours * 60 * 60 * 1000));
    const objectsToDestroy: string[] = [];

    for (const [id, managed] of this.managedObjects) {
      if (managed.created < cutoffTime) {
        objectsToDestroy.push(id);
      }
    }

    for (const id of objectsToDestroy) {
      await this.destroyManagedObject(id);
    }

    console.log(\`✅ Cleaned up \${objectsToDestroy.length} old objects\`);
    return objectsToDestroy.length;
  }
}

// React Hook for Object Management
function useCustomObjectManager(app: any) {
  const [objectManager] = useState(() => new CustomObjectManager(app));
  const [objects, setObjects] = useState<Map<string, any>>(new Map());

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      objectManager.destroyAllManagedObjects();
    };
  }, [objectManager]);

  const createObject = useCallback(async (id: string, definition: any) => {
    const obj = await objectManager.createManagedObject(id, definition);
    setObjects(new Map(objectManager['managedObjects']));
    return obj;
  }, [objectManager]);

  const destroyObject = useCallback(async (id: string) => {
    await objectManager.destroyManagedObject(id);
    setObjects(new Map(objectManager['managedObjects']));
  }, [objectManager]);

  const getStatistics = useCallback(() => {
    return objectManager.getObjectStatistics();
  }, [objectManager]);

  return {
    createObject,
    destroyObject,
    getStatistics,
    objects: Array.from(objects.keys())
  };
}

// Usage in React Component
function CustomObjectDashboard({ app }: { app: any }) {
  const { createObject, destroyObject, getStatistics, objects } = useCustomObjectManager(app);

  const handleCreateKPI = async () => {
    await createObject('sales-kpi', {
      qInfo: { qType: 'custom-kpi' },
      qHyperCubeDef: {
        qMeasures: [{ qDef: { qDef: 'Sum(Sales)' } }],
        qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 1, qHeight: 1 }]
      }
    });
  };

  return (
    <div>
      <button onClick={handleCreateKPI}>Create Sales KPI</button>
      <div>Active Objects: {objects.length}</div>
      <div>Statistics: {JSON.stringify(getStatistics(), null, 2)}</div>
    </div>
  );
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardHeader>
          <CardTitle className="text-purple-800 dark:text-purple-200">🎨 Custom Objects Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-purple-700 dark:text-purple-300">
          <div><strong>Object Lifecycle:</strong> Always clean up session objects when no longer needed</div>
          <div><strong>Performance:</strong> Limit the number of concurrent session objects</div>
          <div><strong>Error Handling:</strong> Implement robust error handling for object creation and updates</div>
          <div><strong>Data Binding:</strong> Use reactive patterns to update visualizations when data changes</div>
          <div><strong>Reusability:</strong> Create template objects that can be easily configured and reused</div>
          <div><strong>User Experience:</strong> Provide loading states and error feedback for custom visualizations</div>
          <div><strong>Accessibility:</strong> Ensure custom visualizations are accessible and keyboard navigable</div>
          <div><strong>Testing:</strong> Test custom objects with various data sets and edge cases</div>
        </CardContent>
      </Card>
    </div>
  )
}