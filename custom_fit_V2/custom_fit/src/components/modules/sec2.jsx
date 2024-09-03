import React, { useEffect } from 'react';
import Cus from './mod_img/Customfit-sec2.png';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa el CSS de AOS
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';


const Section2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración de la animación
    });
  }, []);
  const { ref, inView } = useInView({
    triggerOnce: true, // Solo ejecutar la animación una vez cuando el elemento entra en el viewport
    threshold: 0.1, // Porcentaje de visibilidad requerido para considerar el elemento en vista
  });
  return (
    <div>
      <section className='sec2' id='sobre'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <h2 data-aos="fade-up"><span className='highlight'>¿Quienes somos?</span></h2>
              <br />
              <p data-aos="fade-up">En CustomFit, nos apasiona la idea de que la moda no solo sea una expresión de estilo, sino también una manifestación única de individualidad. Fundada con la visión de empoderar a cada persona para que se exprese sin límites, nuestra plataforma de personalización de ropa ofrece una experiencia sin igual en la creación de prendas únicas y significativas.</p>
            </div>
            <div className='col'>
              <div className='image-container' data-aos="zoom-in-up">
                <img src={Cus} alt='Logo custom-fit' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='container-fluid text-center' id='sec2-f'>
        <div className='row'>
          <div className='col' data-aos="zoom-in-up">
          <h1 ref={ref}>+
          {inView ? <CountUp start={0} end={380} duration={2.75} /> : '+'}
      </h1>
            <p className='highlight'><span>Clientes felices</span></p>
          </div>
          <div className='col' data-aos="zoom-in-up">
          <h1>+
              {inView ? <CountUp start={0} end={25} duration={2.75} /> : '+'}
            </h1>
            <p className='highlight'><span>Años de experiencia</span></p>
          </div>
          <div className='col' data-aos="zoom-in-up">
          <h1>+
              {inView ? <CountUp start={0} end={300} duration={2.75} /> : '+'}
            </h1>
            <p className='highlight'><span>Servicios Completados</span></p>
          </div>
          <div className='col' data-aos="zoom-in-up">
          <h1>+
              {inView ? <CountUp start={0} end={538} duration={2.75} /> : '+'}
            </h1>
            <p className='highlight'><span>Productos</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;
