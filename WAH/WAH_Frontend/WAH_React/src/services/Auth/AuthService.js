import axiosInstance from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';

const loginUser = async (payload) => {
  const res = await axiosInstance.post(ENDPOINTS.LOGIN, payload);
  return { token: res.data.token }; // Match the backend response structure
};

const registerUser = async (payload) => {
  const res = await axiosInstance.post(ENDPOINTS.REGISTER, payload);
  return res.data;
};

const forgotPassword = async (payload) => {
  const res = await axiosInstance.post(ENDPOINTS.FORGOT_PASSWORD, payload);
  return res.data;
};

const resetPassword = async (payload) => {
  const res = await axiosInstance.post(ENDPOINTS.RESET_PASSWORD, payload);
  return res.data;
};

const verifyOtp = async (payload) => {
  const res = await axiosInstance.post(ENDPOINTS.VERIFY_OTP, payload);
  return res.data;
};

export { loginUser, registerUser, forgotPassword, resetPassword, verifyOtp };

