// Home.js
import React, { useEffect, useState } from 'react';
import CircularIndeterminate from './modules/CircularIndeterminate'; // Indicador de carga
import Header from './modules/header_l'; // Encabezado principal
import Sec1 from './modules/sec1_l'; // Sección principal
import Sec2 from './modules/sec2_l'; // Sección intermedia
import Sec3 from './modules/sec3_l'; // Video o contenido multimedia
import Sec4 from './modules/comen'; // Comentarios o reseñas
import Floating from './modules/FloatingButton_l'; // Botón flotante
import Footer from './modules/footer'; // Pie de página

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Oculta el loader después de 1 segundo
    }, 1000);

    return () => clearTimeout(timer); // Limpia el temporizador al desmontar
  }, []);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularIndeterminate />
        </div>
      ) : (
        <>
          <Header />
          <div id="home">
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
