import React, { useEffect, useState } from "react";
import "../../scss/store.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerC from "../modules/verCamisa";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../modules/authcontext";
import { useNavigate } from "react-router-dom"; // para redireccionar

const Shop = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [modalData, setModalData] = useState({
    verCamisaVisible: false,
    productoSeleccionado: null,
  });

  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/productos/", {
        headers: { Authorization: `Token ${authToken}` },
      });
      setProductos(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los productos.", "error");
    }
  };

  const abrirModalVerCamisa = (producto) => {
    setModalData({
      verCamisaVisible: true,
      productoSeleccionado: producto,
    });
  };

  const cerrarModales = () => {
    setModalData({
      verCamisaVisible: false,
      productoSeleccionado: null,
    });
  };

  const addToCart = (producto) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.idProductos === producto.idProductos
      );
      if (existing) {
        return prev.map((item) =>
          item.idProductos === producto.idProductos
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
    setCartVisible(true);
  };

  const removeFromCart = (productoId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.idProductos !== productoId)
    );
  };

  const updateQuantity = (productoId, cantidad) => {
    if (cantidad < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.idProductos === productoId ? { ...item, cantidad } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.PrecioProducto * item.cantidad,
    0
  );

  const productosFiltrados = productos
    .filter((p) => {
      if (filtro === "camisas")
        return p.TipoProductos?.toLowerCase() === "camisas";
      if (filtro === "personalizadas")
        return p.TipoProductos?.toLowerCase().includes("personalizada");
      return true;
    })
    .sort((a, b) =>
      filtro === "a-z" ? a.NombreProductos.localeCompare(b.NombreProductos) : 0
    );

  const renderizarProducto = (producto) => {
    const imagen =
      producto.urlFrontal ||
      "https://via.placeholder.com/250x250?text=Sin+imagen";
    const esPersonalizada =
      producto.TipoProductos?.toLowerCase().includes("personalizada");

    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4" key={producto.idProductos}>
        <div className="card card-producto animate__animated animate__fadeInUp">
          <div className="image-container">
            <img
              src={imagen}
              className="card-img-top"
              alt={producto.NombreProductos}
              style={{ width: "100%", height: "250px", objectFit: "contain" }}
            />
            <div className="hover-buttons">
              {esPersonalizada ? (
                <button
                  className="btn-22"
                  onClick={() =>
                    navigate("/personalizar", { state: { producto } })
                  }
                >
                  Personalizar
                </button>
              ) : (
                <button
                  className="btn-22"
                  onClick={() => abrirModalVerCamisa(producto)}
                >
                  Ver Camisa
                </button>
              )}
              <button className="btn-33" onClick={() => addToCart(producto)}>
                Comprar Ahora
              </button>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">{producto.NombreProductos}</h5>
            <p className="card-text">{producto.Descripcion}</p>
            <p className="precio-texto">
              ${producto.PrecioProducto?.toLocaleString()}
            </p>
            <button
              className="btn btn-carrito d-flex align-items-center justify-content-center"
              onClick={() => addToCart(producto)}
            >
              <ShoppingCartIcon className="icon-carrito" />
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {/* Filtro */}
      <div className="row mb-4 mt-3">
        <div className="col-md-12 d-flex filtro-container">
          <label htmlFor="filtro" className="filtro-label me-2 fw-bold">
            Filtrar por:
          </label>
          <select
            id="filtro"
            className="filtro-select"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="a-z">Orden A - Z</option>
            <option value="camisas">Camisas</option>
            <option value="personalizadas">Camisas Personalizadas</option>
          </select>
        </div>
      </div>

      {/* Encabezado */}
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="h111">¡Te Encantará Comprar Aquí!</h1>
          <p className="sub1">
            Explora Nuestra Amplia Gama de Productos y Encuentra lo que
            Necesitas
          </p>
        </div>

        <div className="row cajasss">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map(renderizarProducto)
          ) : (
            <p className="text-center mt-4">
              No se encontraron productos para este filtro.
            </p>
          )}
        </div>
      </div>

      {/* Modal Ver Camisa */}
      <VerC
        estado={modalData.verCamisaVisible}
        cambiarEstado={cerrarModales}
        producto={modalData.productoSeleccionado}
      />

      {/* Carrito flotante */}
      <div className={`cart-panel ${cartVisible ? "visible" : ""}`}>
        <h3>Carrito ({totalItems} items)</h3>
        <button className="close-cart" onClick={() => setCartVisible(false)}>
          X
        </button>
        {cartItems.length === 0 ? (
          <p>Tu carrito está vacío</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.idProductos}>
                <img
                  src={item.urlFrontal || "https://via.placeholder.com/50"}
                  alt={item.NombreProductos}
                />
                <div className="cart-item-info">
                  <h4>{item.NombreProductos}</h4>
                  <p>${item.PrecioProducto?.toLocaleString()}</p>
                  <input
                    type="number"
                    min={1}
                    value={item.cantidad}
                    onChange={(e) =>
                      updateQuantity(item.idProductos, parseInt(e.target.value))
                    }
                  />
                </div>
                <button onClick={() => removeFromCart(item.idProductos)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
        <h4>Total: ${totalPrice.toLocaleString()}</h4>
      </div>

      {/* Botón flotante para abrir carrito */}
      <button
        className="floating-cart-btn"
        onClick={() => setCartVisible(true)}
      >
        <ShoppingCartIcon /> ({totalItems})
      </button>
    </div>
  );
};

export default Shop;
