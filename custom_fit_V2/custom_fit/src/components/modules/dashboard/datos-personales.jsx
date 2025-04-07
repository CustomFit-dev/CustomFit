// PersonalDataForm.js
import React, { useState, useRef } from 'react';
import '../../../scss/DatosPersonales.scss';

import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
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
    direccion: 'Calle 36C #12b-11',
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    console.log('Imagen subida:', profileImage);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Guardamos la imagen en base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ py: 6 }}>
        <Paper
          className="Cajaaaaa"
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: '100%',
            mx: 'auto',
            bgcolor: 'background.paper',
          }}
        >
          <Grid container spacing={4} alignItems="center">
            {/* Avatar + Correo */}
            <Grid
              item
              xs={12}
              md={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: 160,
                  height: 160,
                  bgcolor: '#1976d2',
                  mb: 2,
                  cursor: 'pointer',
                }}
                alt="Usuario"
                src={profileImage || ''}
                onClick={handleAvatarClick}
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <Typography
                variant="subtitle1"
                color="text.secondary"
                align="center"
              >
                {formData.correo}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                Haz clic en la imagen para cambiarla
              </Typography>
            </Grid>

            {/* Divider vertical */}
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                bgcolor: '#333',
                mx: 2,
                display: { xs: 'none', md: 'block' },
              }}
            />

            {/* Formulario */}
            <Grid item xs={12} md={8}>
              <Typography
                variant="h5"
                sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}
              >
                Mis datos personales
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {[
                    ['nombre', 'nombre2'],
                    ['apellido', 'apellido2'],
                    ['usuario', 'direccion'],
                  ].map((pair) =>
                    pair.map((field) => (
                      <Grid item xs={12} sm={6} key={field}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ fontWeight: 500 }}
                        >
                          {field.toUpperCase()}
                        </Typography>
                        <TextField
                          fullWidth
                          name={field}
                          value={formData[field]}
                          onChange={handleChange}
                          variant="outlined"
                          size="medium"
                        />
                      </Grid>
                    ))
                  )}
                  {/* Botones */}
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        bgcolor: '#17BEBB',
                        fontSize: '1rem',
                        py: 1.3,
                        '&:hover': { bgcolor: 'transparent',borderColor: '#00a0b8', },
                      }}
                    >
                      Guardar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        borderColor: '#17BEBB',
                        color: '#17BEBB',
                        textTransform: 'none',
                        fontSize: '1rem',
                        py: 1.3,
                        '&:hover': {
                          borderColor: '#00a0b8',
                          bgcolor: '#17BEBB',
                          color: 'black',
                        },
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
