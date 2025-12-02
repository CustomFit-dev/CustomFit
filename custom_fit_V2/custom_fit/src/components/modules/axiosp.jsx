import axios from 'axios';

function axiosp() {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,  // ← AQUI EL CAMBIO
  });

  const sendUserData = async (userData) => {
    try {
      const response = await api.post('login/', userData);
      console.log('User data sent to backend successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending user data to backend:', error);
      throw error;
    }
  };

  return { sendUserData };
}

export default axiosp;
