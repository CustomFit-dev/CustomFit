import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/domi1.scss'; // Archivo con estilos actualizados
import Dimg1 from '../../img/domi1-removebg-preview.png';
import Dimg2 from '../../img/Muestras/domi2.png';
import Dimg3 from '../../img/Muestras/domi3.png';
import Dimg4 from '../../img/Muestras/domi4.png';
import Dimg5 from '../../img/Muestras/domi5.png';
import Dimg6 from '../../img/Muestras/domi6.png';
import Ventana1 from './Dventana';
import Ventana2 from './ventana2';
import Ventana3 from './ventana3';
import Ventana4 from './Ventana4';
import Ventana5 from './ventana5';
import Ventana6 from './ventana6';


const Domin = () => {  // Cambié el nombre del componente a "Domin"
    const [estadoModal1, cambiarEsadoModal1] = useState(false);
    const [estadoModal2, cambiarEsadoModal2] = useState(false);
    const [estadoModal3, cambiarEsadoModal3] = useState(false);
    const [estadoModal4, cambiarEsadoModal4] = useState(false);
    const [estadoModal5, cambiarEsadoModal5] = useState(false);
    const [estadoModal6, cambiarEsadoModal6] = useState(false);
    return (
        <>
        <div className="container mt-4">
            {/* Fila 1: 3 tarjetas-botones */}
            <h1 className="domitext">
                ¡Bienvenido como <span style={{ color: '#17BEBB' }}>Domiciliario</span> a CustomFit!
            </h1>
            <div className="row">
                <div className="col-md-4">
                    <button className="card-button" onClick={() => cambiarEsadoModal1(!estadoModal1)}>
                        <div className="card-body">
                            <img src={Dimg1} alt="Card 1" className="card-img" />
                            <h5 className="card-title mt-3">Datos Personales</h5>
                        </div>
                    </button>
                </div>
                <div className="col-md-4">
                    <button className="card-button" onClick={() => cambiarEsadoModal2(!estadoModal2)}>
                        <div className="card-body">
                            <img src={Dimg2} alt="Card 2" className="card-img" />
                            <h5 className="card-title mt-3">Mis Estadisticas</h5>
                        </div>
                    </button>
                </div>
                <div className="col-md-4">
                    <button className="card-button" onClick={() => cambiarEsadoModal3(!estadoModal3)}>
                        <div className="card-body">
                            <img src={Dimg3} alt="Card 3" className="card-img" />
                            <h5 className="card-title mt-3">Mi Vehiculo</h5>
                        </div>
                    </button>
                </div>
            </div>

            {/* Fila 2: 3 tarjetas-botones */}
            <div className="row">
                <div className="col-md-4">
                    <button className="card-button" onClick={() => cambiarEsadoModal5(!estadoModal5)}>
                        <div className="card-body">
                            <img src={Dimg4} alt="Card 4" className="card-img" />
                            <h5 className="card-title mt-3">Pedidos Activos</h5>
                        </div>
                    </button>
                </div>
                <div className="col-md-4">
                    <button className="card-button" onClick={() => cambiarEsadoModal4(!estadoModal4)}>
                        <div className="card-body">
                            <img src={Dimg5} alt="Card 5" className="card-img" />
                            <h5 className="card-title mt-3">Pedidos Disponibles</h5>
                        </div>
                    </button>
                </div>
                <div className="col-md-4">
                    <button className="card-button " onClick={() => cambiarEsadoModal6(!estadoModal6)}>
                        <div className="card-body">
                            <img src={Dimg6} alt="Card 6" className="card-img" />
                            <h5 className="card-title mt-3">Configuraciones</h5>
                        </div>
                    </button>
                </div>
            </div>

            <Ventana1
                estado={estadoModal1}
                cambiarEstado={cambiarEsadoModal1}
            />
            <Ventana2
                estado={estadoModal2}
                cambiarEstado={cambiarEsadoModal2}
            />
            <Ventana3
                estado={estadoModal3}
                cambiarEstado={cambiarEsadoModal3}
            />
            <Ventana4
                estado={estadoModal4}
                cambiarEstado={cambiarEsadoModal4}
            />
            <Ventana5
                estado={estadoModal5}
                cambiarEstado={cambiarEsadoModal5}
            />
             <Ventana6
                estado={estadoModal6}
                cambiarEstado={cambiarEsadoModal6}
            />
        </div>
        </>
    );
};

export default Domin;  // Se mantiene "Domin" como nombre del componente
