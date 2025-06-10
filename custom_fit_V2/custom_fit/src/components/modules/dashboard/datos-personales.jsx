import React, { useState, useRef, useEffect } from 'react';
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
import { useAuth } from '../authcontext';

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
  const { user } = useAuth();

  const nombre = (user?.nombres || '').split(' ')[0];
  const apellido = (user?.apellidos || '').split(' ')[0];

  const initialData = {
    nombre: nombre || '',
    apellido: apellido || '',
    usuario: user?.nombreUsuario || '',
    correo: user?.correoElectronico || '',
    celular: user?.celular || '',
    direccion: '',
  };

  const [formData, setFormData] = useState(initialData);
  const [formDataOriginal, setFormDataOriginal] = useState(initialData);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setFormData(initialData);
    setFormDataOriginal(initialData);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos guardados:', formData);
    console.log('Imagen subida:', profileImage);
    setFormDataOriginal(formData);
  };

  const handleCancel = () => {
    setFormData(formDataOriginal);
    setProfileImage(null);
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return <Typography color="text.secondary">Cargando datos del usuario...</Typography>;
  }

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
              <Typography variant="subtitle1" color="text.secondary" align="center">
                {formData.correo}
              </Typography>
              <Typography variant="caption" color="primary" sx={{ mt: 1 }}>
                Haz clic en la imagen para cambiarla
              </Typography>
            </Grid>

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                bgcolor: '#333',
                mx: 2,
                display: { xs: 'none', md: 'block' },
              }}
            />

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
                    ['nombre', 'apellido'],
                    ['usuario', 'correo'],
                    ['celular', 'direccion'],
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
                        '&:hover': {
                          bgcolor: 'transparent',
                          borderColor: '#00a0b8',
                        },
                      }}
                    >
                      Guardar
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      onClick={handleCancel}
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
