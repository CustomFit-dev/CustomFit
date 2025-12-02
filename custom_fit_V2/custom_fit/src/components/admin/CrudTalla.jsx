import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Snackbar, Alert, Tooltip, Typography,
  FormControl, InputLabel, Select, MenuItem, useMediaQuery, Fab,
  CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, Close, Save } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from "../modules/authcontext";

const TallaCrud = () => {
  const [tallas, setTallas] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTalla, setCurrentTalla] = useState(null);
  const [formData, setFormData] = useState({ Talla: '', Disponibilidad: '', genero: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (authToken) {
      fetchTallas();
    }
  }, [authToken]);

  const fetchTallas = async () => {
    if (!authToken) {
      setError("No hay token de autorización disponible");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const url = `${process.env.REACT_APP_API_URL}tallas/`;
      console.log('Obteniendo tallas de:', url);

      const response = await axios.get(url, {
        headers: { Authorization: `Token ${authToken}` }
      });

      setTallas(response.data);
    } catch (error) {
      console.error('Error al obtener tallas:', error);
      if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.statusText}`);
      } else {
        setError('Error al obtener tallas');
      }
    } finally {
      setLoading(false);
    }
  };


  const handleOpenModal = (talla = null) => {
    if (talla) {
      setEditMode(true);
      setCurrentTalla(talla);
      setFormData({ ...talla });
    } else {
      setEditMode(false);
      setCurrentTalla(null);
      setFormData({ Talla: '', Disponibilidad: '', genero: '' });
    }
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      if (editMode) {
        const { updated_at, ...dataToSend } = formData;
        const urlEdit = `${process.env.REACT_APP_API_URL}tallas/${currentTalla.idTallas}/edit/`;
        console.log('Actualizando talla en:', urlEdit, dataToSend);

        await axios.put(urlEdit, dataToSend, {
          headers: { Authorization: `Token ${authToken}` }
        });

        alert('Talla actualizada correctamente');
      } else {
        const urlCreate = `${process.env.REACT_APP_API_URL}tallas/create/`;
        console.log('Creando talla en:', urlCreate, formData);

        await axios.post(urlCreate, formData, {
          headers: { Authorization: `Token ${authToken}` }
        });

        alert('Talla creada correctamente');
      }

      setOpenModal(false);
      fetchTallas();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('No se pudo guardar la talla.');
    }
  };


  const handleDelete = async (talla) => {
    if (window.confirm(`¿Estás seguro de eliminar la talla "${talla.Talla}"?`)) {
      try {
        const urlDelete = `${process.env.REACT_APP_API_URL}tallas/${talla.idTallas}/edit/`;
        console.log('Eliminando talla en:', urlDelete);

        await axios.delete(urlDelete, {
          headers: { Authorization: `Token ${authToken}` }
        });

        alert('Talla eliminada correctamente');
        fetchTallas();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('No se pudo eliminar la talla.');
      }
    }
  };


  return (
    <Box p={3} sx={{ bgcolor: '#000', minHeight: '100vh' }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: 'white' }}
      >
        Gestión de Tallas
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress sx={{ color: 'white' }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, bgcolor: '#222', color: 'white' }}>
          {error}
        </Alert>
      )}

      {!isMobile && (
        <Box mb={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenModal()}
            sx={{ 
              bgcolor: '#17bebb',
              color: 'black',
              '&:hover': { bgcolor: '#00a99d' }
            }}
          >
            Agregar Talla
          </Button>
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: '#111',
          color: 'white',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {['Talla', 'Disponibilidad', 'Género', 'Acciones'].map((col) => (
                <TableCell
                  key={col}
                  sx={{ color: 'white', borderBottom: '1px solid white' }}
                >
                  <b>{col}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tallas.length > 0 ? (
              tallas.map((talla) => (
                <TableRow
                  key={talla.idTallas}
                  sx={{
                    '&:nth-of-type(odd)': { bgcolor: '#1a1a1a' },
                    '&:nth-of-type(even)': { bgcolor: '#111' },
                  }}
                >
                  <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                    <b>{talla.Talla}</b>
                  </TableCell>
                  <TableCell sx={{ borderBottom: '1px solid #444' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: talla.Disponibilidad?.toLowerCase().includes('si') || 
                               talla.Disponibilidad?.toLowerCase().includes('disponible')
                               ? 'lime' : 'orange',
                        fontWeight: 'bold',
                      }}
                    >
                      {talla.Disponibilidad?.toLowerCase().includes('si') || 
                       talla.Disponibilidad?.toLowerCase().includes('disponible')
                       ? 'Disponible' : 'No Disponible'}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: talla.genero?.toLowerCase() === 'masculino' ? '#2196F3' : 
                               talla.genero?.toLowerCase() === 'femenino' ? '#E91E63' : '#9C27B0',
                        fontWeight: 'bold'
                      }}
                    >
                      {talla.genero}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: '1px solid #444' }}
                  >
                    <Tooltip title="Editar talla">
                      <IconButton
                        onClick={() => handleOpenModal(talla)}
                        sx={{ color: '#17bebb' }}
                      >
                        <Edit size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar talla">
                      <IconButton
                        onClick={() => handleDelete(talla)}
                        sx={{ color: 'red' }}
                      >
                        <Delete size={18} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              !loading && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: 'white' }}>
                    No hay tallas registradas.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* FAB para móviles */}
      {isMobile && (
        <Fab 
          color="primary" 
          onClick={() => handleOpenModal()}
          sx={{ 
            position: 'fixed', 
            bottom: 20, 
            right: 20,
            bgcolor: '#17bebb',
            '&:hover': { bgcolor: '#00a99d' }
          }}
        >
          <Add />
        </Fab>
      )}

      {/* Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          bgcolor: '#111',
          color: 'white',
          borderBottom: '1px solid white'
        }}>
          <Typography variant="h6">
            {editMode ? 'Editar Talla' : 'Agregar Nueva Talla'}
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ bgcolor: '#000', pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="Talla"
                label="Talla"
                value={formData.Talla}
                onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                fullWidth
                variant="outlined"
                required
                sx={{
                  '& .MuiInputLabel-root': { color: 'white' },
                  '& .MuiOutlinedInput-root': { 
                    color: 'white',
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: '#17bebb' },
                    '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required sx={{
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#17bebb' },
                  '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                }
              }}>
                <InputLabel>Género</InputLabel>
                <Select
                  name="genero"
                  value={formData.genero}
                  label="Género"
                  onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                  sx={{ 
                    color: 'white',
                    '& .MuiSelect-icon': { color: 'white' }
                  }}
                >
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Unisex">Unisex</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" required sx={{
                '& .MuiInputLabel-root': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': { borderColor: 'white' },
                  '&:hover fieldset': { borderColor: '#17bebb' },
                  '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                }
              }}>
                <InputLabel>Disponibilidad</InputLabel>
                <Select
                  name="Disponibilidad"
                  value={formData.Disponibilidad}
                  label="Disponibilidad"
                  onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                  sx={{ 
                    color: 'white',
                    '& .MuiSelect-icon': { color: 'white' }
                  }}
                >
                  <MenuItem value="Si">Disponible</MenuItem>
                  <MenuItem value="No">No Disponible</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ bgcolor: '#000', borderTop: '1px solid white', p: 2 }}>
          <Button 
            onClick={() => setOpenModal(false)} 
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': { borderColor: '#17bebb', color: '#17bebb' }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            startIcon={<Save />}
            sx={{
              bgcolor: '#17bebb',
              color: 'black',
              '&:hover': { bgcolor: '#00a99d' }
            }}
          >
            {editMode ? 'Actualizar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TallaCrud;