// src/components/Header.jsx
import React from 'react';
import { useAuth } from './authcontext'; // Asegúrate de la ruta correcta
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
import { Link, useNavigate } from 'react-router-dom';
import logo from './mod_img/Logo-prin-f.png';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Themes';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Divider from '@mui/material/Divider'; // Importar Divider

const pages = [
  { name: 'Inicio', route: '/Home_L' },
  { name: 'Chat Bot', route: '#sobre' },
  { name: 'Comentarios', route: '#prod' },
  { name: 'Tienda', route: '/Store'},
  { name: '', route: '/Store', icon: <ShoppingCartIcon /> },
];

const settings = [
  { name: 'Perfil', route: '/Profile', icon: <AccountCircleIcon /> }, // Solo una opción de "Perfil"
  { name: 'Mis Pedidos', route: '#', icon: <LocalShippingIcon /> },
  { name: 'Mis Diseños', route: '#', icon: <DesignServicesIcon /> },
  { name: 'Crud', route: '/Crud', icon: <BuildIcon /> },
  { name: 'Soporte', route: '#soporte', icon: <SupportAgentIcon /> },
  { name: 'Cerrar sesión', route: '#', icon: <ExitToAppIcon /> },
];

function Header_l() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logout, isAuthenticated } = useAuth(); // Usar el hook useAuth
  const navigate = useNavigate(); // Para redireccionar después del logout

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
    navigate('/Home'); // Redirigir a la página de inicio después del logout
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ zIndex: 1300 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ zIndex: 1300 }}>
            {/* Logo en pantallas grandes */}
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

            {/* Menú desplegable en pantallas pequeñas */}
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
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={page.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo en pantallas pequeñas */}
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

            {/* Botones de navegación en pantallas grandes */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', marginRight: 2 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.route}
                  sx={{ my: 2, color: 'white', display: 'flex', alignItems: 'center' }}
                >
                  {page.icon}
                  <Typography sx={{ ml: 1 }}>{page.name}</Typography>
                </Button>
              ))}
            </Box>

            {/* Icono de usuario y menú de configuraciones */}
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
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <React.Fragment key={setting.name}>
                    {index === 3 && <Divider />} {/* Línea de separación después de "Mis Pedidos" */}
                    <MenuItem
                      onClick={setting.name === 'Cerrar sesión' ? handleLogout : handleCloseUserMenu}
                    >
                      {setting.icon}
                      <Typography textAlign="center" sx={{ ml: 1 }}>
                        {setting.name !== 'Cerrar sesión' ? (
                          <Link to={setting.route} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {setting.name}
                          </Link>
                        ) : (
                          setting.name
                        )}
                      </Typography>
                    </MenuItem>
                  </React.Fragment>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header_l;
