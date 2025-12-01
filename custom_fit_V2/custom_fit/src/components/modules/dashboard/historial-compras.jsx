import React, { useEffect, useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Chip,
  CircularProgress, Alert, IconButton
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from "../../modules/authcontext";

const HistorialPedidos = () => {
  const { authToken } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    if(authToken) fetchPedidos();
  }, [authToken]);

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:8000/mis-pedidos/', {
        headers: { Authorization: `Token ${authToken}` }
      });
      setPedidos(res.data);
    } catch (err) {
      setError('Error al cargar sus pedidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3} sx={{ bgcolor: '#000', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ color: 'white', mb: 2 }}>
        Mis Pedidos
      </Typography>

      {loading && <CircularProgress sx={{ color: 'white' }} />}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {!loading && pedidos.length === 0 && (
        <Typography sx={{ color: '#17bebb' }}>
          No tienes pedidos registrados todavía.
        </Typography>
      )}

      {pedidos.length > 0 && (
        <TableContainer component={Paper} sx={{ bgcolor: '#111' }}>
          <Table>
            <TableHead>
              <TableRow>
                {['ID', 'Fecha', 'Total', 'Estado', 'Acciones'].map((col) => (
                  <TableCell key={col} sx={{ color: 'white' }}><b>{col}</b></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidos.map((pedido) => (
                <TableRow key={pedido.id}>
                  <TableCell sx={{ color: 'white' }}>{pedido.id}</TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    {new Date(pedido.fecha).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>${pedido.total}</TableCell>
                  <TableCell sx={{ color: 'white' }}>
                    <Chip
                      label={pedido.estado_nombre || 'Sin Estado'}
                      color={getEstadoColor(pedido.estado_nombre)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton sx={{ color: '#17bebb' }}>
                      <Visibility />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default HistorialPedidos;
