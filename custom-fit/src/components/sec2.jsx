import React from 'react';
import Cus from '../img/Customfit-sec2.png';

let ClientesF = 300;
let AñosEx = 25;
let ServicioC = 300;
let Productos = 538;


const Section2 = () => {
    return(
    <div>
        <section className='sec2' id='sobre'>
          <div className='container'>
          <div className='row'>
            <div className='col'>
            <h2><span className='highlight'>¿Quienes somos?</span></h2>
            <br />
            <p>En CustomFit, nos apasiona la idea de que la moda no solo sea una expresión de estilo, sino también una manifestación única de individualidad. Fundada con la visión de empoderar a cada persona para que se exprese sin límites, nuestra plataforma de personalización de ropa ofrece una experiencia sin igual en la creación de prendas únicas y significativas.</p>
            </div>
            <div className='col'>
            <div className='image-container' >
                  <img src= {Cus} alt='Logo custom-fit'/>
              </div>
            </div>
          </div>
          </div>
        </section>
        <div className='container-fluid text-center' id='sec2-f'>
            <div className='row'>
                <div className='col'>
                    <h1>+{ClientesF}</h1>
                    <p className='highlight'><span>Clientes felices</span></p>
                </div>
                <div className='col'>
                    <h1>+{AñosEx}</h1>
                    <p className='highlight'><span>Años de experiencia</span></p>
                </div>
                <div className='col'>
                    <h1>+{ServicioC}</h1>
                    <p className='highlight'><span>Servicios Completados</span></p>
                </div>
                <div className='col'>
                    <h1>+{Productos}</h1>
                    <p className='highlight'><span>Productos</span></p>
                </div>
            </div>
        </div>
    </div>
    );
}


export default Section2;


    