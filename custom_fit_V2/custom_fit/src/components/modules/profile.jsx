import React, { useState } from 'react';
import '../../scss/dashboard.scss';
import {
  UserCheck,
  ShoppingBag,
  Package,
  MessageCircle,
  CreditCard,
  LogOut,
  Menu
} from 'lucide-react';

import PersonalData from './dashboard/datos-personales';
import PurchaseHistory from './dashboard/historial-compras';
import MyOrders from './dashboard/mis-pedidos';
import Contact from './dashboard/contacto';
import Payments from './dashboard/pagos';
import Logout from './dashboard/seguridad';

import { useAuth } from './authcontext'; // AJUSTA RUTA SI ES NECESARIO

const App = () => {
  const { user } = useAuth(); // <-- usuario autenticado
  const [activeMenu, setActiveMenu] = useState('Datos Personales');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'personal-data', name: 'Datos Personales', icon: <UserCheck size={20} />, component: <PersonalData /> },
    { id: 'purchase-history', name: 'Historial de compras', icon: <ShoppingBag size={20} />, component: <PurchaseHistory /> },
    { id: 'my-orders', name: 'Mis pedidos', icon: <Package size={20} />, component: <MyOrders /> },
    { id: 'contact', name: 'Contacto', icon: <MessageCircle size={20} />, component: <Contact /> },
    { id: 'payments', name: 'Pagos', icon: <CreditCard size={20} />, component: <Payments /> },
    { id: 'logout', name: 'Salir', icon: <LogOut size={20} />, component: <Logout /> }
  ];

  const activeComponent = menuItems.find(item => item.name === activeMenu)?.component;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
                if (window.innerWidth < 768) {
                  setSidebarOpen(false);
                }
              }}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-text">{item.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h2>Panel de Usuario</h2>
          <div className="user-info">
            <span className="user-name">{user?.nombres && user?.apellidos ? `${user.nombres} ${user.apellidos}` : 'Usuario'}
</span>
          </div>
        </div>

        <div className="content-area">
          <h3>{activeMenu}</h3>
          <div className="content-module">
            {activeComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
