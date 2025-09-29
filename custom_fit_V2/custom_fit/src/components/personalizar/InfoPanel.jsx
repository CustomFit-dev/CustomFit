// Importamos React
import React from 'react';

// Importamos los colores e imágenes asociados desde el archivo colors.js
import { colorImages } from './colors';

// Componente InfoPanel
// Muestra la información de la configuración actual de la camiseta
// Permite cambiar color, ver detalles seleccionados y realizar acciones (descargar o agregar al carrito)
const InfoPanel = ({
  tshirtColor,          // Color actual de la camiseta
  setTshirtColor,       // Función para actualizar el color de la camiseta
  size,                 // Talla seleccionada
  fabric,               // Tela seleccionada
  textElements,         // Lista de elementos de texto agregados
  imageElements,        // Lista de elementos de imagen agregados
  emojiElements,        // Lista de elementos emoji agregados
  textFont,             // Fuente seleccionada para los textos
  handleBuyClick,       // Función para manejar la acción de "Descargar Diseños"
  currentView,          // Vista actual de la camiseta (frontal, mangas, espaldar)
  getAllElementsCount   // Función para contar todos los elementos de todas las vistas
}) => {

  // Opciones de vistas disponibles
  const views = [
    { id: 'frontal', name: 'Frontal' },
    { id: 'mangaDerecha', name: 'Manga derecha' },
    { id: 'mangaIzquierda', name: 'Manga izquierda' },
    { id: 'espaldar', name: 'Espaldar' }
  ];

  return (
    <div className="col-md-3">
      
      {/* Sección: Colores de camiseta */}
      <div className="mb-4">
        <h5 className="fw-bold mb-2">Colores de Camiseta</h5>
        <div className="d-flex flex-wrap gap-2">
          {Object.entries(colorImages).map(([colorClass, imageSrc]) => (
            <button 
              key={colorClass} 
              className={`btn ${colorClass} rounded-circle`} // Botón circular para mostrar el color
              style={{ width: '3rem', height: '3rem' }}
              title={colorClass} // Tooltip con el nombre de la clase/color
              onClick={() => setTshirtColor(colorClass)} // Actualiza el color de la camiseta
            />
          ))}
        </div>
      </div>
      
      {/* Tarjeta: Información de la selección actual */}
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title fw-bold mb-2">Tu Selección</h6>
          <ul className="list-unstyled">
            <li><strong>Talla:</strong> {size}</li>
            <li><strong>Tela:</strong> {fabric || 'No seleccionada'}</li>
            <li>
              <strong>Vista actual:</strong> 
              {views.find(v => v.id === currentView)?.name}
            </li>
            <li>
              <strong>Elementos vista actual:</strong> 
              {textElements.length + imageElements.length + emojiElements.length}
            </li>
            <li>
              <strong>Total elementos:</strong> 
              {getAllElementsCount ? getAllElementsCount() : 0}
            </li>
          </ul>
        </div>
      </div>
      
      {/* Botones de acción */}
      <div className="d-grid gap-3">
        {/* Botón para descargar los diseños */}
        <button 
          className="btn btn-success btn-lg fw-bold" 
          onClick={handleBuyClick}>
          Descargar Diseños
        </button>

        {/* Botón para agregar al carrito */}
        <button className="btn btn-primary btn-lg fw-bold">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

// Exportamos el componente para que pueda usarse en otras partes de la app
export default InfoPanel;
