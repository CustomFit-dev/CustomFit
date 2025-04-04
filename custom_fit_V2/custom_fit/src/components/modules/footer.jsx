import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logocustomfit.png';


const Foot = () => {
    return (
        <footer className="w-100 py-4 flex-shrink-0">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className='image-container'>
                            <img src={Logo} alt='Footer Logo' />
                        </div>
                    </div>
                    <div className="col">
                        <h5 className="text-white mb-3">Páginas</h5>
                        <ul className="list-unstyled text-muted">
                            <li><Link to="#">Inicio</Link></li>
                            <li><Link to="#">Acerca de nosotros</Link></li>
                            <li><Link to="#">Servicios</Link></li>
                            <li><Link to="#">Productos</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h5 className="text-white mb-3">Redes sociales</h5>
                        <ul className="list-unstyled text-muted">
                            <li><Link to="#">Facebook</Link></li>
                            <li><Link to="#">Instagram</Link></li>
                            <li><Link to="#">Whatsapp</Link></li>
                        </ul>
                    </div>
                    <p className='foot-c'>Diseñado por Custom-fit &copy;</p>
                </div>
            </div>
        </footer>
    );
}

export default Foot;
