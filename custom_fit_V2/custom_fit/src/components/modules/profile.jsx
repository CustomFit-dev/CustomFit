import React, { useState } from 'react';
import '../../scss/dashboard.scss';
import { User, Edit, UserCheck, Trash2, ShoppingBag, Shield, Package, MessageCircle, CreditCard, LogOut } from 'lucide-react';

// Importar los componentes de cada módulo
import EditProfile from './dashboard/control-actividad';
import PersonalData from './dashboard/datos-personales';
import DeleteAccount from './dashboard/historial-compras';
import PurchaseHistory from './dashboard/historial-compras';
import Security from './dashboard/seguridad';
import MyOrders from './dashboard/mis-pedidos';
import Contact from './dashboard/historial-compras';
import Payments from './dashboard/historial-compras';
import Logout from './dashboard/seguridad';

const App = () => {
  const [activeMenu, setActiveMenu] = useState('Editar perfil');
  
  const menuItems = [
    { id: 'edit-profile', name: 'Editar perfil', icon: <Edit size={20} />, component: <EditProfile /> },
    { id: 'personal-data', name: 'Datos Personales', icon: <UserCheck size={20} />, component: <PersonalData /> },
    { id: 'delete-account', name: 'Eliminar cuenta', icon: <Trash2 size={20} />, component: <DeleteAccount /> },
    { id: 'purchase-history', name: 'Historial de compras', icon: <ShoppingBag size={20} />, component: <PurchaseHistory /> },
    { id: 'security', name: 'Seguridad', icon: <Shield size={20} />, component: <Security /> },
    { id: 'my-orders', name: 'Mis pedidos', icon: <Package size={20} />, component: <MyOrders /> },
    { id: 'contact', name: 'Contacto', icon: <MessageCircle size={20} />, component: <Contact /> },
    { id: 'payments', name: 'Pagos', icon: <CreditCard size={20} />, component: <Payments /> },
    { id: 'logout', name: 'Salir', icon: <LogOut size={20} />, component: <Logout /> }
  ];
  
  // Encontrar el componente activo basado en el menú seleccionado
  const activeComponent = menuItems.find(item => item.name === activeMenu)?.component;

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="logo-container">
          <h1 className="logo">Custom<span>Fit</span></h1>
        </div>
        <div className="menu-container">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.name)}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-text">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <h2>Panel de Usuario</h2>
          <div className="user-avatar">
            <User size={24} />
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