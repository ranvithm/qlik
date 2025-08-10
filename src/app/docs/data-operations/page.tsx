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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Database, Search, Filter, Download, BarChart3 } from "lucide-react";

export const metadata: Metadata = {
  title: "Data Operations",
  description:
    "Learn how to perform data operations, queries, and analysis with the Qlik TypeScript SDK",
};

export default function DataOperationsPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Data Operations"
        description="Master data operations including querying, filtering, aggregations, and real-time data manipulation in Qlik applications."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Operations Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The Qlik SDK provides powerful data operation capabilities including
            hypercube queries, field operations, selections, and real-time data
            updates. These operations form the foundation of interactive
            analytics applications.
          </p>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Search className="h-3 w-3 mr-1" />
                Queries
              </Badge>
              <div className="text-sm text-muted-foreground">
                HyperCube and ListObject queries for data retrieval
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Filter className="h-3 w-3 mr-1" />
                Selections
              </Badge>
              <div className="text-sm text-muted-foreground">
                Interactive filtering and field selections
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <BarChart3 className="h-3 w-3 mr-1" />
                Aggregations
              </Badge>
              <div className="text-sm text-muted-foreground">
                Real-time calculations and aggregations
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Download className="h-3 w-3 mr-1" />
                Export
              </Badge>
              <div className="text-sm text-muted-foreground">
                Data export in multiple formats
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* HyperCube Operations */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Database className="h-5 w-5" />
          HyperCube Operations
        </h2>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic HyperCubes</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Patterns</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Creating Basic HyperCubes
                </CardTitle>
                <CardDescription>
                  Fundamental hypercube operations for data analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
                  {`import Qlik from 'qlik';

class DataOperations {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  // Create a basic sales analysis hypercube
  async createSalesHyperCube(): Promise<any> {
    const hypercubeDef = {
      qInfo: { qType: 'sales-analysis' },
      qHyperCubeDef: {
        qDimensions: [
          {
            qDef: {
              qFieldDefs: ['Product'],
              qFieldLabels: ['Product Name']
            },
            qNullSuppression: true
          },
          {
            qDef: {
              qFieldDefs: ['Region'],
              qFieldLabels: ['Sales Region']
            }
          }
        ],
        qMeasures: [
          {
            qDef: {
              qDef: 'Sum(Sales)',
              qLabel: 'Total Sales'
            },
            qSortBy: { qSortByNumeric: -1 } // Descending
          },
          {
            qDef: {
              qDef: 'Avg(Price)',
              qLabel: 'Average Price'
            }
          },
          {
            qDef: {
              qDef: 'Count(distinct OrderID)',
              qLabel: 'Order Count'
            }
          }
        ],
        qInitialDataFetch: [
          {
            qLeft: 0,
            qTop: 0,
            qWidth: 5, // 2 dimensions + 3 measures
            qHeight: 100 // First 100 rows
          }
        ],
        qSuppressZero: true,
        qSuppressMissing: true
      }
    };

    try {
      const sessionObject = await this.app.createSessionObject(hypercubeDef);
      console.log('✅ Sales hypercube created');
      return sessionObject;
    } catch (error) {
      console.error('❌ Failed to create hypercube:', error);
      throw error;
    }
  }

  // Get data from hypercube
  async getHyperCubeData(sessionObject: any, page?: { top: number; left: number; width: number; height: number }): Promise<any> {
    try {
      const layout = await sessionObject.getLayout();
      const hypercube = layout.qHyperCube;

      // Use provided page or get first page
      const dataPage = page || {
        qLeft: 0,
        qTop: 0,
        qWidth: hypercube.qSize.qcx,
        qHeight: Math.min(hypercube.qSize.qcy, 1000) // Max 1000 rows
      };

      const data = await sessionObject.getHyperCubeData('/qHyperCubeDef', [dataPage]);
      
      return {
        headers: this.extractHeaders(hypercube),
        data: this.processHyperCubeData(data[0].qMatrix),
        totalRows: hypercube.qSize.qcy,
        totalColumns: hypercube.qSize.qcx
      };

    } catch (error) {
      console.error('Failed to get hypercube data:', error);
      throw error;
    }
  }

  private extractHeaders(hypercube: any): string[] {
    const dimensionHeaders = hypercube.qDimensionInfo.map((dim: any) => 
      dim.qFallbackTitle || dim.qFieldLabels?.[0] || 'Dimension'
    );
    
    const measureHeaders = hypercube.qMeasureInfo.map((measure: any) => 
      measure.qFallbackTitle || 'Measure'
    );
    
    return [...dimensionHeaders, ...measureHeaders];
  }

  private processHyperCubeData(matrix: any[]): any[] {
    return matrix.map(row => 
      row.map((cell: any) => ({
        text: cell.qText,
        number: cell.qNum,
        state: cell.qState,
        isNumeric: cell.qNum !== 'NaN' && cell.qNum !== null
      }))
    );
  }

  // Pagination for large datasets
  async getPaginatedData(sessionObject: any, page: number, pageSize: number = 100): Promise<any> {
    const offset = page * pageSize;
    
    return await this.getHyperCubeData(sessionObject, {
      top: offset,
      left: 0,
      width: 10, // Adjust based on your dimensions + measures
      height: pageSize
    });
  }
}

// Usage
async function analyzeSalesData(app: any) {
  const dataOps = new DataOperations(app);
  
  // Create hypercube
  const salesCube = await dataOps.createSalesHyperCube();
  
  // Get first page of data
  const salesData = await dataOps.getHyperCubeData(salesCube);
  
  console.log('Sales Analysis Results:');
  console.log('Headers:', salesData.headers);
  console.log('Total Rows:', salesData.totalRows);
  console.log('Sample Data:', salesData.data.slice(0, 5));
  
  // Get specific page
  const page2Data = await dataOps.getPaginatedData(salesCube, 1, 50);
  console.log('Page 2 Data:', page2Data.data.length, 'rows');
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Advanced HyperCube Patterns
                </CardTitle>
                <CardDescription>
                  Complex data operations with dynamic dimensions and
                  calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4"></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Selections and Filtering */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Selections and Filtering
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Interactive Selections</CardTitle>
            <CardDescription>
              Implement interactive filtering and field selections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`class SelectionManager {
  private app: any;
  private selectionState = new Map<string, any>();

  constructor(app: any) {
    this.app = app;
    this.setupSelectionListeners();
  }

  // Make field selections
  async selectInField(fieldName: string, values: string[]): Promise<void> {
    try {
      const field = await this.app.getField(fieldName);
      await field.selectValues(values);
      
      this.selectionState.set(fieldName, values);
      console.log(\`✅ Selected in \${fieldName}:\`, values);
      
      // Emit selection event
      this.emitSelectionChanged(fieldName, values);
      
    } catch (error) {
      console.error(\`Selection failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  // Clear selections in specific field
  async clearField(fieldName: string): Promise<void> {
    try {
      const field = await this.app.getField(fieldName);
      await field.clear();
      
      this.selectionState.delete(fieldName);
      console.log(\`✅ Cleared selections in \${fieldName}\`);
      
      this.emitSelectionChanged(fieldName, []);
      
    } catch (error) {
      console.error(\`Clear failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  // Clear all selections
  async clearAll(): Promise<void> {
    try {
      await this.app.clearAll();
      this.selectionState.clear();
      console.log('✅ All selections cleared');
      
      this.emitSelectionChanged('*', []);
      
    } catch (error) {
      console.error('Clear all failed:', error);
      throw error;
    }
  }

  // Get current selection state
  getSelectionState(): Map<string, any> {
    return new Map(this.selectionState);
  }

  // Search and select in field
  async searchAndSelect(fieldName: string, searchTerm: string): Promise<string[]> {
    try {
      const field = await this.app.getField(fieldName);
      
      // Get field data for search
      const listObject = await this.app.createSessionObject({
        qInfo: { qType: 'listbox' },
        qListObjectDef: {
          qDef: { qFieldDefs: [fieldName] },
          qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 1, qHeight: 1000 }],
          qAutoSort: true
        }
      });

      const layout = await listObject.getLayout();
      const values = layout.qListObject.qDataPages[0].qMatrix
        .map((item: any) => item[0].qText)
        .filter((value: string) => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (values.length > 0) {
        await this.selectInField(fieldName, values);
      }

      // Clean up
      await listObject.destroy();
      
      return values;

    } catch (error) {
      console.error(\`Search and select failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  // Advanced selection with conditions
  async selectWithCondition(fieldName: string, condition: (value: any) => boolean): Promise<void> {
    try {
      // Create temporary listbox to get all values
      const listObject = await this.app.createSessionObject({
        qInfo: { qType: 'condition-listbox' },
        qListObjectDef: {
          qDef: { qFieldDefs: [fieldName] },
          qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 1, qHeight: 10000 }]
        }
      });

      const layout = await listObject.getLayout();
      const allValues = layout.qListObject.qDataPages[0].qMatrix.map((item: any) => ({
        text: item[0].qText,
        number: item[0].qNum,
        state: item[0].qState
      }));

      // Filter values based on condition
      const selectedValues = allValues
        .filter(condition)
        .map(item => item.text);

      if (selectedValues.length > 0) {
        await this.selectInField(fieldName, selectedValues);
      }

      await listObject.destroy();

    } catch (error) {
      console.error(\`Conditional selection failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  // Set up selection change listeners
  private setupSelectionListeners(): void {
    // Listen for selection changes from other sources
    // This would typically be set up through Qlik's event system
  }

  private emitSelectionChanged(field: string, values: any[]): void {
    const event = new CustomEvent('qlik:selection-changed', {
      detail: { field, values, timestamp: Date.now() }
    });
    window.dispatchEvent(event);
  }
}

// Usage examples
async function implementInteractiveFiltering(app: any) {
  const selectionManager = new SelectionManager(app);

  // Listen for selection events
  window.addEventListener('qlik:selection-changed', (event: any) => {
    console.log('Selection changed:', event.detail);
    // Update your UI components here
  });

  // Example: Product filter
  await selectionManager.selectInField('Product', ['Laptop', 'Desktop']);

  // Example: Date range (requires date field)
  await selectionManager.selectWithCondition('OrderDate', (value) => {
    const date = new Date(value.text);
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    return date >= startDate && date <= endDate;
  });

  // Example: Top performers (numeric condition)
  await selectionManager.selectWithCondition('SalesAmount', (value) => {
    return value.number > 10000; // Sales > 10k
  });

  // Example: Search functionality
  const searchResults = await selectionManager.searchAndSelect('Customer', 'Corp');
  console.log('Found customers:', searchResults);
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Data Export */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Download className="h-5 w-5" />
          Data Export Operations
        </h2>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Export to Multiple Formats
            </CardTitle>
            <CardDescription>
              Export Qlik data to CSV, JSON, Excel, and other formats
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
              {`class DataExporter {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  // Export hypercube data to CSV
  async exportToCSV(sessionObject: any, filename: string = 'qlik_data.csv'): Promise<void> {
    try {
      const layout = await sessionObject.getLayout();
      const hypercube = layout.qHyperCube;

      // Get all data (handle large datasets with pagination)
      const allData = await this.getAllHyperCubeData(sessionObject);
      
      // Create CSV content
      const headers = this.extractHeaders(hypercube);
      const csvRows = [headers.join(',')];

      allData.forEach(row => {
        const csvRow = row.map(cell => {
          const value = cell.text || cell.number || '';
          // Escape commas and quotes
          return \`"\${String(value).replace(/"/g, '""')}"\`;
        });
        csvRows.push(csvRow.join(','));
      });

      const csvContent = csvRows.join('\\n');
      
      // Download file
      this.downloadFile(csvContent, filename, 'text/csv');
      console.log(\`✅ Data exported to \${filename}\`);

    } catch (error) {
      console.error('CSV export failed:', error);
      throw error;
    }
  }

  // Export to JSON with metadata
  async exportToJSON(sessionObject: any, filename: string = 'qlik_data.json'): Promise<void> {
    try {
      const layout = await sessionObject.getLayout();
      const hypercube = layout.qHyperCube;
      const data = await this.getAllHyperCubeData(sessionObject);

      const exportData = {
        metadata: {
          exportTime: new Date().toISOString(),
          title: layout.title || 'Qlik Data Export',
          dimensions: hypercube.qDimensionInfo.length,
          measures: hypercube.qMeasureInfo.length,
          totalRows: hypercube.qSize.qcy,
          selectionState: await this.getSelectionState()
        },
        headers: this.extractHeaders(hypercube),
        dimensionInfo: hypercube.qDimensionInfo,
        measureInfo: hypercube.qMeasureInfo,
        data: data.map(row => row.map(cell => ({
          text: cell.text,
          number: cell.number,
          state: cell.state
        })))
      };

      const jsonContent = JSON.stringify(exportData, null, 2);
      this.downloadFile(jsonContent, filename, 'application/json');
      console.log(\`✅ Data exported to \${filename}\`);

    } catch (error) {
      console.error('JSON export failed:', error);
      throw error;
    }
  }

  // Export formatted data for Excel
  async exportToExcel(sessionObject: any, filename: string = 'qlik_data.xlsx'): Promise<void> {
    try {
      // Note: This is a simplified version. For full Excel support, 
      // you would use a library like 'xlsx' or 'exceljs'
      
      const layout = await sessionObject.getLayout();
      const hypercube = layout.qHyperCube;
      const data = await this.getAllHyperCubeData(sessionObject);

      // Create tab-separated values (TSV) for Excel compatibility
      const headers = this.extractHeaders(hypercube);
      const tsvRows = [headers.join('\\t')];

      data.forEach(row => {
        const tsvRow = row.map(cell => {
          const value = cell.text || cell.number || '';
          return String(value).replace(/\\t/g, ' '); // Replace tabs with spaces
        });
        tsvRows.push(tsvRow.join('\\t'));
      });

      const tsvContent = tsvRows.join('\\n');
      this.downloadFile(tsvContent, filename.replace('.xlsx', '.txt'), 'text/tab-separated-values');
      
      console.log('✅ Data exported in Excel-compatible format');

    } catch (error) {
      console.error('Excel export failed:', error);
      throw error;
    }
  }

  // Get all data with pagination for large datasets
  private async getAllHyperCubeData(sessionObject: any): Promise<any[]> {
    const layout = await sessionObject.getLayout();
    const hypercube = layout.qHyperCube;
    const totalRows = hypercube.qSize.qcy;
    const pageSize = 1000; // Process 1000 rows at a time
    
    let allData: any[] = [];
    let currentRow = 0;

    while (currentRow < totalRows) {
      const remainingRows = Math.min(pageSize, totalRows - currentRow);
      
      const pageData = await sessionObject.getHyperCubeData('/qHyperCubeDef', [{
        qLeft: 0,
        qTop: currentRow,
        qWidth: hypercube.qSize.qcx,
        qHeight: remainingRows
      }]);

      allData = allData.concat(pageData[0].qMatrix);
      currentRow += remainingRows;

      // Progress callback
      console.log(\`Exported \${currentRow}/\${totalRows} rows (\${Math.round(currentRow/totalRows*100)}%)\`);
    }

    return allData;
  }

  private extractHeaders(hypercube: any): string[] {
    const dimensionHeaders = hypercube.qDimensionInfo.map((dim: any) => 
      dim.qFallbackTitle || 'Dimension'
    );
    
    const measureHeaders = hypercube.qMeasureInfo.map((measure: any) => 
      measure.qFallbackTitle || 'Measure'
    );
    
    return [...dimensionHeaders, ...measureHeaders];
  }

  private async getSelectionState(): Promise<any> {
    try {
      const selectionState = await this.app.getSelectionState();
      return selectionState;
    } catch {
      return {};
    }
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}

// Usage
async function exportAnalysisResults(app: any) {
  const exporter = new DataExporter(app);
  
  // Create analysis hypercube
  const analysisObject = await app.createSessionObject({
    qInfo: { qType: 'export-analysis' },
    qHyperCubeDef: {
      qDimensions: [
        { qDef: { qFieldDefs: ['Product'] } },
        { qDef: { qFieldDefs: ['Region'] } }
      ],
      qMeasures: [
        { qDef: { qDef: 'Sum(Sales)', qLabel: 'Total Sales' } },
        { qDef: { qDef: 'Count(OrderID)', qLabel: 'Order Count' } }
      ],
      qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 4, qHeight: 10000 }]
    }
  });

  // Export in different formats
  await exporter.exportToCSV(analysisObject, 'sales_analysis.csv');
  await exporter.exportToJSON(analysisObject, 'sales_analysis.json');
  await exporter.exportToExcel(analysisObject, 'sales_analysis.xlsx');
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/50">
        <CardHeader>
          <CardTitle className="text-amber-800 dark:text-amber-200">
            ⚡ Data Operations Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-amber-700 dark:text-amber-300">
          <div>
            <strong>Pagination:</strong> Use pagination for large datasets to
            avoid memory issues
          </div>
          <div>
            <strong>Error Handling:</strong> Implement comprehensive error
            handling for all data operations
          </div>
          <div>
            <strong>Performance:</strong> Limit initial data fetch sizes and
            load data on demand
          </div>
          <div>
            <strong>State Management:</strong> Keep track of selections and
            filters across operations
          </div>
          <div>
            <strong>Memory Management:</strong> Destroy session objects when no
            longer needed
          </div>
          <div>
            <strong>Real-time Updates:</strong> Implement efficient polling or
            event-based updates
          </div>
          <div>
            <strong>Export Optimization:</strong> Stream large exports to avoid
            blocking the UI
          </div>
          <div>
            <strong>User Experience:</strong> Provide progress indicators for
            long-running operations
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
