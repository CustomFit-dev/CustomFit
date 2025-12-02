import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/style.scss';
import { HashRouter } from 'react-router-dom'; // Cambiado BrowserRouter por HashRouter
import { AuthProvider } from './components/modules/authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
