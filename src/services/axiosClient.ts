import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor
axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    error => {
        throw error;
    }
);

export default axiosClient;