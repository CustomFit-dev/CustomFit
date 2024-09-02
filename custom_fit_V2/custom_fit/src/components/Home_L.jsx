import React from 'react';
import '../scss/style.css'
import Header from './modules/header_l'
import Sec1 from './modules/sec1_l';
import Sec2 from './modules/sec2';
import Sec3 from './modules/sec3';
import Footer from './modules/footer'

const Home = () => {
  return (
    <div>
        <Header />
        <Sec1 />
        <Sec2 />
        <Sec3 />
        <Footer/>
      
    </div>
  )
}

export default Home
