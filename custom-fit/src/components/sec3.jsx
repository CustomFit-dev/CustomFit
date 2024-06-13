import React from 'react';
import Cam from "../img/Camisa-prueba.png";
import '../css/index.css';
const Section3 = () => {
    return(
        <section className='sec3'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
            <div className='image-container' id='img-c1'>
                  <img src= {Cam} alt='Camisa custom-fit'/>
              </div>
              <h3>Camisetas</h3>
              </div>
              <div className='col'>
            <div className='image-container' id='img-c2'>
                  <img src= {Cam} alt='Camisa custom-fit'/>
              </div>
              <h3>Gorras</h3>
              </div>
              <div className='col'>
            <div className='image-container' id='img-c3'>
                  <img src= {Cam} alt='Camisa custom-fit'/>
              </div>
              <h3>Buzos</h3>
              </div>
              <div className='col'>
            <div className='image-container' id='img-c4'>
                  <img src= {Cam} alt='Camisa custom-fit'/>
              </div>
              <h3>Medias</h3>
            </div>
          </div>
        </div>
      </section>
          
    );


}


export default Section3;