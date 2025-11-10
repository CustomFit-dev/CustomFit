import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  Grid, TextField, Table, TableHead, TableRow, TableCell, TableBody, TableContainer,
  Tooltip, useMediaQuery, TablePagination, InputAdornment, Chip, LinearProgress, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
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
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [search, setSearch] = useState("");
  const isMobile = useMediaQuery('(max-width:600px)');
  const [imageStatus, setImageStatus] = useState('idle');

  const [formData, setFormData] = useState({
    NombreEstampado: '',
    TipoEstampado: '',
    PrecioEstampado: '',
    ImgEstampado: '',
    ColorEstampado: '',
    rolestampado: 'cliente'
  });

  // paginación
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      setImageFile(null);
      setImageStatus(estampado.ImgEstampado ? 'uploaded' : 'idle');
    } else {
      setEditMode(false);
      setFormData({ NombreEstampado: '', TipoEstampado: '', PrecioEstampado: '', ImgEstampado: '', ColorEstampado: '', rolestampado: 'cliente' });
      setImageFile(null);
      setImageStatus('idle');
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    document.activeElement.blur(); // Evita warning de focus
    setOpenModal(false);
    setEditMode(false);
    setImageFile(null);
    setImageStatus('idle');
  };

  // 🔹 Subir imagen a Cloudinary
  const uploadToCloudinary = async () => {
    if (!imageFile) return null;
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'customfit_upload');
    data.append('cloud_name', 'dxaooh0kz');
    data.append('folder', 'estampados');

    try {
      setImageStatus('uploading');
      const res = await fetch('https://api.cloudinary.com/v1_1/dxaooh0kz/image/upload', {
        method: 'POST',
        body: data,
      });
      const uploaded = await res.json();

      if (uploaded?.secure_url) {
        setImageStatus('uploaded');
        return uploaded.secure_url;
      } else {
        setImageStatus('error');
        return null;
      }
    } catch (err) {
      console.error('Error al subir a Cloudinary:', err);
      setImageStatus('error');
      return null;
    }
  };

  // ✅ Corregida: función completa
  const handleSave = async () => {
    try {
      // Validar campos antes de enviar
      if (!formData.NombreEstampado || !formData.TipoEstampado || !formData.PrecioEstampado) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor llena todos los campos obligatorios.',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#17bebb'
        });
        return;
      }

      let imageUrl = formData.ImgEstampado;

      if (imageFile) {
        const uploadedUrl = await uploadToCloudinary();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo subir la imagen.',
            background: '#1a1a1a',
            color: '#fff',
            confirmButtonColor: '#17bebb'
          });
          return;
        }
      }

      const dataToSend = {
        NombreEstampado: formData.NombreEstampado.trim(),
        TipoEstampado: formData.TipoEstampado.trim(),
        rolestampado: formData.rolestampado || 'cliente',
        PrecioEstampado: parseFloat(formData.PrecioEstampado),
        ImgEstampado: imageUrl || '',
        ColorEstampado: formData.ColorEstampado.trim()
      };

      console.log("Datos enviados al backend:", dataToSend);

      const url = editMode
        ? `http://localhost:8000/api/estampados/${currentId}/edit/`
        : 'http://localhost:8000/api/estampados/create/';
      const method = editMode ? axios.put : axios.post;

      const res = await method(url, dataToSend, {
        headers: {
          Authorization: `Token ${authToken}`,
          'Content-Type': 'application/json'
        },
      });

      if (res.status === 200 || res.status === 201) {
        fetchEstampados();
        handleCloseModal();
        Swal.fire({
          icon: 'success',
          title: editMode ? 'Actualizado' : 'Creado',
          text: editMode
            ? 'Estampado actualizado correctamente'
            : 'Estampado agregado correctamente',
          background: '#1a1a1a',
          color: '#fff',
          confirmButtonColor: '#17bebb'
        });
      }

    } catch (err) {
      console.error("Error completo:", err);
      if (err.response?.data) {
        console.error("Error del backend:", err.response.data);
      }
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

  // 🔹 Filtro dinámico
  const filteredRows = estampados.filter(e =>
    e.NombreEstampado.toLowerCase().includes(search.toLowerCase()) ||
    e.TipoEstampado.toLowerCase().includes(search.toLowerCase()) ||
    (e.rolestampado || '').toLowerCase().includes(search.toLowerCase())
  );

  const visibleRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // UI helper para el Chip
  const statusMap = {
    idle: { label: 'Sin imagen', color: 'default' },
    selected: { label: 'Imagen seleccionada', color: 'info' },
    uploading: { label: 'Cargando imagen…', color: 'warning' },
    uploaded: { label: 'Imagen cargada', color: 'success' },
    error: { label: 'Error al subir', color: 'error' },
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ minHeight: '100vh', p: 3, background: 'black', boxShadow: '0 0 20px rgba(23,190,187,0.3)' }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 3, fontWeight: 'bold', color: '#17bebb' }}>
          Gestión de Estampados
        </Typography>

        {/* 🔍 Filtro y botón */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          <TextField
            placeholder="Buscar por nombre o tipo..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#17bebb' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: '300px',
              '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: '#17bebb' } },
              '& input::placeholder': { color: '#aaa' }
            }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal()}
            sx={{ bgcolor: '#17bebb', color: 'black', '&:hover': { bgcolor: '#17e6c9' } }}
          >
            Nuevo Estampado
          </Button>
        </Box>

        {/* Tabla */}
        <TableContainer component={Paper} sx={{ background: 'black' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['Nombre', 'Tipo', 'Origen', 'Precio', 'Color', 'Imagen', 'Acciones'].map((col) => (
                  <TableCell key={col} sx={{ color: '#17bebb', fontWeight: 'bold' }}>
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleRows.map((e) => (
                <TableRow key={e.idEstampado} hover sx={{ '&:hover': { backgroundColor: 'rgba(23,190,187,0.05)' } }}>
                  <TableCell sx={{ color: 'white' }}>{e.NombreEstampado}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{e.TipoEstampado}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{e.rolestampado}</TableCell>
                  <TableCell sx={{ color: 'white' }}>${parseFloat(e.PrecioEstampado || 0).toLocaleString()}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{e.ColorEstampado}</TableCell>
                  <TableCell align="center">
                    {e.ImgEstampado ? (
                      <img src={e.ImgEstampado} alt="Estampado" width="45" height="45" style={{ borderRadius: 6, objectFit: 'cover' }} />
                    ) : (
                      <Typography sx={{ color: '#bdbdbd' }}>Sin imagen</Typography>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Ver imagen">
                      <IconButton color="info" onClick={() => { setPreviewImage(e.ImgEstampado); setOpenPreview(true); }}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton color="primary" onClick={() => handleOpenModal(e)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton color="error" onClick={() => handleDelete(e.idEstampado, e.NombreEstampado)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}

              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ color: '#ccc' }}>
                    No hay estampados que coincidan
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 🔹 Paginador */}
        <TablePagination
          component="div"
          count={filteredRows.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          sx={{ color: '#17bebb' }}
          labelRowsPerPage="Filas por página"
        />

        {/* 🟢 Modal de Formulario */}
        <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: '#000', color: '#17bebb' }}>
            {editMode ? 'Editar Estampado' : 'Nuevo Estampado'}
          </DialogTitle>

          <DialogContent sx={{ bgcolor: '#000', color: 'white' }}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Estampado"
                  name="NombreEstampado"
                  value={formData.NombreEstampado}
                  onChange={handleInput}
                  InputLabelProps={{ style: { color: '#17bebb' } }}
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tipo de Estampado"
                  name="TipoEstampado"
                  value={formData.TipoEstampado}
                  onChange={handleInput}
                  InputLabelProps={{ style: { color: '#17bebb' } }}
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Origen (rol)"
                  name="rolestampado"
                  value={formData.rolestampado || 'cliente'}
                  onChange={handleInput}
                  InputLabelProps={{ style: { color: '#17bebb' } }}
                  sx={{ input: { color: 'white' } }}
                >
                  <MenuItem value="cliente">Cliente</MenuItem>
                  <MenuItem value="usuario">Usuario</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Color del Estampado"
                  name="ColorEstampado"
                  value={formData.ColorEstampado}
                  onChange={handleInput}
                  InputLabelProps={{ style: { color: '#17bebb' } }}
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Precio"
                  type="number"
                  name="PrecioEstampado"
                  value={formData.PrecioEstampado}
                  onChange={handleInput}
                  InputLabelProps={{ style: { color: '#17bebb' } }}
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    sx={{ color: '#17bebb', borderColor: '#17bebb' }}
                  >
                    Subir Imagen
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setImageFile(file || null);
                        setImageStatus(file ? 'selected' : (formData.ImgEstampado ? 'uploaded' : 'idle'));
                      }}
                    />
                  </Button>

                  <Chip
                    label={statusMap[imageStatus].label}
                    color={statusMap[imageStatus].color}
                    variant="outlined"
                    sx={{ borderColor: '#17bebb', color: '#17bebb' }}
                  />
                </Box>

                {imageStatus === 'uploading' && (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress />
                  </Box>
                )}
                              {(imageFile || formData.ImgEstampado) && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <img
                      src={imageFile ? URL.createObjectURL(imageFile) : formData.ImgEstampado}
                      alt="Vista previa"
                      width="180"
                      height="180"
                      style={{
                        objectFit: 'cover',
                        borderRadius: '12px',
                        border: '2px solid #17bebb',
                      }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ bgcolor: '#000' }}>
            <Button
              onClick={handleCloseModal}
              startIcon={<CloseIcon />}
              sx={{ color: '#bbb', '&:hover': { color: '#fff' } }}
            >
              Cancelar
            </Button>

            <Button
              onClick={handleSave}
              startIcon={<SaveIcon />}
              sx={{
                bgcolor: '#17bebb',
                color: '#000',
                '&:hover': { bgcolor: '#17e6c9' },
              }}
            >
              {editMode ? 'Actualizar' : 'Guardar'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* 🔹 Modal de vista previa de imagen */}
        <Dialog
          open={openPreview}
          onClose={() => setOpenPreview(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle
            sx={{
              bgcolor: '#000',
              color: '#17bebb',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Vista Previa
          </DialogTitle>

          <DialogContent
            sx={{
              bgcolor: '#000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              p: 3,
            }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Vista previa"
                width="100%"
                style={{
                  borderRadius: '10px',
                  border: '2px solid #17bebb',
                  objectFit: 'contain',
                  background: '#111',
                }}
              />
            ) : (
              <Typography sx={{ color: '#bbb' }}>No hay imagen disponible</Typography>
            )}
          </DialogContent>

          <DialogActions sx={{ bgcolor: '#000', justifyContent: 'center' }}>
            <Button
              onClick={() => setOpenPreview(false)}
              variant="outlined"
              sx={{
                color: '#17bebb',
                borderColor: '#17bebb',
                '&:hover': { borderColor: '#17e6c9', color: '#17e6c9' },
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </ThemeProvider>
  );
};

export default EstampadoCrud;
