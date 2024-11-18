import React from "react";
import "../scss/shoproducto.scss";
import img from '../img/camisa11.png';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CamisetaCard = ({estado, cambiarEstado}) => {
  const navigate = useNavigate();
  
  return (
    <>
    {estado &&
    <Overlay>
    <div className="card-container">  
      {/* Imagen de la camiseta */}
      <div className="image-section">
      
        <div className="discount-tag">30%</div>
        <div style={{ position: 'relative' }}>
  <IconButton className="salirx1" onClick={() => navigate('./Store.jsx')}>
    <CloseIcon />
  </IconButton>
</div>
        <img
          src={img} // Cambia este link por la URL de tu imagen
          alt="Camiseta"
          className="shirt-image"
        />
      </div>
      {/* Información de la camiseta */}
      <div className="info-section">
        <div className="info-content">
          {/* Sección izquierda: Precio y estrellas */}
          <div className="left-section">
            <div className="price-section">
            <h2>Camiseta Sencilla</h2>
        <p className="descripc">Camiseta con estampado color negro</p>
              <span className="old-price">$75.000</span>
              <span className="current-price">$45.000</span>
            </div>
            
          </div>

          {/* Línea vertical entre detalles y botón */}
     <div className="vertical-divider-below"></div>

          {/* Sección derecha: Detalles */}
          <div className="right-section">
            <div className="detail">
              <strong>Talla:</strong> <span className="highlighted">M</span>
              <p>Intermedia para personas de complexión media</p>
            </div>
            <div className="detail">
              <strong>Color:</strong> <span className="highlighted">Negro</span>
              <p>Color oscuro que simboliza elegancia y sofisticación</p>
            </div>
            <div className="detail">
              <strong>Tela:</strong> <span className="highlighted">Fibra</span>
              <p>Material versátil, ligero y duradero, de fácil cuidado.</p>
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
    z-index: 999; /* Asegura que esté encima de otros elementos */
`;
