// src/components/CrudProveedorSolicitudes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, Trash2 } from "lucide-react";
import { useAuth } from "../modules/authcontext";

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
        "http://localhost:8000/api/proveedorsolicitudes/",
        {
          headers: {
            Authorization: `Token ${authToken}`, // Cambiado a Token para consistencia
          },
        }
      );
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
    if (!authToken) {
      alert("No autorizado");
      return;
    }
    try {
      await axios.patch(
        `http://localhost:8000/api/proveedorsolicitudes/${id}/`,
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
    if (!authToken) {
      alert("No autorizado");
      return;
    }
    if (window.confirm("¿Estás seguro de eliminar esta solicitud?")) {
      try {
        await axios.delete(
          `http://localhost:8000/api/proveedorsolicitudes/${id}/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        fetchSolicitudes();
      } catch (error) {
        console.error("Error al eliminar solicitud:", error);
        alert("No se pudo eliminar la solicitud.");
      }
    }
  };

  return (
    <div>
      <h3>Solicitudes de Proveedores</h3>
      {loading && <p>Cargando solicitudes...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID Solicitud</th>
            <th>Id Usuario</th>
            <th>Nombre Usuario</th>
            <th>Celular</th>
            <th>NIT/Cédula</th>
            <th>Dirección</th>
            <th>Nombre Empresa</th>
            <th>Descripción Empresa</th>
            <th>Años Experiencia</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => (
              <tr key={solicitud.id_solicitud}>
                <td>{solicitud.id_solicitud}</td>
                <td>{solicitud.usuario?.id || "N/A"}</td>
                <td>{solicitud.usuario?.profile?.nombres || "Sin nombre"}</td>
                <td>{solicitud.usuario?.profile?.celular || "Sin celular"}</td>
                <td>{solicitud.nit_cedula}</td>
                <td>{solicitud.direccion}</td>
                <td>{solicitud.nombre_empresa}</td>
                <td>{solicitud.descripcion_empresa}</td>
                <td>{solicitud.anios_experiencia}</td>
                <td>{solicitud.estado || "Pendiente"}</td>
                <td className="actions-cell">
                  {solicitud.estado !== "Aceptado" && (
                    <button
                      className="icon-btn"
                      onClick={() => aceptarSolicitud(solicitud.id_solicitud)}
                      title="Aceptar solicitud"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn danger"
                    onClick={() => eliminarSolicitud(solicitud.id_solicitud)}
                    title="Eliminar solicitud"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="11">No hay solicitudes registradas.</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudProveedorSolicitudes;
