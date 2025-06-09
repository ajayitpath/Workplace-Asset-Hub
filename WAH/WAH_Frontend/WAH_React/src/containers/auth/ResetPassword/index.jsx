// pages/auth/ResetPassword.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import resetPasswordSchema from '../../../schema/ResetPassword.schema.js';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../../services/Auth/AuthService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLS from '../../../constants/URLS';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from '../../../redux/thunks/authThunk.js';

const ResetPassword = () => {
   const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(resetPasswordThunk({
        token,
        email: data.email,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      }));
      
      if (resetPasswordThunk.fulfilled.match(resultAction)) {
        toast.success('Password reset successful');
        navigate(URLS.LOGIN);
      }
    } catch (error) {
      toast.error(error.message || 'Password reset failed');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 gap-4">
      <Paper elevation={3} className="p-6 rounded-lg w-full max-w-md gap-4">
        <Typography variant="h5" className="text-center mb-4 text-primary-700 font-semibold p-2 gap-2">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="p-4 flex flex-col gap-4">
          <TextField
            {...register('newPassword')}
            label="New Password"
            type="password"
            fullWidth
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
            className="mb-4"
          />
          <TextField
            {...register('confirmPassword')}
            label="Confirm Password"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            className="mb-4"
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Reset Password
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

export default ResetPassword;
