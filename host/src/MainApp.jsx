import React, { useEffect, useState } from 'react';
import MicroApp from './MicroApp';
import fetchMainAppApi from './simulated-api/main-app-api';

function MainApp() {
  const [microApps, setMicroApps] = useState([]);
  useEffect(() => {
    fetchMainAppApi()
      .then((response) => response.json())
      .then((data) => {
        setMicroApps(data.remotes);
      });
  }, []);

  return (
    <>
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }}
      >
        <h2>Host</h2>
        <h1>Micro Apps Load Lazily And Dynamically</h1>
        <p>
          The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
          <strong>exposes</strong>.Also it will no load components that have been loaded already.
        </p>
      </div>
      <h1>
        Loading indicator will show for a moment by{' '}
        <strong style={{ color: 'red' }}>red color</strong> before micro Apps load.
      </h1>
      <div style={{ marginTop: '2em', color: 'Red', fontSize: '60px' }}>
        <React.Suspense fallback="Loading...">
          <div style={{ fontSize: '30px', color: 'blueviolet' }}>
            {microApps.map((item) => (
              <MicroApp key={item.url} module={item.module} scope={item.scope} url={item.url} />
            ))}
          </div>
        </React.Suspense>
      </div>
    </>
  );
}

export default MainApp;
