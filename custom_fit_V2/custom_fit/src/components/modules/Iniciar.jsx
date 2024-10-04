import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00a99d',
    },
    text: {
      primary: '#00a99d',
    },
  },
});

const Form_I = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEnviarCodigo = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/enviar_codigo/', {
        correo_electronico: correoElectronico,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      alert('Código enviado al correo electrónico.');
      // Redirigir al componente de verificación con el correo
      navigate('/Verificar', { state: { correo: correoElectronico } });
    } catch (error) {
      console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
      setError('Error al enviar el código. Inténtalo nuevamente.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Ingresar correo</h1>
        <TextField
          label="Correo Electrónico"
          type="email"
          variant="standard"
          value={correoElectronico}
          onChange={(e) => setCorreoElectronico(e.target.value)}
          error={!!error}
          helperText={error || ''}
        />
        <Button variant="contained" onClick={handleEnviarCodigo}>Enviar Código</Button>
      </div>
    </ThemeProvider>
  );
};

export default Form_I;
