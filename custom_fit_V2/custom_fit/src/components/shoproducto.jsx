import React from "react";
import "../scss/shoproducto.scss";
import img from '../img/camisa11.png';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';
import styled from 'styled-components';

const CamisetaCard = ({estado, cambiarEstado, producto}) => {
  
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
          src={producto?.imagen || img} // usar imagen del producto si viene
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
        <p className="descripc">{producto?.descripcion || 'Descripción no disponible'}</p>
              <span className="current-price">${(producto?.precio || producto?.raw?.precioPersonalizado || 0).toLocaleString()}</span>
            </div>
            
          </div>

    {/* Línea vertical entre detalles y botón */}
  <div className="vertical-divider-below"></div>

          {/* Sección derecha: Detalles */}
          <div className="right-section">
                <div className="detail">
                  <strong>Talla:</strong>
                  <span className="highlighted">
                    {producto?.raw?.productos_idProductos?.Tallas || producto?.raw?.productos?.Tallas || '—'}
                  </span>
                </div>
                <div className="detail">
                  <strong>Color:</strong>
                  <span className="highlighted">
                    {producto?.raw?.productos_idProductos?.Color || producto?.raw?.productos?.Color || '—'}
                  </span>
                </div>
                <div className="detail">
                  <strong>Tela:</strong>
                  <span className="highlighted">
                    {producto?.raw?.productos_idProductos?.Tela_idTela || producto?.raw?.productos?.Tela_idTela || producto?.raw?.tela?.NombreTela || '—'}
                  </span>
                </div>
                {/* Mostrar stock si viene */}
                <div className="detail">
                  <strong>Stock:</strong>
                  <span className="highlighted">{producto?.raw?.stock ?? producto?.raw?.stock === 0 ? producto.raw.stock : '—'}</span>
                </div>
                {/* Mostrar mini-estampado principal si existe */}
                {producto?.raw?.estampados && producto.raw.estampados.length > 0 && (
                  <div className="detail">
                    <strong>Estampado:</strong>
                    <div style={{ marginTop: 6 }}>
                      <img src={producto.raw.estampados[0].ImgEstampado || ''} alt={producto.raw.estampados[0].NombreEstampado} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }} />
                      <div style={{ fontSize: 12 }}>{producto.raw.estampados[0].NombreEstampado}</div>
                    </div>
                  </div>
                )}
          </div>
        </div>

        

  {/* Botón de agregar al carrito */}
  <button className="buy-button">Agregar al carrito</button>
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
