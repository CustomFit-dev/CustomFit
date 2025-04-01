// PersonalDataForm.js
import React, { useState } from 'react';

import { 
  TextField, 
  Button, 
  Container, 
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
    primary: { main: '#00b8d4' },
    background: { default: '#000000', paper: '#000000' },
    text: { primary: '#ffffff' },
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
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
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <ThemeProvider  theme={theme}>
      <Container component="main" maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 0, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Grid container>
            <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, backgroundColor: '#121212' }}>
              <Avatar sx={{ width: 120, height: 120, bgcolor: '#1976d2', mb: 2 }} alt="Usuario" src="/api/placeholder/120/120" />
              <Typography variant="body2" color="text.secondary" align="center">{formData.correo}</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem sx={{ bgcolor: '#333' }} />
            <Grid item xs={12} md={7} sx={{ p: 4 }}>
              <Typography variant="h6" color="#00b8d4" sx={{ mb: 3, ml: 1,color:'' }}>Mis datos personales</Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {['nombre', 'nombre2', 'apellido', 'apellido2', 'usuario', 'direccion'].map((field, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography variant="caption" color="text.secondary">{field.toUpperCase()}</Typography>
                      <TextField
                        fullWidth
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        variant="outlined"
                        size="small"
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                    <Button type="submit" variant="contained" sx={{ borderRadius: 0.5, textTransform: 'none', bgcolor: '#17BEBB', '&:hover': { bgcolor: ' transparent' } }}>Guardar</Button>
                  </Grid>
                  <Grid item xs={12} sm={6} sx={{ mt: 3 }}>
                    <Button variant="outlined" fullWidth sx={{ borderRadius: 0.5, borderColor: '#17BEBB', color: '#17BEBB', textTransform: 'none', '&:hover': { borderColor: '#00a0b8', bgcolor: '#17BEBB',color: 'black' } }}>Cancelar</Button>
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
