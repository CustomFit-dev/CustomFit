import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../scss/iniciar.scss'; // Assuming you'll integrate the new CSS here

const Form_I = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnviarCodigo = async () => {
    if (!correoElectronico) {
      setError('Por favor ingresa tu correo electrónico');
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8000/api/enviar_codigo/', {
        correo_electronico: correoElectronico,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      alert('Código enviado al correo electrónico.');
      navigate('/Verificar', { state: { correo: correoElectronico } });
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
      setError('Error al enviar el código. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Background particles */}
      <div className="bg-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>
      
      <div className="login-card">
        <div className="close-button">
          <button onClick={() => navigate('/login')}>
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
            <div className="input-container">
              <input
                type="email"
                id="correo-electronico"
                value={correoElectronico}
                onChange={(e) => setCorreoElectronico(e.target.value)}
                className={error ? "error" : ""}
                required
              />
              <label htmlFor="correo-electronico">Correo Electrónico</label>
              <div className="input-line"></div>
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
          
          <p className="help-text">¿Problemas para iniciar sesión?</p>
          <a href="#" className="contact-link">Contáctanos</a>
          
          <button 
            className={`submit-button ${loading ? 'loading' : ''}`}
            onClick={handleEnviarCodigo}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              'Enviar Código'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form_I;