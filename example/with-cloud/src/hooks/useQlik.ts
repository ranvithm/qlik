import { useEffect, useState } from "react";
import qlik from "../../../../lib";

const useQlik = () => {
  const [q, setQlik] = useState<any>();
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
      isSecure: VITE_QLIK_SECURE == "true",
      webIntegrationId: VITE_QLIK_WEB_INTEGRATION_ID,
    });
    _qlik
      .callRequire()
      .then(async (q) => {
        await _qlik.setQlik();
        await _qlik.authenticateToQlik();
        await _qlik.setAuthUser();
        const spaces = await _qlik.getSpaceList();
        console.log(spaces);

        setQlik(_qlik);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return q;
};

export default useQlik;
