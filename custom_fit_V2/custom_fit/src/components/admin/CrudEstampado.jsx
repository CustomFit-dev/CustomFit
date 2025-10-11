import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, TextField, Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Tooltip, Snackbar, Alert, Fab, useMediaQuery, TablePagination
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuth } from "../modules/authcontext";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#17bebb' },
    background: { default: '#000000', paper: '#000000' },
    text: { primary: '#ffffff', secondary: '#17bebb' },
  },
  typography: { fontFamily: 'Poppins, sans-serif' },
});

const EstampadoCrud = () => {
  const { authToken } = useAuth();
  const [estampados, setEstampados] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isMobile = useMediaQuery('(max-width:600px)');

  const [formData, setFormData] = useState({
    NombreEstampado: '',
    TipoEstampado: '',
    PrecioEstampado: '',
    ImgEstampado: '',
    ColorEstampado: ''
  });

  // paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setRowsPerPage(newSize);
    setPage(0);
  };

  // Si cambian los datos y la página actual queda fuera de rango, resetear a 0
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(estampados.length / rowsPerPage) - 1);
    if (page > maxPage) setPage(0);
  }, [estampados, rowsPerPage, page]);

  useEffect(() => {
    fetchEstampados();
  }, []);

  const fetchEstampados = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/estampados/', {
        headers: { Authorization: `Token ${authToken}` },
      });
      setEstampados(Array.isArray(res.data) ? res.data : []);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudieron cargar los estampados',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#17bebb'
      });
    }
  };

  const handleInput = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleOpenModal = (estampado = null) => {
    if (estampado) {
      setEditMode(true);
      setCurrentId(estampado.idEstampado);
      setFormData(estampado);
    } else {
      setEditMode(false);
      setFormData({ NombreEstampado: '', TipoEstampado: '', PrecioEstampado: '', ImgEstampado: '', ColorEstampado: '' });
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      const url = editMode
        ? `http://localhost:8000/api/estampados/${currentId}/edit/`
        : 'http://localhost:8000/api/estampados/create/';
      const method = editMode ? axios.put : axios.post;

      const res = await method(url, formData, {
        headers: { Authorization: `Token ${authToken}` },
      });

      if (res.status === 200 || res.status === 201) {
        fetchEstampados();
        handleCloseModal();
        Swal.fire({
          icon: 'success',
          title: editMode ? 'Actualizado' : 'Creado',
          text: editMode ? 'Estampado actualizado correctamente' : 'Estampado agregado correctamente',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#17bebb'
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el estampado',
        background: '#1a1a1a',
        color: '#fff',
        confirmButtonColor: '#17bebb'
      });
    }
  };

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: '¿Eliminar estampado?',
      text: `Se eliminará "${nombre}"`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#17bebb',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1a1a1a',
      color: '#ffffff'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/estampados/${id}/edit/`, {
          headers: { Authorization: `Token ${authToken}` },
        });
        fetchEstampados();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Estampado eliminado correctamente',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#17bebb'
        });
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al eliminar estampado',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#17bebb'
        });
      }
    }
  };

  // Datos a mostrar según paginación
  const visibleRows = rowsPerPage > 0
    ? estampados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    : estampados;

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ minHeight: '100vh', p: 3, background: 'black', boxShadow: '0 0 15px rgba(23,190,187,0.3)' }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 3, fontWeight: 'bold', color: '#17bebb' }}>
          Gestión de Estampados
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
            sx={{ bgcolor: '#17bebb', color: 'black', '&:hover': { bgcolor: '#17e6c9' } }}
          >
            Nuevo Estampado
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ background: 'black' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#17bebb', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: '#17bebb', fontWeight: 'bold' }}>Tipo</TableCell>
                <TableCell sx={{ color: '#17bebb', fontWeight: 'bold' }}>Precio</TableCell>
                <TableCell sx={{ color: '#17bebb', fontWeight: 'bold' }}>Color</TableCell>
                <TableCell sx={{ color: '#17bebb', fontWeight: 'bold' }}>Imagen</TableCell>
                <TableCell sx={{ color: '#17bebb', fontWeight: 'bold' }} align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((e) => (
                <TableRow key={e.idEstampado} hover sx={{ '&:hover': { backgroundColor: 'rgba(23,190,187,0.03)' } }}>
                  <TableCell sx={{ color: 'white' }}>{e.NombreEstampado}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{e.TipoEstampado}</TableCell>
                  <TableCell sx={{ color: 'white' }}>${parseFloat(e.PrecioEstampado || 0).toLocaleString()}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{e.ColorEstampado}</TableCell>
                  <TableCell align="center">
                    {e.ImgEstampado ? (
                      <img src={e.ImgEstampado} alt="Estampado" width="48" height="48" style={{ borderRadius: 6, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.06)' }} />
                    ) : <Typography sx={{ color: '#bdbdbd' }}>Sin imagen</Typography>}
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Editar">
                      <IconButton color="primary" onClick={() => handleOpenModal(e)} sx={{ '&:hover': { bgcolor: 'rgba(23,190,187,0.06)' } }}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton color="error" onClick={() => handleDelete(e.idEstampado, e.NombreEstampado)} sx={{ '&:hover': { bgcolor: 'rgba(255,0,0,0.06)' } }}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

              {estampados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ color: '#ccc' }}>
                    No hay estampados registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

        </TableContainer>

        {/* Paginación centrada debajo de la tabla */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={estampados.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }) => `Página ${Math.ceil(from / (rowsPerPage || 1))} de ${Math.max(1, Math.ceil(count / (rowsPerPage || 1)))}`}
            sx={{ color: '#17bebb', '& .MuiTablePagination-toolbar': { justifyContent: 'center' } }}
          />
        </Box>

        {/* Modal agregar/editar */}
        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle sx={{ bgcolor: '#17bebb', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">{editMode ? 'Editar Estampado' : 'Nuevo Estampado'}</Typography>
            <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent sx={{ bgcolor: 'black', py: 3 }}>
            <Grid container spacing={2}>
              {[
                { name: 'NombreEstampado', label: 'Nombre del Estampado' },
                { name: 'TipoEstampado', label: 'Tipo de Estampado' },
                { name: 'PrecioEstampado', label: 'Precio', type: 'number' },
                { name: 'ImgEstampado', label: 'URL de la Imagen' },
                { name: 'ColorEstampado', label: 'Color' },
              ].map(({ name, label, type }) => (
                <Grid item xs={12} md={6} key={name}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label={label}
                    name={name}
                    type={type || 'text'}
                    value={formData[name] || ''}
                    onChange={handleInput}
                    InputLabelProps={{ style: { color: '#17bebb' } }}
                    inputProps={{ style: { color: 'white' } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#17bebb' },
                        '&:hover fieldset': { borderColor: '#17e6c9' },
                        '&.Mui-focused fieldset': { borderColor: '#0fa59d' },
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          <DialogActions sx={{ bgcolor: 'black', p: 2 }}>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              startIcon={<CloseIcon />}
              sx={{ color: 'white', borderColor: '#17bebb', '&:hover': { borderColor: '#17e6c9' } }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              startIcon={<SaveIcon />}
              sx={{ bgcolor: '#17bebb', color: 'black', '&:hover': { bgcolor: '#17e6c9' } }}
            >
              {editMode ? 'Actualizar' : 'Guardar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* FAB móvil */}
        {isMobile && (
          <Fab
            color="primary"
            onClick={() => handleOpenModal()}
            sx={{ position: 'fixed', bottom: 20, right: 20, bgcolor: '#17bebb', color: 'black' }}
          >
            <AddIcon />
          </Fab>
        )}
      </Paper>
    </ThemeProvider>
  );
};

export default EstampadoCrud;
