import React, { useState, useRef, useEffect } from 'react';
import { X, Type, Image, Smile, Move, Maximize } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/personalizar.scss'
import CamisetaBase from "../../img/camisassinfo/cam5.png";
import CamisetaRoja from "../../img/camisassinfo/cam3.png";
import CamisetaAzul from "../../img/camisassinfo/cam11.png";
import CamisetaVerde from "../../img/camisassinfo/cam7.png";
import CamisetaBlanca from "../../img/camisassinfo/cam12.png";
import CamisetaNegra from "../../img/camisassinfo/cam2.png";
import CamisetaAmarilla from "../../img/camisassinfo/cam4.png";
import '../../scss/camisaPer.scss';

const TShirtCustomizer = () => {
  // State management
  const [tshirtColor, setTshirtColor] = useState('bg-white');
  const [fabric, setFabric] = useState(null);
  const [size, setSize] = useState('M');
  const [textElements, setTextElements] = useState([]);
  const [imageElements, setImageElements] = useState([]);
  const [emojiElements, setEmojiElements] = useState([]);

  // Modals state
  const [showTextModal, setShowTextModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showEmojiModal, setShowEmojiModal] = useState(false);

  // Text modal state
  const [newText, setNewText] = useState('');
  const [textFont, setTextFont] = useState('Arial');
  const [textSize, setTextSize] = useState(20);
  const [textColor, setTextColor] = useState('#000000');

  // Drag state
  const [activeElement, setActiveElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [origPos, setOrigPos] = useState({ x: 0, y: 0 });
  const [elementSize, setElementSize] = useState({ width: 100, height: 100 });
  
  // Design area reference
  const designAreaRef = useRef(null);

  // Image upload state
  const fileInputRef = useRef(null);

  // Color options
  const colorImages = {
    "bg-danger": CamisetaRoja,
    "bg-primary": CamisetaAzul,
    "bg-success": CamisetaVerde,
    "bg-white": CamisetaBlanca,
    "bg-dark": CamisetaNegra,
    "bg-warning": CamisetaAmarilla,
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
      window.removeEventListener('mouseup', handleMouseUp);
    };
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
      y: 50
    };
    setTextElements([...textElements, newTextElement]);
    setShowTextModal(false);
    setNewText('');
  };

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
        setShowImageModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Emoji Handler
  const handleAddEmoji = (emoji) => {
    setEmojiElements([...emojiElements, {
      id: Date.now(),
      emoji: emoji,
      x: 50,
      y: 50,
      size: 48 // Default emoji size
    }]);
    setShowEmojiModal(false);
  };

  // Remove Element Handlers
  const removeTextElement = (id) => {
    setTextElements(textElements.filter(el => el.id !== id));
  };

  const removeImageElement = (id) => {
    setImageElements(imageElements.filter(el => el.id !== id));
  };

  const removeEmojiElement = (id) => {
    setEmojiElements(emojiElements.filter(el => el.id !== id));
  };

  // Emoji Picker (simplified)
  const EmojiPicker = ({ onSelect }) => {
    const emojis = ['😀', '😍', '🎉', '👍', '🌟', '🚀', '❤️', '🍕'];
    return (
      <div className="d-flex flex-wrap justify-content-center gap-2 p-4">
        {emojis.map(emoji => (
          <button 
            key={emoji} 
            onClick={() => onSelect(emoji)} 
            className="btn btn-outline-secondary fs-3"
          >
            {emoji}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container-fluid p-4">
      <div className="titulo-container">
        <h1 className="titl1">¡Crea la camiseta perfecta en tan solo 10 minutos!</h1>
        <h2 className="titl2">Selecciona el modelo, sube tu diseño y haz tu pedido</h2>
      </div>
      <div className="row">
        {/* Left Sidebar - New Layout */}
        <div className="col-md-3">
          {/* Title */}
          <div className="mb-4">
            <h4 className="fw-bold titleCam">Camisa Sencilla</h4>
          </div>

          {/* Fabric Selection */}
          <div className="contTela mb-4">
            <h5 className="fw-bold mb-3">Telas</h5>
            <div className="contela">
              {fabricOptions.slice(0, 8).map((fabricType) => (
                <button
                  key={fabricType}
                  className={`btnTela ${fabric === fabricType ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => setFabric(fabricType)}
                >
                  {fabricType}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-4">
            <h5 className="fw-bold mb-3">Tallas</h5>
            <div className="d-flex flex-wrap gap-2">
              {sizeOptions.map((sizeOption) => (
                <button
                  key={sizeOption}
                  className={`btn ${size === sizeOption ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => setSize(sizeOption)}
                >
                  {sizeOption}
                </button>
              ))}
            </div>
          </div>

          {/* Customization Buttons */}
          <h5 className="fw-bold mb-2">Personalización</h5>
          <div className="ContaSubur d-flex gap-3">
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowTextModal(true)}>
              <Type size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowImageModal(true)}>
              <Image size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowEmojiModal(true)}>
              <Smile size={20} className="me-2" />
            </button>
          </div>
        </div>

        {/* T-Shirt Display Area - Middle */}
        <div className="col-md-6">
          <div className="position-relative" style={{ height: '700px' }}>
            {/* T-shirt image */}
            <img 
              src={colorImages[tshirtColor] || CamisetaBase} 
              alt="Camiseta Base" 
              className="position-absolute top-50 start-50 translate-middle" 
              style={{ 
                objectFit: 'contain', 
                maxWidth: '80%', 
                maxHeight: '80%',
                zIndex: 1
              }} 
            />
            
            {/* Red dashed border area - Design area */}
            <div
              ref={designAreaRef}
              className="position-absolute border border-2 border-danger border-dashed"
              style={{
                width: '60%',
                height: '50%',
                top: '40%',  
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 2
              }}
            >
              {/* Text Elements */}
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
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                >
                  <div
                    onMouseDown={(e) => handleMouseDown(e, 'text', el, 'move')}
                  >
                    {el.text}
                  </div>
                  
                  {/* Controls */}
                  <div className="d-flex position-absolute top-0 end-0 transform translate-middle-y" style={{ marginTop: '-20px' }}>
                    {/* Move button */}
                    <button 
                      className="btn btn-sm btn-light border p-1 me-1"
                      onMouseDown={(e) => handleMouseDown(e, 'text', el, 'move')}
                      title="Mover"
                    >
                      <Move size={16} />
                    </button>
                    
                    {/* Resize button */}
                    <button 
                      className="btn btn-sm btn-light border p-1 me-1"
                      onMouseDown={(e) => handleMouseDown(e, 'text', el, 'resize')}
                      title="Cambiar tamaño"
                    >
                      <Maximize size={16} />
                    </button>
                    
                    {/* Delete button */}
                    <button 
                      onClick={() => removeTextElement(el.id)}
                      className="btn btn-sm btn-danger p-1"
                      title="Eliminar"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Image Elements */}
              {imageElements.map((el) => (
                <div 
                  key={el.id}
                  className={`position-absolute ${activeElement && activeElement.id === el.id ? 'border border-primary' : ''}`}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    zIndex: 3,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                >
                  <img 
                    id={`img-${el.id}`}
                    src={el.src} 
                    alt="Custom" 
                    style={{ 
                      width: el.width ? `${el.width}px` : '100px', 
                      height: el.height ? `${el.height}px` : 'auto' 
                    }}
                    onMouseDown={(e) => handleMouseDown(e, 'image', el, 'move')}
                  />
                  
                  {/* Controls */}
                  <div className="d-flex position-absolute top-0 end-0 transform translate-middle-y" style={{ marginTop: '-20px' }}>
                    {/* Move button */}
                    <button 
                      className="btn btn-sm btn-light border p-1 me-1"
                      onMouseDown={(e) => handleMouseDown(e, 'image', el, 'move')}
                      title="Mover"
                    >
                      <Move size={16} />
                    </button>
                    
                    {/* Resize button */}
                    <button 
                      className="btn btn-sm btn-light border p-1 me-1"
                      onMouseDown={(e) => handleMouseDown(e, 'image', el, 'resize')}
                      title="Cambiar tamaño"
                    >
                      <Maximize size={16} />
                    </button>
                    
                    {/* Delete button */}
                    <button 
                      onClick={() => removeImageElement(el.id)}
                      className="btn btn-sm btn-danger p-1"
                      title="Eliminar"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Emoji Elements */}
              {emojiElements.map((el) => (
                <div 
                  key={el.id}
                  className={`position-absolute ${activeElement && activeElement.id === el.id ? 'border border-primary' : ''}`}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    fontSize: `${el.size}px`,
                    zIndex: 3,
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                >
                  <div
                    onMouseDown={(e) => handleMouseDown(e, 'emoji', el, 'move')}
                  >
                    {el.emoji}
                  </div>
                  
                  {/* Controls */}
                  <div className="d-flex position-absolute top-0 end-0 transform translate-middle-y" style={{ marginTop: '-20px' }}>
                    {/* Move button */}
                    <button 
                      className="btn btn-sm btn-light border p-1 me-1"
                      onMouseDown={(e) => handleMouseDown(e, 'emoji', el, 'move')}
                      title="Mover"
                    >
                      <Move size={16} />
                    </button>
                    
                    {/* Resize button */}
                    <button 
                      className="btn btn-sm btn-light border p-1 me-1"
                      onMouseDown={(e) => handleMouseDown(e, 'emoji', el, 'resize')}
                      title="Cambiar tamaño"
                    >
                      <Maximize size={16} />
                    </button>
                    
                    {/* Delete button */}
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

        {/* Right Sidebar */}
        <div className="col-md-3">
          {/* Color Selection */}
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

          {/* Pricing Card */}
          <div className="card bg-dark text-white mb-4">
            <div className="card-body">
              <h6 className="card-title fw-bold mb-2">Detalles y Precios</h6>
              <ul className="list-unstyled">
                <li>Estampado: $2.000</li>
                <li>Logo: $1.000</li>
                <li>Texto extra: $2.000</li>
                <li>Talla extra: $5.000</li>
                <li>Tela especial: $10.000</li>
              </ul>
            </div>
          </div>

          {/* Selected Options Summary */}
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

          {/* Action Buttons */}
          <div className="d-grid gap-3">
            <button className="btn btn-success btn-lg fw-bold">
              Comprar
            </button>
            <button className="btn btn-primary btn-lg fw-bold">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>

      {/* Text Modal */}
      {showTextModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Texto</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowTextModal(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Texto"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <select 
                    className="form-select"
                    value={textFont}
                    onChange={(e) => setTextFont(e.target.value)}
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Cursive">Cursive</option>
                    <option value="Fantasy">Fantasy</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input 
                    type="number" 
                    className="form-control"
                    min="10" 
                    max="50" 
                    value={textSize}
                    onChange={(e) => setTextSize(Number(e.target.value))}
                    placeholder="Tamaño"
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="color" 
                    className="form-control form-control-color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowTextModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleAddText}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Subir Imagen</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowImageModal(false)}
                />
              </div>
              <div className="modal-body">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleAddImage}
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowImageModal(false)}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => fileInputRef.current.click()}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emoji Modal */}
      {showEmojiModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Seleccionar Emoji</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEmojiModal(false)}
                />
              </div>
              <div className="modal-body">
                <EmojiPicker onSelect={handleAddEmoji} />
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowEmojiModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS styles for resize handles */}
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
      `}</style>
    </div>
  );
};

export default TShirtCustomizer;