// src/components/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "../../scss/checkout.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
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

  const finalizarPedido = async () => {
    if (!formData.nombre || !formData.telefono || !formData.direccion || !formData.ciudad || !formData.metodoPago) {
      Swal.fire("Campos incompletos", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/checkout/", {
        formulario: formData,
        carrito: cart.items,
        total: totalPrice,
      });

      Swal.fire("Pedido completado", "Tu pedido fue registrado correctamente", "success");
      clearCart();
      navigate("/");

    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Ocurrió un problema al registrar el pedido", "error");
    }
  };

  return (
    <div className="checkout-container">
      <h1>Finalizar Compra</h1>

      <div className="checkout-content">

        {/* LISTA DE PRODUCTOS */}
        <div className="checkout-cart">
          <h3>Productos del Carrito</h3>
          {cart.items.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            cart.items.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.producto.urlFrontal} alt="" />
                <div>
                  <h4>{item.producto.NombreProductos}</h4>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Precio total: ${(item.producto.PrecioProducto * item.cantidad).toLocaleString()}</p>
                </div>
              </div>
            ))
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

          <select name="metodoPago" value={formData.metodoPago} onChange={handleChange}>
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
