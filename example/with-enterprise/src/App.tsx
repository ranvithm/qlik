import { FC, useEffect, useState } from "react";
import useQlik from "./hooks/useQlik";
import "./App.css";
import type { IApp } from "../../../lib/types";

interface QlikAppData {
  id: string;
  app: IApp;
  sheet: SheetObject[];
  measure: any[];
  fields: any[];
  variable: any[];
  bookmark: any[];
}

interface SheetObject {
  name: string;
  id: string;
  obj: CellObject[];
}

interface CellObject {
  name: string;
  id: string;
  title: string;
  options: {
    title: string | null;
    subtitle: string | null;
    footnote: string | null;
  };
}

interface QlikProps {
  app: QlikAppData;
}

interface Visualization {
  show: (elementId: string, options?: VisualizationOptions) => Promise<void>;
  close: () => void;
  exportData: (options?: ExportOptions) => Promise<string>;
}

interface VisualizationOptions {
  noInteraction?: boolean;
  noSelections?: boolean;
  onError?: (error: Error) => void;
}

interface ExportOptions {
  format?: 'OOXML' | 'CSV_C' | 'CSV_T';
  filename?: string;
  download?: boolean;
}

const Qlik: FC<QlikProps> = (props) => {
  const { app, sheet } = props.app;
  const [object, setObject] = useState<CellObject>();
  const [viz, setViz] = useState<Visualization>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (app && sheet) {
      const firstObj = sheet?.[0]?.obj?.[0];
      if (firstObj) {
        setObject(firstObj);
      } else {
        setError("No visualization objects found in the sheet");
      }
    }
  }, [app, sheet]);

  useEffect(() => {
    let mounted = true;
    
    async function createVisualization() {
      if (object && app.visualization?.get) {
        try {
          const visualization = await app.visualization.get(object.id);
          if (mounted) {
            setViz(visualization);
            await visualization.show("myObject", {
              noInteraction: false,
              noSelections: false,
              onError: (error: Error) => {
                console.error("Visualization error:", error);
                setError("Failed to render visualization");
              }
            });
          }
        } catch (err) {
          if (mounted) {
            console.error("Failed to create visualization:", err);
            setError("Failed to create visualization");
          }
        }
      }
    }

    createVisualization();

    return () => {
      mounted = false;
      // Cleanup visualization on unmount
      if (viz) {
        viz.close();
      }
    };
  }, [object, app]);

  const downloadExcel = async () => {
    if (!viz || !object) return;
    
    try {
      const link = await viz.exportData({
        format: 'OOXML',
        filename: `${object.title || 'export'}.xlsx`,
        download: true
      });
      
      const a = document.createElement("a");
      a.href = link;
      a.download = `${object.title || 'export'}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Export failed:", err);
      setError("Failed to export data");
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="visualization">
      {!object ? (
        <div className="loading">Visualization is loading...</div>
      ) : (
        <>
          <div className="header">
            <div className="title">{object.title}</div>
            <div className="actions">
              <button 
                onClick={downloadExcel}
                disabled={!viz}
                className="export-button"
              >
                Export to Excel
              </button>
            </div>
          </div>
          <div id="myObject" className="qv-object"></div>
        </>
      )}
    </div>
  );
};

function App() {
  const [app, setApp] = useState<QlikAppData>();
  const [type, setType] = useState<string>("Loading...");
  const qlik = useQlik();

  useEffect(() => {
    let mounted = true;

    async function loadApp() {
      if (!qlik || !import.meta.env.VITE_QLIK_APP_ID) return;

      try {
        setType("App is opening...");
        await qlik.getApp(import.meta.env.VITE_QLIK_APP_ID);
        if (mounted) {
          setApp(qlik.currApps[0]);
        }
      } catch (error) {
        console.error("Failed to load app:", error);
        setType("Failed to load app");
      }
    }

    loadApp();

    return () => {
      mounted = false;
      // Clean up app on unmount
      if (app?.app?.close) {
        app.app.close();
      }
    };
  }, [qlik]);

  return (
    <div className="wrapper">
      {app ? (
        <Qlik app={app} />
      ) : (
        <div className="loading-text">
          <h1>{type}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
