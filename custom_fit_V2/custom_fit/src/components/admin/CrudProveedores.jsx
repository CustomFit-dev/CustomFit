import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CrudProveedores = () => {
  const [proveedores, setProveedores] = useState([]);

  const fetchProveedores = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const aceptarProveedor = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/api/proveedores/${id}/`, { aceptado: true });
      fetchProveedores();
    } catch (error) {
      console.error('Error al aceptar proveedor:', error);
    }
  };

  const eliminarProveedor = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este proveedor?')) {
      try {
        await axios.delete(`http://localhost:8000/api/proveedores/${id}/`);
        fetchProveedores();
      } catch (error) {
        console.error('Error al eliminar proveedor:', error);
      }
    }
  };

  return (
    <div>
      <h3>Lista de Proveedores</h3>
      <table className="crud-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Local</th>
            <th>Dirección</th>
            <th>Estilo Ropa</th>
            <th>Mensaje</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.length > 0 ? (
            proveedores.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.correo}</td>
                <td>{proveedor.telefono}</td>
                <td>{proveedor.tiene_local ? 'Sí' : 'No'}</td>
                <td>{proveedor.direccion_local}</td>
                <td>{proveedor.estilo_ropa}</td>
                <td>{proveedor.mensaje}</td>
                <td>
                  {proveedor.aceptado ? (
                    <span className="status accepted">Aceptado</span>
                  ) : (
                    <span className="status pending">Pendiente</span>
                  )}
                </td>
                <td>
                  {!proveedor.aceptado && (
                    <button
                      className="btn-accept"
                      onClick={() => aceptarProveedor(proveedor.id)}
                    >
                      Aceptar
                    </button>
                  )}
                  <button
                    className="btn-delete"
                    onClick={() => eliminarProveedor(proveedor.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No hay proveedores registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CrudProveedores;
