import React from "react";
import "../scss/shoproducto.scss";
import img from '../img/camisa11.png';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';
import styled from 'styled-components';

const CamisetaCard = ({ estado, cambiarEstado, producto }) => {
  
  return (
    <>
    {estado &&
    <Overlay>
    <div className="card-container">  
      {/* Imagen de la camiseta */}
      <div className="image-section">
      
        <div style={{ position: 'relative' }}>
  <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
    <CloseIcon1 />
  </IconButton1>
</div>
        <img
          src={producto?.imagen || img}
          alt={producto?.titulo || 'Camiseta'}
          className="shirt-image"
        />
      </div>
      {/* Información de la camiseta */}
      <div className="info-section">
        <div className="info-content">
          {/* Sección izquierda: Precio y estrellas */}
          <div className="left-section">
            <div className="price-section">
              <h2>{producto?.titulo || 'Camiseta'}</h2>
              <p className="descripc">{producto?.descripcion || 'Sin descripción disponible'}</p>
              {producto?.precio ? (
                <>
                  <span className="current-price">
                    ${producto.precio.toLocaleString()}
                  </span>
                </>
              ) : null}
            </div>
            
          </div>

          {/* Línea vertical entre detalles y botón */}
     <div className="vertical-divider-below"></div>

          {/* Sección derecha: Detalles */}
          <div className="right-section">
            <div className="detail">
              <strong>Talla:</strong> <span className="highlighted">{producto?.talla || 'Única'}</span>
              <p>{producto?.talla ? `Talla ${producto.talla} según disponibilidad.` : 'Talla única o por confirmar.'}</p>
            </div>
            <div className="detail">
              <strong>Color:</strong> <span className="highlighted">{producto?.color || 'N/A'}</span>
              <p>{producto?.color ? `Color ${producto.color.toLowerCase()} seleccionado.` : 'Color por definir.'}</p>
            </div>
            <div className="detail">
              <strong>Tela:</strong> <span className="highlighted">{producto?.tela || 'N/A'}</span>
              <p>{producto?.tela ? `Confeccionada en ${producto.tela.toLowerCase()}.` : 'Tela por definir.'}</p>
            </div>
          </div>
        </div>

        

        {/* Botón de comprar */}
        <button className="buy-button">Comprar</button>
      </div>
    </div>
    
    </Overlay>
    }
    </>
  );
}

export default CamisetaCard;
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
    z-index: 9999; /* Asegura que esté encima de otros elementos */
`;
