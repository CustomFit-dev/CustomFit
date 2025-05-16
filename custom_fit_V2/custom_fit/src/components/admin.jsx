import React, { useEffect, useState } from 'react';
import CircularIndeterminate from './modules/CircularIndeterminate'; // Asegúrate de que la ruta sea correcta
import Header from './admin/dashboradmin';


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
            </>
        )}
        </div>
    );
    };

    export default Home;
