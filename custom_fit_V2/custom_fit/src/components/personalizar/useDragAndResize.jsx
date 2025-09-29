import { useState, useEffect } from 'react';

// Hook personalizado para manejar arrastrar (drag) y redimensionar (resize)
// en los elementos de diseño (texto, imágenes, emojis).
export const useDragAndResize = ({
    designElements,             // Todos los elementos organizados por vista
    currentView,                // Vista actual (frontal, manga, espaldar)
    setCurrentTextElements,     // Setter: actualizar textos en la vista actual
    setCurrentImageElements,    // Setter: actualizar imágenes en la vista actual
    setCurrentEmojiElements,    // Setter: actualizar emojis en la vista actual
    designAreaRef               // Ref del área de diseño (puede usarse para límites)
}) => {
    // Estado para controlar el elemento activo (el que se está manipulando)
    const [activeElement, setActiveElement] = useState(null);

    // Flags de interacción
    const [isDragging, setIsDragging] = useState(false);   // ¿Se está arrastrando?
    const [isResizing, setIsResizing] = useState(false);   // ¿Se está redimensionando?

    // Posiciones iniciales (cuando se hace clic)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });  // Posición inicial del mouse
    const [origPos, setOrigPos] = useState({ x: 0, y: 0 });    // Posición original del elemento

    // Tamaño inicial del elemento (para redimensionar)
    const [elementSize, setElementSize] = useState({ width: 100, height: 100 });

    // 🔹 Cuando el usuario hace clic en un elemento
    const handleMouseDown = (e, elementType, element, action) => {
        e.stopPropagation(); // Evita que el evento burbujee hacia arriba
        
        // Marcamos este elemento como activo
        setActiveElement({ type: elementType, id: element.id });
        
        // Si la acción es "mover"
        if (action === 'move') {
            setIsDragging(true);
            setStartPos({ x: e.clientX, y: e.clientY }); // posición inicial del mouse
            setOrigPos({ x: element.x, y: element.y });  // posición inicial del elemento
        } 
        // Si la acción es "redimensionar"
        else if (action === 'resize') {
            setIsResizing(true);
            setStartPos({ x: e.clientX, y: e.clientY });

            // Guardamos tamaño inicial según el tipo de elemento
            if (elementType === 'image') {
                const imgElement = document.getElementById(`img-${element.id}`);
                if (imgElement) {
                    setElementSize({
                        width: imgElement.width,
                        height: imgElement.height
                    });
                } else {
                    setElementSize({
                        width: element.width || 100,
                        height: element.height || 100
                    });
                }
            } else if (elementType === 'emoji') {
                setElementSize({
                    width: parseFloat(element.size || 48),
                    height: parseFloat(element.size || 48)
                });
            } else if (elementType === 'text') {
                setElementSize({
                    width: element.size,
                    height: element.size
                });
            }
        }
    };

    // 🔹 Cuando el mouse se mueve
    const handleMouseMove = (e) => {
        if (!activeElement || (!isDragging && !isResizing)) return;
        
        // --- Si se está arrastrando ---
        if (isDragging) {
            const dx = e.clientX - startPos.x; // diferencia horizontal
            const dy = e.clientY - startPos.y; // diferencia vertical
            
            // Dependiendo del tipo, actualizamos la lista correspondiente
            if (activeElement.type === 'text') {
                const updatedElements = designElements[currentView].textElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
                        : el
                );
                setCurrentTextElements(updatedElements);

            } else if (activeElement.type === 'image') {
                const updatedElements = designElements[currentView].imageElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
                        : el
                );
                setCurrentImageElements(updatedElements);

            } else if (activeElement.type === 'emoji') {
                const updatedElements = designElements[currentView].emojiElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
                        : el
                );
                setCurrentEmojiElements(updatedElements);
            }
        } 
        // --- Si se está redimensionando ---
        else if (isResizing) {
            const dx = e.clientX - startPos.x; // cambio horizontal
            const aspectRatio = elementSize.width / elementSize.height; // relación de aspecto
            
            let newWidth = Math.max(20, elementSize.width + dx); // mínimo 20px
            let newHeight;
            
            if (activeElement.type === 'image') {
                newHeight = newWidth / aspectRatio;
                const updatedElements = designElements[currentView].imageElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, width: newWidth, height: newHeight } 
                        : el
                );
                setCurrentImageElements(updatedElements);

            } else if (activeElement.type === 'emoji') {
                const newSize = Math.max(20, elementSize.width + dx);
                const updatedElements = designElements[currentView].emojiElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, size: newSize } 
                        : el
                );
                setCurrentEmojiElements(updatedElements);

            } else if (activeElement.type === 'text') {
                const newSize = Math.max(10, elementSize.width + dx * 0.5);
                const updatedElements = designElements[currentView].textElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, size: newSize } 
                        : el
                );
                setCurrentTextElements(updatedElements);
            }
        }
    };

    // 🔹 Cuando se suelta el mouse (termina drag o resize)
    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setActiveElement(null);
    };

    // 🔹 Efecto: suscribir eventos globales de mouse
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, activeElement, startPos, origPos, elementSize, designElements, currentView]);

    // Lo que retorna el hook para usar en otros componentes
    return {
        activeElement,   // Elemento actualmente activo
        isDragging,      // Estado arrastrando
        isResizing,      // Estado redimensionando
        handleMouseDown  // Función para iniciar interacciones
    };
};
