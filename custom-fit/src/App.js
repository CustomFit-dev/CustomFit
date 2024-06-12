import React,{ Fragment } from "react";
import Header from "./components/header.jsx";
import Cam from "./img/Camisa-prueba.png";
function App() {
  return (
    <Fragment>
      <Header />
      <section className='sec1'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
            <h1>
              Encuentra la <br /> Inspiración y <br />
              <span className='highlight'>Personaliza</span> con <br /> Nosotros
            </h1>
            <div className='buttons'>
              <button className='btn btn-primary'>Diseñar ya</button>
              <button className='btn btn-secondary'>Tienda</button>
            </div>
            </div>
            <div className="col" id="col2">
              <div className="image-container">
                  <img src= {Cam} />
              </div>

            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default App;
