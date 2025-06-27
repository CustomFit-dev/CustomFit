import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- importamos esto
import '../../scss/ProveedorForm.scss';

const ProveedorForm = () => {
  const navigate = useNavigate(); // <-- hook de navegación
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tieneLocal, setTieneLocal] = useState('');
  const [direccionLocal, setDireccionLocal] = useState('');
  const [estiloRopa, setEstiloRopa] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProveedor = {
      nombre,
      correo,
      telefono,
      tiene_local: tieneLocal === 'sí',
      direccion_local: tieneLocal === 'sí' ? direccionLocal : '',
      estilo_ropa: estiloRopa,
      mensaje
    };

    try {
      const response = await axios.post('http://localhost:8000/api/proveedores/', nuevoProveedor);
      console.log('Proveedor guardado:', response.data);
      alert('¡Solicitud enviada con éxito!');
      // Limpiar formulario
      setNombre('');
      setCorreo('');
      setTelefono('');
      setTieneLocal('');
      setDireccionLocal('');
      setEstiloRopa('');
      setMensaje('');
      navigate('/'); // redirige a inicio después de enviar
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Ocurrió un error al enviar la solicitud.');
    }
  };

  return (
    <div className="proveedor-container">
      <div className="form-wrapper">
        <button
          className="exit-x"
          onClick={() => navigate('/')}
        >
          ✖
        </button>

        <h1 className="form-title">Formulario de Proveedor</h1>
        <p className="form-description">
          Completa la información y nos pondremos en contacto contigo lo antes posible.
        </p>

        <form className="proveedor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre completo</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Correo electrónico</label>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Teléfono de contacto</label>
            <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>¿Tienes un local físico?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="tieneLocal"
                  value="sí"
                  checked={tieneLocal === 'sí'}
                  onChange={() => setTieneLocal('sí')}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="tieneLocal"
                  value="no"
                  checked={tieneLocal === 'no'}
                  onChange={() => setTieneLocal('no')}
                />
                No
              </label>
            </div>
          </div>

          {tieneLocal === 'sí' && (
            <div className="form-group">
              <label>Dirección del local</label>
              <input
                type="text"
                value={direccionLocal}
                onChange={(e) => setDireccionLocal(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Describe tu estilo de ropa</label>
            <textarea
              rows="3"
              value={estiloRopa}
              onChange={(e) => setEstiloRopa(e.target.value)}
              placeholder="Ej: Urbana, deportiva, casual, etc."
              required
            />
          </div>

          <div className="form-group">
            <label>Mensaje o propuesta adicional</label>
            <textarea
              rows="4"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-button">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProveedorForm;
