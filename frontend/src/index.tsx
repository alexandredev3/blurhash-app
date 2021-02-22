import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContext } from './hooks';

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>,
  document.getElementById('root')
);