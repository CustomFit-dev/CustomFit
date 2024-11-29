// Home.js
import React, { useEffect, useState } from 'react';
import CircularIndeterminate from './modules/CircularIndeterminate'; // Asegúrate de que la ruta sea correcta
import Domi0 from './domiciliario/domi0';
import Domi1 from './domiciliario/domi1';
import Footer from './modules/footer';
import Footer1 from './domiciliario/ventana6';


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
        
        <Domi0 />
        <Domi1 />
        <Footer />
        <Footer1 />
        
        </>
        )}
    </div>
    );
};

export default Home;
