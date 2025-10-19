import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logocustomfit.png';

const Foot = () => {
  return (
    <footer className="w-100 py-4 flex-shrink-0" style={{ backgroundColor: '#222' }}>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="image-container">
              <img src={Logo} alt="Footer Logo" />
            </div>
          </div>
          <div className="col">
            <h5 className="text-white mb-3">Páginas</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/Home" className="text-white text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="#sobre"
                  className="text-white text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('sobre');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Acerca de nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5 className="text-white mb-3">Redes sociales</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-decoration-none"
                >
                  Whatsapp
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="foot-c text-white mt-3">Diseñado por Custom-fit &copy;</p>
      </div>
    </footer>
  );
};

export default Foot;
