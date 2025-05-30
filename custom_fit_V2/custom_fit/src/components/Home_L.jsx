// Home.js
import React, { useEffect, useState } from 'react';
import CircularIndeterminate from './modules/CircularIndeterminate'; // Asegúrate de que la ruta sea correcta
import Header from './modules/header_l';
import Sec1 from './modules/sec1_l';
import Sec2 from './modules/sec2_l';
import Sec3 from './modules/sec3_l';
import Footer from './modules/footer';
import Sec4 from './modules/comen';
import Floating from './modules/FloatingButton_l';


const Home = () => {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia a false después de 1 segundo
    }, 1000); // Ajusta este tiempo según necesites

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularIndeterminate />
        </div>
      ) : (
        <>
        <Header />
        <div id='home'>
          <Sec1 />
          </div>
          <Sec2 />
          <div id="video">
          <Sec3 />
          </div>
          <div id="comentarios">
          <Sec4 />
          </div>
          <Floating />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
