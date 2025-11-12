import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/style.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/modules/authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
