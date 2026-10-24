import React from 'react';
import { createRoot } from 'react-dom/client';
import LandingPage from './pages/LandingPage.jsx';
import './styles/global.css';
import './styles/landing.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
);
