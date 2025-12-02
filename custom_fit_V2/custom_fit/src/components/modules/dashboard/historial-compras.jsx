import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Chip, CircularProgress, Alert,
  Card, CardContent, CardMedia, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid
} from '@mui/material';
import { Visibility, Download } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from "../../modules/authcontext";
import Swal from 'sweetalert2';
import "../../../scss/historialp.scss";

const HistorialPedidos = () => {
  const { authToken } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [downloadingReceipt, setDownloadingReceipt] = useState(false);

  useEffect(() => {
    if (authToken) fetchPedidos();
  }, [authToken]);

  const getEstadoColor = (estadoNombre) => {
    switch (estadoNombre?.toLowerCase()) {
      case 'pendiente': return 'warning';
      case 'aprobado': return 'info';
      case 'enviado': return 'primary';
      case 'entregado': return 'success';
      case 'cancelado': return 'error';
      case 'pagado': return 'success';
      default: return 'default';
    }
  };

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/mis-pedidos/', {
        headers: { Authorization: `Token ${authToken}` }
      });
      setPedidos(res.data);
    } catch (err) {
      setError('Error al cargar pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const descargarComprobante = async (pedidoId) => {
    try {
      setDownloadingReceipt(true);

      // Mostrar loading
      Swal.fire({
        title: 'Generando comprobante...',
        html: 'Por favor espera un momento',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const receiptUrl = `http://localhost:8000/api/pedidos/${pedidoId}/comprobante/`;
      const response = await axios.get(receiptUrl, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
        responseType: 'blob', // Importante para descargar archivos
      });

      // Crear un link temporal para descargar el PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `comprobante_pedido_${pedidoId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Comprobante descargado!',
        text: 'El comprobante de pago se ha descargado correctamente',
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      console.error('Error descargando comprobante:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo descargar el comprobante. Por favor intenta nuevamente.',
      });
    } finally {
      setDownloadingReceipt(false);
    }
  };

  return (
    <Box className="historial-container">

      {loading && <CircularProgress sx={{ color: '#17bebb' }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && pedidos.length === 0 && (
        <Typography sx={{ textAlign: "center", mt: 4, fontSize: "1.3rem", color: "#444", fontWeight: 500 }}>
          No tienes pedidos registrados aún.
        </Typography>
      )}

      <Grid container spacing={3}>
        {pedidos.map((pedido) => (
          <Grid item xs={12} sm={6} md={4} key={pedido.id}>
            <Card className="pedido-card">
              <CardMedia
                component="img"
                height="150"
                image={pedido.items?.[0]?.producto_imagen || "/placeholder.png"}
                alt="producto"
              />
              <CardContent>
                <Typography className="pedido-id">Pedido {pedido.id}</Typography>
                <Typography className="fecha">
                  {new Date(pedido.fecha).toLocaleDateString()}
                </Typography>
                <Chip label={pedido.estado_nombre} color={getEstadoColor(pedido.estado_nombre)} size="small" />
                <Typography className="total">Total: ${pedido.total}</Typography>

                <Button
                  className="btn-detalles"
                  startIcon={<Visibility />}
                  onClick={() => setSelectedPedido(pedido)}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* MODAL DETALLES */}
      <Dialog open={!!selectedPedido} onClose={() => setSelectedPedido(null)} maxWidth="md" fullWidth>
        {selectedPedido && (
          <>
            <DialogTitle className="modal-title">
              Detalles del Pedido #{selectedPedido.id}
            </DialogTitle>

            <DialogContent className="modal-body">
              {selectedPedido.items.map((item, i) => (
                <Box key={i} className="producto-box">
                  <img src={item.producto_imagen} alt={item.producto_nombre} className="producto-img" />
                  <Box>
                    <Typography className="prod-nombre">{item.producto_nombre}</Typography>
                    <Typography>Cantidad: {item.cantidad}</Typography>
                    <Typography>Subtotal: ${item.subtotal}</Typography>
                  </Box>
                </Box>
              ))}

              <Typography className="total-modal">Total: ${selectedPedido.total}</Typography>
            </DialogContent>

            <DialogActions className="modal-actions">
              <Button variant="outlined" onClick={() => setSelectedPedido(null)}>
                Cerrar
              </Button>

              <Button
                variant="contained"
                startIcon={<Download />}
                sx={{ bgcolor: "#17bebb", color: "#000", '&:hover': { bgcolor: '#0e8f8f' } }}
                onClick={() => descargarComprobante(selectedPedido.id)}
                disabled={downloadingReceipt}
              >
                {downloadingReceipt ? 'Descargando...' : 'Descargar Comprobante'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

    </Box>
  );
};

export default HistorialPedidos;
