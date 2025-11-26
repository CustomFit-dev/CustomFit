// src/components/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "../../scss/checkout.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice, clearCart, removeItem, updateItem } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    metodoPago: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTallaChange = (itemId, talla) => {
    updateItem(itemId, { talla }); // Actualizamos la talla de este item
  };

  const finalizarPedido = async () => {
    // Validación de campos generales
    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.direccion ||
      !formData.ciudad ||
      !formData.metodoPago
    ) {
      Swal.fire(
        "Campos incompletos",
        "Todos los campos son obligatorios",
        "warning"
      );
      return;
    }

    // Validar que todos los productos tengan talla seleccionada
    const sinTalla = cart.items.filter((item) => !item.talla);
    if (sinTalla.length > 0) {
      Swal.fire(
        "Talla faltante",
        "Selecciona una talla para todos los productos",
        "warning"
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/pedidos/crear/",
        {
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          metodo_pago: formData.metodoPago,
          productos: cart.items.map((item) => ({
            id: item.id,
            cantidad: item.cantidad,
            talla: item.talla,
          })),
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      Swal.fire(
        "Pedido completado",
        "Tu pedido fue registrado correctamente",
        "success"
      );
      clearCart();
      navigate("/store");
    } catch (error) {
      console.error(error.response || error);
      Swal.fire("Error", "Ocurrió un problema al registrar el pedido", "error");
    }
  };

  const handleRemoveItem = (itemId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este producto se eliminará del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        removeItem(itemId);
        Swal.fire(
          "Eliminado",
          "El producto fue eliminado del carrito",
          "success"
        );
      }
    });
  };

  return (
    <div className="checkout-container">
      {/* Botón de cerrar */}
      <div className="close-button">
        <button onClick={() => navigate("/store")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <h1>Finalizar Compra</h1>

      <div className="checkout-content">
        {/* LISTA DE PRODUCTOS */}
        <div className="checkout-cart">
          <h3>Productos del Carrito</h3>
          {cart.items.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            cart.items.map((item) => {
              const product = item.producto || item.producto_personalizado;
              const isPersonalized = !!item.producto_personalizado;

              const image = isPersonalized ? product.urlFrontal : product.urlFrontal;
              const name = isPersonalized ? product.NombrePersonalizado : product.NombreProductos;
              const price = isPersonalized ? product.precioPersonalizado : product.PrecioProducto;

              return (
                <div className="checkout-item" key={item.id}>
                  <img src={image} alt={name} />
                  <div>
                    <h4>{name} {isPersonalized && <span className="badge-personalizado">(Personalizado)</span>}</h4>
                    <p>Cantidad: {item.cantidad}</p>
                    <p>
                      Precio total: $
                      {(price * item.cantidad).toLocaleString()}
                    </p>

                    {isPersonalized ? (
                      <p className="talla-display">
                        <strong>Talla:</strong> {product.talla || "No seleccionada"}
                      </p>
                    ) : (
                      <select
                        value={item.talla || ""}
                        onChange={(e) => handleTallaChange(item.id, e.target.value)}
                      >
                        <option value="">Selecciona una talla</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>
                    )}

                    <button
                      className="btn-eliminar"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })
          )}

          <h2>Total: ${totalPrice.toLocaleString()}</h2>
        </div>

        {/* FORMULARIO */}
        <div className="checkout-form">
          <h3>Datos del Pedido</h3>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="telefono"
            placeholder="Número de teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
          />

          <input
            type="text"
            name="ciudad"
            placeholder="Ciudad"
            value={formData.ciudad}
            onChange={handleChange}
          />

          <select
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleChange}
          >
            <option value="">Método de pago</option>
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="contraentrega">Contraentrega</option>
          </select>

          <button className="btn-finalizar" onClick={finalizarPedido}>
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
