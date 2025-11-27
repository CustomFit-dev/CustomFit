// Importamos React
import React from 'react';

// Importamos íconos desde lucide-react
import { X, RotateCw } from 'lucide-react';

// Componente DesignElement
// Representa un elemento dentro del área de diseño (texto, imagen o emoji)
// Se puede mover, redimensionar, rotar o eliminar.
const DesignElement = ({
  element,          // Objeto con las propiedades del elemento (posición, tamaño, estilo, etc.)
  type,             // Tipo de elemento: 'text', 'image', 'emoji'
  activeElement,    // Elemento actualmente seleccionado/activo
  isDragging,       // Booleano: indica si el elemento se está arrastrando
  handleMouseDown,  // Función para manejar eventos de arrastre o redimensionado
  removeElement,    // Función para eliminar un elemento
  onElementClick,   // Función para manejar click en el elemento (selección)
  onEdit            // Función para editar el elemento (doble clic en texto)
}) => {

  const isActive = activeElement && activeElement.id === element.id;
  const rotation = element.rotation || 0;

  // Renderiza el contenido según el tipo de elemento
  const renderElement = () => {
    switch (type) {
      case 'text':
        if (element.curve && element.curve !== 0) {
          // Renderizado de texto curvo con SVG
          // Calculamos un path para el texto
          const width = element.width || 300; // Ancho estimado o real
          const height = element.height || 100;
          const curve = element.curve; // Valor de curvatura (-100 a 100)

          // Ajustar el path basado en la curvatura
          // Un path cuadrático simple: M startX startY Q controlX controlY endX endY
          const startX = 0;
          const endX = width;
          const startY = height / 2;
          const endY = height / 2;

          // El punto de control determina la curva. 
          // Si curve > 0, controlY sube (curva hacia arriba/triste? no, SVG coords y crece hacia abajo).
          // Si curve es positivo, queremos que se curve hacia arriba (como arcoiris) o abajo (sonrisa)?
          // Usualmente "curvar" significa arco.
          // En SVG, Y crece hacia abajo.
          // curve positivo -> controlY menor (arriba) -> arco iris
          // curve negativo -> controlY mayor (abajo) -> sonrisa

          // Ajustamos la magnitud.
          const controlY = (height / 2) - (curve * 2);

          const pathData = `M ${startX} ${startY} Q ${width / 2} ${controlY} ${endX} ${endY}`;

          return (
            <svg
              width={width}
              height={height}
              viewBox={`0 0 ${width} ${height}`}
              style={{ overflow: 'visible' }}
              onMouseDown={(e) => handleMouseDown(e, 'text', element, 'move')}
            >
              <path id={`curve-${element.id}`} d={pathData} fill="transparent" />
              <text width={width} style={{
                fontFamily: element.font,
                fontSize: `${element.size}px`,
                fill: element.color,
                textAnchor: "middle" // Centrar texto en el path
              }}>
                <textPath xlinkHref={`#curve-${element.id}`} startOffset="50%">
                  {element.text}
                </textPath>
              </text>
            </svg>
          );
        }

        return (
          <div
            // Permite mover el texto al hacer clic y arrastrar
            onMouseDown={(e) => handleMouseDown(e, 'text', element, 'move')}
            style={{
              fontFamily: element.font,          // Fuente del texto
              fontSize: `${element.size}px`,     // Tamaño del texto
              color: element.color,              // Color del texto
              whiteSpace: 'nowrap',
              userSelect: 'none'
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
              width: '100%',
              height: '100%',
              pointerEvents: 'none', // Dejar que el contenedor maneje los eventos
              userSelect: 'none'
            }}
          />
        );

      case 'emoji':
        return (
          <div
            // Permite mover el emoji al arrastrar
            onMouseDown={(e) => handleMouseDown(e, 'emoji', element, 'move')}
            style={{
              fontSize: `${element.size}px`,
              userSelect: 'none',
              lineHeight: 1
            }}>
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
      className={`position-absolute`}
      style={{
        left: `${element.x}px`,   // Posición horizontal en el lienzo
        top: `${element.y}px`,    // Posición vertical en el lienzo
        width: element.width ? `${element.width}px` : 'auto',
        height: element.height ? `${element.height}px` : 'auto',
        zIndex: isActive ? 10 : 3,                // Asegura que el elemento activo esté encima
        transform: `rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        cursor: isDragging ? 'grabbing' : 'grab', // Cambia el cursor si se está arrastrando
        border: isActive ? '1px dashed #00a8ff' : '1px solid transparent' // Borde de selección profesional
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (onElementClick) onElementClick(element, type);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (type === 'text' && onEdit) onEdit(element);
      }}
      onMouseDown={(e) => {
        // Si es imagen, el contenedor maneja el move. Si es texto/emoji, sus hijos lo manejan, 
        // pero si hacen click en el borde del contenedor, también movemos.
        if (type === 'image') handleMouseDown(e, type, element, 'move');
      }}
    >

      {/* Renderiza el contenido del elemento (texto, imagen o emoji) */}
      {renderElement()}

      {/* Controles profesionales (handles) - Solo visibles si está seleccionado */}
      {isActive && (
        <>
          {/* Handle de Rotación (Arriba al centro) */}
          <div
            className="position-absolute"
            style={{
              top: '-25px',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'grab',
              zIndex: 11
            }}
            onMouseDown={(e) => handleMouseDown(e, type, element, 'rotate')}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#fff',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd'
            }}>
              <RotateCw size={14} color="#333" />
            </div>
          </div>

          {/* Botón de Eliminar (Esquina superior derecha del borde) */}
          <div
            className="position-absolute"
            style={{
              top: '-12px',
              right: '-12px',
              cursor: 'pointer',
              zIndex: 11
            }}
            onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id);
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#ff4d4d',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              <X size={12} />
            </div>
          </div>

          {/* Handles de Redimensionamiento (Esquinas) */}
          {/* NW */}
          <div
            className="position-absolute bg-white border border-primary"
            style={{
              top: '-6px',
              left: '-6px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              cursor: 'nwse-resize',
              zIndex: 11
            }}
            onMouseDown={(e) => handleMouseDown(e, type, element, 'resize', 'nw')}
          />
          {/* NE */}
          <div
            className="position-absolute bg-white border border-primary"
            style={{
              top: '-6px',
              right: '-6px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              cursor: 'nesw-resize',
              zIndex: 11
            }}
            onMouseDown={(e) => handleMouseDown(e, type, element, 'resize', 'ne')}
          />
          {/* SW */}
          <div
            className="position-absolute bg-white border border-primary"
            style={{
              bottom: '-6px',
              left: '-6px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              cursor: 'nesw-resize',
              zIndex: 11
            }}
            onMouseDown={(e) => handleMouseDown(e, type, element, 'resize', 'sw')}
          />
          {/* SE */}
          <div
            className="position-absolute bg-white border border-primary"
            style={{
              bottom: '-6px',
              right: '-6px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              cursor: 'nwse-resize',
              zIndex: 11
            }}
            onMouseDown={(e) => handleMouseDown(e, type, element, 'resize', 'se')}
          />
        </>
      )}
    </div>
  );
};

// Exportamos el componente para usarlo en otras partes de la aplicación
export default DesignElement;
