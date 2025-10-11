import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Snackbar, Alert,
  Tooltip, Typography, useMediaQuery
} from '@mui/material';
import { Add, Edit, Delete, Close, Save, Visibility } from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useAuth } from "../modules/authcontext";

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
  const { authToken } = useAuth();
  const [productos, setProductos] = useState([]);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openImgModal, setOpenImgModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(null);
  const [formData, setFormData] = useState({
    NombreProductos: '',
    TipoProductos: '',
    PrecioProducto: '',
    Descripcion: '',
    fecha_creacion: '',
    fecha_actualizacion: '',
    urlFrontal: '',
    urlEspaldar: '',
    urlMangaIzquierda: '',
    urlMangaDerecha: '',
    Tallas: '',
    Color: '',
    Tela_idTela: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/productos/", {
        headers: { Authorization: `Token ${authToken}` }
      });
      setProductos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const openForm = (prod = null) => {
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
        TipoProductos: '',
        PrecioProducto: '',
        Descripcion: '',
        fecha_creacion: new Date().toISOString().split('T')[0],
        fecha_actualizacion: new Date().toISOString().split('T')[0],
        urlFrontal: '',
        urlEspaldar: '',
        urlMangaIzquierda: '',
        urlMangaDerecha: '',
        Tallas: '',
        Color: '',
        Tela_idTela: '',
      });
    }
    setOpenFormModal(true);
  };

  const closeForm = () => {
    setOpenFormModal(false);
    setTimeout(() => {
      document.getElementById("btn-nuevo-producto")?.focus();
    }, 100);
  };

  const change = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      const payload = {
        ...formData,
        PrecioProducto: parseFloat(formData.PrecioProducto) || 0,
        Tela_idTela: formData.Tela_idTela ? parseInt(formData.Tela_idTela) : null,
      };

      if (editMode) {
        await axios.put(
          `http://localhost:8000/api/productos/${current.idProductos}/edit/`,
          payload,
          { headers: { Authorization: `Token ${authToken}` } }
        );
        Swal.fire('Actualizado', 'Producto actualizado correctamente', 'success');
      } else {
        await axios.post(
          'http://localhost:8000/api/productos/create/',
          payload,
          { headers: { Authorization: `Token ${authToken}` } }
        );
        Swal.fire('Guardado', 'Producto creado correctamente', 'success');
      }

      fetchProductos();
      closeForm();
    } catch (err) {
      console.error("Error al guardar producto:", err.response?.data || err.message);
      Swal.fire('Error', 'No se pudo guardar el producto', 'error');
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
      try {
        await axios.delete(`http://localhost:8000/api/productos/${id}/edit/`, {
          headers: { Authorization: `Token ${authToken}` }
        });
        Swal.fire('Eliminado', 'Producto eliminado correctamente', 'success');
        fetchProductos();
      } catch (err) {
        console.error("Error al eliminar producto:", err.response?.data || err.message);
        Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
      }
    }
  };

  // 🔹 Ver imágenes
  const verImagenes = (producto) => {
    setSelectedProducto(producto);
    setOpenImgModal(true);
  };

  const cerrarModalImagen = () => {
    setOpenImgModal(false);
    setSelectedProducto(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ background: 'transparent', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', p: 2 }}>
          <Typography variant="h4" align="center" color="white" sx={{ my: 4, fontWeight: 'bold' }}>
            Gestión de Productos
          </Typography>
          <Button
            id="btn-nuevo-producto"
            variant="contained"
            startIcon={<Add />}
            onClick={() => openForm()}
          >
            Nuevo Producto
          </Button>

          <TableContainer sx={{ mt: 2, background: '#000', borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['Nombre', 'Tipo', 'Precio', 'Color', 'Talla', 'Tela', 'Acciones'].map(h => (
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
                    <TableCell align="center" sx={{ color: 'white' }}>{p.Color}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{p.Tallas}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{p.Tela_idTela}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver imágenes">
                        <IconButton color="secondary" onClick={() => verImagenes(p)}><Visibility /></IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton color="primary" onClick={() => openForm(p)}><Edit /></IconButton>
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

          {/* 🔹 Modal de agregar/editar producto */}
          <Dialog open={openFormModal} onClose={closeForm} fullWidth maxWidth="md">
            <DialogTitle sx={{ bgcolor: '#17bebb', color: 'white' }}>
              {editMode ? 'Editar Producto' : 'Nuevo Producto'}
            </DialogTitle>
            <DialogContent sx={{ background: '#000' }}>
              <Grid container spacing={2}>
                {[
                  { name: 'NombreProductos', label: 'Nombre' },
                  { name: 'TipoProductos', label: 'Tipo' },
                  { name: 'PrecioProducto', label: 'Precio' },
                  { name: 'Descripcion', label: 'Descripción' },
                  { name: 'Color', label: 'Color' },
                  { name: 'Tallas', label: 'Tallas' },
                  { name: 'Tela_idTela', label: 'Tela (ID)' },
                  { name: 'urlFrontal', label: 'URL Frontal' },
                  { name: 'urlEspaldar', label: 'URL Espaldar' },
                  { name: 'urlMangaIzquierda', label: 'URL Manga Izquierda' },
                  { name: 'urlMangaDerecha', label: 'URL Manga Derecha' },
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
                ))}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ background: '#000', p: 2 }}>
              <Button
                onClick={closeForm}
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

          {/* 🔹 Modal para ver imágenes */}
          <Dialog open={openImgModal} onClose={cerrarModalImagen} fullWidth maxWidth="md">
            <DialogTitle sx={{ bgcolor: '#17bebb', color: 'white' }}>
              Imágenes del producto
            </DialogTitle>
            <DialogContent sx={{ background: '#000' }}>
              {selectedProducto ? (
                <Grid container spacing={2} justifyContent="center">
                  {[
                    { label: 'Frontal', src: selectedProducto.urlFrontal },
                    { label: 'Espalda', src: selectedProducto.urlEspaldar },
                    { label: 'Manga Izquierda', src: selectedProducto.urlMangaIzquierda },
                    { label: 'Manga Derecha', src: selectedProducto.urlMangaDerecha },
                  ].map((img, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i} textAlign="center">
                      <Typography sx={{ color: '#17bebb', mb: 1 }}>{img.label}</Typography>
                      {img.src ? (
                        <img
                          src={img.src}
                          alt={img.label}
                          style={{
                            width: '100%',
                            height: 150,
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: '2px solid #17bebb'
                          }}
                        />
                      ) : (
                        <Typography color="gray">Sin imagen</Typography>
                      )}
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography color="white">No hay imágenes para mostrar</Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ background: '#000', p: 2 }}>
              <Button
                onClick={cerrarModalImagen}
                variant="contained"
                startIcon={<Close />}
                sx={{ backgroundColor: '#17bebb', color: '#000' }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ProductoCrud;
