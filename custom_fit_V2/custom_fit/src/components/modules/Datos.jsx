// makeData.js
import axios from 'axios';

export const fetchData = async () => {
  try {
    const url = `${process.env.REACT_APP_API_URL}userprofiles`;
    console.log('Obteniendo user profiles de:', url);

    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    return [];
  }
};
