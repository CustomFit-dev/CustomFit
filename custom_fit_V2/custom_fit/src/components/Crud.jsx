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
    Snackbar,
    Chip,
    Switch,
    FormControlLabel
  } from '@mui/material';
  import DeleteIcon from '@mui/icons-material/Delete';
  import EditIcon from '@mui/icons-material/Edit';
  import AddIcon from '@mui/icons-material/Add';
  import CloseIcon from '@mui/icons-material/Close';
  import SaveIcon from '@mui/icons-material/Save';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import CategoryIcon from '@mui/icons-material/Category';
  import { useNavigate } from 'react-router-dom';
  import { MRT_Localization_ES } from 'material-react-table/locales/es';
  import { ThemeProvider } from '@mui/material/styles';
  import axios from 'axios';
  import { flexRender } from '@tanstack/react-table';
  import theme from './modules/Themes';
  import '../scss/admin/crud.scss';

  const ProductsCrud = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [formData, setFormData] = useState({
      nombre: '',
      descripcion: '',
      precio: '',
      categoria: '',
      stock: '',
      imagen_url: '',
      activo: true,
      codigo_producto: '',
      marca: '',
      peso: '',
      dimensiones: ''
    });
    const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'success'
    });
    
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();

    // API URLs
    const API_BASE_URL = 'http://localhost:8000/api';

    useEffect(() => {
      fetchProducts();
      fetchCategories();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
        setSnackbar({
          open: true,
          message: 'Error al cargar los productos',
          severity: 'error'
        });
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories/`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        setSnackbar({
          open: true,
          message: 'Error al cargar las categorías',
          severity: 'error'
        });
      }
    };

    const Return = () => {
      navigate('/Home');
    };

    const handleOpenAddModal = () => {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        stock: '',
        imagen_url: '',
        activo: true,
        codigo_producto: '',
        marca: '',
        peso: '',
        dimensiones: ''
      });
      setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
      setOpenAddModal(false);
    };

    const handleOpenEditModal = (product) => {
      setProductToEdit(product);
      setFormData({
        nombre: product.nombre || '',
        descripcion: product.descripcion || '',
        precio: product.precio || '',
        categoria: product.categoria?.nombre || product.categoria || '',
        stock: product.stock || '',
        imagen_url: product.imagen_url || '',
        activo: product.activo !== undefined ? product.activo : true,
        codigo_producto: product.codigo_producto || '',
        marca: product.marca || '',
        peso: product.peso || '',
        dimensiones: product.dimensiones || ''
      });
      setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
      setOpenEditModal(false);
      setProductToEdit(null);
    };

    const handleOpenDeleteDialog = (product) => {
      setProductToDelete(product);
      setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
      setOpenDeleteDialog(false);
      setProductToDelete(null);
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };

  const handleAddProduct = async () => {
    // Validaciones básicas
    if (!formData.nombre || !formData.precio || !formData.categoria) {
      setSnackbar({
        open: true,
        message: 'Por favor completa los campos obligatorios',
        severity: 'error'
      });
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/products/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        await fetchProducts();
        setOpenAddModal(false);
        setSnackbar({
          open: true,
          message: 'Producto agregado correctamente',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error al agregar producto:', error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error al agregar producto',
        severity: 'error'
      });
    }
  };

  const handleEditProduct = async () => {
    if (!productToEdit) return;
    
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${productToEdit.id}/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        await fetchProducts();
        handleCloseEditModal();
        setSnackbar({
          open: true,
          message: 'Producto actualizado correctamente',
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error al actualizar producto',
        severity: 'error'
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${productToDelete.id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productToDelete.id)
        );
        handleCloseDeleteDialog();
        setSnackbar({
          open: true,
          message: 'Producto eliminado correctamente',
          severity: 'success'
        });
      } else {
        throw new Error(`Respuesta inesperada: ${response.status}`);
      }
    } catch (error) {
      console.error('Error al borrar el producto:', error.response?.data || error.message);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Error al eliminar producto',
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const columns = [
    { 
      accessorKey: 'id', 
      header: 'ID',
      size: 80
    },
    { 
      accessorKey: 'codigo_producto', 
      header: 'Código',
      size: 120
    },
    { 
      accessorKey: 'nombre', 
      header: 'Producto',
      size: 200
    },
    { 
      accessorKey: 'categoria.nombre', 
      header: 'Categoría',
      size: 120,
      Cell: ({ cell }) => (
        <Chip 
          label={cell.getValue() || 'Sin categoría'} 
          size="small" 
          icon={<CategoryIcon />}
          sx={{ 
            backgroundColor: '#17bebb',
            color: 'white'
          }}
        />
      ),
    },
    {
      accessorKey: 'precio',
      header: 'Precio',
      size: 120,
      Cell: ({ cell }) => (
        <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
          {formatPrice(cell.getValue())}
        </Typography>
      ),
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      size: 100,
      Cell: ({ cell }) => {
        const stock = cell.getValue();
        const isLowStock = stock < 10;
        return (
          <Chip 
            label={stock}
            size="small"
            color={isLowStock ? 'error' : 'success'}
            variant={isLowStock ? 'filled' : 'outlined'}
          />
        );
      },
    },
    { 
      accessorKey: 'marca', 
      header: 'Marca',
      size: 120
    },
    {
      accessorKey: 'activo',
      header: 'Estado',
      size: 100,
      Cell: ({ cell }) => (
        <Chip 
          label={cell.getValue() ? 'Activo' : 'Inactivo'}
          color={cell.getValue() ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      id: 'acciones',
      header: 'Acciones',
      size: 150,
      Cell: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Tooltip title="Editar producto">
            <IconButton
              color="primary"
              onClick={() => handleOpenEditModal(row.original)}
              size="small"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar producto">
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
    data: products,
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

  const fieldConfiguration = [
    { name: 'nombre', label: 'Nombre del Producto', type: 'text', md: 6, required: true },
    { name: 'codigo_producto', label: 'Código de Producto', type: 'text', md: 6, required: false },
    { name: 'descripcion', label: 'Descripción', type: 'text', md: 12, required: false, multiline: true },
    { name: 'precio', label: 'Precio (COP)', type: 'number', md: 6, required: true },
    { name: 'stock', label: 'Stock Disponible', type: 'number', md: 6, required: false },
    { name: 'marca', label: 'Marca', type: 'text', md: 6, required: false },
    { name: 'peso', label: 'Peso (kg)', type: 'number', md: 6, required: false },
    { name: 'dimensiones', label: 'Dimensiones', type: 'text', md: 6, required: false },
    { name: 'imagen_url', label: 'URL de Imagen', type: 'url', md: 6, required: false },
  ];

  const renderFormFields = (isAddMode = false) => {
    return fieldConfiguration.map(({ name, label, type, md, required, multiline }) => (
      <Grid item xs={12} md={md} key={name}>
        <TextField
          margin="dense"
          name={name}
          label={label}
          type={type}
          fullWidth
          variant="outlined"
          value={formData[name] || ''}
          onChange={handleInputChange}
          required={required}
          multiline={multiline}
          rows={multiline ? 3 : 1}
          sx={{
            width: '100%',
            input: { color: 'white' },
            textarea: { color: 'white' },
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
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} sx={{ minHeight: '100vh', background: 'transparent' }}>
        <h5 className="text-center text-white my-4">
          <ShoppingCartIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Gestión de Productos
        </h5>
        <section className='crud-container'>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '10px', background: 'black', width: '100%' }}>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row', 
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center', 
                mb: 2, 
                gap: 2,
              }}
            >
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
                    background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
                  }}
                >
                  Agregar Producto
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
                background: 'linear-gradient(45deg, #4caf50 30%, #66bb6a 90%)',
              }}
            >
              <AddIcon />
            </Fab>
          )}
          
          {/* Modal para agregar producto */}
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
              <Typography variant="h6">Agregar Nuevo Producto</Typography>
              <IconButton onClick={handleCloseAddModal} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ mt: 2, bgcolor: 'black' }}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {renderFormFields(true)}

                <Grid item xs={12} md={6}>
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
                    <InputLabel id="categoria-label">Categoría</InputLabel>
                    <Select
                      labelId="categoria-label"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      label="Categoría"
                      sx={{
                        color: 'white',
                        '& .MuiSelect-icon': {
                          color: '#17bebb',
                        },
                      }}
                    >
                      {categories.map((categoria) => (
                        <MenuItem key={categoria.id} value={categoria.nombre}>
                          {categoria.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.activo}
                        onChange={handleInputChange}
                        name="activo"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#17bebb',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#17bebb',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: 'white' }}>
                        Producto Activo
                      </Typography>
                    }
                    sx={{ mt: 2 }}
                  />
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
                onClick={handleAddProduct}
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
          
          {/* Modal para editar producto */}
          <Dialog open={openEditModal} onClose={handleCloseEditModal} maxWidth="md" fullWidth>
            <DialogTitle sx={{
              bgcolor: '#17bebb',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="h6">Editar Producto</Typography>
              <IconButton onClick={handleCloseEditModal} sx={{ color: 'white' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ bgcolor: 'black', mt: 2 }}>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {renderFormFields(false)}

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="dense" variant="outlined"
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
                        '& input': { color: 'white' },
                        '& .MuiSelect-icon': { color: '#17bebb' },
                      },
                    }}
                  >
                    <InputLabel id="categoria-edit-label">Categoría</InputLabel>
                    <Select
                      labelId="categoria-edit-label"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleInputChange}
                      label="Categoría"
                      required
                      sx={{
                        color: 'white',
                      }}
                    >
                      {categories.map((categoria) => (
                        <MenuItem key={categoria.id} value={categoria.nombre}>
                          {categoria.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.activo}
                        onChange={handleInputChange}
                        name="activo"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#17bebb',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#17bebb',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ color: 'white' }}>
                        Producto Activo
                      </Typography>
                    }
                    sx={{ mt: 2 }}
                  />
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
                onClick={handleEditProduct}
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
                ¿Estás seguro de que deseas eliminar el producto{' '}
                <strong style={{ color: '#17bebb' }}>{productToDelete?.nombre}</strong>? Esta acción no se puede deshacer.
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
                onClick={handleDeleteProduct}
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
          
     // Final corregido del componente ProductsCrud

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
            font-size: 0.875rem;
          }
        }
      `}</style>
    </ThemeProvider>
  );
};

export default ProductsCrud;