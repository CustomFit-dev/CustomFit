import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from '@mui/material';

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
                        color: '#ffffff', // Color del texto
                    },
                    '& .MuiInputLabel-root': {
                        color: '#ffffff', // Color del label
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: '#00a99d', // Color del borde antes de focus
                    },
                    '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#00a99d', // Color del borde al hover
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#00a99d', // Color del borde después de focus
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: '10px', // Margen del botón
                    padding: '10px 20px', // Padding del botón
                    backgroundColor: '#1976d2', // Color de fondo
                    color: '#ffffff', // Color del texto
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#ffffff', // Color del ícono
                },
            },
        },
    },
});

const Form = ({ onClose }) => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [celular, setCelular] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [confCorreoElectronico, setConfCorreoElectronico] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            nombres,
            apellidos,
            nombre_usuario: nombreUsuario, // Asegúrate de que los nombres de las claves coincidan con los del modelo en Django
            celular,
            correo_electronico: correoElectronico,
            conf_correo_electronico: confCorreoElectronico,
        };

        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registro exitoso:', data);
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
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
                                <label>
                                    <input type="radio" name="radio" />
                                    <span><Link to="/">Inicio</Link></span>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span>Registro</span>
                                </label>
                            </div>
                        </div>
                        <h1>Registrate</h1>
                        <div className='form-con'>
                            <div className="form-group col-md-6" id='input1'>
                                <TextField
                                    id="Nombres"
                                    label="Nombres"
                                    variant="standard"
                                    color="primary"
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value)}
                                />
                                <TextField
                                    id="Apellidos"
                                    label="Apellidos"
                                    variant="standard"
                                    color="primary"
                                    value={apellidos}
                                    onChange={(e) => setApellidos(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6" id='input2'>
                                <TextField
                                    id="nombre-usuario"
                                    label="Nombre De Usuario"
                                    variant="standard"
                                    color="primary"
                                    value={nombreUsuario}
                                    onChange={(e) => setNombreUsuario(e.target.value)}
                                />
                                <TextField
                                    id="Celular"
                                    label="Celular"
                                    variant="standard"
                                    color="primary"
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6" id='input1'>
                                <TextField
                                    id="correo-electronico"
                                    label="Correo Electronico"
                                    type="email"
                                    variant="standard"
                                    color="primary"
                                    value={correoElectronico}
                                    onChange={(e) => setCorreoElectronico(e.target.value)}
                                />
                                <TextField
                                    id="Con-correoelectronico"
                                    label="Confirmar email"
                                    variant="standard"
                                    type="email"
                                    color="primary"
                                    value={confCorreoElectronico}
                                    onChange={(e) => setConfCorreoElectronico(e.target.value)}
                                />
                            </div>
                            <Button type='submit' variant="contained">
                                Registrar
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

export default Form;
