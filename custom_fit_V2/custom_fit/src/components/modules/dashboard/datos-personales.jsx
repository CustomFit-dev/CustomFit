// src/components/dashboard/perfil/PersonalDataForm.js
import React, { useState, useRef, useEffect } from 'react';
import '../../../scss/DatosPersonales.scss';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Avatar,
  Paper,
  Grid,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const { user, logout, authToken } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const fileInputRef = useRef(null);

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
    setFormDataOriginal(formData);
  };

  const handleCancel = () => {
    setFormData(formDataOriginal);
    setProfileImage(null);
  };

  const handleAvatarClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) {
      console.error('⚠ No se encontró el ID del usuario');
      return;
    }

    try {
      // Si usas autenticación con token, inclúyelo aquí
      const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}delete-user/${user.id}/`,
        { headers }
      );

      console.log('✅ Cuenta eliminada:', response.data);

      logout(); // cerrar sesión
      window.location.href = '/'; // redirigir al inicio
    } catch (error) {
      console.error('❌ Error al eliminar la cuenta:', error.response?.data || error.message);
    }
  };

  if (!user) {
    return <Typography color="text.secondary">Cargando datos del usuario...</Typography>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" sx={{ py: 6 }}>
        <Paper
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
            {/* Avatar y correo */}
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

                  <Grid item xs={12} sm={4}>
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

                  <Grid item xs={12} sm={4}>
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

                  <Grid item xs={12} sm={4}>
                    <Button
                      onClick={() => setOpenDialog(true)}
                      variant="outlined"
                      color="error"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        borderColor: '#ff4d4d',
                        color: '#ff4d4d',
                        textTransform: 'none',
                        fontSize: '1rem',
                        py: 1.3,
                        '&:hover': {
                          bgcolor: '#ff4d4d',
                          color: '#000',
                        },
                      }}
                    >
                      Eliminar cuenta
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>

        {/* Modal de confirmación */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{ sx: { bgcolor: '#1c1c1c', color: '#fff' } }}
        >
          <DialogTitle>Eliminar cuenta</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: '#ccc' }}>
              ¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: '#17BEBB' }}>
              Cancelar
            </Button>
            <Button onClick={handleDeleteAccount} sx={{ color: '#ff4d4d' }}>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
}

export default PersonalDataForm;
