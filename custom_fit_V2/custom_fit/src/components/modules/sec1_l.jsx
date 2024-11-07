import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Typewriter from 'typewriter-effect';

const Section = () => {
  const navigate = useNavigate();

  const handleDesignClick = () => {
    // Dejar vacío para implementar más tarde
  };

  const handleStoreClick = () => {
    navigate('/store'); // Redirige a la ruta '/store'
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
