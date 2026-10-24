import React from 'react';
import { createRoot } from 'react-dom/client';
import ApplicationPage from './pages/ApplicationPage.jsx';
import './styles/global.css';
import './styles/application.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApplicationPage />
  </React.StrictMode>,
);
