import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Box, 
  Typography, 
  Avatar,
  Paper,
  Grid,
  Divider
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b8d4',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function PersonalDataForm() {
  const [formData, setFormData] = useState({
    nombre: 'KEVIN',
    apellido: 'PATIÑO',
    usuario: 'KEVIN3126',
    correo: 'Kevin31234daniel@gmail.com',
    nombre2: 'DANIEL',
    apellido2: 'GOMEZ',
    direccion: 'Calle 36C #12b-11'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes manejar el envío de datos
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 0, 
            bgcolor: 'background.paper',
            borderRadius: 1
          }}
        >
          <Grid container>
            <Grid item xs={12} md={4} sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              p: 4,
              backgroundColor: '#121212'
            }}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  bgcolor: '#1976d2',
                  mb: 2
                }}
                alt="Usuario"
                src="/api/placeholder/120/120"
              />
              <Typography variant="body2" color="text.secondary" align="center">
                {formData.correo}
              </Typography>
            </Grid>
            
            <Divider orientation="vertical" flexItem sx={{ bgcolor: '#333' }} />
            
            <Grid item xs={12} md={7} sx={{ p: 4 }}>
              <Typography variant="h6" color="#00b8d4" sx={{ mb: 3, ml: 1 }}>
                Mis datos personales
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      NOMBRE
                    </Typography>
                    <TextField
                      fullWidth
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: { 
                          "&:after": { borderBottomColor: '#00b8d4' },
                          "&:before": { borderBottomColor: '#555' }
                        }
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      NOMBRE 2
                    </Typography>
                    <TextField
                      fullWidth
                      name="nombre2"
                      value={formData.nombre2}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      APELLIDO
                    </Typography>
                    <TextField
                      fullWidth
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      APELLIDO 2
                    </Typography>
                    <TextField
                      fullWidth
                      name="apellido2"
                      value={formData.apellido2}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      USUARIO
                    </Typography>
                    <TextField
                      fullWidth
                      name="usuario"
                      value={formData.usuario}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Typography variant="caption" color="text.secondary">
                      DIRECCIÓN
                    </Typography>
                    <TextField
                      fullWidth
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ 
                        borderRadius: 0.5, 
                        textTransform: 'none',
                        bgcolor: '#00b8d4',
                        '&:hover': {
                          bgcolor: '#00a0b8'
                        }
                      }}
                    >
                      Guardar
                    </Button>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{ 
                        borderRadius: 0.5, 
                        borderColor: '#00b8d4',
                        color: '#00b8d4',
                        textTransform: 'none',
                        '&:hover': {
                          borderColor: '#00a0b8',
                          bgcolor: 'rgba(0, 184, 212, 0.08)'
                        }
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default PersonalDataForm;