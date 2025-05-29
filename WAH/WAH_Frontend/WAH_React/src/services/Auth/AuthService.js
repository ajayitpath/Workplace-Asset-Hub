import axiosInstance from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';

const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post(ENDPOINTS.LOGIN,credentials)
  return data;
  // const res = await axiosInstance.post(ENDPOINTS.LOGIN, payload);
  // return { token: res.data.token };
};

const registerUser = async (formData) => {
  const res = await axiosInstance.post(ENDPOINTS.REGISTER, formData);
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

