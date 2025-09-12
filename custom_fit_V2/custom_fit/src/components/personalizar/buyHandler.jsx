
    import html2canvas from "html2canvas";
    import Swal from "sweetalert2";

    export const handleBuy = async (tshirtRef, { size, fabric, tshirtColor, textElements, imageElements, emojiElements }) => {
    if (!tshirtRef.current) return;

    const canvas = await html2canvas(tshirtRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.download = "camiseta.png";
    link.href = imgData;
    link.click();

    Swal.fire({
        title: "¡Camiseta lista para comprar!",
        html: `
        <p><strong>Talla:</strong> ${size}</p>
        <p><strong>Tela:</strong> ${fabric || 'No seleccionada'}</p>
        <p><strong>Color:</strong> ${tshirtColor}</p>
        <p><strong>Elementos:</strong> ${textElements.length + imageElements.length + emojiElements.length}</p>
        <img src="${imgData}" alt="Diseño" style="width:100%;border:1px solid #ccc;border-radius:10px;margin-top:10px"/>
        `,
        width: '600px',
        confirmButtonText: 'Perfecto',
        customClass: {
        popup: 'rounded-xl'
        }
    });
    };