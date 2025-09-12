    import React from 'react';
    import { X, Move, Maximize } from 'lucide-react';

    const DesignElement = ({ 
    element, 
    type, 
    activeElement, 
    isDragging, 
    handleMouseDown, 
    removeElement 
    }) => {
    const renderElement = () => {
        switch (type) {
        case 'text':
            return (
            <div
                onMouseDown={(e) => handleMouseDown(e, 'text', element, 'move')}
                style={{
                fontFamily: element.font,
                fontSize: `${element.size}px`,
                color: element.color,
                }}>
                {element.text}
            </div>
            );
        case 'image':
            return (
            <img 
                id={`img-${element.id}`}
                src={element.src} 
                alt="Custom" 
                style={{ 
                width: element.width ? `${element.width}px` : '100px', 
                height: element.height ? `${element.height}px` : 'auto' 
                }}
                onMouseDown={(e) => handleMouseDown(e, 'image', element, 'move')}
            />
            );
        case 'emoji':
            return (
            <div 
                onMouseDown={(e) => handleMouseDown(e, 'emoji', element, 'move')}
                style={{ fontSize: `${element.size}px` }}>
                {element.emoji}
            </div>
            );
        default:
            return null;
        }
    };

    return (
        <div 
        className={`position-absolute ${activeElement && activeElement.id === element.id ? 'border border-primary' : ''}`}
        style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            zIndex: 3,
            cursor: isDragging ? 'grabbing' : 'grab'
        }}>
        
        {renderElement()}
        
        <div className="d-flex position-absolute top-0 end-0 transform translate-middle-y" style={{ marginTop: '-20px' }}>
            <button 
            className="btn btn-sm btn-light border p-1 me-1"
            onMouseDown={(e) => handleMouseDown(e, type, element, 'move')}
            title="Mover">
            <Move size={16} />
            </button>
            <button 
            className="btn btn-sm btn-light border p-1 me-1"
            onMouseDown={(e) => handleMouseDown(e, type, element, 'resize')}
            title="Cambiar tamaño">
            <Maximize size={16} />
            </button>
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

    export default DesignElement;