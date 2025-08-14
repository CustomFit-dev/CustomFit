import React from 'react';
import Header from './modules/header'
import Sec1 from './modules/sec1';
import Sec2 from './modules/sec2';
import Sec3 from './modules/sec3';
import Footer from './modules/footer'
import FloatingButton from './modules/FloatingButton';

const Home = () => {
  return (
    <div>
        <Header />
        <Sec1 />
        <Sec2 />
        <Sec3 />
        <FloatingButton />
        <Footer />
      
    </div>
  )
}

export default Home
