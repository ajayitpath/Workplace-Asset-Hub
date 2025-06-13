import axios from "axios";
import URLS from "../constants/urls";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7126/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Configure request interceptor without direct store reference
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage instead of store
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Configure response interceptor without direct store reference
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (!status) {
      toast.error("Network error. Please check your connection.");
      return Promise.reject(error);
    }

    if (status === 401 || status === 403) {
      // Handle logout without direct store reference
      localStorage.removeItem('token');
      toast.error("Session expired. Please log in again.");
      window.location.href = URLS.LOGIN;
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    } else if (status >= 400) {
      toast.error("An error occurred. Please check your request.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;