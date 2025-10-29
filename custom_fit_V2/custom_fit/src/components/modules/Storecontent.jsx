import React, { useState, useEffect } from 'react';
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
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar productos desde el backend (solo los que tengan rolProducto == 'tienda')
  useEffect(() => {
    let mounted = true;
    const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';
    const fetchData = async () => {
      try {
        // Usar URL absoluta hacia el backend para evitar que el dev server de React devuelva index.html
        const res = await fetch(`${API_BASE}/api/tienda_productos/`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!mounted) return;

        // Mapear datos del backend al formato que usa este componente
        const mapped = data.map((p) => ({
          id: p.idProductosPeronalizaos || p.idproductosperonalizaos || p.id || Math.random(),
          imagen: p.urlFrontal || p.urlFrontal || null,
          titulo: p.NombrePersonalizado || p.NombrePersonalizado || 'Producto',
          descripcion: p.descripcion || p.Descripcion || '',
          precio: p.precioPersonalizado || p.precioPersonalizado || 0,
          raw: p,
        }));

        // Si no hay imagen en backend, asignar imágenes locales como fallback (mantener diseño)
        const withFallback = mapped.map((item, idx) => ({
          ...item,
          imagen: item.imagen || [camisa1, camisa2, camisa3, camisa4, camisa5, camisa6][idx % 6]
        }));

        setProductos(withFallback);
      } catch (err) {
        console.error('Error cargando productos de tienda:', err);
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => { mounted = false };
  }, []);

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
              <button className="btn-33 btn-33">Agregar al carrito</button>
            </div>
          </div>
            <div className="card-body">
            <h5 className="card-title">{producto.titulo}</h5>
            <p className="card-text">{producto.descripcion}</p>
            {/* Badge de stock o categoría si viene */}
            <div style={{ marginBottom: 6 }}>
              <small className="text-muted">{producto.raw?.productos?.Tallas ? `Tallas: ${producto.raw.productos.Tallas}` : ''}</small>
            </div>
            <div className='dotos'>
              <button className="precio btn-primary">${producto.precio.toLocaleString()}</button>
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
          {loading ? (
            <div className="col-12 text-center">Cargando productos...</div>
          ) : error ? (
            <div className="col-12 text-center text-danger">Error: {error}</div>
          ) : productos.length === 0 ? (
            <div className="col-12 text-center">No hay productos disponibles en la tienda.</div>
          ) : (
            productos.slice(0, 3).map(renderizarProducto)
          )}
        </div>

        {/* Segunda fila de productos */}
        <div className="row cajasss">
          {(!loading && !error) && productos.slice(3, 6).map(renderizarProducto)}
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