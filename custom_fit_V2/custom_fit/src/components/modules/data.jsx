import axios from 'axios';

const API_URL = 'http://localhost:8000/';

const getUserProfile = () => {
    return axios.get(`${API_URL}userprofile/`);
};

export default {
    getUserProfile
};
