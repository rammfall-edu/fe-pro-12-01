import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import './index.css';
import Application from './Application';
import { StorageProvider } from './providers/Storage';
import { theme } from './theme';
import { ColorModeProvider } from './providers/ColorMode';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <BrowserRouter>
        <StorageProvider>
          <Application />
        </StorageProvider>
      </BrowserRouter>
    </ColorModeProvider>
  </React.StrictMode>
);
