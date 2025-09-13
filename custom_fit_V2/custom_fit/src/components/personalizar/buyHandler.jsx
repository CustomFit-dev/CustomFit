import html2canvas from "html2canvas";
import Swal from "sweetalert2";

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
        getAllElementsCount 
    }
) => {
    if (!tshirtRef.current) return;

    const views = ['frontal', 'espaldar', 'mangaDerecha', 'mangaIzquierda'];
    const viewNames = {
        frontal: 'Frontal',
        espaldar: 'Espaldar', 
        mangaDerecha: 'Manga_Derecha',
        mangaIzquierda: 'Manga_Izquierda'
    };

    const downloadedImages = [];
    const originalView = currentView;

    try {
        // Crear las imágenes de cada vista
        for (const view of views) {
            // Cambiar a la vista actual
            setCurrentView(view);
            
            // Esperar un momento para que React actualice el DOM
            await new Promise(resolve => setTimeout(resolve, 500));

            // Capturar la imagen de esta vista
            const canvas = await html2canvas(tshirtRef.current, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                logging: false,
                useCORS: true,
                allowTaint: true
            });

            const imgData = canvas.toDataURL("image/png");
            downloadedImages.push({
                view: view,
                name: viewNames[view],
                data: imgData
            });

            // Descargar la imagen automáticamente
            const link = document.createElement("a");
            link.download = `camiseta_${viewNames[view]}.png`;
            link.href = imgData;
            link.click();
        }

        // Restaurar la vista original
        setCurrentView(originalView);

        // Crear un ZIP con todas las imágenes (opcional, requiere JSZip)
        // Si tienes JSZip instalado, puedes descommentar esto:
        /*
        const JSZip = require('jszip');
        const zip = new JSZip();
        
        downloadedImages.forEach(img => {
            const base64Data = img.data.split(',')[1];
            zip.file(`${img.name}.png`, base64Data, {base64: true});
        });

        const zipContent = await zip.generateAsync({type: "blob"});
        const zipLink = document.createElement("a");
        zipLink.download = "camiseta_completa.zip";
        zipLink.href = URL.createObjectURL(zipContent);
        zipLink.click();
        */

        // Crear el HTML para mostrar todas las imágenes en el modal
        const imagesHTML = downloadedImages.map(img => 
            `<div style="margin-bottom: 15px;">
                <h6 style="color: #333; margin-bottom: 5px;">${img.name}</h6>
                <img src="${img.data}" alt="${img.name}" style="width:100%; max-width:200px; border:1px solid #ccc; border-radius:8px;"/>
            </div>`
        ).join('');

        // Mostrar el modal con todas las vistas
        Swal.fire({
            title: "¡Diseños descargados!",
            html: `
                <div style="text-align: left;">
                    <p><strong>Talla:</strong> ${size}</p>
                    <p><strong>Tela:</strong> ${fabric || 'No seleccionada'}</p>
                    <p><strong>Color:</strong> ${tshirtColor}</p>
                    <p><strong>Total elementos:</strong> ${getAllElementsCount ? getAllElementsCount() : 0}</p>
                    <p><strong>Vistas descargadas:</strong> ${downloadedImages.length}</p>
                    <hr style="margin: 15px 0;"/>
                    <h6 style="color: #333; margin-bottom: 15px;">Vista previa de todos los diseños:</h6>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-height: 400px; overflow-y: auto;">
                        ${imagesHTML}
                    </div>
                </div>
            `,
            width: '800px',
            confirmButtonText: 'Perfecto',
            customClass: {
                popup: 'rounded-xl'
            }
        });

    } catch (error) {
        console.error('Error al generar las imágenes:', error);
        
        // Restaurar la vista original en caso de error
        setCurrentView(originalView);
        
        Swal.fire({
            title: "Error",
            text: "Hubo un problema al generar las imágenes. Por favor, intenta nuevamente.",
            icon: "error",
            confirmButtonText: 'Entendido'
        });
    }
};