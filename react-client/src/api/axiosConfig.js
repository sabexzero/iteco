import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backend.hibye.pro:8443/',
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json',
    }
});


// Interceptors for processing requests and responses
axiosInstance.interceptors.request.use(
    config => {
        // Add tokens or other logic before sending the request
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        // Error handle
        console.error(error);
        return Promise.reject(error);
    }
);

export default axiosInstance;