import React, { useState } from "react";
import Estampado1 from "../../img/logocustomfit.png";
import Estampado2 from "../../img/diseños/Estampado2.png";
import Estampado3 from "../../img/diseños/Estampado3.png";
import Estampado4 from "../../img/diseños/Estampado4.png";
import Estampado5 from "../../img/diseños/Estampado5.png";
import Estampado6 from "../../img/diseños/Estampado6.png";
import Estampado7 from "../../img/diseños/Estampado7.png";
import Estampado8 from "../../img/diseños/Estampado8.png";

import "../../scss/personalizar.scss";

const CustomDesignsGallery = ({ onSelectImage, onClose }) => {
  const [modalImage, setModalImage] = useState(null);

  const customDesigns = [
    { id: 1, src: Estampado1, alt: "Diseño 1", title: "Logo CustomFit" },
    { id: 2, src: Estampado2, alt: "Diseño 2", title: "Estampado Deportivo" },
    { id: 3, src: Estampado3, alt: "Diseño 3", title: "Patrón Geométrico" },
    { id: 4, src: Estampado4, alt: "Diseño 4", title: "Logo Minimalista" },
    { id: 5, src: Estampado5, alt: "Diseño 5", title: "Estampado Vintage" },
    { id: 6, src: Estampado6, alt: "Diseño 6", title: "Diseño Urbano" },
    { id: 7, src: Estampado7, alt: "Diseño 7", title: "Patrón Floral" },
    { id: 8, src: Estampado8, alt: "Diseño 8", title: "Logo Corporativo" },
  ];

  const handleApplyImage = (image) => {
    onSelectImage(image.src);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header py-2">
            <h5 className="modal-title">🎨 Diseños CustomFit</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* Galería en grid */}
            <div className="gallery-grid">
              {customDesigns.map((design) => (
                <div
                  key={design.id}
                  className="gallery-item"
                  onClick={() => setModalImage(design)}
                >
                  <img
                    src={design.src}
                    alt={design.alt}
                    className="gallery-img"
                  />
                  <div className="gallery-overlay">{design.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de vista previa */}
      {modalImage && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1060,
          }}
        >
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <div className="modal-header py-2">
                <h5 className="modal-title">{modalImage.title}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalImage(null)}
                />
              </div>
              <div className="modal-body text-center">
                <img
                  src={modalImage.src}
                  alt={modalImage.alt}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "350px" }}
                />
              </div>
              <div className="modal-footer py-2">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleApplyImage(modalImage)}
                >
                  ✅ Aplicar Diseño
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
