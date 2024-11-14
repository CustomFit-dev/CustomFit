// Store.js
import React, { useEffect, useState } from 'react';
import Header from './modules/header_l';
import Section from './modules/carrosel';
import Cajas from './modules/Storecontent';
import CircularIndeterminate from './modules/CircularIndeterminate'; // Asegúrate de que la ruta sea correcta
import '../scss/store.scss';

const Store = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga rápida de datos
    const timer = setTimeout(() => {
      setIsLoading(false); // Cambia a false después de 1 segundo
    }, 1000); // Ajusta este tiempo según necesites

    return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
  }, []);

  return (
    <>
      <Header className='store-header' />
      {isLoading ? (
        <div 
          style={{
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            flexDirection: 'column'
          }}
        >
          <CircularIndeterminate />
        </div>
      ) : (
            <Section className='store-container'/>
      )}
      
        <Cajas/>
      
    </>
    
  );
};

export default Store;
