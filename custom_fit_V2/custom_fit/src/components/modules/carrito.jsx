// src/components/Cart.jsx
import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Cart = ({ cartItems = [], removeFromCart = () => {}, onCheckout = () => {} }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenCart = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorEl(null);
  };

  // Total calculado de forma segura
  const totalPrice = (cartItems || []).reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenCart}>
        <Badge badgeContent={cartItems.length || 0} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseCart}
        PaperProps={{ style: { minWidth: 300 } }}
      >
        <Typography variant="h6" sx={{ px: 2, pt: 1 }}>
          Carrito
        </Typography>
        <Divider />

        {cartItems.length === 0 ? (
          <MenuItem disabled>No hay productos en el carrito</MenuItem>
        ) : (
          cartItems.map((item, index) => (
            <MenuItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Typography variant="subtitle2">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Cantidad: {item.quantity} x ${item.price?.toLocaleString()}
                </Typography>
              </div>
              <Typography
                variant="body2"
                color="error"
                sx={{ cursor: 'pointer' }}
                onClick={() => removeFromCart(item.id)}
              >
                X
              </Typography>
            </MenuItem>
          ))
        )}

        {cartItems.length > 0 && (
          <>
            <Divider />
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="subtitle1">${totalPrice.toLocaleString()}</Typography>
            </MenuItem>
            <MenuItem onClick={onCheckout} sx={{ justifyContent: 'center', fontWeight: 'bold' }}>
              Ir a pagar
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default Cart;
