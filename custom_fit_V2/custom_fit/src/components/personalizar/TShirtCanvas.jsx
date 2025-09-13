import React from 'react';
import { colorImages, getImageByView } from './colors';

import DesignElement from './DesignElement';


const TShirtCanvas = ({
    tshirtColor,
    tshirtRef,
    designAreaRef,
    textElements,
    imageElements,
    emojiElements,
    activeElement,
    isDragging,
    handleMouseDown,
    removeTextElement,
    removeImageElement,
    removeEmojiElement,
    currentView,
    setCurrentView
}) => {
    // Configuración de vistas
    const views = [
        { id: 'frontal', name: 'Frontal' },
        { id: 'mangaDerecha', name: 'Manga derecha' },
        { id: 'mangaIzquierda', name: 'Manga izquierda' },
        { id: 'espaldar', name: 'Espaldar' }
    ];

    // Obtener configuraciones específicas para cada vista
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
        return configs[view] || configs.frontal;
    };

    const viewConfig = getViewConfig(currentView);

    return (
        <div className="col-md-6">
            {/* Navegación de vistas */}
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
                    <small className="text-muted">Vista actual: <strong>{views.find(v => v.id === currentView)?.name}</strong></small>
                </div>
            </div>

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
                    >
                        {textElements.map((el) => (
                            <DesignElement
                                key={el.id}
                                element={el}
                                type="text"
                                activeElement={activeElement}
                                isDragging={isDragging}
                                handleMouseDown={handleMouseDown}
                                removeElement={removeTextElement}
                            />
                        ))}

                        {imageElements.map((el) => (
                            <DesignElement
                                key={el.id}
                                element={el}
                                type="image"
                                activeElement={activeElement}
                                isDragging={isDragging}
                                handleMouseDown={handleMouseDown}
                                removeElement={removeImageElement}
                            />
                        ))}

                        {emojiElements.map((el) => (
                            <DesignElement
                                key={el.id}
                                element={el}
                                type="emoji"
                                activeElement={activeElement}
                                isDragging={isDragging}
                                handleMouseDown={handleMouseDown}
                                removeElement={removeEmojiElement}
                            />
                        ))}
                    </div>
                </div>
            </div>

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

export default TShirtCanvas;