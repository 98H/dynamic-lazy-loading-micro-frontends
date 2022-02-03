import axios from 'axios';
import React, { useEffect } from 'react';
import fetchMainAppApi from './simulated-apis/main-app-api';

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);
    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

const urlCache = new Set();
const useDynamicScript = (url) => {
  const [ready, setReady] = React.useState(false);
  const [errorLoading, setErrorLoading] = React.useState(false);

  React.useEffect(() => {
    if (!url) return;

    if (urlCache.has(url)) {
      setReady(true);
      setErrorLoading(false);
      return;
    }

    setReady(false);
    setErrorLoading(false);

    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = () => {
      urlCache.add(url);
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setErrorLoading(true);
    };

    document.head.appendChild(element);

    return () => {
      urlCache.delete(url);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    errorLoading,
    ready,
  };
};

const componentCache = new Map();
export const useFederatedComponent = () => {
  const key = `${remoteUrl}-${scope}-${module}`;
  const [Component, setComponent] = React.useState(null);

  const { ready, errorLoading } = useDynamicScript(remoteUrl);
  React.useEffect(() => {
    if (Component) setComponent(null);
    // Only recalculate when key changes
  }, [key]);

  React.useEffect(() => {
    if (ready && !Component) {
      const Comp = React.lazy(loadComponent(scope, module));
      componentCache.set(key, Comp);
      setComponent(Comp);
    }
    // key includes all dependencies (scope/module)
  }, [Component, ready, key]);

  return { errorLoading, Component };
};

function MainApp() {
  const [system, setSystem] = React.useState([]);

  function setApps() {
    fetchMainAppApi()
      .then((response) => response.json())
      .then((data) => {
        data.remotes.forEach((element) => {
          setSystem([...system, element]);
        });
      });
  }

  // function setApp1() {
  //   fetchMainAppApi()
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.remotes[0]);
  //       setSystem(data.remotes[0]);
  //     });
  // }

  // function setApp2() {
  //   setSystem({
  //     url: 'http://localhost:3002/remoteEntry.js',
  //     scope: 'App2',
  //     module: './RemoteApp',
  //   });
  // }
  const Components = [];
  system.forEach((element) => {
    const { url, scope, module } = element;
    const Component = useFederatedComponent(url, scope, module);
    Components.add(Component);
    console.log(Component);
  });
  // const { Component: FederatedComponent, errorLoading } = useFederatedComponent(url, scope, module);
  setApps();
    return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>Main App</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will no load components that have been loaded already.
      </p>
      {/* <button onClick={setApp1}>Load App 1 Widget</button>
      <button onClick={setApp2}>Load App 2 Widget</button> */}
      <div style={{ marginTop: '2em' }}>
        <React.Suspense fallback="Loading...">
          {Components.map((item) =>
            item.errorLoading
              ? `Error loading module`
              : item.FederatedComponent && <item.FederatedComponent />
          )}
        </React.Suspense>
      </div>
    </div>
  );
}

export default MainApp;
