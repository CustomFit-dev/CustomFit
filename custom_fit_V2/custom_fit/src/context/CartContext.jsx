// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../components/modules/authcontext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [telas, setTelas] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  // FETCH CARRO
  const fetchCart = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}carrito/obtener/`, {
        headers: { Authorization: `Token ${authToken}` },
      });
      const itemsConTalla = res.data.items.map(item => ({
        ...item,
        talla: item.talla || "",
      }));
      setCart({ items: itemsConTalla });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo cargar el carrito.", "error");
    } finally {
      setLoading(false);
    }
  };

  // FETCH TELAS
  const fetchTelas = async () => {
    if (!authToken) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}telas/`, {
        headers: { Authorization: `Token ${authToken}` },
      });
      setTelas(res.data);
    } catch (err) {
      console.error("Error al cargar las telas:", err);
      setTelas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchTelas();
  }, [authToken]);

  const totalItems = cart.items.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = cart.items.reduce((sum, item) => {
    const price = item.producto?.PrecioProducto || item.producto_personalizado?.precioPersonalizado || 0;
    return sum + price * item.cantidad;
  }, 0);

  const addToCart = async (producto, cantidad = 1, isPersonalized = false) => {
    if (!authToken) return Swal.fire("Error", "Debes iniciar sesión.", "warning");

    const payload = isPersonalized
      ? { producto_personalizado_id: producto.idProductosPeronalizaos, cantidad }
      : { producto_id: producto.idProductos, cantidad };

    try {
      await axios.post(`${API_URL}carrito/agregar/`, payload, {
        headers: { Authorization: `Token ${authToken}` },
      });
      fetchCart();
      Swal.fire("Agregado", "Producto agregado al carrito.", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo agregar el producto al carrito.", "error");
    }
  };

  const updateQuantity = async (itemId, cantidad) => {
    if (!authToken) return;
    try {
      await axios.post(`${API_URL}carrito/actualizar/`, { item_id: itemId, cantidad }, {
        headers: { Authorization: `Token ${authToken}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo actualizar la cantidad.", "error");
    }
  };

  const removeItem = async (itemId) => {
    if (!authToken) return;
    try {
      await axios.post(`${API_URL}carrito/eliminar/`, { item_id: itemId }, {
        headers: { Authorization: `Token ${authToken}` },
      });
      fetchCart();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudo eliminar el producto.", "error");
    }
  };

  const updateItem = (itemId, updates) => {
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.map(item =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    }));
  };

  const clearCart = () => setCart({ items: [] });

  return (
    <CartContext.Provider
      value={{
        cart,
        telas,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        updateItem,
        clearCart,
        totalItems,
        totalPrice,
        fetchCart,
        fetchTelas,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
