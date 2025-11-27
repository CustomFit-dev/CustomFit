import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Alert, Tooltip, Typography,
  FormControl, InputLabel, Select, MenuItem, CircularProgress, Chip
} from '@mui/material';
import { Edit, Visibility, LocalShipping } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from "../modules/authcontext";

const PedidosCrud = () => {
  const [pedidos, setPedidos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [transportadoras, setTransportadoras] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const [formData, setFormData] = useState({ estado: '', transportadora: '', numero_guia: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  const fetchData = async () => {
    if (!authToken) return;
    try {
      setLoading(true);
      const [pedidosRes, estadosRes, transpRes] = await Promise.all([
        axios.get('http://localhost:8000/api/pedidos/', { headers: { Authorization: `Token ${authToken}` } }),
        axios.get('http://localhost:8000/api/estados-pedido/', { headers: { Authorization: `Token ${authToken}` } }),
        axios.get('http://localhost:8000/api/transportadoras/', { headers: { Authorization: `Token ${authToken}` } })
      ]);
      setPedidos(pedidosRes.data);
      setEstados(estadosRes.data);
      setTransportadoras(transpRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (pedido) => {
    setCurrentPedido(pedido);
    setFormData({
      estado: pedido.estado || '',
      transportadora: pedido.transportadora || '',
      numero_guia: pedido.numero_guia || ''
    });
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.patch(`http://localhost:8000/api/pedidos/${currentPedido.id}/`, formData, {
        headers: { Authorization: `Token ${authToken}` }
      });
      alert('Pedido actualizado correctamente');
      setOpenModal(false);
      fetchData();
    } catch (error) {
      console.error('Error updating pedido:', error);
      alert('Error al actualizar el pedido.');
    }
  };

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

  return (
    <Box p={3} sx={{ bgcolor: '#000', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
        Gestión de Pedidos
      </Typography>

      {loading && <Box display="flex" justifyContent="center" py={2}><CircularProgress sx={{ color: 'white' }} /></Box>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} sx={{ borderRadius: 3, bgcolor: '#111', color: 'white' }}>
        <Table>
          <TableHead>
            <TableRow>
              {['ID', 'Usuario', 'Fecha', 'Total', 'Estado', 'Transportadora', 'Guía', 'Acciones'].map((col) => (
                <TableCell key={col} sx={{ color: 'white', borderBottom: '1px solid white' }}><b>{col}</b></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#1a1a1a' }, '&:nth-of-type(even)': { bgcolor: '#111' } }}>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>{pedido.id}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>{pedido.usuario_nombre}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>{new Date(pedido.fecha).toLocaleDateString()}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>${pedido.total}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                  <Chip label={pedido.estado_nombre || 'Sin Estado'} color={getEstadoColor(pedido.estado_nombre)} size="small" />
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>{pedido.transportadora_nombre || '-'}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>{pedido.numero_guia || '-'}</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #444' }}>
                  <Tooltip title="Gestionar Pedido">
                    <IconButton onClick={() => handleOpenModal(pedido)} sx={{ color: '#17bebb' }}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ bgcolor: '#111', color: 'white' }}>Gestionar Pedido #{currentPedido?.id}</DialogTitle>
        <DialogContent sx={{ bgcolor: '#000', pt: 3 }}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' } } }}>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={formData.estado}
                  label="Estado"
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
                >
                  {estados.map((est) => (
                    <MenuItem key={est.id} value={est.id}>{est.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' } } }}>
                <InputLabel>Transportadora</InputLabel>
                <Select
                  value={formData.transportadora}
                  label="Transportadora"
                  onChange={(e) => setFormData({ ...formData, transportadora: e.target.value })}
                  sx={{ color: 'white', '& .MuiSelect-icon': { color: 'white' } }}
                >
                  <MenuItem value=""><em>Ninguna</em></MenuItem>
                  {transportadoras.map((trans) => (
                    <MenuItem key={trans.id} value={trans.id}>{trans.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número de Guía"
                value={formData.numero_guia}
                onChange={(e) => setFormData({ ...formData, numero_guia: e.target.value })}
                fullWidth
                variant="outlined"
                sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white', '& fieldset': { borderColor: 'white' } } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#000', borderTop: '1px solid white', p: 2 }}>
          <Button onClick={() => setOpenModal(false)} sx={{ color: 'white', borderColor: 'white' }} variant="outlined">Cancelar</Button>
          <Button onClick={handleSave} sx={{ bgcolor: '#17bebb', color: 'black', '&:hover': { bgcolor: '#00a99d' } }} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PedidosCrud;
