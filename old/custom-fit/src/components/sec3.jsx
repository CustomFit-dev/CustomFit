import React from 'react';
import '../css/index.css';
const Section3 = () => {
    return(
        <section className='sec3' id='prod'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
            <div className='image-container' id='img-c1'>
              </div>
              <h3>Camisetas</h3>
              </div>
              <div className='col'>
            <div className='image-container' id='img-c2'>
              </div>
              <h3>Gorras</h3>
              </div>
              <div className='col'>
            <div className='image-container' id='img-c3'>
              </div>
              <h3>Buzos</h3>
              </div>
              <div className='col' id='col-4'>
            <div className='image-container' id='img-c4'>
              </div>
              <h3>Medias</h3>
            </div>
          </div>
        </div>
      </section>
          
    );


}


export default Section3;