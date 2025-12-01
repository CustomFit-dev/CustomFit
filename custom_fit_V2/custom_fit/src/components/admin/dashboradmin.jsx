import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../scss/dashboard.scss';
import {
  LogOut, UserSearch, ShoppingCart, BarChart3,
  Package, Menu, ChevronDown, Layers, Palette, Shirt, Ruler, Scissors, Truck
} from 'lucide-react';

// Import component modules
import PersonalData from '../Crud';
import PurchaseHistory from './estadisticas';
import MyOrders from './Crudpedidos';
import Productos from './crudProductos';
import ProductosPersonalizados from './crudProductosPersonalizados';

// IMPORT CRUD de gestión
import TelasCrud from './CrudTela';
import EstampadosCrud from './CrudEstampado';
import TransportadorasCrud from './CrudTransportadoras';

const App = () => {
  const [activeMenu, setActiveMenu] = useState('Estadisticas');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  // ✅ Eliminados: Proveedores, Facturas y Productos Shop
  const menuItems = [
    { id: 'purchase-history', name: 'Estadisticas', icon: <BarChart3 size={20} />, component: <PurchaseHistory /> },
    { id: 'personal-data', name: 'Usuarios', icon: <UserSearch size={20} />, component: <PersonalData /> },
    { id: 'productos-data', name: 'Productos', icon: <Package size={20} />, component: <Productos /> },
    { id: 'productos-personalizados', name: 'Productos Personalizados', icon: <Package size={20} />, component: <ProductosPersonalizados /> },
    { id: 'my-orders', name: 'Pedidos', icon: <ShoppingCart size={20} />, component: <MyOrders /> },
  ];

  // Gestión subitems con iconos específicos
  const gestionItems = [
    { id: 'telas', name: 'Telas', icon: <Scissors size={16} />, component: <TelasCrud /> },
    { id: 'estampados', name: 'Estampados', icon: <Shirt size={16} />, component: <EstampadosCrud /> },
    { id: 'transportadoras', name: 'Transportadoras', icon: <Truck size={16} />, component: <TransportadorasCrud /> },
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

  const handleLogout = () => {
    // Aquí podrías limpiar auth si usas contexto
    // logout(); 
    navigate('/home_l'); // Redirige al Home
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

          {/* Gestión Dropdown */}
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
          <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
          <h2>Panel de Administración</h2>

          {/* 🔹 Botón de administración con estilo user-avatar */}
          <button
            className="user-avatar"
            onClick={handleLogout}
            title="Salir del panel"
            aria-label="Salir"
          >
            <LogOut sx={{ color: 'white' }} fontSize="medium" />
          </button>
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
