    import React from 'react';
    import CustomGaleria from '../modules/ventanaCustom';
    import TextModal from '../modal/Textmodal';
    import EmojiModal from '../modal/EmojiModal';
    import ModalImageUpload from '../modal/imgModal';

    const ModalsContainer = ({
    showTextModal,
    setShowTextModal,
    showCustomModal,
    setShowCustomModal,
    showImageModal,
    setShowImageModal,
    showEmojiModal,
    setShowEmojiModal,
    newText,
    setNewText,
    textFont,
    setTextFont,
    textSize,
    setTextSize,
    textColor,
    setTextColor,
    handleAddText,
    handleAddImage,
    handleAddEmoji,
    handleSelectCustomDesign
    }) => {
    return (
        <>
        <TextModal 
            show={showTextModal}
            setShow={setShowTextModal}
            newText={newText}
            setNewText={setNewText}
            textFont={textFont}
            setTextFont={setTextFont}
            textSize={textSize}
            setTextSize={setTextSize}
            textColor={textColor}
            setTextColor={setTextColor}
            handleAddText={handleAddText}
        />

        {showCustomModal && (
            <CustomGaleria 
            onSelectImage={handleSelectCustomDesign}
            onClose={() => setShowCustomModal(false)}
            />
        )}

        <ModalImageUpload 
            show={showImageModal}
            setShowImageModal={setShowImageModal}
            handleAddImage={handleAddImage}
        />

        <EmojiModal 
            show={showEmojiModal}
            onClose={() => setShowEmojiModal(false)}
            onSelectEmoji={handleAddEmoji}
        />
        </>
    );
    };

    export default ModalsContainer;