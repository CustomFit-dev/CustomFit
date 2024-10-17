import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../scss/iniciar.scss'; // Asegúrate de que la ruta del archivo SCSS esté correcta
import Nav from '../modules/Nav';
import { colors } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#00a99d',
    },
    text: {
      primary: '#00a99d',
    },
  },
  components: {
        MuiTextField: {
    styleOverrides: {
        root: {
            
          margin: '10px auto', /* Esto centrará el TextField horizontalmente */
            '& .MuiInputBase-root': {
                color: '#ffffff',
                width: '400px',
                
            },
            '& .MuiInputLabel-root': {
                color: '#ffffff',
            },
            '& .MuiInput-underline:before': {
                borderBottomColor: '#00a99d',
            },
            '& .MuiInput-underline:hover:before': {
                borderBottomColor: '#00a99d',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#00a99d',
            },
        },
    },
},

       MuiButton: {
    styleOverrides: {
        root: {
            margin: '10px auto', /* Esto centrará el botón horizontalmente */
            padding: '10px 20px',
            backgroundColor: 'transparent',
            border: '1px solid #00a99d',
            color: '#ffffff',
            display: 'block',
            marginTop: '40px',
        },
    },
},

        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff',
                },
            },
        },
    },
});

const Form_I = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnviarCodigo = async () => {
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
    <ThemeProvider theme={theme}>
      <form>
        <div className="form-row1 glow1">
      <div className='btnx'>
          <IconButton className="salirx1" onClick={() => navigate('/login')}>
            <CloseIcon />
          </IconButton>
          <Nav /> 
          </div>
          <h1>Iniciar sesion</h1>
          <p>Déjanos tu correo y te enviaremos 
          un código para que puedas continuar.</p>
          <div className="form-group1">
            <TextField
              id="correo-electronico"
              label="Correo Electrónico"
              type="email"
              variant="standard"
              color="primary"
              value={correoElectronico}
              onChange={(e) => setCorreoElectronico(e.target.value)}
              error={!!error}
              helperText={error || ''}
              className="text-field1"
            />
          </div>
          <p>¿Problemas para iniciar sesión?</p>
          <p style={{ color: '#00a99d' }}> Contáctanos</p>

          <Button 
            variant="contained" 
            onClick={handleEnviarCodigo}
            disabled={loading}
            className="submit-button1"
          >
            Enviar Código
          </Button>
        </div>
      </form>
    </ThemeProvider>
  );
};

export default Form_I;
