import React from 'react';
const Section = () => {
    return(
      <div className="section-container">
          <div className="overlay-div trapezoid-container">
                <div className="trapezoid"></div>
            </div>
        <section className='sec1'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
            <h1>
              Encuentra la <br /> Inspiración y <br />
              <span className='highlight'>Personaliza</span> con <br /> Nosotros
            </h1>
            <div className='buttons'>
              <button className='btn btn-outline-primary'>Diseñar ya</button>
              <button className='btn btn-secondary'>Tienda</button>
            </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    )
}

export default Section;