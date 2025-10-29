import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
});

export default AxiosClient;