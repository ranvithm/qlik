import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Component, Zap, RefreshCw, Settings } from "lucide-react"

export const metadata: Metadata = {
  title: "Angular Integration",
  description: "Learn how to integrate Qlik TypeScript SDK with Angular applications using services, components, and reactive patterns",
}

export default function AngularIntegrationPage() {
  return (
    <div className="space-y-8 page-transition">
      <SectionHeader
        title="Angular Integration"
        description="Build powerful Qlik analytics applications with Angular using dependency injection, reactive programming, and component-based architecture."
      />

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Component className="h-5 w-5" />
            Angular + Qlik Integration Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Angular's powerful dependency injection system and reactive programming model make it ideal for 
            building complex Qlik analytics applications. This guide covers service creation, component 
            patterns, and reactive data handling with RxJS.
          </p>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Component className="h-3 w-3 mr-1" />
                Services
              </Badge>
              <div className="text-sm text-muted-foreground">
                Injectable services for Qlik operations
              </div>
            </div>
            
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                Reactive
              </Badge>
              <div className="text-sm text-muted-foreground">
                RxJS observables for real-time data
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <RefreshCw className="h-3 w-3 mr-1" />
                Change Detection
              </Badge>
              <div className="text-sm text-muted-foreground">
                Optimized update strategies
              </div>
            </div>

            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                <Settings className="h-3 w-3 mr-1" />
                Dependency Injection
              </Badge>
              <div className="text-sm text-muted-foreground">
                Modular service architecture
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Core Services */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Core Qlik Services
        </h2>
        
        <Tabs defaultValue="core-service" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="core-service">Core Service</TabsTrigger>
            <TabsTrigger value="data-service">Data Service</TabsTrigger>
            <TabsTrigger value="selection-service">Selection Service</TabsTrigger>
          </TabsList>
          
          <TabsContent value="core-service" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Qlik Core Service</CardTitle>
                <CardDescription>
                  Main service for Qlik connection and app management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, shareReplay, takeUntil } from 'rxjs/operators';
import Qlik from 'qlik';

export interface QlikConfig {
  host: string;
  prefix?: string;
  port?: number;
  isSecure?: boolean;
  webIntegrationId: string;
}

export interface ConnectionState {
  isConnected: boolean;
  isAuthenticated: boolean;
  currentApp?: any;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QlikCoreService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private connectionState$ = new BehaviorSubject<ConnectionState>({
    isConnected: false,
    isAuthenticated: false
  });

  private qlik: any = null;
  private currentApp: any = null;
  private config: QlikConfig | null = null;

  constructor() {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Initialize Qlik connection
   */
  async initialize(config: QlikConfig): Promise<void> {
    try {
      this.config = config;
      
      // Configure Qlik
      const qlikConfig = {
        host: config.host,
        prefix: config.prefix || '/',
        port: config.port || 443,
        isSecure: config.isSecure !== false,
        webIntegrationId: config.webIntegrationId
      };

      // Initialize Qlik
      this.qlik = await (window as any).qlik?.auth?.(qlikConfig);
      
      if (!this.qlik) {
        throw new Error('Failed to initialize Qlik connection');
      }

      this.updateConnectionState({
        isConnected: true,
        isAuthenticated: true
      });

      console.log('✅ Qlik Core Service initialized');
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Qlik initialization failed:', errorMessage);
      
      this.updateConnectionState({
        isConnected: false,
        isAuthenticated: false,
        error: errorMessage
      });
      
      throw error;
    }
  }

  /**
   * Open Qlik application
   */
  async openApp(appId: string): Promise<any> {
    try {
      if (!this.qlik) {
        throw new Error('Qlik not initialized. Call initialize() first.');
      }

      this.currentApp = await this.qlik.openApp(appId);
      
      this.updateConnectionState({
        ...this.connectionState$.value,
        currentApp: this.currentApp
      });

      console.log(\`✅ Opened Qlik app: \${appId}\`);
      return this.currentApp;
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to open app';
      console.error('❌ Failed to open Qlik app:', errorMessage);
      
      this.updateConnectionState({
        ...this.connectionState$.value,
        error: errorMessage
      });
      
      throw error;
    }
  }

  /**
   * Get current app
   */
  getCurrentApp(): any {
    return this.currentApp;
  }

  /**
   * Get connection state as observable
   */
  getConnectionState(): Observable<ConnectionState> {
    return this.connectionState$.asObservable();
  }

  /**
   * Check if connected and authenticated
   */
  isReady(): boolean {
    const state = this.connectionState$.value;
    return state.isConnected && state.isAuthenticated && !!this.currentApp;
  }

  /**
   * Create session object
   */
  async createSessionObject(definition: any): Promise<any> {
    try {
      if (!this.currentApp) {
        throw new Error('No app opened. Call openApp() first.');
      }

      const sessionObject = await this.currentApp.createSessionObject(definition);
      console.log('✅ Session object created:', definition.qInfo?.qType);
      
      return sessionObject;
      
    } catch (error) {
      console.error('❌ Failed to create session object:', error);
      throw error;
    }
  }

  /**
   * Get field information
   */
  async getField(fieldName: string): Promise<any> {
    try {
      if (!this.currentApp) {
        throw new Error('No app opened');
      }

      const field = await this.currentApp.getField(fieldName);
      return field;
      
    } catch (error) {
      console.error(\`❌ Failed to get field \${fieldName}:\`, error);
      throw error;
    }
  }

  private updateConnectionState(newState: Partial<ConnectionState>): void {
    const currentState = this.connectionState$.value;
    this.connectionState$.next({ ...currentState, ...newState });
  }
}

// Qlik configuration token for dependency injection
import { InjectionToken } from '@angular/core';
export const QLIK_CONFIG = new InjectionToken<QlikConfig>('qlik.config');`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="data-service" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Qlik Data Service</CardTitle>
                <CardDescription>
                  Service for hypercube operations and data management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, timer } from 'rxjs';
import { map, switchMap, catchError, shareReplay, distinctUntilChanged } from 'rxjs/operators';
import { QlikCoreService } from './qlik-core.service';

export interface HyperCubeDefinition {
  dimensions: Array<{
    fieldDefs: string[];
    fieldLabels?: string[];
    nullSuppression?: boolean;
  }>;
  measures: Array<{
    def: string;
    label?: string;
    sortBy?: any;
  }>;
  initialDataFetch?: Array<{
    left: number;
    top: number;
    width: number;
    height: number;
  }>;
  suppressZero?: boolean;
  suppressMissing?: boolean;
}

export interface HyperCubeData {
  headers: string[];
  data: any[][];
  totalRows: number;
  totalColumns: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class QlikDataService {
  private hypercubes = new Map<string, any>();
  private dataStreams = new Map<string, BehaviorSubject<HyperCubeData | null>>();

  constructor(private qlikCore: QlikCoreService) {}

  /**
   * Create a hypercube and return observable data stream
   */
  createHyperCube(
    id: string, 
    definition: HyperCubeDefinition,
    refreshInterval?: number
  ): Observable<HyperCubeData> {
    
    // Create data stream if it doesn't exist
    if (!this.dataStreams.has(id)) {
      this.dataStreams.set(id, new BehaviorSubject<HyperCubeData | null>(null));
    }

    const dataStream$ = this.dataStreams.get(id)!;

    // Create hypercube definition
    const hypercubeDef = {
      qInfo: { qType: \`hypercube-\${id}\` },
      qHyperCubeDef: {
        qDimensions: definition.dimensions.map(dim => ({
          qDef: {
            qFieldDefs: dim.fieldDefs,
            qFieldLabels: dim.fieldLabels || dim.fieldDefs
          },
          qNullSuppression: dim.nullSuppression !== false
        })),
        qMeasures: definition.measures.map(measure => ({
          qDef: {
            qDef: measure.def,
            qLabel: measure.label || measure.def
          },
          qSortBy: measure.sortBy
        })),
        qInitialDataFetch: definition.initialDataFetch || [
          { qLeft: 0, qTop: 0, qWidth: 10, qHeight: 100 }
        ],
        qSuppressZero: definition.suppressZero,
        qSuppressMissing: definition.suppressMissing
      }
    };

    // Create the hypercube
    this.createAndUpdateHyperCube(id, hypercubeDef, dataStream$, refreshInterval);

    return dataStream$.pipe(
      filter(data => data !== null),
      map(data => data!),
      distinctUntilChanged((a, b) => a.timestamp === b.timestamp),
      shareReplay(1)
    );
  }

  /**
   * Get paginated data from hypercube
   */
  getHyperCubePage(
    id: string, 
    page: number, 
    pageSize: number = 100
  ): Observable<HyperCubeData> {
    const hypercube = this.hypercubes.get(id);
    
    if (!hypercube) {
      return throwError(() => new Error(\`HyperCube \${id} not found\`));
    }

    return new Observable(observer => {
      this.getHyperCubeData(hypercube, {
        qLeft: 0,
        qTop: page * pageSize,
        qWidth: 20, // Adjust based on your dimensions + measures
        qHeight: pageSize
      }).then(data => {
        observer.next(data);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  /**
   * Create real-time data stream
   */
  createRealtimeStream(
    id: string,
    definition: HyperCubeDefinition,
    intervalMs: number = 30000
  ): Observable<HyperCubeData> {
    
    return timer(0, intervalMs).pipe(
      switchMap(() => {
        if (!this.qlikCore.isReady()) {
          return throwError(() => new Error('Qlik not ready'));
        }
        
        return this.createHyperCube(id, definition);
      }),
      catchError(error => {
        console.error(\`Real-time stream error for \${id}:\`, error);
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  /**
   * Destroy hypercube and clean up resources
   */
  async destroyHyperCube(id: string): Promise<void> {
    try {
      const hypercube = this.hypercubes.get(id);
      const dataStream = this.dataStreams.get(id);

      if (hypercube) {
        await hypercube.destroy();
        this.hypercubes.delete(id);
        console.log(\`✅ HyperCube \${id} destroyed\`);
      }

      if (dataStream) {
        dataStream.complete();
        this.dataStreams.delete(id);
      }

    } catch (error) {
      console.error(\`❌ Failed to destroy HyperCube \${id}:\`, error);
      throw error;
    }
  }

  private async createAndUpdateHyperCube(
    id: string,
    definition: any,
    dataStream$: BehaviorSubject<HyperCubeData | null>,
    refreshInterval?: number
  ): Promise<void> {
    
    try {
      const hypercube = await this.qlikCore.createSessionObject(definition);
      this.hypercubes.set(id, hypercube);

      // Get initial data
      const initialData = await this.getHyperCubeData(hypercube);
      dataStream$.next(initialData);

      // Set up auto-refresh if specified
      if (refreshInterval && refreshInterval > 0) {
        const refreshTimer = setInterval(async () => {
          try {
            const updatedData = await this.getHyperCubeData(hypercube);
            dataStream$.next(updatedData);
          } catch (error) {
            console.error(\`Refresh failed for HyperCube \${id}:\`, error);
          }
        }, refreshInterval);

        // Store timer reference for cleanup
        (hypercube as any)._refreshTimer = refreshTimer;
      }

    } catch (error) {
      console.error(\`Failed to create HyperCube \${id}:\`, error);
      dataStream$.error(error);
    }
  }

  private async getHyperCubeData(
    hypercube: any, 
    page?: { qLeft: number; qTop: number; qWidth: number; qHeight: number }
  ): Promise<HyperCubeData> {
    
    try {
      const layout = await hypercube.getLayout();
      const hypercubeLayout = layout.qHyperCube;

      const dataPage = page || {
        qLeft: 0,
        qTop: 0,
        qWidth: hypercubeLayout.qSize.qcx,
        qHeight: Math.min(hypercubeLayout.qSize.qcy, 1000)
      };

      const data = await hypercube.getHyperCubeData('/qHyperCubeDef', [dataPage]);
      
      return {
        headers: this.extractHeaders(hypercubeLayout),
        data: this.processMatrix(data[0].qMatrix),
        totalRows: hypercubeLayout.qSize.qcy,
        totalColumns: hypercubeLayout.qSize.qcx,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Failed to get hypercube data:', error);
      throw error;
    }
  }

  private extractHeaders(hypercube: any): string[] {
    const dimensionHeaders = hypercube.qDimensionInfo?.map((dim: any) => 
      dim.qFallbackTitle || dim.qFieldLabels?.[0] || 'Dimension'
    ) || [];
    
    const measureHeaders = hypercube.qMeasureInfo?.map((measure: any) => 
      measure.qFallbackTitle || 'Measure'
    ) || [];
    
    return [...dimensionHeaders, ...measureHeaders];
  }

  private processMatrix(matrix: any[]): any[][] {
    return matrix.map(row => 
      row.map((cell: any) => ({
        text: cell.qText,
        number: cell.qNum,
        state: cell.qState
      }))
    );
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="selection-service" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selection Management Service</CardTitle>
                <CardDescription>
                  Reactive service for handling field selections and filters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <CodeBlock language="typescript">
{`import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { QlikCoreService } from './qlik-core.service';

export interface SelectionState {
  field: string;
  values: string[];
  isSelected: boolean;
  timestamp: string;
}

export interface GlobalSelectionState {
  selections: Record<string, SelectionState>;
  hasSelections: boolean;
  selectionCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class QlikSelectionService {
  private selectionState$ = new BehaviorSubject<GlobalSelectionState>({
    selections: {},
    hasSelections: false,
    selectionCount: 0
  });

  private selectionChange$ = new Subject<{ field: string; action: string; values: string[] }>();

  constructor(private qlikCore: QlikCoreService) {}

  /**
   * Get global selection state as observable
   */
  getSelectionState(): Observable<GlobalSelectionState> {
    return this.selectionState$.asObservable().pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  /**
   * Get selections for specific field
   */
  getFieldSelections(fieldName: string): Observable<SelectionState | null> {
    return this.selectionState$.pipe(
      map(state => state.selections[fieldName] || null),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    );
  }

  /**
   * Get selection change events
   */
  getSelectionChanges(): Observable<{ field: string; action: string; values: string[] }> {
    return this.selectionChange$.asObservable();
  }

  /**
   * Make selections in a field
   */
  async selectInField(fieldName: string, values: string[]): Promise<void> {
    try {
      const field = await this.qlikCore.getField(fieldName);
      await field.selectValues(values);

      this.updateFieldSelection(fieldName, values, true);
      this.selectionChange$.next({ field: fieldName, action: 'select', values });

      console.log(\`✅ Selected in \${fieldName}:\`, values);

    } catch (error) {
      console.error(\`❌ Selection failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  /**
   * Clear selections in specific field
   */
  async clearField(fieldName: string): Promise<void> {
    try {
      const field = await this.qlikCore.getField(fieldName);
      await field.clear();

      this.removeFieldSelection(fieldName);
      this.selectionChange$.next({ field: fieldName, action: 'clear', values: [] });

      console.log(\`✅ Cleared selections in \${fieldName}\`);

    } catch (error) {
      console.error(\`❌ Clear failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  /**
   * Clear all selections
   */
  async clearAll(): Promise<void> {
    try {
      const app = this.qlikCore.getCurrentApp();
      if (!app) {
        throw new Error('No app available');
      }

      await app.clearAll();
      
      this.selectionState$.next({
        selections: {},
        hasSelections: false,
        selectionCount: 0
      });

      this.selectionChange$.next({ field: '*', action: 'clear-all', values: [] });
      console.log('✅ All selections cleared');

    } catch (error) {
      console.error('❌ Clear all failed:', error);
      throw error;
    }
  }

  /**
   * Search and select in field
   */
  async searchAndSelect(fieldName: string, searchTerm: string): Promise<string[]> {
    try {
      const field = await this.qlikCore.getField(fieldName);
      
      // Create temporary listbox to search
      const listObjectDef = {
        qInfo: { qType: 'search-listbox' },
        qListObjectDef: {
          qDef: { qFieldDefs: [fieldName] },
          qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 1, qHeight: 1000 }],
          qAutoSort: true,
          qFrequencyMode: 'V'
        }
      };

      const listObject = await this.qlikCore.createSessionObject(listObjectDef);
      const layout = await listObject.getLayout();
      
      const allValues = layout.qListObject.qDataPages[0].qMatrix
        .map((item: any) => item[0].qText)
        .filter((value: string) => 
          value.toLowerCase().includes(searchTerm.toLowerCase())
        );

      if (allValues.length > 0) {
        await this.selectInField(fieldName, allValues);
      }

      // Clean up
      await listObject.destroy();

      console.log(\`✅ Search and select in \${fieldName} for "\${searchTerm}": \${allValues.length} matches\`);
      return allValues;

    } catch (error) {
      console.error(\`❌ Search and select failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  /**
   * Toggle selection for specific values
   */
  async toggleSelection(fieldName: string, values: string[]): Promise<void> {
    try {
      const currentState = this.selectionState$.value;
      const fieldState = currentState.selections[fieldName];

      if (fieldState && fieldState.isSelected) {
        // Clear current selections
        await this.clearField(fieldName);
      } else {
        // Make new selections
        await this.selectInField(fieldName, values);
      }

    } catch (error) {
      console.error(\`❌ Toggle selection failed for \${fieldName}:\`, error);
      throw error;
    }
  }

  /**
   * Get possible values for a field
   */
  async getFieldValues(fieldName: string, maxValues: number = 100): Promise<Array<{ text: string; frequency?: number }>> {
    try {
      const listObjectDef = {
        qInfo: { qType: 'field-values' },
        qListObjectDef: {
          qDef: { qFieldDefs: [fieldName] },
          qInitialDataFetch: [{ qLeft: 0, qTop: 0, qWidth: 1, qHeight: maxValues }],
          qAutoSort: true,
          qFrequencyMode: 'V'
        }
      };

      const listObject = await this.qlikCore.createSessionObject(listObjectDef);
      const layout = await listObject.getLayout();
      
      const values = layout.qListObject.qDataPages[0].qMatrix.map((item: any) => ({
        text: item[0].qText,
        frequency: item[0].qFrequency
      }));

      await listObject.destroy();
      return values;

    } catch (error) {
      console.error(\`❌ Failed to get field values for \${fieldName}:\`, error);
      throw error;
    }
  }

  private updateFieldSelection(fieldName: string, values: string[], isSelected: boolean): void {
    const currentState = this.selectionState$.value;
    
    const updatedSelections = {
      ...currentState.selections,
      [fieldName]: {
        field: fieldName,
        values,
        isSelected,
        timestamp: new Date().toISOString()
      }
    };

    const selectionCount = Object.keys(updatedSelections).length;
    
    this.selectionState$.next({
      selections: updatedSelections,
      hasSelections: selectionCount > 0,
      selectionCount
    });
  }

  private removeFieldSelection(fieldName: string): void {
    const currentState = this.selectionState$.value;
    const updatedSelections = { ...currentState.selections };
    delete updatedSelections[fieldName];

    const selectionCount = Object.keys(updatedSelections).length;

    this.selectionState$.next({
      selections: updatedSelections,
      hasSelections: selectionCount > 0,
      selectionCount
    });
  }
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Angular Components */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Component className="h-5 w-5" />
          Angular Components
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Qlik Chart Component</CardTitle>
            <CardDescription>
              Reusable Angular component for displaying Qlik hypercube data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`import { 
  Component, 
  Input, 
  OnInit, 
  OnDestroy, 
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QlikDataService, HyperCubeDefinition, HyperCubeData } from '../services/qlik-data.service';
import { QlikSelectionService } from '../services/qlik-selection.service';

@Component({
  selector: 'app-qlik-chart',
  template: \`
    <div class="qlik-chart-container" [class]="cssClass">
      <!-- Header -->
      <div class="chart-header" *ngIf="title">
        <h3>{{ title }}</h3>
        <div class="chart-actions">
          <button 
            type="button" 
            class="btn btn-sm btn-outline"
            (click)="refresh()"
            [disabled]="isLoading">
            <span *ngIf="!isLoading">🔄</span>
            <span *ngIf="isLoading">⏳</span>
            Refresh
          </button>
          <button 
            type="button" 
            class="btn btn-sm btn-outline"
            (click)="exportData()"
            [disabled]="!data">
            📥 Export
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-state" *ngIf="isLoading && !data">
        <div class="spinner"></div>
        <p>Loading chart data...</p>
      </div>

      <!-- Error State -->
      <div class="error-state" *ngIf="error && !data">
        <div class="error-icon">❌</div>
        <h4>Failed to load data</h4>
        <p>{{ error }}</p>
        <button type="button" class="btn btn-primary" (click)="retry()">
          Retry
        </button>
      </div>

      <!-- Chart Content -->
      <div 
        class="chart-content" 
        *ngIf="data && !error"
        #chartContainer>
        
        <!-- Data Table -->
        <div class="data-table" *ngIf="displayMode === 'table'">
          <table>
            <thead>
              <tr>
                <th *ngFor="let header of data.headers; trackBy: trackByIndex">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let row of data.data; trackBy: trackByIndex; let i = index">
                <td 
                  *ngFor="let cell of row; trackBy: trackByIndex; let j = index"
                  [class.selectable]="j < dimensionCount"
                  (click)="onCellClick(cell, j, i)">
                  {{ cell.text || cell.number || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Chart Visualization -->
        <div 
          class="chart-visualization" 
          *ngIf="displayMode === 'chart'"
          #chartViz>
          <!-- Chart implementation would go here -->
          <!-- You can integrate with Chart.js, D3, or other libraries -->
        </div>
      </div>

      <!-- Footer -->
      <div class="chart-footer" *ngIf="data">
        <div class="data-info">
          <span>{{ data.totalRows | number }} rows</span>
          <span *ngIf="data.timestamp" class="timestamp">
            Updated: {{ data.timestamp | date:'short' }}
          </span>
        </div>
        <div class="display-controls">
          <button 
            type="button"
            [class.active]="displayMode === 'table'"
            (click)="setDisplayMode('table')">
            📊 Table
          </button>
          <button 
            type="button"
            [class.active]="displayMode === 'chart'"
            (click)="setDisplayMode('chart')">
            📈 Chart
          </button>
        </div>
      </div>
    </div>
  \`,
  styles: [\`
    .qlik-chart-container {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: white;
      overflow: hidden;
    }

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
    }

    .chart-header h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
    }

    .chart-actions {
      display: flex;
      gap: 0.5rem;
    }

    .chart-content {
      min-height: 300px;
      max-height: 600px;
      overflow: auto;
    }

    .data-table table {
      width: 100%;
      border-collapse: collapse;
    }

    .data-table th,
    .data-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }

    .data-table th {
      background: #f8fafc;
      font-weight: 600;
      position: sticky;
      top: 0;
    }

    .data-table td.selectable {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .data-table td.selectable:hover {
      background: #e2e8f0;
    }

    .chart-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 0.875rem;
    }

    .display-controls button {
      margin-left: 0.5rem;
      padding: 0.25rem 0.5rem;
      border: 1px solid #d1d5db;
      background: white;
      cursor: pointer;
      border-radius: 4px;
    }

    .display-controls button.active {
      background: #3b82f6;
      color: white;
    }

    .loading-state,
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
    }

    .spinner {
      width: 32px;
      height: 32px;
      border: 3px solid #e2e8f0;
      border-top: 3px solid #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  \`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QlikChartComponent implements OnInit, OnDestroy {
  @Input() hypercubeId!: string;
  @Input() definition!: HyperCubeDefinition;
  @Input() title?: string;
  @Input() cssClass?: string;
  @Input() refreshInterval?: number;
  @Input() allowSelections: boolean = true;

  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;
  @ViewChild('chartViz', { static: false }) chartViz!: ElementRef;

  data: HyperCubeData | null = null;
  isLoading = false;
  error: string | null = null;
  displayMode: 'table' | 'chart' = 'table';
  dimensionCount = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private qlikData: QlikDataService,
    private qlikSelection: QlikSelectionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.hypercubeId || !this.definition) {
      this.error = 'hypercubeId and definition are required';
      return;
    }

    this.dimensionCount = this.definition.dimensions.length;
    this.loadData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.isLoading = true;
    this.error = null;
    
    this.qlikData.createHyperCube(this.hypercubeId, this.definition, this.refreshInterval)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.data = data;
          this.isLoading = false;
          this.cdr.markForCheck();
          console.log(\`✅ Chart data loaded for \${this.hypercubeId}:\`, data);
        },
        error: (error) => {
          this.error = error.message || 'Failed to load chart data';
          this.isLoading = false;
          this.cdr.markForCheck();
          console.error(\`❌ Chart data load failed for \${this.hypercubeId}:\`, error);
        }
      });
  }

  refresh(): void {
    this.loadData();
  }

  retry(): void {
    this.loadData();
  }

  setDisplayMode(mode: 'table' | 'chart'): void {
    this.displayMode = mode;
    this.cdr.markForCheck();

    if (mode === 'chart') {
      // Trigger chart rendering after view update
      setTimeout(() => this.renderChart(), 0);
    }
  }

  onCellClick(cell: any, columnIndex: number, rowIndex: number): void {
    if (!this.allowSelections || columnIndex >= this.dimensionCount) {
      return; // Only allow selections on dimension columns
    }

    const dimensionField = this.definition.dimensions[columnIndex].fieldDefs[0];
    const cellValue = cell.text || cell.number;

    if (cellValue && dimensionField) {
      this.qlikSelection.selectInField(dimensionField, [String(cellValue)]);
    }
  }

  exportData(): void {
    if (!this.data) return;

    // Convert to CSV
    const headers = this.data.headers.join(',');
    const rows = this.data.data.map(row => 
      row.map(cell => \`"\${cell.text || cell.number || ''}"\`).join(',')
    );
    
    const csvContent = [headers, ...rows].join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = \`\${this.hypercubeId}_data.csv\`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  trackByIndex(index: number): number {
    return index;
  }

  private renderChart(): void {
    if (!this.chartViz || !this.data) return;

    // Implement chart rendering logic here
    // You can use Chart.js, D3, or any other charting library
    console.log('Rendering chart for:', this.hypercubeId);
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Complete Dashboard Example */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Complete Dashboard Example</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Analytics Dashboard</CardTitle>
            <CardDescription>
              Full Angular dashboard implementation with multiple Qlik components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock language="typescript">
{`// sales-dashboard.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { QlikCoreService, QlikConfig } from '../services/qlik-core.service';
import { QlikDataService, HyperCubeDefinition } from '../services/qlik-data.service';
import { QlikSelectionService, GlobalSelectionState } from '../services/qlik-selection.service';

@Component({
  selector: 'app-sales-dashboard',
  template: \`
    <div class="sales-dashboard">
      <!-- Header -->
      <div class="dashboard-header">
        <h1>Sales Analytics Dashboard</h1>
        <div class="connection-status">
          <span 
            class="status-indicator"
            [class.connected]="connectionState.isConnected"
            [class.disconnected]="!connectionState.isConnected">
          </span>
          {{ connectionState.isConnected ? 'Connected' : 'Disconnected' }}
        </div>
      </div>

      <!-- Selection Bar -->
      <div class="selection-bar" *ngIf="selectionState.hasSelections">
        <div class="selection-info">
          <span class="selection-count">{{ selectionState.selectionCount }} selections active</span>
          <button 
            type="button" 
            class="btn btn-sm btn-outline"
            (click)="clearAllSelections()">
            Clear All
          </button>
        </div>
        
        <div class="active-selections">
          <div 
            class="selection-chip" 
            *ngFor="let selection of getActiveSelections()"
            (click)="clearFieldSelection(selection.field)">
            <span class="field-name">{{ selection.field }}:</span>
            <span class="values">{{ selection.values.join(', ') }}</span>
            <span class="remove">×</span>
          </div>
        </div>
      </div>

      <!-- Filters Panel -->
      <div class="filters-panel">
        <div class="filter-group">
          <label>Product Category</label>
          <app-qlik-field-selector
            fieldName="Category"
            [maxItems]="10"
            (selectionChange)="onFieldSelection('Category', $event)">
          </app-qlik-field-selector>
        </div>

        <div class="filter-group">
          <label>Region</label>
          <app-qlik-field-selector
            fieldName="Region"
            [maxItems]="5"
            (selectionChange)="onFieldSelection('Region', $event)">
          </app-qlik-field-selector>
        </div>

        <div class="filter-group">
          <label>Date Range</label>
          <app-qlik-date-range
            fieldName="OrderDate"
            (rangeChange)="onDateRangeChange($event)">
          </app-qlik-date-range>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <!-- KPI Cards -->
        <div class="kpi-section">
          <div class="kpi-card">
            <h3>Total Sales</h3>
            <div class="kpi-value">{{ totalSales | currency }}</div>
            <div class="kpi-change" [class.positive]="salesGrowth > 0">
              {{ salesGrowth > 0 ? '↗️' : '↘️' }} {{ salesGrowth }}%
            </div>
          </div>

          <div class="kpi-card">
            <h3>Orders</h3>
            <div class="kpi-value">{{ totalOrders | number }}</div>
          </div>

          <div class="kpi-card">
            <h3>Avg Order Value</h3>
            <div class="kpi-value">{{ avgOrderValue | currency }}</div>
          </div>
        </div>

        <!-- Charts Grid -->
        <div class="charts-grid">
          <!-- Sales by Product -->
          <app-qlik-chart
            hypercubeId="sales-by-product"
            [definition]="salesByProductDef"
            title="Sales by Product"
            cssClass="chart-card">
          </app-qlik-chart>

          <!-- Sales Trend -->
          <app-qlik-chart
            hypercubeId="sales-trend"
            [definition]="salesTrendDef"
            title="Sales Trend"
            cssClass="chart-card span-2">
          </app-qlik-chart>

          <!-- Regional Performance -->
          <app-qlik-chart
            hypercubeId="regional-performance"
            [definition]="regionalPerformanceDef"
            title="Regional Performance"
            cssClass="chart-card">
          </app-qlik-chart>

          <!-- Top Customers -->
          <app-qlik-chart
            hypercubeId="top-customers"
            [definition]="topCustomersDef"
            title="Top Customers"
            cssClass="chart-card span-2">
          </app-qlik-chart>
        </div>
      </div>
    </div>
  \`,
  styles: [\`
    .sales-dashboard {
      padding: 1rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
    }

    .connection-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #ef4444;
    }

    .status-indicator.connected {
      background: #22c55e;
    }

    .selection-bar {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .selection-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .active-selections {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .selection-chip {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      background: #3b82f6;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .selection-chip:hover {
      background: #1d4ed8;
    }

    .field-name {
      font-weight: 600;
    }

    .filters-panel {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .filter-group label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .kpi-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .kpi-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1.5rem;
      text-align: center;
    }

    .kpi-card h3 {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
    }

    .kpi-value {
      font-size: 2rem;
      font-weight: 700;
      color: #111827;
      margin-bottom: 0.25rem;
    }

    .kpi-change {
      font-size: 0.875rem;
      color: #ef4444;
    }

    .kpi-change.positive {
      color: #22c55e;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1rem;
    }

    .chart-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }

    .chart-card.span-2 {
      grid-column: span 2;
    }

    @media (max-width: 768px) {
      .charts-grid {
        grid-template-columns: 1fr;
      }
      
      .chart-card.span-2 {
        grid-column: span 1;
      }
    }
  \`]
})
export class SalesDashboardComponent implements OnInit, OnDestroy {
  connectionState = { isConnected: false, isAuthenticated: false };
  selectionState: GlobalSelectionState = { selections: {}, hasSelections: false, selectionCount: 0 };

  // KPI values
  totalSales = 0;
  totalOrders = 0;
  avgOrderValue = 0;
  salesGrowth = 0;

  // Chart definitions
  salesByProductDef: HyperCubeDefinition = {
    dimensions: [
      { fieldDefs: ['Product'], fieldLabels: ['Product'] }
    ],
    measures: [
      { def: 'Sum(Sales)', label: 'Total Sales' },
      { def: 'Count(OrderID)', label: 'Orders' }
    ],
    initialDataFetch: [{ left: 0, top: 0, width: 3, height: 20 }]
  };

  salesTrendDef: HyperCubeDefinition = {
    dimensions: [
      { fieldDefs: ['=Date(MonthStart(OrderDate), \\'MMM YYYY\\')'], fieldLabels: ['Month'] }
    ],
    measures: [
      { def: 'Sum(Sales)', label: 'Monthly Sales' }
    ],
    initialDataFetch: [{ left: 0, top: 0, width: 2, height: 12 }]
  };

  regionalPerformanceDef: HyperCubeDefinition = {
    dimensions: [
      { fieldDefs: ['Region'], fieldLabels: ['Region'] }
    ],
    measures: [
      { def: 'Sum(Sales)', label: 'Sales' },
      { def: 'Sum(Profit)', label: 'Profit' },
      { def: 'Sum(Profit)/Sum(Sales)', label: 'Profit Margin' }
    ],
    initialDataFetch: [{ left: 0, top: 0, width: 4, height: 10 }]
  };

  topCustomersDef: HyperCubeDefinition = {
    dimensions: [
      { fieldDefs: ['Customer'], fieldLabels: ['Customer Name'] }
    ],
    measures: [
      { def: 'Sum(Sales)', label: 'Total Sales', sortBy: { qSortByNumeric: -1 } },
      { def: 'Count(OrderID)', label: 'Order Count' }
    ],
    initialDataFetch: [{ left: 0, top: 0, width: 3, height: 15 }]
  };

  private destroy$ = new Subject<void>();

  constructor(
    private qlikCore: QlikCoreService,
    private qlikData: QlikDataService,
    private qlikSelection: QlikSelectionService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      // Initialize Qlik connection
      const config: QlikConfig = {
        host: 'your-tenant.us.qlikcloud.com',
        webIntegrationId: 'your-web-integration-id'
      };

      await this.qlikCore.initialize(config);
      await this.qlikCore.openApp('your-sales-app-id');

      // Subscribe to connection state
      this.qlikCore.getConnectionState()
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
          this.connectionState = state;
        });

      // Subscribe to selection changes
      this.qlikSelection.getSelectionState()
        .pipe(takeUntil(this.destroy$))
        .subscribe(state => {
          this.selectionState = state;
        });

      // Load KPI data
      this.loadKPIData();

    } catch (error) {
      console.error('Dashboard initialization failed:', error);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadKPIData(): Promise<void> {
    try {
      // Create KPI hypercube
      const kpiDef: HyperCubeDefinition = {
        dimensions: [],
        measures: [
          { def: 'Sum(Sales)', label: 'Total Sales' },
          { def: 'Count(OrderID)', label: 'Total Orders' },
          { def: 'Sum(Sales)/Count(OrderID)', label: 'Avg Order Value' },
          { def: '(Sum({<Year={$(=Year(Today()))}>} Sales) - Sum({<Year={$(=Year(Today())-1)}>} Sales)) / Sum({<Year={$(=Year(Today())-1)}>} Sales) * 100', label: 'Sales Growth %' }
        ],
        initialDataFetch: [{ left: 0, top: 0, width: 4, height: 1 }]
      };

      this.qlikData.createHyperCube('kpi-data', kpiDef)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          if (data.data.length > 0) {
            const row = data.data[0];
            this.totalSales = row[0].number || 0;
            this.totalOrders = row[1].number || 0;
            this.avgOrderValue = row[2].number || 0;
            this.salesGrowth = row[3].number || 0;
          }
        });

    } catch (error) {
      console.error('Failed to load KPI data:', error);
    }
  }

  onFieldSelection(fieldName: string, values: string[]): void {
    if (values.length > 0) {
      this.qlikSelection.selectInField(fieldName, values);
    }
  }

  onDateRangeChange(range: { start: string; end: string }): void {
    // Implement date range selection logic
    console.log('Date range changed:', range);
  }

  clearAllSelections(): void {
    this.qlikSelection.clearAll();
  }

  clearFieldSelection(fieldName: string): void {
    this.qlikSelection.clearField(fieldName);
  }

  getActiveSelections(): any[] {
    return Object.values(this.selectionState.selections);
  }
}`}
            </CodeBlock>
          </CardContent>
        </Card>
      </div>

      {/* Best Practices */}
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
        <CardHeader>
          <CardTitle className="text-blue-800 dark:text-blue-200">⚡ Angular + Qlik Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
          <div><strong>Dependency Injection:</strong> Use Angular's DI system for clean service architecture</div>
          <div><strong>Reactive Patterns:</strong> Leverage RxJS observables for real-time data updates</div>
          <div><strong>Change Detection:</strong> Use OnPush strategy for performance optimization</div>
          <div><strong>Memory Management:</strong> Always unsubscribe using takeUntil pattern</div>
          <div><strong>Error Handling:</strong> Implement comprehensive error boundaries</div>
          <div><strong>Type Safety:</strong> Use TypeScript interfaces for all Qlik data structures</div>
          <div><strong>Testing:</strong> Mock Qlik services for unit and integration testing</div>
          <div><strong>Performance:</strong> Implement lazy loading and virtual scrolling for large datasets</div>
        </CardContent>
      </Card>
    </div>
  )
}