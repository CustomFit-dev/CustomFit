import React, { useState } from 'react';
import { FaTimes, FaShoppingCart, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';

const ProductModal = ({ isOpen, onClose, product, onViewProduct }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen || !product) return null;

  const handleQuantityChange = (increment) => {
    const newQuantity = increment ? quantity + 1 : Math.max(1, quantity - 1);
    setQuantity(newQuantity);
  };

  const addToCart = () => {
    alert(`Agregado al carrito: ${product.titulo} x${quantity} - Talla: ${selectedSize}`);
    onClose();
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % (product.images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + (product.images?.length || 1)) % (product.images?.length || 1));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-content">
          <div className="modal-image">
            <img 
              src={product.images?.[currentImage] || product.imagen} 
              alt={product.titulo} 
            />
            {product.images?.length > 1 && (
              <>
                <button className="nav-btn prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                  <FaChevronLeft />
                </button>
                <button className="nav-btn next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
          
          <div className="modal-details">
            <div className="modal-header">
              <h2>{product.titulo}</h2>
              <button 
                className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
            
            <p className="price">${product.precio.toLocaleString()}</p>
            
            <div className="description">
              <h4>Descripción</h4>
              <p>{product.descripcion}</p>
            </div>
            
            <div className="options">
              {product.tallas && (
                <div className="option">
                  <label>Talla</label>
                  <div className="size-options">
                    {product.tallas.map((talla) => (
                      <button 
                        key={talla}
                        className={`size-btn ${selectedSize === talla ? 'active' : ''}`}
                        onClick={() => setSelectedSize(talla)}
                      >
                        {talla}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {product.colores && (
                <div className="option">
                  <label>Color</label>
                  <div className="color-options">
                    {product.colores.map((color) => (
                      <button
                        key={color}
                        className="color-btn"
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      >
                        {selectedColor === color && <span className="selected">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="option">
                <label>Cantidad</label>
                <div className="quantity-selector">
                  <button onClick={() => handleQuantityChange(false)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(true)}>+</button>
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="btn-add-to-cart" onClick={addToCart}>
                <FaShoppingCart /> Agregar al carrito
              </button>
              <button className="btn-buy-now" onClick={onViewProduct}>
                Ver producto
              </button>
            </div>
            
            <div className="product-meta">
              <div className="meta-item">
                <span>Disponibilidad:</span>
                <span className="in-stock">En stock ({product.stock || 10} unidades)</span>
              </div>
              <div className="meta-item">
                <span>Categoría:</span>
                <span>{product.categoria || 'Camisetas'}</span>
              </div>
              <div className="meta-item">
                <span>SKU:</span>
                <span>{product.sku || `CF-${product.id.toString().padStart(3, '0')}`}</span>
              </div>
            </div>
            
            <div className="share-section">
              <span>Compartir:</span>
              <div className="share-buttons">
                <button><AiOutlineShareAlt /> Facebook</button>
                <button><AiOutlineShareAlt /> Twitter</button>
                <button><AiOutlineShareAlt /> WhatsApp</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
