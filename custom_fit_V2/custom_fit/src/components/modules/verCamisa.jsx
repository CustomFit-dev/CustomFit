import React, { useState } from 'react';
import '../../scss/verCamisa.scss'; // CSS asociado
import styled from 'styled-components';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';

const ShirtViewer = ({ estado, cambiarEstado, producto }) => {
  const [view, setView] = useState('front');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

  const showView = (selectedView) => {
    setView(selectedView);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const increaseZoom = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const decreaseZoom = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    setPosition({ x: 0, y: 0 });
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

  if (!producto) return null; // Evita errores si no hay producto

  return (
    <>
      {estado && (
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
              {/* Imagen frontal */}
              <img
                src={producto.urlFrontal}
                alt="Camisa Frontal"
                className={`shirt-image ${view === 'front' ? '' : 'hidden'}`}
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                }}
              />

              {/* Imagen trasera */}
              <img
                src={producto.urlEspaldar}
                alt="Camisa Trasera"
                className={`shirt-image ${view === 'back' ? '' : 'hidden'}`}
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                }}
              />

              {/* Manga izquierda */}
              <img
                src={producto.urlMangaIzquierda}
                alt="Manga Izquierda"
                className={`shirt-image ${view === 'left-sleeve' ? '' : 'hidden'}`}
                style={{
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                }}
              />

              {/* Manga derecha */}
              <img
                src={producto.urlMangaDerecha}
                alt="Manga Derecha"
                className={`shirt-image ${view === 'right-sleeve' ? '' : 'hidden'}`}
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
              <button onClick={() => showView('left-sleeve')}>Manga Izquierda</button>
              <button onClick={() => showView('right-sleeve')}>Manga Derecha</button>
            </div>

            <div className="zoom-controls">
              <button onClick={decreaseZoom}>-</button>
              <span>Zoom: {zoomLevel}x</span>
              <button onClick={increaseZoom}>+</button>
            </div>
          </div>
        </Overlay>
      )}
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
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
