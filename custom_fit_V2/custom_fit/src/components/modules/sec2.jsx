import React, { useEffect } from 'react';
import Cus from '../../img/logosec2.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import '../../scss/Sec2.scss'

const Section2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  const { ref, inView } = useInView({
    triggerOnce: true, //
    threshold: 0.1, 
  });
  return (
    <div>
      <section className='sec2' id='sobre'>
        <div className='container'>
          <div className='row'>
            <div className=' col'>
            
              <h2 data-aos="fade-right"><span className='tex1'>¿Quienes somos?</span></h2>
              <br />
              <p data-aos="fade-left" className='tex2'>En CustomFit, nos apasiona la idea de que la moda no solo sea una expresión de estilo, sino también una manifestación única de individualidad. Fundada con la visión de empoderar a cada persona para que se exprese sin límites, nuestra plataforma de personalización de ropa ofrece una experiencia sin igual en la creación de prendas únicas y significativas.</p>
            </div>
            <div className='col'>
              <div id="sec2i" className='image-container' data-aos="flip-up">
                <img src={Cus} alt='Logo custom-fit' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='container-fluid text-center' id='sec2-f'>
        <div className='row'>
          <div className='col'  data-aos="zoom-in-down">
          <h1 ref={ref}>+
          {inView ? <CountUp start={0} end={790} duration={5} /> : '+'}
      </h1>
            <p  className='hi' ><span>Clientes felices</span></p>
          </div>
          <div className='col'data-aos="zoom-in-down">
          <h1>+
              {inView ? <CountUp start={0} end={25} duration={5} /> : '+'}
            </h1>
            <p className='hi'><span>Años de experiencia</span></p>
          </div>
          <div className='col' data-aos="zoom-in-down">
          <h1>+
              {inView ? <CountUp start={0} end={602} duration={5} /> : '+'}
            </h1>
            <p className='hi'><span>Servicios Completados</span></p>
          </div>
          <div className='col' data-aos="zoom-in-down">
          <h1>+
              {inView ? <CountUp start={0} end={538} duration={5} /> : '+'}
            </h1>
            <p className='hi'><span>Productos</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;
