import React from 'react';
import Header from './modules/header'
import Sec1 from './modules/sec1';
import Sec2 from './modules/sec2';
import Sec3 from './modules/sec3';
import Footer from './modules/footer'
import Chatbot from './modules/FloatingButton';

const Home = () => {
    console.log("IMPORT META:", import.meta.env);
   console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

  return (
    <div>
        <Header />
        <Sec1 />
        <Sec2 />
        <Sec3 />
        <Chatbot />
        <Footer />
      
    </div>
  )
}

export default Home
