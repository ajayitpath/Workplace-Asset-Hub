import axiosInstance from '../../api/axios';
import ENDPOINTS from '../../api/endpoints';

const loginUser = async (credentials) => {
  const { data } = await axiosInstance.post(ENDPOINTS.LOGIN,credentials)
  return data;
};

const registerUser = async (formData) => {
  const res = await axiosInstance.post(ENDPOINTS.REGISTER, formData);
  return res.data;
};

const forgotPassword = async (email) => {
  const res = await axiosInstance.post(ENDPOINTS.FORGOT_PASSWORD, { email });
  return res.data;
};

const resetPassword = async (resetData) => {
  const { token, email, newPassword, confirmPassword } = resetData;
  const res = await axiosInstance.post(`$(ENDPOINTS.RESET_PASSWORD?token=${token}&email=${email}`, {newPassword, confirmPassword});
  return res.data;
};

const verifyOtp = async (email, otp) => {
  const res = await axiosInstance.post(ENDPOINTS.VERIFY_OTP, { email, otp });
  return res.data;
};

const resendOtp = async (email) => {
  const res = await axiosInstance.post(ENDPOINTS.RESEND_OTP, { email });
  return res.data;
};


export { loginUser, registerUser, forgotPassword, resetPassword, verifyOtp, resendOtp };

