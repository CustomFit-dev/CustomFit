import React, { useRef, useState } from 'react';
import { carso } from './carrosel';

const Section = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollToImage = (direction) => {
        if (direction === 'prev') {
            setCurrentIndex(curr => (curr === 0 ? curr : curr - 1));
        } else {
            setCurrentIndex(curr => (curr === carso.length - 1 ? curr : curr + 1));
        }
    };

    return (
        <section className='sec1_s' id='inicio'>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='carousel-container'>
                            <ul
                                className='carousel-list'
                                style={{
                                    transform: `translateX(-${currentIndex * 100}%)`,
                                    transition: 'transform 0.5s ease-in-out',
                                    width: `${carso.length * 100}%`
                                }}
                            >
                                {carso.map((item) => (
                                    <li key={item.id} className='carousel-item'>
                                        <img src={item.imgUrl} width={500} height={280} alt={`Slide ${item.id}`} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col text-center'>
                        <button className='leftArrow' onClick={() => scrollToImage('prev')}>Prev</button>
                        <button className='rightArrow' onClick={() => scrollToImage('next')}>Next</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section;
