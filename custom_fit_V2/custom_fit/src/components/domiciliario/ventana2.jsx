    import React, { useState } from 'react';
    import { LinearProgress, Typography } from '@mui/material';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../../scss/ventana2.scss';
    import styled from 'styled-components'; // Archivo con estilos actualizados
    import IconButton1 from '@mui/material/IconButton';
    import CloseIcon1 from '@mui/icons-material/Close';
    
    const MisEstadisticas = ({estado, cambiarEstado}) => {
    // Datos de ejemplo
    const [pedidos, setPedidos] = useState(50);
    const [pedidosEntregados, setPedidosEntregados] = useState(121);
    const [pedidosCancelados, setPedidosCancelados] = useState(1);
    const [ganancias, setGanancias] = useState(103323);

    return (
        <>
        {estado &&
            <Overlay>
        <div className="form-container" style={{backgroundColor:'transparent',}}>
        <div className="form-card">
            {/* Título */}
            <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
                <CloseIcon1 />
                </IconButton1>
            <div className="form-header">
            
            <h4>Mis Estadísticas</h4>
            
            </div>

            {/* Estadísticas */}
            <div className="stat-container">
            <div className="stat-item">
                <Typography variant="body1">Pedidos: {pedidos}</Typography>
                <LinearProgress variant="determinate" value={(pedidos / 200) * 100} />
            </div>

            <div className="stat-item">
                <Typography variant="body1">Pedidos entregados: {pedidosEntregados}</Typography>
                <LinearProgress variant="determinate" value={(pedidosEntregados / 200) * 100} />
            </div>

            <div className="stat-item">
                <Typography variant="body1">Pedidos cancelados: {pedidosCancelados}</Typography>
                <LinearProgress variant="determinate" value={(pedidosCancelados / 10) * 100} />
            </div>

            <div className="stat-item">
                <Typography variant="body1">Ganancias totales: ${ganancias.toLocaleString()}</Typography>
                <LinearProgress variant="determinate" value={(ganancias / 200000) * 100} />
            </div>
            </div>
        </div>
        </div>
        </Overlay>
    }
        </>
    );
    };

    export default MisEstadisticas;
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
