// MyOrdersModule.jsx
import React, { useState } from 'react';
import { Package, Clock, Truck, Check, X } from 'lucide-react';


const MyOrdersModule = () => {
  const [activeOrders, setActiveOrders] = useState([
    { 
      id: 'ORD-2023-006', 
      date: '10/03/2023', 
      status: 'En proceso', 
      items: [
        { name: 'Camiseta personalizada', price: '€35.99', image: '/images/tshirt.jpg' },
        { name: 'Sudadera con capucha', price: '€59.99', image: '/images/hoodie.jpg' }
      ],
      total: '€95.98',
      estimatedDelivery: '18/03/2023'
    },
    { 
      id: 'ORD-2023-007', 
      date: '15/03/2023', 
      status: 'Preparando envío', 
      items: [
        { name: 'Pantalones deportivos', price: '€45.50', image: '/images/pants.jpg' }
      ],
      total: '€45.50',
      estimatedDelivery: '22/03/2023'
    }
  ]);

  return (
    <div className="module-container">
      <h3 className="module-title">Mis Pedidos</h3>
      
      <div className="tabs-container">
        <div className="tab active">Pedidos activos</div>
        <div className="tab">Historial</div>
        <div className="tab">Devoluciones</div>
      </div>
      
      <div className="active-orders-container">
        {activeOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-id">
                <h4>Pedido #{order.id}</h4>
                <span className="order-date">Realizado el {order.date}</span>
              </div>
              <div className="order-status">
                <span className="status-badge">{order.status}</span>
              </div>
            </div>
            
            <div className="order-progress">
              <div className="progress-step completed">
                <div className="step-icon"><Check size={16} /></div>
                <div className="step-text">Confirmado</div>
              </div>
              <div className="progress-line completed"></div>
              
              <div className="progress-step completed">
                <div className="step-icon"><Package size={16} /></div>
                <div className="step-text">Procesando</div>
              </div>
              <div className="progress-line active"></div>
              
              <div className="progress-step active">
                <div className="step-icon"><Truck size={16} /></div>
                <div className="step-text">Enviando</div>
              </div>
              <div className="progress-line"></div>
              
              <div className="progress-step">
                <div className="step-icon"><Check size={16} /></div>
                <div className="step-text">Entregado</div>
              </div>
            </div>
            
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image-placeholder"></div>
                  <div className="item-details">
                    <h5>{item.name}</h5>
                    <span className="item-price">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-footer">
              <div className="order-delivery">
                <Clock size={16} />
                <span>Entrega estimada: {order.estimatedDelivery}</span>
              </div>
              <div className="order-total">
                <span>Total:</span>
                <span className="total-amount">{order.total}</span>
              </div>
            </div>
            
            <div className="order-actions">
              <button className="btn btn-primary">Seguir envío</button>
              <button className="btn btn-secondary">Detalles del pedido</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrdersModule;