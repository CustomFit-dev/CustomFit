import React, { useEffect, useState } from 'react';
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Snackbar,
  Alert,
  Tooltip,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { flexRender } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import { useAuth } from "../modules/authcontext";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#17bebb' },
    background: { default: '#000000', paper: '#0a0a0a' },
    text: { primary: '#fff', secondary: '#17bebb' },
  },
});

const TelaCrud = () => {
  const { authToken } = useAuth();
  const [telas, setTelas] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentTela, setCurrentTela] = useState(null);
  // Agrego el campo `color` que existe en la BD (puede ser 'bg-danger' u otro identificador)
  const [formData, setFormData] = useState({
    NombreTela: '',
    fecha_agregado: '',
    Disponibilidad: '',
    precio: '',
    color: '', // nuevo campo
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { fetchTelas(); }, []);

  const fetchTelas = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}telas/`;
      console.log('Obteniendo telas de:', url);

      const response = await axios.get(url, {
        headers: { Authorization: `Token ${authToken}` }
      });

      setTelas(response.data);
    } catch (error) {
      console.error('Error al obtener telas:', error);
      setSnackbar({ open: true, message: 'Error al cargar las telas', severity: 'error' });
    }
  };


  const handleOpenAddModal = () => {
    const today = new Date().toISOString().split('T')[0]; // Fecha actual YYYY-MM-DD
    setFormData({
      NombreTela: '',
      fecha_agregado: today,
      Disponibilidad: 'Si',
      precio: '',
      color: '', // default vacío o 'bg-white'
    });
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = (tela) => {
    setCurrentTela(tela);
    setFormData({
      NombreTela: tela.NombreTela || '',
      fecha_agregado: tela.fecha_agregado || '',
      Disponibilidad: tela.Disponibilidad || 'Si',
      precio: tela.precio || '',
      // aceptar campo tanto si la API devuelve 'Color' mayúscula o 'color' minúscula
      color: tela.Color || tela.color || '',
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentTela(null);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddTela = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}telas/`;
      console.log('Agregando tela en:', url, formData);

      const response = await axios.post(url, formData, {
        headers: { Authorization: `Token ${authToken}` }
      });

      if (response.status === 201) {
        fetchTelas();
        setOpenAddModal(false);
        setSnackbar({ open: true, message: 'Tela agregada correctamente', severity: 'success' });
      }
    } catch (error) {
      console.error('Error al agregar tela:', error);
      setSnackbar({ open: true, message: 'Error al agregar tela', severity: 'error' });
    }
  };

  const handleEditTela = async () => {
    if (!currentTela) return;

    try {
      const url = `${process.env.REACT_APP_API_URL}telas/${currentTela.idTela}/`;
      console.log('Actualizando tela en:', url, formData);

      const response = await axios.put(url, formData, {
        headers: { Authorization: `Token ${authToken}` }
      });

      if (response.status === 200) {
        fetchTelas();
        handleCloseEditModal();
        setSnackbar({ open: true, message: 'Tela actualizada correctamente', severity: 'success' });
      }
    } catch (error) {
      console.error('Error al actualizar tela:', error);
      setSnackbar({ open: true, message: 'Error al actualizar tela', severity: 'error' });
    }
  };


  const handleDeleteTela = async (tela) => {
    const result = await Swal.fire({
      title: '¿Eliminar tela?',
      text: `¿Deseas eliminar "${tela.NombreTela}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#17bebb',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#111',
      color: '#fff'
    });

    if (result.isConfirmed) {
      try {
        const urlDelete = `${process.env.REACT_APP_API_URL}telas/${tela.idTela}/`;
        console.log('Eliminando tela en:', urlDelete);

        const response = await axios.delete(urlDelete, {
          headers: { Authorization: `Token ${authToken}` }
        });

        if (response.status === 204) {
          fetchTelas();
          Swal.fire('Eliminado', 'Tela eliminada correctamente', 'success');
        }
      } catch (error) {
        console.error('Error al eliminar tela:', error);
        Swal.fire('Error', 'No se pudo eliminar la tela', 'error');
      }
    }
  };


  // Opciones de color (ajusta etiquetas/valores según tu catálogo)
  const colorOptions = [
    { value: 'bg-danger', label: 'Rojo' },
    { value: 'bg-primary', label: 'Azul' },
    { value: 'bg-success', label: 'Verde' },
    { value: 'bg-white', label: 'Blanco' },
    { value: 'bg-dark', label: 'Negro' },
    { value: 'bg-warning', label: 'Amarillo' },
    { value: 'bg-secondary', label: 'Gris' },
    { value: 'bg-brown', label: 'Cafe' },
    { value: 'bg-lila', label: 'Lila' },
    { value: 'bg-beige', label: 'Beige' },
    { value: 'bg-turquoise', label: 'Turquesa' },
    { value: 'bg-fuchsia', label: 'Fucsia' },
  ];
  
  const colorHex = {
    'bg-danger': '#d32f2f', 'bg-primary': '#1976d2', 'bg-success': '#2e7d32',
    'bg-white': '#ffffff', 'bg-dark': '#000000', 'bg-warning': '#fbc02d',
    'bg-secondary': '#9e9e9e', 'bg-brown': '#795548', 'bg-lila': '#c27ba0',
    'bg-beige': '#e6d7c5', 'bg-turquoise': '#17bebb', 'bg-fuchsia': '#c2185b',
  };

  const columns = [
    { accessorKey: 'idTela', header: 'ID', size: 80 },
    { accessorKey: 'NombreTela', header: 'Nombre', size: 160 },
    {
      accessorKey: 'color',
      header: 'Color',
      size: 120,
      Cell: ({ cell }) => {
        const val = cell.getValue() || cell.row.original.Color || '';
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Box sx={{ width: 22, height: 14, bgcolor: colorHex[val] || '#fff', border: '1px solid #444' }} />
            <Typography variant="body2" sx={{ color: '#fff' }}>{val || '—'}</Typography>
          </Box>
        );
      }
    },
    {
      accessorKey: 'precio',
      header: 'Precio',
      size: 120,
      Cell: ({ cell }) => `$${parseFloat(cell.getValue() || 0).toLocaleString()}`,
    },
    {
      accessorKey: 'fecha_agregado',
      header: 'Fecha Agregado',
      size: 140,
      Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleDateString() : '—',
    },
    {
      accessorKey: 'Disponibilidad',
      header: 'Disponibilidad',
      size: 130,
      Cell: ({ cell }) => {
        const disponible = cell.getValue()?.toLowerCase() === 'si';
        return (
          <Chip
            label={disponible ? 'Disponible' : 'No disponible'}
            color={disponible ? 'success' : 'error'}
            variant="outlined"
            icon={<FiberManualRecordIcon sx={{ fontSize: 10 }} />}
          />
        );
      },
    },
    {
      accessorKey: 'updated_at',
      header: 'Última actualización',
      size: 160,
      Cell: ({ cell }) => cell.getValue() ? new Date(cell.getValue()).toLocaleString() : '—',
    },
    {
      id: 'acciones',
      header: 'Acciones',
      size: 130,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Tooltip title="Editar">
            <IconButton color="primary" size="small" onClick={() => handleOpenEditModal(row.original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton color="error" size="small" onClick={() => handleDeleteTela(row.original)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: telas,
    initialState: { pagination: { pageSize: 5 } },
    localization: MRT_Localization_ES,
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ maxWidth: '1300px', mx: 'auto', mt: 4, px: 2 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#17bebb', mb: 3 }}>
          Gestión de Telas
        </Typography>

        <Paper sx={{ p: 2, background: '#0a0a0a', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 2 }}>
            <MRT_GlobalFilterTextField table={table} placeholder="Buscar tela..." />
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenAddModal} sx={{ bgcolor: '#17bebb', color: '#000' }}>
              Nueva Tela
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell key={header.id} align="center" sx={{ color: '#17bebb', fontWeight: 'bold' }}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} hover>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} align="center">
                        <MRT_TableBodyCellValue cell={cell} table={table} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 2 }}>
            <MRT_TablePagination table={table} />
          </Box>
        </Paper>

        {/* MODAL AGREGAR */}
        <Dialog
          open={openAddModal}
          onClose={handleCloseAddModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3, background: '#0f0f0f', border: '1px solid #17bebb' }
          }}
        >
          <DialogTitle sx={{ bgcolor: '#17bebb', color: '#000', textAlign: 'center', fontWeight: 'bold' }}>
            Agregar Nueva Tela
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="NombreTela"
                  label="Nombre de la Tela"
                  value={formData.NombreTela}
                  onChange={handleInputChange}
                  sx={{ input: { color: 'white' }, label: { color: '#17bebb' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="fecha_agregado"
                  label="Fecha de Agregado"
                  type="date"
                  value={formData.fecha_agregado}
                  InputProps={{ readOnly: true }}
                  sx={{ input: { color: 'white' }, label: { color: '#17bebb' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="precio"
                  label="Precio"
                  type="number"
                  value={formData.precio}
                  onChange={handleInputChange}
                  sx={{ input: { color: 'white' }, label: { color: '#17bebb' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#17bebb' }}>Disponibilidad</InputLabel>
                  <Select
                    name="Disponibilidad"
                    value={formData.Disponibilidad}
                    onChange={handleInputChange}
                    sx={{ color: 'white' }}
                  >
                    <MenuItem value="Si">Disponible</MenuItem>
                    <MenuItem value="No">No Disponible</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#17bebb' }}>Color</InputLabel>
                  <Select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    sx={{ color: 'white' }}
                  >
                    {colorOptions.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>
                        <Box component="span" sx={{ display: 'inline-block', width: 16, height: 12, bgcolor: colorHex[opt.value] || '#fff', mr: 1, border: '1px solid #444' }} />
                        {opt.label} ({opt.value})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
            <Button onClick={handleCloseAddModal} variant="outlined" color="secondary">Cancelar</Button>
            <Button onClick={handleAddTela} variant="contained" sx={{ bgcolor: '#17bebb', color: '#000' }}>
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        {/* MODAL EDITAR (igual diseño, solo con valores editables) */}
        <Dialog
          open={openEditModal}
          onClose={handleCloseEditModal}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3, background: '#0f0f0f', border: '1px solid #17bebb' }
          }}
        >
          <DialogTitle sx={{ bgcolor: '#17bebb', color: '#000', textAlign: 'center', fontWeight: 'bold' }}>
            Editar Tela
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="NombreTela"
                  label="Nombre de la Tela"
                  value={formData.NombreTela}
                  onChange={handleInputChange}
                  sx={{ input: { color: 'white' }, label: { color: '#17bebb' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="fecha_agregado"
                  label="Fecha de Agregado"
                  type="date"
                  value={formData.fecha_agregado}
                  onChange={handleInputChange}
                  sx={{ input: { color: 'white' }, label: { color: '#17bebb' } }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="precio"
                  label="Precio"
                  type="number"
                  value={formData.precio}
                  onChange={handleInputChange}
                  sx={{ input: { color: 'white' }, label: { color: '#17bebb' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#17bebb' }}>Disponibilidad</InputLabel>
                  <Select
                    name="Disponibilidad"
                    value={formData.Disponibilidad}
                    onChange={handleInputChange}
                    sx={{ color: 'white' }}
                  >
                    <MenuItem value="Si">Disponible</MenuItem>
                    <MenuItem value="No">No Disponible</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: '#17bebb' }}>Color</InputLabel>
                  <Select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    sx={{ color: 'white' }}
                  >
                    {colorOptions.map(opt => (
                      <MenuItem key={opt.value} value={opt.value}>
                        <Box component="span" sx={{ display: 'inline-block', width: 16, height: 12, bgcolor: colorHex[opt.value] || '#fff', mr: 1, border: '1px solid #444' }} />
                        {opt.label} ({opt.value})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', p: 2 }}>
            <Button onClick={handleCloseEditModal} variant="outlined" color="secondary">Cancelar</Button>
            <Button onClick={handleEditTela} variant="contained" sx={{ bgcolor: '#17bebb', color: '#000' }}>
              Actualizar
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default TelaCrud;
