// pages/auth/ResetPassword.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/ResetPassword/ResetPassword.jsx
<<<<<<< HEAD
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/ResetPassword/ResetPassword.jsx
import resetPasswordSchema from './ResetPassword.schema.js';
=======
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
import resetPasswordSchema from '../../../schema/ResetPassword.schema.js';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../../services/Auth/AuthService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLS from '../../../constants/URLS';
<<<<<<< HEAD
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26:WAH/WAH_Frontend/WAH_React/src/containers/auth/ResetPassword/index.jsx
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
=======
import resetPasswordSchema from './ResetPassword.schema.js';
>>>>>>> be956539dad1298027f4584fd080631709eed677:WAH/WAH_Frontend/WAH_React/src/containers/auth/ResetPassword/index.jsx

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (data) => {
    console.log('Reset Password Data:', data);
    // TODO: Call API to reset password
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
            disabled={isSubmitting}
            className="bg-primary-600 hover:bg-primary-700"
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default ResetPassword;
