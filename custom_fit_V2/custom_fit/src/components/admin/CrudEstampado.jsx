import React, { useEffect, useState } from 'react';
import {
  MRT_GlobalFilterTextField,
  MRT_TableBodyCellValue,
  MRT_TablePagination,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Stack,
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
  useMediaQuery,
  Tooltip,
  Fab,
  Alert,
  Snackbar,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';
import { flexRender } from '@tanstack/react-table';
import Swal from 'sweetalert2';

// Tema personalizado
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#17bebb',
    },
    secondary: {
      main: '#00a99d',
    },
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#17bebb',
    },
  },
});

const EstampadoCrud = () => {
  const [estampados, setEstampados] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentEstampado, setCurrentEstampado] = useState(null);
  const [formData, setFormData] = useState({
    NombreEstampado: '',
    TipoEstampado: '',
    PrecioEstampado: '',
    ImgEstampado: '',
    ColorEstampado: '',
    Disponibilidad: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    fetchEstampados();
  }, []);

  const fetchEstampados = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/estampados/');
      setEstampados(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al cargar los estampados',
        severity: 'error'
      });
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      NombreEstampado: '',
      TipoEstampado: '',
      PrecioEstampado: '',
      ImgEstampado: '',
      ColorEstampado: '',
      Disponibilidad: ''
    });
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (estampado) => {
    setCurrentEstampado(estampado);
    setFormData({
      NombreEstampado: estampado.NombreEstampado || '',
      TipoEstampado: estampado.TipoEstampado || '',
      PrecioEstampado: estampado.PrecioEstampado || '',
      ImgEstampado: estampado.ImgEstampado || '',
      ColorEstampado: estampado.ColorEstampado || '',
      Disponibilidad: estampado.Disponibilidad || ''
    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setCurrentEstampado(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddEstampado = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/estampados/create/', formData);
      if (response.status === 201 || response.status === 200) {
        await fetchEstampados();
        setOpenAddModal(false);
        setSnackbar({
          open: true,
          message: 'Estampado agregado correctamente',
          severity: 'success'
        });
        Swal.fire({
          title: 'Creado',
          text: 'Estampado creado exitosamente',
          icon: 'success',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#17bebb'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al agregar estampado',
        severity: 'error'
      });
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al guardar',
        icon: 'error',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#17bebb'
      });
    }
  };

  const handleEditEstampado = async () => {
    if (!currentEstampado) return;
    
    try {
      const response = await axios.put(`http://localhost:8000/api/estampados/${currentEstampado.idEstampado}/edit/`, formData);
      if (response.status === 200) {
        await fetchEstampados();
        handleCloseEditModal();
        setSnackbar({
          open: true,
          message: 'Estampado actualizado correctamente',
          severity: 'success'
        });
        Swal.fire({
          title: 'Actualizado',
          text: 'Estampado actualizado exitosamente',
          icon: 'success',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#17bebb'
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al actualizar estampado',
        severity: 'error'
      });
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al actualizar',
        icon: 'error',
        background: '#1a1a1a',
        color: '#ffffff',
        confirmButtonColor: '#17bebb'
      });
    }
  };

  const handleDeleteEstampado = async (estampado) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el estampado "${estampado.NombreEstampado}"?`,
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
        const response = await axios.delete(`http://localhost:8000/api/estampados/${estampado.idEstampado}/edit/`);
        if (response.status === 204 || response.status === 200) {
          await fetchEstampados();
          setSnackbar({
            open: true,
            message: 'Estampado eliminado correctamente',
            severity: 'success'
          });
          Swal.fire({
            title: 'Eliminado',
            text: 'El estampado ha sido eliminado correctamente',
            icon: 'success',
            background: '#1a1a1a',
            color: '#ffffff',
            confirmButtonColor: '#17bebb'
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Error al eliminar estampado',
          severity: 'error'
        });
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar el estampado',
          icon: 'error',
          background: '#1a1a1a',
          color: '#ffffff',
          confirmButtonColor: '#17bebb'
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  const columns = [
    {
      accessorKey: 'NombreEstampado',
      header: 'Nombre del Estampado',
      size: 150
    },
    {
      accessorKey: 'TipoEstampado',
      header: 'Tipo de Estampado',
      size: 150
    },
    {
      accessorKey: 'PrecioEstampado',
      header: 'Precio',
      size: 120,
      Cell: ({ cell }) => `$${parseFloat(cell.getValue() || 0).toLocaleString()}`
    },
    {
      accessorKey: 'ImgEstampado',
      header: 'Imagen',
      size: 100,
      Cell: ({ cell }) => {
        const imageUrl = cell.getValue();
        return imageUrl ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src={imageUrl} 
              alt="Estampado" 
              style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
            />
          </Box>
        ) : 'Sin imagen';
      }
    },
    {
      accessorKey: 'ColorEstampado',
      header: 'Color',
      size: 120,
      Cell: ({ cell }) => {
        const color = cell.getValue();
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
            <Box 
              sx={{ 
                width: 20, 
                height: 20, 
                backgroundColor: color || '#ccc', 
                borderRadius: '50%',
                border: '1px solid #17bebb'
              }} 
            />
            <Typography variant="body2">{color}</Typography>
          </Box>
        );
      }
    },
    {
      accessorKey: 'Disponibilidad',
      header: 'Disponibilidad',
      size: 130,
      Cell: ({ cell }) => {
        const disponible = cell.getValue()?.toLowerCase() === 'si';
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FiberManualRecordIcon 
              sx={{ 
                color: disponible ? '#4caf50' : '#f44336',
                fontSize: 12
              }} 
            />
            <Chip
              label={disponible ? 'Disponible' : 'No Disponible'}
              color={disponible ? 'success' : 'error'}
              size="small"
              variant="outlined"
            />
          </Box>
        );
      }
    },
    {
      id: 'acciones',
      header: 'Acciones',
      size: 150,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Tooltip title="Editar estampado">
            <IconButton
              color="primary"
              onClick={() => handleOpenEditModal(row.original)}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar estampado">
            <IconButton
              color="error"
              onClick={() => handleDeleteEstampado(row.original)}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: estampados,
    enableRowSelection: true,
    initialState: {
      pagination: { pageSize: 5, pageIndex: 0 },
      showGlobalFilter: true,
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 20],
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
    localization: {
      ...MRT_Localization_ES,
      pagination: {
        ...MRT_Localization_ES.pagination,
        rowsPerPage: 'Filas por página',
      },
    },
    muiTableBodyRowProps: {
      hover: true,
    },
    muiTablePaperProps: {
      elevation: 3,
      sx: {
        borderRadius: '10px',
        overflow: 'hidden',
      },
    },
    enableColumnResizing: true,
    layoutMode: 'grid',
    enableColumnFilters: true
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ minHeight: '100vh', background: 'transparent' }}>
        <Typography variant="h4" component="h1" sx={{ 
          textAlign: 'center', 
          color: 'white', 
          my: 4,
          fontWeight: 'bold'
        }}>
          Gestión de Estampados
        </Typography>
        
        <Box sx={{ maxWidth: '1280px', margin: '0 auto', px: 2 }}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '10px', background: 'black', width: '100%' }}>
            
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row', 
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center', 
              mb: 2, 
              gap: 2,
            }}>
              <MRT_GlobalFilterTextField 
                table={table} 
                sx={{ 
                  width: isMobile ? '100%' : '300px',
                  '& .MuiInputBase-root': {
                    borderRadius: '8px',
                  }
                }}
              />
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddModal}
                  sx={{
                    borderRadius: '8px',
                    boxShadow: 2,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  }}
                >
                  Agregar Estampado
                </Button>
                {!isMobile && <MRT_TablePagination table={table} />}
              </Box>
            </Box>
            
            <TableContainer sx={{ overflowX: 'auto', borderRadius: '8px', background: 'black' }}>
              <Table>
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} sx={{ background: 'black' }}>
                      {headerGroup.headers.map((header) => (
                        <TableCell 
                          align="center" 
                          variant="head" 
                          key={header.id}
                          sx={{ 
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            color: '#00a99d'
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.Header ??
                                  header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableHead>
                <TableBody>
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <TableRow 
                      key={row.id} 
                      selected={row.getIsSelected()}
                      sx={{
                        '&:nth-of-type(odd)': {
                          backgroundColor: 'black',
                        },
                        '&:hover': {
                          backgroundColor: '#00a99d',
                        },
                        transition: 'background-color 0.2s',
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell 
                          align="center" 
                          variant="body" 
                          key={cell.id}
                          sx={{ 
                            padding: isMobile ? '8px 4px' : '16px 8px',
                            whiteSpace: 'normal',
                            wordBreak: 'break-word'
                          }}
                        >
                          <MRT_TableBodyCellValue
                            cell={cell}
                            table={table}
                            staticRowIndex={rowIndex}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            
            {isMobile && (
              <Box sx={{ mt: 2 }}>
                <MRT_TablePagination table={table} />
              </Box>
            )}
            
            <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
          </Paper>
          
          {/* Botón flotante para móviles */}
          {isMobile && (
            <Fab 
              color="primary" 
              aria-label="add" 
              onClick={handleOpenAddModal}
              sx={{ 
                position: 'fixed', 
                bottom: 20, 
                right: 20,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              }}
            >
              <AddIcon />
            </Fab>
          )}
          
          {/* Modal para agregar estampado */}
          <Dialog open={openAddModal} onClose={handleCloseAddModal} maxWidth="md" fullWidth>
            <DialogTitle
              sx={{
                bgcolor: '#17bebb',
                color: 'white',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Agregar Nuevo Estampado</Typography>
              <IconButton onClick={handleCloseAddModal} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 2, bgcolor: 'black' }}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  { name: 'NombreEstampado', label: 'Nombre del Estampado', type: 'text', md: 6 },
                  { name: 'TipoEstampado', label: 'Tipo de Estampado', type: 'text', md: 6 },
                  { name: 'PrecioEstampado', label: 'Precio del Estampado', type: 'number', md: 6 },
                  { name: 'ImgEstampado', label: 'URL de la Imagen', type: 'text', md: 6 },
                  { name: 'ColorEstampado', label: 'Color del Estampado', type: 'text', md: 12 },
                ].map(({ name, label, type, md }) => (
                  <Grid item xs={12} md={md} key={name}>
                    <TextField
                      margin="dense"
                      name={name}
                      label={label}
                      type={type}
                      fullWidth
                      variant="outlined"
                      value={formData[name]}
                      onChange={handleInputChange}
                      required
                      sx={{
                        width: '100%',
                        input: { color: 'white' },
                        label: { color: '#17bebb' },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#17bebb',
                          },
                          '&:hover fieldset': {
                            borderColor: '#17e6c9',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0fa59d',
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <FormControl fullWidth margin="dense" variant="outlined" required
                    sx={{
                      '& .MuiInputLabel-root': { color: '#17bebb' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#17bebb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#17e6c9',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0fa59d',
                        },
                      },
                    }}
                  >
                    <InputLabel id="disponibilidad-label">Disponibilidad</InputLabel>
                    <Select
                      labelId="disponibilidad-label"
                      name="Disponibilidad"
                      value={formData.Disponibilidad}
                      onChange={handleInputChange}
                      label="Disponibilidad"
                      sx={{
                        color: 'white',
                        '& .MuiSelect-icon': {
                          color: '#17bebb',
                        },
                      }}
                    >
                      <MenuItem value="Si">Disponible</MenuItem>
                      <MenuItem value="No">No Disponible</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, bgcolor: 'black' }}>
              <Button
                onClick={handleCloseAddModal}
                variant="outlined"
                startIcon={<CloseIcon />}
                sx={{
                  color: 'white',
                  borderColor: '#17bebb',
                  '&:hover': {
                    borderColor: '#17e6c9',
                    backgroundColor: 'rgba(23, 190, 187, 0.1)',
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddEstampado}
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  bgcolor: '#17bebb',
                  color: 'black',
                  '&:hover': {
                    bgcolor: '#17e6c9',
                  }
                }}
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Modal para editar estampado */}
          <Dialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
            <DialogTitle sx={{
              bgcolor: '#17bebb',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h6">Editar Estampado</Typography>
              <IconButton onClick={handleCloseEditModal} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ bgcolor: 'black', mt: 2 }}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  { name: 'NombreEstampado', label: 'Nombre del Estampado', type: 'text' },
                  { name: 'TipoEstampado', label: 'Tipo de Estampado', type: 'text' },
                  { name: 'PrecioEstampado', label: 'Precio del Estampado', type: 'number' },
                  { name: 'ImgEstampado', label: 'URL de la Imagen', type: 'text' },
                  { name: 'ColorEstampado', label: 'Color del Estampado', type: 'text' }
                ].map((field, idx) => (
                  <Grid item xs={12} md={6} key={idx}>
                    <TextField
                      margin="dense"
                      name={field.name}
                      label={field.label}
                      type={field.type}
                      fullWidth
                      variant="outlined"
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required
                      sx={{
                        width: '100%',
                        input: { color: 'white' },
                        label: { color: '#17bebb' },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#17bebb',
                          },
                          '&:hover fieldset': {
                            borderColor: '#17e6c9',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#0fa59d',
                          },
                        },
                      }}
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <FormControl fullWidth margin="dense" variant="outlined"
                    sx={{
                      width: '100%',
                      '& .MuiInputLabel-root': { color: '#17bebb' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#17bebb',
                        },
                        '&:hover fieldset': {
                          borderColor: '#17e6c9',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#0fa59d',
                        },
                        '& input': { color: 'white' },
                        '& .MuiSelect-icon': { color: '#17bebb' },
                      },
                    }}
                  >
                    <InputLabel id="disponibilidad-edit-label">Disponibilidad</InputLabel>
                    <Select
                      labelId="disponibilidad-edit-label"
                      name="Disponibilidad"
                      value={formData.Disponibilidad}
                      onChange={handleInputChange}
                      label="Disponibilidad"
                      required
                      sx={{
                        color: 'white',
                      }}
                    >
                      <MenuItem value="Si">Disponible</MenuItem>
                      <MenuItem value="No">No Disponible</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 2, bgcolor: 'black' }}>
              <Button
                onClick={handleCloseEditModal}
                variant="outlined"
                startIcon={<CloseIcon />}
                sx={{
                  color: 'white',
                  borderColor: '#17bebb',
                  '&:hover': {
                    borderColor: '#17e6c9',
                    backgroundColor: 'rgba(23, 190, 187, 0.1)',
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEditEstampado}
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{
                  bgcolor: '#17bebb',
                  color: 'black',
                  '&:hover': {
                    bgcolor: '#17e6c9',
                  }
                }}
              >
                Actualizar
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Snackbar para notificaciones */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={snackbar.severity} 
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Paper>
      
      {/* Estilos CSS adicionales */}
      <style jsx global>{`
        @media (max-width: 600px) {
          .MuiTableCell-root {
            padding: 8px 4px;
            font-size: 0.75rem;
          }
          
          .MuiTypography-h4 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </ThemeProvider>
  );
};

export default EstampadoCrud;