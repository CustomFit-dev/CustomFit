// src/components/CrudProveedorSolicitudes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, Trash2 } from "lucide-react";
import { useAuth } from "../modules/authcontext";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";

const CrudProveedorSolicitudes = () => {
  const { authToken } = useAuth();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSolicitudes = async () => {
    if (!authToken) {
      setError("No hay token de autorización disponible");
      return;
    }
    try {
      setLoading(true);
      setError(null);

  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}proveedorsolicitudes/`,
    {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    }
  );

console.log('Solicitudes de proveedor obtenidas:', response.data);

      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
      if (error.response) {
        setError(`Error ${error.response.status}: ${error.response.statusText}`);
      } else {
        setError("Error al obtener solicitudes");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchSolicitudes();
    }
  }, [authToken]);

  const aceptarSolicitud = async (id) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}proveedorsolicitudes/${id}/`;
      console.log('Aceptando solicitud en:', url);

      await axios.patch(
        url,
        { estado: "Aceptado" },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      fetchSolicitudes();
    } catch (error) {
      console.error("Error al aceptar solicitud:", error);
      alert("No se pudo aceptar la solicitud.");
    }
  };


  const eliminarSolicitud = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta solicitud?")) {
      try {
        const url = `${process.env.REACT_APP_API_URL}proveedorsolicitudes/${id}/`;
        console.log('Eliminando solicitud en:', url);

        await axios.delete(url, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        });

        fetchSolicitudes();
      } catch (error) {
        console.error("Error al eliminar solicitud:", error);
        alert("No se pudo eliminar la solicitud.");
      }
    }
  };


  return (
    <Box p={3} sx={{ bgcolor: "#000", minHeight: "100vh" }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: "white" }}
      >
        Solicitudes de Proveedores
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" py={2}>
          <CircularProgress sx={{ color: "white" }} />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, bgcolor: "#222", color: "white" }}>
          {error}
        </Alert>
      )}

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          bgcolor: "#111",
          color: "white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "ID Solicitud",
                "Id Usuario",
                "Nombre Usuario",
                "Celular",
                "NIT/Cédula",
                "Dirección",
                "Nombre Empresa",
                "Descripción Empresa",
                "Años Experiencia",
                "Estado",
                "Acciones",
              ].map((col) => (
                <TableCell
                  key={col}
                  sx={{ color: "white", borderBottom: "1px solid white" }}
                >
                  <b>{col}</b>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {solicitudes.length > 0 ? (
              solicitudes.map((solicitud) => (
                <TableRow
                  key={solicitud.id_solicitud}
                  sx={{
                    "&:nth-of-type(odd)": { bgcolor: "#1a1a1a" },
                    "&:nth-of-type(even)": { bgcolor: "#111" },
                  }}
                >
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.id_solicitud}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.usuario?.id || "N/A"}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.usuario?.profile?.nombres || "Sin nombre"}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.usuario?.profile?.celular || "Sin celular"}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.nit_cedula}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.direccion}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.nombre_empresa}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.descripcion_empresa}
                  </TableCell>
                  <TableCell sx={{ color: "white", borderBottom: "1px solid #444" }}>
                    {solicitud.anios_experiencia}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "1px solid #444" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color:
                          solicitud.estado === "Aceptado" ? "lime" : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {solicitud.estado || "Pendiente"}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderBottom: "1px solid #444" }}
                  >
                    {solicitud.estado !== "Aceptado" && (
                      <IconButton
                        onClick={() => aceptarSolicitud(solicitud.id_solicitud)}
                        title="Aceptar solicitud"
                        sx={{ color: "lime" }}
                      >
                        <Check size={18} />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => eliminarSolicitud(solicitud.id_solicitud)}
                      title="Eliminar solicitud"
                      sx={{ color: "red" }}
                    >
                      <Trash2 size={18} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              !loading && (
                <TableRow>
                  <TableCell colSpan={11} align="center" sx={{ color: "white" }}>
                    No hay solicitudes registradas.
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CrudProveedorSolicitudes;
