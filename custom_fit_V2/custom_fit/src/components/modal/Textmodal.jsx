import React from 'react';

const fonts = [
  'Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Georgia', 'Times New Roman',
  'Courier New', 'Lucida Console', 'Cursive', 'Fantasy', 'Monospace', 'Comic Sans MS', 'Impact',
  'Pacifico', 'Lobster', 'Sacramento', 'Dancing Script', 'Permanent Marker', 'Press Start 2P',
  'Staatliches', 'Great Vibes', 'Indie Flower', 'Satisfy', 'Shadows Into Light', 'Handlee'
];

const TextModal = ({
  show,
  setShow,
  newText,
  setNewText,
  textFont,
  setTextFont,
  textSize,
  setTextSize,
  textColor,
  setTextColor,
  handleAddText
}) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Agregar Texto</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShow(false)}
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
                {fonts.map((font) => (
                  <option key={font} value={font} style={{ fontFamily: font }}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                min="10"
                max="100"
                value={textSize}
                onChange={(e) => setTextSize(Number(e.target.value))}
                placeholder="Tamaño (px)"
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

            <div className="mb-3">
              <label className="form-label">Vista previa:</label>
              <div
                className="p-2 border rounded"
                style={{
                  fontFamily: textFont,
                  fontSize: `${textSize}px`,
                  color: textColor,
                  backgroundColor: '#f8f9fa'
                }}
              >
                {newText || 'Tu texto aparecerá aquí'}
              </div>
            </div>
          </div>

          <div className="modal-footer">
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
  );
};

export default TextModal;
