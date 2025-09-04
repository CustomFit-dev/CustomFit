import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from '../../img/logocustomfit.png';
import '../../styles/footer.css';

const Foot = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="footer-container">
            <div className="footer-content">
                {/* Sección del logo */}
                <div className="footer-section">
                    <div className='footer-logo'>
                        <img src={Logo} alt='CustomFit Logo' />
                        <p>Personaliza tu estilo con nuestras prendas únicas</p>
                    </div>
                </div>

                {/* Sección de enlaces */}
                <div className="footer-section">
                    <h4>Enlaces Rápidos</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/productos">Productos</Link></li>
                        <li><Link to="/acerca">Acerca de Nosotros</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                {/* Sección de contacto */}
                <div className="footer-section">
                    <h4>Contacto</h4>
                    <ul className="footer-contact">
                        <li>info@customfit.com</li>
                        <li>+57 123 456 7890</li>
                        <li>Bogotá, Colombia</li>
                    </ul>
                </div>

                {/* Sección de redes sociales */}
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook className="icon" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagram className="icon" />
                        </a>
                        <a href="https://wa.me/573123456789" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                            <FaWhatsapp className="icon" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter className="icon" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                            <FaYoutube className="icon" />
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {currentYear} CustomFit. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Foot;
