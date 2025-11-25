// Importamos React
import React from 'react';
// Importamos los colores y función para obtener imagen de camiseta según la vista
import { colorImages, getImageByView } from './colors';
// Importamos el componente que renderiza cada elemento (texto, imagen o emoji)
import DesignElement from './DesignElement';

// Componente principal que representa el "lienzo" donde se diseña la camiseta
const TShirtCanvas = ({
    tshirtColor,         // Color de la camiseta seleccionado
    tshirtRef,           // Referencia al contenedor de la camiseta (para capturas/descargas)
    designAreaRef,       // Referencia al área donde se colocan los elementos
    textElements,        // Lista de elementos de texto añadidos
    imageElements,       // Lista de imágenes añadidas
    emojiElements,       // Lista de emojis añadidos
    activeElement,       // Elemento actualmente activo (seleccionado)
    isDragging,          // Estado que indica si un elemento está siendo arrastrado
    handleMouseDown,     // Función que gestiona el inicio del arrastre o redimensionado
    removeTextElement,   // Función para eliminar textos
    removeImageElement,  // Función para eliminar imágenes
    removeEmojiElement,  // Función para eliminar emojis
    currentView,         // Vista actual de la camiseta (frontal, espaldar, manga)
    setCurrentView,      // Función para cambiar la vista
    setActiveElement,    // Función para controlar la selección
    onElementClick,      // Función para manejar click en elementos
    onEdit               // Función para editar textos
}) => {
    // Definición de las vistas disponibles
    const views = [
        { id: 'frontal', name: 'Frontal' },
        { id: 'mangaDerecha', name: 'Manga derecha' },
        { id: 'mangaIzquierda', name: 'Manga izquierda' },
        { id: 'espaldar', name: 'Espaldar' }
    ];

    // Configuración específica para cada vista de la camiseta
    const getViewConfig = (view) => {
        const configs = {
            frontal: {
                width: '47%',
                height: '70%',
                top: '55%',
                left: '50%'
            },
            espaldar: {
                width: '47%',
                height: '75%',
                top: '55%',
                left: '50%'
            },
            mangaDerecha: {
                width: '30%',
                height: '85%',
                top: '55%',
                left: '49%'
            },
            mangaIzquierda: {
                width: '30%',
                height: '85%',
                top: '55%',
                left: '50%'
            }
        };
        return configs[view] || configs.frontal; // Retorna frontal por defecto
    };

    // Configuración actual en función de la vista seleccionada
    const viewConfig = getViewConfig(currentView);

    return (
        <div className="col-md-6">
            {/* Selector de vistas (botones para frontal, mangas, espaldar) */}
            <div className="mb-3">
                <div className="d-flex justify-content-center">
                    <div className="btn-group" role="group">
                        {views.map((view) => (
                            <button
                                key={view.id}
                                type="button"
                                className={`btn ${currentView === view.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                                onClick={() => setCurrentView(view.id)}
                                style={currentView === view.id ? { backgroundColor: '#17BEBB', border: 'none' } : {}}
                            >
                                {view.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="text-center mt-2">
                    <br />
                </div>
            </div>

            {/* Contenedor principal de la camiseta */}
            <div className="position-relative" style={{ height: '700px', width: '100%' }} ref={tshirtRef}>
                <div
                    className="tshirt-container position-relative"
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {/* Imagen de la camiseta según vista y color */}
                    <img
                        src={getImageByView(currentView, tshirtColor)}
                        alt={`Camiseta ${views.find(v => v.id === currentView)?.name}`}
                        className="position-relative"
                        style={{
                            width: '100%',
                            maxWidth: '120%',
                            maxHeight: '140%',
                            zIndex: 1
                        }}
                    />

                    {/* Área de diseño: aquí se renderizan los elementos personalizados */}
                    <div
                        ref={designAreaRef}
                        className="position-absolute border border-2 border-danger border-dashed"
                        style={{
                            width: viewConfig.width,
                            height: viewConfig.height,
                            top: viewConfig.top,
                            left: viewConfig.left,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2,
                            overflow: 'visible',
                        }}
                        onClick={(e) => {
                            // Si se hace clic directamente en el área de diseño (fondo), deseleccionar
                            if (e.target === e.currentTarget) {
                                setActiveElement(null);
                            }
                        }}
                    >
                        {/* Renderizar elementos de texto */}
                        {textElements.map((el) => (
                            <DesignElement
                                key={el.id}
                                element={el}
                                type="text"
                                activeElement={activeElement}
                                isDragging={isDragging}
                                handleMouseDown={handleMouseDown}
                                removeElement={removeTextElement}
                                onElementClick={onElementClick}
                                onEdit={onEdit}
                            />
                        ))}

                        {/* Renderizar elementos de imagen */}
                        {imageElements.map((el) => (
                            <DesignElement
                                key={el.id}
                                element={el}
                                type="image"
                                activeElement={activeElement}
                                isDragging={isDragging}
                                handleMouseDown={handleMouseDown}
                                removeElement={removeImageElement}
                                onElementClick={onElementClick}
                                onEdit={onEdit}
                            />
                        ))}

                        {/* Renderizar elementos de emoji */}
                        {emojiElements.map((el) => (
                            <DesignElement
                                key={el.id}
                                element={el}
                                type="emoji"
                                activeElement={activeElement}
                                isDragging={isDragging}
                                handleMouseDown={handleMouseDown}
                                removeElement={removeEmojiElement}
                                onElementClick={onElementClick}
                                onEdit={onEdit}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Estilos internos específicos */}
            <style jsx>{`
                .cursor-move {
                    cursor: move;
                }
                
                .resize-handle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    background-color: white;
                    border: 1px solid blue;
                    border-radius: 50%;
                }

                .tshirt-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .btn-group .btn {
                    font-size: 0.875rem;
                    padding: 0.375rem 0.75rem;
                }
            `}</style>
        </div>
    );
};

// Exportamos el componente
export default TShirtCanvas;
