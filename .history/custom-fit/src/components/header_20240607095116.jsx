import React from 'react';

const Header = () => {
    return (
        <div className='container'>
        <div className='icon'>
           <nav>
            <ul className='nav-list'>
                <li>Inicio</li>
                <li>Diseños</li>
                <li>Como funciona</li>
                <li>Comentarios</li>
                <li><i class="fa-solid fa-cart-shopping"></i></li>
            </ul>
           </nav>
        </div>
        </div>
    )
}

export default Header;