// pages/auth/OtpVerification.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpSchema } from '../../../schema/OtpVerification.schema';
import { verifyOtp } from '../../../services/Auth/AuthService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLS from '../../../constants/urls';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtpThunk, resendOtpThunk } from '../../../redux/thunks/authThunk';

const OtpVerification = () => {
  const dispatch = useDispatch();
    const { loading, error } = useSelector(state => state.auth);
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(verifyOtpThunk({ email, otp: data.otp }));
      if (verifyOtpThunk.fulfilled.match(resultAction)) {
        toast.success('Email verified successfully');
        navigate(URLS.LOGIN);
      }
    } catch (error) {
      toast.error(error.message || 'OTP verification failed');
    }
  };

  const handleResendOtp = async () => {
    try {
      const resultAction = await dispatch(resendOtpThunk(email));
      if (resendOtpThunk.fulfilled.match(resultAction)) {
        toast.success('OTP resent successfully');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP');
    }
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gap-4">
      <Paper elevation={3} className="p-6 rounded-lg w-full max-w-md">
        <Typography variant="h5" className="text-center mb-4 text-primary-700 font-semibold p-2 gap-2">
          Verify Email
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-4 flex flex-col gap-4">
          <TextField
            {...register('otp')}
            label="Enter OTP"
            fullWidth
            error={!!errors.otp}
            helperText={errors.otp?.message}
            className="mb-4"
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Verify OTP
          </Button>
        </form>
        <Button
          className="mt-4 text-sm text-blue-700 normal-case"
          fullWidth
          onClick={() => console.log('Resend OTP')}
        >
          Resend OTP
        </Button>
      </Paper>
    </div>
  );
};

export default OtpVerification;
