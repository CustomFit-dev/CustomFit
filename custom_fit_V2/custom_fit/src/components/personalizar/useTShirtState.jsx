import { useState } from 'react';

export const useTShirtState = () => {
    // 🔹 Configuración básica de la camiseta
    const [tshirtColor, setTshirtColor] = useState('bg-white'); // Color de camiseta
    const [fabric, setFabric] = useState(null);                 // Tipo de tela
    const [fabricPrice, setFabricPrice] = useState(0);          // Precio de la tela seleccionada
    const [size, setSize] = useState('M');                      // Talla de camiseta

    // 🔹 Vista actual (frontal, espaldar, manga derecha, manga izquierda)
    const [currentView, setCurrentView] = useState('frontal');

    // 🔹 Elementos de diseño organizados por vista
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

    // 🔹 Estados de modales (controlar ventanas emergentes)
    const [showTextModal, setShowTextModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showEmojiModal, setShowEmojiModal] = useState(false);
    const [showCustomModal, setShowCustomModal] = useState(false);

    // 🔹 Estados de formularios para añadir texto
    const [newText, setNewText] = useState('');          // Texto que escribe el usuario
    const [textFont, setTextFont] = useState('Arial');   // Fuente del texto
    const [textSize, setTextSize] = useState(20);        // Tamaño de fuente
    const [textColor, setTextColor] = useState('#000000');// Color del texto
    const [textCurve, setTextCurve] = useState(0);       // Curvatura del texto (-100 a 100)

    // --- 🔹 Funciones utilitarias ---

    // Obtiene todos los elementos de la vista actual
    const getCurrentElements = () => designElements[currentView];

    // Atajos para obtener elementos específicos
    const getCurrentTextElements = () => designElements[currentView].textElements;
    const getCurrentImageElements = () => designElements[currentView].imageElements;
    const getCurrentEmojiElements = () => designElements[currentView].emojiElements;

    // Atajos para actualizar elementos de la vista actual
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

    // Cuenta total de elementos en todas las vistas
    const getAllElementsCount = () => {
        return Object.values(designElements).reduce((total, view) => {
            return total
                + view.textElements.length
                + view.imageElements.length
                + view.emojiElements.length;
        }, 0);
    };

    // 🔹 Calcula el precio total: tela + todos los estampados
    const getTotalPrice = () => {
        // Precio de la tela
        let total = fabricPrice;

        // Sumar precios de todas las imágenes en todas las vistas
        Object.values(designElements).forEach(view => {
            view.imageElements.forEach(img => {
                total += (img.price || 0);
            });
        });

        return total;
    };

    // 🔹 Retorno del hook
    return {
        // --- Estados generales de la camiseta ---
        tshirtColor, setTshirtColor,
        fabric, setFabric,
        fabricPrice, setFabricPrice,
        size, setSize,

        // --- Vista actual ---
        currentView, setCurrentView,
        designElements, setDesignElements,

        // --- Funciones para manejar elementos de la vista actual ---
        getCurrentElements,
        getCurrentTextElements,
        getCurrentImageElements,
        getCurrentEmojiElements,
        setCurrentTextElements,
        setCurrentImageElements,
        setCurrentEmojiElements,
        getAllElementsCount,
        getTotalPrice,

        // --- Estados de modales ---
        showTextModal, setShowTextModal,
        showImageModal, setShowImageModal,
        showEmojiModal, setShowEmojiModal,
        showCustomModal, setShowCustomModal,

        // --- Estados de formularios de texto ---
        newText, setNewText,
        textFont, setTextFont,
        textSize, setTextSize,
        textColor, setTextColor,
        textCurve, setTextCurve,

        // --- Compatibilidad con componentes existentes ---
        // Estos "alias" sirven para usar este hook sin romper código previo
        textElements: getCurrentTextElements(),
        imageElements: getCurrentImageElements(),
        emojiElements: getCurrentEmojiElements(),
        setTextElements: setCurrentTextElements,
        setImageElements: setCurrentImageElements,
        setEmojiElements: setCurrentEmojiElements
    };
};
