    import React, { useState } from 'react';
    import Swal from 'sweetalert2';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import '../../scss/propuesta.scss';

    const plantillaBase = [
    { label: 'Ninguna', src: null },
    { label: 'Opción 1', src: 'https://via.placeholder.com/100x120?text=Opcion+1' },
    { label: 'Opción 2', src: 'https://via.placeholder.com/100x120?text=Opcion+2' },
    ];

    const PropuestaDiseno = () => {
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        nombre_empresa: '',
        descripcion: '',
        cantidad: '',
        cuello: '',
        texto_personalizado: '',
        talla: '',
        tela: '',
        color: '',
    });

    const [plantillas, setPlantillas] = useState({
        Frontal: null,
        Espaldar: null,
        'Lado Derecho': null,
        'Lado Izquierdo': null,
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const nextStep = () => {
        if (step === 1 && (!formData.nombre_empresa || !formData.descripcion || !formData.cantidad)) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos del paso 1.',
            confirmButtonColor: '#0d6efd'
        });
        return;
        }
        if (step === 2 && (!formData.cuello || !formData.texto_personalizado || !formData.talla || !formData.tela || !formData.color)) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los campos del paso 2.',
            confirmButtonColor: '#0d6efd'
        });
        return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = () => {
        Swal.fire({
        icon: 'success',
        title: '¡Propuesta enviada exitosamente!',
        text: 'Nos pondremos en contacto contigo pronto por correo electrónico.',
        confirmButtonColor: '#198754'
        });
        setShowModal(false);
        setStep(1);
        setFormData({
        nombre_empresa: '',
        descripcion: '',
        cantidad: '',
        cuello: '',
        texto_personalizado: '',
        talla: '',
        tela: '',
        color: '',
        });
        setPlantillas({
        Frontal: null,
        Espaldar: null,
        'Lado Derecho': null,
        'Lado Izquierdo': null,
        });
    };

    const handlePlantillaSelect = (tipo, imagen) => {
        setPlantillas({ ...plantillas, [tipo]: imagen });
    };

    const getStepTitle = () => {
        switch(step) {
        case 1: return 'Información básica';
        case 2: return 'Detalles del producto';
        case 3: return 'Selección de plantillas';
        default: return 'Propuesta de diseño';
        }
    };

    return (
        <section className="py-5 text-center bg-light">
        <div className="container">
            <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="mb-3 fw-bold text-primary">¡Cuéntanos tu idea y la haremos realidad!</h2>
            <p className="text-muted mb-4">Personaliza tus camisetas y recibe una propuesta exclusiva diseñada especialmente para ti.</p>
            <button 
                className="btn btn-primary btn-lg px-5 py-3 shadow-sm" 
                onClick={() => setShowModal(true)}
            >
                <i className="fas fa-rocket me-2"></i>
                ¡Comenzar ahora!
            </button>
            </div>
        </div>

        {/* Modal personalizada mejorada */}
        {showModal && (
            <div className="modal-backdrop-custom" onClick={(e) => e.target.className === 'modal-backdrop-custom' && setShowModal(false)}>
            <div className="modal-container">
                <div className="modal-content-custom">
                {/* Header mejorado */}
                <div className="modal-header-custom">
                    <div className="d-flex align-items-center">
                    <div className="step-indicator me-3">
                        <span className="step-number">{step}</span>
                    </div>
                    <div>
                        <h4 className="modal-title-custom mb-1">{getStepTitle()}</h4>
                        <p className="modal-subtitle mb-0">Paso {step} de 3</p>
                    </div>
                    </div>
                    <button 
                    type="button" 
                    className="btn-close-custom" 
                    onClick={() => setShowModal(false)}
                    >
                    <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Progress bar */}
                <div className="progress-container">
                    <div className="progress">
                    <div 
                        className="progress-bar bg-primary" 
                        style={{ width: `${(step / 3) * 100}%` }}
                    ></div>
                    </div>
                </div>

                {/* Body mejorado */}
                <div className="modal-body-custom">
                    {step === 1 && (
                    <div className="step-content">
                        <div className="row g-4">
                        <div className="col-12">
                            <div className="form-floating">
                            <input 
                                type="text" 
                                className="form-control form-control-custom" 
                                id="nombre_empresa"
                                name="nombre_empresa" 
                                value={formData.nombre_empresa} 
                                onChange={handleChange}
                                placeholder="Nombre de la empresa"
                            />
                            <label htmlFor="nombre_empresa">
                                <i className="fas fa-building me-2"></i>
                                Nombre de la empresa
                            </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-floating">
                            <textarea 
                                className="form-control form-control-custom" 
                                id="descripcion"
                                name="descripcion" 
                                value={formData.descripcion} 
                                onChange={handleChange}
                                placeholder="Describe tu diseño ideal..."
                                style={{ height: '120px' }}
                            ></textarea>
                            <label htmlFor="descripcion">
                                <i className="fas fa-pencil-alt me-2"></i>
                                Descripción del diseño
                            </label>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-floating">
                            <input 
                                type="number" 
                                className="form-control form-control-custom" 
                                id="cantidad"
                                name="cantidad" 
                                value={formData.cantidad} 
                                onChange={handleChange}
                                placeholder="Cantidad"
                                min="1"
                            />
                            <label htmlFor="cantidad">
                                <i className="fas fa-hashtag me-2"></i>
                                Cantidad de camisetas
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}

                    {step === 2 && (
                    <div className="step-content">
                        <div className="row g-4">
                        <div className="col-md-6">
                            <div className="form-floating">
                            <select 
                                className="form-select form-control-custom" 
                                id="cuello"
                                name="cuello" 
                                value={formData.cuello} 
                                onChange={handleChange}
                            >
                                <option value="">Seleccione una opción</option>
                                <option value="Sí">Sí, con cuello</option>
                                <option value="No">No, sin cuello</option>
                            </select>
                            <label htmlFor="cuello">
                                <i className="fas fa-tshirt me-2"></i>
                                ¿Incluir cuello?
                            </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                            <input 
                                type="text" 
                                className="form-control form-control-custom" 
                                id="texto_personalizado"
                                name="texto_personalizado" 
                                value={formData.texto_personalizado} 
                                onChange={handleChange}
                                placeholder="Texto personalizado"
                            />
                            <label htmlFor="texto_personalizado">
                                <i className="fas fa-font me-2"></i>
                                Texto personalizado
                            </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-floating">
                            <select 
                                className="form-select form-control-custom" 
                                id="talla"
                                name="talla" 
                                value={formData.talla} 
                                onChange={handleChange}
                            >
                                <option value="">Seleccione talla</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                            </select>
                            <label htmlFor="talla">
                                <i className="fas fa-ruler me-2"></i>
                                Talla principal
                            </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-floating">
                            <input 
                                type="text" 
                                className="form-control form-control-custom" 
                                id="tela"
                                name="tela" 
                                value={formData.tela} 
                                onChange={handleChange}
                                placeholder="Tipo de tela"
                            />
                            <label htmlFor="tela">
                                <i className="fas fa-leaf me-2"></i>
                                Tipo de tela
                            </label>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-floating">
                            <input 
                                type="text" 
                                className="form-control form-control-custom" 
                                id="color"
                                name="color" 
                                value={formData.color} 
                                onChange={handleChange}
                                placeholder="Color preferido"
                            />
                            <label htmlFor="color">
                                <i className="fas fa-palette me-2"></i>
                                Color preferido
                            </label>
                            </div>
                        </div>
                        </div>
                    </div>
                    )}

                    {step === 3 && (
                    <div className="step-content">
                        <div className="text-center mb-4">
                        <h5 className="text-muted">Selecciona las plantillas para cada área de la camiseta</h5>
                        </div>
                        {Object.keys(plantillas).map((tipo, idx) => (
                        <div key={idx} className="plantilla-section mb-5">
                            <h6 className="plantilla-title">
                            <i className="fas fa-map-marker-alt me-2"></i>
                            {tipo}
                            </h6>
                            <div className="plantilla-options">
                            {plantillaBase.map((img, i) => (
                                <div
                                key={i}
                                className={`plantilla-card ${plantillas[tipo] === img.src ? 'selected' : ''}`}
                                onClick={() => handlePlantillaSelect(tipo, img.src)}
                                >
                                <div className="plantilla-image">
                                    {img.src ? (
                                    <img src={img.src} alt={img.label} />
                                    ) : (
                                    <div className="no-template">
                                        <i className="fas fa-times fa-2x"></i>
                                    </div>
                                    )}
                                </div>
                                <p className="plantilla-label">{img.label}</p>
                                {plantillas[tipo] === img.src && (
                                    <div className="selected-indicator">
                                    <i className="fas fa-check"></i>
                                    </div>
                                )}
                                </div>
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
                    )}
                </div>

                {/* Footer mejorado */}
                <div className="modal-footer-custom">
                    <div className="d-flex justify-content-between align-items-center w-100">
                    <div>
                        {step > 1 && (
                        <button className="btn btn-outline-secondary btn-lg px-4" onClick={prevStep}>
                            <i className="fas fa-arrow-left me-2"></i>
                            Atrás
                        </button>
                        )}
                    </div>
                    <div>
                        {step < 3 ? (
                        <button className="btn btn-primary btn-lg px-4" onClick={nextStep}>
                            Siguiente
                            <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                        ) : (
                        <button className="btn btn-success btn-lg px-4" onClick={handleSubmit}>
                            <i className="fas fa-paper-plane me-2"></i>
                            Enviar propuesta
                        </button>
                        )}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )}
        </section>
    );
    };

    export default PropuestaDiseno;