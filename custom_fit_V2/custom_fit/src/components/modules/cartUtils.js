// Utilidades simples para el carrito, persisten por usuario en localStorage
export const CART_EVENT_NAME = 'cartUpdated';

const storageKey = (userId) => `cart_${userId || 'guest'}`;

export function getCart(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getCart error', e);
    return [];
  }
}

export function setCart(userId, cart) {
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(cart));
    // emitir evento para notificar componentes
    window.dispatchEvent(new CustomEvent(CART_EVENT_NAME, { detail: { userId } }));
  } catch (e) {
    console.error('setCart error', e);
  }
}

export function addToCart(userId, item) {
  const cart = getCart(userId);
  // si ya existe el item por id, incrementar cantidad
  const idx = cart.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    cart[idx].quantity = (cart[idx].quantity || 1) + (item.quantity || 1);
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }
  setCart(userId, cart);
}

export function removeFromCart(userId, itemId) {
  const cart = getCart(userId).filter((i) => i.id !== itemId);
  setCart(userId, cart);
}

export function clearCart(userId) {
  setCart(userId, []);
}

export function cartCount(userId) {
  const cart = getCart(userId);
  return cart.reduce((s, it) => s + (it.quantity || 0), 0);
}

export function cartTotal(userId) {
  const cart = getCart(userId);
  return cart.reduce((s, it) => s + (it.quantity || 0) * (it.price || 0), 0);
}

// --- Server-backed helpers (usables desde el frontend si el usuario está autenticado) ---
export async function fetchServerCart(authToken) {
  if (!authToken) return null;
  try {
    const res = await fetch('/api/cart/', {
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${authToken}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('fetchServerCart error', e);
    return null;
  }
}

export async function addToServerCart(authToken, payload) {
  if (!authToken) return null;
  try {
    const res = await fetch('/api/cart/items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${authToken}` },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.error('addToServerCart error', e);
    return null;
  }
}

export async function removeFromServerCart(authToken, itemId) {
  if (!authToken) return false;
  try {
    const res = await fetch(`/api/cart/items/${itemId}/`, { method: 'DELETE', headers: { Authorization: `Token ${authToken}` } });
    return res.ok;
  } catch (e) {
    console.error('removeFromServerCart error', e);
    return false;
  }
}

export async function clearServerCart(authToken) {
  if (!authToken) return false;
  try {
    const res = await fetch('/api/cart/clear/', { method: 'POST', headers: { Authorization: `Token ${authToken}` } });
    return res.ok;
  } catch (e) {
    console.error('clearServerCart error', e);
    return false;
  }
}
