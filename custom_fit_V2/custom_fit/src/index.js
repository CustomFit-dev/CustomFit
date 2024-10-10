import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/style.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './components/modules/authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
  <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>,
  </React.StrictMode>
  </Router>
);

document.getElementById('root');
