// Carso.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Pagination, Autoplay } from 'swiper/modules';

import img1 from './mod_img/car1.png'; 
import img2 from './mod_img/car2.png'; 
import img3 from './mod_img/car3.png'; 

export default function Carso() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 6000, // Cambia este valor para ajustar el tiempo de visualización de cada imagen (5000 ms = 5 segundos)
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        style={{ width: '100%', height: '90vh', marginLeft: '-10px' }}
      >
        <SwiperSlide>
          <img src={img1} id="c-1" alt="Slide 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} id="c-2" alt="Slide 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} id="c-3" alt="Slide 3" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
