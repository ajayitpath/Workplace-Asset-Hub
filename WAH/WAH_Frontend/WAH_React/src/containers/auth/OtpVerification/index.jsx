// pages/auth/OtpVerification.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/OtpVerification/OtpVerification.jsx
<<<<<<< HEAD
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/OtpVerification/OtpVerification.jsx
import { otpSchema } from './OtpVerification.schema';
=======
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
import { otpSchema } from '../../../schema/OtpVerification.schema';
import { verifyOtp } from '../../../services/Auth/AuthService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLS from '../../../constants/urls';
<<<<<<< HEAD
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26:WAH/WAH_Frontend/WAH_React/src/containers/auth/OtpVerification/index.jsx
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
=======
import { otpSchema } from './OtpVerification.schema';
>>>>>>> be956539dad1298027f4584fd080631709eed677:WAH/WAH_Frontend/WAH_React/src/containers/auth/OtpVerification/index.jsx

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
