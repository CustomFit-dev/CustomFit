// src/components/Header.jsx
import React from 'react';
import { useAuth } from './authcontext';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';
import logo from './mod_img/Logo-prin-f.png';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Themes';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartModal from './CartModal';
import { cartCount, CART_EVENT_NAME, fetchServerCart } from './cartUtils';
import Badge from '@mui/material/Badge';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const pages = [
  { name: 'Inicio', route: '/Home_L#home' },
  { name: '¿Como personalizar?', route: '/Home_L#video' },
  { name: 'Comentarios', route: '/Home_L#comentarios' },
  { name: 'Personalizar', route: '/personalizar' },
  { name: 'Tienda', route: '/Store' },
  { name: 'Carrito', route: '#', icon: <ShoppingCartIcon /> },
];

const settings = [
  { name: 'Perfil', route: '/Profile', icon: <AccountCircleIcon /> },
  { name: 'Administracion', route: '/admin', icon: <AdminPanelSettingsIcon /> },
  { name: 'Cerrar sesión', route: '#', icon: <ExitToAppIcon /> },
];

function Header_l() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logout, isAuthenticated, authToken } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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

  // Cart modal state
  const [cartOpen, setCartOpen] = React.useState(false);
  const handleOpenCart = () => setCartOpen(true);
  const handleCloseCart = () => setCartOpen(false);
  // contador reactivo del carrito
  const [cartItemsCount, setCartItemsCount] = React.useState(() => cartCount(user?.id || user?.nombreUsuario || 'guest'));

  React.useEffect(() => {
    const userId = user?.id || user?.nombreUsuario || 'guest';
    const updateLocal = () => setCartItemsCount(cartCount(userId));

    const update = async () => {
      if (authToken) {
        const serverCart = await fetchServerCart(authToken);
        if (serverCart && Array.isArray(serverCart.items)) {
          const totalCount = serverCart.items.reduce((s, it) => s + (it.cantidad || it.quantity || 0), 0);
          setCartItemsCount(totalCount);
          return;
        }
      }
      // fallback a localStorage
      updateLocal();
    };

    window.addEventListener('storage', updateLocal);
    window.addEventListener(CART_EVENT_NAME, updateLocal);
    // run once
    update();
    return () => {
      window.removeEventListener('storage', updateLocal);
      window.removeEventListener(CART_EVENT_NAME, updateLocal);
    };
  }, [user?.id, user?.nombreUsuario, authToken]);

  // Estilo común para todos los botones del menú
  const menuButtonStyles = {
    my: 2,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: '#ffffff',
    },
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
                        if (page.route) navigate(page.route);
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
                      {page.icon}
                      <Typography sx={textStyles}>{page.name}</Typography>
                    </Button>
                  );
                } else if (page.name === '¿Como personalizar?') {
                  return (
                    <Button key={page.name} onClick={() => handleScrollToId('video')} sx={menuButtonStyles}>
                      {page.icon}
                      <Typography sx={textStyles}>{page.name}</Typography>
                    </Button>
                  );
                } else if (page.name === 'Carrito') {
                  // abrir modal del carrito
                  return (
                    <Button key={page.name} onClick={() => { handleOpenCart(); }} sx={menuButtonStyles}>
                      <Badge badgeContent={cartItemsCount} color="error">
                        {page.icon}
                      </Badge>
                      <Typography sx={textStyles}>{page.name}</Typography>
                    </Button>
                  );
                } else {
                  return (
                    <Button key={page.name} component={Link} to={page.route} sx={menuButtonStyles}>
                      {page.icon}
                      <Typography sx={textStyles}>{page.name}</Typography>
                    </Button>
                  );
                }
              })}
            </Box>

            {/* Usuario */}
            <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
              {isAuthenticated && (
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
              )}
              {!isAuthenticated && (
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
                        if (setting.name === 'Cerrar sesión') {
                          handleLogout();
                        } else if (setting.route && setting.route !== '#' && setting.route !== '') {
                          navigate(setting.route);
                        }
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
            {/* Cart modal (local) */}
            <CartModal open={cartOpen} onClose={handleCloseCart} user={user} authToken={authToken} />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header_l;
