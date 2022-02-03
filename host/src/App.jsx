import React, { useEffect, useState } from 'react';
import MicroApp from './MicroApp';
import fetchMainAppApi from './simulated-api/main-app-api';

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
    <div>
      <React.Suspense fallback={`Loading `}>
        {microApps.map((item) => (
          <MicroApp key={item.url} module={item.module} scope={item.scope} url={item.url} />
        ))}
      </React.Suspense>
    </div>
  );
}

export default App;
