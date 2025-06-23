import React, { useState } from 'react';
import '../scss/ProveedorForm.scss';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const ProveedorForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tieneLocal: '',
    direccion: '',
    descripcion: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Solo mostrar modal
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate('/'); // Redirige al inicio
  };

  return (
    <div className="form-container">
      {/* Fondo animado */}
      <div className="bg-particles">
        <div className="particle particle-1" />
        <div className="particle particle-2" />
        <div className="particle particle-3" />
      </div>

      <div className="form-card expanded">
        {/* Botón de cerrar */}
        <button className="close-button" onClick={() => navigate('/')}>
          <CloseIcon />
        </button>

        <div className="form-header">
          <h1>Registro de Proveedores</h1>
          <div className="accent-line"></div>
          <p className="form-description">
            Queremos conocerte. Diligencia el siguiente formulario para ser parte de nuestra red de proveedores.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-content grid-form">
          <div className="input-container-i">
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <label>Nombre completo</label>
            <div className="input-line"></div>
          </div>

          <div className="input-container-i">
            <input
              type="text"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
            />
            <label>Correo electrónico</label>
            <div className="input-line"></div>
          </div>

          <div className="input-container-i">
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
            <label>Teléfono</label>
            <div className="input-line"></div>
          </div>

          <div className="input-container-i">
            <select
              name="tieneLocal"
              value={formData.tieneLocal}
              onChange={handleChange}
              required
            >
              <option value="" disabled></option>
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            <label>¿Tienes un local?</label>
            <div className="input-line"></div>
          </div>

          {formData.tieneLocal === 'si' && (
            <div className="input-container-i full-width">
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
              <label>Dirección del local</label>
              <div className="input-line"></div>
            </div>
          )}

          <div className="input-container-i full-width">
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              required
            />
            <label>Describe brevemente los productos que ofreces</label>
            <div className="input-line"></div>
          </div>

          <button type="submit" className="submit-button full-width">Enviar</button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>¡Muchas gracias!</h2>
            <p>Te estaremos avisando.</p>
            <button onClick={closeModal} className="submit-button">Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedorForm;
