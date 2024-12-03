import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TextField } from "@mui/material";
import "../../scss/prove2.scss"; // Archivo CSS con estilos personalizados
import img21 from '../../img/perso.png';

const SupplierForm = () => {
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [ruc, setRuc] = useState("");
    const [cc, setCc] = useState("");

    const [productosVendidos, setProductosVendidos] = useState(121);
    const [valorTotalVentas, setValorTotalVentas] = useState("$203,323");
    const [devolucionesPedidos, setDevolucionesPedidos] = useState(15);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
    };

    return (
        <>
        <h1 className="text-center22">
                ¡Bienvenido como <span style={{ color: '#17BEBB' }}>Proveedor</span> a CustomFit!
            </h1>
        
        <Container fluid className="promail">
        
            <Row className="prove1">
                {/* Columna izquierda: Foto y estadísticas */}
                <Col md={4} className="d-flex flex-column align-items-center  p-4">
                    <img
                        src={img21}
                        alt="Proveedor"
                        className="rounded-circle mb-4"
                        width="150"
                        height="150"
                    />
                    <div className="text-center">
                        <h5>Mis estadísticas</h5>
                        <p className="estas"><strong>Productos:</strong> {productosVendidos}</p>
                        <p className="estas"><strong>Productos vendidos:</strong> {productosVendidos}</p>
                        <p className="estas"><strong>Productos agotados:</strong> {productosVendidos}</p>
                        <p> className="estas"<strong>Valor total de ventas:</strong> {valorTotalVentas}</p>
                        
                        <p className="estas"><strong>Devoluciones de pedidos:</strong> {devolucionesPedidos}</p>
                    </div>
                </Col>

                {/* Columna derecha: Datos personales */}
                <Col md={8} className="form-col">
                    <form className="Proinput">
                        <h3 className="datosss">Datos personales</h3>
                        <Row>
                            {/* Primera columna de 4 campos */}
                            <Col md={6}>
                            
                                <div className="form-groupprove">
                                    <TextField
                                        id="nombres"
                                        label="Nombres"
                                        variant="standard"
                                        color="primary"
                                        value={nombres}
                                        onChange={(e) => setNombres(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-groupprove">
                                    <TextField
                                        id="apellidos"
                                        label="Apellidos"
                                        variant="standard"
                                        color="primary"
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-groupprove">
                                    <TextField
                                        id="direccion"
                                        label="Dirección"
                                        variant="standard"
                                        color="primary"
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-groupprove">
                                    <TextField
                                        id="telefono"
                                        label="Teléfono"
                                        variant="standard"
                                        color="primary"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                            </Col>

                            {/* Segunda columna de 4 campos */}
                            <Col md={6}>
                                <div className="form-groupprove">
                                    <TextField
                                        id="email"
                                        label="Email"
                                        variant="standard"
                                        color="primary"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-groupprove">
                                    <TextField
                                        id="empresa"
                                        label="Empresa"
                                        variant="standard"
                                        color="primary"
                                        value={empresa}
                                        onChange={(e) => setEmpresa(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-groupprove">
                                    <TextField
                                        id="ruc"
                                        label="RUC"
                                        variant="standard"
                                        color="primary"
                                        value={ruc}
                                        onChange={(e) => setRuc(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                                <div className="form-groupprove">
                                    <TextField
                                        id="cc"
                                        label="CC"
                                        variant="standard"
                                        color="primary"
                                        value={cc}
                                        onChange={(e) => setCc(e.target.value)}
                                        fullWidth
                                    />
                                </div>
                            </Col>
                        </Row>
                        <div className="botspro"> 
                            <button className="boton-aceptar">Aceptar</button>
                            <button className="boton-cancelar">Cancelar</button>
                    </div>
                    </form>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default SupplierForm;
