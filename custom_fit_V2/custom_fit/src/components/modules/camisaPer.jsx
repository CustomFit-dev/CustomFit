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
  } = useTShirtState();

  const tshirtRef = useRef(null);
  const designAreaRef = useRef(null);

  const {
    activeElement,
    isDragging,
    handleMouseDown
  } = useDragAndResize({
    textElements,
    setTextElements,
    imageElements,
    setImageElements,
    emojiElements,
    setEmojiElements,
    designAreaRef
  });

  const handleBuyClick = () => {
    handleBuy(tshirtRef, { size, fabric, tshirtColor, textElements, imageElements, emojiElements });
  };

  const handleAddText = () => {
    const newTextElement = {
      id: Date.now(),
      text: newText,
      font: textFont,
      size: textSize,
      color: textColor,
      x: 50,
      y: 50
    };
    setTextElements([...textElements, newTextElement]);
    setShowTextModal(false);
    setNewText('');
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageElements([...imageElements, {
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
    setEmojiElements([...emojiElements, {
      id: Date.now(),
      emoji: emoji,
      x: 50,
      y: 50,
      size: 48
    }]);
    setShowEmojiModal(false);
  };

  const handleSelectCustomDesign = (imageSrc) => {
    setImageElements([...imageElements, {
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
    setTextElements(textElements.filter(el => el.id !== id));
  };

  const removeImageElement = (id) => {
    setImageElements(imageElements.filter(el => el.id !== id));
  };

  const removeEmojiElement = (id) => {
    setEmojiElements(emojiElements.filter(el => el.id !== id));
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
          textElements={textElements}
          imageElements={imageElements}
          emojiElements={emojiElements}
          activeElement={activeElement}
          isDragging={isDragging}
          handleMouseDown={handleMouseDown}
          removeTextElement={removeTextElement}
          removeImageElement={removeImageElement}
          removeEmojiElement={removeEmojiElement}
        />

        <InfoPanel
          tshirtColor={tshirtColor}
          setTshirtColor={setTshirtColor}
          size={size}
          fabric={fabric}
          textElements={textElements}
          imageElements={imageElements}
          emojiElements={emojiElements}
          textFont={textFont}
          handleBuyClick={handleBuyClick}
        />
      </div>

      <ModalsContainer
        showTextModal={showTextModal}
        setShowTextModal={setShowTextModal}
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