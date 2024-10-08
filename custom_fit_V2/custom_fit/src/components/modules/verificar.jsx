import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import styled from 'styled-components';

const Form = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState(['', '', '', '','','']); // Estado para múltiples entradas
  const [error, setError] = useState('');

  const handleInputChange = (index, value) => {
    const newCodigo = [...codigo];
    newCodigo[index] = value.slice(0, 1); // Limitar a un solo carácter
    setCodigo(newCodigo);

    // Mover el foco al siguiente input
    if (value && index < 3) {
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  const handleVerificarCodigo = async () => {
    const codigoVerificacion = codigo.join(''); // Unir los caracteres del código

    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        correo_electronico: location.state.correo,
        codigo_verificacion: codigoVerificacion,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 && response.data.status === 'ok') {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('nombreUsuario', response.data.nombre_usuario);
        localStorage.setItem('nombres', response.data.nombres);
        localStorage.setItem('apellidos', response.data.apellidos);
        localStorage.setItem('correoElectronico', response.data.correo_electronico);

        alert(`Bienvenido ${response.data.nombre_usuario}`);
        navigate('/dashboard');
      } else {
        throw new Error(response.data.message || 'Error de autenticación');
      }
    } catch (error) {
      console.error('Error en la verificación:', error);
      setError(error.message || 'Ocurrió un error durante la verificación. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <StyledWrapper>
      <form className="form">
        <span className="close">X</span>

        <div className="info">
          <span className="title">Verificar Código</span>
          <p className="description">
            Introduzca el código de verificación proporcionado.
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
              onFocus={(e) => e.target.select()} // Seleccionar texto al enfocar
            />
          ))}
        </div>

        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}

        <div className="action-btns">
          <Button variant="contained" onClick={handleVerificarCodigo}>Verificar</Button>
          <Button variant="outlined" onClick={() => setCodigo(['', '', '', ''])}>Limpiar</Button>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
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
    padding: 25px;
    display: flex;
    max-width: 420px;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    color: var(--af-white);
    background-color: var(--black);
    border-radius: 8px;
    position: relative;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, .1);
  }

  .info {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .title {
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
    gap: 10px; /* Espaciado entre inputs */
  }

  .input-fields input {
    height: 2.5em;
    width: 2.5em;
    outline: none;
    text-align: center;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-size: 1.5rem;
    color: var(--af-white);
    border-radius: 5px;
    border: 2.5px solid var(--eer-black);
    background-color: var(--eer-black);
  }

  .input-fields input:focus {
    border: 1px solid var(--af-white);
    box-shadow: inset 10px 10px 10px rgba(0, 0, 0, .15);
    transform: scale(1.05);
    transition: 0.5s;
  }

  .action-btns {
    display: flex;
    margin-top: 20px;
    gap: 10px; /* Espaciado entre botones */
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
    transition: .5s ease;
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

export default Form;
