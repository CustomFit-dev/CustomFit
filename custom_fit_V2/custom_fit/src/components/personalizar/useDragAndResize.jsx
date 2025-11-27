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

        // Si la acción es "mover" o "redimensionar", necesitamos saber el tamaño para los límites
        if (action === 'move' || action === 'resize') {
            if (action === 'move') setIsDragging(true);
            if (action === 'resize') setIsResizing(true);

            setStartPos({ x: e.clientX, y: e.clientY });
            if (action === 'move') setOrigPos({ x: element.x, y: element.y });

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
                // Estimación aproximada para texto si no hay ref directa, 
                // pero idealmente deberíamos medir el elemento DOM real.
                // Por ahora usamos el tamaño de fuente como proxy de altura y un estimado para ancho
                // O mejor, intentamos obtener el elemento del DOM si es posible, pero no tenemos ID fácil para texto.
                // Vamos a usar un estimado basado en longitud * tamaño * 0.6 (aprox)
                const estimatedWidth = (element.text.length * element.size * 0.6);
                setElementSize({
                    width: estimatedWidth,
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

            let newX = origPos.x + dx;
            let newY = origPos.y + dy;

            // Aplicar límites si tenemos la referencia del área de diseño
            if (designAreaRef && designAreaRef.current) {
                const containerWidth = designAreaRef.current.offsetWidth;
                const containerHeight = designAreaRef.current.offsetHeight;

                // Asegurar que no se salga por la izquierda/arriba
                newX = Math.max(0, newX);
                newY = Math.max(0, newY);

                // Asegurar que no se salga por derecha/abajo
                // Usamos elementSize que capturamos en mouseDown
                if (elementSize) {
                    newX = Math.min(newX, containerWidth - elementSize.width);
                    newY = Math.min(newY, containerHeight - elementSize.height);
                }
            }

            // Dependiendo del tipo, actualizamos la lista correspondiente
            if (activeElement.type === 'text') {
                const updatedElements = designElements[currentView].textElements.map(el =>
                    el.id === activeElement.id
                        ? { ...el, x: newX, y: newY }
                        : el
                );
                setCurrentTextElements(updatedElements);

            } else if (activeElement.type === 'image') {
                const updatedElements = designElements[currentView].imageElements.map(el =>
                    el.id === activeElement.id
                        ? { ...el, x: newX, y: newY }
                        : el
                );
                setCurrentImageElements(updatedElements);

            } else if (activeElement.type === 'emoji') {
                const updatedElements = designElements[currentView].emojiElements.map(el =>
                    el.id === activeElement.id
                        ? { ...el, x: newX, y: newY }
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
                // Obtener dimensiones del contenedor para límites
                let maxWidth = 500; // Tamaño máximo por defecto
                let maxHeight = 500;

                if (designAreaRef && designAreaRef.current) {
                    const containerWidth = designAreaRef.current.offsetWidth;
                    const containerHeight = designAreaRef.current.offsetHeight;
                    maxWidth = Math.min(containerWidth * 0.8, 500); // Máximo 80% del contenedor o 500px
                    maxHeight = Math.min(containerHeight * 0.8, 500);
                }

                // Limitar el ancho al máximo permitido
                newWidth = Math.min(newWidth, maxWidth);
                newHeight = newWidth / aspectRatio;

                // Si la altura excede el máximo, ajustar por altura
                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = newHeight * aspectRatio;
                }

                const updatedElements = designElements[currentView].imageElements.map(el =>
                    el.id === activeElement.id
                        ? { ...el, width: newWidth, height: newHeight }
                        : el
                );
                setCurrentImageElements(updatedElements);

            } else if (activeElement.type === 'emoji') {
                // Limitar tamaño máximo de emoji a 200px
                const maxSize = 200;
                const newSize = Math.min(Math.max(20, elementSize.width + dx), maxSize);
                const updatedElements = designElements[currentView].emojiElements.map(el =>
                    el.id === activeElement.id
                        ? { ...el, size: newSize }
                        : el
                );
                setCurrentEmojiElements(updatedElements);

            } else if (activeElement.type === 'text') {
                // Limitar tamaño máximo de texto a 150px
                const maxSize = 150;
                const newSize = Math.min(Math.max(10, elementSize.width + dx * 0.5), maxSize);
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
        // No limpiamos activeElement para mantener la selección
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
        setActiveElement, // Función para controlar la selección desde fuera
        isDragging,      // Estado arrastrando
        isResizing,      // Estado redimensionando
        handleMouseDown  // Función para iniciar interacciones
    };
};
