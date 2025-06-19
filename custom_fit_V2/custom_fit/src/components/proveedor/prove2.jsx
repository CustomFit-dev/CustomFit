import React, { useState, useEffect } from "react";
import axios from "axios"; // para hacer la petición
import { Container, Row, Col, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import "../../scss/prove2.scss";
import img21 from '../../img/perso.png';

const SupplierForm = () => {
    // Datos del proveedor
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [ruc, setRuc] = useState("");
    const [cc, setCc] = useState("");

    // Estadísticas (puedes también cargarlas del backend si lo deseas)
    const [productosVendidos, setProductosVendidos] = useState(121);
    const [valorTotalVentas, setValorTotalVentas] = useState("$203,323");
    const [devolucionesPedidos, setDevolucionesPedidos] = useState(15);

    // ID del proveedor autenticado (puede venir de auth o contexto)
    const proveedorId = "123"; // reemplaza con valor real

    useEffect(() => {
        const fetchProveedor = async () => {
            try {
                const response = await axios.get(`/api/proveedores/${proveedorId}`);
                const data = response.data;

                setNombres(data.nombres || "");
                setApellidos(data.apellidos || "");
                setDireccion(data.direccion || "");
                setTelefono(data.telefono || "");
                setEmail(data.email || "");
                setEmpresa(data.empresa || "");
                setRuc(data.ruc || "");
                setCc(data.cc || "");

                // Si también recibes estadísticas:
                setProductosVendidos(data.productosVendidos || 0);
                setValorTotalVentas(data.valorTotalVentas || "$0");
                setDevolucionesPedidos(data.devolucionesPedidos || 0);
            } catch (error) {
                console.error("Error al cargar datos del proveedor:", error);
            }
        };

        fetchProveedor();
    }, [proveedorId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar cambios
        console.log("Formulario enviado con:", {
            nombres, apellidos, direccion, telefono, email, empresa, ruc, cc
        });
    };

    return (
        <>
            <h1 className="text-center22">
                ¡Bienvenido como <span style={{ color: '#17BEBB' }}>Proveedor</span> a CustomFit!
            </h1>

            <Container fluid className="promail">
                <Row className="prove1">
                    <Col md={4} className="d-flex flex-column align-items-center  p-4">
                        <img src={img21} alt="Proveedor" className="rounded-circle mb-4" width="150" height="150" />
                        <div className="text-center">
                            <h5>Mis estadísticas</h5>
                            <p className="estas"><strong>Productos:</strong> {productosVendidos}</p>
                            <p className="estas"><strong>Productos vendidos:</strong> {productosVendidos}</p>
                            <p className="estas"><strong>Productos agotados:</strong> {productosVendidos}</p>
                            <p className="estas"><strong>Valor total de ventas:</strong> {valorTotalVentas}</p>
                            <p className="estas"><strong>Devoluciones de pedidos:</strong> {devolucionesPedidos}</p>
                        </div>
                    </Col>

                    <Col md={8} className="form-col">
                        <form className="Proinput" onSubmit={handleSubmit}>
                            <h3 className="datosss">Datos personales</h3>
                            <Row>
                                <Col md={6}>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Nombres" variant="standard" value={nombres} onChange={(e) => setNombres(e.target.value)} fullWidth />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Apellidos" variant="standard" value={apellidos} onChange={(e) => setApellidos(e.target.value)} fullWidth />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Dirección" variant="standard" value={direccion} onChange={(e) => setDireccion(e.target.value)} fullWidth />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Teléfono" variant="standard" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth />
                                    </div>
                                </Col>

                                <Col md={6}>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Empresa" variant="standard" value={empresa} onChange={(e) => setEmpresa(e.target.value)} fullWidth />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Teléfono Fijo" variant="standard" value={ruc} onChange={(e) => setRuc(e.target.value)} fullWidth />
                                    </div>
                                    <div className="form-groupprove">
                                        <TextField sx={{ borderBottom: '2px solid #00FFFF' }} label="Número de Identificación" variant="standard" value={cc} onChange={(e) => setCc(e.target.value)} fullWidth />
                                    </div>
                                </Col>
                            </Row>
                            <div className="botspro">
                                <button type="submit" className="boton-aceptar">Aceptar</button>
                                <button type="button" className="boton-cancelar">Cancelar</button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SupplierForm;
