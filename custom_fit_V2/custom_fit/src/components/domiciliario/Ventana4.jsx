import React, { useState } from 'react';
import '../../scss/ventana4.scss';
import camisa1 from "../../img/camisa1.jpg";
import camisa2 from "../../img/camisa2.jpg";
import camisa3 from "../../img/camisa5.jpg";
import { Button } from '@mui/material';
import styled from 'styled-components';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';

const PedidosDisponibles = ({ estado, cambiarEstado }) => {
    const pedidos = [
        {
            id: 1,
            direccion1: "calle23#124B22",
            direccion2: "calle13x#119E32",
            kilometros: "23km",
            costo: "9,000",
            imagenes: [camisa1], // Un solo producto
            estado: 'pendiente'
        },
        {
            id: 2,
            direccion1: "calle20#134C12",
            direccion2: "calle11x#102A21",
            kilometros: "15km",
            costo: "7,500",
            imagenes: [camisa2, camisa3], // Dos productos
            estado: 'pendiente'
        },
        {
            id: 3,
            direccion1: "calle10#214D32",
            direccion2: "calle15x#152E12",
            kilometros: "30km",
            costo: "10,500",
            imagenes: [camisa1, camisa2, camisa3], // Tres productos
            estado: 'pendiente'
        },
    ];

    const cambiarEstadoPedido = (id, nuevoEstado) => {
        const pedidoIndex = pedidos.findIndex((pedido) => pedido.id === id);
        if (pedidoIndex !== -1) {
            pedidos[pedidoIndex].estado = nuevoEstado;
        }
    };

    return (
        <>
        { estado &&
            <Overlay>
        <div className="pedidos-containerDomi4">
            <aside className="info-panel">
            <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
                                <CloseIcon1 />
                            </IconButton1>
                <h2>🚀¡QUE TU DEDICACIÓN TE LLEVE A SER EL MEJOR!</h2>
                <p>Entregue cada pedido con excelencia. Asegúrese de organizar y cumplir con cada entrega. ¡Marca la diferencia!</p>
            </aside>
            <div className="pedidos-list">
                <h3 className="title">Pedidos disponibles</h3>
                {pedidos.map((pedido) => (
                    <PedidoCard 
                        key={pedido.id} 
                        pedido={pedido} 
                        cambiarEstadoPedido={cambiarEstadoPedido} 
                    />
                ))}
            </div>
        </div>
        </Overlay>
        }
        
        </>
    );
};

const PedidoCard = ({ pedido, cambiarEstadoPedido }) => {
    // Definir el estado 'currentImage' para manejar las imágenes
    const [currentImage, setCurrentImage] = useState(0);

    const handleNext = () => {
        setCurrentImage((prev) => (prev + 1) % pedido.imagenes.length);
    };

    const handlePrev = () => {
        setCurrentImage((prev) => (prev - 1 + pedido.imagenes.length) % pedido.imagenes.length);
    };

    const handleAceptar = () => {
        cambiarEstadoPedido(pedido.id, 'aceptado');
    };

    const handleRechazar = () => {
        cambiarEstadoPedido(pedido.id, 'rechazado');
    };

    return (
        <div className="pedido-card">
            <div className="pedido-images">
                <img
                    src={pedido.imagenes[currentImage]}
                    alt={`Producto ${currentImage + 1}`}
                    className="pedido-img"
                />
                {pedido.imagenes.length > 1 && (
                    <>
                        <button 
                            className="arrow left" 
                            onClick={handlePrev}
                        >
                            &lt;
                        </button>
                        <button 
                            className="arrow right" 
                            onClick={handleNext}
                        >
                            &gt;
                        </button>
                    </>
                )}
                <p className="cantidad-productos">
                    {currentImage + 1} de {pedido.imagenes.length} productos
                </p>
            </div>
            <div className="pedido-body">
                <p><strong>Dirección 1:</strong> {pedido.direccion1}</p>
                <p><strong>Dirección 2:</strong> {pedido.direccion2}</p>
                <p><strong>Kilómetros:</strong> {pedido.kilometros}</p>
                <p><strong>Costo:</strong> {pedido.costo}</p>
                <p><strong>Estado:</strong> {pedido.estado}</p>
                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleAceptar}
                    disabled={pedido.estado !== 'pendiente'}
                >
                    Aceptar
                </Button>
                <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleRechazar}
                    disabled={pedido.estado !== 'pendiente'}
                >
                    Rechazar
                </Button>
            </div>
        </div>
    );
};

export default PedidosDisponibles;
const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center; /* Centra los elementos horizontalmente */
    align-items: center; /* Centra los elementos verticalmente */
    z-index: 10000; /* Asegura que esté encima de otros elementos */
`;