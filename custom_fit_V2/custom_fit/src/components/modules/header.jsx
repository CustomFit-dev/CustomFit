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
import RegisterForm from './Registrar'; 
import { ThemeProvider } from '@mui/material/styles';
import theme from './Themes';
import ReactDOM from 'react-dom';

const pages = [
  { name: 'Inicio', route: '/Home' },
  { name: 'Nosotros', route: '#sobre' },
  { name: 'Productos', route: '#prod' },
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

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppBar position="static" className="custom-appbar">
          <Container maxWidth="xl">
            <Toolbar disableGutters className="custom-toolbar">
              <Typography variant="h6" noWrap component={Link} to="/Home" className="logo-text-large">
                <img src={logo} alt="logo" id="logo" />
              </Typography>

              <Box className="menu-small">
                <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorElNav} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}>
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link to={page.route} style={{ textDecoration: 'none', color: 'inherit' }}>{page.name}</Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography variant="h5" noWrap component={Link} to="/Home" className="logo-text-small">
                <img src={logo} alt="logo" id="logo" />
              </Typography>

              <Box className="menu-buttons">
                {pages.map((page) => (
                  <Button key={page.name} component={Link} to={page.route} className="nav-button">{page.name}</Button>
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
