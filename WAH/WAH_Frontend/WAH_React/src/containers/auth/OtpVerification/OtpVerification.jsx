// pages/auth/OtpVerification.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/OtpVerification/OtpVerification.jsx
import { otpSchema } from './OtpVerification.schema';
=======
import { otpSchema } from '../../../schema/OtpVerification.schema';
import { verifyOtp } from '../../../services/Auth/AuthService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLS from '../../../constants/urls';
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26:WAH/WAH_Frontend/WAH_React/src/containers/auth/OtpVerification/index.jsx

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      await verifyOtp({
        email,
        otp: data.otp
      });
      toast.success('Email verified successfully');
      navigate(URLS.LOGIN);
    } catch (error) {
      toast.error(error.response?.data || 'Invalid OTP');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-purple-200 p-4 gap-4">
      <Paper elevation={3} className="p-6 rounded-lg w-full max-w-md">
        <Typography variant="h5" className="text-center mb-4 text-primary-700 font-semibold p-2 gap-2">
          OTP Verification
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
