import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import loginSchema from './login.schema';
import { useNavigate } from 'react-router-dom';
import URLS from '../../../constants/urls';
import { Button, TextField, Typography, Box, Paper } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    console.log('Login form data:', data);
    // await login(data);
    // setToken(response.token);
    // navigate(URLS.DASHBOARD);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F4F4F6',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      <Paper elevation={6} sx={{ p: 4, borderRadius: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3} color="#2F52FF">
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
            type="password"
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
              backgroundColor: '#2F52FF',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1C3AEF'
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
