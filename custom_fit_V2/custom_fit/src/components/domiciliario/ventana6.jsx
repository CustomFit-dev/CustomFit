import React from 'react';
import '../../scss/ventana5.scss'; // Importando los estilos personalizados

function Wallet() {
    // Datos estáticos para ganancias totales y saldo
    const gananciasTotales = 500000;  // Ganancias totales acumuladas
    const saldoActual = 300000;  // Saldo actual disponible

    // Historial de transacciones (solo muestra información, no agrega más)
    const transacciones = [
        { tipo: "Ingreso", monto: 200000, fecha: "10/11/2024" },
        { tipo: "Retiro", monto: 100000, fecha: "12/11/2024" }
    ]; // Historial de transacciones
    
    return (
        <div className="container-fluid wallet-container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="card custom-card">
                        <div className="card-body">
                            <h3 className="text-center">Billetera Virtual</h3>

                            {/* Saldo Actual */}
                            <div className="balance-section">
                                <div className="balance-item">
                                    <label>Saldo Actual:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={`$${saldoActual}`}
                                        disabled
                                    />
                                </div>

                                {/* Ganancias Totales */}
                                <div className="balance-item">
                                    <label>Ganancias Totales:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={`$${gananciasTotales}`}
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Botones de acción (sin agregar o retirar saldo) */}
                            <div className="action-buttons">
                                <button className="btn btn-success">Historial</button>
                                <button className="btn btn-primary">Ver Detalles</button>
                            </div>

                            {/* Historial de transacciones */}
                            <div className="transaction-history">
                                <h5 className="text-center">Historial de Transacciones</h5>
                                <ul className="list-group">
                                    {transacciones.map((trans, index) => (
                                        <li key={index} className="list-group-item">
                                            <strong>{trans.tipo}</strong> de <strong>${trans.monto}</strong> el {trans.fecha}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wallet;
