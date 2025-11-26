import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import axios from "axios";

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
        getAllElementsCount,
        totalPrice,
        imageElements,
        authToken
    }
) => {
    if (!tshirtRef.current) return;

    const views = ['frontal', 'mangaDerecha', 'mangaIzquierda', 'espaldar'];
    const viewNames = {
        frontal: 'urlFrontal',
        espaldar: 'urlEspadarl',
        mangaDerecha: 'urlMangaDerecha',
        mangaIzquierda: 'urlMangaIzquierda'
    };

    const originalView = currentView;
    const uploadedUrls = {};

    Swal.fire({
        title: 'Procesando...',
        html: 'Generando imágenes y guardando tu diseño.<br>Por favor espera.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        // 1. Capturar y subir imágenes
        for (const view of views) {
            setCurrentView(view);
            await new Promise(resolve => setTimeout(resolve, 500));

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
        }

        setCurrentView(originalView);

        const estampadosIds = [];

        // 2. Mostrar formulario
        const { value: formValues } = await Swal.fire({
            title: 'Finalizar Personalización',
            html: `
                <div style="text-align: left; max-height: 400px; overflow-y: auto;">
                    <label for="swal-nombre" style="display: block; margin-bottom: 5px; font-weight: bold;">Nombre del Diseño *</label>
                    <input id="swal-nombre" class="swal2-input" placeholder="Ej: Mi Camiseta Personalizada" style="width: 90%; margin-bottom: 15px;">
                    
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Precio Total</label>
                    <input value="${totalPrice || 0} COP" class="swal2-input" readonly style="width: 90%; margin-bottom: 15px; background-color: #f0f0f0;">
                    
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Rol del Producto</label>
                    <input value="personalizado" class="swal2-input" readonly style="width: 90%; margin-bottom: 15px; background-color: #f0f0f0;">
                    
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Stock Inicial</label>
                    <input value="0" class="swal2-input" readonly style="width: 90%; margin-bottom: 15px; background-color: #f0f0f0;">
                    
                    <hr style="margin: 15px 0;">
                    <h4 style="margin-bottom: 10px;">Imágenes Generadas</h4>
                    
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Vista Frontal</label>
                    <input value="${uploadedUrls.urlFrontal || 'N/A'}" class="swal2-input" readonly style="width: 90%; margin-bottom: 10px; background-color: #f0f0f0; font-size: 11px;">
                    
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Vista Espaldar</label>
                    <input value="${uploadedUrls.urlEspadarl || 'N/A'}" class="swal2-input" readonly style="width: 90%; margin-bottom: 10px; background-color: #f0f0f0; font-size: 11px;">
                    
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Manga Derecha</label>
                    <input value="${uploadedUrls.urlMangaDerecha || 'N/A'}" class="swal2-input" readonly style="width: 90%; margin-bottom: 10px; background-color: #f0f0f0; font-size: 11px;">
                    
                    <label style="display: block; margin-bottom: 5px; font-weight: bold;">Manga Izquierda</label>
                    <input value="${uploadedUrls.urlMangaIzquierda || 'N/A'}" class="swal2-input" readonly style="width: 90%; background-color: #f0f0f0; font-size: 11px;">
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
            ...uploadedUrls,
            estampados: estampadosIds
        };

        if (!authToken) {
            throw new Error("No estás autenticado. Por favor inicia sesión.");
        }

        Swal.fire({
            title: 'Guardando...',
            text: 'Enviando tu diseño al servidor.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        const response = await axios.post('http://localhost:8000/api/personalizar/finalizar/', payload, {
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            Swal.fire({
                title: "¡Personalización Finalizada!",
                text: `Tu diseño "${formValues.nombre}" ha sido guardado exitosamente.`,
                icon: "success",
                confirmButtonText: 'Aceptar'
            });
        }

    } catch (error) {
        console.error('Error en el proceso:', error);
        console.error('Error response:', error.response?.data);
        setCurrentView(originalView);

        let errorMessage = "Hubo un problema al guardar tu diseño. Intenta nuevamente.";

        if (error.response?.data?.error) {
            errorMessage = error.response.data.error;
        } else if (error.message) {
            errorMessage = error.message;
        }

        Swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: 'Aceptar'
        });
    }
};