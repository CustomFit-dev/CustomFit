import React, { useState } from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  IconButton, 
  LinearProgress, 
  Divider,
  InputAdornment,
  Tooltip,
  Container,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Collapse
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Save, 
  LockReset, 
  LocationOn, 
  Email, 
  Security, 
  Help,
  Person,
  Smartphone,
  Computer,
  Tablet,
  ExpandMore,
  ExpandLess,
  PublicOutlined,
  AccessTime,
  DevicesOther
} from '@mui/icons-material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Tema personalizado con colores turquesa
const theme = createTheme({
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#005f6b',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

// Función para calcular la fortaleza de la contraseña
const calculatePasswordStrength = (password) => {
  if (!password) return 0;
  
  let strength = 0;
  
  // Longitud
  if (password.length >= 8) strength += 25;
  
  // Tiene números
  if (/\d/.test(password)) strength += 25;
  
  // Tiene minúsculas y mayúsculas
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
  
  // Tiene caracteres especiales
  if (/[^A-Za-z0-9]/.test(password)) strength += 25;
  
  return strength;
};

// Función para obtener el color de la barra de fortaleza
const getStrengthColor = (strength) => {
  if (strength < 30) return 'error';
  if (strength < 70) return 'warning';
  return 'success';
};

// Datos simulados de dispositivos con sesión iniciada
const activeDevices = [
  { 
    id: 1, 
    name: 'iPhone 13', 
    type: 'mobile', 
    location: 'Madrid, España', 
    lastActive: '31 Mar 2025, 14:23', 
    current: true,
    ip: '185.22.153.xx'
  },
  { 
    id: 2, 
    name: 'MacBook Pro', 
    type: 'desktop', 
    location: 'Madrid, España', 
    lastActive: '30 Mar 2025, 18:45',
    current: false,
    ip: '185.22.153.xx'
  },
  { 
    id: 3, 
    name: 'Samsung Galaxy Tab', 
    type: 'tablet', 
    location: 'Barcelona, España', 
    lastActive: '28 Mar 2025, 10:15',
    current: false,
    ip: '78.144.87.xx'
  },
  { 
    id: 4, 
    name: 'PC de Trabajo', 
    type: 'desktop', 
    location: 'Madrid, España', 
    lastActive: '27 Mar 2025, 16:30',
    current: false,
    ip: '93.189.22.xx'
  }
];

// Función para obtener el icono según el tipo de dispositivo
const getDeviceIcon = (type) => {
  switch (type) {
    case 'mobile':
      return <Smartphone />;
    case 'desktop':
      return <Computer />;
    case 'tablet':
      return <Tablet />;
    default:
      return <DevicesOther />;
  }
};

const UserSecurityModule = () => {
  // Estados
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    password: '••••••••••••',
    recoveryEmail: '',
    location: 'Calle23D #121E'
  });
  const [passwordStrength, setPasswordStrength] = useState(75);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [expandedDevices, setExpandedDevices] = useState(true);

  // Manejadores de eventos
  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setFormValues({...formValues, password: newPassword});
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  const handleInputChange = (field) => (event) => {
    setFormValues({...formValues, [field]: event.target.value});
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };
  
  const handleToggleDevices = () => {
    setExpandedDevices(!expandedDevices);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={5} sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Grid container spacing={4}>
            {/* Perfil del usuario */}
            <Grid item xs={12} md={4} sx={{ 
              borderRight: { md: '1px solid rgba(255, 255, 255, 0.12)' }, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              pb: { xs: 2, md: 0 }
            }}>
              <Avatar
                src="/avatar-placeholder.png"
                sx={{ 
                  width: 120, 
                  height: 120, 
                  bgcolor: '#1976d2',
                  border: '3px solid #00bcd4',
                  mb: 2
                }}
              >
                <Person fontSize="large" />
              </Avatar>
              <Typography variant="h6" align="center" gutterBottom>
                Kevin Daniel
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ wordBreak: 'break-all' }}>
                Kevin11234daniel@gmail.com
              </Typography>
              <Button 
                variant="outlined" 
                size="small" 
                startIcon={<Person />}
                sx={{ mt: 2 }}
              >
                Editar Perfil
              </Button>
            </Grid>

            {/* Formulario de seguridad */}
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <Security color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h1">
                  Seguridad del usuario
                </Typography>
                <Tooltip title="Mantenga su cuenta segura actualizando regularmente su información de seguridad">
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <Help fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Contraseña */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LockReset fontSize="small" sx={{ mr: 1 }} /> Contraseña
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={formValues.password}
                  onChange={handlePasswordChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1 }}
                />
                <Box sx={{ mb: 2 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={passwordStrength} 
                    color={getStrengthColor(passwordStrength)}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <span>Fortaleza de contraseña</span>
                    <span>{passwordStrength < 30 ? 'Débil' : passwordStrength < 70 ? 'Media' : 'Fuerte'}</span>
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ float: 'right' }}
                >
                  Cambiar
                </Button>
              </Box>

              <Divider sx={{ my: 3, clear: 'both' }} />

              {/* Correo de recuperación */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email fontSize="small" sx={{ mr: 1 }} /> Correo de recuperación
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="correo@ejemplo.com"
                  value={formValues.recoveryEmail}
                  onChange={handleInputChange('recoveryEmail')}
                  sx={{ mb: 1 }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ float: 'right' }}
                >
                  Guardar
                </Button>
              </Box>

              <Divider sx={{ my: 3, clear: 'both' }} />

              {/* Ubicación */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOn fontSize="small" sx={{ mr: 1 }} /> Ubicación
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={formValues.location}
                  onChange={handleInputChange('location')}
                  sx={{ mb: 1 }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  sx={{ float: 'right' }}
                >
                  Guardar
                </Button>
              </Box>

              <Divider sx={{ my: 3, clear: 'both' }} />

              {/* Autenticación de dos factores */}
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Switch 
                      checked={twoFactorEnabled}
                      onChange={handleTwoFactorToggle}
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="subtitle1">Autenticación de dos factores</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Añade una capa extra de seguridad a tu cuenta
                      </Typography>
                    </Box>
                  }
                />
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Dispositivos con sesión iniciada */}
              <Box sx={{ mb: 3 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 2,
                    cursor: 'pointer'
                  }}
                  onClick={handleToggleDevices}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <DevicesOther fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1">
                      Dispositivos con sesión iniciada
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    {expandedDevices ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>
                
                <Collapse in={expandedDevices} timeout="auto" unmountOnExit>
                  <List sx={{ 
                    bgcolor: 'rgba(0, 0, 0, 0.15)', 
                    borderRadius: 1,
                    mb: 1 
                  }}>
                    {activeDevices.map((device) => (
                      <ListItem key={device.id} sx={{ 
                        borderLeft: device.current ? '3px solid #00bcd4' : 'none',
                        bgcolor: device.current ? 'rgba(0, 188, 212, 0.1)' : 'transparent'
                      }}>
                        <ListItemIcon>
                          {getDeviceIcon(device.type)}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {device.name}
                              {device.current && (
                                <Chip 
                                  label="Actual" 
                                  size="small" 
                                  color="primary" 
                                  sx={{ ml: 1, height: 20 }} 
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <PublicOutlined sx={{ fontSize: 14, mr: 0.5, opacity: 0.7 }} />
                                <Typography variant="caption" color="text.secondary">
                                  {device.location} ({device.ip})
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                <AccessTime sx={{ fontSize: 14, mr: 0.5, opacity: 0.7 }} />
                                <Typography variant="caption" color="text.secondary">
                                  Último acceso: {device.lastActive}
                                </Typography>
                              </Box>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          {!device.current && (
                            <Button 
                              variant="outlined" 
                              color="error" 
                              size="small"
                            >
                              Cerrar sesión
                            </Button>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                    >
                      Cerrar todas las sesiones
                    </Button>
                  </Box>
                </Collapse>
              </Box>

              {/* Botón guardar todos los cambios */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<Save />}
                >
                  Guardar todos los cambios
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default UserSecurityModule;