import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import '../../scss/pventana.scss';
import styled from 'styled-components';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';

const NuevoProducto = ({estado, cambiarEstado}) => {
    const [nombreProducto, setNombreProducto] = useState('');
    const [tipoProducto, setTipoProducto] = useState('');
    const [precioProducto, setPrecioProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [color, setColor] = useState('');
    const [tela, setTela] = useState('');
    const [talla, setTalla] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [imagen, setImagen] = useState(null);
    const [errors, setErrors] = useState({});

    const handleImageUpload = (e) => {
        setImagen(e.target.files[0]);
        alert('Imagen subida correctamente');
    };

    const handleSubmit = () => {
        // Validación de ejemplo
        const newErrors = {};
        if (!nombreProducto) newErrors.nombreProducto = "Este campo es obligatorio";
        if (!precioProducto) newErrors.precioProducto = "Este campo es obligatorio";
        if (!cantidad) newErrors.cantidad = "Este campo es obligatorio";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log({
                nombreProducto,
                tipoProducto,
                precioProducto,
                descripcion,
                color,
                tela,
                talla,
                cantidad,
                imagen,
            });
            alert('Producto agregado correctamente');
        }
    };

    return (
        <>
        {estado &&
        <Overlay>
        <div
            className="containeragre mt-5 p-4"
        >
            <h4 className="text-center">Nuevo Producto</h4>
            <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
                                <CloseIcon1 />
                            </IconButton1>
            <div className="text-center mb-3">
                <label htmlFor="imageUpload" className="agraimg d-block">
                    <div
                    >
                        {imagen ? imagen.name : 'Agregar Imagen'}
                    </div>
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                />
            </div>

            <div className="row">
                <div className="agregar col-md-6 mb-3">
                    <TextField
                    sx={{
                        borderBottom:'2px solid #17BEBB',
                        color:'white',
                    }
                    }
                        id="nombreProducto"
                        label="Nombre del Producto"
                        variant="standard"
                        fullWidth
                        color="primary"
                        value={nombreProducto}
                        onChange={(e) => setNombreProducto(e.target.value)}
                        error={!!errors.nombreProducto}
                        helperText={errors.nombreProducto}
                    />
                </div>
                <div className="agregar col-md-6 mb-3">
                    <TextField
                        sx={{
                            borderBottom:'2px solid #17BEBB',
                        }
                        }
                        id="tipoProducto"
                        label="Tipo de Producto"
                        variant="standard"
                        fullWidth
                        color="primary"
                        value={tipoProducto}
                        onChange={(e) => setTipoProducto(e.target.value)}
                    />
                </div>
                <div className="agregar col-md-6 mb-3">
                    <TextField
                        sx={{
                            borderBottom:'2px solid #17BEBB',
                        }
                        }
                        id="precioProducto"
                        label="Precio del Producto"
                        variant="standard"
                        fullWidth
                        color="primary"
                        type="number"
                        value={precioProducto}
                        onChange={(e) => setPrecioProducto(e.target.value)}
                        error={!!errors.precioProducto}
                        helperText={errors.precioProducto}
                    />
                </div>
                <div className="agregar col-md-6 mb-3">
                    <TextField
                        sx={{
                            borderBottom:'2px solid #17BEBB',
                            color:'white',
                        }
                        }
                        id="color"
                        label="Color"
                        variant="standard"
                        fullWidth
                        select
                        color="primary"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    >
                        <MenuItem value="Rojo">Rojo</MenuItem>
                        <MenuItem value="Azul">Azul</MenuItem>
                        <MenuItem value="Verde">Verde</MenuItem>
                    </TextField>
                </div>
                <div className="agregar col-md-6 mb-3">
                <TextField
                    sx={{
                            borderBottom:'2px solid #17BEBB',
                            color:'white',
                        }
                        }
                        id="cantidad"
                        label="Cantidad"
                        variant="standard"
                        fullWidth
                        color="primary"
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        error={!!errors.cantidad}
                        helperText={errors.cantidad}
                    />
                
                </div>
                <div className="agregar col-md-6 mb-3">
                    <TextField
                        sx={{
                            borderBottom:'2px solid #17BEBB',
                            color:'white',
                        }
                        }
                        id="talla"
                        label="Talla"
                        variant="standard"
                        fullWidth
                        select
                        color="primary"
                        value={talla}
                        onChange={(e) => setTalla(e.target.value)}
                    >
                        <MenuItem value="S">S</MenuItem>
                        <MenuItem value="M">M</MenuItem>
                        <MenuItem value="L">L</MenuItem>
                    </TextField>
                </div>
                <div className="agregar col-md-6 mb-3">
                <TextField
                    sx={{
                            borderBottom:'2px solid #17BEBB',
                            color:'white',
                        }
                        }
                        id="Descripcion"
                        label="Descripcion"
                        variant="standard"
                        fullWidth
                        color="primary"
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        error={!!errors.cantidad}
                        helperText={errors.cantidad}
                    />
                </div>
                <div className="agregar col-md-6 mb-3">
                <TextField
                    sx={{
                            borderBottom:'2px solid #17BEBB',
                            color:'white',
                        }
                        }
                        id="tela"
                        label="Tela"
                        variant="standard"
                        fullWidth
                        select
                        color="primary"
                        value={tela}
                        onChange={(e) => setTela(e.target.value)}
                    >
                        <MenuItem value="Algodón">Algodón</MenuItem>
                        <MenuItem value="Poliéster">Poliéster</MenuItem>
                    </TextField>
                    
                </div>
            </div>

            <div className="text-center">
                <button className="btn btn-success me-2" onClick={handleSubmit}>
                    Subir
                </button>
                <button className="btn btn-danger" onClick={() => console.log('Cancelado')}>
                    Cancelar
                </button>
            </div>
        </div>
        </Overlay>
        }
        </>
    );
};

export default NuevoProducto;
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
