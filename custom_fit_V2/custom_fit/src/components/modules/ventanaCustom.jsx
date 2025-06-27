import React, { useState } from 'react';
import { X } from 'lucide-react';
import Estampado1 from '../../img/logocustomfit.png';
import Estampado2 from '../../img/diseños/Estampado2.png';
import Estampado3 from '../../img/diseños/Estampado3.png';
import Estampado4 from '../../img/diseños/Estampado4.png';
import Estampado5 from '../../img/diseños/Estampado5.png';
import Estampado6 from '../../img/diseños/Estampado6.png';
import Estampado7 from '../../img/diseños/Estampado7.png';
import Estampado8 from '../../img/diseños/Estampado8.png';

import '../../scss/personalizar.scss';

// Componente de galería de imágenes para el modal de CustomFit
const CustomDesignsGallery = ({ onSelectImage, onClose }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  
  // Imágenes de ejemplo para la galería (reemplazar con tus diseños reales)
  const customDesigns = [
    { id: 1, src: Estampado1 , alt: "Diseño 1", title: "Logo CustomFit" },
    { id: 2, src: Estampado2 , alt: "Diseño 2", title: "Estampado Deportivo" },
    { id: 3, src: Estampado3 , alt: "Diseño 3", title: "Patrón Geométrico" },
    { id: 4, src: Estampado4 ,  alt: "Diseño 4", title: "Logo Minimalista" },
    { id: 5, src: Estampado5 , alt: "Diseño 5", title: "Estampado Vintage" },
    { id: 6, src: Estampado6 , alt: "Diseño 6", title: "Diseño Urbano" },
    { id: 7, src: Estampado7 , alt: "Diseño 7", title: "Patrón Floral" },
    { id: 8, src: Estampado8 , alt: "Diseño 8", title: "Logo Corporativo" },
  ];
  
  // Función para abrir el modal con la imagen ampliada
  const handleOpenImageModal = (image) => {
    setModalImage(image);
    setShowImageModal(true);
  };
  
  // Función para cerrar el modal de imagen ampliada
  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };
  
  const handleApplyImage = (image) => {
    onSelectImage(image.src);
    onClose();
  };
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header py-2">
            <h5 className="modal-title">Diseños CustomFit</h5>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose}
            />
          </div>
          <div className="modal-body p-2">
            {/* Galería de imágenes vertical con scroll */}
            <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '5px' }}>
              {customDesigns.map((design) => (
                <div key={design.id} className="mb-2">
                  <div className="card">
                    <div className="d-flex align-items-center">
                      <div style={{ width: '80px', flexShrink: 0 }}>
                        <img 
                          src={design.src} 
                          alt={design.alt} 
                          className="img-fluid p-1" 
                          style={{ cursor: 'pointer', maxHeight: '70px', objectFit: 'contain' }}
                          onClick={() => handleOpenImageModal(design)}
                        />
                      </div>
                      <div className="flex-grow-1 p-2">
                        <p className="card-text small mb-1" style={{ fontSize: '0.8rem' }}>
                          {design.title}
                        </p>
                        <div className="d-flex">
                          <button 
                            className="btn btn-sm btn-primary me-1" 
                            style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                            onClick={() => handleApplyImage(design)}
                          >
                            Aplicar
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-secondary" 
                            style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                            onClick={() => handleOpenImageModal(design)}
                          >
                            🔍
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicador de scroll */}
            <div className="text-center mt-1">
              <small className="text-muted" style={{ fontSize: '0.7rem' }}>Desliza para ver más diseños ↕️</small>
            </div>
          </div>
          
          <div className="modal-footer py-2">
            <button 
              type="button" 
              className="btn btn-sm btn-primary"
              onClick={() => onClose()}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal para ver la imagen ampliada */}
      {showImageModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060 }}>
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header py-2">
                <h5 className="modal-title" style={{ fontSize: '1rem' }}>{modalImage?.title}</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCloseImageModal}
                />
              </div>
              <div className="modal-body text-center p-2">
                <img 
                  src={modalImage?.src} 
                  alt={modalImage?.alt} 
                  className="img-fluid" 
                  style={{ maxHeight: '300px' }}
                />
              </div>
              <div className="modal-footer py-2">
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => handleApplyImage(modalImage)}
                >
                  Aplicar Diseño
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDesignsGallery;