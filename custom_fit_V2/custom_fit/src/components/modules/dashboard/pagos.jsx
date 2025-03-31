    // PaymentsModule.jsx
    import React, { useState } from 'react';
    import { CreditCard, AlertCircle, Trash2, Plus } from 'lucide-react';

    const PaymentsModule = () => {
    const [paymentMethods, setPaymentMethods] = useState([
        {
        id: 'card-001',
        type: 'visa',
        number: '**** **** **** 4582',
        expiry: '05/25',
        name: 'Juan Pérez',
        default: true
        },
        {
        id: 'card-002',
        type: 'mastercard',
        number: '**** **** **** 7391',
        expiry: '11/24',
        name: 'Juan Pérez',
        default: false
        }
    ]);

    return (
        <div className="module-container">
        <h3 className="module-title">Pagos</h3>
        
        <div className="payment-container">
            <div className="payment-methods">
            <div className="section-header">
                <h4 className="section-title">Métodos de pago guardados</h4>
                <button className="btn btn-primary">
                <Plus size={16} />
                Añadir nuevo método
                </button>
            </div>
            
            <div className="cards-container">
                {paymentMethods.map(card => (
                <div key={card.id} className={`payment-card ${card.type} ${card.default ? 'default' : ''}`}>
                    <div className="card-header">
                    <div className="card-type">{card.type.toUpperCase()}</div>
                    {card.default && <div className="default-badge">Predeterminado</div>}
                    </div>
                    
                    <div className="card-body">
                    <div className="card-number">{card.number}</div>
                    <div className="card-info">
                        <div className="card-name">{card.name}</div>
                        <div className="card-expiry">Caduca: {card.expiry}</div>
                    </div>
                    </div>
                    
                    <div className="card-actions">
                    {!card.default && (
                        <button className="btn btn-text">Establecer como predeterminado</button>
                    )}
                    <button className="btn btn-icon danger">
                        <Trash2 size={16} />
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="billing-section">
            <h4 className="section-title">Facturación</h4>
            
            <div className="form-container">
                <div className="form-group">
                <label>Nombre para facturación</label>
                <input type="text" placeholder="Juan Pérez" />
                </div>
                
                <div className="form-group">
                <label>Dirección de facturación</label>
                <textarea placeholder="Calle Ejemplo 123, 28001, Madrid, España"></textarea>
                </div>
                
                <div className="form-group">
                <label>NIF/CIF (opcional)</label>
                <input type="text" placeholder="12345678A" />
                </div>
                
                <div className="toggle-container">
                <div className="toggle-info">
                    <h5>Misma dirección para envío y facturación</h5>
                </div>
                <label className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                </label>
                </div>
                
                <div className="form-actions">
                <button className="btn btn-primary">Guardar información de facturación</button>
                </div>
            </div>
            </div>
            
            <div className="divider"></div>
            
            <div className="invoice-section">
            <div className="section-header">
                <h4 className="section-title">Historial de facturas</h4>
                <select className="invoice-filter">
                <option>Último año</option>
                <option>Últimos 6 meses</option>
                <option>Últimos 3 meses</option>
                </select>
            </div>
            
            <div className="table-container">
                <table className="data-table">
                <thead>
                    <tr>
                    <th>Nº Factura</th>
                    <th>Fecha</th>
                    <th>Pedido</th>
                    <th>Total</th>
                    <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>FACT-2023-001</td>
                    <td>15/03/2023</td>
                    <td>ORD-2023-001</td>
                    <td>€89.99</td>
                    <td>
                        <button className="btn btn-small btn-secondary">Descargar PDF</button>
                    </td>
                    </tr>
                    <tr>
                    <td>FACT-2023-002</td>
                    <td>28/04/2023</td>
                    <td>ORD-2023-002</td>
                    <td>€135.50</td>
                    <td>
                        <button className="btn btn-small btn-secondary">Descargar PDF</button>
                    </td>
                    </tr>
                    <tr>
                    <td>FACT-2023-003</td>
                    <td>10/06/2023</td>
                    <td>ORD-2023-003</td>
                    <td>€64.75</td>
                    <td>
                        <button className="btn btn-small btn-secondary">Descargar PDF</button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default PaymentsModule;