import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import resetPasswordSchema from '../../../schema/ResetPassword.schema.js';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLS from '../../../constants/urls.js';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from '../../../redux/thunks/authThunk.js';

const ResetPassword = () => {
   const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;
  const email = new URLSearchParams(location.search).get('email');

    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {

    if (!token || !email) {
      toast.error('Invalid reset password link');
      return;
    }

    try {
      const resultAction = await dispatch(resetPasswordThunk({
        token,
        email,
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



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-200 p-4 gap-4">
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
            disabled={loading}
            className="bg-primary-600 hover:bg-primary-700"
          >
            {loading? "Resetting password" : "Reset Password"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ResetPassword;
