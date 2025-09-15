import React, { useEffect, useState } from 'react';
import Cus from '../../img/logocustomfit.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import '../../scss/Sec2.scss';
import { Tabs, Tab, Box, } from '@mui/material';

const Section2 = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 10, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="customfit info tabs">
          <Tab label="¿Quiénes somos?" sx={{ color: 'white' }} />
          <Tab label="Nuestra Misión" sx={{ color: 'white' }} />
          <Tab label="Nuestros Valores" sx={{ color: 'white' }} />
        </Tabs>
      </Box>

      <div className='sec2' id='sobre'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              {value === 0 && (
                <>
                  <h2 data-aos="fade-right"><span className='tex1'>¿Quiénes somos?</span></h2>
                  <p data-aos="fade-left" className='tex2'>En CustomFit, creemos que la moda va más allá de una simple elección de vestimenta; es una poderosa herramienta de expresión personal y autenticidad. Nuestra empresa nació con la firme convicción de que cada individuo merece la libertad de diseñar y vestir prendas que reflejen su esencia, su estilo y su identidad sin limitaciones.

Nos dedicamos a ofrecer una plataforma innovadora y accesible que permite a nuestros clientes personalizar su vestimenta de manera única y significativa. A través de tecnología avanzada y materiales de alta calidad, garantizamos que cada prenda diseñada no solo sea una manifestación de creatividad, sino también un símbolo de exclusividad y sofisticación.

</p>
                </>
              )}
              {value === 1 && (
                <>
                  <h2 data-aos="fade-right"><span className='tex1'>Nuestra Misión</span></h2>
                  <p data-aos="fade-left" className='tex2'>En CustomFit, nuestra misión es transformar la manera en que las personas experimentan la moda, brindándoles las herramientas y la libertad para diseñar prendas personalizadas que reflejen su identidad, creatividad y estilo único.

Nos comprometemos a ofrecer una plataforma innovadora que combine tecnología de vanguardia, materiales de alta calidad y un proceso intuitivo de personalización, permitiendo que cada cliente cree piezas exclusivas que se adapten a su personalidad y necesidades.

A través de un enfoque centrado en la sostenibilidad, la accesibilidad y la excelencia, buscamos democratizar la moda personalizada, empoderando a nuestros usuarios para que expresen su individualidad sin límites y sin barreras.</p>
                </>
              )}
              {value === 2 && (
                <>
                  <h2 data-aos="fade-right"><span className='tex1'>Nuestros Valores</span></h2>
 <p data-aos="fade-left" className='tex2'>
  En CustomFit, nos regimos por principios fundamentales que definen nuestra identidad y guían cada una de nuestras decisiones:<br /><br />

  🔹 <strong>Personalización y Creatividad</strong><br />
  Ofrecemos herramientas innovadoras para que cada persona diseñe prendas únicas y refleje su estilo sin límites.<br></br>
  🔹 <strong>Calidad y Excelencia</strong><br />
  Cada prenda está diseñada con altos estándares de calidad, asegurando durabilidad, comodidad y satisfacción.<br />
  🔹 <strong>Compromiso con el Cliente
  </strong><br />
  Escuchamos a nuestros clientes y mejoramos continuamente para ofrecerles una experiencia inigualable en moda personalizada.
</p>

                </>
              )}
            </div>
            <div className='col'>
              <div id="sec2i" className='image-container' data-aos="flip-up">
                <img src={Cus} alt='Logo CustomFit' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid text-center' id='sec2-f'>
        <div className='row'>
          <div className='col' data-aos="zoom-in-down">
            <h1 ref={ref}>+{inView ? <CountUp start={0} end={790} duration={5} /> : '+'}</h1>
            <p className='hi'><span>Clientes felices</span></p>
          </div>
          <div className='col' data-aos="zoom-in-down">
            <h1>+{inView ? <CountUp start={0} end={25} duration={5} /> : '+'}</h1>
            <p className='hi'><span>Años de experiencia</span></p>
          </div>
          <div className='col' data-aos="zoom-in-down">
            <h1>+{inView ? <CountUp start={0} end={602} duration={5} /> : '+'}</h1>
            <p className='hi'><span>Servicios Completados</span></p>
          </div>
          <div className='col' data-aos="zoom-in-down">
            <h1>+{inView ? <CountUp start={0} end={538} duration={5} /> : '+'}</h1>
            <p className='hi'><span>Productos</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;