import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
                    border:'1px solid #00a99d',
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

const enviarCodigo = async (correoElectronico) => {
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
    } catch (error) {
        console.error('Error en la solicitud:', error.response ? error.response.data : error.message);
        alert('Error al enviar el código.');
    }
};
const Form_I = ({ onClose }) => {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [codigo, setCodigo] = useState('');
    const [correoCodigoEnviado, setCorreoCodigoEnviado] = useState('');
    const navigate = useNavigate();

    const handleEnviarCodigo = async () => {
        const codigoEnviado = await enviarCodigo(correoElectronico);
        if (codigoEnviado) {
            setCorreoCodigoEnviado(correoElectronico);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (correoElectronico !== correoCodigoEnviado) {
            alert('El correo electrónico no coincide con el correo al que se envió el código.');
            return;
        }

        const formData = {
            correo_electronico: correoElectronico,
            codigo_verificacion: codigo,
        };

        try {
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
            } else {
                const errorData = await response.json();
                console.error('Inicio de sesión fallido:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div id='oscure'>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <IconButton className="salirx" onClick={() => navigate('/login')}>
                            <CloseIcon />
                        </IconButton>
                        <div className="mydict">
                            <div>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span><Link to="/Iniciar">Inicio</Link></span>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span>Registro</span>
                                </label>
                            </div>
                        </div>
                        <h1 id="h1inicio">Iniciar Sesión</h1>
                        <div className='form-con'>
                            <div className="form-group col-md-6" id="inputin">
                                <TextField
                                    id="correo-electronico"
                                    label="Correo Electrónico"
                                    type="email"
                                    variant="standard"
                                    color="primary"
                                    value={correoElectronico}
                                    onChange={(e) => setCorreoElectronico(e.target.value)}
                                />
                                <TextField
                                    id="codigo"
                                    label="Código"
                                    variant="standard"
                                    color="primary"
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                />
                            </div>
                            <div className="btnIncio">
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
                            <div className="fondoInicio">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
}

export default Form_I;
