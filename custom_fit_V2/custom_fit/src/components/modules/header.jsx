import * as React from 'react';
import '../../scss/header.scss'; // Importa el archivo CSS
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
import { Link } from 'react-router-dom';
import logo from './mod_img/Logo-prin-f.png';
import Form from './Iniciar'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './Themes';


const pages = [
  { name: 'Inicio', route: '/Home' },
  { name: 'Nosotros', route: '#sobre' },
  { name: 'Productos', route: '#prod' },
];

const settings = [
  { name: 'Iniciar sesión', route: '#' },
  { name: '', route: '#' }
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isFormVisible, setFormVisible] = React.useState(false);

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

  const handleOpenForm = () => {
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar position="static" className="custom-appbar">
          <Container maxWidth="xl">
            <Toolbar disableGutters className="custom-toolbar">
              {/* Logo en pantallas grandes */}
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/Home"
                className="logo-text-large"
              >
                <img src={logo} alt="logo" id="logo" />
              </Typography>

              {/* Menú desplegable en pantallas pequeñas */}
              <Box className="menu-small">
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
                  className="menu-small"
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
                to="/Home"
                className="logo-text-small"
              >
                <img src={logo} alt="logo" id="logo" />
              </Typography>

              {/* Botones de navegación en pantallas grandes */}
              <Box className="menu-buttons">
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    component={Link}
                    to={page.route}
                    className="nav-button"
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              {/* Icono de usuario y menú de configuraciones */}
              <Box className="flex-grow-0">
                <Tooltip title="Abrir configuraciones">
                  <IconButton onClick={handleOpenUserMenu} className="avatar-button">
                    <Avatar alt="Usuario" />
                  </IconButton>
                </Tooltip>
                <Menu
                  className="menu-user"
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
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => { handleCloseUserMenu(); handleOpenForm(); }}
                    >
                      <Typography textAlign="center">
                        <a href="#" style={{ textDecoration: 'none', color: 'black' }}>
                          {setting.name}
                        </a>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {/* Overlay y Formulario */}
        {isFormVisible && (
          <div className="overlay">
            <div className="form-container">
              <Form onClose={handleCloseForm} />
            </div>
          </div>
        )}
      </header>
    </ThemeProvider>
  );
}

export default Header;
