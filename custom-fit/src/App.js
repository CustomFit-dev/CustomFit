import React,{ Fragment } from "react";
import Header from "./components/header.jsx"

function App() {
  return (
    <Fragment>
      <Header />
      <section className='sec1'>
        <div className='container'>
          <div className='content-container'>
            <h1>
              Encuentra la <br /> Inspiración y <br />
              <span className='highlight'>Personaliza</span> con <br /> Nosotros
            </h1>
            <div className='buttons'>
              <button className='btn btn-primary'>Diseñar ya</button>
              <button className='btn btn-secondary'>Tienda</button>
            </div>
          </div>
          <div className='image-container'>
            <img src='ruta-de-tu-imagen.png' alt='Descripción de la imagen' />
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;
