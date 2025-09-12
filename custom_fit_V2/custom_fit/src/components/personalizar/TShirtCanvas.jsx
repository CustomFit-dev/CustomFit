    import React from 'react';
    import { colorImages } from './colors';
    import DesignElement from './DesignElement';
    import CamisetaBase from "../../img/camisassinfo/camisablanca.png";

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
    removeEmojiElement
    }) => {
    return (
        <div className="col-md-6">
        <div className="position-relative" style={{ height: '700px', width: '100%' }} ref={tshirtRef}>
            <div 
            className="tshirt-container position-relative" 
            style={{ 
                height: '100%', 
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            <img 
                ref={tshirtRef}
                src={colorImages[tshirtColor] || CamisetaBase} 
                alt="Camiseta Base" 
                className="position-relative" 
                style={{ 
                width: '100%',
                maxWidth: '120%',
                maxHeight: '140%',
                zIndex: 1
                }} />
            
            <div
                ref={designAreaRef}
                className="position-absolute border border-2 border-danger border-dashed"
                style={{
                width: '55%',
                height: '70%',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
                overflow: 'visible',
                }}>
                
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
        `}</style>
        </div>
    );
    };

    export default TShirtCanvas;