import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, Trash2 } from 'lucide-react';

const CrudProveedorSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);

  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/proveedorsolicitudes/');
      setSolicitudes(response.data);
    } catch (error) {
      console.error('Error al obtener solicitudes:', error);
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const aceptarSolicitud = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/proveedorsolicitudes/${id}/`, {
        estado: 'Aceptado'
      });
      fetchSolicitudes();
    } catch (error) {
      console.error('Error al aceptar solicitud:', error);
    }
  };

  const eliminarSolicitud = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta solicitud?')) {
      try {
        await axios.delete(`http://localhost:8000/api/proveedorsolicitudes/${id}/`);
        fetchSolicitudes();
      } catch (error) {
        console.error('Error al eliminar solicitud:', error);
      }
    }
  };

  return (
    <div>
      <h3>Solicitudes de Proveedores</h3>
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID Solicitud</th>
            <th>NIT/Cédula</th>
            <th>Dirección</th>
            <th>Nombre Empresa</th>
            <th>Descripción Empresa</th>
            <th>Años Experiencia</th>
            <th>ID Usuario</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.length > 0 ? (
            solicitudes.map((solicitud) => (
              <tr key={solicitud.id_solicitud}>
                <td>{solicitud.id_solicitud}</td>
                <td>{solicitud.nit_cedula}</td>
                <td>{solicitud.direccion}</td>
                <td>{solicitud.nombre_empresa}</td>
                <td>{solicitud.descripcion_empresa}</td>
                <td>{solicitud.anios_experiencia}</td>
                <td>{solicitud.id_usuario}</td>
                <td>
                  <span
                    className={`status ${solicitud.estado === 'Aceptado' ? 'accepted' : 'pending'
                      }`}
                  >
                    {solicitud.estado}
                  </span>
                </td>
                <td className="actions-cell">
                  {solicitud.estado !== 'Aceptado' && (
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
            <tr>
              <td colSpan="9">No hay solicitudes registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudProveedorSolicitudes;
