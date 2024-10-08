import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const Verificar = () => {
  const location = useLocation();  
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const handleVerificarCodigo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        correo_electronico: location.state.correo,  
        codigo_verificacion: codigo,
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
    <div>
      <h1>Verificar Código</h1>
      <TextField
        label="Código de Verificación"
        variant="standard"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        error={!!error}
        helperText={error || ''}
      />
      <Button variant="contained" onClick={handleVerificarCodigo}>Verificar</Button>
    </div>
  );
};

export default Verificar;
