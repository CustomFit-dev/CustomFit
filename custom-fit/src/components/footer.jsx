import React from 'react';
import Logo from '../img/Customfit-sec2.png';

const Foot = () => {
    return(
        <footer className="w-100 py-4 flex-shrink-0">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className='image-container'>
                        <img src= {Logo} alt='Footer Logo' />
                    </div>
                    <p>Disparando tu creatividad!<br />Custom-fit</p>
                </div>
                <div className="col">
                    <h5 className="text-white mb-3">Paginas</h5>
                    <ul className="list-unstyled text-muted">
                        <li><a href="#">Inicio</a></li>
                        <li><a href="#">Acerca de nosotros</a></li>
                        <li><a href="#">Servicios</a></li>
                        <li><a href="#">Productos</a></li>
                    </ul>
                </div>
                <div className="col">
                    <h5 className="text-white mb-3">Redes sociales</h5>
                    <ul className="list-unstyled text-muted">
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Whatsapp</a></li>
                    </ul>
                </div>
                <p className='foot-c'>Diseñado por Custom-fit &copy;</p>
            </div>
        </div>
    </footer>
    );
}


export default Foot;