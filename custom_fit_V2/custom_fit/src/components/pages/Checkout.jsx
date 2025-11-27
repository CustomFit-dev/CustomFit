// src/components/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../modules/authcontext";
import "../../scss/checkout.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice, clearCart, removeItem, updateItem } = useCart();
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const [processingPayment, setProcessingPayment] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    ciudad: "",
    metodoPago: "simulado",
    // Datos de tarjeta simulada
    numeroTarjeta: "",
    nombreTitular: "",
    fechaExpiracion: "",
    cvv: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    const name = e.target.name;

    // Formatear número de tarjeta (espacios cada 4 dígitos)
    if (name === "numeroTarjeta") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
      if (value.length > 19) value = value.substring(0, 19);
    }

    // Formatear fecha de expiración (MM/YY)
    if (name === "fechaExpiracion") {
      value = value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
      }
      if (value.length > 5) value = value.substring(0, 5);
    }

    // Limitar CVV a 3 dígitos
    if (name === "cvv") {
      value = value.replace(/\D/g, "").substring(0, 3);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTallaChange = (itemId, talla) => {
    updateItem(itemId, { talla });
  };

  const validarFormulario = () => {
    if (
      !formData.nombre ||
      !formData.telefono ||
      !formData.direccion ||
      !formData.ciudad
    ) {
      Swal.fire(
        "Campos incompletos",
        "Por favor completa todos los campos de envío",
        "warning"
      );
      return false;
    }

    // Solo validar talla para productos NO personalizados
    const sinTalla = cart.items.filter((item) => !item.producto_personalizado && !item.talla);
    if (sinTalla.length > 0) {
      Swal.fire(
        "Talla faltante",
        "Selecciona una talla para todos los productos de tienda",
        "warning"
      );
      return false;
    }

    // Validar datos de tarjeta
    if (!formData.numeroTarjeta || formData.numeroTarjeta.replace(/\s/g, "").length < 16) {
      Swal.fire("Error", "Número de tarjeta inválido", "warning");
      return false;
    }

    if (!formData.nombreTitular || formData.nombreTitular.length < 3) {
      Swal.fire("Error", "Nombre del titular inválido", "warning");
      return false;
    }

    if (!formData.fechaExpiracion || formData.fechaExpiracion.length !== 5) {
      Swal.fire("Error", "Fecha de expiración inválida (MM/YY)", "warning");
      return false;
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      Swal.fire("Error", "CVV inválido", "warning");
      return false;
    }

    return true;
  };

  const simularPago = async () => {
    // Simular procesamiento de pago (2 segundos)
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simular éxito del pago con 95% de probabilidad
        const exito = Math.random() > 0.05;
        resolve({
          exito,
          transaccionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          mensaje: exito ? "Pago procesado exitosamente" : "Pago rechazado",
        });
      }, 2000);
    });
  };

  const procesarPago = async () => {
    if (!validarFormulario()) return;

    setProcessingPayment(true);

    try {
      // Mostrar mensaje de procesamiento
      Swal.fire({
        title: "Procesando pago...",
        html: "Por favor espera mientras procesamos tu pago",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Simular el pago
      const resultadoPago = await simularPago();

      if (!resultadoPago.exito) {
        Swal.fire({
          icon: "error",
          title: "Pago rechazado",
          text: "Tu tarjeta fue rechazada. Por favor intenta con otra tarjeta.",
        });
        setProcessingPayment(false);
        return;
      }

      // Crear pedido en el backend
      await axios.post(
        "http://localhost:8000/checkout/finalizar/",
        {
          direccion: formData.direccion,
          ciudad: formData.ciudad,
          metodo_pago: "tarjeta_simulada",
          detalles_pago: {
            transaccion_id: resultadoPago.transaccionId,
            ultimos_digitos: formData.numeroTarjeta.slice(-4),
            titular: formData.nombreTitular,
          },
          productos: cart.items.map((item) => ({
            id: item.id,
            cantidad: item.cantidad,
            talla: item.talla,
          })),
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "¡Pago exitoso!",
        html: `
          <p>Tu pedido ha sido confirmado</p>
          <p><strong>ID de transacción:</strong> ${resultadoPago.transaccionId}</p>
          <p><strong>Total pagado:</strong> $${totalPrice.toLocaleString()}</p>
        `,
        confirmButtonText: "Ver mis pedidos",
      });

      clearCart();
      navigate("/store");
    } catch (error) {
      console.error(error.response || error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un problema al procesar tu pedido. Por favor intenta nuevamente.",
      });
    } finally {
      setProcessingPayment(false);
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
          <h3>Datos de Envío</h3>

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

          <h3 style={{ marginTop: "30px" }}>Datos de Pago</h3>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "15px" }}>
            💳 Pago simulado - Usa cualquier número de tarjeta de 16 dígitos
          </p>

          <input
            type="text"
            name="numeroTarjeta"
            placeholder="Número de tarjeta (16 dígitos)"
            value={formData.numeroTarjeta}
            onChange={handleChange}
            maxLength="19"
          />

          <input
            type="text"
            name="nombreTitular"
            placeholder="Nombre del titular"
            value={formData.nombreTitular}
            onChange={handleChange}
          />

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              name="fechaExpiracion"
              placeholder="MM/YY"
              value={formData.fechaExpiracion}
              onChange={handleChange}
              style={{ flex: 1 }}
            />

            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>

          <button
            className="btn-finalizar"
            onClick={procesarPago}
            disabled={processingPayment}
          >
            {processingPayment ? "Procesando..." : `Pagar $${totalPrice.toLocaleString()}`}
          </button>

          <p style={{ fontSize: "12px", color: "#999", marginTop: "10px", textAlign: "center" }}>
            🔒 Pago seguro simulado - No se procesarán cargos reales
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
