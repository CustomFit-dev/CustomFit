// Home.js
import React, { useEffect, useState } from 'react';
import CircularIndeterminate from './modules/CircularIndeterminate'; // Asegúrate de que la ruta sea correcta
import Prove1 from './proveedor/prove1';
import Prove2 from './proveedor/prove2';
import Prove4 from './proveedor/prove4';





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
        <div className="contenedor-proveedores">
        
  <Prove1 />
  <Prove2 />
  <Prove4 />
  
</div>

        </>
        )}
    </div>
    );
};

export default Home;
