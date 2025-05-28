import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // adjust to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
