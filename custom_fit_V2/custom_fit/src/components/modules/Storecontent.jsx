// src/components/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import "../../scss/store.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VerC from "../modules/verCamisa";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../modules/authcontext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Shop = () => {
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, removeItem, totalItems, totalPrice } =
    useCart();

  const [productos, setProductos] = useState([]);
  const [modalData, setModalData] = useState({
    verCamisaVisible: false,
    productoSeleccionado: null,
  });

  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/productos/", {
        headers: { Authorization: `Token ${authToken}` },
      });
      setProductos(res.data ?? []);
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

  const productosFiltrados = (productos ?? [])
    .filter((p) => {
      if (filtro === "camisas") return p.TipoProductos?.toLowerCase() === "camisas";
      if (filtro === "personalizadas")
        return p.TipoProductos?.toLowerCase().includes("personalizada");
      return true;
    })
    .sort((a, b) => (filtro === "a-z" ? a.NombreProductos?.localeCompare(b.NombreProductos) : 0));

  const renderizarProducto = (producto) => {
    const imagen = producto?.urlFrontal || "https://via.placeholder.com/250x250?text=Sin+imagen";
    const esPersonalizada = producto?.TipoProductos?.toLowerCase().includes("personalizada");

    return (
      <div className="col-12 col-sm-6 col-md-4 mb-4" key={producto?.idProductos}>
        <div className="card card-producto animate__animated animate__fadeInUp">
          <div className="image-container">
            <img
              src={imagen}
              className="card-img-top"
              alt={producto?.NombreProductos ?? "Producto"}
              style={{ width: "100%", height: "250px", objectFit: "contain" }}
            />
            <div className="hover-buttons">
              {esPersonalizada ? (
                <button
                  className="btn-22"
                  onClick={() => navigate("/personalizar", { state: { producto } })}
                >
                  Personalizar
                </button>
              ) : (
                <button className="btn-22" onClick={() => abrirModalVerCamisa(producto)}>
                  Ver Camisa
                </button>
              )}
              <button className="btn-33" onClick={() => addToCart(producto)}>
                Comprar Ahora
              </button>
            </div>
          </div>

          <div className="card-body">
            <h5 className="card-title">{producto?.NombreProductos ?? "Sin nombre"}</h5>
            <p className="card-text">{producto?.Descripcion ?? ""}</p>
            <p className="precio-texto">${((producto?.PrecioProducto) ?? 0).toLocaleString()}</p>
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
      {/* FILTROS */}
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

      {/* ENCABEZADO */}
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="h111">¡Te Encantará Comprar Aquí!</h1>
          <p className="sub1">Explora Nuestra Amplia Gama de Productos y Encuentra lo que Necesitas</p>
        </div>

        <div className="row cajasss">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map(renderizarProducto)
          ) : (
            <p className="text-center mt-4">No se encontraron productos.</p>
          )}
        </div>
      </div>

      {/* MODAL */}
      <VerC
        estado={modalData.verCamisaVisible}
        cambiarEstado={cerrarModales}
        producto={modalData.productoSeleccionado}
      />

      {/* MODAL */}
      <VerC
        estado={modalData.verCamisaVisible}
        cambiarEstado={cerrarModales}
        producto={modalData.productoSeleccionado}
      />
    </div>
  );
};

export default Shop;
