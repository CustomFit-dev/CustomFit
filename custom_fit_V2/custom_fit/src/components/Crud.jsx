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
  DialogContentText,
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
  Snackbar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import { fetchData } from './modules/Datos';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { flexRender } from '@tanstack/react-table';
import theme from './modules/Themes';
import '../scss/admin/crud.scss';
import { color } from '@mui/system';

const Crud = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    correo_electronico: '',
    nombre_usuario: '',
    celular: '',
    rol: '',
    
  });
  const [roles, setRoles] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const data = await fetchData();
      console.log(data);
      setUserProfiles(data);
      
      // Extraer roles únicos para el selector
      const uniqueRoles = [...new Set(data.map(user => user.rol?.nombrerol))].filter(Boolean);
      setRoles(uniqueRoles.map(rol => ({ id: rol, nombre: rol })));
    };

    fetchUserProfiles();
  }, []);

  const Return = () => {
    navigate('/Home');
  };

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const handleOpenAddModal = () => {
    setFormData({
      nombres: '',
      apellidos: '',
      correo_electronico: '',
      nombre_usuario: '',
      celular: '',
      rol: ''
    });
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (user) => {
    setUserToEdit(user);
    setFormData({
      nombres: user.nombres,
      apellidos: user.apellidos,
      correo_electronico: user.correo_electronico,
      nombre_usuario: user.nombre_usuario,
      rol: user.rol?.nombrerol || '',
      celular: user.celular || '',

    });
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setUserToEdit(null);
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setUserToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/create-user/', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // Actualizar la lista de usuarios
        const updatedUsers = await fetchData();
        setUserProfiles(updatedUsers);
        setOpenAddModal(false);
        setSnackbar({
          open: true,
          message: 'Usuario agregado correctamente',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error al agregar usuario:', error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: 'Error al agregar usuario',
        severity: 'error'
      });
    }
  };

  const handleEditUser = async () => {
    if (!userToEdit) return;
    
    try {
      const response = await axios.put(`http://localhost:8000/api/update-user/${userToEdit.id}/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Actualizar la lista de usuarios
        const updatedUsers = await fetchData();
        setUserProfiles(updatedUsers);
        handleCloseEditModal();
        setSnackbar({
          open: true,
          message: 'Usuario actualizado correctamente',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: 'Error al actualizar usuario',
        severity: 'error'
      });
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete-user/${userToDelete.id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        // Usuario eliminado correctamente
        setUserProfiles((prevProfiles) =>
          prevProfiles.filter((profile) => profile.id !== userToDelete.id)
        );
        handleCloseDeleteDialog();
        setSnackbar({
          open: true,
          message: 'Usuario eliminado correctamente',
          severity: 'success'
        });
      } else {
        throw new Error(`Respuesta inesperada: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al borrar el usuario:', error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: 'Error al eliminar usuario',
        severity: 'error'
      });
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
      accessorKey: 'nombres', 
      header: 'Nombres',
      size: 150
    },
    { 
      accessorKey: 'apellidos', 
      header: 'Apellidos',
      size: 150
    },
    {
      accessorKey: 'celular',
      header: 'Celular',
      size: 140,
    },
    { 
      accessorKey: 'correo_electronico', 
      header: 'Correo',
      size: 200
    },
    {
      accessorKey: 'nombre_usuario',
      header: 'Nombre de usuario',
      size: 150
    },
    { 
      accessorKey: 'rol.nombrerol', 
      header: 'Rol',
      size: 100,
      Cell: ({ cell }) => cell.getValue() || 'No asignado',
      
    },
    {
      id: 'acciones',
      header: 'Acciones',
      size: 150,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Tooltip title="Editar usuario">
            <IconButton
              color="primary"
              onClick={() => handleOpenEditModal(row.original)}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar usuario">
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteDialog(row.original)}
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
    data: userProfiles,
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
        <h5 class="text-center text-white my-4">Gestión de Usuarios</h5>
        <section className='crud-container'>
          <Paper elevation={3} sx={{  p: 2, borderRadius: '10px', background: 'black', width: '100%' }}>
            
            <Box 
            sx={{ display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row', 
                  justifyContent: 'space-between', alignItems: isMobile ? 
                  'flex-start' : 'center', 
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
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', }}>
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
                  Agregar Usuario
                </Button>
                {!isMobile && <MRT_TablePagination table={table} />}
              </Box>
            </Box>
            
            <TableContainer sx={{ overflowX: 'auto', borderRadius: '8px' , background: 'black' }}>
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
          
          {/* Botón flotante para agregar en móviles */}
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
          
          {/* Modal para agregar usuario */}
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
    <Typography variant="h6">Agregar Nuevo Usuario</Typography>
    <IconButton onClick={handleCloseAddModal} sx={{ color: 'white' }}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ mt: 2, bgcolor: 'black' }}>
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {[
        { name: 'nombres', label: 'Nombres', type: 'text', md: 6 },
        { name: 'apellidos', label: 'Apellidos', type: 'text', md: 6 },
        { name: 'correo_electronico', label: 'Correo Electrónico', type: 'email', md: 6 },
        { name: 'nombre_usuario', label: 'Nombre de Usuario', type: 'text', md: 6 },
        { name: 'confirmar_correo', label: 'Confirmar Email', type: 'text', md: 6 },
        { name: 'celular', label: 'Número de Celular', type: 'tel', md: 6 },
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
          <InputLabel id="rol-label">Rol</InputLabel>
          <Select
            labelId="rol-label"
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            label="Rol"
            sx={{
              color: 'white',
              '& .MuiSelect-icon': {
                color: '#17bebb',
              },
            }}
          >
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.nombre}>
                {rol.nombre}
              </MenuItem>
            ))}
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
      onClick={handleAddUser}
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

          
          {/* Modal para editar usuario */}
          <Dialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
  <DialogTitle sx={{
    bgcolor: '#17bebb',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <Typography variant="h6">Editar Usuario</Typography>
    <IconButton onClick={handleCloseEditModal} sx={{ color: 'white' }}>
      <CloseIcon />
    </IconButton>
  </DialogTitle>

  <DialogContent sx={{ bgcolor: 'black', mt: 2 }}>
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {[
        { name: 'nombres', label: 'Nombres', type: 'text' },
        { name: 'apellidos', label: 'Apellidos', type: 'text' },
        { name: 'correo_electronico', label: 'Correo Electrónico', type: 'email' },
        { name: 'nombre_usuario', label: 'Nombre de Usuario', type: 'text' },
        { name: 'celular', label: 'Número de Celular', type: 'tel' }
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
          <InputLabel id="rol-edit-label">Rol</InputLabel>
          <Select
            labelId="rol-edit-label"
            name="rol"
            value={formData.rol}
            onChange={handleInputChange}
            label="Rol"
            required
            sx={{
              color: 'white',
            }}
          >
            {roles.map((rol) => (
              <MenuItem key={rol.id} value={rol.nombre}>
                {rol.nombre}
              </MenuItem>
            ))}
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
      onClick={handleEditUser}
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

          
          {/* Dialog de confirmación para eliminar */}
       <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <DialogTitle
    sx={{
      fontWeight: 'bold',
      bgcolor: '#17bebb',
      color: 'white',
    }}
  >
    Confirmar eliminación
  </DialogTitle>

  <DialogContent sx={{ bgcolor: 'black' }}>
    <DialogContentText sx={{ color: 'white' }}>
      ¿Estás seguro de que deseas eliminar al usuario{' '}
      <strong style={{ color: '#17bebb' }}>{userToDelete?.nombre_usuario}</strong>? Esta acción no se puede deshacer.
    </DialogContentText>
  </DialogContent>

  <DialogActions sx={{ p: 2, bgcolor: 'black' }}>
    <Button
      onClick={handleCloseDeleteDialog}
      variant="outlined"
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
      onClick={handleDeleteUser}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      sx={{
        color: 'white',
        '&:hover': {
          bgcolor: '#c62828',
        }
      }}
    >
      Eliminar
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
        </section>
      </Paper>
      
      {/* Estilos CSS adicionales */}
      <style jsx global>{`
        .crud-container {
          max-width: 1280px;
          margin: 0 auto;
        }
        
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

export default Crud;