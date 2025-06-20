import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Snackbar, Alert, Tooltip, Typography
} from '@mui/material';
import { Add, Edit, Delete, Close, Save } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';

const TallaCrud = () => {
  const [tallas, setTallas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTalla, setCurrentTalla] = useState(null);
  const [formData, setFormData] = useState({
    Talla: '',
    Disponibilidad: '',
    genero: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchTallas();
  }, []);

  const fetchTallas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tallas/');
      setTallas(response.data);
    } catch (error) {
      console.error('Error al obtener tallas', error);
    }
  };

  const handleOpenModal = (talla = null) => {
    if (talla) {
      setEditMode(true);
      setCurrentTalla(talla);
      setFormData(talla);
    } else {
      setEditMode(false);
      setCurrentTalla(null);
      setFormData({ Talla: '', Disponibilidad: '', genero: '' });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        await axios.put('http://localhost:8000/api/tallas/${currentTalla.idTalla}/edit/, formData');
        Swal.fire('Actualizado', 'Talla actualizada correctamente', 'success');
      } else {
        await axios.post('http://localhost:8000/api/tallas/create/', formData);
        Swal.fire('Guardado', 'Talla creada correctamente', 'success');
        setSnackbar({ open: true, message: 'Talla agregada correctamente', severity: 'success' });
      }
      handleCloseModal();
      fetchTallas();
    } catch (error) {
      Swal.fire('Error', 'Ocurrió un error al guardar', 'error');
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la talla permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete('http://localhost:8000/api/tallas/${id}/edit/');
          Swal.fire('Eliminado', 'La talla ha sido eliminada.', 'success');
          fetchTallas();
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar la talla.', 'error');
        }
      }
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box className="bg-gray-900 p-6 rounded-xl shadow-xl">
      <Typography variant="h4" color="white" gutterBottom>
        Gestión de Tallas
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpenModal()}
        sx={{ mb: 2, backgroundColor: '#4caf50', '&:hover': { backgroundColor: '#45a049' } }}
      >
        Nueva Talla
      </Button>

      <TableContainer component={Paper} sx={{ backgroundColor: '#1e1e1e' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['Talla', 'Disponible', 'Género', 'Acciones'].map((head) => (
                <TableCell key={head} sx={{ color: 'white', fontWeight: 'bold' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tallas.map((talla) => (
              <TableRow key={talla.idTalla} hover>
                <TableCell sx={{ color: 'white' }}>{talla.Talla}</TableCell>
                <TableCell sx={{ color: 'white' }}>{talla.Disponibilidad}</TableCell>
                <TableCell sx={{ color: 'white' }}>{talla.genero}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton color="primary" onClick={() => handleOpenModal(talla)}><Edit /></IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton color="error" onClick={() => handleDelete(talla.idTalla)}><Delete /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
        <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white' }}>{editMode ? 'Editar Talla' : 'Crear Talla'}</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#f5f5f5' }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {[{
              name: 'Talla', label: 'Talla'
            }, {
              name: 'Disponibilidad', label: 'Disponibilidad'
            }, {
              name: 'genero', label: 'Género'
            }].map(({ name, label }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  name={name}
                  label={label}
                  value={formData[name]}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#f5f5f5' }}>
          <Button onClick={handleCloseModal} startIcon={<Close />} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSave} startIcon={<Save />} variant="contained" color="primary">
            {editMode ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TallaCrud;