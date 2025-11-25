import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/personalizar.scss';
import '../../scss/camisaPer.scss';

import CustomizationPanel from '../personalizar/CustomizationPanel';
import TShirtCanvas from '../personalizar/TShirtCanvas';
import InfoPanel from '../personalizar/InfoPanel';
import ModalsContainer from '../personalizar/ModalsContainer';
import { useTShirtState } from '../personalizar/useTShirtState';
import { useDragAndResize } from '../personalizar/useDragAndResize';
import { handleBuy } from '../personalizar/buyHandler';

const TShirtCustomizer = () => {
    const {
        tshirtColor, setTshirtColor,
        fabric, setFabric,
        size, setSize,
        currentView, setCurrentView,
        designElements, setDesignElements,
        getAllElementsCount,
        getCurrentTextElements,
        getCurrentImageElements,
        getCurrentEmojiElements,
        setCurrentTextElements,
        setCurrentImageElements,
        setCurrentEmojiElements,
        showTextModal, setShowTextModal,
        showImageModal, setShowImageModal,
        showEmojiModal, setShowEmojiModal,
        showCustomModal, setShowCustomModal,
        newText, setNewText,
        textFont, setTextFont,
        textSize, setTextSize,
        textColor, setTextColor
    } = useTShirtState();

    // Estado para saber si estamos editando un elemento existente
    const [editingElementId, setEditingElementId] = useState(null);

    const tshirtRef = useRef(null);
    const designAreaRef = useRef(null);

    const {
        activeElement,
        setActiveElement, // Extraemos el setter para controlar la selección
        isDragging,
        handleMouseDown
    } = useDragAndResize({
        designElements,
        currentView,
        setCurrentTextElements,
        setCurrentImageElements,
        setCurrentEmojiElements,
        designAreaRef
    });

    const handleBuyClick = () => {
        handleBuy(tshirtRef, designAreaRef, {
            size,
            fabric,
            tshirtColor,
            designElements,
            currentView,
            setCurrentView,
            getAllElementsCount
        });
    };

    const handleAddText = () => {
        if (editingElementId) {
            // Modo edición: actualizamos el elemento existente
            const currentTexts = getCurrentTextElements();
            const updatedTexts = currentTexts.map(el =>
                el.id === editingElementId
                    ? { ...el, text: newText, font: textFont, size: textSize, color: textColor }
                    : el
            );
            setCurrentTextElements(updatedTexts);
            setEditingElementId(null);
        } else {
            // Modo creación: creamos un nuevo elemento
            const newTextElement = {
                id: Date.now(),
                text: newText,
                font: textFont,
                size: textSize,
                color: textColor,
                x: 50,
                y: 50
            };

            const currentTexts = getCurrentTextElements();
            setCurrentTextElements([...currentTexts, newTextElement]);
        }
        setShowTextModal(false);
        setNewText('');
    };

    // Función para manejar el click en un elemento (selección)
    const handleElementClick = (element, elementType) => {
        setActiveElement({ type: elementType, id: element.id });
    };

    // Función para iniciar la edición de un texto (doble click)
    const handleEditText = (element) => {
        setNewText(element.text);
        setTextFont(element.font);
        setTextSize(element.size);
        setTextColor(element.color);
        setEditingElementId(element.id);
        setShowTextModal(true);
    };

    const handleAddImage = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const currentImages = getCurrentImageElements();
                setCurrentImageElements([...currentImages, {
                    id: Date.now(),
                    src: reader.result,
                    x: 50,
                    y: 50,
                    width: 100,
                    height: 100
                }]);
                setShowImageModal(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddEmoji = (emoji) => {
        const currentEmojis = getCurrentEmojiElements();
        setCurrentEmojiElements([...currentEmojis, {
            id: Date.now(),
            emoji: emoji,
            x: 50,
            y: 50,
            size: 48
        }]);
        setShowEmojiModal(false);
    };

    const handleSelectCustomDesign = (imageSrc) => {
        const currentImages = getCurrentImageElements();
        setCurrentImageElements([...currentImages, {
            id: Date.now(),
            src: imageSrc,
            x: 50,
            y: 50,
            width: 100,
            height: 100
        }]);
        setShowCustomModal(false);
    };

    const removeTextElement = (id) => {
        const currentTexts = getCurrentTextElements();
        setCurrentTextElements(currentTexts.filter(el => el.id !== id));
    };

    const removeImageElement = (id) => {
        const currentImages = getCurrentImageElements();
        setCurrentImageElements(currentImages.filter(el => el.id !== id));
    };

    const removeEmojiElement = (id) => {
        const currentEmojis = getCurrentEmojiElements();
        setCurrentEmojiElements(currentEmojis.filter(el => el.id !== id));
    };

    return (
        <div className="container-fluid p-4" id='Contapersonalizar'>
            <div className="titulo-container">
                <h1 className="titl1">¡Crea la camiseta perfecta en tan solo 10 minutos!</h1>
                <h2 className="titl2">Selecciona el modelo, sube tu diseño y haz tu pedido</h2>
            </div>

            <div className="row">
                <CustomizationPanel
                    fabric={fabric}
                    setFabric={setFabric}
                    size={size}
                    setSize={setSize}
                    setShowTextModal={setShowTextModal}
                    setShowCustomModal={setShowCustomModal}
                    setShowImageModal={setShowImageModal}
                    setShowEmojiModal={setShowEmojiModal}
                />

                <TShirtCanvas
                    tshirtColor={tshirtColor}
                    tshirtRef={tshirtRef}
                    designAreaRef={designAreaRef}
                    textElements={getCurrentTextElements()}
                    imageElements={getCurrentImageElements()}
                    emojiElements={getCurrentEmojiElements()}
                    activeElement={activeElement}
                    setActiveElement={setActiveElement}
                    isDragging={isDragging}
                    handleMouseDown={handleMouseDown}
                    removeTextElement={removeTextElement}
                    removeImageElement={removeImageElement}
                    removeEmojiElement={removeEmojiElement}
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    onElementClick={handleElementClick}
                    onEdit={handleEditText}
                />

                <InfoPanel
                    tshirtColor={tshirtColor}
                    setTshirtColor={setTshirtColor}
                    size={size}
                    fabric={fabric}
                    textElements={getCurrentTextElements()}
                    imageElements={getCurrentImageElements()}
                    emojiElements={getCurrentEmojiElements()}
                    textFont={textFont}
                    handleBuyClick={handleBuyClick}
                    currentView={currentView}
                    getAllElementsCount={getAllElementsCount}
                />
            </div>

            <ModalsContainer
                showTextModal={showTextModal}
                setShowTextModal={(show) => {
                    setShowTextModal(show);
                    if (!show) setEditingElementId(null); // Limpiar estado de edición al cerrar
                }}
                showCustomModal={showCustomModal}
                setShowCustomModal={setShowCustomModal}
                showImageModal={showImageModal}
                setShowImageModal={setShowImageModal}
                showEmojiModal={showEmojiModal}
                setShowEmojiModal={setShowEmojiModal}
                newText={newText}
                setNewText={setNewText}
                textFont={textFont}
                setTextFont={setTextFont}
                textSize={textSize}
                setTextSize={setTextSize}
                textColor={textColor}
                setTextColor={setTextColor}
                handleAddText={handleAddText}
                handleAddImage={handleAddImage}
                handleAddEmoji={handleAddEmoji}
                handleSelectCustomDesign={handleSelectCustomDesign}
            />
        </div>
    );
};

export default TShirtCustomizer;