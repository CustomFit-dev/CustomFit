import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../scss/personalizar.scss'

const TShirtCustomizer = () => {
  // State management
  const [tshirtColor, setTshirtColor] = useState('bg-white');
  const [fabric, setFabric] = useState(null);
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
  const [draggedElement, setDraggedElement] = useState(null);

  // Image upload state
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Color options
  const colorOptions = [
    { class: 'bg-danger', name: 'Rojo' }, 
    { class: 'bg-primary', name: 'Azul' }, 
    { class: 'bg-success', name: 'Verde' }, 
    { class: 'bg-white text-dark', name: 'Blanco' }, 
    { class: 'bg-dark', name: 'Negro' }, 
    { class: 'bg-warning', name: 'Amarillo' }
  ];

  // Fabric options
  const fabricOptions = [
    'Filtrar', 'Algodón', 'Seda', 'Borrego', 
    'Lino', 'Poliéster', 'Lana', 'Piel'
  ];

  // Drag handling functions
  const handleDragStart = (e, elementType, element) => {
    setDraggedElement({ type: elementType, element });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedElement) {
      setDraggedElement(null);
    }
  };

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
          y: 50
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
      y: 50
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
        {/* T-Shirt Display Area */}
        <div className="col-md-8 pe-md-4">
          <div 
            className={`position-relative border border-2 border-danger border-dashed ${tshirtColor}`}
            style={{ height: '500px' }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Draggable Elements (Text, Images, Emojis) */}
            {textElements.map((el) => (
              <div 
                key={el.id}
                draggable
                onDragStart={(e) => handleDragStart(e, 'text', el)}
                className="position-absolute cursor-move"
                style={{
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  fontFamily: el.font,
                  fontSize: `${el.size}px`,
                  color: el.color
                }}
              >
                {el.text}
                <button 
                  onClick={() => removeTextElement(el.id)}
                  className="btn btn-danger btn-sm position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {/* Similar modifications for image and emoji elements */}
            {imageElements.map((el) => (
              <div 
                key={el.id}
                draggable
                onDragStart={(e) => handleDragStart(e, 'image', el)}
                className="position-absolute cursor-move"
                style={{
                  left: `${el.x}px`,
                  top: `${el.y}px`
                }}
              >
                <img 
                  src={el.src} 
                  alt="Custom" 
                  className="mw-100 mh-100" 
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
                <button 
                  onClick={() => removeImageElement(el.id)}
                  className="btn btn-danger btn-sm position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
                >
                  <X size={16} />
                </button>
              </div>
            ))}

            {emojiElements.map((el) => (
              <div 
                key={el.id}
                draggable
                onDragStart={(e) => handleDragStart(e, 'emoji', el)}
                className="position-absolute cursor-move"
                style={{
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  fontSize: '3rem'
                }}
              >
                {el.emoji}
                <button 
                  onClick={() => removeEmojiElement(el.id)}
                  className="btn btn-danger btn-sm position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Color Selection */}
          <div className="mt-4">
            <h5 className="fw-bold mb-2">Colores de Camiseta</h5>
            <div className="d-flex gap-2">
              {colorOptions.map(color => (
                <button 
                  key={color.name} 
                  className={`btn ${color.class} rounded-circle`}
                  style={{ width: '3rem', height: '3rem' }}
                  title={color.name}
                  onClick={() => setTshirtColor(color.class)}
                />
              ))}
            </div>
          </div>

          {/* Fabric Selection */}
          <div className="mt-4">
            <h5 className="fw-bold mb-2">Telas</h5>
            <div className="d-flex flex-wrap gap-2">
              {fabricOptions.map(fabricType => (
                <button 
                  key={fabricType} 
                  className={`btn ${fabric === fabricType 
                    ? 'btn-primary' 
                    : 'btn-outline-secondary'}`}
                  onClick={() => setFabric(fabricType)}
                >
                  {fabricType}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-md-4">
          {/* Customization Buttons */}
          <div className="d-grid gap-3">
            <button 
              className="btn btn-success"
              onClick={() => setShowTextModal(true)}
            >
              Agregar Texto
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => setShowImageModal(true)}
            >
              Subir Imagen
            </button>
            <button 
              className="btn btn-warning"
              onClick={() => setShowEmojiModal(true)}
            >
              Agregar Emoji
            </button>
          </div>

          {/* Pricing Card */}
          <div className="card bg-dark text-white mt-4">
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

          {/* Action Buttons */}
          <div className="d-grid gap-3 mt-4">
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
    </div>
  );
};

export default TShirtCustomizer;