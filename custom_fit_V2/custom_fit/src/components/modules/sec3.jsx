import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../scss/sec3.scss';

const Section3 = () => {
  // Inicializa AOS cuando el componente se monta
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación
      easing: 'ease-in-out', // Easing de la animación
      once: true, // Animación solo una vez
    });
  }, []); // Solo se ejecuta una vez al montar el componente

  return (
    <section className="sec3" id="prod" data-aos="zoom-in">
      <div className="sec3texto">
        <h1>¡Hazlo Tuyo!</h1>
        <h2>Tu Estilo en Camisetas, a un Click de Distancia</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="main1">
              <div data-aos="fade-up" className="caj1"></div>
              <div data-aos="fade-down" className="caj2"></div>
              <div data-aos="fade-up" className="caj3"></div>
              <div data-aos="fade-down" className="caj4"></div>
              <div data-aos="fade-up" className="caj6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
