import './index.css';
import './styles.scss';

import { DevTools } from 'jotai-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

const element = document.getElementById('root');
element &&
  ReactDOM.createRoot(element).render(
    <React.StrictMode>
      <App />
      <DevTools position={'top-right'} />
    </React.StrictMode>
  );
