import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

// Función auxiliar para subir a Cloudinary
const uploadToCloudinary = async (blob) => {
  const data = new FormData();
  data.append('file', blob);
  data.append('upload_preset', 'customfit_upload');
  data.append('cloud_name', 'dxaooh0kz');
  data.append('folder', 'productos_personalizados');

  try {
    const res = await axios.post('https://api.cloudinary.com/v1_1/dxaooh0kz/image/upload', data);
    return res.data.secure_url;
  } catch (err) {
    console.error('Error uploading to Cloudinary:', err);
    return null;
  }
};

// Helper para convertir SVGs a imágenes antes de capturar
const convertSvgsToImages = async (element) => {
  const svgs = element.querySelectorAll('svg');
  const replacements = [];

  for (const svg of svgs) {
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    const rect = svg.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    await new Promise((resolve, reject) => {
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = reject;
      img.src = url;
    });

    const replacementImg = document.createElement('img');
    replacementImg.src = canvas.toDataURL('image/png');
    replacementImg.style.width = `${rect.width}px`;
    replacementImg.style.height = `${rect.height}px`;
    replacementImg.style.position = 'absolute';
    replacementImg.style.left = svg.style.left;
    replacementImg.style.top = svg.style.top;
    replacementImg.style.transform = svg.style.transform;
    replacementImg.className = svg.className;

    replacements.push({ parent: svg.parentNode, old: svg, new: replacementImg });
    svg.parentNode.replaceChild(replacementImg, svg);
  }
  return replacements;
};

const restoreSvgs = (replacements) => {
  replacements.forEach(({ parent, old, new: replacement }) => {
    if (parent.contains(replacement)) parent.replaceChild(old, replacement);
  });
};

// handleBuy depurado
export const handleBuy = async (
  tshirtRef,
  designAreaRef,
  {
    size,
    fabric,
    tshirtColor,
    designElements,
    currentView,
    setCurrentView,
    totalPrice,
    imageElements,
    authToken,
    lastSavedDesign,
    setLastSavedDesign
  },
  cart,       // <--- pasar cart como parámetro
  formData,   // <--- pasar formData como parámetro
  paypalData  // <--- pasar data de PayPal como parámetro
) => {
  if (!tshirtRef.current) return;

  const currentDesignSignature = JSON.stringify({
    size,
    fabricId: fabric?.idTela,
    tshirtColor,
    designElements
  });

  if (lastSavedDesign === currentDesignSignature) {
    Swal.fire({
      icon: 'info',
      title: 'Sin cambios',
      text: 'Este diseño ya ha sido guardado. Realiza alguna modificación para guardar una nueva versión.'
    });
    return;
  }

  const views = ['frontal', 'mangaDerecha', 'mangaIzquierda', 'espaldar'];
  const viewNames = {
    frontal: 'urlFrontal',
    espaldar: 'urlEspaldar',
    mangaDerecha: 'urlMangaDerecha',
    mangaIzquierda: 'urlMangaIzquierda'
  };

  const originalView = currentView;
  const uploadedUrls = {};

  Swal.fire({
    title: 'Procesando...',
    html: 'Generando imágenes y guardando tu diseño.<br>Por favor espera.',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  try {
    // 1. Capturar y subir imágenes
    for (const view of views) {
      setCurrentView(view);
      await new Promise(resolve => setTimeout(resolve, 500));

      const replacements = await convertSvgsToImages(tshirtRef.current);

      try {
        const canvas = await html2canvas(tshirtRef.current, {
          backgroundColor: null,
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true
        });

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        const url = await uploadToCloudinary(blob);
        if (!url) throw new Error(`Error al subir imagen de ${view}`);

        uploadedUrls[viewNames[view]] = url;
      } finally {
        restoreSvgs(replacements);
      }
    }

    setCurrentView(originalView);

    const estampadosIds = imageElements
      .filter(img => img.idEstampado)
      .map(img => img.idEstampado);

    const { value: formValues } = await Swal.fire({
      title: 'Finalizar Personalización',
      html: `
        <div style="text-align: left;">
          <label for="swal-nombre" style="display: block; margin-bottom: 5px; font-weight: bold;">Nombre del Diseño *</label>
          <input id="swal-nombre" class="swal2-input" placeholder="Ej: Mi Camiseta Personalizada" style="width: 90%; margin-bottom: 15px;">
          <p style="font-size: 0.9em; color: #666; margin-top: 10px;">
            Configuración actual: <strong>Talla:</strong> ${size || 'No seleccionada'} | 
            <strong>Color:</strong> ${tshirtColor || 'No seleccionado'} | 
            <strong>Tela:</strong> ${fabric?.NombreTela || 'No seleccionada'}
            <br>
            <strong>Precio Total:</strong> ${totalPrice || 0} COP
          </p>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar Diseño',
      cancelButtonText: 'Cancelar',
      width: '600px',
      preConfirm: () => {
        const nombre = document.getElementById('swal-nombre').value;
        if (!nombre || nombre.trim() === '') {
          Swal.showValidationMessage('Por favor ingresa un nombre para tu diseño');
          return false;
        }
        return { nombre: nombre.trim() };
      }
    });

    if (!formValues) {
      Swal.fire({
        title: 'Cancelado',
        text: 'No se guardó la personalización.',
        icon: 'info'
      });
      return;
    }

    const payload = {
      NombrePersonalizado: formValues.nombre,
      precioPersonalizado: totalPrice || 0,
      rolProducto: 'personalizado',
      stock: 0,
      productos_idProductos: 2,
      talla: size || null,
      color: tshirtColor || null,
      telaid: fabric?.idTela || null,
      ...uploadedUrls,
      estampados: estampadosIds
    };

    if (!authToken) throw new Error("No estás autenticado. Por favor inicia sesión.");

    Swal.fire({
      title: 'Guardando...',
      text: 'Enviando tu diseño al servidor.',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });

    const response = await axios.post(
      `${API_URL}personalizar/finalizar/`,
      payload,
      { headers: { Authorization: `Token ${authToken}` } }
    );

    if (response.status === 201) {
      setLastSavedDesign(currentDesignSignature);
      Swal.fire({
        title: "¡Personalización Finalizada!",
        text: `Tu diseño "${formValues.nombre}" ha sido guardado exitosamente.`,
        icon: "success",
        confirmButtonText: 'Aceptar'
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error en el proceso:', error);
    setCurrentView(originalView);

    let errorMessage = "Hubo un problema al guardar tu diseño. Intenta nuevamente.";
    if (error.response?.data?.error) errorMessage = error.response.data.error;
    else if (error.message) errorMessage = error.message;

    Swal.fire({
      title: "Error",
      text: errorMessage,
      icon: "error",
      confirmButtonText: 'Aceptar'
    });
  }
};
