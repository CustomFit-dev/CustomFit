import React, { useState } from 'react';
import '../../scss/store.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import camisa1 from '../../img/camisa1.jpg';
import camisa2 from '../../img/camisa2.jpg';
import camisa3 from '../../img/2104.jpg';
import camisa4 from '../../img/camisa4.webp';
import camisa5 from '../../img/camisa5.jpg';
import camisa6 from '../../img/camisa6.jpg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Schopcar from '../shoproducto';
import VerC from '../modules/verCamisa';

const Shop = () => {
  const [modalData, setModalData] = useState({
    detallesVisible: false,
    verCamisaVisible: false,
    productoSeleccionado: null
  });
  
  // Datos de productos
  const productos = [
    {
      id: 1,
      imagen: camisa1,
      titulo: "Camiseta Beige",
      descripcion: "Camiseta relajada con un diseño minimalista que combina un paisaje de atardecer rojo detrás de una palmera negra, ideal para estilos casuales.",
      precio: 30000
    },
    {
      id: 2,
      imagen: camisa2,
      titulo: "Camiseta Rosa",
      descripcion: "Diseño sutil que presenta una ilustración en línea de palmeras y un horizonte, perfecta para un look fresco y ligero.",
      precio: 30000
    },
    {
      id: 3,
      imagen: camisa3,
      titulo: "Camiseta Negra",
      descripcion: "Diseño moderno y elegante, con una palmera destacada dentro de un marco geométrico blanco, para estilos urbanos.",
      precio: 30000
    },
    {
      id: 4,
      imagen: camisa5,
      titulo: "Camiseta Blanca",
      descripcion: "Presenta un estampado vibrante de palmeras y tonos cálidos, evocando un ambiente tropical. Perfecta para un día al aire libre.",
      precio: 30000
    },
    {
      id: 5,
      imagen: camisa4,
      titulo: "Camiseta Negra",
      descripcion: "Diseño discreto con texto impreso en el centro, dando un toque misterioso y casual.",
      precio: 30000
    },
    {
      id: 6,
      imagen: camisa6,
      titulo: "Camiseta Beige",
      descripcion: "Diseño sencillo y natural con una gran palmera negra centrada, ideal para un estilo relajado y minimalista.",
      precio: 30000
    }
  ];

  // Manejadores de modales
  const abrirModalDetalles = (producto) => {
    setModalData({
      detallesVisible: true,
      verCamisaVisible: false,
      productoSeleccionado: producto
    });
  };

  const abrirModalVerCamisa = (producto) => {
    setModalData({
      detallesVisible: false,
      verCamisaVisible: true,
      productoSeleccionado: producto
    });
  };

  const cerrarModales = () => {
    setModalData({
      detallesVisible: false,
      verCamisaVisible: false,
      productoSeleccionado: null
    });
  };

  // Función para renderizar tarjetas de producto
  const renderizarProducto = (producto) => {
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4" key={producto.id}>
        <div className="card" style={{ width: '100%' }}>
          <div className="image-container">
            <img 
              src={producto.imagen} 
              className="card-img-top" 
              alt={producto.titulo} 
              style={{ width: '100%', height: '250px', objectFit: 'contain' }} 
            />
            <div className="hover-buttons">
              <button 
                className="btn-11 btn-11" 
                onClick={() => abrirModalDetalles(producto)}
              >
                Ver Detalles
              </button>
              <button 
                className="btn-22 btn-22" 
                onClick={() => abrirModalVerCamisa(producto)}
              >
                Ver Camisa
              </button>
              <button className="btn-33 btn-33">Comprar Ahora</button>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{producto.titulo}</h5>
            <p className="card-text">{producto.descripcion}</p>
            <div className='dotos'>
              <button className="precio btn-primary">${producto.precio.toLocaleString()}</button>
              <button className='carritosss'>
                <ShoppingCartIcon className='logocar'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="h111">¡Te Encantará Comprar Aquí!</h1>
          <p className="sub1">Explora Nuestra Amplia Gama de Productos y Encuentra lo que Necesitas</p>
        </div>

        {/* Primera fila de productos */}
        <div className="row cajasss">
          {productos.slice(0, 3).map(renderizarProducto)}
        </div>

        {/* Segunda fila de productos */}
        <div className="row cajasss">
          {productos.slice(3, 6).map(renderizarProducto)}
        </div>
      </div>

      {/* Modales */}
      <Schopcar
        estado={modalData.detallesVisible}
        cambiarEstado={cerrarModales}
        producto={modalData.productoSeleccionado}
      />
      
      <VerC 
        estado={modalData.verCamisaVisible}
        cambiarEstado={cerrarModales}
        producto={modalData.productoSeleccionado}
      />
    </div>
  );
};

export default Shop;