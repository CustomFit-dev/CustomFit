import React, { useState } from 'react';
import '../../scss/store.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import camisa1 from '../../img/camisa1.jpg';
import camisa2 from '../../img/camisa2.jpg';
import camisa3 from '../../img/2104.jpg';
import camisa4 from '../../img/camisa4.webp';
import camisa5 from '../../img/camisa5.jpg';
import camisa6 from '../../img/camisa6.jpg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Schopcar from '../shoproducto';
import VerC from '../modules/verCamisa';



const Shop = () => {
  const [estadoModal1, cambiarEsadoModal1] = useState(false);
  const [estadoModal2, cambiarEstadoModal2] = useState(false);
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-md-12 text-center">
          <h1 className="h111">¡Te Encantará Comprar Aquí!</h1>
          <p className="sub1">Explora Nuestra Amplia Gama de Productos y Encuentra lo que Necesitas</p>
        </div>

        {/* Contenedor de las tarjetas */}
        <div className="row cajasss">
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="image-container">
                <img src={camisa1} className="card-img-top" alt="Camiseta Sencilla" style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
                <div className="hover-buttons">
                  <button className="btn-11 btn-11" onClick={() => cambiarEsadoModal1(!estadoModal1)}>Ver Detalles</button>
                  <button className="btn-22 btn-22" onClick={() => cambiarEstadoModal2(!estadoModal2)} >Ver Camisa</button>
                  <button className="btn-33 btn-33" >Comprar Ahora</button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">Camiseta Sencilla</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div className='dotos'>
                  <button className="precio btn-primary">$30.000</button>
                  <button className='carritosss'>
                    <ShoppingCartIcon className='logocar'/>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas adicionales */}
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="image-container">
                <img src={camisa2} className="card-img-top" alt="..." style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
                <div className="hover-buttons">
                <button className="btn-11 btn-11">Ver Detalles</button>
                  <button className="btn-22 btn-22">Ver Camisa</button>
                  <button className="btn-33 btn-33">Comprar Ahora</button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">Camiseta Sencilla</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div className='dotos'>
                  <button className="precio btn-primary">$30.000</button>
                  <button className='carritosss'>
                    <ShoppingCartIcon className='logocar'/>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="image-container">
                <img src={camisa3} className="card-img-top" alt="..." style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
                <div className="hover-buttons">
                <button className="btn-11 btn-11">Ver Detalles</button>
                  <button className="btn-22 btn-22">Ver Camisa</button>
                  <button className="btn-33 btn-33">Comprar Ahora</button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">Camiseta Sencilla</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div className='dotos'>
                  <button className="precio btn-primary">$30.000</button>
                  <button className='carritosss'>
                    <ShoppingCartIcon className='logocar'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Otro conjunto de tarjetas */}
        <div className="row cajasss">
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="image-container">
                <img src={camisa5} className="card-img-top" alt="..." style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
                <div className="hover-buttons">
                <button className="btn-11 btn-11">Ver Detalles</button>
                  <button className="btn-22 btn-22">Ver Camisa</button>
                  <button className="btn-33 btn-33">Comprar Ahora</button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">Camiseta Sencilla</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div className='dotos'>
                  <button className="precio btn-primary">$30.000</button>
                  <button className='carritosss'>
                    <ShoppingCartIcon className='logocar'/>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="image-container">
                <img src={camisa4} className="card-img-top" alt="..." style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
                <div className="hover-buttons">
                <button className="btn-11 btn-11">Ver Detalles</button>
                  <button className="btn-22 btn-22">Ver Camisa</button>
                  <button className="btn-33 btn-33">Comprar Ahora</button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">Camiseta Sencilla</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div className='dotos'>
                  <button className="precio btn-primary">$30.000</button>
                  <button className='carritosss'>
                    <ShoppingCartIcon className='logocar'/>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="card" style={{ width: '100%' }}>
              <div className="image-container">
                <img src={camisa6} className="card-img-top" alt="..." style={{ width: '100%', height: '250px', objectFit: 'contain' }} />
                <div className="hover-buttons">
                <button className="btn-11 btn-11">Ver Detalles</button>
                  <button className="btn-22 btn-22">Ver Camisa</button>
                  <button className="btn-33 btn-33">Comprar Ahora</button>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">Camiseta Sencilla</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <div className='dotos'>
                  <button className="precio btn-primary">$30.000</button>
                  <button className='carritosss'>
                    <ShoppingCartIcon className='logocar'/>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Schopcar
        estado={estadoModal1}
        cambiarEsado={cambiarEsadoModal1}
      />
      <VerC 
      estado={estadoModal2} 
      cambiarEstado={cambiarEstadoModal2}
      />
    </div>
  );
};

export default Shop;
