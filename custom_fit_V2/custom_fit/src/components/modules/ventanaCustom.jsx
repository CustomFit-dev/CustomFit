import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../scss/personalizar.scss";

const CustomDesignsGallery = ({ onSelectImage, onClose }) => {
  const [modalImage, setModalImage] = useState(null);
  const [customDesigns, setCustomDesigns] = useState([]);
  const [emojiDesigns, setEmojiDesigns] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingEmoji, setLoadingEmoji] = useState(false);

  // Cargar diseños del rol "usuario"
  useEffect(() => {
    const fetchUserDesigns = async () => {
      setLoadingUser(true);
      try {
        const res = await axios.get('http://localhost:8000/api/estampados_usuario/');
        const data = Array.isArray(res.data)
          ? res.data.map(d => ({
            id: d.idEstampado,
            src: d.ImgEstampado,
            alt: d.NombreEstampado || 'Diseño',
            title: d.NombreEstampado || '',
            price: d.PrecioEstampado || 0,
            rolestampado: 'usuario'
          }))
          : [];
        setCustomDesigns(data);
      } catch (err) {
        console.error('Error cargando diseños de usuario:', err);
        setCustomDesigns([]);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserDesigns();
  }, []);

  // Cargar diseños del rol "emoji"
  useEffect(() => {
    const fetchEmojiDesigns = async () => {
      setLoadingEmoji(true);
      try {
        const res = await axios.get('http://localhost:8000/api/estampados_emoji/');
        const data = Array.isArray(res.data)
          ? res.data.map(d => ({
            id: d.idEstampado,
            src: d.ImgEstampado,
            alt: d.NombreEstampado || 'Emoji',
            title: d.NombreEstampado || '',
            price: d.PrecioEstampado || 0,
            rolestampado: 'emoji'
          }))
          : [];
        setEmojiDesigns(data);
      } catch (err) {
        console.error('Error cargando emojis:', err);
        setEmojiDesigns([]);
      } finally {
        setLoadingEmoji(false);
      }
    };

    fetchEmojiDesigns();
  }, []);

  const handleApplyImage = (image) => {
    onSelectImage({
      src: image.src,
      price: image.price,
      idEstampado: image.id,
      rolestampado: image.rolestampado
    });
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
            {/* GALERÍA DE USUARIOS */}
            <div className="gallery-grid">
              {loadingUser ? (
                <div className="text-center">Cargando diseños de usuarios…</div>
              ) : (
                customDesigns.map((design) => (
                  <div
                    key={design.id}
                    className="gallery-item"
                    onClick={() => setModalImage(design)}
                  >
                    <img src={design.src} alt={design.alt} className="gallery-img" />
                    <div className="gallery-overlay">
                      <div>{design.title}</div>
                      <div style={{ fontSize: '0.85em', marginTop: '4px', color: '#ffd700' }}>
                        ${design.price ? design.price.toLocaleString('es-CO') : '0'} COP
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* LÍNEA Y TÍTULO */}
            <hr className="my-3" />
            <h6 className="text-muted text-center mb-3">🌀 Emojis</h6>

            {/* GALERÍA DE EMOJIS */}
            <div className="gallery-grid">
              {loadingEmoji ? (
                <div className="text-center">Cargando emojis…</div>
              ) : emojiDesigns.length > 0 ? (
                emojiDesigns.map((emoji) => (
                  <div
                    key={emoji.id}
                    className="gallery-item"
                    onClick={() => setModalImage(emoji)}
                  >
                    <img src={emoji.src} alt={emoji.alt} className="gallery-img" />
                    <div className="gallery-overlay">
                      <div>{emoji.title}</div>
                      <div style={{ fontSize: '0.85em', marginTop: '4px', color: '#ffd700' }}>
                        ${emoji.price ? emoji.price.toLocaleString('es-CO') : '0'} COP
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted">No hay emojis disponibles.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE VISTA PREVIA */}
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
                <div className="mt-3" style={{ fontSize: '1.1em', fontWeight: 'bold', color: '#17BEBB' }}>
                  Precio: ${modalImage.price ? modalImage.price.toLocaleString('es-CO') : '0'} COP
                </div>
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
