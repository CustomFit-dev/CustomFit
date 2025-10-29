import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Badge from '@mui/material/Badge';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { getCart, removeFromCart, clearCart, cartTotal, cartCount, CART_EVENT_NAME, fetchServerCart, removeFromServerCart, clearServerCart } from './cartUtils';
function CartModal({ open, onClose, user, authToken }) {
  const userId = user?.id || user?.nombreUsuario || 'guest';
  const [items, setItems] = useState(() => getCart(userId));

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      if (authToken) {
        const serverCart = await fetchServerCart(authToken);
        if (serverCart && Array.isArray(serverCart.items) && mounted) {
          // server items use fields: nombre, precio, cantidad, id
          setItems(serverCart.items.map((it) => ({ id: it.id, name: it.nombre, price: parseFloat(it.precio || 0), quantity: it.cantidad })));
          return;
        }
      }
      // local fallback
      if (mounted) setItems(getCart(userId));
    };

    load();

    const onStorage = (e) => {
      if (!authToken) setItems(getCart(userId));
    };

    const onCartUpdated = (e) => {
      if (!authToken) {
        if (!e?.detail || !e.detail.userId || e.detail.userId === userId) {
          setItems(getCart(userId));
        }
      }
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener(CART_EVENT_NAME, onCartUpdated);
    return () => {
      mounted = false;
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(CART_EVENT_NAME, onCartUpdated);
    };
  }, [userId, authToken, open]);

  const handleRemove = async (id) => {
    if (authToken) {
      await removeFromServerCart(authToken, id);
      const serverCart = await fetchServerCart(authToken);
      if (serverCart && Array.isArray(serverCart.items)) {
        setItems(serverCart.items.map((it) => ({ id: it.id, name: it.nombre, price: parseFloat(it.precio || 0), quantity: it.cantidad })));
      }
    } else {
      removeFromCart(userId, id);
      setItems(getCart(userId));
    }
  };

  const handleClear = async () => {
    if (authToken) {
      await clearServerCart(authToken);
      setItems([]);
    } else {
      clearCart(userId);
      setItems([]);
    }
  };

  const total = authToken ? items.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0) : cartTotal(userId);
  const count = authToken ? items.reduce((s, it) => s + (it.quantity || 0), 0) : cartCount(userId);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          position: 'absolute',
          top: { xs: 56, sm: 64 },
          right: 16,
          margin: 0,
          width: { xs: '95%', sm: 420 },
        },
      }}
    >
      <DialogTitle sx={{ p: 2, pt: 1 }}>
        <Typography variant="h6">Tu carrito</Typography>
        <Typography variant="subtitle2" sx={{ position: 'absolute', left: 16, top: 18 }}>
          {count} {count === 1 ? 'item' : 'items'}
        </Typography>
        {/* Close X top-right */}
        <IconButton onClick={onClose} size="small" sx={{ position: 'absolute', right: 8, top: 8 }} aria-label="cerrar">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1 }}>
        {items.length === 0 ? (
          <Typography variant="body1">No tienes productos en el carrito.</Typography>
        ) : (
          <List>
            {items.map((it) => (
              <ListItem key={it.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(it.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText
                  primary={`${it.name || it.title || 'Producto'}`}
                  secondary={`Cantidad: ${it.quantity || 1} • Precio: $${(it.price || 0).toFixed(2)}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', px: 3 }}>
        <div>
          <Button color="inherit" onClick={handleClear} disabled={items.length === 0}>
            Limpiar
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Typography variant="subtitle1">Total: ${total.toFixed(2)}</Typography>
          <Button variant="contained" color="primary" onClick={() => { alert('Proceder a pagar (implementar)'); }} disabled={items.length === 0}>
            Comprar
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default function CartModalWrapper(props) {
  // envolver con Badge para uso futuro si se quiere mostrar contador en el header
  return <CartModal {...props} />;
}
