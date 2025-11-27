import React, { useEffect, useState } from 'react';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Grid, IconButton, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Snackbar, Alert, Tooltip, Typography,
    useMediaQuery, Fab, CircularProgress
} from '@mui/material';
import { Add, Edit, Delete, Save, LocalShipping } from '@mui/icons-material';
import axios from 'axios';
import { useAuth } from "../modules/authcontext";

const CrudTransportadoras = () => {
    const [transportadoras, setTransportadoras] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentTransportadora, setCurrentTransportadora] = useState(null);
    const [formData, setFormData] = useState({ nombre: '', pagina_rastreo: '', telefono: '', direccion: '', ciudad: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authToken } = useAuth();
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        if (authToken) {
            fetchTransportadoras();
        }
    }, [authToken]);

    const fetchTransportadoras = async () => {
        if (!authToken) {
            setError("No hay token de autorización disponible");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:8000/api/transportadoras/', {
                headers: { Authorization: `Token ${authToken}` }
            });
            setTransportadoras(response.data);
        } catch (error) {
            console.error('Error al obtener transportadoras:', error);
            setError('Error al obtener transportadoras');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (transportadora = null) => {
        if (transportadora) {
            setEditMode(true);
            setCurrentTransportadora(transportadora);
            setFormData({ ...transportadora });
        } else {
            setEditMode(false);
            setCurrentTransportadora(null);
            setFormData({ nombre: '', pagina_rastreo: '', telefono: '', direccion: '', ciudad: '' });
        }
        setOpenModal(true);
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await axios.put(`http://localhost:8000/api/transportadoras/${currentTransportadora.id}/`, formData, {
                    headers: { Authorization: `Token ${authToken}` }
                });
                alert('Transportadora actualizada correctamente');
            } else {
                await axios.post('http://localhost:8000/api/transportadoras/', formData, {
                    headers: { Authorization: `Token ${authToken}` }
                });
                alert('Transportadora creada correctamente');
            }
            setOpenModal(false);
            fetchTransportadoras();
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('No se pudo guardar la transportadora.');
        }
    };

    const handleDelete = async (transportadora) => {
        if (window.confirm(`¿Estás seguro de eliminar la transportadora "${transportadora.nombre}"?`)) {
            try {
                await axios.delete(`http://localhost:8000/api/transportadoras/${transportadora.id}/`, {
                    headers: { Authorization: `Token ${authToken}` }
                });
                alert('Transportadora eliminada correctamente');
                fetchTransportadoras();
            } catch (error) {
                console.error('Error al eliminar:', error);
                alert('No se pudo eliminar la transportadora.');
            }
        }
    };

    return (
        <Box p={3} sx={{ bgcolor: '#000', minHeight: '100vh' }}>
            <Typography
                variant="h5"
                fontWeight="bold"
                gutterBottom
                sx={{ color: 'white' }}
            >
                Gestión de Transportadoras
            </Typography>

            {loading && (
                <Box display="flex" justifyContent="center" py={2}>
                    <CircularProgress sx={{ color: 'white' }} />
                </Box>
            )}

            {error && (
                <Alert severity="error" sx={{ mb: 2, bgcolor: '#222', color: 'white' }}>
                    {error}
                </Alert>
            )}

            {!isMobile && (
                <Box mb={2}>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => handleOpenModal()}
                        sx={{
                            bgcolor: '#17bebb',
                            color: 'black',
                            '&:hover': { bgcolor: '#00a99d' }
                        }}
                    >
                        Agregar Transportadora
                    </Button>
                </Box>
            )}

            <TableContainer
                component={Paper}
                sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    bgcolor: '#111',
                    color: 'white',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Nombre', 'Página Rastreo', 'Teléfono', 'Dirección', 'Ciudad', 'Acciones'].map((col) => (
                                <TableCell
                                    key={col}
                                    sx={{ color: 'white', borderBottom: '1px solid white' }}
                                >
                                    <b>{col}</b>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transportadoras.length > 0 ? (
                            transportadoras.map((transportadora) => (
                                <TableRow
                                    key={transportadora.id}
                                    sx={{
                                        '&:nth-of-type(odd)': { bgcolor: '#1a1a1a' },
                                        '&:nth-of-type(even)': { bgcolor: '#111' },
                                    }}
                                >
                                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                                        <b>{transportadora.nombre}</b>
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                                        {transportadora.pagina_rastreo}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                                        {transportadora.telefono}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                                        {transportadora.direccion}
                                    </TableCell>
                                    <TableCell sx={{ color: 'white', borderBottom: '1px solid #444' }}>
                                        {transportadora.ciudad}
                                    </TableCell>
                                    <TableCell
                                        align="center"
                                        sx={{ borderBottom: '1px solid #444' }}
                                    >
                                        <Tooltip title="Editar">
                                            <IconButton
                                                onClick={() => handleOpenModal(transportadora)}
                                                sx={{ color: '#17bebb' }}
                                            >
                                                <Edit size={18} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar">
                                            <IconButton
                                                onClick={() => handleDelete(transportadora)}
                                                sx={{ color: 'red' }}
                                            >
                                                <Delete size={18} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            !loading && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ color: 'white' }}>
                                        No hay transportadoras registradas.
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {isMobile && (
                <Fab
                    color="primary"
                    onClick={() => handleOpenModal()}
                    sx={{
                        position: 'fixed',
                        bottom: 20,
                        right: 20,
                        bgcolor: '#17bebb',
                        '&:hover': { bgcolor: '#00a99d' }
                    }}
                >
                    <Add />
                </Fab>
            )}

            <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{
                    bgcolor: '#111',
                    color: 'white',
                    borderBottom: '1px solid white'
                }}>
                    <Typography variant="h6">
                        {editMode ? 'Editar Transportadora' : 'Agregar Nueva Transportadora'}
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ bgcolor: '#000', pt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="nombre"
                                label="Nombre"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                fullWidth
                                variant="outlined"
                                required
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: '#17bebb' },
                                        '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="pagina_rastreo"
                                label="Página de Rastreo"
                                value={formData.pagina_rastreo}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: '#17bebb' },
                                        '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="telefono"
                                label="Teléfono"
                                value={formData.telefono}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: '#17bebb' },
                                        '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="ciudad"
                                label="Ciudad"
                                value={formData.ciudad}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: '#17bebb' },
                                        '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="direccion"
                                label="Dirección"
                                value={formData.direccion}
                                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiInputLabel-root': { color: 'white' },
                                    '& .MuiOutlinedInput-root': {
                                        color: 'white',
                                        '& fieldset': { borderColor: 'white' },
                                        '&:hover fieldset': { borderColor: '#17bebb' },
                                        '&.Mui-focused fieldset': { borderColor: '#17bebb' }
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ bgcolor: '#000', borderTop: '1px solid white', p: 2 }}>
                    <Button
                        onClick={() => setOpenModal(false)}
                        variant="outlined"
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            '&:hover': { borderColor: '#17bebb', color: '#17bebb' }
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        variant="contained"
                        startIcon={<Save />}
                        sx={{
                            bgcolor: '#17bebb',
                            color: 'black',
                            '&:hover': { bgcolor: '#00a99d' }
                        }}
                    >
                        {editMode ? 'Actualizar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CrudTransportadoras;
