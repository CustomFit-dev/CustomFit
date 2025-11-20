// Importamos React y hooks necesarios
import React, { useState, useEffect } from 'react';

// Importamos íconos desde la librería lucide-react
import { Type, Image, Lock } from 'lucide-react';

// Importamos un ícono adicional desde Material UI
import Custom from '@mui/icons-material/DashboardCustomize';

// Importamos el hook de autenticación
import { useAuth } from "../modules/authcontext";
import axios from 'axios';

// Componente principal de personalización
const CustomizationPanel = ({
  fabric,                // Estado actual de la tela seleccionada
  setFabric,             // Función para actualizar la tela
  size,                  // Estado actual de la talla seleccionada
  setSize,               // Función para actualizar la talla
  setShowTextModal,      // Función para abrir el modal de texto
  setShowCustomModal,    // Función para abrir el modal de personalización avanzada
  setShowImageModal,     // Función para abrir el modal de imágenes
  setShowEmojiModal      // Función para abrir el modal de emojis
}) => {

  const { authToken } = useAuth();
  
  // Estado para almacenar las telas obtenidas de la BD
  const [telas, setTelas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Opciones de tallas disponibles
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  // useEffect para cargar las telas al montar el componente
  useEffect(() => {
    fetchTelas();
  }, []);

  const fetchTelas = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/telas/', {
        headers: { Authorization: `Token ${authToken}` }
      });
      setTelas(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar las telas:', error);
      setLoading(false);
      // En caso de error, mantener array vacío
      setTelas([]);
    }
  };

  // Función para manejar la selección de tela
  const handleTelaClick = (tela) => {
    // Solo permitir selección si está disponible
    if (tela.Disponibilidad?.toLowerCase() === 'si') {
      setFabric(tela.NombreTela);
    }
  };

  // Mapeo de colores Bootstrap a colores hexadecimales
  const colorHex = {
    'bg-danger': '#d32f2f',
    'bg-primary': '#1976d2',
    'bg-success': '#2e7d32',
    'bg-white': '#ffffff',
    'bg-dark': '#000000',
    'bg-warning': '#fbc02d',
    'bg-secondary': '#9e9e9e',
    'bg-brown': '#795548',
    'bg-lila': '#c27ba0',
    'bg-beige': '#e6d7c5',
    'bg-turquoise': '#17bebb',
    'bg-fuchsia': '#c2185b',
  };

  return (
    <div className="col-md-3">
      
      {/* Título del panel */}
      <div className="mb-4">
        <h4 className="fw-bold titleCam">Camisa Sencilla</h4>
      </div>
      
      {/* Sección de selección de telas */}
      <div className="contTela mb-4">
        <h5 className="fw-bold mb-3">Telas</h5>
        
        {/* Mostrar mensaje de carga */}
        {loading && (
          <p className="text-muted">Cargando telas...</p>
        )}
        
        {/* Mostrar mensaje si no hay telas */}
        {!loading && telas.length === 0 && (
          <p className="text-muted">No hay telas disponibles</p>
        )}
        
        <div className="contela">
          {/* Botón Filtrar siempre presente */}
          <button
            className={`btnTela ${fabric === 'Filtrar' ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setFabric('Filtrar')}
            style={fabric === 'Filtrar' ? { backgroundColor: '#17BEBB', border: 'none'} : {}}>
            Filtrar
          </button>

          {/* Mapear las telas de la base de datos */}
          {telas.map((tela) => {
            const disponible = tela.Disponibilidad?.toLowerCase() === 'si';
            const color = tela.Color || tela.color;
            const backgroundColor = colorHex[color] || '#ffffff';
            
            return (
              <button
                key={tela.idTela}
                className={`btnTela ${fabric === tela.NombreTela ? "btn-primary" : "btn-outline-secondary"} ${!disponible ? 'disabled' : ''}`}
                onClick={() => handleTelaClick(tela)}
                disabled={!disponible}
                style={{
                  ...(fabric === tela.NombreTela ? { backgroundColor: '#17BEBB', border: 'none' } : {}),
                  position: 'relative',
                  opacity: disponible ? 1 : 0.5,
                  cursor: disponible ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px'
                }}
                title={disponible ? tela.NombreTela : `${tela.NombreTela} - No disponible`}>
                
                {/* Muestra un pequeño indicador de color si existe */}
                {color && (
                  <span 
                    style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      backgroundColor: backgroundColor,
                      border: '1px solid #ccc',
                      borderRadius: '50%',
                      marginRight: '4px'
                    }}
                  />
                )}
                
                {tela.NombreTela}
                
                {/* Icono de candado si no está disponible */}
                {!disponible && (
                  <Lock size={14} style={{ marginLeft: '4px' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Sección de selección de tallas */}
      <div className="mb-4">
        <h5 className="fw-bold mb-3">Tallas</h5>
        <div className="d-flex flex-wrap gap-2">
          {sizeOptions.map((sizeOption) => (
            <button
              key={sizeOption}
              className={`btn ${size === sizeOption ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setSize(sizeOption)}
              style={size === sizeOption ? { backgroundColor: '#17BEBB', border: 'none' } : {}}>
              {sizeOption}
            </button>
          ))}
        </div>
      </div>
      
      {/* Sección de personalización */}
      <h5 className="fw-bold mb-2">Personalización</h5>
      <div className="ContaSubur d-flex gap-3">
        
        {/* Botón para abrir modal de texto */}
        <button 
          className="btnCustom d-flex align-items-center" 
          onClick={() => setShowTextModal(true)}>
          <Type size={20} className="me-2" />
        </button>

        {/* Botón para abrir modal de personalización avanzada */}
        <button 
          className="btnCustom d-flex align-items-center" 
          onClick={() => setShowCustomModal(true)}>
          <Custom size={20} className="me-2" />
        </button>

        {/* Botón para abrir modal de imágenes */}
        <button 
          className="btnCustom d-flex align-items-center" 
          onClick={() => setShowImageModal(true)}>
          <Image size={20} className="me-2" />
        </button>
      </div>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otras partes de la app
export default CustomizationPanel;