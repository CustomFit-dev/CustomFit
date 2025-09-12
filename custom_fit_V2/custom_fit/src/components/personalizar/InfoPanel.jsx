    import React from 'react';
    import { colorImages } from './colors';

    const InfoPanel = ({
    tshirtColor,
    setTshirtColor,
    size,
    fabric,
    textElements,
    imageElements,
    emojiElements,
    textFont,
    handleBuyClick
    }) => {
    return (
        <div className="col-md-3">
        <div className="mb-4">
            <h5 className="fw-bold mb-2">Colores de Camiseta</h5>
            <div className="d-flex flex-wrap gap-2">
            {Object.entries(colorImages).map(([colorClass, imageSrc]) => (
                <button 
                key={colorClass} 
                className={`btn ${colorClass} rounded-circle`}
                style={{ width: '3rem', height: '3rem' }}
                title={colorClass}
                onClick={() => setTshirtColor(colorClass)}
                />
            ))}
            </div>
        </div>
        
        <div className="card bg-dark text-white mb-4">
            <div className="card-body">
            <h6 className="card-title fw-bold mb-2">Hazla tuya</h6>
            <ul className="list-unstyled">
                <li>🎨 Personaliza el diseño</li>
                <li>🖼️ Agrega imágenes o logos</li>
                <li>✍️ Escribe tu propio texto</li>
                <li>📏 Elige la talla perfecta</li>
                <li>🧵 Escoge entre telas exclusivas</li>
            </ul>
            </div>
        </div>
        
        <div className="card mb-4">
            <div className="card-body">
            <h6 className="card-title fw-bold mb-2">Tu Selección</h6>
            <ul className="list-unstyled">
                <li><strong>Talla:</strong> {size}</li>
                <li><strong>Tela:</strong> {fabric || 'No seleccionada'}</li>
                <li><strong>Elementos:</strong> {textElements.length + imageElements.length + emojiElements.length}</li>
            </ul>
            </div>
        </div>
        
        <div className="d-grid gap-3">
            <button className="btn btn-success btn-lg fw-bold" onClick={handleBuyClick}>
            Comprar
            </button>
            <button className="btn btn-primary btn-lg fw-bold">
            Agregar al Carrito
            </button>
            <span style={{ fontFamily: textFont }}>
            Fuente seleccionada: <strong>{textFont}</strong>
            </span>
        </div>
        </div>
    );
    };

    export default InfoPanel;