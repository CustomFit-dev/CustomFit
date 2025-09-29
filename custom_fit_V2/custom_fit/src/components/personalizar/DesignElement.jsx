// Importamos React
import React from 'react';

// Importamos íconos desde lucide-react
import { X, Move, Maximize } from 'lucide-react';

// Componente DesignElement
// Representa un elemento dentro del área de diseño (texto, imagen o emoji)
// Se puede mover, redimensionar o eliminar.
const DesignElement = ({ 
  element,          // Objeto con las propiedades del elemento (posición, tamaño, estilo, etc.)
  type,             // Tipo de elemento: 'text', 'image', 'emoji'
  activeElement,    // Elemento actualmente seleccionado/activo
  isDragging,       // Booleano: indica si el elemento se está arrastrando
  handleMouseDown,  // Función para manejar eventos de arrastre o redimensionado
  removeElement     // Función para eliminar un elemento
}) => {

  // Renderiza el contenido según el tipo de elemento
  const renderElement = () => {
    switch (type) {
      case 'text':
        return (
          <div
            // Permite mover el texto al hacer clic y arrastrar
            onMouseDown={(e) => handleMouseDown(e, 'text', element, 'move')}
            style={{
              fontFamily: element.font,          // Fuente del texto
              fontSize: `${element.size}px`,     // Tamaño del texto
              color: element.color,              // Color del texto
            }}>
            {element.text} {/* Contenido del texto */}
          </div>
        );

      case 'image':
        return (
          <img 
            id={`img-${element.id}`}             // ID único para la imagen
            src={element.src}                    // URL de la imagen
            alt="Custom"                         // Texto alternativo
            style={{ 
              width: element.width ? `${element.width}px` : '100px',   // Ancho definido o valor por defecto
              height: element.height ? `${element.height}px` : 'auto' // Altura definida o automática
            }}
            // Permite mover la imagen al arrastrar
            onMouseDown={(e) => handleMouseDown(e, 'image', element, 'move')}
          />
        );

      case 'emoji':
        return (
          <div 
            // Permite mover el emoji al arrastrar
            onMouseDown={(e) => handleMouseDown(e, 'emoji', element, 'move')}
            style={{ fontSize: `${element.size}px` }}>
            {element.emoji} {/* Emoji mostrado */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      // Contenedor absoluto para posicionar el elemento dentro del área de diseño
      className={`position-absolute ${activeElement && activeElement.id === element.id ? 'border border-primary' : ''}`}
      style={{
        left: `${element.x}px`,   // Posición horizontal en el lienzo
        top: `${element.y}px`,    // Posición vertical en el lienzo
        zIndex: 3,                // Asegura que el elemento esté por encima de otros
        cursor: isDragging ? 'grabbing' : 'grab' // Cambia el cursor si se está arrastrando
      }}>
      
      {/* Renderiza el contenido del elemento (texto, imagen o emoji) */}
      {renderElement()}
      
      {/* Controles flotantes (mover, redimensionar, eliminar) */}
      <div 
        className="d-flex position-absolute top-0 end-0 transform translate-middle-y" 
        style={{ marginTop: '-20px' }}>
        
        {/* Botón para mover el elemento */}
        <button 
          className="btn btn-sm btn-light border p-1 me-1"
          onMouseDown={(e) => handleMouseDown(e, type, element, 'move')}
          title="Mover">
          <Move size={16} />
        </button>

        {/* Botón para redimensionar el elemento */}
        <button 
          className="btn btn-sm btn-light border p-1 me-1"
          onMouseDown={(e) => handleMouseDown(e, type, element, 'resize')}
          title="Cambiar tamaño">
          <Maximize size={16} />
        </button>

        {/* Botón para eliminar el elemento */}
        <button 
          onClick={() => removeElement(element.id)}
          className="btn btn-sm btn-danger p-1"
          title="Eliminar">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default DesignElement;
