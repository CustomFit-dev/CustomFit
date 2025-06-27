import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/ProveedorForm.scss';

const ProveedorForm = ({ onProveedorCreado }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tieneLocal, setTieneLocal] = useState('');
  const [direccionLocal, setDireccionLocal] = useState('');
  const [estiloRopa, setEstiloRopa] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [aceptado] = useState(false);

  const limpiarFormulario = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setTieneLocal('');
    setDireccionLocal('');
    setEstiloRopa('');
    setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProveedor = {
      nombre,
      correo,
      telefono,
      tiene_local: tieneLocal === 'sí',
      direccion_local: tieneLocal === 'sí' ? direccionLocal : '',
      estilo_ropa: estiloRopa,
      mensaje,
      aceptado
    };

    try {
      await axios.post('http://localhost:8000/api/proveedores/', nuevoProveedor);
      alert('Proveedor creado con éxito');
      limpiarFormulario();
      if (onProveedorCreado) onProveedorCreado();
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Ocurrió un error al enviar la solicitud.');
    }
  };

  return (
    <div className="proveedor-container">
      <div className="form-wrapper">
        <h1 className="form-title">Nuevo Proveedor</h1>

        <form className="proveedor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Correo</label>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Teléfono</label>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>¿Tiene local físico?</label>
            <div className="radio-group">
              <label>
                <input type="radio" value="sí" checked={tieneLocal === 'sí'} onChange={() => setTieneLocal('sí')} />
                Sí
              </label>
              <label>
                <input type="radio" value="no" checked={tieneLocal === 'no'} onChange={() => setTieneLocal('no')} />
                No
              </label>
            </div>
          </div>

          {tieneLocal === 'sí' && (
            <div className="form-group">
              <label>Dirección del local</label>
              <input type="text" value={direccionLocal} onChange={(e) => setDireccionLocal(e.target.value)} required />
            </div>
          )}

          <div className="form-group">
            <label>Estilo de Ropa</label>
            <input type="text" value={estiloRopa} onChange={(e) => setEstiloRopa(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Mensaje adicional</label>
            <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
          </div>

          <div className="form-buttons">
            <button type="submit" className="submit-button">Aceptar</button>
            <button type="button" onClick={limpiarFormulario} className="delete-button">Eliminar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProveedorForm;
