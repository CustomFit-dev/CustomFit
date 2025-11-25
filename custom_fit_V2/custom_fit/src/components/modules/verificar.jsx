import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext';
import axios from 'axios';
import '../../scss/verificar.scss';

const Form = ({ correo, onClose, onSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);

    if (!correo) {
      setError('No se ha proporcionado un correo electrónico');
      console.error('Error: No se ha proporcionado un correo electrónico.');
    } else {
      console.log('Correo recibido correctamente:', correo);
    }
  }, [correo]);

  const handleInputChange = (index, value) => {
    setError('');
    if (value && !/^\d*$/.test(value)) return;

    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const isCodeComplete = () => codigo.every(digit => digit !== '');

  const handleVerificarCodigo = async (e) => {
    e.preventDefault();
    if (!isCodeComplete()) {
      setError('Por favor ingresa el código completo de 6 dígitos');
      return;
    }
    if (!correo) {
      setError('No se ha proporcionado un correo electrónico');
      return;
    }

    const codigoVerificacion = codigo.join('');
    setIsLoading(true);

    try {
      console.log('Enviando solicitud con:', { correo_electronico: correo, codigo_verificacion: codigoVerificacion });

      const response = await axios.post('http://localhost:8000/api/login/', {
        correo_electronico: correo,
        codigo_verificacion: codigoVerificacion,
      });

      console.log('Respuesta del servidor:', response.data);

      const responseData = response.data;

      if (response.status === 200 && responseData.status === 'ok') {
        if (!responseData.token) throw new Error('Respuesta incompleta del servidor: falta token');

        // Mapear rol numérico a string
        const mapRolNumericoAString = (rolNumerico) => {
          const rolesMap = { 1: 'usuario', 2: 'administrador', 3: 'proveedor', 4: 'domiciliario' };
          return rolesMap[rolNumerico] || 'usuario';
        };

        const userData = {
          nombreUsuario: responseData.nombre_usuario || '',
          nombres: responseData.nombres || '',
          apellidos: responseData.apellidos || '',
          correoElectronico: responseData.correo_electronico || correo,
          avatarUrl: responseData.avatar_url || '',
          celular: responseData.celular || '',
          rol: mapRolNumericoAString(responseData.rol),
        };

        // Guardar token en localStorage
        localStorage.setItem('authToken', responseData.token);

        // Login con auth context
        login(userData, responseData.token);

        console.log('Redirigiendo según rol:', userData.rol);
        switch (userData.rol) {
          case 'usuario':
            navigate('/Home_L');
            break;
          case 'proveedor':
            navigate('/Prove');
            break;
          case 'domiciliario':
            navigate('/home_domiciliario');
            break;
          case 'administrador':
            navigate('/Admin');
            break;
          default:
            console.warn('Rol no reconocido para navegación:', userData.rol);
        }

        if (onSuccess) onSuccess(userData);
      } else {
        throw new Error(responseData.message || 'Error de autenticación');
      }
    } catch (error) {
      console.error('Error en la verificación:', error);
      if (error.response) {
        setError(error.response.data.message || 'Código incorrecto o expirado');
      } else if (error.request) {
        setError('Error de conexión. Por favor, inténtalo nuevamente.');
      } else {
        setError(error.message || 'Error al verificar el código');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReenviarCodigo = async (e) => {
    e.preventDefault();
    if (!correo) return setError('No se ha proporcionado un correo electrónico');

    setIsLoading(true);
    try {
      await axios.post('http://localhost:8000/api/enviar_codigo/', { correo_electronico: correo });
      alert('Se ha enviado un nuevo código a tu correo electrónico');
      setCodigo(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } catch (error) {
      console.error('Error al reenviar el código:', error);
      if (error.response) setError(error.response.data.message || 'No se pudo reenviar el código');
      else if (error.request) setError('Error de conexión. Verifica tu conexión a internet.');
      else setError('Error al reenviar el código');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedText)) {
      setCodigo(pastedText.split(''));
      inputsRef.current[5]?.focus();
    }
  };

  return (
    <div className="verification-container">
      <div className="bg-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      <div className="verification-form-wrapper">
        <button onClick={onClose} className="close-button"><h1>x</h1></button>

        <div className="form-container">
          <div className="form-content">
            <div className="form-header">
              <h2 className="form-title">Ingresa el código</h2>
              <p className="form-description">Hemos enviado un código de verificación a {correo || 'tu correo electrónico'}.</p>
              {!correo && <p className="form-description error-text">No se ha detectado un correo electrónico. Intenta cerrar y volver a iniciar sesión.</p>}
            </div>

            <form onSubmit={handleVerificarCodigo} onPaste={handlePaste} aria-describedby={error ? 'verify-error' : undefined}>
              <div className="code-inputs">
                {codigo.map((value, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    className="code-input"
                    ref={(el) => (inputsRef.current[index] = el)}
                    disabled={isLoading}
                    autoComplete="one-time-code"
                    aria-label={`Dígito ${index + 1} del código de verificación`}
                    aria-invalid={!!error}
                    aria-describedby={error ? 'verify-error' : undefined}
                  />
                ))}
              </div>

              {error && <div id="verify-error" role="alert" aria-live="polite" className="error-message">{error}</div>}

              <div className="resend-section">
                <p className="resend-text">¿No recibiste el código?</p>
                <button onClick={handleReenviarCodigo} className="resend-link" disabled={isLoading || !correo} type="button">Reenviar Código</button>
              </div>

              <div className="form-buttons">
                <button type="submit" className="verify-button" disabled={isLoading || !isCodeComplete() || !correo}>
                  {isLoading ? 'Verificando...' : 'Verificar'}
                </button>
                <button type="button" onClick={() => { setCodigo(['', '', '', '', '', '']); setError(''); inputsRef.current[0]?.focus(); }} className="cancel-button" disabled={isLoading}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
