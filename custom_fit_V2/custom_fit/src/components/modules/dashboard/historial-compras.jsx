import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Chip, CircularProgress, Alert,
  Card, CardContent, CardMedia, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from "../../modules/authcontext";
import "../../../scss/historialp.scss";

const HistorialPedidos = () => {
  const { authToken } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPedido, setSelectedPedido] = useState(null);

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

  return (
    <Box className="historial-container">

      {loading && <CircularProgress sx={{ color: '#17bebb' }} />}
      {error && <Alert severity="error">{error}</Alert>}

      {/* MENSAJE CUANDO NO HAY PEDIDOS */}
      {!loading && !error && pedidos.length === 0 && (
        <Typography
          sx={{
            textAlign: "center",
            mt: 4,
            fontSize: "1.3rem",
            color: "#444",
            fontWeight: 500
          }}
        >
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
                <Chip
                  label={pedido.estado_nombre}
                  color={getEstadoColor(pedido.estado_nombre)}
                  size="small"
                />
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

      {/* MODAL DE DETALLES */}
      <Dialog
        open={!!selectedPedido}
        onClose={() => setSelectedPedido(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedPedido && (
          <>
            <DialogTitle className="modal-title">
              Detalles del Pedido #{selectedPedido.id}
            </DialogTitle>

            <DialogContent className="modal-body">
              {selectedPedido.items.map((item, i) => (
                <Box key={i} className="producto-box">
                  <img
                    src={item.producto_imagen}
                    alt={item.producto_nombre}
                    className="producto-img"
                  />
                  <Box>
                    <Typography className="prod-nombre">{item.producto_nombre}</Typography>
                    <Typography>Cantidad: {item.cantidad}</Typography>
                    <Typography>Subtotal: ${item.subtotal}</Typography>
                  </Box>
                </Box>
              ))}

              <Typography className="total-modal">
                Total: ${selectedPedido.total}
              </Typography>
            </DialogContent>

            <DialogActions className="modal-actions">
              <Button
                variant="outlined"
                onClick={() => setSelectedPedido(null)}
              >
                Cerrar
              </Button>
              <Button variant="contained" sx={{ bgcolor: "#17bebb", color: "#000" }}>
                Descargar Factura PDF
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default HistorialPedidos;
