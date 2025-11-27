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
import { useAuth } from './authcontext';
import { useCart } from '../../context/CartContext';

const TShirtCustomizer = () => {
    const { authToken } = useAuth();
    const { addToCart } = useCart();
    const {
        tshirtColor, setTshirtColor,
        fabric, setFabric,
        fabricPrice, setFabricPrice,
        size, setSize,
        currentView, setCurrentView,
        designElements, setDesignElements,
        getAllElementsCount,
        getTotalPrice,
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
        textColor, setTextColor,
        textCurve, setTextCurve
    } = useTShirtState();

    const [editingElementId, setEditingElementId] = useState(null);
    const [lastSavedDesign, setLastSavedDesign] = useState(null);

    const tshirtRef = useRef(null);
    const designAreaRef = useRef(null);

    const {
        activeElement,
        setActiveElement,
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
        if (!fabric) {
            import("sweetalert2").then(Swal => {
                Swal.default.fire({
                    icon: 'warning',
                    title: 'Falta seleccionar tela',
                    text: 'Por favor selecciona un tipo de tela antes de continuar.'
                });
            });
            return;
        }

        const currentImages = getCurrentImageElements();
        if (currentImages.length === 0 && getCurrentTextElements().length === 0 && getCurrentEmojiElements().length === 0) {
            import("sweetalert2").then(Swal => {
                Swal.default.fire({
                    icon: 'warning',
                    title: 'Diseño vacío',
                    text: 'Por favor agrega al menos un estampado, texto o emoji.'
                });
            });
            return;
        }

        // Recopilar TODOS los elementos de imagen de TODAS las vistas
        const allImageElements = [
            ...(designElements.frontal?.imageElements || []),
            ...(designElements.espaldar?.imageElements || []),
            ...(designElements.mangaDerecha?.imageElements || []),
            ...(designElements.mangaIzquierda?.imageElements || [])
        ];

        handleBuy(tshirtRef, designAreaRef, {
            size,
            fabric,
            tshirtColor,
            designElements,
            currentView,
            setCurrentView,
            getAllElementsCount,
            totalPrice: getTotalPrice ? getTotalPrice() : 0,
            imageElements: allImageElements,
            authToken,
            lastSavedDesign,
            setLastSavedDesign
        }).then((newProduct) => {
            if (newProduct) {
                // Agregar al carrito automáticamente
                addToCart(newProduct, 1, true); // true indica que es personalizado
            }
        });
    };

    const handleAddText = () => {
        if (editingElementId) {
            const currentTexts = getCurrentTextElements();
            const updatedTexts = currentTexts.map(el =>
                el.id === editingElementId
                    ? { ...el, text: newText, font: textFont, size: textSize, color: textColor, curve: textCurve }
                    : el
            );
            setCurrentTextElements(updatedTexts);
            setEditingElementId(null);
        } else {
            const newTextElement = {
                id: Date.now(),
                text: newText,
                font: textFont,
                size: textSize,
                color: textColor,
                curve: textCurve,
                rotation: 0,
                x: 50,
                y: 50
            };

            const currentTexts = getCurrentTextElements();
            setCurrentTextElements([...currentTexts, newTextElement]);
        }
        setShowTextModal(false);
        setNewText('');
    };

    const handleElementClick = (element, elementType) => {
        setActiveElement({ type: elementType, id: element.id });
    };

    const handleEditText = (element) => {
        setNewText(element.text);
        setTextFont(element.font);
        setTextSize(element.size);
        setTextColor(element.color);
        setTextCurve(element.curve || 0);
        setEditingElementId(element.id);
        setShowTextModal(true);
    };

    const handleAddImage = (eventOrData) => {
        if (eventOrData.src && eventOrData.price !== undefined) {
            const currentImages = getCurrentImageElements();
            setCurrentImageElements([...currentImages, {
                id: Date.now(),
                src: eventOrData.src,
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                price: eventOrData.price,
                idEstampado: eventOrData.idEstampado || null,
                rolestampado: eventOrData.rolestampado || 'cliente'
            }]);
            setShowImageModal(false);
            return;
        }

        const file = eventOrData.target?.files[0];
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
                    height: 100,
                    price: 0,
                    idEstampado: null,
                    rolestampado: 'cliente'
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

    const handleSelectCustomDesign = (imageData) => {
        const currentImages = getCurrentImageElements();
        setCurrentImageElements([...currentImages, {
            id: Date.now(),
            src: imageData.src || imageData,
            x: 50,
            y: 50,
            width: 100,
            height: 100,
            price: imageData.price || 0,
            idEstampado: imageData.idEstampado || null,
            rolestampado: imageData.rolestampado || 'cliente'
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
                    setFabricPrice={setFabricPrice}
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
                    fabricPrice={fabricPrice}
                    getTotalPrice={getTotalPrice}
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
                    if (!show) setEditingElementId(null);
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
                textCurve={textCurve}
                setTextCurve={setTextCurve}
                handleAddText={handleAddText}
                handleAddImage={handleAddImage}
                handleAddEmoji={handleAddEmoji}
                handleSelectCustomDesign={handleSelectCustomDesign}
            />
        </div>
    );
};

export default TShirtCustomizer;