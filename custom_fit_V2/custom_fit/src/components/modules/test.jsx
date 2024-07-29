import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    useEffect(() => {
        const fetchUserProfiles = async () => {
            try {
                const response = await axios.post('http://localhost:8000/userprofiles');
                setUserProfiles(response.data);
            } catch (error) {
                console.error('Error fetching user profiles:', error);
            }
        };

        fetchUserProfiles();
    }, []);

    return (
        <div>
            <h1>User Profiles</h1>
            <ul>
                {userProfiles.map((userProfile) => (
                    <li key={userProfile.id}>
                        {userProfile.nombres} {userProfile.apellidos} ({userProfile.nombre_usuario})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfileList;
