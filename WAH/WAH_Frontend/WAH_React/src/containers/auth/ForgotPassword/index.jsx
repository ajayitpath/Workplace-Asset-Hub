// pages/auth/ForgotPassword.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { forgotPasswordSchema } from '../../../schema/ForgotPassword.schema';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log('Forgot Password Request:', data);
    // TODO: Call API here
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gap-4">
      <Paper elevation={3} className="p-6 rounded-lg w-full max-w-md">
        <Typography variant="h5" className="text-center mb-4 text-primary-700 font-semibold">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-4 flex flex-col gap-4">
          <TextField
            {...register('email')}
            label="Email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            className="m-4 gap-2"
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700 m-4 gap-2"
          >
            Send OTP
          </Button>
          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default ForgotPassword;
