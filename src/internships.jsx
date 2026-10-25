import React from 'react';
import { createRoot } from 'react-dom/client';
import InternshipsPage from './pages/InternshipsPage.jsx';
import './styles/global.css';
import './styles/application.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InternshipsPage />
  </React.StrictMode>,
);
