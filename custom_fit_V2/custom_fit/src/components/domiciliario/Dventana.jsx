import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/dventana.scss'; // Estilos personalizados
import Avatar from '../../img/perso.png';
import styled from 'styled-components';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';

const Form = ({estado, cambiarEstado}) => {
    const [nombres, setNombres] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [cc, setCC] = useState('');

    // Estado para errores
    const [errors, setErrors] = useState({
        nombres: '',
        phone: '',
        email: '',
        address: '',
        cc: ''
    });

    // Validación simple para los campos
    const validate = () => {
        let tempErrors = {};
        tempErrors.nombres = nombres ? '' : 'El campo de nombres es obligatorio.';
        tempErrors.phone = phone ? '' : 'El campo de teléfono es obligatorio.';
        tempErrors.email = email ? '' : 'El campo de correo electrónico es obligatorio.';
        tempErrors.address = address ? '' : 'El campo de dirección es obligatorio.';
        tempErrors.cc = cc ? '' : 'El campo de tarjeta de crédito es obligatorio.';
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === '');
    };

    const handleSave = () => {
        if (validate()) {
            console.log('Datos guardados:', { nombres, phone, email, address, cc });
        }
    };

    const handleCancel = () => {
        setNombres('');
        setPhone('');
        setEmail('');
        setAddress('');
        setCC('');
        setErrors({
            nombres: '',
            phone: '',
            email: '',
            address: '',
            cc: ''
        });
    };

    return (
        <>
            {estado &&
                <Overlay>
                    <div className="form-containerDomi" style={{ backgroundColor: 'transparent' }}>
                        <div className="form-card">
                            <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
                                <CloseIcon1 />
                            </IconButton1>
                            <div className="form-header">
                                <div className="avatar">
                                    <img src={Avatar} alt="Avatar" className="avatar-img" />
                                </div>
                                <h4>Datos personales</h4>
                            </div>

                            <div className="form-body">
                                {/* Fila para las columnas */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <TextField
                                            sx={
                                                {
                                                    borderBottom:'2px solid #00FFFF',
                                                }
                                            }
                                                id="nombres"
                                                label="Nombres"
                                                variant="standard"
                                                color="primary"
                                                value={nombres}
                                                error={!!errors.nombres}
                                                helperText={errors.nombres}
                                                onChange={(e) => setNombres(e.target.value)}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <TextField
                                                sx={
                                                {
                                                    borderBottom:'2px solid #00FFFF',
                                                }
                                            }
                                                id="apellidos"
                                                label="Apellidos"
                                                variant="standard"
                                                color="primary"
                                                value={nombres}
                                                error={!!errors.nombres}
                                                helperText={errors.nombres}
                                                onChange={(e) => setNombres(e.target.value)}
                                                fullWidth
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <TextField
                                            sx={
                                                {
                                                    borderBottom:'2px solid #00FFFF',
                                                }
                                            }
                                                id="phone"
                                                label="Teléfono"
                                                variant="standard"
                                                color="primary"
                                                value={phone}
                                                error={!!errors.phone}
                                                helperText={errors.phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                fullWidth
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <TextField
                                            sx={
                                                {
                                                    borderBottom:'2px solid #00FFFF',
                                                }
                                            }
                                                id="email"
                                                label="Email"
                                                variant="standard"
                                                color="primary"
                                                value={email}
                                                error={!!errors.email}
                                                helperText={errors.email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                fullWidth
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <TextField
                                            sx={
                                                {
                                                    borderBottom:'2px solid #00FFFF',
                                                }
                                            }
                                                id="address"
                                                label="Dirección"
                                                variant="standard"
                                                color="primary"
                                                value={address}
                                                error={!!errors.address}
                                                helperText={errors.address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                fullWidth
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <TextField
                                            sx={
                                                {
                                                    borderBottom:'2px solid #00FFFF',
                                                }
                                            }
                                                id="cc"
                                                label="Número de identificación"
                                                variant="standard"
                                                color="primary"
                                                value={cc}
                                                error={!!errors.cc}
                                                helperText={errors.cc}
                                                onChange={(e) => setCC(e.target.value)}
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-footer11">
                                <Button variant="contained" color="success" onClick={handleSave} fullWidth>
                                    Guardar
                                </Button>
                                <Button variant="outlined" color="error" onClick={handleCancel} fullWidth>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Overlay>
            }
        </>
    );
};

export default Form;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center; /* Centra los elementos horizontalmente */
    align-items: center; /* Centra los elementos verticalmente */
    z-index: 10000; /* Asegura que esté encima de otros elementos */
`;
