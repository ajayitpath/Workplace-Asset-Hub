import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from '../../../schema/login.schema';
import { useNavigate } from 'react-router-dom';
import URLS from '../../../constants/urls';
<<<<<<< HEAD
<<<<<<< HEAD:WAH/WAH_Frontend/WAH_React/src/containers/auth/login/Login.jsx
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

=======
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
import { Button, TextField, Typography, Box, Paper, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginUser } from '../../../services/Auth/AuthService';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
>>>>>>> 37460a2419a2b4497bc5880090c561747cc63d26:WAH/WAH_Frontend/WAH_React/src/containers/auth/login/index.jsx
=======
>>>>>>> 1c1a080754a8366397552ac29e8a493654e80fb9
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      dispatch(loginSuccess({ token: response.token }));
      toast.success('Login successful!');
      navigate(URLS.DASHBOARD);
    } catch (error) {
      toast.error(error.response?.data || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Paper 
        elevation={1} 
        sx={{ 
          p: 4, 
          borderRadius: 4, 
          width: '100%', 
          maxWidth: 400,
          backgroundColor: (theme) => theme.palette.background.paper
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="rgb(0, 0, 0)">
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword? 'text' : 'password'}
            fullWidth
            margin="normal"
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 1,
              backgroundColor: (theme) => theme.palette.primary.main,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.primary.dark,
              }
            }}
          >
            Login
          </Button>

          <Typography
            variant="body2"
            align="center"
            color="#2F35F0"
            sx={{ cursor: 'pointer', mt: 2 }}
            onClick={() => navigate(URLS.FORGOT_PASSWORD)}
          >
            Forgot Password?
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="#2F35F0"
            sx={{ cursor: 'pointer', mt: 1 }}
            onClick={() => navigate(URLS.SIGNUP)}
          >
            Don't have an account? Sign up
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
