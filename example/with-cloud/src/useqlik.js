import qlik from "qlik";
import { useEffect, useState } from "react";

const useQlik = () => {
  const [q, setQlik] = useState(null);
  const {
    VITE_QLIK_HOST,
    VITE_QLIK_PORT,
    VITE_QLIK_PREFIX,
    VITE_QLIK_SECURE,
    VITE_QLIK_WEB_INTEGRATION_ID,
  } = import.meta.env;

  useEffect(() => {
    const _qlik = new qlik({
      host: VITE_QLIK_HOST,
      port: VITE_QLIK_PORT,
      prefix: VITE_QLIK_PREFIX,
      isSecure: VITE_QLIK_SECURE === "true",
      webIntegrationId: VITE_QLIK_WEB_INTEGRATION_ID,
    });

    _qlik
      .callRequire()
      .then(async () => {
        await _qlik.setQlik();
        setQlik(_qlik);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return q;
};

export default useQlik;
