import React, { useEffect, useState } from "react";

const Qlik = ({ app }) => {
  const { app: qlikApp, sheet } = app;
  const [object, setObject] = useState(null);
  const [viz, setViz] = useState(null);

  useEffect(() => {
    if (qlikApp && sheet) {
      setObject(sheet[0]?.obj[0]);
    }
  }, [qlikApp, sheet]);

  useEffect(() => {
    if (object) {
      qlikApp.visualization.get(object.id).then((visualization) => {
        setViz(visualization);
        visualization.show("myObject");
      });
    }
  }, [object, qlikApp]);

  const downloadExcel = () => {
    viz.exportData().then((link) => {
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
        <div>Visualization is loading...</div>
      ) : (
        <>
          <div className="header">
            <div>{object.title}</div>
            <div className="icons">
              <button onClick={downloadExcel}>Download CSV</button>
            </div>
          </div>
          <div id="myObject" className="qv-object"></div>
        </>
      )}
    </div>
  );
};

export default Qlik;