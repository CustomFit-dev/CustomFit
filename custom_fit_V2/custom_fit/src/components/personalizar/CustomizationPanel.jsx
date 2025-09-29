// Importamos React
import React from 'react';

// Importamos íconos desde la librería lucide-react
import { Type, Image, Smile } from 'lucide-react';

// Importamos un ícono adicional desde Material UI
import Custom from '@mui/icons-material/DashboardCustomize';

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

  // Opciones de tallas disponibles
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  // Opciones de telas disponibles
  const fabricOptions = [
    'Filtrar', 'Algodón', 'Seda', 'Borrego', 
    'Lino', 'Poliéster', 'Lana', 'Piel'
  ];

  return (
    <div className="col-md-3">
      
      {/* Título del panel */}
      <div className="mb-4">
        <h4 className="fw-bold titleCam">Camisa Sencilla</h4>
      </div>
      
      {/* Sección de selección de telas */}
      <div className="contTela mb-4">
        <h5 className="fw-bold mb-3">Telas</h5>
        <div className="contela">
          {fabricOptions.slice(0, 8).map((fabricType) => (
            <button
              key={fabricType} // Identificador único por cada tela
              className={`btnTela ${fabric === fabricType ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setFabric(fabricType)} // Actualiza el estado con la tela seleccionada
              style={fabric === fabricType ? { backgroundColor: '#17BEBB', border: 'none'} : {}}>
              {fabricType}
            </button>
          ))}
        </div>
      </div>
      
      {/* Sección de selección de tallas */}
      <div className="mb-4">
        <h5 className="fw-bold mb-3">Tallas</h5>
        <div className="d-flex flex-wrap gap-2">
          {sizeOptions.map((sizeOption) => (
            <button
              key={sizeOption} // Identificador único por cada talla
              className={`btn ${size === sizeOption ? "btn-primary" : "btn-outline-secondary"}`}
              onClick={() => setSize(sizeOption)} // Actualiza el estado con la talla seleccionada
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

        {/* Botón para abrir modal de emojis */}
        <button 
          className="btnCustom d-flex align-items-center" 
          onClick={() => setShowEmojiModal(true)}>
          <Smile size={20} className="me-2" />
        </button>
      </div>
    </div>
  );
};

// Exportamos el componente para poder usarlo en otras partes de la app
export default CustomizationPanel;
