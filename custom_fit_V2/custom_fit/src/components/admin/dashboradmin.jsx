    import React, { useState } from 'react';
    import '../../scss/dashboard.scss';
    import { User, Edit, UserSearch, ShoppingCart , ChartNoAxesCombined, Shield, Package, NotepadTextDashed, CreditCard, LogOut, Menu } from 'lucide-react';

    // Import component modules
    import PersonalData from '../Crud';
    import PurchaseHistory from './estadisticas';
    import MyOrders from '../modules/dashboard/mis-pedidos';
    import Contact from '../modules/dashboard/contacto';
    import Shop from '../modules/dashboard/mis-pedidos';
    import Productos from '../Crud';
    

    const App = () => {
    const [activeMenu, setActiveMenu] = useState('Estadisticas');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'purchase-history', name: 'Estadisticas', icon: <ChartNoAxesCombined size={20} />, component: <PurchaseHistory /> },
        { id: 'personal-data', name: 'Usuarios', icon: <UserSearch size={20} />, component: <PersonalData /> },
        { id: 'productos-data', name: 'Productos', icon: <UserSearch size={20} />, component: <Productos /> },
        { id: 'my-orders', name: 'Pedidos', icon: <Package size={20} />, component: <MyOrders /> },
        { id: 'contact', name: 'Facturas', icon: <NotepadTextDashed  size={20} />, component: <Contact /> },
        { id: 'shop', name: 'Productos Shop', icon: <ShoppingCart   size={20} />, component: <Contact /> },
    ];

    // Find active component based on selected menu
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