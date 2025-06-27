import React, { useRef } from 'react';

const ModalImageUpload = ({ show, setShowImageModal, handleAddImage }) => {
  const fileInputRef = useRef();

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
              className="btn btn-primary"
              onClick={() => fileInputRef.current.click()}
            >
              Aplicar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalImageUpload;
