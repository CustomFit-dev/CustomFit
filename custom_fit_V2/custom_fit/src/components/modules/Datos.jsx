// makeData.js
import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/userprofiles');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profiles:', error);
    return [];
  }
};
