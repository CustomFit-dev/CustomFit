import React, { useEffect, useState } from 'react';
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Alert, Tooltip, Typography,
  FormControl, InputLabel, Select, MenuItem, CircularProgress, Chip,
  Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar, Collapse
} from '@mui/material';
import { Edit, Visibility, LocalShipping, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from "../modules/authcontext";

const PedidosCrud = () => {
  const [pedidos, setPedidos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [transportadoras, setTransportadoras] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const [expandedItems, setExpandedItems] = useState({}); // State for collapsible items
  const [selectedImage, setSelectedImage] = useState(null); // State for image zoom
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

  const handleOpenDetailsModal = (pedido) => {
    setCurrentPedido(pedido);
    setOpenDetailsModal(true);
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

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDownloadAll = (estampados) => {
    estampados.forEach((est) => {
      const link = document.createElement('a');
      link.href = est.ImgEstampado;
      link.download = est.NombreEstampado || 'estampado';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
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
                  <Chip label={pedido.estado_nombre || 'Sin Estado'} color={getEstadoColor(pedido.estado_nombre)} size="small" sx={{ color: 'white' }} />
                </TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>{pedido.transportadora_nombre || '-'}</TableCell>
                <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>{pedido.numero_guia || '-'}</TableCell>
                <TableCell sx={{ borderBottom: '1px solid #444' }}>
                  <Tooltip title="Gestionar Pedido">
                    <IconButton onClick={() => handleOpenModal(pedido)} sx={{ color: '#17bebb' }}>
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Ver Detalles">
                    <IconButton onClick={() => handleOpenDetailsModal(pedido)} sx={{ color: '#fff' }}>
                      <Visibility />
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

      {/* Modal de Detalles del Pedido */}
      <Dialog open={openDetailsModal} onClose={() => setOpenDetailsModal(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: '#111', color: 'white' }}>
          Detalles del Pedido #{currentPedido?.id}
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#000', color: 'white', pt: 3 }}>
          {currentPedido && (
            <Grid container spacing={3}>
              {/* Información del Cliente */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="#17bebb" gutterBottom>Información del Cliente</Typography>
                <Typography><b>Nombre:</b> {currentPedido.usuario_nombre}</Typography>
                <Typography><b>Email:</b> {currentPedido.usuario_email || 'N/A'}</Typography>
                <Typography><b>Teléfono:</b> {currentPedido.usuario_telefono || 'N/A'}</Typography>
                <Typography><b>Dirección:</b> {currentPedido.direccion}</Typography>
                <Typography><b>Ciudad:</b> {currentPedido.ciudad}</Typography>
              </Grid>

              {/* Información del Pedido */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" color="#17bebb" gutterBottom>Información del Pedido</Typography>
                <Typography><b>Fecha:</b> {new Date(currentPedido.fecha).toLocaleString()}</Typography>
                <Typography><b>Estado:</b> <Chip label={currentPedido.estado_nombre} color={getEstadoColor(currentPedido.estado_nombre)} size="small" /></Typography>
                <Typography><b>Método de Pago:</b> {currentPedido.metodo_pago}</Typography>
                <Typography><b>Transportadora:</b> {currentPedido.transportadora_nombre || 'No asignada'}</Typography>
                <Typography><b>Guía:</b> {currentPedido.numero_guia || 'No asignada'}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ bgcolor: 'gray', my: 2 }} />
                <Typography variant="h6" color="#17bebb" gutterBottom>Productos</Typography>
                <List>
                  {currentPedido.items && currentPedido.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start" sx={{ bgcolor: '#1a1a1a', mb: 1, borderRadius: 1, flexDirection: 'column' }}>
                        <Box display="flex" width="100%" alignItems="center">
                          <ListItemAvatar>
                            <Avatar
                              variant="rounded"
                              src={item.producto_imagen || '/placeholder.png'}
                              alt={item.producto_nombre}
                              sx={{ width: 80, height: 80, mr: 2, cursor: 'pointer' }}
                              onClick={() => setSelectedImage(item.producto_imagen)}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color="white" fontWeight="bold">
                                {item.producto_nombre}
                              </Typography>
                            }
                            secondary={
                              <React.Fragment>
                                <Typography component="span" variant="body2" color="#ccc">
                                  Cantidad: {item.cantidad}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2" color="#ccc">
                                  Precio Unitario: ${parseFloat(item.precio).toLocaleString()}
                                </Typography>
                                <br />
                                <Typography component="span" variant="body2" color="#17bebb" fontWeight="bold">
                                  Subtotal: ${parseFloat(item.subtotal).toLocaleString()}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                          {item.producto_personalizado_detail && (
                            <IconButton onClick={() => toggleExpand(index)} sx={{ color: 'white' }}>
                              {expandedItems[index] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                          )}
                        </Box>

                        {/* Vistas del Producto Personalizado */}
                        {item.producto_personalizado_detail && (
                          <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit sx={{ width: '100%' }}>
                            <Box sx={{ mt: 2, width: '100%', pl: 2, borderLeft: '2px solid #17bebb' }}>
                              <Typography variant="body2" color="#ccc" gutterBottom>
                                <b>Tela:</b> {item.producto_personalizado_detail.tela_nombre || 'N/A'} | <b>Talla:</b> {item.producto_personalizado_detail.talla || 'N/A'}
                              </Typography>

                              <Typography variant="subtitle2" color="#17bebb" gutterBottom sx={{ mt: 1 }}>Vistas del Diseño:</Typography>
                              <Grid container spacing={1}>
                                {[
                                  { label: 'Frontal', url: item.producto_personalizado_detail.urlFrontal },
                                  { label: 'Espalda', url: item.producto_personalizado_detail.urlEspaldar },
                                  { label: 'Manga Der.', url: item.producto_personalizado_detail.urlMangaDerecha },
                                  { label: 'Manga Izq.', url: item.producto_personalizado_detail.urlMangaIzquierda }
                                ].map((view, i) => (
                                  view.url && (
                                    <Grid item xs={3} key={i}>
                                      <Box sx={{ textAlign: 'center' }}>
                                        <img
                                          src={view.url}
                                          alt={view.label}
                                          style={{ width: '100%', borderRadius: 4, border: '1px solid #333', cursor: 'pointer' }}
                                          onClick={() => setSelectedImage(view.url)}
                                        />
                                        <Typography variant="caption" color="#ccc">{view.label}</Typography>
                                      </Box>
                                    </Grid>
                                  )
                                ))}
                              </Grid>

                              {/* Descarga de Estampados */}
                              {item.producto_personalizado_detail.estampados && item.producto_personalizado_detail.estampados.length > 0 && (
                                <Box sx={{ mt: 2 }}>
                                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                                    <Typography variant="subtitle2" color="#17bebb">Estampados Originales:</Typography>
                                    <Button
                                      variant="contained"
                                      size="small"
                                      onClick={() => handleDownloadAll(item.producto_personalizado_detail.estampados)}
                                      sx={{ bgcolor: '#17bebb', color: 'black', textTransform: 'none', '&:hover': { bgcolor: '#00a99d' } }}
                                    >
                                      Descargar Todos
                                    </Button>
                                  </Box>
                                  <Grid container spacing={1}>
                                    {item.producto_personalizado_detail.estampados.map((estampado, i) => (
                                      <Grid item xs={12} sm={6} md={4} key={i}>
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          href={estampado.ImgEstampado}
                                          target="_blank"
                                          download
                                          sx={{ color: 'white', borderColor: '#555', textTransform: 'none', width: '100%' }}
                                        >
                                          Descargar Estampado {i + 1}
                                        </Button>
                                      </Grid>
                                    ))}
                                  </Grid>
                                </Box>
                              )}
                            </Box>
                          </Collapse>
                        )}
                      </ListItem>
                      <Divider variant="inset" component="li" sx={{ bgcolor: '#333' }} />
                    </React.Fragment>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Typography variant="h5" color="white" fontWeight="bold">
                    Total: ${parseFloat(currentPedido.total).toLocaleString()}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#000', borderTop: '1px solid white', p: 2 }}>
          <Button onClick={() => setOpenDetailsModal(false)} sx={{ color: 'white', borderColor: 'white' }} variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Zoom Dialog */}
      <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} maxWidth="lg" fullWidth>
        <DialogContent sx={{ bgcolor: '#000', p: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Zoom"
              style={{ width: '100%', height: 'auto', maxHeight: '80vh', objectFit: 'contain' }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ bgcolor: '#000', borderTop: '1px solid white', p: 2 }}>
          <Button onClick={() => setSelectedImage(null)} sx={{ color: 'white', borderColor: 'white' }} variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PedidosCrud;
