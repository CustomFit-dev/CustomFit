import React from 'react';
import Swal from 'sweetalert2'; 
import { useNavigate } from 'react-router-dom'; 
import Typewriter from 'typewriter-effect';
import '../../scss/Sec1.scss'

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
    <div className="section-container" >
      <div className="overlay-div trapezoid-container">
        <div className="trapezoid"></div>
      </div>
      <section className='sec1' id='inicio'>
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
                      
                      .typeString(
                        'Encuentra la<br/>Inspiracion y<br/><span style="color: #00a99d;">Personaliza</span> con<br/> Nosotros'
                      )
                      .start();
                  }}
                />
    </span>
              <div className='buttons'>
                <button className='btn btn-outline-primary' data-aos="fade-right" onClick={handleDesignClick}>Diseñar ya</button>
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
