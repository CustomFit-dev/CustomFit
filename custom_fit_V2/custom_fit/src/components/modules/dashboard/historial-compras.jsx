import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Avatar,
  Paper,
  Grid,
  Divider,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Modal,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b8d4',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid #333',
          padding: '8px 16px',
        },
      },
    },
  },
});

const comprasData = [
  {
    id: 1,
    imagen: "/api/placeholder/150/150",
    tipo: "Camiseta sencilla",
    fecha: "23/02/2024",
    detalles: {
      producto: [
        { label: "Color", valor: "Blanco" },
        { label: "Logo", valor: "NO" },
        { label: "Texto", valor: "SI" },
        { label: "Tela", valor: "Fibra" },
        { label: "Talla", valor: "L" },
        { label: "Prenda", valor: "Camisa" },
      ],
      precios: [
        { label: "Color", valor: "5.000col" },
        { label: "Logo", valor: "0.000col" },
        { label: "Texto", valor: "5.000col" },
        { label: "Tela", valor: "10.000col" },
        { label: "Talla", valor: "4.000col" },
        { label: "Camisa", valor: "12.000col" },
      ],
      transaccion: [
        { label: "Compra", valor: "23/02/2024" },
        { label: "Entrega", valor: "31/02/2024" },
        { label: "Pago", valor: "Efectivo" },
        { label: "Pago con", valor: "50.000col" },
        { label: "Devuelta", valor: "15.000col" },
        { label: "Valor", valor: "35.000col" },
      ],
    },
    estado: "Entregado"
  },
  {
    id: 2,
    imagen: "/api/placeholder/150/150",
    tipo: "Camiseta sencilla",
    fecha: "23/02/2024",
    detalles: {
      producto: [
        { label: "Color", valor: "Blanco" },
        { label: "Logo", valor: "si" },
        { label: "Texto", valor: "SI" },
        { label: "Tela", valor: "Fibra" },
        { label: "Talla", valor: "L" },
        { label: "Prenda", valor: "Camisa" },
      ],
      precios: [
        { label: "Color", valor: "5.000col" },
        { label: "Logo", valor: "20.000col" },
        { label: "Texto", valor: "5.000col" },
        { label: "Tela", valor: "10.000col" },
        { label: "Talla", valor: "4.000col" },
        { label: "Camisa", valor: "12.000col" },
      ],
      transaccion: [
        { label: "Compra", valor: "23/02/2024" },
        { label: "Entrega", valor: "31/02/2024" },
        { label: "Pago", valor: "Efectivo" },
        { label: "Pago con", valor: "50.000col" },
        { label: "Devuelta", valor: "15.000col" },
        { label: "Valor", valor: "35.000col" },
      ],
    },
    estado: "Entregado"
  },
];

