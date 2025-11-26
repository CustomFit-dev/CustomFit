// src/components/Header_l.jsx
import React, { useState } from 'react';
import { useAuth } from './authcontext';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Themes';

import logo from './mod_img/Logo-prin-f.png';
import { useCart } from '../../context/CartContext';
import '../../scss/cartDrawer.scss';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

const pages = [
  { name: 'Inicio', route: '/Home_L#home' },
  { name: '¿Como personalizar?', route: '/Home_L#video' },
  { name: 'Comentarios', route: '/Home_L#comentarios' },
  { name: 'Personalizar', route: '/personalizar' },
  { name: 'Tienda', route: '/Store' },
];

const settings = [
  { name: 'Perfil', route: '/Profile', icon: <AccountCircleIcon /> },
  { name: 'Administración', route: '/admin', icon: <AdminPanelSettingsIcon /> },
  { name: 'Cerrar sesión', route: '#', icon: <ExitToAppIcon /> },
];

function Header_l() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { cart, removeItem, totalItems, totalPrice } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setCartOpen(open);
  };

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/Home');
  };

  const handleScrollToId = (id) => {
    if (window.location.pathname !== '/Home_L') {
      navigate('/Home_L');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
    handleCloseNavMenu();
  };

  const menuButtonStyles = {
    my: 2,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': { color: '#ffffff' },
  };

  const textStyles = {
    ml: 1,
    color: 'white',
    transition: 'color 0.3s ease',
    '&:hover': { color: '#17BEBB' },
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ zIndex: 1300 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ zIndex: 1300 }}>
            {/* Logo grande */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/Home_L"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={logo} alt="logo" id="logo" />
            </Typography>

            {/* Menú pequeño */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="abrir menú de navegación"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => {
                      if (page.name === 'Comentarios') handleScrollToId('comentarios');
                      else if (page.name === '¿Como personalizar?') handleScrollToId('video');
                      else {
                        handleCloseNavMenu();
                        navigate(page.route);
                      }
                    }}
                  >
                    <Typography textAlign="center" sx={{ width: '100%' }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo pequeño */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/Home_L"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={logo} alt="logo" id="logo" />
            </Typography>

            {/* Botones grandes */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'flex-end',
                marginRight: 2,
              }}
            >
              {pages.map((page) => {
                if (page.name === 'Comentarios') {
                  return (
                    <Button key={page.name} onClick={() => handleScrollToId('comentarios')} sx={menuButtonStyles}>
                      <Typography sx={textStyles}>{page.name}</Typography>
                    </Button>
                  );
                } else if (page.name === '¿Como personalizar?') {
                  return (
                    <Button key={page.name} onClick={() => handleScrollToId('video')} sx={menuButtonStyles}>
                      <Typography sx={textStyles}>{page.name}</Typography>
                    </Button>
                  );
                } else {
                  return (
                    <Button key={page.name} component={Link} to={page.route} sx={menuButtonStyles}>
                      <Typography sx={textStyles}>{page.name}</Typography>
                    </Button>
                  );
                }
              })}
            </Box>

            {/* Usuario y Carrito */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>

              <IconButton color="inherit" onClick={toggleCart(true)} sx={{ marginRight: 2 }}>
                <Badge badgeContent={totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isAuthenticated ? (
                <>
                  <Typography variant="body1" sx={{ marginRight: 2, color: 'white' }}>
                    {user?.nombreUsuario || 'Usuario'}
                  </Typography>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={user?.nombreUsuario || 'Usuario'} src={user?.avatarUrl} />
                    </IconButton>
                  </Tooltip>
                </>
              ) : (
                <Button color="inherit" onClick={handleOpenUserMenu}>
                  Iniciar Sesión
                </Button>
              )}

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <React.Fragment key={setting.name}>
                    {index === 3 && <Divider />}
                    <MenuItem
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.name === 'Cerrar sesión') handleLogout();
                        else if (setting.route && setting.route !== '#' && setting.route !== '') navigate(setting.route);
                      }}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      {setting.icon}
                      <Typography textAlign="center" sx={{ ml: 1 }}>
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  </React.Fragment>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart(false)}>
        <div className="cart-drawer-container" role="presentation">
          <div className="cart-header">
            <h2>
              <ShoppingCartIcon /> Tu Carrito
            </h2>
            <button className="close-btn" onClick={toggleCart(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {cart.items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCartIcon />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.items.map((item) => {
                const producto = item.producto || item.producto_personalizado;
                const isPersonalized = !!item.producto_personalizado;
                const nombre = isPersonalized ? producto?.NombrePersonalizado : producto?.NombreProductos;
                const imagen = producto?.urlFrontal || "https://via.placeholder.com/150";
                const precio = isPersonalized ? producto?.precioPersonalizado : producto?.PrecioProducto;

                return (
                  <div className="cart-item" key={item.id}>
                    <div className="item-image">
                      <img src={imagen} alt={nombre} />
                    </div>
                    <div className="item-details">
                      <h4>{nombre}</h4>
                      <div className="item-meta">
                        <span>Cant: {item.cantidad}</span>
                        {isPersonalized && <span className="badge-personalizado">Personalizado</span>}
                      </div>
                      <div className="item-price">
                        ${(precio * item.cantidad).toLocaleString()}
                      </div>
                    </div>
                    <button className="delete-btn" onClick={() => removeItem(item.id)}>
                      <DeleteIcon fontSize="small" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="cart-footer">
            <div className="total-row">
              <span>Total estimado</span>
              <strong>${totalPrice.toLocaleString()}</strong>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                setCartOpen(false);
                navigate('/checkout');
              }}
              disabled={cart.items.length === 0}
            >
              FINALIZAR COMPRA
            </button>
          </div>
        </div>
      </Drawer>
    </ThemeProvider>
  );
}

export default Header_l;
