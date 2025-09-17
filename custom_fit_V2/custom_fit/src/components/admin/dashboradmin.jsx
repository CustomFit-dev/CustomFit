import React, { useState } from 'react';
import '../../scss/dashboard.scss';
import {
  User, Edit, UserSearch, ShoppingCart, BarChart3,
  Shield, Package, NotepadTextDashed, CreditCard, LogOut, Menu, 
  ChevronDown, ChevronUp, Layers, Palette, Shirt, Ruler, Scissors
} from 'lucide-react';

// Import component modules
import PersonalData from '../Crud';
import PurchaseHistory from './estadisticas';
import MyOrders from '../modules/dashboard/mis-pedidos';
import Contact from '../modules/dashboard/contacto';
import Shop from '../modules/dashboard/mis-pedidos';
import Productos from './crudProductos';
import CrudProveedores from '../admin/CrudProveedores';

// IMPORT CRUD de gestión
import TelasCrud from './CrudTela';
import ColoresCrud from './CrudColores';
import EstampadosCrud from './CrudEstampado';
import TallasCrud from './CrudTalla';

const App = () => {
  const [activeMenu, setActiveMenu] = useState('Estadisticas');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const menuItems = [
    { id: 'purchase-history', name: 'Estadisticas', icon: <BarChart3 size={20} />, component: <PurchaseHistory /> },
    { id: 'personal-data', name: 'Usuarios', icon: <UserSearch size={20} />, component: <PersonalData /> },
    { id: 'productos-data', name: 'Productos', icon: <Package size={20} />, component: <Productos /> },
    { id: 'my-orders', name: 'Pedidos', icon: <ShoppingCart size={20} />, component: <MyOrders /> },
    { id: 'contact', name: 'Facturas', icon: <NotepadTextDashed size={20} />, component: <Contact /> },
    { id: 'shop', name: 'Productos Shop', icon: <ShoppingCart size={20} />, component: <Shop /> },
    { id: 'proveedores-data', name: 'Proveedores', icon: <User size={20} />, component: <CrudProveedores /> },
  ];

  // Gestión subitems con iconos específicos
  const gestionItems = [
    { id: 'telas', name: 'Telas', icon: <Scissors size={16} />, component: <TelasCrud /> },
    { id: 'colores', name: 'Colores', icon: <Palette size={16} />, component: <ColoresCrud /> },
    { id: 'estampados', name: 'Estampados', icon: <Shirt size={16} />, component: <EstampadosCrud /> },
    { id: 'tallas', name: 'Tallas', icon: <Ruler size={16} />, component: <TallasCrud /> },
  ];

  const activeComponent =
    menuItems.find(item => item.name === activeMenu)?.component ||
    gestionItems.find(item => item.name === activeMenu)?.component;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuClick = (itemName) => {
    setActiveMenu(itemName);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
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
              onClick={() => handleMenuClick(item.name)}
            >
              <div className="menu-icon">{item.icon}</div>
              <div className="menu-text">{item.name}</div>
            </div>
          ))}

          {/* Gestión Dropdown Mejorado */}
          <div className="gestion-dropdown">
            <div
              className={`menu-item gestion-header ${openDropdown ? 'open' : ''}`}
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <div className="menu-icon">
                <Layers size={20} />
              </div>
              <div className="menu-text">Gestión</div>
              <div className={`chevron ${openDropdown ? 'rotated' : ''}`}>
                <ChevronDown size={16} />
              </div>
            </div>

            <div className={`submenu ${openDropdown ? 'open' : ''}`}>
              {gestionItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`submenu-item ${activeMenu === item.name ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item.name)}
                  style={{ transitionDelay: openDropdown ? `${index * 0.05}s` : '0s' }}
                >
                  <div className="submenu-icon">{item.icon}</div>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <h2>Panel de Administración</h2>
          <div className="user-avatar">
            <User size={24} />
          </div>
        </div>
        <div className="content-area">
          <div className="content-module">
            {activeComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;