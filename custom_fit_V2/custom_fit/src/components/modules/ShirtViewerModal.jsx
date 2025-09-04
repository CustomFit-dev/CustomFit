import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ShirtViewerModal = ({ producto, onClose, onChangeView, vistaActual }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState('');

  // Efecto para manejar la carga de imágenes
  useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.src = getImageSrc();
    img.onload = () => {
      setCurrentImage(img.src);
      setIsLoading(false);
    };
    img.onerror = () => {
      // Si hay un error al cargar la imagen, mostramos un mensaje
      console.error('Error al cargar la imagen:', img.src);
      setIsLoading(false);
    };
    return () => {
      // Limpiar eventos al desmontar
      img.onload = null;
      img.onerror = null;
    };
  }, [vistaActual, producto]);

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
      padding: '20px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      maxWidth: '90%',
      maxHeight: '90%',
      position: 'relative',
      cursor: 'default',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      overflow: 'hidden',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'rgba(0,0,0,0.1)',
      border: 'none',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#333',
      transition: 'all 0.2s ease',
    },
    navButton: {
      background: 'rgba(23, 190, 187, 0.8)',
      border: 'none',
      color: 'white',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'absolute',
      zIndex: 1,
      transition: 'all 0.2s ease',
    },
    navButtonHover: {
      transform: 'scale(1.1)',
      background: '#17BEBB',
    },
    viewButton: (isActive) => ({
      padding: '10px 18px',
      border: `2px solid ${isActive ? '#17BEBB' : '#ddd'}`,
      borderRadius: '25px',
      background: isActive ? '#e6f7f7' : 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: isActive ? '600' : 'normal',
      color: isActive ? '#17BEBB' : '#333',
      margin: '0 5px',
      whiteSpace: 'nowrap',
    }),
    imageContainer: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    },
    image: {
      maxWidth: '100%',
      maxHeight: '60vh',
      objectFit: 'contain',
      borderRadius: '8px',
      opacity: isLoading ? 0 : 1,
      transition: 'opacity 0.3s ease',
    },
    loadingContainer: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    loadingSpinner: {
      animation: 'spin 1s linear infinite',
      fontSize: '24px',
      color: '#17BEBB',
    },
    viewControls: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: '20px',
      padding: '10px 0',
    },
  };

  // Agregar la animación de carga
  const keyframes = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  const getImageSrc = () => {
    switch(vistaActual) {
      case 'frente':
        return producto.images?.[0] || producto.imagen;
      case 'estampado':
        return producto.images?.[1] || producto.images?.[0] || producto.imagen;
      case 'atras':
        return producto.images?.[2] || producto.images?.[0] || producto.imagen;
      default:
        return producto.images?.[0] || producto.imagen;
    }
  };

  const views = [
    { id: 'frente', label: 'Vista Frontal' },
    { id: 'estampado', label: 'Estampado' },
    { id: 'atras', label: 'Vista Trasera' }
  ];

  const currentIndex = views.findIndex(view => view.id === vistaActual);
  const nextView = views[(currentIndex + 1) % views.length].id;
  const prevView = views[(currentIndex - 1 + views.length) % views.length].id;

  const [isHovered, setIsHovered] = useState({
    prev: false,
    next: false,
    close: false
  });

  return (
    <>
      <style>{keyframes}</style>
      <div 
        style={styles.overlay}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div 
          style={styles.modal}
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            style={{
              ...styles.closeButton,
              background: isHovered.close ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.1)',
              transform: isHovered.close ? 'rotate(90deg)' : 'none'
            }}
            onMouseEnter={() => setIsHovered(prev => ({ ...prev, close: true }))}
            onMouseLeave={() => setIsHovered(prev => ({ ...prev, close: false }))}
            aria-label="Cerrar visor"
          >
            <FaTimes />
          </button>

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: '25px'
          }}>
            <div style={styles.imageContainer}>
              {isLoading && (
                <div style={styles.loadingContainer}>
                  <FaSpinner style={styles.loadingSpinner} />
                  <span style={{ color: '#666' }}>Cargando imagen...</span>
                </div>
              )}
              
              <button 
                onClick={() => onChangeView(prevView)}
                style={{
                  ...styles.navButton,
                  left: '15px',
                  ...(isHovered.prev && styles.navButtonHover)
                }}
                onMouseEnter={() => setIsHovered(prev => ({ ...prev, prev: true }))}
                onMouseLeave={() => setIsHovered(prev => ({ ...prev, prev: false }))}
                aria-label="Vista anterior"
              >
                <FaChevronLeft />
              </button>

              <img 
                src={currentImage} 
                alt={`${producto.titulo} - ${vistaActual}`}
                style={styles.image}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  console.error('Error al cargar la imagen:', currentImage);
                  setIsLoading(false);
                }}
              />

              <button 
                onClick={() => onChangeView(nextView)}
                style={{
                  ...styles.navButton,
                  right: '15px',
                  ...(isHovered.next && styles.navButtonHover)
                }}
                onMouseEnter={() => setIsHovered(prev => ({ ...prev, next: true }))}
                onMouseLeave={() => setIsHovered(prev => ({ ...prev, next: false }))}
                aria-label="Siguiente vista"
              >
                <FaChevronRight />
              </button>
            </div>

            <div style={styles.viewControls}>
              {views.map(view => (
                <button
                  key={view.id}
                  onClick={() => onChangeView(view.id)}
                  style={styles.viewButton(vistaActual === view.id)}
                  aria-pressed={vistaActual === view.id}
                  aria-label={`Ver ${view.label.toLowerCase()}`}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ShirtViewerModal.propTypes = {
  producto: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onChangeView: PropTypes.func.isRequired,
  vistaActual: PropTypes.oneOf(['frente', 'estampado', 'atras']).isRequired
};

export default ShirtViewerModal;
