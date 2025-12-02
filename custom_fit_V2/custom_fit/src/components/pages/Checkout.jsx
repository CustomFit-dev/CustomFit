// src/components/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../modules/authcontext";
import "../../scss/checkout.scss";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

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
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

    return true;
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

  // Configuración de PayPal
  const paypalOptions = {
    "client-id": "ARF2Hh6yUJtcnNkm7p9xLrpAXuBX0O-Xn82DMuMfPgHy2pnt41EIHs5Tr1nTE2rks1suIOWW4TdNIcOu",
    currency: "USD",
    intent: "capture",
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

          <div style={{ marginBottom: "15px", marginTop: "30px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>
              💳 Método de pago: PayPal
            </label>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Pago seguro procesado por PayPal (Sandbox)
            </p>
          </div>

          {/* PayPal Buttons */}
          <PayPalScriptProvider options={paypalOptions}>
            <div style={{ marginTop: "20px" }}>
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "paypal"
                }}
                disabled={processingPayment}
                createOrder={async (data, actions) => {
                  // Validar formulario antes de crear la orden
                  if (!validarFormulario()) {
                    return Promise.reject("Formulario incompleto");
                  }

                  setProcessingPayment(true);

                  try {
                    // Llamar al backend para crear la orden en PayPal
                    const response = await axios.post(
                      "http://localhost:8000/api/paypal/create-order/",
                      {
                        amount: totalPrice,
                        currency: "USD",
                        direccion: formData.direccion,
                        ciudad: formData.ciudad,
                        cart_items: cart.items
                      },
                      {
                        headers: {
                          Authorization: `Token ${authToken}`,
                        },
                      }
                    );

                    if (response.data.success) {
                      return response.data.order_id;
                    } else {
                      throw new Error("Error al crear la orden");
                    }
                  } catch (error) {
                    console.error("Error creating PayPal order:", error);
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "No se pudo crear la orden de pago. Por favor intenta nuevamente.",
                    });
                    setProcessingPayment(false);
                    return Promise.reject(error);
                  }
                }}
                onApprove={async (data, actions) => {
                  try {
                    // Mostrar loading
                    Swal.fire({
                      title: "Procesando pago...",
                      html: "Por favor espera mientras confirmamos tu pago",
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading();
                      },
                    });

                    // Llamar al backend para capturar el pago
                    const response = await axios.post(
                      "http://localhost:8000/api/paypal/capture-order/",
                      {
                        order_id: data.orderID,
                        direccion: formData.direccion,
                        ciudad: formData.ciudad,
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

                    if (response.data.success) {
                      const pedidoId = response.data.pedido_id;

                      // Descargar automáticamente el comprobante de pago
                      try {
                        const receiptUrl = `http://localhost:8000/api/pedidos/${pedidoId}/comprobante/`;
                        const receiptResponse = await axios.get(receiptUrl, {
                          headers: {
                            Authorization: `Token ${authToken}`,
                          },
                          responseType: 'blob', // Importante para descargar archivos
                        });

                        // Crear un link temporal para descargar el PDF
                        const blob = new Blob([receiptResponse.data], { type: 'application/pdf' });
                        const downloadUrl = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = downloadUrl;
                        link.download = `comprobante_pedido_${pedidoId}.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                        window.URL.revokeObjectURL(downloadUrl);
                      } catch (receiptError) {
                        console.error("Error descargando comprobante:", receiptError);
                        // No bloqueamos el flujo si falla la descarga del comprobante
                      }

                      Swal.fire({
                        icon: "success",
                        title: "¡Pago exitoso!",
                        html: `
                          <p>Tu pedido ha sido confirmado</p>
                          <p><strong>ID de transacción:</strong> ${response.data.transaction_id}</p>
                          <p><strong>Pedido #:</strong> ${response.data.pedido_id}</p>
                          <p><strong>Total pagado:</strong> $${response.data.total.toLocaleString()}</p>
                          <p style="color: #17BEBB; margin-top: 10px;">📄 Tu comprobante de pago se ha descargado automáticamente</p>
                        `,
                        confirmButtonText: "Ir a la tienda",
                      });

                      clearCart();
                      navigate("/store");
                    } else {
                      throw new Error(response.data.error || "Error al procesar el pago");
                    }
                  } catch (error) {
                    console.error("Error capturing PayPal order:", error);
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: error.response?.data?.error || "Ocurrió un problema al procesar tu pago. Por favor contacta soporte.",
                    });
                  } finally {
                    setProcessingPayment(false);
                  }
                }}
                onError={(err) => {
                  console.error("PayPal Error:", err);
                  Swal.fire({
                    icon: "error",
                    title: "Error de PayPal",
                    text: "Hubo un error con el pago de PayPal. Por favor intenta nuevamente.",
                  });
                  setProcessingPayment(false);
                }}
                onCancel={() => {
                  Swal.fire({
                    icon: "info",
                    title: "Pago cancelado",
                    text: "Has cancelado el pago. Puedes intentarlo nuevamente cuando quieras.",
                  });
                  setProcessingPayment(false);
                }}
              />
            </div>
          </PayPalScriptProvider>

          <p style={{ fontSize: "12px", color: "#999", marginTop: "15px", textAlign: "center" }}>
            🔒 Pago seguro con PayPal Sandbox (modo de prueba)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
