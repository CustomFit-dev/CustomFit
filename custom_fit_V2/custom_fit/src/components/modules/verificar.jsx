import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const Verificar = () => {
  const location = useLocation();  // Obtener el correo pasado desde Form_I
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');

  const handleVerificarCodigo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        correo_electronico: location.state.correo,  // Usar el correo pasado desde Form_I
        codigo_verificacion: codigo,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Almacenar el nombre del usuario en localStorage
      localStorage.setItem('nombreUsuario', response.data.nombre_usuario);
      alert(`Bienvenido ${response.data.nombre_usuario}`);
      
      // Redirigir a la página de inicio o dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error en la verificación:', error.response ? error.response.data : error.message);
      setError('Código incorrecto. Inténtalo nuevamente.');
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
