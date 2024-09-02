import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    validateEmail,
    validateCode
} from './validation';
import Nav from './Nav';

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
                    margin: '10px',
                    '& .MuiInputBase-root': {
                        color: '#ffffff',
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
                    margin: '10px',
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    border: '1px solid #00a99d',
                    color: '#ffffff',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
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

const enviarCodigo = async (correoElectronico, setCodigoEnviado) => {
    try {
        const response = await axios.post('http://localhost:8000/api/enviar_codigo/', {
            correo_electronico: correoElectronico
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Código enviado:', response.data.message);
        alert('Código enviado al correo electrónico.');
        setCodigoEnviado(response.data.codigo); 
    } catch (error) {
        console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
        alert('Error al enviar el código.');
    }
};

const Form_I = ({ onClose }) => {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [codigo, setCodigo] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleEnviarCodigo = async () => {
        await enviarCodigo(correoElectronico, setCodigoEnviado);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const validateForm = () => {
            const errores = {
                correoElectronico: validateEmail(correoElectronico),
                codigo: validateCode(codigo),
            };
            setErrors(errores);
            return Object.values(errores).every(error => !error);
        };
    
        if (!validateForm()) {
            return;
        }

        const codigoInt = parseInt(codigo);

        try {
            const formData = {
                correo_electronico: correoElectronico,
                codigo_verificacion: codigoInt,
            };

            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Inicio de sesión exitoso:', data);
                const Usuario_actual = data.user && Object.keys(data.user).length > 0 ? data.user : null;
                navigate('/Home_L');
            } else {
                const errorData = await response.json();
                console.error('Inicio de sesión fallido:', errorData);
                alert(errorData.message || 'Código de verificación incorrecto o expirado.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la conexión. Por favor, verifica tu conexión a internet y vuelve a intentarlo.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <IconButton className="salirx" onClick={() => navigate('/login')}>
                        <CloseIcon />
                    </IconButton>
                    <Nav />
                    <div id="h1inicio">
                        <h1>Iniciar Sesión</h1>
                    </div>
                    <div className="form-con">
                        <div className="form-group col-md-6" id="inputin">
                            <TextField
                            id="correo-electronico"
                            label="Correo Electrónico"
                            type="email"
                            variant="standard"
                            color="primary"
                            value={correoElectronico}
                            error={!!errors.correoElectronico}
                            helperText={errors.correoElectronico || ''}
                            onChange={(e) => setCorreoElectronico(e.target.value)}
                            />
                            <TextField
                            id="codigo"
                            label="Código"
                            variant="standard"
                            color="primary"
                            value={codigo}
                            type='number'
                            onChange={(e) => setCodigo(e.target.value)}
                            error={!!errors.codigo} 
                            helperText={errors.codigo || ''}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        </div>
                        <div className="btnIncio" id="bott">
                            <Button 
                                type='submit' 
                                variant="contained"
                                id="bot"
                            >
                                Iniciar sesión
                            </Button>
                            <Button
                                id="bot"
                                type='button'
                                variant="outlined"
                                onClick={handleEnviarCodigo}
                            >
                                Enviar Código
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </ThemeProvider>
    );
};

export default Form_I;