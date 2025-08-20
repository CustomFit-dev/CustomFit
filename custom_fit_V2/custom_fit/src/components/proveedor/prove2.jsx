import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import "../../scss/prove2.scss";
import img21 from '../../img/perso.png';
import { useAuth } from '../modules/authcontext'; // Importar el hook useAuth
const SupplierForm = () => {
    const { user } = useAuth(); // Obtener datos del usuario autenticado

    // Extraer nombres y apellidos (primera palabra de cada uno)
    const nombre = (user?.nombres || '').split(' ')[0];
    const apellido = (user?.apellidos || '').split(' ')[0];

    // Datos iniciales basados en el usuario autenticado
    const initialData = {
        nombres: user?.nombres || '',
        apellidos: user?.apellidos || '',
        direccion: user?.direccion || '',
        telefono: user?.celular || '', // Mapear celular a telefono
        email: user?.correoElectronico || '',
        empresa: user?.empresa || '',
        ruc: user?.ruc || '',
        cc: user?.numeroIdentificacion || user?.cc || '',
    };

    // Estados del formulario
    const [formData, setFormData] = useState(initialData);
    const [formDataOriginal, setFormDataOriginal] = useState(initialData);

    // Estadísticas (puedes también cargarlas del backend si lo deseas)
    const [estadisticas, setEstadisticas] = useState({
        productos: user?.estadisticas?.productos || 0,
        productosVendidos: user?.estadisticas?.productosVendidos || 121,
        productosAgotados: user?.estadisticas?.productosAgotados || 5,
        valorTotalVentas: user?.estadisticas?.valorTotalVentas || "$203,323",
        devolucionesPedidos: user?.estadisticas?.devolucionesPedidos || 15,
    });

    // Actualizar datos cuando el usuario cambie
    useEffect(() => {
        if (user) {
            const newData = {
                nombres: user.nombres || '',
                apellidos: user.apellidos || '',
                direccion: user.direccion || '',
                telefono: user.celular || '',
                email: user.correoElectronico || '',
                empresa: user.empresa || '',
                ruc: user.ruc || '',
                cc: user.numeroIdentificacion || user.cc || '',
            };
            setFormData(newData);
            setFormDataOriginal(newData);

            // Actualizar estadísticas si están disponibles
            if (user.estadisticas) {
                setEstadisticas({
                    productos: user.estadisticas.productos || 0,
                    productosVendidos: user.estadisticas.productosVendidos || 121,
                    productosAgotados: user.estadisticas.productosAgotados || 5,
                    valorTotalVentas: user.estadisticas.valorTotalVentas || "$203,323",
                    devolucionesPedidos: user.estadisticas.devolucionesPedidos || 15,
                });
            }
        }
    }, [user]);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos guardados:", formData);
        setFormDataOriginal(formData);
        // Aquí puedes agregar la lógica para enviar al backend
    };

    const handleCancel = () => {
        setFormData(formDataOriginal);
    };

    // Mostrar loading si no hay usuario
    if (!user) {
        return (
            <Container fluid className="promail">
                <div className="text-center">
                    <h5>Cargando datos del proveedor...</h5>
                </div>
            </Container>
        );
    }

    return (
        <>
            <h1 className="text-center22">
                ¡Bienvenido como <span style={{ color: '#17BEBB' }}>Proveedor</span> a CustomFit!
            </h1>

            <Container fluid className="promail">
                <Row className="prove1">
                    <Col md={4} className="d-flex flex-column align-items-center p-4">
                        <img src={img21} alt="Proveedor" className="rounded-circle mb-4" width="150" height="150" />
                        <div className="text-center">
                            <h5 style={{ color: 'white' }}>Mis estadísticas</h5>
                            <p className="estas" style={{ color: 'white' }}><strong>Productos:</strong> {estadisticas.productos}</p>
                            <p className="estas" style={{ color: 'white' }}><strong>Productos vendidos:</strong> {estadisticas.productosVendidos}</p>
                            <p className="estas" style={{ color: 'white' }}><strong>Productos agotados:</strong> {estadisticas.productosAgotados}</p>
                            <p className="estas" style={{ color: 'white' }}><strong>Valor total de ventas:</strong> {estadisticas.valorTotalVentas}</p>
                            <p className="estas" style={{ color: 'white' }}><strong>Devoluciones de pedidos:</strong> {estadisticas.devolucionesPedidos}</p>
                        </div>
                    </Col>

                    <Col md={8} className="form-col">
                        <form className="Proinput" onSubmit={handleSubmit}>
                            <h3 className="datosss">Datos personales</h3>
                            <Row>
                                <Col md={6}>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="Nombres" 
                                            variant="standard" 
                                            name="nombres"
                                            value={formData.nombres} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="Apellidos" 
                                            variant="standard" 
                                            name="apellidos"
                                            value={formData.apellidos} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="Dirección" 
                                            variant="standard" 
                                            name="direccion"
                                            value={formData.direccion} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="Teléfono" 
                                            variant="standard" 
                                            name="telefono"
                                            value={formData.telefono} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="Email" 
                                            variant="standard" 
                                            name="email"
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="Empresa" 
                                            variant="standard" 
                                            name="empresa"
                                            value={formData.empresa} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="RUC" 
                                            variant="standard" 
                                            name="ruc"
                                            value={formData.ruc} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField 
                                            sx={{ borderBottom: '2px solid #00FFFF' }} 
                                            label="Número de Identificación" 
                                            variant="standard" 
                                            name="cc"
                                            value={formData.cc} 
                                            onChange={handleChange} 
                                            fullWidth 
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <div className="botspro">
                                <button type="submit" className="boton-aceptar">Guardar</button>
                                <button type="button" className="boton-cancelar" onClick={handleCancel}>Cancelar</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SupplierForm;