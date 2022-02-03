import React, { useEffect, useState } from 'react';
import MicroApp from './MicroApp';
import fetchMainAppApi from './simulated-apis/main-app-api';

function App() {
  const [microApps, setMicroApps] = useState([]);
  useEffect(() => {
    fetchMainAppApi()
      .then((response) => response.json())
      .then((data) => {
        setMicroApps(data.remotes);
      });
  }, []);

  return (
    <React.Suspense fallback="Loading System">
      {microApps.map((item) => {
        return <MicroApp module={item.module} scope={item.scope} url={item.url} />;
      })}
    </React.Suspense>
  );
}

export default App;
