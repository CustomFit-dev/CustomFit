import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

const Form_I = ({ onClose }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const navigate = useNavigate();

  const API = process.env.REACT_APP_API_URL || process.env.API_URL;

  const handleEnviarCodigo = async () => {
    if (!correoElectronico || !correoElectronico.trim()) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoElectronico)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.post(
        `${API}enviar_codigo/`,
        { correo_electronico: correoElectronico }
      );

      console.log('Respuesta del servidor:', response.data);

      if (response.data && response.status === 200) {
        setShowVerifyModal(true);
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);

      if (error.response) {
        setError(
          error.response.data.message ||
          'Error al enviar el código. Inténtalo nuevamente.'
        );
      } else if (error.request) {
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        setError('Error al enviar el código. Inténtalo nuevamente.');
      }

    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleEnviarCodigo();
  };

  const handleCloseVerifyModal = () => {
    setShowVerifyModal(false);
    setCorreoElectronico('');
  };

  const handleSuccessfulVerification = (userData) => {
    setShowVerifyModal(false);

    const roleId = userData.rol_id || (userData.rol && userData.rol.id);

    switch (roleId) {
      case 1:
        navigate('/Home_L');
        break;
      case 2:
        navigate('/Admin');
        break;
      case 3:
        navigate('/Prove');
        break;
      default:
        break;
    }
  };

  return (
    <>
      {!showVerifyModal ? (
        <div className="login-container">
          <div className="bg-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>

          <div className="login-card">
            <div className="close-button">
              <button onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="login-content">
              <div className="login-header">
                <h1>Iniciar sesión</h1>
                <div className="accent-line"></div>
              </div>

              <p className="login-description">
                Déjanos tu correo y te enviaremos un código para que puedas continuar.
              </p>

              <div className="form-group">
                <div className="input-container-i">
                  <input
                    type="email"
                    id="correo-electronico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`${error ? 'error' : ''} ${correoElectronico.trim() ? 'not-empty' : ''}`}
                    aria-invalid={!!error}
                    required
                  />
                  <label htmlFor="correo-electronico">Correo Electrónico</label>
                  <div className="input-line"></div>
                </div>

                {error && <p className="error-message">{error}</p>}
              </div>

              <p className="help-text">¿Problemas para iniciar sesión?</p>
              <a href="Home" className="contact-link">Contáctanos</a>

              <button
                className={`submit-button ${loading ? 'loading' : ''}`}
                onClick={handleEnviarCodigo}
                disabled={loading}
              >
                {loading ? <div className="spinner"></div> : 'Enviar Código'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Form
          correo={correoElectronico}
          onClose={handleCloseVerifyModal}
          onSuccess={handleSuccessfulVerification}
        />
      )}
    </>
  );
};

export default Form_I;
