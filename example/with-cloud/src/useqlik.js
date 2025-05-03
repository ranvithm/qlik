import qlik from "qlik";
import { useEffect, useState } from "react";

const useQlik = () => {
  const [state, setState] = useState({
    instance: null,
    error: null,
    isInitializing: true
  });

  useEffect(() => {
    let mounted = true;

    async function initializeQlik() {
      const {
        VITE_QLIK_HOST,
        VITE_QLIK_PORT,
        VITE_QLIK_PREFIX,
        VITE_QLIK_SECURE,
        VITE_QLIK_WEB_INTEGRATION_ID,
      } = import.meta.env;

      try {
        const config = {
          host: VITE_QLIK_HOST,
          port: VITE_QLIK_PORT,
          prefix: VITE_QLIK_PREFIX,
          isSecure: VITE_QLIK_SECURE === "true",
          webIntegrationId: VITE_QLIK_WEB_INTEGRATION_ID,
        };

        const qlikInstance = new qlik(config);

        // Initialize Qlik engine connection
        await qlikInstance.callRequire();
        
        // Set up Qlik environment
        const qlikApi = await qlikInstance.setQlik();
        
        // Configure global error handler
        qlikApi.setOnError((error) => {
          console.error("Qlik engine error:", error);
          if (mounted) {
            setState(prev => ({ ...prev, error }));
          }
        });

        // Set up authentication
        await qlikInstance.authenticateToQlik();
        await qlikInstance.setAuthUser();

        if (mounted) {
          setState({
            instance: qlikInstance,
            error: null,
            isInitializing: false
          });
        }
      } catch (error) {
        console.error("Failed to initialize Qlik:", error);
        if (mounted) {
          setState({
            instance: null,
            error: error instanceof Error ? error : new Error(String(error)),
            isInitializing: false
          });
        }
      }
    }

    initializeQlik();

    return () => {
      mounted = false;
      // Clean up Qlik instance if needed
      if (state.instance) {
        // Close any open apps
        state.instance.currApps.forEach(app => {
          if (app?.app?.close) {
            app.app.close();
          }
        });
      }
    };
  }, []);

  // Return null if we have an error or still initializing
  if (state.error || state.isInitializing) {
    return null;
  }

  return state.instance;
};

export default useQlik;
