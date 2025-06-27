// ModalEmoji.jsx
import React from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const ModalEmoji = ({ show, onClose, onSelectEmoji }) => {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar Emoji</h5>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          
          <div className="modal-body">
            <Picker
              data={data}
              onEmojiSelect={(emoji) => onSelectEmoji(emoji.native)}
              previewPosition="none"
              theme="light" // Puedes cambiar a "dark" si usas tema oscuro
              perLine={8}
            />
          </div>
          
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ModalEmoji;
