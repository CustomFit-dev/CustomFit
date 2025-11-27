import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logocustomfit.png';

const Foot = () => {
  return (
    <footer
      className="w-100 flex-shrink-0"
      style={{ backgroundColor: '#222', borderTop: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={Logo}
                alt="Custom-Fit"
                style={{ height: 42, width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)' }}
              />
            </div>
            <p className="mb-0" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Personalización con estilo. Calidad, detalle y una experiencia hecha a tu medida.
            </p>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="text-white mb-3" style={{ letterSpacing: '0.4px' }}>Páginas</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/Home" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#sobre"
                  className="text-decoration-none"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
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

          <div className="col-6 col-md-4">
            <h6 className="text-white mb-3" style={{ letterSpacing: '0.4px' }}>Síguenos</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none d-inline-flex align-items-center gap-2"
                  style={{ color: '#007bff', transition: 'color .2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#66b2ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#007bff')}
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.404.595 24 1.326 24h11.495v-9.294H9.691V11.08h3.13V8.41c0-3.1 1.893-4.788 4.659-4.788 1.324 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.716-1.796 1.767v2.317h3.591l-.467 3.626h-3.124V24h6.127C23.405 24 24 23.404 24 22.674V1.326C24 .595 23.405 0 22.675 0z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none d-inline-flex align-items-center gap-2"
                  style={{ color: '#007bff', transition: 'color .2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#66b2ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#007bff')}
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.324.975.975 1.262 2.242 1.324 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.324 3.608-.975.975-2.242 1.262-3.608 1.324-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.324-.975-.975-1.262-2.242-1.324-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.324-3.608.975-.975 2.242-1.262 3.608-1.324C8.416 2.175 8.796 2.163 12 2.163zm0 1.838c-3.15 0-3.518.012-4.75.069-1.022.047-1.577.216-1.944.362-.49.19-.84.418-1.207.785-.367.367-.595.717-.785 1.207-.146.367-.315.922-.362 1.944-.057 1.232-.069 1.6-.069 4.75s.012 3.518.069 4.75c.047 1.022.216 1.577.362 1.944.19.49.418.84.785 1.207.367.367.717.595 1.207.785.367.146.922.315 1.944.362 1.232.057 1.6.069 4.75.069s3.518-.012 4.75-.069c1.022-.047 1.577-.216 1.944-.362.49-.19.84-.418 1.207-.785.367-.367.595-.717.785-1.207.146-.367.315-.922.362-1.944.057-1.232.069-1.6.069-4.75s-.012-3.518-.069-4.75c-.047-1.022-.216-1.577-.362-1.944-.19-.49-.418-.84-1.207-.785-.367-.146-.922-.315-1.944-.362-1.232-.057-1.6-.069-4.75-.069zm0 3.676a4.324 4.324 0 1 1 0 8.648 4.324 4.324 0 0 1 0-8.648zm0 1.838a2.486 2.486 0 1 0 0 4.972 2.486 2.486 0 0 0 0-4.972zm5.406-2.59a1.008 1.008 0 1 1 0 2.016 1.008 1.008 0 0 1 0-2.016z"/>
                  </svg>
                  Instagram
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none d-inline-flex align-items-center gap-2"
                  style={{ color: '#007bff', transition: 'color .2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#66b2ff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#007bff')}
                  aria-label="WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .18 5.32.18 11.88c0 2.09.55 4.1 1.6 5.9L0 24l6.38-1.67a11.74 11.74 0 0 0 5.68 1.45h.01c6.56 0 11.88-5.32 11.88-11.88 0-3.17-1.24-6.15-3.43-8.42zM12.07 21.3h-.01a9.42 9.42 0 0 1-4.8-1.31l-.34-.2-3.78.99 1.01-3.69-.22-.38a9.42 9.42 0 1 1 17.56-4.82c0 5.2-4.23 9.41-9.42 9.41zm5.47-7.06c-.3-.15-1.77-.87-2.04-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.48-.88-.78-1.47-1.73-1.64-2.02-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.9-2.19-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1-1.04 2.45s1.07 2.84 1.22 3.03c.15.2 2.1 3.2 5.08 4.48.71.31 1.27.49 1.7.62.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.69.25-1.28.17-1.42-.07-.14-.27-.22-.57-.37z"/>
                  </svg>
                  Whatsapp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: '#1a1a1a' }}>
        <div className="container py-3">
          <div className="d-flex align-items-center justify-content-center">
            <p className="mb-0 text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
              © {new Date().getFullYear()} Custom-fit. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Foot;
