import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import '../../scss/form.scss'; // Assuming you'll integrate the new CSS here
import {
    validateApe,
    validatecel,
    validateEmail,
    validateNom,
    validatenom_u,
    validateEmailconf
} from './validation';

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
        return Object.values(errores).every(error => !error);
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
            user_id: 123,
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
                console.error('Error en el registro:', errorData);
                if (errorData.errors) {
                    setErrors(errorData.errors);
                }
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
        <div className="register-container">
            {/* Background particles */}
            <div className="bg-particles">
                <div className="particle particle-1"></div>
                <div className="particle particle-2"></div>
                <div className="particle particle-3"></div>
            </div>
            
            <div className="register-card">
                <div className="close-button">
                    <button onClick={() => navigate('/login')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <div className="register-content">
                    <div className="register-header">
                        <h1>Regístrate</h1>
                        <div className="accent-line"></div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-grid">
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="nombres"
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value)}
                                    className={errors.nombres ? "error" : ""}
                                    required
                                />
                                <label htmlFor="nombres">Nombres</label>
                                <div className="input-line"></div>
                                {errors.nombres && <p className="error-message">{errors.nombres}</p>}
                            </div>
                            
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="apellidos"
                                    value={apellidos}
                                    onChange={(e) => setApellidos(e.target.value)}
                                    className={errors.apellidos ? "error" : ""}
                                    required
                                />
                                <label htmlFor="apellidos">Apellidos</label>
                                <div className="input-line"></div>
                                {errors.apellidos && <p className="error-message">{errors.apellidos}</p>}
                            </div>
                            
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="nombre-usuario"
                                    value={nombreUsuario}
                                    onChange={(e) => setNombreUsuario(e.target.value)}
                                    className={errors.nombreUsuario ? "error" : ""}
                                    required
                                />
                                <label htmlFor="nombre-usuario">Nombre de Usuario</label>
                                <div className="input-line"></div>
                                {errors.nombreUsuario && <p className="error-message">{errors.nombreUsuario}</p>}
                            </div>
                            
                            <div className="input-container">
                                <input
                                    type="number"
                                    id="celular"
                                    value={celular}
                                    onChange={(e) => setCelular(e.target.value)}
                                    className={errors.celular ? "error" : ""}
                                    required
                                />
                                <label htmlFor="celular">Celular</label>
                                <div className="input-line"></div>
                                {errors.celular && <p className="error-message">{errors.celular}</p>}
                            </div>
                            
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="correo-electronico"
                                    value={correoElectronico}
                                    onChange={(e) => setCorreoElectronico(e.target.value)}
                                    className={errors.correoElectronico ? "error" : ""}
                                    required
                                />
                                <label htmlFor="correo-electronico">Correo Electrónico</label>
                                <div className="input-line"></div>
                                {errors.correoElectronico && <p className="error-message">{errors.correoElectronico}</p>}
                            </div>
                            
                            <div className="input-container">
                                <input
                                    type="email"
                                    id="conf-correo-electronico"
                                    value={confCorreoElectronico}
                                    onChange={(e) => setConfCorreoElectronico(e.target.value)}
                                    className={errors.confCorreoElectronico ? "error" : ""}
                                    required
                                />
                                <label htmlFor="conf-correo-electronico">Confirmar Email</label>
                                <div className="input-line"></div>
                                {errors.confCorreoElectronico && <p className="error-message">{errors.confCorreoElectronico}</p>}
                            </div>
                        </div>
                        
                        <div className="social-login">
                            <div className="separator">
                                <div className="line"></div>
                                <span>O inicia sesión con</span>
                                <div className="line"></div>
                            </div>
                            
                            <div className="social-buttons">
                                <button type="button" className="social-button google">
                                    <FontAwesomeIcon icon={faGoogle} />
                                    <span>Google</span>
                                </button>
                                
                                <button type="button" className="social-button facebook">
                                    <FontAwesomeIcon icon={faFacebook} />
                                    <span>Facebook</span>
                                </button>
                                
                                <button type="button" className="social-button github">
                                    <FontAwesomeIcon icon={faGithub} />
                                    <span>GitHub</span>
                                </button>
                                
                                <button type="button" className="social-button microsoft">
                                    <FontAwesomeIcon icon={faMicrosoft} />
                                    <span>Microsoft</span>
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className={`submit-button ${loading ? 'loading' : ''}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="spinner"></div>
                            ) : (
                                'Registrar'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form_R;