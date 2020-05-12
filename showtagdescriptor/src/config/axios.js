import axios from 'axios';

const axiosClient = axios.create({
    //baseURL: REACT_APP_BACKEND_URL
    baseURL: 'http://localhost:4000'
});

export default axiosClient;