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

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#17bebb' },
    secondary: { main: '#00a99d' },
    background: { default: '#000000', paper: '#000000' },
    text: { primary: '#ffffff', secondary: '#17bebb' },
  },
});

const EstampadoCrud = () => {
  const [estampados, setEstampados] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(null);
  const [formData, setFormData] = useState({
    NombreEstampado: '', TipoEstampado: '', PrecioEstampado: '',
    ImgEstampado: '', ColorEstampado: '', Disponibilidad: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchEstampados();
  }, []);

  const fetchEstampados = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/estampados/');
      setEstampados(res.data);
    } catch (err) {
      console.error('Error al obtener estampados', err);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditMode(true);
      setCurrent(item);
      setFormData(item);
    } else {
      setEditMode(false);
      setCurrent(null);
      setFormData({
        NombreEstampado: '', TipoEstampado: '', PrecioEstampado: '',
        ImgEstampado: '', ColorEstampado: '', Disponibilidad: ''
      });
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
      if (editMode) {
        await axios.put(`http://localhost:8000/api/estampados/${current.idEstampado}/edit/`, formData);
        Swal.fire('Actualizado', 'Estampado actualizado', 'success');
      } else {
        await axios.post('http://localhost:8000/api/estampados/create/', formData);
        Swal.fire('Creado', 'Estampado creado exitosamente', 'success');
      }
      fetchEstampados();
      handleCloseModal();
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al guardar', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar?',
      text: '¿Estás seguro que quieres eliminar este estampado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#111',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/estampados/${id}/edit/`);
        Swal.fire('Eliminado', 'Estampado eliminado', 'success');
        fetchEstampados();
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
            Gestión de Estampados
          </Typography>

          <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenModal()} sx={{ mb: 2 }}>
            Nuevo Estampado
          </Button>

          <TableContainer sx={{ background: '#000', borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Nombre</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Tipo</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Precio</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Imagen</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Color</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Disponibilidad</TableCell>
                  <TableCell align="center" sx={{ color: '#17bebb' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estampados.map(est => (
                  <TableRow key={est.idEstampado}>
                    <TableCell align="center" sx={{ color: 'white' }}>{est.NombreEstampado}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{est.TipoEstampado}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>${est.PrecioEstampado}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{est.ImgEstampado}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{est.ColorEstampado}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{est.Disponibilidad}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton color="primary" onClick={() => handleOpenModal(est)}><Edit /></IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => handleDelete(est.idEstampado)}><Delete /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
            <DialogTitle sx={{ bgcolor: '#17bebb', color: '#fff' }}>
              {editMode ? 'Editar Estampado' : 'Nuevo Estampado'}
            </DialogTitle>
            <DialogContent sx={{ bgcolor: 'black' }}>
              <Grid container spacing={2}>
                {[
                  { name: 'NombreEstampado', label: 'Nombre del Estampado' },
                  { name: 'TipoEstampado', label: 'Tipo de Estampado' },
                  { name: 'PrecioEstampado', label: 'Precio del Estampado', type: 'number' },
                  { name: 'ImgEstampado', label: 'URL de la Imagen' },
                  { name: 'ColorEstampado', label: 'Color del Estampado' },
                ].map(({ name, label, type = 'text' }) => (
                  <Grid item xs={12} md={6} key={name}>
                    <TextField
                      fullWidth
                      name={name}
                      label={label}
                      value={formData[name]}
                      onChange={handleChange}
                      type={type}
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
                ))}

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
                      name="Disponibilidad"
                      value={formData.Disponibilidad}
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

export default EstampadoCrud;
