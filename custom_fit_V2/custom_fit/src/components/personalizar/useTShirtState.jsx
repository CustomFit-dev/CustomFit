
    import { useState } from 'react';

    export const useTShirtState = () => {
    const [tshirtColor, setTshirtColor] = useState('bg-white');
    const [fabric, setFabric] = useState(null);
    const [size, setSize] = useState('M');
    const [textElements, setTextElements] = useState([]);
    const [imageElements, setImageElements] = useState([]);
    const [emojiElements, setEmojiElements] = useState([]);

    const [showTextModal, setShowTextModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showEmojiModal, setShowEmojiModal] = useState(false);
    const [showCustomModal, setShowCustomModal] = useState(false);

    const [newText, setNewText] = useState('');
    const [textFont, setTextFont] = useState('Arial');
    const [textSize, setTextSize] = useState(20);
    const [textColor, setTextColor] = useState('#000000');

    return {
        tshirtColor, setTshirtColor,
        fabric, setFabric,
        size, setSize,
        textElements, setTextElements,
        imageElements, setImageElements,
        emojiElements, setEmojiElements,
        showTextModal, setShowTextModal,
        showImageModal, setShowImageModal,
        showEmojiModal, setShowEmojiModal,
        showCustomModal, setShowCustomModal,
        newText, setNewText,
        textFont, setTextFont,
        textSize, setTextSize,
        textColor, setTextColor
    };
    };
