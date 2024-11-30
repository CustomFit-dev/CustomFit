import React, { useState } from 'react';
    import "../../scss/provedor3.scss";
    import cam1 from '../../img/camisassinfo/cam1.png';
    import cam2 from '../../img/camisassinfo/cam2.png';
    import cam3 from '../../img/camisassinfo/cam3.png';
    import cam5 from '../../img/camisassinfo/cam4.png';
    import cam6 from '../../img/camisassinfo/cam5.png';
    import cam7 from '../../img/camisassinfo/cam6.png';
    import cam8 from '../../img/camisassinfo/cam7.png';
    import cam9 from '../../img/camisassinfo/cam8.png';
    import cam10 from '../../img/camisassinfo/cam4.png';
    import cam11 from '../../img/camisassinfo/cam1.png';
    import cam12 from '../../img/camisassinfo/cam12.png';
    import PVentada1 from '../proveedor/pventa1.jsx';

    const GestionProductos = () => {
        const [estadoModal1, cambiarEsadoModal1] = useState(false);
    const productos = [
        { id: 1, imagen: cam1, color: "Beige" },
        { id: 2, imagen: cam2, color: "Negro" },
        { id: 3, imagen: cam3, color: "Durazno" },
        { id: 4, imagen: cam5, color: "Amarillo" },
        { id: 5, imagen: cam6, color: "Blanco" },
        { id: 6, imagen: cam7, color: "Verde Claro" },
        { id: 7, imagen: cam8, color: "Azul" },
        { id: 8, imagen: cam9, color: "Rojo" },
        { id: 9, imagen: cam10, color: "Gris" },
        { id: 10, imagen: cam11, color: "Naranja" },
        { id: 11, imagen: cam12, color: "Cian" },
        { id: 12, imagen: cam1, color: "Morado" },
    ];

    return (
        <div className="gestion-productos">
        <h2 className="titulo">
            Gestión de <span className="texto-azul">Productos</span>
        </h2>
        <div className="productos-container">
            <button className="producto-card agregar" onClick={() => cambiarEsadoModal1(!estadoModal1)}> 
            <div className="plus-sign">+</div>
            <p>Agregar más productos</p>
            </button>
            {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
                <img
                src={producto.imagen}
                alt={`Camiseta ${producto.color}`}
                className="producto-imagen"
                />
                <div className="botones-producto">
                <button className="boton eliminar">Eliminar producto</button>
                <button className="boton editar">Editar producto</button>
                <button className="boton detalles">Ver detalles</button>
                </div>
            </div>
            ))}
            <PVentada1 
                estado={estadoModal1}
                cambiarEstado={cambiarEsadoModal1}
            />
        </div>
        </div>
    );
    };

    export default GestionProductos;
