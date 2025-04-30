    import React, { useState } from 'react';
    import { 
    Grid, 
    Card, 
    Typography, 
    Button, 
    Box, 
    Chip,
    Paper,
    Divider,
    Avatar,
    IconButton,
    Modal,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Tooltip,
    Link
    } from '@mui/material';
    import { 
    ArrowBackIos, 
    ArrowForwardIos, 
    GetApp, 
    Visibility, 
    CheckCircle,
    WhatsApp,
    Close
    } from '@mui/icons-material';
    import '../../scss/prove.scss';
    import Producto1 from '../../img/2104.jpg';
    import Logo1 from '../../img/logos/logo1.png';
    import Producto2 from '../../img/camisa1.jpg';
    import Logo2 from '../../img/logos/logo2.png';
    import Producto3 from '../../img/camisa5.jpg';
    import Logo3 from '../../img/logos/logo3.png';
    import Producto4 from '../../img/camisa9.jpg';
    import Logo4 from '../../img/logos/logo4.png';
    import Producto5 from '../../img/camisa12.jpg';
    import Logo5 from '../../img/logos/logo5.png';


    // Datos de ejemplo
    const pedidosData = [
    {
        id: 1,
        cliente: "María García",
        telefono: "5491123456789",
        estado: "pendiente",
        productos: [
        {
            nombre: "Camiseta básica",
            imagen: Producto1,
            talla: "M",
            color: "Negro",
            tela: "Algodón 100%",
            tipo: "Manga corta",
            estampado: {
            imagen: Logo1,
            descripcion: "Logo frontal"
            },
            texto: "Keep Coding",
            costos: {
            base: 15.99,
            estampado: 5.00,
            envio: 3.50
            }
        }
        ]
    },
    {
        id: 2,
        cliente: "Juan Pérez",
        telefono: "5491187654321",
        estado: "pendiente",
        productos: [
        {
            nombre: "Polo deportivo",
            imagen: Producto2,
            talla: "L",
            color: "Azul marino",
            tela: "Poliéster técnico",
            tipo: "Manga corta",
            estampado: {
            imagen: Logo2,
            descripcion: "Estampado lateral"
            },
            texto: null,
            costos: {
            base: 19.99,
            estampado: 6.50,
            envio: 3.50
            }
        },
        {
            nombre: "Sudadera con capucha",
            imagen: Producto3,
            talla: "XL",
            color: "Gris",
            tela: "Algodón y poliéster",
            tipo: "Manga larga",
            estampado: {
            imagen: Logo3,
            descripcion: "Estampado en espalda"
            },
            texto: "Team Dev 2025",
            costos: {
            base: 24.99,
            estampado: 8.00,
            envio: 0 // incluido con el otro producto
            }
        }
        ]
    },
    {
        id: 3,
        cliente: "Ana Martínez",
        telefono: "5491145678923",
        estado: "pendiente",
        productos: [
        {
            nombre: "Camiseta premium",
            imagen: Producto4,
            talla: "S",
            color: "Blanco",
            tela: "Algodón peinado",
            tipo: "Manga corta",
            estampado: {
            imagen: Logo4,
            descripcion: "Diseño completo frontal"
            },
            texto: "Hello World!",
            costos: {
            base: 18.50,
            estampado: 7.50,
            envio: 4.00
            }
        }
        ]
    },
    {
        id: 4,
        cliente: "Carlos Ruiz",
        telefono: "5491156789234",
        estado: "pendiente",
        productos: [
        {
            nombre: "Camiseta oversize",
            imagen: Producto5,
            talla: "XXL",
            color: "Verde oliva",
            tela: "Algodón orgánico",
            tipo: "Manga corta",
            estampado: {
            imagen: Logo5,
            descripcion: "Estampado minimalista"
            },
            texto: null,
            costos: {
            base: 22.99,
            estampado: 6.00,
            envio: 3.50
            }
        }
        ]
    }
    ];

    const Pedidos = () => {
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [productoActual, setProductoActual] = useState(0);
    const [pedidosActualizados, setPedidosActualizados] = useState(pedidosData);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalProducto, setModalProducto] = useState(null);

    const handleSeleccionarPedido = (pedido) => {
        setPedidoSeleccionado(pedido);
        setProductoActual(0);
    };

    const handleSiguienteProducto = () => {
        if (pedidoSeleccionado && productoActual < pedidoSeleccionado.productos.length - 1) {
        setProductoActual(productoActual + 1);
        }
    };

    const handleProductoAnterior = () => {
        if (pedidoSeleccionado && productoActual > 0) {
        setProductoActual(productoActual - 1);
        }
    };

    const handleAceptarPedido = (id) => {
        setPedidosActualizados(pedidosActualizados.map(pedido => 
        pedido.id === id ? {...pedido, estado: "aceptado"} : pedido
        ));
    };

    const handleRechazarPedido = (id) => {
        setPedidosActualizados(pedidosActualizados.map(pedido => 
        pedido.id === id ? {...pedido, estado: "rechazado"} : pedido
        ));
    };

    const handleMarcarRealizado = () => {
        if (pedidoSeleccionado) {
        setPedidosActualizados(pedidosActualizados.map(pedido => 
            pedido.id === pedidoSeleccionado.id ? {...pedido, estado: "realizado"} : pedido
        ));
        }
    };

    const calcularTotal = (producto) => {
        return (
        producto.costos.base + 
        producto.costos.estampado + 
        producto.costos.envio
        ).toFixed(2);
    };

    const handleAbrirModal = () => {
        if (pedidoSeleccionado) {
        setModalProducto(pedidoSeleccionado.productos[productoActual]);
        setModalAbierto(true);
        }
    };

    const handleCerrarModal = () => {
        setModalAbierto(false);
    };

    const handleDescargar = () => {
        if (pedidoSeleccionado) {
        const producto = pedidoSeleccionado.productos[productoActual];
        
        // Crear un objeto con la información para descargar
        const infoDescarga = {
            pedido: pedidoSeleccionado.id,
            cliente: pedidoSeleccionado.cliente,
            producto: producto.nombre,
            texto: producto.texto || "Sin texto",
            estampado: producto.estampado.descripcion
        };
        
        // Crear un blob con la información
        const blob = new Blob(
            [JSON.stringify(infoDescarga, null, 2)], 
            { type: 'application/json' }
        );
        
        // Crear un link de descarga y simularlo
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `pedido-${pedidoSeleccionado.id}-producto-${productoActual + 1}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        }
    };

    const handleContactarWhatsApp = () => {
        if (pedidoSeleccionado) {
        const telefono = pedidoSeleccionado.telefono;
        const mensaje = encodeURIComponent(
            `Hola ${pedidoSeleccionado.cliente}, nos comunicamos sobre su pedido #${pedidoSeleccionado.id} de ${pedidoSeleccionado.productos.length} productos.`
        );
        const url = `https://wa.me/${telefono}?text=${mensaje}`;
        window.open(url, '_blank');
        }
    };

    return (
        <div className="pedidos-container">
        <Grid container spacing={3}>
            {/* Columna izquierda - Lista de pedidos */}
            <Grid item xs={12} md={4}>
            <Paper elevation={3} className="pedidos-panel">
                <Typography variant="h5" className="panel-header">
                Pedidos Pendientes
                </Typography>
                <Divider />
                <div className="pedidos-lista">
                {pedidosActualizados.map((pedido) => (
                    <Card 
                    key={pedido.id} 
                    className={`pedido-item ${pedidoSeleccionado?.id === pedido.id ? 'pedido-seleccionado' : ''} ${pedido.estado !== 'pendiente' ? `pedido-${pedido.estado}` : ''}`}
                    onClick={() => handleSeleccionarPedido(pedido)}
                    >
                    <Box display="flex" alignItems="center">
                        <Avatar className="pedido-numero">{pedido.id}</Avatar>
                        <Typography variant="subtitle1" className="pedido-cliente">
                        {pedido.cliente}
                        </Typography>
                    </Box>
                    <Box className="pedido-acciones">
                        {pedido.estado === 'pendiente' && (
                        <>
                            <Button 
                            variant="contained" 
                            color="success" 
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleAceptarPedido(pedido.id);
                            }}
                            >
                            Aceptar
                            </Button>
                            <Button 
                            variant="contained" 
                            color="error" 
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRechazarPedido(pedido.id);
                            }}
                            >
                            Rechazar
                            </Button>
                        </>
                        )}
                        {pedido.estado === 'aceptado' && (
                        <Chip label="Aceptado" color="success" size="small" />
                        )}
                        {pedido.estado === 'rechazado' && (
                        <Chip label="Rechazado" color="error" size="small" />
                        )}
                        {pedido.estado === 'realizado' && (
                        <Chip label="Realizado" color="info" size="small" />
                        )}
                    </Box>
                    </Card>
                ))}
                </div>
            </Paper>
            </Grid>

            {/* Columna derecha - Detalles del pedido */}
            <Grid item xs={12} md={8}>
            <Paper elevation={3} className="detalles-panel">
                {pedidoSeleccionado ? (
                <>
                    <Typography variant="h5" className="panel-header">
                    Detalles del Pedido #{pedidoSeleccionado.id} - {pedidoSeleccionado.cliente}
                    </Typography>
                    <Divider />
                    
                    {/* Carousel para múltiples productos */}
                    {pedidoSeleccionado.productos.length > 1 && (
                    <div className="carousel-controls">
                        <Typography variant="subtitle1">
                        Producto {productoActual + 1} de {pedidoSeleccionado.productos.length}
                        </Typography>
                        <div>
                        <IconButton 
                            onClick={handleProductoAnterior} 
                            disabled={productoActual === 0}
                        >
                            <ArrowBackIos />
                        </IconButton>
                        <IconButton 
                            onClick={handleSiguienteProducto} 
                            disabled={productoActual === pedidoSeleccionado.productos.length - 1}
                        >
                            <ArrowForwardIos />
                        </IconButton>
                        </div>
                    </div>
                    )}

                    {/* Detalles del producto actual */}
                    {pedidoSeleccionado.productos[productoActual] && (
                    <div className="producto-detalles">
                        <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <div className="producto-imagen-container">
                            <Typography variant="h6" className="seccion-titulo">
                                Producto
                            </Typography>
                            <img 
                                src={pedidoSeleccionado.productos[productoActual].imagen} 
                                alt={pedidoSeleccionado.productos[productoActual].nombre}
                                className="producto-imagen"
                            />
                            <Typography variant="h6">
                                {pedidoSeleccionado.productos[productoActual].nombre}
                            </Typography>
                            </div>

                            <div className="producto-info">
                            <div className="info-item">
                                <Typography variant="body2" className="info-label">Talla:</Typography>
                                <Chip label={pedidoSeleccionado.productos[productoActual].talla} size="small" />
                            </div>
                            <div className="info-item">
                                <Typography variant="body2" className="info-label">Color:</Typography>
                                <Chip label={pedidoSeleccionado.productos[productoActual].color} size="small" />
                            </div>
                            <div className="info-item">
                                <Typography variant="body2" className="info-label">Tela:</Typography>
                                <Chip label={pedidoSeleccionado.productos[productoActual].tela} size="small" />
                            </div>
                            <div className="info-item">
                                <Typography variant="body2" className="info-label">Tipo:</Typography>
                                <Chip label={pedidoSeleccionado.productos[productoActual].tipo} size="small" />
                            </div>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <div className="estampado-container">
                            <Typography variant="h6" className="seccion-titulo">
                                Estampado
                            </Typography>
                            <img 
                                src={pedidoSeleccionado.productos[productoActual].estampado.imagen} 
                                alt="Estampado"
                                className="estampado-imagen"
                            />
                            <Typography variant="body2" className="estampado-descripcion">
                                {pedidoSeleccionado.productos[productoActual].estampado.descripcion}
                            </Typography>
                            </div>

                            {pedidoSeleccionado.productos[productoActual].texto && (
                            <div className="texto-container">
                                <Typography variant="h6" className="seccion-titulo">
                                Texto
                                </Typography>
                                <Paper className="texto-preview">
                                {pedidoSeleccionado.productos[productoActual].texto}
                                </Paper>
                            </div>
                            )}
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                            <div className="contenido-container">
                            <Typography variant="h6" className="seccion-titulo">
                                Contenido
                            </Typography>
                            <div className="contenido-acciones">
                                <Button 
                                variant="contained" 
                                color="primary" 
                                startIcon={<Visibility />}
                                onClick={handleAbrirModal}
                                >
                                Ver Producto
                                </Button>
                                <Button 
                                variant="contained" 
                                color="secondary" 
                                startIcon={<GetApp />}
                                onClick={handleDescargar}
                                >
                                Descargar
                                </Button>
                                <Button 
                                variant="contained" 
                                color="success" 
                                startIcon={<CheckCircle />}
                                onClick={handleMarcarRealizado}
                                disabled={pedidoSeleccionado.estado !== 'aceptado'}
                                >
                                Realizado
                                </Button>
                                <Button 
                                variant="contained" 
                                className="whatsapp-button"
                                startIcon={<WhatsApp />}
                                onClick={handleContactarWhatsApp}
                                >
                                WhatsApp
                                </Button>
                            </div>
                            </div>

                            <Divider />
                            <div className="costos-container">
                            <Typography variant="h6" className="seccion-titulo">
                                Detalles
                            </Typography>
                            <div className="costos-lista">
                                <div className="costo-item">
                                <Typography variant="body1">Precio base:</Typography>
                                <Typography variant="body1">
                                    ${pedidoSeleccionado.productos[productoActual].costos.base.toFixed(2)}
                                </Typography>
                                </div>
                                <div className="costo-item">
                                <Typography variant="body1">Estampado:</Typography>
                                <Typography variant="body1">
                                    ${pedidoSeleccionado.productos[productoActual].costos.estampado.toFixed(2)}
                                </Typography>
                                </div>
                                <div className="costo-item">
                                <Typography variant="body1">Envío:</Typography>
                                <Typography variant="body1">
                                    ${pedidoSeleccionado.productos[productoActual].costos.envio.toFixed(2)}
                                </Typography>
                                </div>
                                <Divider />
                                <div className="costo-total">
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6">
                                    ${calcularTotal(pedidoSeleccionado.productos[productoActual])}
                                </Typography>
                                </div>
                            </div>
                            </div>
                        </Grid>
                        </Grid>
                    </div>
                    )}
                </>
                ) : (
                <div className="sin-seleccion">
                    <Typography variant="h6" align="center">
                    Seleccione un pedido para ver sus detalles
                    </Typography>
                </div>
                )}
            </Paper>
            </Grid>
        </Grid>
        
        {/* Modal para ver el producto */}
        <Dialog
            open={modalAbierto}
            onClose={handleCerrarModal}
            maxWidth="md"
            fullWidth
            className="producto-modal"
        >
            <DialogTitle className="modal-header">
            <Typography variant="h6">
                {modalProducto?.nombre}
            </Typography>
            <IconButton onClick={handleCerrarModal} className="cerrar-modal">
                <Close />
            </IconButton>
            </DialogTitle>
            <DialogContent className="modal-content">
            {modalProducto && (
                <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <div className="modal-imagen-container">
                    <img 
                        src={modalProducto.imagen} 
                        alt={modalProducto.nombre}
                        className="modal-imagen"
                    />
                    </div>
                    <div className="modal-info">
                    <div className="modal-info-item">
                        <Typography variant="subtitle1" className="modal-label">Talla:</Typography>
                        <Chip label={modalProducto.talla} />
                    </div>
                    <div className="modal-info-item">
                        <Typography variant="subtitle1" className="modal-label">Color:</Typography>
                        <Chip label={modalProducto.color} />
                    </div>
                    <div className="modal-info-item">
                        <Typography variant="subtitle1" className="modal-label">Tela:</Typography>
                        <Chip label={modalProducto.tela} />
                    </div>
                    <div className="modal-info-item">
                        <Typography variant="subtitle1" className="modal-label">Tipo:</Typography>
                        <Chip label={modalProducto.tipo} />
                    </div>
                    </div>
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <div className="modal-estampado-container">
                    <Typography variant="h6" className="seccion-titulo">
                        Estampado
                    </Typography>
                    <img 
                        src={modalProducto.estampado?.imagen} 
                        alt="Estampado"
                        className="modal-estampado-imagen"
                    />
                    <Typography variant="body1" className="modal-estampado-descripcion">
                        {modalProducto.estampado?.descripcion}
                    </Typography>
                    </div>
                    
                    {modalProducto?.texto && (
                    <div className="modal-texto-container">
                        <Typography variant="h6" className="seccion-titulo">
                        Texto personalizado
                        </Typography>
                        <Paper className="modal-texto-preview">
                        {modalProducto.texto}
                        </Paper>
                    </div>
                    )}
                </Grid>
                
                <Grid item xs={12}>
                    <div className="modal-costos">
                    <Typography variant="h6" className="seccion-titulo">
                        Costos
                    </Typography>
                    <div className="modal-costos-lista">
                        <div className="costo-item">
                        <Typography variant="body1">Precio base:</Typography>
                        <Typography variant="body1">
                            ${modalProducto.costos?.base.toFixed(2)}
                        </Typography>
                        </div>
                        <div className="costo-item">
                        <Typography variant="body1">Estampado:</Typography>
                        <Typography variant="body1">
                            ${modalProducto.costos?.estampado.toFixed(2)}
                        </Typography>
                        </div>
                        <div className="costo-item">
                        <Typography variant="body1">Envío:</Typography>
                        <Typography variant="body1">
                            ${modalProducto.costos?.envio.toFixed(2)}
                        </Typography>
                        </div>
                        <Divider />
                        <div className="costo-total">
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h6">
                            ${modalProducto ? (
                            modalProducto.costos.base + 
                            modalProducto.costos.estampado + 
                            modalProducto.costos.envio
                            ).toFixed(2) : "0.00"}
                        </Typography>
                        </div>
                    </div>
                    </div>
                </Grid>
                </Grid>
            )}
            </DialogContent>
            <DialogActions className="modal-actions">
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleCerrarModal}
            >
                Cerrar
            </Button>
            <Button 
                variant="contained" 
                color="secondary" 
                startIcon={<GetApp />}
                onClick={handleDescargar}
            >
                Descargar información
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
    };

    export default Pedidos;