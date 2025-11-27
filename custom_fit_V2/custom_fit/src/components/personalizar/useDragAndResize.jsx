import { useState, useEffect } from 'react';

// Hook personalizado para manejar arrastrar (drag), redimensionar (resize) y rotar (rotate)
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
    const [isRotating, setIsRotating] = useState(false);   // ¿Se está rotando?

    // Posiciones iniciales (cuando se hace clic)
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });  // Posición inicial del mouse
    const [origPos, setOrigPos] = useState({ x: 0, y: 0 });    // Posición original del elemento
    const [origRotation, setOrigRotation] = useState(0);       // Rotación original

    // Tamaño inicial del elemento (para redimensionar)
    const [elementSize, setElementSize] = useState({ width: 100, height: 100 });

    // Dirección de redimensionamiento (nw, ne, sw, se)
    const [resizeHandle, setResizeHandle] = useState(null);

    // 🔹 Cuando el usuario hace clic en un elemento
    const handleMouseDown = (e, elementType, element, action, handle = null) => {
        e.stopPropagation(); // Evita que el evento burbujee hacia arriba

        // Marcamos este elemento como activo
        setActiveElement({ type: elementType, id: element.id });

        setStartPos({ x: e.clientX, y: e.clientY });
        setOrigPos({ x: element.x, y: element.y });

        // Inicializar rotación si no existe
        const currentRotation = element.rotation || 0;
        setOrigRotation(currentRotation);

        if (action === 'move') setIsDragging(true);
        if (action === 'rotate') setIsRotating(true);
        if (action === 'resize') {
            setIsResizing(true);
            setResizeHandle(handle);
        }

        // Guardamos tamaño inicial según el tipo de elemento
        if (elementType === 'image') {
            // Intentar obtener dimensiones reales si es posible, sino usar las del estado
            setElementSize({
                width: element.width || 100,
                height: element.height || 100
            });
        } else if (elementType === 'emoji') {
            setElementSize({
                width: parseFloat(element.size || 48),
                height: parseFloat(element.size || 48)
            });
        } else if (elementType === 'text') {
            // Para texto curvo o normal
            if (element.curve) {
                setElementSize({
                    width: element.width || 300,
                    height: element.height || 100
                });
            } else {
                // Estimación para texto normal si no tenemos width explícito
                // (Aunque ahora DesignElement usa width/height explícitos si existen)
                const estimatedWidth = element.width || (element.text.length * element.size * 0.6);
                setElementSize({
                    width: estimatedWidth,
                    height: element.height || element.size
                });
            }
        }
    };

    // 🔹 Cuando el mouse se mueve
    const handleMouseMove = (e) => {
        if (!activeElement || (!isDragging && !isResizing && !isRotating)) return;

        // Helper para actualizar el elemento correcto
        const updateElement = (updates) => {
            if (activeElement.type === 'text') {
                const updatedElements = designElements[currentView].textElements.map(el =>
                    el.id === activeElement.id ? { ...el, ...updates } : el
                );
                setCurrentTextElements(updatedElements);
            } else if (activeElement.type === 'image') {
                const updatedElements = designElements[currentView].imageElements.map(el =>
                    el.id === activeElement.id ? { ...el, ...updates } : el
                );
                setCurrentImageElements(updatedElements);
            } else if (activeElement.type === 'emoji') {
                const updatedElements = designElements[currentView].emojiElements.map(el =>
                    el.id === activeElement.id ? { ...el, ...updates } : el
                );
                setCurrentEmojiElements(updatedElements);
            }
        };

        // Obtener límites del área de diseño
        let containerWidth = 500; // Valor por defecto
        let containerHeight = 500;
        if (designAreaRef && designAreaRef.current) {
            containerWidth = designAreaRef.current.offsetWidth;
            containerHeight = designAreaRef.current.offsetHeight;
        }

        // --- Si se está arrastrando (MOVER) ---
        if (isDragging) {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;

            let newX = origPos.x + dx;
            let newY = origPos.y + dy;

            // 🔒 Restricción de límites (Boundary Check)
            // Asegurar que el elemento no se salga del contenedor

            // Ancho y alto actual del elemento
            const currentWidth = elementSize.width;
            const currentHeight = elementSize.height;

            // Clamp X
            if (newX < 0) newX = 0;
            if (newX + currentWidth > containerWidth) newX = containerWidth - currentWidth;

            // Clamp Y
            if (newY < 0) newY = 0;
            if (newY + currentHeight > containerHeight) newY = containerHeight - currentHeight;

            updateElement({ x: newX, y: newY });
        }

        // --- Si se está rotando ---
        else if (isRotating) {
            // Calcular el centro del elemento
            if (designAreaRef && designAreaRef.current) {
                const rect = designAreaRef.current.getBoundingClientRect();
                const centerX = rect.left + origPos.x + (elementSize.width / 2);
                const centerY = rect.top + origPos.y + (elementSize.height / 2);

                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
                let degrees = angle * (180 / Math.PI);

                // Ajustar para que 0 sea arriba
                degrees += 90;

                updateElement({ rotation: degrees });
            }
        }

        // --- Si se está redimensionando ---
        else if (isResizing) {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;

            let newWidth = elementSize.width;
            let newHeight = elementSize.height;
            let newX = origPos.x;
            let newY = origPos.y;

            // Ajustar según el handle
            if (resizeHandle === 'se') {
                newWidth += dx;
                newHeight += dy;
            } else if (resizeHandle === 'sw') {
                newWidth -= dx;
                newHeight += dy;
                newX += dx;
            } else if (resizeHandle === 'ne') {
                newWidth += dx;
                newHeight -= dy;
                newY += dy;
            } else if (resizeHandle === 'nw') {
                newWidth -= dx;
                newHeight -= dy;
                newX += dx;
                newY += dy;
            }

            // Restricciones mínimas de tamaño
            if (newWidth < 20) newWidth = 20;
            if (newHeight < 20) newHeight = 20;

            // 🔒 Restricción de límites para Resize
            // Verificar si el nuevo tamaño/posición se sale del contenedor

            // 1. Check Left (X < 0)
            if (newX < 0) {
                newX = 0;
                // Si movimos X a 0, y estamos arrastrando desde la izquierda (nw, sw),
                // el ancho debe reducirse para compensar
                if (resizeHandle === 'nw' || resizeHandle === 'sw') {
                    newWidth = (origPos.x + elementSize.width) - 0;
                }
            }

            // 2. Check Top (Y < 0)
            if (newY < 0) {
                newY = 0;
                if (resizeHandle === 'nw' || resizeHandle === 'ne') {
                    newHeight = (origPos.y + elementSize.height) - 0;
                }
            }

            // 3. Check Right (X + Width > ContainerWidth)
            if (newX + newWidth > containerWidth) {
                newWidth = containerWidth - newX;
            }

            // 4. Check Bottom (Y + Height > ContainerHeight)
            if (newY + newHeight > containerHeight) {
                newHeight = containerHeight - newY;
            }

            // Mantener aspecto para imágenes y emojis (opcional, pero recomendado)
            if (activeElement.type === 'image' || activeElement.type === 'emoji') {
                const aspectRatio = elementSize.width / elementSize.height;

                // Recalcular para mantener aspecto dentro de los límites
                // Esto es un poco más complejo con límites, simplificamos:
                // Si ajustamos ancho, recalculamos alto. Si ese alto se sale, ajustamos alto y recalculamos ancho.

                if (resizeHandle === 'se' || resizeHandle === 'nw') {
                    // Prioridad al ancho, ajustar alto
                    let proposedHeight = newWidth / aspectRatio;

                    // Si el alto propuesto se sale por abajo (SE) o arriba (NW)
                    if (newY + proposedHeight > containerHeight) {
                        proposedHeight = containerHeight - newY;
                        newWidth = proposedHeight * aspectRatio;
                    }
                    newHeight = proposedHeight;

                } else {
                    // Prioridad al ancho también para simplificar, o alto?
                    // SW, NE
                    let proposedHeight = newWidth / aspectRatio;
                    if (newY + proposedHeight > containerHeight) {
                        proposedHeight = containerHeight - newY;
                        newWidth = proposedHeight * aspectRatio;
                    }
                    newHeight = proposedHeight;
                }
            }

            // Actualizar elemento
            if (activeElement.type === 'text') {
                updateElement({
                    width: newWidth,
                    height: newHeight,
                    x: newX,
                    y: newY,
                    size: (elementSize.height || 20) * (newHeight / elementSize.height)
                });
            } else if (activeElement.type === 'emoji') {
                updateElement({
                    width: newWidth,
                    height: newHeight,
                    x: newX,
                    y: newY,
                    size: newHeight
                });
            } else {
                updateElement({ width: newWidth, height: newHeight, x: newX, y: newY });
            }
        }
    };

    // 🔹 Cuando se suelta el mouse (termina drag o resize)
    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setIsRotating(false);
        setResizeHandle(null);
    };

    // 🔹 Efecto: suscribir eventos globales de mouse
    useEffect(() => {
        if (isDragging || isResizing || isRotating) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, isRotating, activeElement, startPos, origPos, elementSize, designElements, currentView, resizeHandle]);

    // Lo que retorna el hook para usar en otros componentes
    return {
        activeElement,   // Elemento actualmente activo
        setActiveElement, // Función para controlar la selección desde fuera
        isDragging,      // Estado arrastrando
        isResizing,      // Estado redimensionando
        isRotating,      // Estado rotando
        handleMouseDown  // Función para iniciar interacciones
    };
};