function HistorialCompras() {
  const [tabValue, setTabValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenModal = (compra) => {
    setSelectedCompra(compra);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4, bgcolor: '#000000', minHeight: '100vh' }}>
        <Grid container spacing={2}>
          {/* Sección izquierda con avatar */}
          <Grid item xs={12} md={3} lg={2} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            mb: 4
          }}>
            <Avatar 
              sx={{ 
                width: 120, 
                height: 120, 
                bgcolor: '#1e4a70',
                mb: 2,
                border: '4px solid #0d2438'
              }}
              alt="Usuario"
              src="/api/placeholder/120/120"
            />
            <Typography 
              variant="body2" 
              component="a" 
              href="mailto:Kevin11234daniel@gmail.com"
              sx={{ 
                color: '#00b8d4', 
                textDecoration: 'underline',
                '&:hover': {
                  color: '#4dd0e1'
                }
              }}
            >
              Kevin11234daniel@gmail.com
            </Typography>
          </Grid>
          
          {/* Divider vertical */}
          <Divider orientation="vertical" flexItem sx={{ 
            display: { xs: 'none', md: 'block' }, 
            bgcolor: '#333',
            mx: 2
          }} />
          
          {/* Sección derecha con historial */}
          <Grid item xs={12} md={8} lg={9}>
            <Box sx={{ width: '100%', mb: 4 }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#00b8d4', 
                  textAlign: 'center',
                  mb: 3,
                  fontWeight: 'light'
                }}
              >
                Historial de compras
              </Typography>
              
              <Paper 
                sx={{ 
                  bgcolor: 'background.paper', 
                  borderRadius: 1, 
                  overflow: 'hidden' 
                }}
              >
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  sx={{
                    '& .MuiTab-root': {
                      color: '#aaa',
                      '&.Mui-selected': {
                        color: '#00b8d4',
                        fontWeight: 'medium',
                      },
                    },
                    borderBottom: '1px solid #333',
                  }}
                >
                  <Tab label="Hace 1 Día" />
                  <Tab label="Hace 1 Mes" />
                  <Tab label="Hace 1 Año" />
                </Tabs>
                
                {/* Lista simplificada de compras */}
                <Box sx={{ p: 0 }}>
                  {comprasData.map((compra) => (
                    <Card 
                      key={compra.id}
                      sx={{ 
                        borderRadius: 0, 
                        boxShadow: 'none',
                        mb: 1,
                        bgcolor: 'background.paper',
                        '&:not(:last-child)': {
                          borderBottom: '1px solid #333'
                        }
                      }}
                    >
                      <Grid container alignItems="center">
                        {/* Imagen del producto */}
                        <Grid item xs={3} sm={2}>
                          <CardMedia
                            component="img"
                            sx={{ width: '100%', maxHeight: 80, objectFit: 'contain', p: 1 }}
                            image={compra.imagen}
                            alt="Camiseta"
                          />
                        </Grid>
                        
                        {/* Información resumida */}
                        <Grid item xs={7} sm={9}>
                          <CardContent sx={{ p: 1 }}>
                            <Typography variant="subtitle1" color="primary">
                              {compra.tipo}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                                Fecha: {compra.fecha}
                              </Typography>
                              <Chip 
                                size="small" 
                                label={compra.estado} 
                                sx={{ 
                                  bgcolor: '#005f6b', 
                                  color: 'white',
                                  fontSize: '0.7rem',
                                  height: 24
                                }} 
                              />
                            </Box>
                          </CardContent>
                        </Grid>
                        
                        {/* Botón para ver detalles */}
                        <Grid item xs={2} sm={1} sx={{ textAlign: 'center' }}>
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenModal(compra)}
                            aria-label="ver detalles"
                          >
                            <InfoIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
        
        {/* Modal con detalles completos */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-detalles-compra"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '70%' },
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            border: '1px solid #333',
            borderRadius: 1,
            boxShadow: 24,
            p: 0,
          }}>
            {selectedCompra && (
              <>
                {/* Header del modal */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  p: 2,
                  borderBottom: '1px solid #333',
                  bgcolor: '#1a1a1a'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ShoppingBagIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6" component="h2">
                      Detalles de Compra
                    </Typography>
                  </Box>
                  <IconButton
                    aria-label="cerrar"
                    onClick={handleCloseModal}
                    sx={{ color: 'text.secondary' }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>
                
                {/* Contenido del modal */}
                <Box sx={{ p: 3 }}>
                  <Grid container spacing={3}>
                    {/* Imagen y datos básicos */}
                    <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ 
                          width: '100%', 
                          maxHeight: 200, 
                          objectFit: 'contain',
                          mb: 2,
                          bgcolor: '#0a0a0a',
                          p: 2,
                          borderRadius: 1
                        }}
                        image={selectedCompra.imagen}
                        alt={selectedCompra.tipo}
                      />
                      <Typography variant="h6" color="primary" gutterBottom>
                        {selectedCompra.tipo}
                      </Typography>
                      <Chip 
                        label={selectedCompra.estado} 
                        sx={{ 
                          bgcolor: '#005f6b', 
                          color: 'white',
                          my: 1
                        }} 
                      />
                    </Grid>
                    
                    {/* Tablas con detalles */}
                    <Grid item xs={12} sm={8}>
                      <Grid container spacing={2}>
                        {/* Detalles del producto */}
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            Producto
                          </Typography>
                          <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: '#1a1a1a' }}>
                            <Table size="small">
                              <TableBody>
                                {selectedCompra.detalles.producto.map((detalle, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell component="th" scope="row" sx={{ color: '#aaa' }}>
                                      {detalle.label}
                                    </TableCell>
                                    <TableCell align="right">{detalle.valor}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        
                        {/* Detalles de precios */}
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            Precios
                          </Typography>
                          <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: '#1a1a1a' }}>
                            <Table size="small">
                              <TableBody>
                                {selectedCompra.detalles.precios.map((detalle, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell component="th" scope="row" sx={{ color: '#aaa' }}>
                                      {detalle.label}
                                    </TableCell>
                                    <TableCell align="right">{detalle.valor}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        
                        {/* Detalles de transacción */}
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            Transacción
                          </Typography>
                          <TableContainer component={Paper} variant="outlined" sx={{ bgcolor: '#1a1a1a' }}>
                            <Table size="small">
                              <TableBody>
                                {selectedCompra.detalles.transaccion.map((detalle, idx) => (
                                  <TableRow key={idx}>
                                    <TableCell component="th" scope="row" sx={{ color: '#aaa' }}>
                                      {detalle.label}
                                    </TableCell>
                                    <TableCell align="right">{detalle.valor}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                
                {/* Footer del modal */}
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  p: 2,
                  borderTop: '1px solid #333',
                  bgcolor: '#1a1a1a'
                }}>
                  <Button 
                    onClick={handleCloseModal} 
                    variant="contained" 
                    color="primary"
                  >
                    Cerrar
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default HistorialCompras;