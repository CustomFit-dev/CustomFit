import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss//ventana3.scss'; // Archivo con estilos actualizados
import VehiculoImage from '../../img/moto.png'; // Cambia la ruta a la imagen de tu moto
import styled from 'styled-components'; // Archivo con estilos actualizados
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';
const VehiculoFormulario = ({estado, cambiarEstado}) => {
    const [nombreModelo, setNombreModelo] = useState('');
    const [matricula, setMatricula] = useState('');
    const [marca, setMarca] = useState('');
    const [color, setColor] = useState('');
    const [tipo, setTipo] = useState('');

    return (
        <>
        {estado &&
            <Overlay>
        <div className="form-container" style={{backgroundColor:'transparent',}}>
            <div className="form-card">
                {/* Cerrar */}
                <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
                <CloseIcon1 />
                </IconButton1>

                {/* Imagen del vehículo */}
                <div className="avatar">
                    <img src={VehiculoImage} alt="Vehículo" className="avatar-img" />
                </div>

                {/* Título */}
                <div className="form-header">
                    <h4>Vehículo</h4>
                </div>

                {/* Formulario */}
                <form>
                    {/* Fila para las columnas */}
                    <div className="row">
                        {/* Columna 1 */}
                        <div className="col-md-6">
                            <div className="form-group col-md-6" id='input1'>
                                <TextField
                                    label="Nombre"
                                    variant="standard"
                                    color="primary"
                                    value={nombreModelo}
                                    onChange={(e) => setNombreModelo(e.target.value)}
                                    fullWidth
                                />
                            </div>
                            
                            <div className="form-group col-md-6" id='input3'>
                                <TextField
                                    label="Matrícula"
                                    variant="standard"
                                    color="primary"
                                    value={matricula}
                                    onChange={(e) => setMatricula(e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="form-group col-md-6" id='input4'>
                                <TextField
                                    label="Color"
                                    variant="standard"
                                    color="primary"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    fullWidth
                                />
                            </div>
                        </div>

                        {/* Columna 2 */}
                        <div className="col-md-6">
                            <div className="form-group col-md-6" id='input5'>
                                <TextField
                                    label="Modelo"
                                    variant="standard"
                                    color="primary"
                                    value={nombreModelo}
                                    onChange={(e) => setNombreModelo(e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="form-group col-md-6" id='input6'>
                                <TextField
                                    label="Marca"
                                    variant="standard"
                                    color="primary"
                                    value={marca}
                                    onChange={(e) => setMarca(e.target.value)}
                                    fullWidth
                                />
                            </div>
                            <div className="form-group col-md-6" id='input7'>
                                <TextField
                                    label="Tipo"
                                    variant="standard"
                                    color="primary"
                                    value={tipo}
                                    onChange={(e) => setTipo(e.target.value)}
                                    fullWidth
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botones de Guardar y Cancelar */}
                    <div className="form-footer">
                        <Button variant="contained" color="primary" fullWidth>
                            Guardar
                        </Button>
                        <Button variant="outlined" color="secondary" fullWidth>
                            Cancelar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </Overlay>
        }
        </>
    );
};

export default VehiculoFormulario;
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
