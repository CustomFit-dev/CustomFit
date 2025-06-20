import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Snackbar, Alert,
  Tooltip, Typography, useMediaQuery, FormControl, InputLabel,
  Select, MenuItem
} from '@mui/material';
import { Add, Edit, Delete, Close, Save } from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#17bebb' },
    secondary: { main: '#00a99d' },
    background: { default: '#000', paper: '#000' },
    text: { primary: '#fff', secondary: '#17bebb' },
  },
});

const ProductoCrud = () => {
  const [productos, setProductos] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(null);
  const [formData, setFormData] = useState({
    NombreProductos: '',
    imgProducto: '',
    TipoProductos: '',
    PrecioProducto: '',
    Descripcion: '',
    Color_IdColor: '',
    Tela_idTela: '',
    Tallas_idTallas: '',
    fecha_creacion: '',
    fecha_actualizacion: '',
    tipo_producto: 'personalizado',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/productos/');
      setProductos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const open = (prod = null) => {
    if (prod) {
      setEditMode(true);
      setCurrent(prod);
      setFormData({
        ...prod,
        fecha_creacion: prod.fecha_creacion || '',
        fecha_actualizacion: prod.fecha_actualizacion || '',
      });
    } else {
      setEditMode(false);
      setCurrent(null);
      setFormData({
        NombreProductos: '',
        imgProducto: '',
        TipoProductos: '',
        PrecioProducto: '',
        Descripcion: '',
        Color_IdColor: '',
        Tela_idTela: '',
        Tallas_idTallas: '',
        fecha_creacion: new Date().toISOString().split('T')[0],
        fecha_actualizacion: new Date().toISOString().split('T')[0],
        tipo_producto: 'personalizado',
      });
    }
    setOpenModal(true);
  };

  const close = () => setOpenModal(false);
  const change = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:8000/api/productos/${current.idProductos}/edit/`, formData);
        Swal.fire('Actualizado', 'Producto actualizado', 'success');
      } else {
        await axios.post('http://localhost:8000/api/productos/create/', formData);
        Swal.fire('Guardado', 'Producto creado', 'success');
      }
      fetchProductos();
      close();
    } catch (err) {
      Swal.fire('Error', 'No se pudo guardar', 'error');
    }
  };

  const erase = async id => {
    const res = await Swal.fire({
      title: 'Confirmar eliminación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    });
    if (res.isConfirmed) {
      await axios.delete(`http://localhost:8000/api/productos/${id}/edit/`);
      Swal.fire('Eliminado', 'Producto eliminado', 'success');
      fetchProductos();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ background: 'transparent', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', p: 2 }}>
          <Typography variant="h4" align="center" color="white" sx={{ my: 4, fontWeight: 'bold' }}>
            Gestión de Productos
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => open()}>
            Nuevo Producto
          </Button>
          <TableContainer sx={{ mt: 2, background: '#000', borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Nombre','Tipo','Precio','Creación','Actualización','Acciones'].map(h => (
                    <TableCell key={h} align="center" sx={{ color: '#17bebb' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {productos.map(p => (
                  <TableRow key={p.idProductos} hover sx={{ '&:hover': { bgcolor: '#00a99d' } }}>
                    <TableCell align="center" sx={{ color: 'white' }}>{p.NombreProductos}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{p.TipoProductos}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>${p.PrecioProducto}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{p.fecha_creacion}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{p.fecha_actualizacion}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Editar">
                        <IconButton color="primary" onClick={() => open(p)}><Edit /></IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => erase(p.idProductos)}><Delete /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openModal} onClose={close} fullWidth maxWidth="md">
            <DialogTitle sx={{ bgcolor: '#17bebb', color: 'white' }}>
              {editMode ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
            <DialogContent sx={{ background: '#000' }}>
              <Grid container spacing={2}>
                { [
                  { name: 'NombreProductos', label: 'Nombre' },
                  { name: 'imgProducto', label: 'Imagen URL' },
                  { name: 'TipoProductos', label: 'Tipo' },
                  { name: 'PrecioProducto', label: 'Precio' },
                  { name: 'Descripcion', label: 'Descripción' },
                  { name: 'Color_IdColor', label: 'Color (ID)' },
                  { name: 'Tela_idTela', label: 'Tela (ID)' },
                  { name: 'Tallas_idTallas', label: 'Talla (ID)' },
                  { name: 'fecha_creacion', label: 'Fecha Creación', type: 'date' },
                  { name: 'fecha_actualizacion', label: 'Fecha Actualización', type: 'date' },
                ].map(f => (
                  <Grid item xs={12} md={6} key={f.name}>
                    <TextField
                      fullWidth
                      name={f.name}
                      label={f.label}
                      type={f.type || 'text'}
                      value={formData[f.name] || ''}
                      onChange={change}
                      variant="outlined"
                      sx={{
                        input: { color: 'white' },
                        label: { color: '#17bebb' },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': { borderColor: '#17bebb' },
                          '&:hover fieldset': { borderColor: '#17e6c9' },
                          '&.Mui-focused fieldset': { borderColor: '#0fa59d' },
                        },
                      }}
                    />
                  </Grid>
                )) }
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
                    <InputLabel sx={{ color: '#17bebb' }}>Tipo producto</InputLabel>
                    <Select
                      name="tipo_producto"
                      value={formData.tipo_producto}
                      onChange={change}
                      label="Tipo producto"
                      sx={{ color: 'white','& .MuiSelect-icon': { color: '#17bebb' } }}
                    >
                      <MenuItem value="shop">shop</MenuItem>
                      <MenuItem value="personalizado">personalizado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ background: '#000', p: 2 }}>
              <Button
                onClick={close}
                variant="outlined"
                startIcon={<Close />}
                sx={{ color: 'white', borderColor: '#17bebb' }}
              >
                Cancelar
              </Button>
              <Button
                onClick={save}
                variant="contained"
                startIcon={<Save />}
                sx={{ backgroundColor: '#17bebb', color: '#000' }}
              >
                {editMode ? 'Actualizar' : 'Guardar'}
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar(s => ({ ...s, open: false }))}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert severity={snackbar.severity} variant="filled">
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ProductoCrud;
