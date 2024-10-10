// src/components/Form.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './authcontext'; // Asegúrate de la ruta correcta
import Button from '@mui/material/Button';
import axios from 'axios';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  /* Tus estilos aquí */
  .img {
    width: 90%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-bottom: 10px;
    margin-left: 40px;
  }

  .img img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }

  .form {
    --black: #000000;
    --ch-black: #141414;
    --eer-black: #1b1b1b;
    --night-rider: #2e2e2e;
    --white: #ffffff;
    --af-white: #f3f3f3;
    --ch-white: #e1e1e1;
    --tomato: #fa5656;
    font-family: Helvetica, sans-serif;
    padding: 60px;
    display: flex;
    max-width: 520px;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    color: var(--af-white);
    background-color: var(--black);
    border-radius: 8px;
    position: relative;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }

  .info {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .title {
    color: #17BEBB !important;
    font-size: 1.5rem;
    font-weight: 900;
  }

  .description {
    margin-top: 10px;
    font-size: 1rem;
  }

  .input-fields {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }

  .input-fields input {
    height: 2.5em;
    width: 2.5em;
    outline: none;
    text-align: center;
    font-family: 'Trebuchet MS', Arial, sans-serif;
    font-size: 1.5rem;
    border-radius: 5px;
    border: 2px solid #17BEBB;
    background-color: transparent;
  }

  .input-fields input:focus {
    border: 2px solid #0f9c99;
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
    transition: 0.5s;
  }

  .action-btns {
    display: flex;
    margin-top: 20px;
    gap: 10px;
  }

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: var(--night-rider);
    color: var(--ch-white);
    height: 30px;
    width: 30px;
    display: grid;
    place-items: center;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.5s ease;
  }

  .close:hover {
    background-color: var(--tomato);
    color: var(--white);
  }

  .error-message {
    color: var(--tomato);
    margin-top: 10px;
  }
`;

const ReenviarLink = styled.a`
  color: #17BEBB !important; 
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: #0f9c99; 
  }
`;

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtener la función de login del contexto
  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');

  const handleInputChange = (index, value) => {
    const newCodigo = [...codigo];
    newCodigo[index] = value.slice(0, 1);
    setCodigo(newCodigo);

    if (value && index < 5) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleVerificarCodigo = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const codigoVerificacion = codigo.join('');

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        correo_electronico: location.state?.correo,
        codigo_verificacion: codigoVerificacion,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data.status === 'ok') {
        // Extraer los datos del usuario desde la respuesta
        const userData = {
          nombreUsuario: response.data.nombre_usuario, // Asegúrate de que este campo exista en la respuesta del backend
          nombres: response.data.nombres,
          apellidos: response.data.apellidos,
          correoElectronico: response.data.correo_electronico,
          avatarUrl: response.data.avatar_url || '', // Asegúrate de que el backend envíe este campo si es necesario
        };
        const token = response.data.token;

        // Usar la función login del contexto
        login(userData, token);

        alert(`Bienvenido ${response.data.nombre_usuario}`);
        navigate('/Home_L');
      } else {
        throw new Error(response.data.message || 'Error de autenticación');
      }
    } catch (error) {
      console.error('Error en la verificación:', error);
      setError(
        error.response?.data?.message ||
          error.message ||
          'Ocurrió un error durante la verificación. Por favor, inténtelo de nuevo.'
      );
    }
  };

  const handleReenviarCodigo = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del enlace
    console.log('Reenviar código');
    // Implementa la lógica para reenviar el código aquí
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleVerificarCodigo}>
        <span className="close" onClick={() => navigate(-1)}>X</span> {/* Agregar funcionalidad para cerrar el formulario */}

        <div className="info">
          <div className='img'>
            <img src={require('../../img/verifi.png')} alt="Verificación" />
          </div>
          <span className="title">Ingresa el código</span>
          <p className="description">
            Hemos enviado un código de verificación a tu Correo Electrónico.
          </p>
        </div>
          
        <div className="input-fields">
          {codigo.map((value, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="tel"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        <p className="description">
          ¿No recibiste el código?
        </p>

        <ReenviarLink href="#" onClick={handleReenviarCodigo}>
          Reenviar Código
        </ReenviarLink>

        {error && <p className="error-message">{error}</p>}

        <div className="action-btns">
          <Button 
            className='btn1' 
            variant="contained" 
            sx={{ 
              backgroundColor: '#17BEBB', 
              color: 'white', 
              '&:hover': { backgroundColor: '#0f9c99' } 
            }} 
            type="submit" // Cambiar a type="submit"
          >
            Verificar
          </Button>
          <Button 
            variant="outlined" 
            sx={{ 
              borderColor: '#17BEBB', 
              color: 'white', 
              '&:hover': {  backgroundColor: '#0f9c99', borderColor: '#0f9c99' } 
            }} 
            onClick={() => setCodigo(['', '', '', '', '', ''])}>
            Cancelar
          </Button>
        </div>
      </form>
    </StyledWrapper>
  );
};

export default Form;
