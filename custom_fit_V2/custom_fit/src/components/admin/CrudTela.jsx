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
  const [formData, setFormData] = useState({
    NombreTela: '',
    fecha_agregado: '',
    Disponibilidad: '',
    precio: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => { fetchTelas(); }, []);

  const fetchTelas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/telas/', {
        headers: { Authorization: `Token ${authToken}` }
      });
      setTelas(response.data);
    } catch {
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
      const response = await axios.post('http://localhost:8000/api/telas/', formData, {
        headers: { Authorization: `Token ${authToken}` }
      });
      if (response.status === 201) {
        fetchTelas();
        setOpenAddModal(false);
        setSnackbar({ open: true, message: 'Tela agregada correctamente', severity: 'success' });
      }
    } catch {
      setSnackbar({ open: true, message: 'Error al agregar tela', severity: 'error' });
    }
  };

  const handleEditTela = async () => {
    if (!currentTela) return;
    try {
      const response = await axios.put(`http://localhost:8000/api/telas/${currentTela.idTela}/`, formData, {
        headers: { Authorization: `Token ${authToken}` }
      });
      if (response.status === 200) {
        fetchTelas();
        handleCloseEditModal();
        setSnackbar({ open: true, message: 'Tela actualizada correctamente', severity: 'success' });
      }
    } catch {
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
        const response = await axios.delete(`http://localhost:8000/api/telas/${tela.idTela}/`, {
          headers: { Authorization: `Token ${authToken}` }
        });
        if (response.status === 204) {
          fetchTelas();
          Swal.fire('Eliminado', 'Tela eliminada correctamente', 'success');
        }
      } catch {
        Swal.fire('Error', 'No se pudo eliminar la tela', 'error');
      }
    }
  };

  const columns = [
    { accessorKey: 'idTela', header: 'ID', size: 80 },
    { accessorKey: 'NombreTela', header: 'Nombre', size: 160 },
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
