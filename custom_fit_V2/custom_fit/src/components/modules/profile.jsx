import React, { useState } from 'react';
import '../../scss/dashboard.scss';
import {
  UserCheck,
  ShoppingBag,
  Package,
  LogOut,
  Home,
  Menu
} from 'lucide-react';

import PersonalData from './dashboard/datos-personales';
import PurchaseHistory from './dashboard/historial-compras';
import MyOrders from './dashboard/mis-pedidos';

import { useAuth } from './authcontext';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('Datos Personales');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    { id: 'personal-data', name: 'Datos Personales', icon: <UserCheck size={20} />, component: <PersonalData /> },
    { id: 'purchase-history', name: 'Historial de compras', icon: <ShoppingBag size={20} />, component: <PurchaseHistory /> },
    { id: 'my-orders', name: 'Mis pedidos', icon: <Package size={20} />, component: <MyOrders /> },
  ];

  const activeComponent = menuItems.find(item => item.name === activeMenu)?.component;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // 🔹 Función para cerrar sesión
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // 🔹 Función para ir al home
  const handleGoHome = () => {
    navigate('/home_l');
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="logo-container">
          <h1 className="logo">Custom<span>Fit</span></h1>
        </div>

        <div className="menu-container">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveMenu(item.name);
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-text">{item.name}</div>
            </div>
          ))}

          {/* 🔹 Línea separadora arriba de los botones inferiores */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              marginTop: 'auto',
              paddingTop: '15px'
            }}
          />

          {/* 🔹 Botón Salir al Home */}
          <div
            className="menu-item logout-item"
            onClick={handleGoHome}
          >
            <div className="menu-icon">
              <Home size={20} />
            </div>
            <div className="menu-text">Home</div>
          </div>

          {/* 🔹 Botón Cerrar Sesión */}
          <div
            className="menu-item logout-item"
            onClick={handleLogout}
          >
            <div className="menu-icon">
              <LogOut size={20} />
            </div>
            <div className="menu-text">Cerrar Sesión</div>
          </div>

        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h2>Panel de Usuario</h2>
          <div className="user-info">
            <span className="user-name">
              {user?.nombres && user?.apellidos
                ? `${user.nombres} ${user.apellidos}`
                : 'Usuario'}
            </span>
          </div>
        </div>

        <div className="content-area">
          <h3>{activeMenu}</h3>
          <div className="content-module">{activeComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
