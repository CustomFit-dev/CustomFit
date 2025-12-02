import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useAuth } from '../modules/authcontext';

const ModalImageUpload = ({ show, setShowImageModal, handleAddImage }) => {
  const fileInputRef = useRef();
  const { authToken } = useAuth();

  const [formData, setFormData] = useState({
    NombreEstampado: '',
    TipoEstampado: '',
    ColorEstampado: '',
    rolestampado: 'cliente'
  });

  const [printSize, setPrintSize] = useState(''); // 'pequeno' | 'grande'
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  if (!show) return null;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleVerify = () => {
    if (!imageFile) {
      Swal.fire('Atención', 'Por favor sube una imagen primero', 'warning');
      return;
    }

    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      const maxDim = Math.max(width, height);

      let size = '';
      let price = 0;

      // Logic: < 1000px is small, >= 1000px is large
      if (maxDim < 1000) {
        size = 'pequeno';
        price = 3000;
      } else {
        size = 'grande';
        price = 20000;
      }

      setPrintSize(size);
      setCalculatedPrice(price);
      setIsVerified(true);

      Swal.fire({
        icon: 'info',
        title: 'Verificación Completada',
        text: `Dimensiones: ${width}x${height}px. Clasificado como: ${size === 'pequeno' ? 'Pequeño' : 'Grande'}. Precio: $${price.toLocaleString()}`,
        timer: 2000,
        showConfirmButton: false
      });
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setIsVerified(false); // Reset verification if image changes
      setPrintSize('');
      setCalculatedPrice(0);
    }
  };

  const uploadToCloudinary = async () => {
    if (!imageFile) return null;
    const data = new FormData();
    data.append('file', imageFile);
    data.append('upload_preset', 'customfit_upload');
    data.append('cloud_name', 'dxaooh0kz');
    data.append('folder', 'estampados');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dxaooh0kz/image/upload', {
        method: 'POST',
        body: data,
      });
      const uploaded = await res.json();
      return uploaded.secure_url;
    } catch (err) {
      console.error('Error uploading to Cloudinary:', err);
      return null;
    }
  };

  const handleSave = async () => {
    // Validation
    if (!isVerified) {
      Swal.fire('Atención', 'Debes verificar el precio antes de guardar', 'warning');
      return;
    }
    if (!formData.NombreEstampado || !formData.TipoEstampado || !imageFile) {
      Swal.fire('Error', 'Por favor completa todos los campos e imagen', 'error');
      return;
    }

    setLoading(true);

    try {
      // 1. Upload to Cloudinary
      const imageUrl = await uploadToCloudinary();
      if (!imageUrl) {
        throw new Error('Fallo la subida de imagen');
      }

      // 2. Prepare data for backend
      const dataToSend = {
        NombreEstampado: formData.NombreEstampado,
        TipoEstampado: formData.TipoEstampado,
        rolestampado: formData.rolestampado,
        PrecioEstampado: calculatedPrice,
        ImgEstampado: imageUrl,
        ColorEstampado: formData.ColorEstampado || 'N/A'
      };

      // 3. Save to backend
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}estampados/create/`,
      dataToSend,
      {
        headers: {
          Authorization: `Token ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Estampado creado:', response.data);


      // Capture the idEstampado from the response
      const savedStamp = response.data;
      const idEstampado = savedStamp.idEstampado;

      Swal.fire('Éxito', 'Estampado guardado correctamente', 'success');

      // 4. Add to shirt with price, idEstampado, and rolestampado
      if (handleAddImage) {
        handleAddImage({
          src: imageUrl,
          price: calculatedPrice,
          idEstampado: idEstampado,
          rolestampado: formData.rolestampado
        });
      }

      setShowImageModal(false);

      // Reset form
      setFormData({
        NombreEstampado: '',
        TipoEstampado: '',
        ColorEstampado: '',
        rolestampado: 'cliente'
      });
      setPrintSize('');
      setCalculatedPrice(0);
      setImageFile(null);
      setPreviewUrl(null);
      setIsVerified(false);

    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'No se pudo guardar el estampado', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-white">

          <div className="modal-header border-secondary">
            <h5 className="modal-title">Guardar Nuevo Estampado</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowImageModal(false)}
            />
          </div>

          <div className="modal-body">
            <div className="row">
              {/* Left Column: Form */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Nombre del Estampado</label>
                  <input
                    type="text"
                    className="form-control"
                    name="NombreEstampado"
                    value={formData.NombreEstampado}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de Estampado</label>
                  <input
                    type="text"
                    className="form-control"
                    name="TipoEstampado"
                    value={formData.TipoEstampado}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Color Predominante</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ColorEstampado"
                    value={formData.ColorEstampado}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Tamaño Detectado</label>
                  <input
                    type="text"
                    className="form-control"
                    value={isVerified ? (printSize === 'pequeno' ? 'Pequeño (<1000px)' : 'Grande (>=1000px)') : '---'}
                    readOnly
                    disabled
                  />
                </div>

                <div className="mb-3 d-flex gap-2 align-items-end">
                  <div className="flex-grow-1">
                    <label className="form-label">Precio</label>
                    <input
                      type="text"
                      className="form-control"
                      value={isVerified ? `$${calculatedPrice.toLocaleString()}` : '---'}
                      readOnly
                      disabled
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-info"
                    onClick={handleVerify}
                  >
                    Verificar
                  </button>
                </div>
              </div>

              {/* Right Column: Image Upload & Preview */}
              <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div
                  className="border border-secondary rounded d-flex align-items-center justify-content-center mb-3"
                  style={{ width: '100%', height: '250px', overflow: 'hidden', backgroundColor: '#2c2c2c' }}
                >
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  ) : (
                    <span className="text-muted">Vista previa</span>
                  )}
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="modal-footer border-secondary">
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
              onClick={handleSave}
              disabled={loading || !isVerified}
            >
              {loading ? 'Guardando...' : 'Guardar y Agregar'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalImageUpload;
