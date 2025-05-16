    import React, { useState } from 'react';
    import '../../scss/dashboard.scss';
    import { User, Edit, UserCheck, Trash2, ShoppingBag, Shield, Package, MessageCircle, CreditCard, LogOut, Menu } from 'lucide-react';

    // Import component modules
    import PersonalData from '../Crud';
    import PurchaseHistory from './estadisticas';
    import MyOrders from '../modules/dashboard/mis-pedidos';
    import Contact from '../modules/dashboard/contacto';
    import Payments from '../modules/dashboard/pagos';
    import Logout from '../modules/dashboard/contacto';

    const App = () => {
    const [activeMenu, setActiveMenu] = useState('Estadisticas');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        { id: 'purchase-history', name: 'Estadisticas', icon: <ShoppingBag size={20} />, component: <PurchaseHistory /> },
        { id: 'personal-data', name: 'Usuarios', icon: <UserCheck size={20} />, component: <PersonalData /> },
    
        
        { id: 'my-orders', name: 'Mis pedidos', icon: <Package size={20} />, component: <MyOrders /> },
        { id: 'contact', name: 'Contacto', icon: <MessageCircle size={20} />, component: <Contact /> },
        { id: 'payments', name: 'Pagos', icon: <CreditCard size={20} />, component: <Payments /> },
        { id: 'logout', name: 'Salir', icon: <LogOut size={20} />, component: <Logout /> }
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