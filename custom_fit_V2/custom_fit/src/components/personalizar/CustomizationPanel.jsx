    import React from 'react';
    import { Type, Image, Smile } from 'lucide-react';
    import Custom from '@mui/icons-material/DashboardCustomize';

    const CustomizationPanel = ({
    fabric,
    setFabric,
    size,
    setSize,
    setShowTextModal,
    setShowCustomModal,
    setShowImageModal,
    setShowEmojiModal
    }) => {
    const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
    const fabricOptions = [
        'Filtrar', 'Algodón', 'Seda', 'Borrego', 
        'Lino', 'Poliéster', 'Lana', 'Piel'
    ];

    return (
        <div className="col-md-3">
        <div className="mb-4">
            <h4 className="fw-bold titleCam">Camisa Sencilla</h4>
        </div>
        
        <div className="contTela mb-4">
            <h5 className="fw-bold mb-3">Telas</h5>
            <div className="contela">
            {fabricOptions.slice(0, 8).map((fabricType) => (
                <button
                key={fabricType}
                className={`btnTela ${fabric === fabricType ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setFabric(fabricType)}
                style={fabric === fabricType ? { backgroundColor: '#17BEBB', border: 'none'} : {}}>
                {fabricType}
                </button>
            ))}
            </div>
        </div>
        
        <div className="mb-4">
            <h5 className="fw-bold mb-3">Tallas</h5>
            <div className="d-flex flex-wrap gap-2">
            {sizeOptions.map((sizeOption) => (
                <button
                key={sizeOption}
                className={`btn ${size === sizeOption ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setSize(sizeOption)}
                style={size === sizeOption ? { backgroundColor: '#17BEBB', border: 'none' } : {}}>
                {sizeOption}
                </button>
            ))}
            </div>
        </div>
        
        <h5 className="fw-bold mb-2">Personalización</h5>
        <div className="ContaSubur d-flex gap-3">
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowTextModal(true)}>
            <Type size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowCustomModal(true)}>
            <Custom size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowImageModal(true)}>
            <Image size={20} className="me-2" />
            </button>
            <button className="btnCustom d-flex align-items-center" onClick={() => setShowEmojiModal(true)}>
            <Smile size={20} className="me-2" />
            </button>
        </div>
        </div>
    );
    };

    export default CustomizationPanel;