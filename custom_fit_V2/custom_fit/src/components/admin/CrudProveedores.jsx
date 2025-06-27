import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2, Check } from 'lucide-react';

const CrudProveedores = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    const response = await axios.get('http://localhost:8000/api/proveedores/');
    setProveedores(response.data);
  };

  const aceptarProveedor = async (id) => {
    await axios.patch(`http://localhost:8000/api/proveedores/${id}/`, { aceptado: true });
    fetchProveedores();
  };

  const eliminarProveedor = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este proveedor?')) {
      await axios.delete(`http://localhost:8000/api/proveedores/${id}/`);
      fetchProveedores();
    }
  };

  return (
    <div className="content-area">
      <h3>Gestión de Proveedores</h3>
      <table className="crud-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Local</th>
            <th>Estilo</th>
            <th>Aceptado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.nombre}</td>
              <td>{prov.correo}</td>
              <td>{prov.telefono}</td>
              <td>{prov.tiene_local ? 'Sí' : 'No'}</td>
              <td>{prov.estilo_ropa}</td>
              <td>{prov.aceptado ? '✅' : '⏳'}</td>
              <td className="acciones">
                {!prov.aceptado && (
                  <button
                    className="btn btn-aceptar"
                    onClick={() => aceptarProveedor(prov.id)}
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  className="btn btn-eliminar"
                  onClick={() => eliminarProveedor(prov.id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}|
        </tbody>
      </table>
    </div>
  );
};

export default CrudProveedores;
