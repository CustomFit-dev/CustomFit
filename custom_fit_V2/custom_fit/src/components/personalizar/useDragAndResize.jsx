import { useState, useEffect } from 'react';

export const useDragAndResize = ({
    designElements,
    currentView,
    setCurrentTextElements,
    setCurrentImageElements,
    setCurrentEmojiElements,
    designAreaRef
}) => {
    const [activeElement, setActiveElement] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [origPos, setOrigPos] = useState({ x: 0, y: 0 });
    const [elementSize, setElementSize] = useState({ width: 100, height: 100 });

    const handleMouseDown = (e, elementType, element, action) => {
        e.stopPropagation();
        
        setActiveElement({ type: elementType, id: element.id });
        
        if (action === 'move') {
            setIsDragging(true);
            setStartPos({ x: e.clientX, y: e.clientY });
            setOrigPos({ x: element.x, y: element.y });
        } else if (action === 'resize') {
            setIsResizing(true);
            setStartPos({ x: e.clientX, y: e.clientY });
            
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

    const handleMouseMove = (e) => {
        if (!activeElement || (!isDragging && !isResizing)) return;
        
        if (isDragging) {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            
            if (activeElement.type === 'text') {
                const currentElements = designElements[currentView].textElements;
                const updatedElements = currentElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
                        : el
                );
                setCurrentTextElements(updatedElements);
            } else if (activeElement.type === 'image') {
                const currentElements = designElements[currentView].imageElements;
                const updatedElements = currentElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
                        : el
                );
                setCurrentImageElements(updatedElements);
            } else if (activeElement.type === 'emoji') {
                const currentElements = designElements[currentView].emojiElements;
                const updatedElements = currentElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
                        : el
                );
                setCurrentEmojiElements(updatedElements);
            }
        } else if (isResizing) {
            const dx = e.clientX - startPos.x;
            const aspectRatio = elementSize.width / elementSize.height;
            
            let newWidth = Math.max(20, elementSize.width + dx);
            let newHeight;
            
            if (activeElement.type === 'image') {
                newHeight = newWidth / aspectRatio;
                
                const currentElements = designElements[currentView].imageElements;
                const updatedElements = currentElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, width: newWidth, height: newHeight } 
                        : el
                );
                setCurrentImageElements(updatedElements);
            } else if (activeElement.type === 'emoji') {
                const newSize = Math.max(20, elementSize.width + dx);
                
                const currentElements = designElements[currentView].emojiElements;
                const updatedElements = currentElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, size: newSize } 
                        : el
                );
                setCurrentEmojiElements(updatedElements);
            } else if (activeElement.type === 'text') {
                const newSize = Math.max(10, elementSize.width + dx * 0.5);
                
                const currentElements = designElements[currentView].textElements;
                const updatedElements = currentElements.map(el => 
                    el.id === activeElement.id 
                        ? { ...el, size: newSize } 
                        : el
                );
                setCurrentTextElements(updatedElements);
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setIsResizing(false);
        setActiveElement(null);
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, activeElement, startPos, origPos, elementSize, designElements, currentView]);

    return {
        activeElement,
        isDragging,
        isResizing,
        handleMouseDown
    };
};