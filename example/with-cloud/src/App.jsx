import React, { useEffect, useState } from "react";
import useQlik from "./useqlik";
import Qlik from "./Qlik";
import "./App.css" 

function App() {
  const [app, setApp] = useState(null);
  const [status, setStatus] = useState("Loading...");
  const qlik = useQlik();

  useEffect(() => {
    const openApp = async () => {
      if (qlik && import.meta.env.VITE_QLIK_APP_ID) {
        setStatus("Opening app...");
        await qlik.getApp(import.meta.env.VITE_QLIK_APP_ID);
        setApp(qlik.currApps[0]);
      }
    };
    openApp();
  }, [qlik]);

  return (
    <div className="wrapper">
      {app ? (
        <Qlik app={app} />
      ) : (
        <div className="loading-text">
          <h1>{status}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
