import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Snackbar, Alert, Tooltip, Typography,
  useMediaQuery, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Add, Edit, Delete, Close, Save } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuth } from "../modules/authcontext";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#17bebb' },
    secondary: { main: '#00a99d' },
    background: { default: '#000000', paper: '#000000' },
    text: { primary: '#ffffff', secondary: '#17bebb' },
  },
});

const ColorCrud = () => {
  const { authToken } = useAuth();
  const [colores, setColores] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(null);
  const [formData, setFormData] = useState({ NombreColor: '', disponibilidad: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchColores();
  }, []);

  const fetchColores = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}colores/`,
        {
          headers: { Authorization: `Token ${authToken}` }
        }
      );
      setColores(res.data);
    } catch (err) {
      console.error('Error al obtener colores', err);
    }
  };



  const handleOpenModal = (color = null) => {
    if (color) {
      setEditMode(true);
      setCurrent(color);
      setFormData(color);
    } else {
      setEditMode(false);
      setCurrent(null);
      setFormData({ NombreColor: '', disponibilidad: '' });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const today = new Date().toISOString(); // 👈 fecha actual

      if (editMode) {
        await axios.put(
          `http://localhost:8000/api/colores/${current.IdColor}/edit/`,
          { ...formData, updated_at: today }, // 👈 se agrega updated_at
          {
            headers: { Authorization: `Token ${authToken}` }
          }
        );
        Swal.fire('Actualizado', 'Color actualizado correctamente', 'success');
      } else {
        await axios.post(
          'http://localhost:8000/api/colores/create/',
          { ...formData, updated_at: today }, // 👈 se agrega updated_at
          {
            headers: { Authorization: `Token ${authToken}` }
          }
        );
        Swal.fire('Creado', 'Color creado correctamente', 'success');
      }
      fetchColores();
      handleCloseModal();
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al guardar', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar?',
      text: '¿Estás seguro que quieres eliminar este color?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#111',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/colores/${id}/edit/` , {
          headers: { Authorization: `Token ${authToken}` }
        });
        Swal.fire('Eliminado', 'Color eliminado', 'success');
        fetchColores();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ background: 'transparent', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: '1280px', margin: 'auto', px: 2 }}>
          <Typography variant="h4" align="center" color="white" sx={{ my: 4, fontWeight: 'bold' }}>
            Gestión de Colores
          </Typography>

          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenModal()} sx={{ mb: 2 }}>
            Nuevo Color
          </Button>

          <TableContainer sx={{ background: '#000', borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Nombre</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Disponibilidad</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Última actualización</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {colores.map(color => (
                  <TableRow key={color.IdColor}>
                    <TableCell align="center" sx={{ color: 'white' }}>{color.NombreColor}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{color.disponibilidad}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{color.updated_at}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton color="primary" onClick={() => handleOpenModal(color)}><Edit /></IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => handleDelete(color.IdColor)}><Delete /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ bgcolor: '#17bebb', color: '#fff' }}>
              {editMode ? 'Editar Color' : 'Nuevo Color'}
            </DialogTitle>
            <DialogContent sx={{ bgcolor: 'black' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="NombreColor"
                    label="Nombre del Color"
                    value={formData.NombreColor}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      input: { color: 'white' },
                      label: { color: '#17bebb' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#17bebb' },
                        '&:hover fieldset': { borderColor: '#17e6c9' },
                        '&.Mui-focused fieldset': { borderColor: '#0fa59d' },
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required variant="outlined" sx={{
                    '& .MuiInputLabel-root': { color: '#17bebb' },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': { borderColor: '#17bebb' },
                      '&:hover fieldset': { borderColor: '#17e6c9' },
                      '&.Mui-focused fieldset': { borderColor: '#0fa59d' },
                    },
                  }}>
                    <InputLabel id="dispo-label">Disponibilidad</InputLabel>
                    <Select
                      labelId="dispo-label"
                      name="disponibilidad"
                      value={formData.disponibilidad}
                      onChange={handleChange}
                      label="Disponibilidad"
                      sx={{ color: 'white' }}
                    >
                      <MenuItem value="Si">Disponible</MenuItem>
                      <MenuItem value="No">No Disponible</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ bgcolor: 'black', p: 2 }}>
              <Button onClick={handleCloseModal} startIcon={<Close />} variant="outlined" sx={{ color: '#fff', borderColor: '#17bebb' }}>
                Cancelar
              </Button>
              <Button onClick={handleSave} startIcon={<Save />} variant="contained" sx={{ bgcolor: '#17bebb', color: '#000' }}>
                {editMode ? 'Actualizar' : 'Guardar'}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ColorCrud;
