// Store.js
import React, { useEffect, useState } from 'react';
import Header from './modules/header_l';
import Section from './modules/sec1_s';
import CircularIndeterminate from './modules/CircularIndeterminate'; // Asegúrate de que la ruta sea correcta

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
    <div>
      <Header />
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularIndeterminate />
        </div>
      ) : (
        <Section />
      )}
      {/* <Sec2 /> */}
    </div>
  );
};

export default Store;
