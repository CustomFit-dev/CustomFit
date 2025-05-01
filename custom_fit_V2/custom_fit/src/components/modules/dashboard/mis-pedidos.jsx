import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import CodeIcon from '@mui/icons-material/Code';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#17BEBB' },
    background: { default: '#000000', paper: '#000000' },
    text: { primary: '#ffffff' },
    status: {
      completed: '#4caf50', // Verde para estados completados
      inProgress: '#ffeb3b', // Amarillo para estados en proceso
      pending: '#444444', // Gris oscuro para estados pendientes
    }
  },
  typography: { fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' },
});

function OrderTrackingComponent() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: 'Pedido #1234',
      status: 'En desarrollo',
      statusStep: 1,
      products: [
        { id: 1, name: 'Camiseta sencilla', image: '/images/purple-shirt.png', description: 'Camiseta de algodón 100%, color morado, talla M' },
        { id: 2, name: 'Chaqueta negra', image: '/images/black-jacket.png', description: 'Chaqueta de cuero sintético, color negro, talla L' }
      ]
    },
    {
      id: 2,
      name: 'Pedido #2345',
      status: 'Empacando',
      statusStep: 2,
      products: [
        { id: 3, name: 'Jeans azules', image: '/images/blue-jeans.png', description: 'Jeans slim fit, color azul índigo, talla 32' }
      ]
    },
    {
      id: 3,
      name: 'Pedido #3456',
      status: 'Enviado',
      statusStep: 3,
      products: [
        { id: 4, name: 'Sudadera gris', image: '/images/gray-hoodie.png', description: 'Sudadera con capucha, color gris, talla XL' },
        { id: 5, name: 'Gorra deportiva', image: '/images/sports-cap.png', description: 'Gorra deportiva ajustable, color negro' }
      ]
    }
  ]);

  // Estado para la ventana modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setCurrentProductIndex(0);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === selectedOrder.products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevProduct = () => {
    setCurrentProductIndex((prevIndex) => 
      prevIndex === 0 ? selectedOrder.products.length - 1 : prevIndex - 1
    );
  };

  // Determinar el color del estado según si está completado, en proceso o pendiente
  const getStatusColor = (orderStatusStep, stepNumber) => {
    if (orderStatusStep > stepNumber) return theme.palette.status.completed; // Completado (verde)
    if (orderStatusStep === stepNumber) return theme.palette.status.inProgress; // En proceso (amarillo)
    return theme.palette.status.pending; // Pendiente (gris)
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{ py: 3 }}>
        <Typography
          variant="h5"
          sx={{
            color: '#17BEBB',
            fontWeight: 'bold',
            mb: 2,
            px: 2
          }}
        >
          Mis pedidos
        </Typography>
        <Divider sx={{ bgcolor: '#333', mb: 3 }} />

        {orders.map((order) => (
          <Box key={order.id} sx={{ mb: 5, px: 2, bgcolor: '#111111', borderRadius: 2, p: 3 }}>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" sx={{ mb: 2, color: '#17BEBB' }}>
                  {order.name}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ 
                    color: '#17BEBB',
                    borderColor: '#17BEBB',
                    mb: 2,
                    fontWeight: 'bold'
                  }}
                  onClick={() => handleOpenModal(order)}
                >
                  Ver productos
                </Button>
              </Grid>
            </Grid>
            
            {/* Order tracking steps */}
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              {/* Step 1 - Development */}
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'transparent',
                    border: `2px solid ${getStatusColor(order.statusStep, 1)}`,
                    mx: 'auto',
                    mb: 1,
                    color: getStatusColor(order.statusStep, 1)
                  }}
                >
                  <CodeIcon fontSize="large" />
                </Avatar>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: getStatusColor(order.statusStep, 1),
                    border: `2px solid ${getStatusColor(order.statusStep, 1)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    1
                  </Typography>
                </Box>
                <Typography sx={{color:'white',}} variant="body2">En desarrollo</Typography>
              </Grid>
              
              {/* Line between step 1 and 2 */}
              <Box
                sx={{
                  height: 2,
                  flexGrow: 1,
                  bgcolor: order.statusStep >= 2 ? theme.palette.status.completed : theme.palette.status.pending,
                  mx: -1,
                  position: 'relative',
                  top: -30,
                }}
              />

              {/* Step 2 - Packing */}
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'transparent',
                    border: `2px solid ${getStatusColor(order.statusStep, 2)}`,
                    mx: 'auto',
                    mb: 1,
                    color: getStatusColor(order.statusStep, 2)
                  }}
                >
                  <InventoryIcon fontSize="large" />
                </Avatar>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: getStatusColor(order.statusStep, 2),
                    border: `2px solid ${getStatusColor(order.statusStep, 2)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    2
                  </Typography>
                </Box>
                <Typography sx={{color:'white',}} variant="body2">Empacando</Typography>
              </Grid>

              {/* Step 3 - Shipped */}
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'transparent',
                    border: `2px solid ${getStatusColor(order.statusStep, 3)}`,
                    mx: 'auto',
                    mb: 1,
                    color: getStatusColor(order.statusStep, 3)
                  }}
                >
                  <LocalShippingIcon fontSize="large" />
                </Avatar>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: getStatusColor(order.statusStep, 3),
                    border: `2px solid ${getStatusColor(order.statusStep, 3)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    3
                  </Typography>
                </Box>
                <Typography sx={{color:'white',}} variant="body2">Enviado</Typography>
              </Grid>

              {/* Line between step 3 and 4 */}
              <Box
                sx={{
                  height: 2,
                  flexGrow: 1,
                  bgcolor: order.statusStep >= 4 ? theme.palette.status.completed : theme.palette.status.pending,
                  mx: -1,
                  position: 'relative',
                  top: -30,
                }}
              />

              {/* Step 4 - Delivered */}
              <Grid item xs={3} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'transparent',
                    border: `2px solid ${getStatusColor(order.statusStep, 4)}`,
                    mx: 'auto',
                    mb: 1,
                    color: getStatusColor(order.statusStep, 4)
                  }}
                >
                  <CheckCircleIcon fontSize="large" />
                </Avatar>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: getStatusColor(order.statusStep, 4),
                    border: `2px solid ${getStatusColor(order.statusStep, 4)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    4
                  </Typography>
                </Box>
                <Typography sx={{color:'white',}} variant="body2">Entregado</Typography>
              </Grid>
            </Grid>

            {/* Status label */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  display: 'inline-block',
                  bgcolor: order.statusStep === 1 ? '#17BEBB' : 
                           order.statusStep === 2 ? '#2196f3' : 
                           order.statusStep === 3 ? '#ff9800' : '#4caf50',
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: 4,
                  px: 3,
                  py: 0.5,
                }}
              >
                {order.status}
              </Typography>
            </Box>

            {/* Product count badge */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                variant="body2"
                sx={{
                  display: 'inline-block',
                  border: '1px solid #444',
                  borderRadius: 1,
                  px: 2,
                  py: 0.5,
                  color: '#fff',
                }}
              >
                {order.products.length} {order.products.length === 1 ? 'producto' : 'productos'}
              </Typography>
            </Box>
            
            {/* Cancel button */}
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 2,
                  bgcolor: '#17BEBB',
                  color: 'white',
                  px: 3,
                  '&:hover': {
                    bgcolor: '#0e8f8f',
                  },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        ))}
      </Container>

      {/* Modal para mostrar productos con slider mejorado */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#121212',
            color: 'white',
            borderRadius: 2,
          }
        }}
      >
        {selectedOrder && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#17BEBB', color: 'black' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {selectedOrder.name} - Producto {currentProductIndex + 1}/{selectedOrder.products.length}
              </Typography>
              <IconButton onClick={handleCloseModal} sx={{ color: 'black' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#222', borderBottom: '1px solid #333' }}>
                {/* Flecha izquierda para slider (solo si hay más de un producto) */}
                {selectedOrder.products.length > 1 && (
                  <IconButton 
                    onClick={handlePrevProduct} 
                    sx={{ 
                      position: 'absolute', 
                      left: 10, 
                      zIndex: 1,
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                    }}
                  >
                    <ArrowBackIosIcon />
                  </IconButton>
                )}
                
                {/* Imagen del producto */}
                <Box
                  component="img"
                  src={selectedOrder.products[currentProductIndex].image}
                  alt={selectedOrder.products[currentProductIndex].name}
                  sx={{
                    maxHeight: 300,
                    maxWidth: '80%',
                    objectFit: 'contain'
                  }}
                />
                
                {/* Flecha derecha para slider (solo si hay más de un producto) */}
                {selectedOrder.products.length > 1 && (
                  <IconButton 
                    onClick={handleNextProduct} 
                    sx={{ 
                      position: 'absolute', 
                      right: 10,
                      zIndex: 1,
                      color: 'white',
                      bgcolor: 'rgba(0,0,0,0.5)',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </IconButton>
                )}
              </Box>
              
              {/* Detalles del producto */}
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#17BEBB', fontWeight: 'bold' }}>
                  {selectedOrder.products[currentProductIndex].name}
                </Typography>
                
                <Typography variant="body1" sx={{ mb: 3, color: '#ccc' }}>
                  {selectedOrder.products[currentProductIndex].description}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Estado: <span style={{ color: '#17BEBB', fontWeight: 'bold' }}>{selectedOrder.status}</span>
                  </Typography>
                  
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 2,
                      bgcolor: '#17BEBB',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#0e8f8f',
                      },
                    }}
                  >
                    Ver detalles
                  </Button>
                </Box>
              </Box>
                
              {/* Indicadores de navegación para el slider (puntos) */}
              {selectedOrder.products.length > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, borderTop: '1px solid #333' }}>
                  {selectedOrder.products.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        mx: 0.5,
                        bgcolor: currentProductIndex === index ? '#17BEBB' : '#444',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setCurrentProductIndex(index)}
                    />
                  ))}
                </Box>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>
    </ThemeProvider>
  );
}

export default OrderTrackingComponent;