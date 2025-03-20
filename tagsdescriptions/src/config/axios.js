import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:4001',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosClient;