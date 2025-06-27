import React, { useState, useRef, useEffect } from 'react';
import { X, Type, Image, Smile, Move, Maximize } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomGaleria from './ventanaCustom';
import '../../scss/personalizar.scss'
import Custom from '@mui/icons-material/DashboardCustomize';
import CamisetaBase from "../../img/camisassinfo/camisablanca.png";
import CamisetaRoja from "../../img/camisassinfo/CamisaRoja.png";
import CamisetaAzul from "../../img/camisassinfo/CamisaAzu.png";
import CamisetaVerde from "../../img/camisassinfo/CamisaVerde.png";
import CamisetaBlanca from "../../img/camisassinfo/camisablanca.png";
import CamisetaNegra from "../../img/camisassinfo/CamisaNegra.png";
import CamisetaAmarilla from "../../img/camisassinfo/camisaamarillo.png";
import CamisetaGris from "../../img/camisassinfo//camisagris.png";
import CamisetaCafe from "../../img/camisassinfo/camisacafe.png";
import CamisetaLila from "../../img/camisassinfo/camisalila.png";
import CamisetaBeige from "../../img/camisassinfo/camisabeige.png";
import CamisetaTurquesa from "../../img/camisassinfo/camisaTurquesa.png";
import CamisetaFucsia from "../../img/camisassinfo/camisaFucsia.png";
import '../../scss/camisaPer.scss';
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import TextModal from '../modal/Textmodal'; 
import EmojiModal from '../modal/EmojiModal'; 
import ModalImageUpload from '../modal/imgModal'

const TShirtCustomizer = () => {
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

  const [activeElement, setActiveElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [origPos, setOrigPos] = useState({ x: 0, y: 0 });
  const [elementSize, setElementSize] = useState({ width: 100, height: 100 });
  
  const designAreaRef = useRef(null);
  const tshirtRef = useRef(null);

  const fileInputRef = useRef(null);

  const colorImages = {
    "bg-danger": CamisetaRoja,
    "bg-primary": CamisetaAzul,
    "bg-success": CamisetaVerde,
    "bg-white": CamisetaBlanca,
    "bg-dark": CamisetaNegra,
    "bg-warning": CamisetaAmarilla,
    "bg-secondary": CamisetaGris,
    "bg-brown": CamisetaCafe,
    "bg-lila": CamisetaLila,
    "bg-beige": CamisetaBeige,
    "bg-turquoise": CamisetaTurquesa,
    "bg-fuchsia": CamisetaFucsia,
  };
  
  const handleBuy = async () => {
  if (!tshirtRef.current) return;

  const canvas = await html2canvas(tshirtRef.current, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.download = "camiseta.png";
  link.href = imgData;
  link.click();

  Swal.fire({
    title: "¡Camiseta lista para comprar!",
    html: `
      <p><strong>Talla:</strong> ${size}</p>
      <p><strong>Tela:</strong> ${fabric || 'No seleccionada'}</p>
      <p><strong>Color:</strong> ${tshirtColor}</p>
      <p><strong>Elementos:</strong> ${textElements.length + imageElements.length + emojiElements.length}</p>
      <img src="${imgData}" alt="Diseño" style="width:100%;border:1px solid #ccc;border-radius:10px;margin-top:10px"/>
    `,
    width: '600px',
    confirmButtonText: 'Perfecto',
    customClass: {
      popup: 'rounded-xl'
    }
  });
};

  const handleSelectCustomDesign = (imageSrc) => {
    // Crear un nuevo elemento de imagen con la imagen seleccionada
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

  // Size options
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

  // Fabric options
  const fabricOptions = [
    'Filtrar', 'Algodón', 'Seda', 'Borrego', 
    'Lino', 'Poliéster', 'Lana', 'Piel'
  ];

  // Mouse down handler
  const handleMouseDown = (e, elementType, element, action) => {
    e.stopPropagation();
    
    const designArea = designAreaRef.current;
    const designAreaRect = designArea.getBoundingClientRect();
    
    setActiveElement({ type: elementType, id: element.id });
    
    if (action === 'move') {
      setIsDragging(true);
      setStartPos({
        x: e.clientX,
        y: e.clientY
      });
      
      // Set original position relative to design area
      setOrigPos({
        x: element.x,
        y: element.y
      });
    } else if (action === 'resize') {
      setIsResizing(true);
      setStartPos({
        x: e.clientX,
        y: e.clientY
      });
      
      // Set original size
      if (elementType === 'image') {
        const imgElement = document.getElementById(`img-${element.id}`);
        setElementSize({
          width: imgElement.width,
          height: imgElement.height
        });
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

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!activeElement || (!isDragging && !isResizing)) return;
    
    if (isDragging) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      
      if (activeElement.type === 'text') {
        setTextElements(prevElements => 
          prevElements.map(el => 
            el.id === activeElement.id 
              ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
              : el
          )
        );
      } else if (activeElement.type === 'image') {
        setImageElements(prevElements => 
          prevElements.map(el => 
            el.id === activeElement.id 
              ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
              : el
          )
        );
      } else if (activeElement.type === 'emoji') {
        setEmojiElements(prevElements => 
          prevElements.map(el => 
            el.id === activeElement.id 
              ? { ...el, x: origPos.x + dx, y: origPos.y + dy } 
              : el
          )
        );
      }
    } else if (isResizing) {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      const aspectRatio = elementSize.width / elementSize.height;
      
      // Calculate new size maintaining aspect ratio for images
      let newWidth = Math.max(20, elementSize.width + dx);
      let newHeight;
      
      if (activeElement.type === 'image') {
        newHeight = newWidth / aspectRatio;
        
        setImageElements(prevElements => 
          prevElements.map(el => 
            el.id === activeElement.id 
              ? { ...el, width: newWidth, height: newHeight } 
              : el
          )
        );
      } else if (activeElement.type === 'emoji') {
        const newSize = Math.max(20, elementSize.width + dx);
        
        setEmojiElements(prevElements => 
          prevElements.map(el => 
            el.id === activeElement.id 
              ? { ...el, size: newSize } 
              : el
          )
        );
      } else if (activeElement.type === 'text') {
        const newSize = Math.max(10, elementSize.width + dx * 0.5);
        
        setTextElements(prevElements => 
          prevElements.map(el => 
            el.id === activeElement.id 
              ? { ...el, size: newSize } 
              : el
          )
        );
      }
    }
  };
  // Mouse up handler
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setActiveElement(null);
  };
  // Add event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);};
  }, [isDragging, isResizing, activeElement, startPos, origPos, elementSize]);
  // Add Text Handler
  const handleAddText = () => {
    const newTextElement = {
      id: Date.now(),
      text: newText,
      font: textFont,
      size: textSize,
      color: textColor,
      x: 50,
      y: 50};
    setTextElements([...textElements, newTextElement]);
    setShowTextModal(false);
    setNewText('');};
  // Add Image Handler
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
        setShowImageModal(false);};
      reader.readAsDataURL(file);}
  };
  const handleAddEmoji = (emoji) => {
    setEmojiElements([...emojiElements, {
      id: Date.now(),
      emoji: emoji,
      x: 50,
      y: 50,
      size: 48 // Default emoji size
    }]);
    setShowEmojiModal(false);};
  // Remove Element Handlers
  const removeTextElement = (id) => {
    setTextElements(textElements.filter(el => el.id !== id));};
  const removeImageElement = (id) => {
    setImageElements(imageElements.filter(el => el.id !== id));};
  const removeEmojiElement = (id) => {
    setEmojiElements(emojiElements.filter(el => el.id !== id));};
  // Emoji Picker (simplified)
  const EmojiPicker = ({ onSelect }) => {
    const emojis = ['😀', '😍', '🎉', '👍', '🌟', '🚀', '❤️', '🍕'];
    return (
      <div className="d-flex flex-wrap justify-content-center gap-2 p-4">
        {emojis.map(emoji => (
          <button 
            key={emoji} 
            onClick={() => onSelect(emoji)} 
            className="btn btn-outline-secondary fs-3">
            {emoji}
          </button>
        ))}
      </div>
    );
  };
  return (
    <div className="container-fluid p-4" id='Contapersonalizar'>
      <div className="titulo-container">
        <h1 className="titl1">¡Crea la camiseta perfecta en tan solo 10 minutos!</h1>
        <h2 className="titl2">Selecciona el modelo, sube tu diseño y haz tu pedido</h2>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="mb-4">
            <h4 className="fw-bold titleCam">Camisa Sencilla</h4>
          </div>
          <div className="contTela mb-4">
            <h5 className="fw-bold mb-3">Telas</h5>
            <div className="contela">
              {fabricOptions.slice(0, 8).map((fabricType) => (
                <button
                key={fabricType}
                className={`btnTela ${fabric === fabricType ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setFabric(fabricType)}
                style={fabric === fabricType ? { backgroundColor: '#17BEBB', border: 'none'} : {}}>
                {fabricType}
              </button>))}
            </div>
          </div>
          <div className="mb-4">
            <h5 className="fw-bold mb-3">Tallas</h5>
            <div className="d-flex flex-wrap gap-2">
              {sizeOptions.map((sizeOption) => (
                <button
                  key={sizeOption}
                  className={`btn ${size === sizeOption ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => setSize(sizeOption)}
                  style={size === sizeOption ? { backgroundColor: '#17BEBB', border: 'none' } : {}}>
                  {sizeOption}</button>))}
            </div>
          </div>
          <h5 className="fw-bold mb-2">Personalización</h5>
          <div className="ContaSubur d-flex gap-3">
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowTextModal(true)}>
              <Type size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowCustomModal(true)}>
              <Custom size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowImageModal(true)}>
              <Image size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowEmojiModal(true)}>
              <Smile size={20} className="me-2" />
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="position-relative" style={{ height: '700px', width: '100%' }} ref={tshirtRef}>
            <div 
              className="tshirt-container position-relative" 
              style={{ 
                height: '100%', 
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>
              <img 
                ref={tshirtRef}
                src={colorImages[tshirtColor] || CamisetaBase} 
                alt="Camiseta Base" 
                className="position-relative" 
                style={{ 
                  width: '100%',   /* Increased size */
                  maxWidth: '120%',   /* Increased size */
                  maxHeight: '140%',  /* Increased size */
                  zIndex: 1}} />
              <div
                ref={designAreaRef}
                className="position-absolute border border-2 border-danger border-dashed"
                style={{
                  width: '55%',      /* Adjusted size */
                  height: '70%',     /* Adjusted size */
                  top: '55%',        /* Positioned in the middle of the shirt */
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 2,
                  overflow: 'visible',}}>
                {textElements.map((el) => (
                  <div 
                    key={el.id}
                    className={`position-absolute ${activeElement && activeElement.id === el.id ? 'border border-primary' : ''}`}
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      fontFamily: el.font,
                      fontSize: `${el.size}px`,
                      color: el.color,
                      zIndex: 3,
                      cursor: isDragging ? 'grabbing' : 'grab'}}>
                    <div
                      onMouseDown={(e) => handleMouseDown(e, 'text', el, 'move')}>
                      {el.text}
                    </div>
                    <div className="d-flex position-absolute top-0 end-0 transform translate-middle-y" style={{ marginTop: '-20px' }}>
                      <button 
                        className="btn btn-sm btn-light border p-1 me-1"
                        onMouseDown={(e) => handleMouseDown(e, 'text', el, 'move')}
                        title="Mover">
                        <Move size={16} />
                      </button>
                      <button 
                        className="btn btn-sm btn-light border p-1 me-1"
                        onMouseDown={(e) => handleMouseDown(e, 'text', el, 'resize')}
                        title="Cambiar tamaño">
                        <Maximize size={16} />
                      </button>
                      <button 
                        onClick={() => removeTextElement(el.id)}
                        className="btn btn-sm btn-danger p-1"
                        title="Eliminar"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>))}
                {imageElements.map((el) => (
                  <div 
                    key={el.id}
                    className={`position-absolute ${activeElement && activeElement.id === el.id ? 'border border-primary' : ''}`}
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      zIndex: 3,
                      cursor: isDragging ? 'grabbing' : 'grab'}}>
                    <img 
                      id={`img-${el.id}`}
                      src={el.src} 
                      alt="Custom" 
                      style={{ 
                        width: el.width ? `${el.width}px` : '100px', 
                        height: el.height ? `${el.height}px` : 'auto' }}
                      onMouseDown={(e) => handleMouseDown(e, 'image', el, 'move')}/>
                    <div className="d-flex position-absolute top-0 end-0 transform translate-middle-y" style={{ marginTop: '-20px' }}>
                      <button 
                        className="btn btn-sm btn-light border p-1 me-1"
                        onMouseDown={(e) => handleMouseDown(e, 'image', el, 'move')}
                        title="Mover">
                        <Move size={16} />
                      </button> 
                      <button 
                        className="btn btn-sm btn-light border p-1 me-1"
                        onMouseDown={(e) => handleMouseDown(e, 'image', el, 'resize')}
                        title="Cambiar tamaño">
                        <Maximize size={16} />
                      </button>
                      <button 
                        onClick={() => removeImageElement(el.id)}
                        className="btn btn-sm btn-danger p-1"
                        title="Eliminar">
                        <X size={16} />
                      </button>
                    </div>
                  </div>))}
                {emojiElements.map((el) => (
                  <div 
                    key={el.id}
                    className={`position-absolute ${activeElement && activeElement.id === el.id ? 'border border-primary' : ''}`}
                    style={{
                      left: `${el.x}px`,
                      top: `${el.y}px`,
                      fontSize: `${el.size}px`,
                      zIndex: 3,
                      cursor: isDragging ? 'grabbing' : 'grab'}}>
                    <div onMouseDown={(e) => handleMouseDown(e, 'emoji', el, 'move')}>
                      {el.emoji}
                    </div>
                    <div className="d-flex position-absolute top-0 end-0 transform translate-middle-y" style={{ marginTop: '-20px' }}>
                      <button 
                        className="btn btn-sm btn-light border p-1 me-1"
                        onMouseDown={(e) => handleMouseDown(e, 'emoji', el, 'move')}
                        title="Mover">
                        <Move size={16} />
                      </button>
                      <button 
                        className="btn btn-sm btn-light border p-1 me-1"
                        onMouseDown={(e) => handleMouseDown(e, 'emoji', el, 'resize')}
                        title="Cambiar tamaño">
                        <Maximize size={16} />
                      </button>
                      <button 
                        onClick={() => removeEmojiElement(el.id)}
                        className="btn btn-sm btn-danger p-1"
                        title="Eliminar"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="mb-4">
            <h5 className="fw-bold mb-2">Colores de Camiseta</h5>
            <div className="d-flex flex-wrap gap-2">
              {Object.entries(colorImages).map(([colorClass, imageSrc]) => (
                <button 
                  key={colorClass} 
                  className={`btn ${colorClass} rounded-circle`}
                  style={{ width: '3rem', height: '3rem' }}
                  title={colorClass}
                  onClick={() => setTshirtColor(colorClass)}
                />
              ))}
            </div>
          </div>
          <div className="card bg-dark text-white mb-4">
          <div className="card-body">
         <h6 className="card-title fw-bold mb-2">Hazla tuya</h6>
          <ul className="list-unstyled">
            <li>🎨 Personaliza el diseño</li>
            <li>🖼️ Agrega imágenes o logos</li>
            <li>✍️ Escribe tu propio texto</li>
            <li>📏 Elige la talla perfecta</li>
            <li>🧵 Escoge entre telas exclusivas</li>
          </ul>
          </div>
            </div>
          <div className="card mb-4">
            <div className="card-body">
              <h6 className="card-title fw-bold mb-2">Tu Selección</h6>
              <ul className="list-unstyled">
                <li><strong>Talla:</strong> {size}</li>
                <li><strong>Tela:</strong> {fabric || 'No seleccionada'}</li>
                <li><strong>Elementos:</strong> {textElements.length + imageElements.length + emojiElements.length}</li>
              </ul>
            </div>
          </div>
          <div className="d-grid gap-3">
            <button className="btn btn-success btn-lg fw-bold" onClick={handleBuy}>
              Comprar
            </button>
            <button className="btn btn-primary btn-lg fw-bold">
              Agregar al Carrito
            </button>
            <span style={{ fontFamily: textFont }}>
              Fuente seleccionada: <strong>{textFont}</strong>
            </span>
          </div>
        </div>
      </div>    
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
      <style jsx>{`
        .cursor-move {
          cursor: move;
        }
        
        .resize-handle {
          position: absolute;
          width: 10px;
          height: 10px;
          background-color: white;
          border: 1px solid blue;
          border-radius: 50%;
        }

        /* Additional styles to make sure the t-shirt container occupies full available space */
        .tshirt-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};
export default TShirtCustomizer;