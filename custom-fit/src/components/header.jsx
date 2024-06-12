import React from 'react';
const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="#">CustomFit</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Inicio</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Presentacion</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Como funciona</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Comentarios</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className='fa-solid fa-cart-shopping'></i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    )
}

export default Header;