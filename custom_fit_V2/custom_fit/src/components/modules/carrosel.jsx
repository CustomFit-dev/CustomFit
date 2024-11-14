// Carso.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import '../../scss/carrosel.scss';

import { Pagination, Autoplay } from 'swiper/modules';

import img1 from '../../img/slider2.png'; 
import img2 from '../../img/slider1.png'; 
import img3 from '../../img/slider3.png'; 
import img4 from '../../img/slider4.png';

export default function Carso() {
  return (
    <div className="carousel">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
       
      >
        <SwiperSlide>
          <img 
            src={img1} 
            id="c-1" 
            alt="Slide 1" 
            
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src={img2} 
            id="c-2" 
            alt="Slide 2" 
            
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src={img3} 
            id="c-3" 
            alt="Slide 3" 
            
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src={img4} 
            id="c-4" 
            alt="Slide 4" 
            
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
