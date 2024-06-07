import React from 'react';
import '../css/index.css';
const Header = () => {
    return (
        <div className='container'>
            <div className='icon'>
                {/* aqui va la imagen-logo de custom fit */}
                <h1>Custom fit</h1>
            </div>
            <header>
                <nav>
                <ul className='nav-list'>
                    <li>Inicio</li>
                    <li>Diseños</li>
                    <li>Como funciona</li>
                    <li>Comentarios</li>
                    <li><i className='fa-solid fa-cart-shopping'></i></li>
                </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;