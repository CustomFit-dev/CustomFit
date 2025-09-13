    import { useState } from 'react';

    export const useTShirtState = () => {
        const [tshirtColor, setTshirtColor] = useState('bg-white');
        const [fabric, setFabric] = useState(null);
        const [size, setSize] = useState('M');
        
        // Estado actual de la vista
        const [currentView, setCurrentView] = useState('frontal');
        
        // Elementos de diseño organizados por vista
        const [designElements, setDesignElements] = useState({
            frontal: {
                textElements: [],
                imageElements: [],
                emojiElements: []
            },
            espaldar: {
                textElements: [],
                imageElements: [],
                emojiElements: []
            },
            mangaDerecha: {
                textElements: [],
                imageElements: [],
                emojiElements: []
            },
            mangaIzquierda: {
                textElements: [],
                imageElements: [],
                emojiElements: []
            }
        });

        // Estados para modales
        const [showTextModal, setShowTextModal] = useState(false);
        const [showImageModal, setShowImageModal] = useState(false);
        const [showEmojiModal, setShowEmojiModal] = useState(false);
        const [showCustomModal, setShowCustomModal] = useState(false);

        // Estados para formularios
        const [newText, setNewText] = useState('');
        const [textFont, setTextFont] = useState('Arial');
        const [textSize, setTextSize] = useState(20);
        const [textColor, setTextColor] = useState('#000000');

        // Funciones para obtener elementos de la vista actual
        const getCurrentElements = () => designElements[currentView];
        
        const getCurrentTextElements = () => designElements[currentView].textElements;
        const getCurrentImageElements = () => designElements[currentView].imageElements;
        const getCurrentEmojiElements = () => designElements[currentView].emojiElements;

        // Funciones para actualizar elementos de la vista actual
        const setCurrentTextElements = (elements) => {
            setDesignElements(prev => ({
                ...prev,
                [currentView]: {
                    ...prev[currentView],
                    textElements: elements
                }
            }));
        };

        const setCurrentImageElements = (elements) => {
            setDesignElements(prev => ({
                ...prev,
                [currentView]: {
                    ...prev[currentView],
                    imageElements: elements
                }
            }));
        };

        const setCurrentEmojiElements = (elements) => {
            setDesignElements(prev => ({
                ...prev,
                [currentView]: {
                    ...prev[currentView],
                    emojiElements: elements
                }
            }));
        };

        // Función para obtener todos los elementos (para el conteo total)
        const getAllElementsCount = () => {
            return Object.values(designElements).reduce((total, view) => {
                return total + view.textElements.length + view.imageElements.length + view.emojiElements.length;
            }, 0);
        };

        return {
            // Estados originales
            tshirtColor, setTshirtColor,
            fabric, setFabric,
            size, setSize,
            
            // Nuevos estados para multi-vista
            currentView, setCurrentView,
            designElements, setDesignElements,
            
            // Funciones para elementos actuales
            getCurrentElements,
            getCurrentTextElements,
            getCurrentImageElements,
            getCurrentEmojiElements,
            setCurrentTextElements,
            setCurrentImageElements,
            setCurrentEmojiElements,
            getAllElementsCount,
            
            // Estados de modales
            showTextModal, setShowTextModal,
            showImageModal, setShowImageModal,
            showEmojiModal, setShowEmojiModal,
            showCustomModal, setShowCustomModal,
            
            // Estados de formularios
            newText, setNewText,
            textFont, setTextFont,
            textSize, setTextSize,
            textColor, setTextColor,
            
            // Para compatibilidad con componentes existentes
            textElements: getCurrentTextElements(),
            imageElements: getCurrentImageElements(),
            emojiElements: getCurrentEmojiElements(),
            setTextElements: setCurrentTextElements,
            setImageElements: setCurrentImageElements,
            setEmojiElements: setCurrentEmojiElements
        };
    };