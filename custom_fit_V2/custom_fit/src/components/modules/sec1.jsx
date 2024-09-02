import React from 'react';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom'; 

const Section = () => {
  const navigate = useNavigate();

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
        navigate('/Iniciar');
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
        navigate('/Iniciar');
      }
    });
  };

  return (
    <div className="section-container">
      <div className="overlay-div trapezoid-container">
        <div className="trapezoid"></div>
      </div>
      <section className='sec1' id='inicio'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h1>
                Encuentra la <br /> Inspiración y <br />
                <span className='highlight'>Personaliza</span> con <br /> Nosotros
              </h1>
              <div className='buttons'>
                <button className='btn btn-outline-primary' onClick={handleDesignClick}>Diseñar ya</button>
                <button className='btn btn-secondary' onClick={handleStoreClick}>Tienda</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
