import React, { useState } from 'react';
import '../../scss/store.scss';
import '../../scss/_productModal.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import camisa1 from '../../img/camisa1.jpg';
import camisa2 from '../../img/camisa2.jpg';
import camisa3 from '../../img/2104.jpg';
import camisa4 from '../../img/camisa4.webp';
import camisa5 from '../../img/camisa5.jpg';
import camisa6 from '../../img/camisa6.jpg';
import { FaShoppingCart, FaHeart, FaRegHeart, FaSearchPlus, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProductModal from './ProductModal';
import ShirtViewerModal from './ShirtViewerModal';

const Shop = () => {
  const [modalData, setModalData] = useState({
    detallesVisible: false,
    verCamisaVisible: false,
    productoSeleccionado: null,
    vistaActual: 'frente' // 'frente', 'estampado', 'atras'
  });
  
  // Datos de productos mejorados
  const productos = [
    {
      id: 1,
      imagen: camisa1,
      images: [camisa1, camisa2, camisa3],
      titulo: "Camiseta Beige",
      descripcion: "Camiseta relajada con un diseño minimalista que combina un paisaje de atardecer rojo detrás de una palmera negra, ideal para estilos casuales. Fabricada en algodón 100% orgánico para máxima comodidad.",
      precio: 59900,
      colores: ['#f5d7b3', '#d4a76a', '#b38b6d'],
      tallas: ['XS', 'S', 'M', 'L', 'XL'],
      categoria: "Camisetas",
      sku: "CF-001",
      stock: 15,
      material: "100% Algodón orgánico",
      cuidados: "Lavable a máquina en agua fría. No usar lejía. Planchar a baja temperatura.",
      envio: "Envío gratuito en pedidos superiores a $100.000"
    },
    {
      id: 2,
      imagen: camisa2,
      images: [camisa2, camisa3, camisa1],
      titulo: "Camiseta Rosa",
      descripcion: "Diseño sutil que presenta una ilustración en línea de palmeras y un horizonte, perfecta para un look fresco y ligero. Corte moderno y ajuste cómodo para todo el día.",
      precio: 54900,
      colores: ['#ffb6c1', '#ff69b4', '#db7093'],
      tallas: ['S', 'M', 'L', 'XL'],
      categoria: "Camisetas",
      sku: "CF-002",
      stock: 10,
      material: "95% Algodón, 5% Elastano",
      cuidados: "Lavar a máquina en agua fría. No usar secadora. Planchar a baja temperatura.",
      envio: "Envío gratuito en pedidos superiores a $100.000"
    },
    {
      id: 3,
      imagen: camisa3,
      images: [camisa3, camisa1, camisa2],
      titulo: "Camiseta Negra",
      descripcion: "Diseño moderno y elegante, con una palmera destacada dentro de un marco geométrico blanco, para estilos urbanos. Tela suave y transpirable.",
      precio: 64900,
      colores: ['#000000', '#2c3e50', '#34495e'],
      tallas: ['M', 'L', 'XL', 'XXL'],
      categoria: "Camisetas",
      sku: "CF-003",
      stock: 8,
      material: "100% Algodón peinado",
      cuidados: "Lavar a máquina en agua fría. No usar lejía. Secar a la sombra.",
      envio: "Envío gratuito en pedidos superiores a $100.000"
    },
    {
      id: 4,
      imagen: camisa4,
      images: [camisa4, camisa5, camisa6],
      titulo: "Camiseta Blanca",
      descripcion: "Presenta un estampado vibrante de palmeras y tonos cálidos, evocando un ambiente tropical. Perfecta para un día al aire libre. Corte regular para mayor comodidad.",
      precio: 57900,
      colores: ['#ffffff', '#f8f9fa', '#e9ecef'],
      tallas: ['XS', 'S', 'M', 'L'],
      categoria: "Camisetas",
      sku: "CF-004",
      stock: 12,
      material: "100% Algodón orgánico",
      cuidados: "Lavar a máquina en agua fría. No usar blanqueador.",
      envio: "Envío gratuito en pedidos superiores a $100.000"
    },
    {
      id: 5,
      imagen: camisa5,
      images: [camisa5, camisa6, camisa4],
      titulo: "Camiseta Negra Estampada",
      descripcion: "Diseño discreto con texto impreso en el centro, dando un toque misterioso y casual. Ideal para combinar con cualquier prenda.",
      precio: 52900,
      colores: ['#000000', '#1a1a1a', '#333333'],
      tallas: ['S', 'M', 'L', 'XL'],
      categoria: "Camisetas",
      sku: "CF-005",
      stock: 20,
      material: "100% Algodón",
      cuidados: "Lavar a máquina en agua fría. No planchar directamente sobre el estampado.",
      envio: "Envío gratuito en pedidos superiores a $100.000"
    },
    {
      id: 6,
      imagen: camisa6,
      images: [camisa6, camisa4, camisa5],
      titulo: "Camiseta Beige Minimalista",
      descripcion: "Diseño sencillo y natural con una gran palmera negra centrada, ideal para un estilo relajado y minimalista. Perfecta para el día a día.",
      precio: 59900,
      colores: ['#f5e6d3', '#e6d5b8', '#d4c0a1'],
      tallas: ['XS', 'S', 'M', 'L', 'XL'],
      categoria: "Camisetas",
      sku: "CF-006",
      stock: 18,
      material: "100% Algodón orgánico",
      cuidados: "Lavar a máquina en agua fría. Secar a la sombra.",
      envio: "Envío gratuito en pedidos superiores a $100.000"
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
      productoSeleccionado: producto,
      vistaActual: 'frente' // Reset to front view when opening
    });
  };

  const cambiarVistaCamisa = (vista) => {
    setModalData(prev => ({
      ...prev,
      vistaActual: vista
    }));
  };

  const cerrarModales = () => {
    setModalData({
      detallesVisible: false,
      verCamisaVisible: false,
      productoSeleccionado: null
    });
  };
  
  const handleViewProduct = () => {
    setModalData(prev => ({
      detallesVisible: false,
      verCamisaVisible: true,
      productoSeleccionado: prev.productoSeleccionado
    }));
  };

  // Componente de tarjeta de producto
  const ProductoCard = ({ producto }) => {
    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4">
        <div className="card">
          <div className="image-container">
            <img 
              src={producto.imagen} 
              className="card-img-top" 
              alt={producto.titulo}
            />
            <div className="hover-buttons" style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              padding: '20px 15px'
            }}>
              <button 
                className="btn-details"
                onClick={() => abrirModalDetalles(producto)}
                style={{
                  marginBottom: '10px'
                }}
              >
                Ver Detalles
              </button>
              <button 
                className="btn-view"
                onClick={() => abrirModalVerCamisa(producto)}
              >
                Ver Camisa
              </button>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{producto.titulo}</h5>
            <p className="card-text">
              {producto.descripcion.length > 100 
                ? `${producto.descripcion.substring(0, 100)}...` 
                : producto.descripcion}
            </p>
            <div className="dotos" style={{
              display: 'flex',
              justifyContent: 'center',  // Centrar los elementos
              alignItems: 'center',
              padding: '0 20px',
              marginTop: '15px',
              width: '100%',
              boxSizing: 'border-box',
              gap: '30px'  // Espacio reducido entre elementos
            }}>
              <button className="precio btn-primary" style={{
                margin: 0,
                padding: '8px 16px',
                fontSize: '1.1em',
                fontWeight: 'bold',
                margin: '0 15px 0 0'  // Margen derecho reducido
              }}>
                ${producto.precio.toLocaleString()}
              </button>
              <button 
                className="carritosss"
                onClick={() => abrirModalDetalles(producto)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  transition: 'background-color 0.3s',
                  margin: '0 0 0 15px'  // Margen izquierdo reducido
                }}
              >
                <FaShoppingCart className="logocar" style={{
                  fontSize: '1.4em',
                  color: '#17BEBB'
                }}/>
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
          {productos.slice(0, 3).map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>

        {/* Segunda fila de productos */}
        <div className="row cajasss">
          {productos.slice(3, 6).map((producto) => (
            <ProductoCard key={producto.id} producto={producto} />
          ))}
        </div>
      </div>

      {/* Modal de detalles del producto */}
      {modalData.detallesVisible && modalData.productoSeleccionado && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={cerrarModales}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              padding: '30px'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={cerrarModales}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                zIndex: 10
              }}
            >
              <FaTimes />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '20px' }}>
                <img 
                  src={modalData.productoSeleccionado.imagen} 
                  alt={modalData.productoSeleccionado.titulo}
                  style={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                />
              </div>
              <div>
                <h3 style={{
                  fontSize: '24px',
                  margin: '0 0 10px',
                  color: '#333'
                }}>
                  {modalData.productoSeleccionado.titulo}
                </h3>
                <p style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#17BEBB',
                  margin: '0 0 20px'
                }}>
                  ${modalData.productoSeleccionado.precio.toLocaleString()}
                </p>
                <p style={{
                  color: '#666',
                  lineHeight: '1.6',
                  margin: '0 0 20px'
                }}>
                  {modalData.productoSeleccionado.descripcion}
                </p>
                <div>
                  <button 
                    style={{
                      backgroundColor: '#17BEBB',
                      color: 'white',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '600',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseOver={e => e.target.style.backgroundColor = '#139a9a'}
                    onMouseOut={e => e.target.style.backgroundColor = '#17BEBB'}
                    onClick={e => {
                      e.stopPropagation();
                      cerrarModales();
                      abrirModalVerCamisa(modalData.productoSeleccionado);
                    }}
                  >
                    Ver más detalles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de vista de camisa */}
      {modalData.verCamisaVisible && modalData.productoSeleccionado && (
        <ShirtViewerModal
          producto={modalData.productoSeleccionado}
          onClose={cerrarModales}
          onChangeView={cambiarVistaCamisa}
          vistaActual={modalData.vistaActual}
        />
      )}
    </div>
  );
};

export default Shop;