import React, { useState } from 'react';  // Importando useState para manejar el estado
import '../../scss/ventana5.scss'; // Importando los estilos personalizados
import img1 from '../../img/camisa11.png';
import img2 from '../../img/camisa2.jpg'; // Imagen para el segundo producto
import styled from 'styled-components';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';

function OrderStatus({estado, cambiarEstado}) {
    const direccionRecolectar = "https://www.waze.com/es-419/live-map/";  // Dirección para recolección
    const direccionEntrega = "https://waze.com/ul?q=Direccion+2+Medellin";  // Dirección para entrega

    // Array de productos para simular varios productos
    const productos = [
        { img: img1, alt: "Camisa 1" },
        { img: img2, alt: "Camisa 2" },
    ];

    // Estado para manejar el índice del producto visible
    const [currentProductIndex, setCurrentProductIndex] = useState(0);

    // Funciones para cambiar de producto
    const goToNextProduct = () => {
        setCurrentProductIndex((prevIndex) => (prevIndex + 1) % productos.length);
    };

    const goToPrevProduct = () => {
        setCurrentProductIndex(
            (prevIndex) => (prevIndex - 1 + productos.length) % productos.length
        );
    };

    return (
        <>
        {estado &&  
        <Overlay>
        <div className="container-fluid order-status">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                
                    <div className="card custom-card">
                    
                        <div className="image-container">
                        <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
                                <CloseIcon1 />
                            </IconButton1>
                            <img 
                                src={productos[currentProductIndex].img} 
                                alt={productos[currentProductIndex].alt} 
                                className="img-fluid custom-image" 
                            />
                            {/* Flechas para cambiar de producto */}
                            {productos.length > 1 && (
                                <div className="arrow-container">
                                    <i
                                        className="arrow-icon fa fa-arrow-left"
                                        onClick={goToPrevProduct}
                                    ></i> {/* Flecha izquierda */}
                                    <i
                                        className="arrow-icon fa fa-arrow-right"
                                        onClick={goToNextProduct}
                                    ></i> {/* Flecha derecha */}
                                </div>
                            )}
                        </div>
                        <div className="card-body text-center">
                            <div className="status-buttons">
                                <button className="btn btn-success status-btn">Entregado</button>
                                <button className="btn btn-warning status-btn">Recogido</button>
                            </div>
                            <div className="location-buttons">
                                <a href={direccionRecolectar} target="_blank" rel="noopener noreferrer">
                                    <button className="btn btn-primary action-btn">Ir al lugar de recolección</button>
                                </a>
                                <a href={direccionEntrega} target="_blank" rel="noopener noreferrer">
                                    <button className="btn btn-primary action-btn">Ir al lugar de entrega</button>
                                </a>
                            </div>
                            <div className="invoice-btn">
                                <button className="btn btn-secondary action-btn">Ver factura</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Overlay>
        }

        </>
    );
}

export default OrderStatus;
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
