import axios from 'axios';


const axiosClient = axios.create({
    baseURL: 'http://localhost:4000'//process.env.REACT_APP_BACKEND_URL
});

export default axiosClient;