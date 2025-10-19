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
import { useNavigate } from 'react-router-dom';
import logo from './mod_img/Logo-prin-f.png';
import Form from './Iniciar';
import RegisterForm from './Registrar';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Themes';
import ReactDOM from 'react-dom';
import Swal from 'sweetalert2';


const pages = [
  { name: 'Inicio', route: '/Home' },
  { name: 'Nosotros', route: '#sobre' },
  { name: 'Tienda', route: '/Tienda' },  
];

const settings = [
  { name: 'Iniciar sesión', route: '#', type: 'login' },
  { name: 'Registrate', route: '#', type: 'register' }
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isFormVisible, setFormVisible] = React.useState(false);
  const [formType, setFormType] = React.useState('login');

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

  const handleOpenForm = (type) => {
    setFormType(type);
    setFormVisible(true);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  // Función para hacer scroll lento a sec1
  const scrollToSec1 = () => {
    const sec1 = document.getElementById('sec1');
    if (sec1) {
      sec1.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Maneja clicks en menú
  const handlePageClick = (page) => {
    handleCloseNavMenu();

    if (page.name === 'Inicio') {
      navigate('/Home');
      setTimeout(() => {
        scrollToSec1();  // Scroll suave solo a sec1
      }, 300);
    } else if (page.name === 'Tienda') {
      Swal.fire({
        icon: 'warning',
        title: 'Debes iniciar sesión',
        text: 'Para acceder a la tienda necesitas iniciar sesión primero.',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          handleOpenForm('login');  // Abre modal login
        }
      });
    } else if (page.route.startsWith('#')) {
      const id = page.route.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(page.route);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar position="static" className="custom-appbar">
          <Container maxWidth="xl">
            <Toolbar disableGutters className="custom-toolbar">
              <Typography variant="h6" noWrap component="div" className="logo-text-large" sx={{ cursor: 'pointer' }} onClick={() => handlePageClick(pages[0])}>
                <img src={logo} alt="logo" id="logo" />
              </Typography>

              <Box className="menu-small">
                <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={() => handlePageClick(page)}>
                      <Typography textAlign="center" sx={{ color: 'white' }}>
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography variant="h5" noWrap component="div" className="logo-text-small" sx={{ cursor: 'pointer' }} onClick={() => handlePageClick(pages[0])}>
                <img src={logo} alt="logo" id="logo" />
              </Typography>

              <Box className="menu-buttons">
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => handlePageClick(page)}
                    className="nav-button"
                    sx={{ color: 'white' }} // Texto blanco
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>

              <Box className="flex-grow-0">
                <Tooltip title="Abrir configuraciones">
                  <IconButton onClick={handleOpenUserMenu} className="avatar-button">
                    <Avatar alt="Usuario" />
                  </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorElUser} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                  {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={() => { handleCloseUserMenu(); handleOpenForm(setting.type); }}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        {isFormVisible && ReactDOM.createPortal(
          <div className="overlay">
            <div className="form-container">
              {formType === 'login' ? <Form onClose={handleCloseForm} /> : <RegisterForm onClose={handleCloseForm} />}
            </div>
          </div>,
          document.body
        )}
      </header>
    </ThemeProvider>
  );
}

export default Header;
