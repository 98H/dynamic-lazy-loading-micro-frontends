import React, { useState } from 'react';
import fetchApp1Api from './simulated-apis/app1-api';

function App1() {
  const [text, setText] = useState(null);

  useState(() => {
    fetchApp1Api()
      .then((response) => response.json())
      .then((t) => {
        setText(t);
      });
  }, text);

  return <div>{text}</div>;
}

export default App1;
