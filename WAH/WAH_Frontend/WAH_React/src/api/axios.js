import axios from 'axios';
import store from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import URLS from '../constants/urls';    
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';


const axiosInstance = axios.create({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> be956539dad1298027f4584fd080631709eed677
    baseURL : 'https://api.example.com', // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
<<<<<<< HEAD
=======
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
  baseURL: "https://localhost:7126/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
<<<<<<< HEAD
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
=======
>>>>>>> be956539dad1298027f4584fd080631709eed677
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth?.token;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status } = error.response || {};
        if (status === 401 || status === 403) {
            store.dispatch(logout());
            toast.error('Session expired. Please log in again.');
            return window.location.href = URLS.LOGIN;
        } else if (status >= 500) {
            toast.error('Server error. Please try again later.');
        } else if (status >= 400) {
            toast.error('An error occurred. Please check your request.');
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;