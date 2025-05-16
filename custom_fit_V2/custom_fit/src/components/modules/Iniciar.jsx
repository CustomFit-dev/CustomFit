import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../scss/iniciar.scss';
import Form from '../modules/verificar'; // Modal de verificación

const Form_I = ({ onClose }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const navigate = useNavigate();

  const handleEnviarCodigo = async () => {
    // Validar que el correo no esté vacío
    if (!correoElectronico || !correoElectronico.trim()) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }

    // Validación básica de formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoElectronico)) {
      setError('Por favor ingresa un correo electrónico válido');
      return;
    }

    try {
      setLoading(true);
      setError(''); // Limpiar errores previos
      
      // Llamada al endpoint para enviar código
      const response = await axios.post('http://localhost:8000/api/enviar_codigo/', {
        correo_electronico: correoElectronico,
      });

      console.log('Respuesta del servidor:', response.data);
      
      if (response.data && response.status === 200) {
        // No mostrar alert aquí para mejorar la experiencia de usuario
        setShowVerifyModal(true); // Mostrar el modal de verificación
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      
      // Mostrar mensaje de error apropiado
      if (error.response) {
        // El servidor respondió con un código de error
        setError(error.response.data.message || 'Error al enviar el código. Inténtalo nuevamente.');
      } else if (error.request) {
        // No se recibió respuesta del servidor
        setError('No se pudo conectar con el servidor. Verifica tu conexión.');
      } else {
        // Error en la configuración de la solicitud
        setError('Error al enviar el código. Inténtalo nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Manejar la tecla Enter en el input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEnviarCodigo();
    }
  };

  // Cerrar el modal de verificación y volver al inicio
  const handleCloseVerifyModal = () => {
    setShowVerifyModal(false);
    // Opcionalmente, limpiar el correo después de cerrar
    setCorreoElectronico('');
  };

  // Redirigir después de verificación exitosa
  const handleSuccessfulVerification = (userData) => {
    // Esta función se llamará desde el componente de verificación
    // cuando la verificación sea exitosa
    setShowVerifyModal(false);
    navigate('/Home_L');
  };

  return (
    <>
      {!showVerifyModal ? (
        // Solo mostrar el formulario de correo si no se está mostrando el modal de verificación
        <div className="login-container">
          <div className="bg-particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>

          <div className="login-card">
            <div className="close-button">
              <button onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

              <p className="login-description">Déjanos tu correo y te enviaremos un código para que puedas continuar.</p>

              <div className="form-group">
                <div className="input-container-i">
                  <input
                    type="email"
                    id="correo-electronico"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={`${error ? 'error' : ''} ${correoElectronico.trim() ? 'not-empty' : ''}`}
                    required
                    autoComplete="email"
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
        // Mostrar el componente de verificación cuando showVerifyModal es true
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