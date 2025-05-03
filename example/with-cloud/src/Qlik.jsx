import React, { useEffect, useState } from "react";

const Qlik = ({ app }) => {
  const { app: qlikApp, sheet } = app;
  const [state, setState] = useState({
    object: null,
    viz: null,
    error: null,
    isExporting: false
  });

  useEffect(() => {
    if (qlikApp && sheet) {
      const firstObj = sheet?.[0]?.obj?.[0];
      if (firstObj) {
        setState(prev => ({ ...prev, object: firstObj }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: "No visualization objects found in the sheet" 
        }));
      }
    }
  }, [qlikApp, sheet]);

  useEffect(() => {
    let mounted = true;

    async function createVisualization() {
      if (!state.object) return;

      try {
        const visualization = await qlikApp.visualization.get(state.object.id);
        if (!mounted) return;

        setState(prev => ({ ...prev, viz: visualization }));
        
        await visualization.show("myObject", {
          noInteraction: false,
          noSelections: false,
          onError: (error) => {
            console.error("Visualization error:", error);
            if (mounted) {
              setState(prev => ({ 
                ...prev, 
                error: "Failed to render visualization" 
              }));
            }
          }
        });
      } catch (err) {
        console.error("Failed to create visualization:", err);
        if (mounted) {
          setState(prev => ({ 
            ...prev, 
            error: "Failed to create visualization" 
          }));
        }
      }
    }

    createVisualization();

    return () => {
      mounted = false;
      // Clean up visualization
      if (state.viz) {
        state.viz.close();
      }
    };
  }, [state.object, qlikApp]);

  const downloadExcel = async () => {
    if (!state.viz || state.isExporting) return;

    setState(prev => ({ ...prev, isExporting: true }));
    
    try {
      const link = await state.viz.exportData({
        format: 'OOXML',
        filename: `${state.object?.title || 'export'}.xlsx`,
        download: true
      });

      const a = document.createElement("a");
      a.href = link;
      a.download = `${state.object?.title || 'export'}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Export failed:", err);
      setState(prev => ({ 
        ...prev, 
        error: "Failed to export data" 
      }));
    } finally {
      setState(prev => ({ ...prev, isExporting: false }));
    }
  };

  if (state.error) {
    return (
      <div className="visualization error">
        <div className="error-message">
          <h3>Error</h3>
          <p>{state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="visualization">
      {!state.object ? (
        <div className="loading">Loading visualization...</div>
      ) : (
        <>
          <div className="header">
            <div className="title">{state.object.title}</div>
            <div className="actions">
              <button
                onClick={downloadExcel}
                disabled={!state.viz || state.isExporting}
                className="export-button"
              >
                {state.isExporting ? "Exporting..." : "Export to Excel"}
              </button>
            </div>
          </div>
          <div id="myObject" className="qv-object"></div>
        </>
      )}
    </div>
  );
};

export default Qlik;