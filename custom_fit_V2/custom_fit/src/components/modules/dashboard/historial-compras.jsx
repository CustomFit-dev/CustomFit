import React, { useState } from 'react';
import Cammisa1 from '../../../img/camisa1.jpg';
import Cammisa2 from '../../../img/camisa2.jpg';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Modal,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  TableContainer,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#17BEBB',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#17BEBB',
      secondary: '#b0bec5',
    },
  },
});

const comprasEjemplo = [
  {
    id: 1,
    imagen: Cammisa1,
    titulo: 'Camiseta Personalizada - Estilo Urbano',
    fecha: '2024-03-15',
    precio: '$35.000',
    estado: 'Entregado',
    detalles: {
      producto: [
        { label: 'Color', valor: 'Negro' },
        { label: 'Talla', valor: 'M' },
        { label: 'Tipo de Tela', valor: 'Algodón Premium' },
        { label: 'Diseño', valor: 'Logo personalizado en pecho' },
      ],
      precios: [
        { label: 'Subtotal', valor: '$30.000' },
        { label: 'Envío', valor: '$5.000' },
        { label: 'Total', valor: '$35.000' },
      ],
      transaccion: [
        { label: 'Método de Pago', valor: 'Tarjeta de crédito' },
        { label: 'Fecha de Compra', valor: '2024-03-15' },
        { label: 'Estado', valor: 'Entregado' },
      ],
    },
  },
  {
    id: 2,
    imagen: Cammisa2,
    titulo: 'Camiseta Diseño Floral',
    fecha: '2024-03-01',
    precio: '$40.000',
    estado: 'En proceso',
    detalles: {
      producto: [
        { label: 'Color', valor: 'Blanco' },
        { label: 'Talla', valor: 'L' },
        { label: 'Tipo de Tela', valor: 'Poliéster' },
        { label: 'Diseño', valor: 'Estampado floral completo' },
      ],
      precios: [
        { label: 'Subtotal', valor: '$35.000' },
        { label: 'Envío', valor: '$5.000' },
        { label: 'Total', valor: '$40.000' },
      ],
      transaccion: [
        { label: 'Método de Pago', valor: 'Nequi' },
        { label: 'Fecha de Compra', valor: '2024-03-01' },
        { label: 'Estado', valor: 'En proceso' },
      ],
    },
  },
];

function HistorialCompras() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompra, setSelectedCompra] = useState(null);

  const handleOpenModal = (compra) => {
    setSelectedCompra(compra);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCompra(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {comprasEjemplo.map((compra) => (
            <Grid item xs={12} md={6} key={compra.id}>
              <Card
                sx={{
                  backgroundColor: '#1e1e1e',
                  color: '#ffffff',
                  borderRadius: 4,
                  boxShadow: 4,
                  border: '2px solid #17BEBB',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 15px #17BEBB',
                  },
                }}
                onClick={() => handleOpenModal(compra)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={compra.imagen}
                  alt={compra.titulo}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom color="white">
                    {compra.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha: {compra.fecha}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: {compra.precio}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Estado: {compra.estado}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', md: '80%' },
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: '#1e1e1e',
            border: '2px solid  #17BEBB3',
            borderRadius: 3,
            p: 4,
            boxShadow: 24,
            color: 'white',
          }}>
            {selectedCompra && (
              <>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  borderBottom: '1px solid #17BEBB',
                  pb: 1,
                }}>
                  <Box display="flex" alignItems="center">
                    <ShoppingBagIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" color="primary">
                      Detalles de Compra
                    </Typography>
                  </Box>
                  <IconButton onClick={handleCloseModal} sx={{ color: 'white' }}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      image={selectedCompra.imagen}
                      sx={{ width: '100%', borderRadius: 2, objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" color="primary">Resumen del Producto</Typography>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {selectedCompra.detalles.producto.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ color: 'text.secondary' }}>{item.label}</TableCell>
                              <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Divider sx={{ my: 2, borderColor: '#2196f3' }} />

                    <Typography variant="h6" color="primary">Precios</Typography>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {selectedCompra.detalles.precios.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ color: 'text.secondary' }}>{item.label}</TableCell>
                              <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Divider sx={{ my: 2, borderColor: '#2196f3' }} />

                    <Typography variant="h6" color="primary">Transacción</Typography>
                    <TableContainer>
                      <Table>
                        <TableBody>
                          {selectedCompra.detalles.transaccion.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ color: 'text.secondary' }}>{item.label}</TableCell>
                              <TableCell sx={{ color: 'white' }}>{item.valor}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}

export default HistorialCompras;
