// src/components/shoproducto.jsx

import React from "react";
import "../scss/shoproducto.scss";
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';
import styled from 'styled-components';

const CamisetaCard = ({ estado, cambiarEstado, producto }) => {
  if (!estado || !producto) return null;

  return (
    <Overlay>
      <div className="card-container">
        <div className="image-section">
          <div style={{ position: 'relative' }}>
            <IconButton1 className="salirx1" onClick={cambiarEstado}>
              <CloseIcon1 />
            </IconButton1>
          </div>
          <img
            src={producto.imagen}
            alt={producto.titulo}
            className="shirt-image"
          />
        </div>

        <div className="info-section">
          <div className="info-content">
            <div className="left-section">
              <div className="price-section">
                <h2>{producto.titulo}</h2>
                <p className="descripc">{producto.descripcion}</p>
                <span className="current-price">${producto.precio.toLocaleString()}</span>
              </div>
            </div>

            <div className="vertical-divider-below"></div>

            <div className="right-section">
              <div className="detail">
                <strong>Talla:</strong> <span className="highlighted">{producto.talla}</span>
                <p>Ideal para complexión media</p>
              </div>
              <div className="detail">
                <strong>Color:</strong> <span className="highlighted">{producto.color}</span>
                <p>Color distintivo y versátil</p>
              </div>
              <div className="detail">
                <strong>Tela:</strong> <span className="highlighted">{producto.tela}</span>
                <p>Material cómodo y duradero</p>
              </div>
            </div>
          </div>

          <button className="buy-button">Comprar</button>
        </div>
      </div>
    </Overlay>
  );
};

export default CamisetaCard;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
