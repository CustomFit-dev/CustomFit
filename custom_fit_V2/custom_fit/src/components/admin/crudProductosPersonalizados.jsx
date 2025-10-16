import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Fab,
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

const CrudProductosPersonalizados = () => {
  const { authToken } = useAuth();
  const [items, setItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');

  const [formData, setFormData] = useState({
    NombrePersonalizado: '',
    precioPersonalizado: '',
    rolProducto: 'tienda',
    stock: 0,
    productos_idProductos: '',
    urlFrontal: '',
    urlEspadarl: '',
    urlMangaDerecha: '',
    urlMangaIzquierda: '',
  });

  // NUEVOS estados para ver imágenes
  const [openImgModal, setOpenImgModal] = useState(false); // ver imágenes del producto (urlFrontal, etc)
  const [openEstampadosModal, setOpenEstampadosModal] = useState(false); // ver imágenes de estampados relacionados
  const [selectedItem, setSelectedItem] = useState(null); // item seleccionado para ver imágenes del producto
  const [selectedEstampados, setSelectedEstampados] = useState([]); // lista de estampados a mostrar

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/productos_personalizados/', 
        { headers: { Authorization: `Token ${authToken}` } });
      setItems(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudieron cargar los productos personalizados', 'error');
    }
  };

  const openNew = () => {
    setEditMode(false);
    setCurrent(null);
    setFormData({
      NombrePersonalizado: '', precioPersonalizado: '', rolProducto: 'tienda', stock: 0, productos_idProductos: '', urlFrontal: '', urlEspaldar: '', urlMangaDerecha: '', urlMangaIzquierda: ''
    });
    setOpenForm(true);
  };

  const openEdit = (item) => {
    setEditMode(true);
    setCurrent(item);
    setFormData({
      NombrePersonalizado: item.NombrePersonalizado || '',
      precioPersonalizado: item.precioPersonalizado || '',
      rolProducto: item.rolProducto || 'tienda',
      stock: item.stock || 0,
      productos_idProductos: item.productos_idProductos || '',
      urlFrontal: item.urlFrontal || '',
      urlEspadarl: item.urlEspadarl || '',
      urlMangaDerecha: item.urlMangaDerecha || '',
      urlMangaIzquierda: item.urlMangaIzquierda || '',
    });
    setOpenForm(true);
  };

  const closeForm = () => setOpenForm(false);

  const change = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const save = async () => {
    // Validaciones simples
    if (!formData.NombrePersonalizado) return Swal.fire('Atención', 'El nombre es requerido', 'warning');
    const precio = parseFloat(formData.precioPersonalizado);
    if (isNaN(precio) || precio < 0) return Swal.fire('Atención', 'Precio inválido', 'warning');
    if (!formData.productos_idProductos) return Swal.fire('Atención', 'Debe indicar el ID del producto relacionado', 'warning');

    try {
      const payload = { ...formData, precioPersonalizado: precio };
      if (editMode && current) {
  await axios.put(`http://localhost:8000/api/productos_personalizados/${current.idProductosPeronalizaos}/`, payload, { headers: { Authorization: `Token ${authToken}` } });
        Swal.fire('Éxito', 'Producto personalizado actualizado', 'success');
      } else {
        await axios.post('http://localhost:8000/api/productos_personalizados/', payload, { headers: { Authorization: `Token ${authToken}` } });
        Swal.fire('Éxito', 'Producto personalizado creado', 'success');
      }
      fetchItems();
      closeForm();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'No se pudo guardar el producto personalizado', 'error');
    }
  };

  const erase = async (id) => {
    const res = await Swal.fire({ title: 'Confirmar eliminación', icon: 'warning', showCancelButton: true, confirmButtonText: 'Sí, eliminar' });
    if (res.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/productos_personalizados/${id}/`, { headers: { Authorization: `Token ${authToken}` } });
        Swal.fire('Éxito', 'Eliminado', 'success');
        fetchItems();
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'No se pudo eliminar', 'error');
      }
    }
  };

  // Abrir modal para ver imágenes del producto (urlFrontal, urlEspaldar, urlMangas)
  const verImagenesProducto = (item) => {
    setSelectedItem(item);
    setOpenImgModal(true);
  };
  const cerrarModalImagenProducto = () => {
    setOpenImgModal(false);
    setSelectedItem(null);
  };

  // Abrir modal para ver estampados relacionados
  const verEstampados = (item) => {
    // el serializer backend devuelve item.estampados como lista de objetos
    setSelectedEstampados(item.estampados || []);
    setOpenEstampadosModal(true);
  };
  const cerrarModalEstampados = () => {
    setOpenEstampadosModal(false);
    setSelectedEstampados([]);
  };

  const filtered = items.filter(it => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (it.NombrePersonalizado || '').toLowerCase().includes(q) || (it.rolProducto || '').toLowerCase().includes(q);
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ background: 'transparent', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 1280, mx: 'auto', p: 2 }}>
          <Typography variant="h4" align="center" color="white" sx={{ my: 4, fontWeight: 'bold' }}>Productos Personalizados</Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField placeholder="Buscar..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} variant="outlined" size="small" sx={{ width: isMobile ? '100%' : 300, input: { color: 'white' } }} />
            <Button variant="contained" startIcon={<Add />} onClick={openNew} sx={{ background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>Nuevo Personalizado</Button>
          </Box>

          <TableContainer sx={{ background: '#000' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {['ID', 'Nombre', 'Precio', 'Rol', 'Stock', 'Producto ID', 'Acciones'].map(h => (<TableCell key={h} align="center" sx={{ color: '#17bebb' }}>{h}</TableCell>))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map(it => (
                  <TableRow key={it.idProductosPeronalizaos} hover sx={{ '&:hover': { bgcolor: '#00a99d' } }}>
                    <TableCell align="center" sx={{ color: 'white' }}>{it.idProductosPeronalizaos}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{it.NombrePersonalizado}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>${it.precioPersonalizado}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{it.rolProducto}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{it.stock}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{it.productos_idProductos}</TableCell>
                    <TableCell align="center">
                      {/* Ver imágenes del producto (urlFrontal, urlEspaldar, mangas) */}
                      <Tooltip title="Ver imágenes del producto"><IconButton color="secondary" onClick={() => verImagenesProducto(it)}><Visibility /></IconButton></Tooltip>

                      {/* Ver estampados relacionados */}
                      <Tooltip title="Ver estampados"><IconButton color="primary" onClick={() => verEstampados(it)}><Visibility /></IconButton></Tooltip>

                      <Tooltip title="Editar"><IconButton color="primary" onClick={() => openEdit(it)}><Edit /></IconButton></Tooltip>
                      <Tooltip title="Eliminar"><IconButton color="error" onClick={() => erase(it.idProductosPeronalizaos)}><Delete /></IconButton></Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {isMobile && (
            <Fab color="primary" aria-label="add" onClick={openNew} sx={{ position: 'fixed', bottom: 20, right: 20, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}><Add /></Fab>
          )}

          <Dialog open={openForm} onClose={closeForm} fullWidth maxWidth="md">
            <DialogTitle sx={{ bgcolor: '#17bebb', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">{editMode ? 'Editar Personalizado' : 'Nuevo Personalizado'}</Typography>
              <IconButton onClick={closeForm} sx={{ color: 'white' }}><Close /></IconButton>
            </DialogTitle>
            <DialogContent sx={{ background: '#000' }}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[{ name: 'NombrePersonalizado', label: 'Nombre' }, { name: 'precioPersonalizado', label: 'Precio' }, { name: 'rolProducto', label: 'Rol' }, { name: 'stock', label: 'Stock' }, { name: 'productos_idProductos', label: 'ID Producto' }, { name: 'urlFrontal', label: 'URL Frontal' }, { name: 'urlEspaldar', label: 'URL Espaldar' }, { name: 'urlMangaDerecha', label: 'URL Manga Derecha' }, { name: 'urlMangaIzquierda', label: 'URL Manga Izquierda' }].map(f => (
                  <Grid item xs={12} md={6} key={f.name}>
                    <TextField margin="dense" name={f.name} label={f.label} type={f.type || 'text'} fullWidth variant="outlined" value={formData[f.name]} onChange={change} sx={{ input: { color: 'white' }, label: { color: '#17bebb' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#17bebb' }, '&:hover fieldset': { borderColor: '#17e6c9' }, '&.Mui-focused fieldset': { borderColor: '#0fa59d' } } }} />
                  </Grid>
                ))}

              </Grid>
            </DialogContent>
            <DialogActions sx={{ background: '#000', p: 2 }}>
              <Button onClick={closeForm} variant="outlined" startIcon={<Close />} sx={{ color: 'white', borderColor: '#17bebb' }}>Cancelar</Button>
              <Button onClick={save} variant="contained" startIcon={<Save />} sx={{ backgroundColor: '#17bebb', color: '#000' }}>{editMode ? 'Actualizar' : 'Guardar'}</Button>
            </DialogActions>
          </Dialog>

          {/* Modal: imágenes del producto (urlFrontal, urlEspaldar, urlMangaIzquierda, urlMangaDerecha) */}
          <Dialog open={openImgModal} onClose={cerrarModalImagenProducto} fullWidth maxWidth="md">
            <DialogTitle sx={{ bgcolor: '#17bebb', color: 'white' }}>
              Imágenes del producto
            </DialogTitle>
            <DialogContent sx={{ background: '#000' }}>
              {selectedItem ? (
                <Grid container spacing={2} justifyContent="center">
                  {/*
                    { label: 'Frontal', src: selectedItem.urlFrontal },
                    { label: 'Espalda', src: selectedItem.urlEspadarl || selectedItem.urlEspaldar },
                    { label: 'Manga Izquierda', src: selectedItem.urlMangaIzquierda },
                    { label: 'Manga Derecha', src: selectedItem.urlMangaDerecha },
                  */}
                  {['Frontal', 'Espalda', 'Manga Izquierda', 'Manga Derecha'].map((label, i) => {
                    const src = label === 'Frontal' ? selectedItem.urlFrontal :
                              label === 'Espalda' ? selectedItem.urlEspadarl || selectedItem.urlEspaldar :
                              label === 'Manga Izquierda' ? selectedItem.urlMangaIzquierda :
                              label === 'Manga Derecha' ? selectedItem.urlMangaDerecha : '';
                    return (
                      <Grid item xs={12} sm={6} md={3} key={i} textAlign="center">
                        <Typography sx={{ color: '#17bebb', mb: 1 }}>{label}</Typography>
                        {src ? (
                          <img
                            src={src}
                            alt={label}
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
                    );
                  })}
                </Grid>
              ) : (
                <Typography color="white">No hay imágenes para mostrar</Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ background: '#000', p: 2 }}>
              <Button onClick={cerrarModalImagenProducto} variant="contained" startIcon={<Close />} sx={{ backgroundColor: '#17bebb', color: '#000' }}>Cerrar</Button>
            </DialogActions>
          </Dialog>

          {/* Modal: imágenes de estampados relacionados */}
          <Dialog open={openEstampadosModal} onClose={cerrarModalEstampados} fullWidth maxWidth="md">
            <DialogTitle sx={{ bgcolor: '#17bebb', color: 'white' }}>
              Estampados relacionados
            </DialogTitle>
            <DialogContent sx={{ background: '#000' }}>
              {selectedEstampados && selectedEstampados.length > 0 ? (
                <Grid container spacing={2} justifyContent="center">
                  {selectedEstampados.map((est, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx} textAlign="center">
                      <Typography sx={{ color: '#17bebb', mb: 1 }}>{est.NombreEstampado || est.nombrE || `Estampado ${est.idEstampado || idx}`}</Typography>
                      {est.ImgEstampado ? (
                        <img
                          src={est.ImgEstampado}
                          alt={est.NombreEstampado || `Estampado ${idx}`}
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
                <Typography color="white">No hay estampados asociados</Typography>
              )}
            </DialogContent>
            <DialogActions sx={{ background: '#000', p: 2 }}>
              <Button onClick={cerrarModalEstampados} variant="contained" startIcon={<Close />} sx={{ backgroundColor: '#17bebb', color: '#000' }}>Cerrar</Button>
            </DialogActions>
          </Dialog>

        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default CrudProductosPersonalizados;
