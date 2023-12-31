import { FC, useEffect, useState } from "react";
import useQlik from "./hooks/useQlik";
import "./App.css";

const Qlik: FC<{ app: any }> = (props) => {
  const { app, sheet } = props.app;
  const [object, setObject] = useState<any>();
  const [viz, setViz] = useState<any>();

  useEffect(() => {
    if (app && sheet) setObject(sheet?.[0]?.obj?.[0]);
  }, [app, sheet]);

  useEffect(() => {
    if (object) {
      app.visualization.get(object.id).then((viz: any) => {
        setViz(viz);
        viz.show("myObject");
      });
    }
  }, [object]);

  const downloadExcel = () => {
    viz.exportData().then((link: any) => {
      console.log(link);

      const a = document.createElement("a");
      a.href = link;
      a.setAttribute("download", `${object.title}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  return (
    <div className="visualization">
      {!object ? (
        <div className="">Visualization is loading</div>
      ) : (
        <>
          <div className="header">
            <div className="">{object.title}</div>
            <div className="icons">
              <span
                onClick={downloadExcel}
                className="lui-icon lui-icon--download"
              ></span>
            </div>
          </div>
          <div id="myObject" className="qv-object"></div>
        </>
      )}
    </div>
  );
};

function App() {
  const [app, setApp] = useState<any>();
  const [type, setType] = useState<string>("Loading...");
  const qlik = useQlik();

  useEffect(() => {
    (async () => {
      if (qlik && import.meta.env.VITE_QLIK_APP_ID) {
        setType("App is opening...");
        await qlik.getApp(import.meta.env.VITE_QLIK_APP_ID);
        setApp(qlik.currApps[0]);
      }
    })();
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
