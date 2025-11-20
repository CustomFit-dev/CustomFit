// Importamos React
import React from 'react';

// Importamos los diferentes modales que se usan en la app
import CustomGaleria from '../modules/ventanaCustom';   // Galería de diseños personalizados
import TextModal from '../modal/Textmodal';            // Modal para agregar texto        // Modal para agregar emojis
import ModalImageUpload from '../modal/imgModal';      // Modal para subir imágenes

// Componente contenedor de todos los modales
// Se encarga de centralizar la lógica y renderizar condicionalmente cada modal
const ModalsContainer = ({
  showTextModal,           // Estado: mostrar u ocultar modal de texto
  setShowTextModal,        // Función: cambiar visibilidad del modal de texto

  showCustomModal,         // Estado: mostrar u ocultar modal de galería de diseños
  setShowCustomModal,      // Función: cambiar visibilidad del modal de galería

  showImageModal,          // Estado: mostrar u ocultar modal de imágenes
  setShowImageModal,       // Función: cambiar visibilidad del modal de imágenes

  showEmojiModal,          // Estado: mostrar u ocultar modal de emojis
  setShowEmojiModal,       // Función: cambiar visibilidad del modal de emojis

  // Props relacionadas con el texto
  newText,                 // Texto que se está escribiendo en el modal
  setNewText,              // Función para actualizar el texto
  textFont,                // Fuente seleccionada
  setTextFont,             // Función para actualizar la fuente
  textSize,                // Tamaño de la fuente
  setTextSize,             // Función para actualizar tamaño
  textColor,               // Color del texto
  setTextColor,            // Función para actualizar color

  // Handlers de acciones principales
  handleAddText,           // Agregar texto a la camiseta
  handleAddImage,          // Agregar imagen subida
  handleAddEmoji,          // Agregar emoji seleccionado
  handleSelectCustomDesign // Seleccionar un diseño de la galería personalizada
}) => {
  return (
    <>
      {/* Modal para agregar y configurar texto */}
      <TextModal 
        show={showTextModal}
        setShow={setShowTextModal}
        newText={newText}
        setNewText={setNewText}
        textFont={textFont}
        setTextFont={setTextFont}
        textSize={textSize}
        setTextSize={setTextSize}
        textColor={textColor}
        setTextColor={setTextColor}
        handleAddText={handleAddText}
      />

      {/* Modal de galería de diseños personalizados (se renderiza solo si está abierto) */}
      {showCustomModal && (
        <CustomGaleria 
          onSelectImage={handleSelectCustomDesign}    // Selección de diseño
          onClose={() => setShowCustomModal(false)}   // Cierra modal
        />
      )}

      {/* Modal para subir imágenes */}
      <ModalImageUpload 
        show={showImageModal}
        setShowImageModal={setShowImageModal}
        handleAddImage={handleAddImage}
      />
    </>
  );
};

// Exportamos el componente
export default ModalsContainer;
