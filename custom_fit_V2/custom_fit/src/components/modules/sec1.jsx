import React, { useState } from 'react';
import Swal from 'sweetalert2'; 
import Typewriter from 'typewriter-effect';
import Form_I from './Iniciar'; // Asegúrate de que la ruta sea correcta
import '../../scss/Sec1.scss';  



const Section = () => {
  const [showForm, setShowForm] = useState(false);

  const handleDesignClick = () => {
    Swal.fire({
      title: 'Atención',
      text: 'Por favor, inicie sesión para acceder a la función de diseño.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iniciar sesión',
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
    }).then((result) => {
      if (result.isConfirmed) {
        setShowForm(true); // Muestra el formulario
      }
    });
  };

  const handleStoreClick = () => {
    Swal.fire({
      title: 'Atención',
      text: 'Por favor, inicie sesión para acceder a nuestra tienda.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Iniciar sesión',
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#aaa',
    }).then((result) => {
      if (result.isConfirmed) {
        setShowForm(true); // Muestra el formulario
      }
    });
  };

  const handleCloseForm = () => {
    setShowForm(false); // Oculta el formulario de inicio de sesión
  };

  return (
    <div className="section-container">
      {showForm && (
        <div className="form-overlay">
          <Form_I onClose={handleCloseForm} /> {/* Pasamos la función para cerrar el formulario */}
        </div>
      )}
      <div className={`overlay-div trapezoid-container ${showForm ? 'blurred' : ''}`}>
        <div className="trapezoid"></div>
      </div>
      <section className={`sec1 ${showForm ? 'blurred' : ''}`} id='inicio'>
        <div className='container'> 
          <div className='row'>
            <div className='col'>
              <span className='maquina'>
                <Typewriter 
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('Bienvenido a <br/><span style="color: #00a99d;">Custom Fit</span>')
                      .pauseFor(2000)
                      .deleteAll()
                      .typeString('Encuentra la<br/>Inspiracion y<br/><span style="color: #00a99d;">Personaliza</span> con<br/> Nosotros')
                      .start();
                  }}
                />
              </span>
              <div className='buttons'>
                <button className='btn btn-secondary' data-aos="fade-right" onClick={handleDesignClick}>Diseñar ya</button>
                <button className='btn btn-secondary' data-aos="fade-right" onClick={handleStoreClick}>Tienda</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
