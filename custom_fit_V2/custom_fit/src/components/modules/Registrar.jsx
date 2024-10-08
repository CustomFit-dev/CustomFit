import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';



import {
    validateApe,
    validatecel,
    validateEmail,
    validateNom,
    validatenom_u,
    validateEmailconf

} from './validation';
import Nav from '../modules/Nav';

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
                    marginLeft: '150px',
                    marginRight: 'auto',
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

const Form_R = () => {
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [celular, setCelular] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [confCorreoElectronico, setConfCorreoElectronico] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const errores = {
            nombres: validateNom(nombres),
            apellidos: validateApe(apellidos),
            nombreUsuario: validatenom_u(nombreUsuario),
            celular: validatecel(celular),
            correoElectronico: validateEmail(correoElectronico),
            confCorreoElectronico: validateEmailconf(confCorreoElectronico, correoElectronico),
        }
        setErrors(errores);
        return Object.values(errores).every(error =>!error);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('Por favor, revisa los campos del formulario.');
            return;
        }
        setLoading(true);

        const formData = {
            nombres,
            apellidos,
            nombre_usuario: nombreUsuario,
            celular,
            correo_electronico: correoElectronico,
            conf_correo_electronico: confCorreoElectronico,
            rol: 1, 
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
                alert('Datos enviados. Por favor, confirma que todo está correcto.');
                navigate('/Iniciar');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                alert('Error al enviar los datos. Por favor, inténtalo de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la conexión. Por favor, verifica tu conexión a internet y vuelve a intentarlo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit}>
                    <div className="form-row glow">
                        <IconButton className="salirx" onClick={() => navigate('/login')}>
                            <CloseIcon />
                        </IconButton>
                        <Nav /> 
                        <h1>Registrate</h1>
                        <div className='form-con'>
                        <div className="fondo"></div>
                            <div className="form-group col-md-6" id='input1'>
                                <TextField
                                    id="Nombres"
                                    label="Nombres"
                                    variant="standard"
                                    color="primary"
                                    value={nombres}
                                    error={!!errors.nombres}
                                    helperText={errors.nombres}
                                    onChange={(e) => setNombres(e.target.value)}
                                />
                                <TextField
                                    id="Apellidos"
                                    label="Apellidos"
                                    variant="standard"
                                    color="primary"
                                    value={apellidos}
                                    error={!!errors.apellidos}
                                    helperText={errors.apellidos}
                                    onChange={(e) => setApellidos(e.target.value)}
                                />
                            </div>
                            <div className="form-group col-md-6" id='input2'>
                                <TextField
                                    id="nombre-usuario"
                                    label="Nombre De Usuario"
                                    variant="standard"
                                    color="primary"
                                    error={!!errors.nombreUsuario}
                                    helperText={errors.nombreUsuario}
                                    value={nombreUsuario}
                                    onChange={(e) => setNombreUsuario(e.target.value)}
                                />
                                <TextField
                                    id="Celular"
                                    label="Celular"
                                    variant="standard"
                                    color="primary"
                                    value={celular}
                                    type='number'
                                    error={!!errors.celular}
                                    helperText={errors.celular}
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
                                    error={!!errors.correoElectronico}
                                    helperText={errors.correoElectronico}
                                    onChange={(e) => setCorreoElectronico(e.target.value)}
                                />
                                <TextField
                                    id="Con-correoelectronico"
                                    label="Confirmar email"
                                    variant="standard"
                                    type="email"
                                    color="primary"
                                    value={confCorreoElectronico}
                                    error={!!errors.confCorreoElectronico}
                                    helperText={errors.confCorreoElectronico || ''}
                                    onChange={(e) => setConfCorreoElectronico(e.target.value)}
                                />
                                
                            </div>
                            <div className='redes'>
                            <div class="separator">
                                <div></div>
                                <span> O inicia sesión con </span>
                                <div></div>
                                </div>
                                
                                <div className='bntredes'>
                                <button type='button' className='Google1'> 
                                <div class="sign">

                                <FontAwesomeIcon icon={faGoogle} size="lg" style={{color: "#ffffff",}} />
                                <div class="text">Google</div>
                                </div>
                                </button>

                                <button type='button' className='Fecebook'>
                                <div class="sign">
                                <FontAwesomeIcon icon={faFacebook} size="lg" style={{color: "#ffffff",}}/>
                                <div class="text1">Facebook</div>
                                </div>
                                
                                </button>
                                <button type='button' className='Github'>
                                <div class="sign">
                                <FontAwesomeIcon icon={faGithub} size="lg" />
                                <div class="text2">GitHub</div>
                                </div>

                                </button>
                                <button type='button' className='Microsoft'>
                                <div class="sign">
                                <FontAwesomeIcon icon={faMicrosoft} size="lg" />
                                <div class="text3">Microsoft</div>
                                </div>

                                </button>
                                    </div>
                                    
                            </div>
                            <Button 
                                type='submit' 
                                variant="contained"
                                disabled={loading}
                            >
                                Registrar
                            </Button>
                        </div>
                    </div>
                </form>
        </ThemeProvider>
    );
};

export default Form_R;
