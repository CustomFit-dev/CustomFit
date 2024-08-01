import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom'; 

const Crud = () => {
    const [userProfiles, setUserProfiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/userprofiles');
                setUserProfiles(response.data);
            } catch (error) {
                console.error('Error fetching user profiles:', error);
            }
        };

        fetchUserProfiles();
    }, []);

    const Return = () => {
        navigate('/Home');
    };

    return (
        <section className='sec1c'>
        <IconButton onClick={Return}>
            <CloseIcon />
        </IconButton>
            <div className='container'>
            <div className='row'>
                <div className='col'>
                <h1>Crud</h1>
                <ul>
                    {userProfiles.map((userProfile) => (
                        <li key={userProfile.id}>
                            {userProfile.nombres} {userProfile.apellidos} - {userProfile.rol.id} ({userProfile.nombre_usuario})
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>

        </section>
    );
};

export default Crud;
