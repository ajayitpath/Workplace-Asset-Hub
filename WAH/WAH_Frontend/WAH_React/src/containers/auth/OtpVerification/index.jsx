// pages/auth/OtpVerification.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpSchema } from './OtpVerification.schema';

const OtpVerification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  const onSubmit = async (data) => {
    console.log('OTP Verification Request:', data);
    // TODO: Call API to verify OTP
  };

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
