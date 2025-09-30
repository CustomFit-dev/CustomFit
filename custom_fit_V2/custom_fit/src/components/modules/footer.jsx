import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logocustomfit.png';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaChevronRight } from 'react-icons/fa';

const Foot = () => {
    return (
        <footer className="w-100 py-4 flex-shrink-0">
            <div className="container">
                <div className="row align-items-start footer-top g-4">
                    <div className="col-12 col-md-4">
                        <div className='image-container'>
                            <img src={Logo} alt='Footer Logo' />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <h5 className="text-white mb-3 footer-title">Páginas</h5>
                        <ul className="list-unstyled footer-links">
                            <li className="footer-link-item">
                                <FaChevronRight className="link-icon" />
                                <Link to="/Home">Inicio</Link>
                            </li>
                            <li className="footer-link-item">
                                <FaChevronRight className="link-icon" />
                                <Link to="#">Acerca de nosotros</Link>
                            </li>
                            <li className="footer-link-item">
                                <FaChevronRight className="link-icon" />
                                <Link to="#">Servicios</Link>
                            </li>
                            <li className="footer-link-item">
                                <FaChevronRight className="link-icon" />
                                <Link to="#">Productos</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4">
                        <h5 className="text-white mb-3 footer-title">Redes sociales</h5>
                        <ul className="list-unstyled d-flex gap-3 social-list">
                            <li>
                                <a
                                    className="social-link facebook"
                                    href="https://www.facebook.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="social-link instagram"
                                    href="https://www.instagram.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a
                                    className="social-link whatsapp"
                                    href="https://wa.me/"
                                    target="_blank"
                                    aria-label="Whatsapp"
                                >
                                    <FaWhatsapp />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr className="footer-sep" />
                <div className="footer-bottom text-center">
                    <p className='foot-c'>Diseñado por Custom-fit &copy;</p>
                </div>
            </div>
        </footer>
    );
}

export default Foot;
