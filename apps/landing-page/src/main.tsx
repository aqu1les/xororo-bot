/* eslint-disable @typescript-eslint/no-non-null-assertion */
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './app/App';
import { ToastProvider } from './app/core/toast.context';
import { setupThemeContext } from './app/core/theme.context';

const rootElement = document.getElementById('root')!;
const { ThemeProvider } = setupThemeContext(window, document.documentElement);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>
);
