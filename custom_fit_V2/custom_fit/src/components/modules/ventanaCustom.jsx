import React, { useState, useEffect } from "react";
import axios from 'axios';

import "../../scss/personalizar.scss";

const CustomDesignsGallery = ({ onSelectImage, onClose }) => {
  const [modalImage, setModalImage] = useState(null);
  const [customDesigns, setCustomDesigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Obtener diseños desde el backend (solo estampados con rol 'usuario')
    const fetchDesigns = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:8000/api/estampados_usuario/');
        // Esperamos que cada objeto tenga ImgEstampado y NombreEstampado
        const data = Array.isArray(res.data) ? res.data.map(d => ({ id: d.idEstampado, src: d.ImgEstampado, alt: d.NombreEstampado || 'Diseño', title: d.NombreEstampado || '' })) : [];
        setCustomDesigns(data);
      } catch (err) {
        console.error('Error cargando diseños personalizados:', err);
        setCustomDesigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

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
              {loading ? (
                <div className="text-center">Cargando diseños…</div>
              ) : (
                customDesigns.map((design) => (
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
                ))
              )}
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
