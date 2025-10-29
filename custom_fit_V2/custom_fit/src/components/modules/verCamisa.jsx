import React, { useState } from 'react';
import '../../scss/verCamisa.scss'; // CSS asociado
import Frontal from '../../img/camisa11.png';
import Trasera from '../../img/trasera1.png';
import Mangas from '../../img/logo1.png';
import styled from 'styled-components';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';

const ShirtViewer = ({estado, cambiarEstado, producto}) => {
  const [view, setView] = useState('front');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const showView = (selectedView) => {
    setView(selectedView);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 }); // Restablece la posición al cambiar de vista
  };

  const increaseZoom = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const decreaseZoom = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    setPosition({ x: 0, y: 0 }); // Resetea la posición cuando el zoom se reduce
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartDrag({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const deltaX = e.clientX - startDrag.x;
      const deltaY = e.clientY - startDrag.y;
      setPosition((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setStartDrag({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
    {estado &&
    <Overlay>
    
    <div
      className="shirt-view-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="shirt-view"
        onMouseDown={handleMouseDown}
        style={{
          cursor: zoomLevel > 1 ? 'grab' : 'default',
        }}
      >
        <img
          src={producto?.raw?.urlFrontal || producto?.imagen || Frontal}
          alt="Camisa Frontal"
          className={`shirt-image ${view === 'front' ? '' : 'hidden'}`}
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
          }}
        />

        <img
          src={producto?.raw?.urlEspadarl || Trasera}
          alt="Camisa Trasera"
          className={`shirt-image ${view === 'back' ? '' : 'hidden'}`}
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
          }}
        />

        <img
          src={producto?.raw?.urlMangaIzquierda || Mangas}
          alt="Manga Izquierda"
          className={`shirt-image ${view === 'left_sleeve' ? '' : 'hidden'}`}
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
          }}
        />

        <img
          src={producto?.raw?.urlMangaDerecha || Mangas}
          alt="Manga Derecha"
          className={`shirt-image ${view === 'right_sleeve' ? '' : 'hidden'}`}
          style={{
            transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
          }}
        />
      </div>
      <div className='salir' style={{ position: 'relative' }}>
          <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
          <CloseIcon1 />
          </IconButton1>  
      </div>
      <div className="view-buttons">
        <button onClick={() => showView('front')}>Frontal</button>
        <button onClick={() => showView('back')}>Trasera</button>
        <button onClick={() => showView('left_sleeve')}>Manga Izquierda</button>
        <button onClick={() => showView('right_sleeve')}>Manga Derecha</button>
      </div>

      <div className="zoom-controls">
        <button onClick={decreaseZoom}>-</button>
        <span>Zoom: {zoomLevel}x</span>
        <button onClick={increaseZoom}>+</button>
      </div>

      {/* Datos del producto: talla / color / tela */}
      <div style={{ position: 'absolute', top: 20, right: 20, background: 'rgba(255,255,255,0.9)', padding: 12, borderRadius: 8 }}>
        <div><strong>Talla:</strong> {producto?.raw?.productos?.Tallas || producto?.raw?.productos_idProductos?.Tallas || '—'}</div>
        <div><strong>Color:</strong> {producto?.raw?.productos?.Color || producto?.raw?.productos_idProductos?.Color || '—'}</div>
        <div><strong>Tela:</strong> {producto?.raw?.tela?.NombreTela || producto?.raw?.productos?.Tela_idTela || producto?.raw?.productos_idProductos?.Tela_idTela || '—'}</div>
      </div>
      {/* Estampados si existen */}
      {producto?.raw?.estampados && producto.raw.estampados.length > 0 && (
        <div className="estampados-list" style={{ position: 'absolute', bottom: 20, left: 20, display: 'flex', gap: 8 }}>
          {producto.raw.estampados.map((e, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <img src={e.ImgEstampado || e.ImgEstampado} alt={e.NombreEstampado} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6 }} />
              <div style={{ fontSize: 10 }}>{e.NombreEstampado}</div>
            </div>
          ))}
        </div>
      )}
    </div>
    </Overlay>
}
    </>
  );
};

export default ShirtViewer;
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