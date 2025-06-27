// src/views/Shop.jsx

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

  const productos = [
    {
      id: 1,
      imagen: camisa1,
      titulo: "Camiseta Beige",
      descripcion: "Camiseta relajada con diseño de atardecer detrás de una palmera.",
      precio: 30000,
      talla: "M",
      color: "Beige",
      tela: "Algodón"
    },
    {
      id: 2,
      imagen: camisa2,
      titulo: "Camiseta Rosa",
      descripcion: "Diseño sutil con ilustración de palmeras y horizonte.",
      precio: 30000,
      talla: "L",
      color: "Rosa",
      tela: "Poliéster"
    },
    {
      id: 3,
      imagen: camisa3,
      titulo: "Camiseta Negra",
      descripcion: "Palmera destacada dentro de un marco geométrico.",
      precio: 30000,
      talla: "S",
      color: "Negro",
      tela: "Algodón"
    },
    {
      id: 4,
      imagen: camisa5,
      titulo: "Camiseta Blanca",
      descripcion: "Estampado vibrante de palmeras con tonos cálidos.",
      precio: 30000,
      talla: "XL",
      color: "Blanco",
      tela: "Fibra"
    },
    {
      id: 5,
      imagen: camisa4,
      titulo: "Camiseta Negra",
      descripcion: "Diseño con texto discreto en el centro.",
      precio: 30000,
      talla: "M",
      color: "Negro",
      tela: "Algodón"
    },
    {
      id: 6,
      imagen: camisa6,
      titulo: "Camiseta Beige",
      descripcion: "Palmera negra centrada, estilo minimalista.",
      precio: 30000,
      talla: "M",
      color: "Beige",
      tela: "Lino"
    }
  ];

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

  const renderizarProducto = (producto) => (
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
            <button className="btn-11" onClick={() => abrirModalDetalles(producto)}>Ver Detalles</button>
            <button className="btn-22" onClick={() => abrirModalVerCamisa(producto)}>Ver Camisa</button>
            <button className="btn-33">Comprar Ahora</button>
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

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="h111">¡Te Encantará Comprar Aquí!</h1>
          <p className="sub1">Explora Nuestra Amplia Gama de Productos</p>
        </div>

        <div className="row cajasss">
          {productos.slice(0, 3).map(renderizarProducto)}
        </div>

        <div className="row cajasss">
          {productos.slice(3, 6).map(renderizarProducto)}
        </div>
      </div>

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
