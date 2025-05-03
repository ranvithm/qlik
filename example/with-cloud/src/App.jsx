import React, { useEffect, useState } from "react";
import useQlik from "./useqlik";
import Qlik from "./Qlik";
import "./App.css";

function App() {
  const [state, setState] = useState({
    app: null,
    status: "Loading...",
    error: null
  });
  
  const qlik = useQlik();

  useEffect(() => {
    let mounted = true;
    
    async function loadApp() {
      if (!qlik || !import.meta.env.VITE_QLIK_APP_ID) return;
      
      try {
        setState(prev => ({ ...prev, status: "Opening app..." }));
        
        await qlik.getApp(import.meta.env.VITE_QLIK_APP_ID);
        const loadedApp = qlik.currApps[0];
        
        if (mounted) {
          setState({
            app: loadedApp,
            status: "",
            error: null
          });
        }
      } catch (error) {
        console.error("Failed to load app:", error);
        if (mounted) {
          setState({
            app: null,
            status: "",
            error: "Failed to load the Qlik app. Please try again later."
          });
        }
      }
    }

    loadApp();

    return () => {
      mounted = false;
      // Clean up app on unmount
      if (state.app?.app?.close) {
        state.app.app.close();
      }
    };
  }, [qlik]);

  if (state.error) {
    return (
      <div className="wrapper">
        <div className="error-container">
          <h1>Error</h1>
          <p>{state.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      {state.app ? (
        <Qlik app={state.app} />
      ) : (
        <div className="loading-text">
          <h1>{state.status}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
