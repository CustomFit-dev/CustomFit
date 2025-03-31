// DeleteAccountModule.jsx
import React from 'react';
import { AlertCircle } from 'lucide-react';


const DeleteAccountModule = () => {
  return (
    <div className="module-container">
      <h3 className="module-title">Eliminar Cuenta</h3>
      
      <div className="alert-box">
        <AlertCircle size={24} />
        <div className="alert-content">
          <h4>Esta acción es permanente</h4>
          <p>Si eliminas tu cuenta, perderás todos tus datos, incluyendo historial de compras, diseños guardados y datos personales.</p>
        </div>
      </div>
      
      <div className="form-container">
        <div className="form-group">
          <label>Por favor, cuéntanos por qué quieres eliminar tu cuenta:</label>
          <select>
            <option>Selecciona un motivo</option>
            <option>No estoy satisfecho con el servicio</option>
            <option>He creado otra cuenta</option>
            <option>Problemas de privacidad</option>
            <option>Otro motivo</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Comentarios adicionales (opcional)</label>
          <textarea placeholder="Cuéntanos más sobre tu decisión..."></textarea>
        </div>
        
        <div className="form-group">
          <label>Para confirmar, escribe "ELIMINAR" en el campo de abajo:</label>
          <input type="text" placeholder="ELIMINAR" />
        </div>
        
        <div className="form-group">
          <label>Introduce tu contraseña:</label>
          <input type="password" placeholder="Contraseña" />
        </div>
        
        <div className="form-actions delete-actions">
          <button className="btn btn-danger">Eliminar cuenta permanentemente</button>
          <button className="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModule;