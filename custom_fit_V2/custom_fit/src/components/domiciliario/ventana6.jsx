    import React, { useState } from "react";
    import "../../scss/ventana.scss";
    import styled from 'styled-components';
import IconButton1 from '@mui/material/IconButton';
import CloseIcon1 from '@mui/icons-material/Close';

    const Wallet = ({ estado, cambiarEstado }) => {
    // Estado inicial del domiciliario
    const [domiciliary, setDomiciliary] = useState({
        name: "Juan Pérez",
        status: "Activo", // Estados: "Activo", "Inactivo", "En Pausa"
        scheduleType: "Tiempo Completo", // Puede ser "Medio Tiempo", etc.
        totalEarnings: 1500, // Ganancias totales
        weeklyHours: {
        lunes: 8,
        martes: 7,
        miércoles: 9,
        jueves: 8,
        viernes: 6,
        sábado: 0,
        domingo: 0,
        },
    });

    // Función para cambiar el estado (Activo, Inactivo, En Pausa)
    const handleStatusChange = (event) => {
        setDomiciliary({ ...domiciliary, status: event.target.value });
    };

    // Calcular horas totales
    const totalHours = Object.values(domiciliary.weeklyHours).reduce(
        (acc, hours) => acc + hours,
        0
    );

    return (
        <>
        {estado &&
            <Overlay>
        <div className="container mt-5">
        <div className="cardconfi shadow-lg">
            <div className="card-header bg-primary text-white">
            <IconButton1 className="salirx1" onClick={() => cambiarEstado()}>
                                <CloseIcon1 />
                            </IconButton1>
            <h3 className="had mb-0">Configuraciones de {domiciliary.name}</h3>
            </div>
            <div className="card-body">
            <div className="row">
                {/* Estado */}
                <div className="col-md-4 text-center">
                <h5>Estado</h5>
                <select
                    className="form-select"
                    value={domiciliary.status}
                    onChange={handleStatusChange}
                >
                    <option style={{color:'black',}} value="Activo">Activo</option>
                    <option style={{color:'black',}}  value="En Pausa">En Pausa</option>
                    <option style={{color:'black',}}  value="Inactivo">Inactivo</option>
                </select>
                <p
                    className={
                    domiciliary.status === "Activo"
                        ? "text-success mt-2"
                        : domiciliary.status === "En Pausa"
                        ? "text-warning mt-2"
                        : "text-danger mt-2"
                    }
                >
                    {domiciliary.status}
                </p>
                </div>

                {/* Tipo de horario */}
                <div className="col-md-4 text-center">
                <h5>Horario</h5>
                <p>{domiciliary.scheduleType}</p>
                </div>

                {/* Ganancias Totales */}
                <div className="col-md-4 text-center">
                <h5>Ganancias Totales</h5>
                <p>${domiciliary.totalEarnings.toFixed(2)}</p>
                </div>
            </div>

            <hr />

            {/* Horas trabajadas */}
            <div className="row">
                <div className="col-md-12">
                <h5>Horas trabajadas esta semana</h5>
                <ul className="list-group">
                    {Object.entries(domiciliary.weeklyHours).map(
                    ([day, hours], index) => (
                        <li key={index} className="list-group-item">
                        <span>{day.charAt(0).toUpperCase() + day.slice(1)}:</span>{" "}
                        <span>{hours} horas</span>
                        </li>
                    )
                    )}
                </ul>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12 text-center">
                <h5>Horas Totales</h5>
                <p>{totalHours} horas</p>
                </div>
            </div>
            </div>
        </div>
        </div>
        </Overlay>
        }
        </>
    );
    };

    export default Wallet;
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