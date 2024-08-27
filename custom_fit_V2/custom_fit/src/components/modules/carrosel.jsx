import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import { Pagination, Autoplay } from 'swiper/modules';

import img1 from './mod_img/Sto-1.png'; 
import img2 from './mod_img/Sto-2.png'; 
import img3 from './mod_img/nav.png'; 

export default function Carso() {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <img src={img1} id="c-1" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img2} id="c-2" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={img3} id="c-1" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
}
