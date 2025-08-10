import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Eye, Database, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: "Working with Apps",
  description: "Learn how to work with Qlik applications, sheets, and objects",
}

export default function AppsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Working with Apps"
        description="Learn how to access and manipulate Qlik applications, sheets, and objects using the TypeScript SDK."
      />

      {/* Getting Apps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Getting Applications
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">List Available Apps</CardTitle>
            <CardDescription>
              Retrieve all applications accessible to the authenticated user
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`// Get all available apps
const apps = await qlik.getAppList();

console.log(\`Found \${apps.length} applications:\`);
apps.forEach(app => {
  console.log(\`- \${app.name} (ID: \${app.id})\`);
  console.log(\`  Published: \${app.published}\`);
  console.log(\`  Owner: \${app.owner.name}\`);
});

// Filter published apps only
const publishedApps = apps.filter(app => app.published);

// Find specific app by name
const salesApp = apps.find(app => 
  app.name.toLowerCase().includes('sales')
);`}
            </CodeBlock>

            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold mb-2">App Object Properties</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div><code>id: string</code> - Unique application identifier</div>
                <div><code>name: string</code> - Application display name</div>
                <div><code>description?: string</code> - Optional app description</div>
                <div><code>published: boolean</code> - Whether app is published</div>
                <div><code>publishTime?: string</code> - When the app was published</div>
                <div><code>owner: {`{ id: string, name: string }`}</code> - App owner information</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Opening Apps */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Opening Applications
        </h2>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Usage</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Patterns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Open App by ID</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`// Open a specific app by ID
const appId = 'your-app-id-here';
const app = await qlik.getApp(appId);

console.log('App opened successfully');

// Now you can work with the app
const sheets = await app.getSheets();
console.log(\`App has \${sheets.length} sheets\`);`}
                </CodeBlock>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Open App with Error Handling</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`async function openAppSafely(appId: string) {
  try {
    const app = await qlik.getApp(appId);
    console.log(\`✅ Successfully opened app: \${appId}\`);
    return app;
  } catch (error) {
    if (error.code === 'APP_NOT_FOUND') {
      console.error('❌ App not found or no access');
    } else if (error.code === 'AUTHENTICATION_REQUIRED') {
      console.error('❌ Authentication required');
      await qlik.authenticateToQlik();
      // Retry after authentication
      return await qlik.getApp(appId);
    } else {
      console.error('❌ Unexpected error:', error.message);
    }
    throw error;
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">App Manager Class</CardTitle>
                <CardDescription>
                  A utility class for managing multiple apps efficiently
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`class QlikAppManager {
  private qlik: Qlik;
  private appCache = new Map<string, any>();

  constructor(qlik: Qlik) {
    this.qlik = qlik;
  }

  async getApp(appId: string, useCache = true) {
    // Return cached app if available
    if (useCache && this.appCache.has(appId)) {
      return this.appCache.get(appId);
    }

    try {
      const app = await this.qlik.getApp(appId);
      
      // Cache the app instance
      if (useCache) {
        this.appCache.set(appId, app);
      }
      
      return app;
    } catch (error) {
      console.error(\`Failed to open app \${appId}:\`, error);
      throw error;
    }
  }

  async getAppByName(appName: string) {
    const apps = await this.qlik.getAppList();
    const targetApp = apps.find(app => 
      app.name.toLowerCase() === appName.toLowerCase()
    );

    if (!targetApp) {
      throw new Error(\`App not found: \${appName}\`);
    }

    return this.getApp(targetApp.id);
  }

  async preloadApps(appIds: string[]) {
    console.log('Preloading apps...');
    const promises = appIds.map(id => this.getApp(id, true));
    await Promise.all(promises);
    console.log(\`✅ Preloaded \${appIds.length} apps\`);
  }

  clearCache() {
    this.appCache.clear();
    console.log('App cache cleared');
  }
}

// Usage
const appManager = new QlikAppManager(qlik);
const app = await appManager.getAppByName('Sales Dashboard');`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Working with Sheets */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Working with Sheets
        </h2>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Getting Sheets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="typescript">
{`// Get all sheets in an app
const sheets = await app.getSheets();

console.log(\`Found \${sheets.length} sheets:\`);
sheets.forEach(sheet => {
  console.log(\`- \${sheet.title} (ID: \${sheet.id})\`);
  console.log(\`  Description: \${sheet.description || 'No description'}\`);
  console.log(\`  Rank: \${sheet.rank}\`);
});

// Find specific sheet
const dashboardSheet = sheets.find(sheet => 
  sheet.title.toLowerCase().includes('dashboard')
);

if (dashboardSheet) {
  console.log('Found dashboard sheet:', dashboardSheet.title);
}`}
              </CodeBlock>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sheet Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock language="typescript">
{`// Get a specific sheet by ID
const sheet = await app.getSheet('sheet-id');

// Get all objects in the sheet
const objects = await sheet.getObjects();
console.log(\`Sheet has \${objects.length} objects\`);

// Get sheet properties
const layout = await sheet.getLayout();
console.log('Sheet layout:', layout);

// Make selections on the sheet
await sheet.clearSelections();
await sheet.selectValues('Product', ['Laptop', 'Phone']);

// Export sheet as image (if supported)
const imageUrl = await sheet.exportImg();
console.log('Sheet image URL:', imageUrl);`}
              </CodeBlock>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Working with Objects */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Database className="h-5 w-5" />
          Working with Objects
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Getting and Manipulating Objects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`// Get a specific object by ID
const object = await app.getObject('object-id');

// Get object data
const layout = await object.getLayout();
console.log('Object type:', layout.qInfo.qType);
console.log('Object title:', layout.title);

// For hypercube objects (charts, tables)
if (layout.qHyperCube) {
  const data = layout.qHyperCube.qDataPages[0].qMatrix;
  console.log('Data rows:', data.length);
  
  // Process the data
  data.forEach((row, index) => {
    const values = row.map(cell => cell.qText || cell.qNum);
    console.log(\`Row \${index + 1}:\`, values);
  });
}

// Make selections on the object
await object.selectValues(0, ['Value1', 'Value2']); // Select in first dimension
await object.clearSelections();

// Get object properties
const properties = await object.getProperties();
console.log('Object properties:', properties);`}
            </CodeBlock>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Creating Session Objects</CardTitle>
            <CardDescription>
              Create temporary objects for custom data analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`// Create a session object for data extraction
const sessionObject = await app.createSessionObject({
  qInfo: { qType: 'my-custom-object' },
  qHyperCubeDef: {
    qDimensions: [
      {
        qDef: {
          qFieldDefs: ['Product'],
          qFieldLabels: ['Product Name']
        }
      },
      {
        qDef: {
          qFieldDefs: ['Region']
        }
      }
    ],
    qMeasures: [
      {
        qDef: {
          qDef: 'Sum(Sales)',
          qLabel: 'Total Sales'
        }
      },
      {
        qDef: {
          qDef: 'Avg(Price)',
          qLabel: 'Average Price'
        }
      }
    ],
    qInitialDataFetch: [
      {
        qLeft: 0,
        qTop: 0,
        qWidth: 4,
        qHeight: 100
      }
    ]
  }
});

// Get the data
const layout = await sessionObject.getLayout();
const matrix = layout.qHyperCube.qDataPages[0].qMatrix;

// Process session object data
const processedData = matrix.map(row => ({
  product: row[0].qText,
  region: row[1].qText,
  totalSales: row[2].qNum,
  avgPrice: row[3].qNum
}));

console.log('Session object data:', processedData);

// Don't forget to destroy session objects when done
await sessionObject.destroy();`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Data Export */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Data Export Examples</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Export to JSON</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`async function exportAppData(app: QlikApp, objectId: string) {
  const object = await app.getObject(objectId);
  const layout = await object.getLayout();
  
  if (layout.qHyperCube) {
    const data = layout.qHyperCube.qDataPages[0].qMatrix;
    const headers = layout.qHyperCube.qDimensionInfo
      .map(dim => dim.qFallbackTitle)
      .concat(layout.qHyperCube.qMeasureInfo.map(measure => measure.qFallbackTitle));
    
    const exportData = {
      title: layout.title,
      headers,
      data: data.map(row => 
        row.map(cell => ({
          text: cell.qText,
          number: cell.qNum,
          state: cell.qState
        }))
      ),
      exportTime: new Date().toISOString()
    };
    
    // Save to file or send to API
    const json = JSON.stringify(exportData, null, 2);
    console.log('Exported data:', json);
    
    return exportData;
  }
}

// Usage
const exportedData = await exportAppData(app, 'sales-chart-id');`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200">💡 Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
          <div><strong>Performance:</strong> Cache app instances when working with multiple operations</div>
          <div><strong>Error Handling:</strong> Always handle app access errors gracefully</div>
          <div><strong>Memory Management:</strong> Destroy session objects when no longer needed</div>
          <div><strong>Data Fetching:</strong> Use appropriate page sizes for large datasets</div>
          <div><strong>Selection State:</strong> Clear selections when switching between operations</div>
          <div><strong>Authentication:</strong> Check authentication status before app operations</div>
        </CardContent>
      </Card>
    </div>
  )
}