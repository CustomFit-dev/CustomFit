import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'; 

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
                    backgroundColor: '#1976d2',
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

const Form_I = ({ onClose }) => {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [codigo, setCodigo] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            correo_electronico: correoElectronico,
            codigo,
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
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                        <div className="mydict">
                            <div>
                                <Link to="/Iniciar">
                                    <span>Inicio</span>
                                </Link>
                                <Link to="/Home">
                                    <span>Registrar</span>
                                </Link>
                            </div>
                        </div>
                        <h1>Iniciar Sesión</h1>
                        <div className='form-con'>
                            <div className="form-group col-md-6">
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
                            <Button type='submit' variant="contained">
                                Iniciar sesión
                            </Button>
                            <div className="fondo">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
}

export default Form_I;
