// pages/auth/ForgotPassword.jsx
import React from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/ForgotPassword/ForgotPassword.jsx
<<<<<<< HEAD
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/ForgotPassword/ForgotPassword.jsx
import { forgotPasswordSchema } from './ForgotPassword.schema.js';
=======
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
import { forgotPasswordSchema } from '../../../schema/ForgotPassword.schema';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../../services/Auth/AuthService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import URLS from '../../../constants/URLS';
<<<<<<< HEAD
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26:WAH/WAH_Frontend/WAH_React/src/containers/auth/ForgotPassword/index.jsx
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
=======
import { forgotPasswordSchema } from './ForgotPassword.schema.js';
>>>>>>> be956539dad1298027f4584fd080631709eed677:WAH/WAH_Frontend/WAH_React/src/containers/auth/ForgotPassword/index.jsx

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 p-4 gap-4">
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
        </form>
      </Paper>
    </div>
  );
};

export default ForgotPassword;
