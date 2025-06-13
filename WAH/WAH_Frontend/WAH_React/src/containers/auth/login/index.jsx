import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../../schema/login.schema";
import { useNavigate } from "react-router-dom";
import URLS from "../../../constants/urls";
import { setUser } from "../../../redux/slices/authSlice";
import {
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { loginThunk } from "../../../redux/thunks/authThunk";
import PasswordInput from '../../../components/PasswordInput';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(loginThunk(data));
      
      if (loginThunk.fulfilled.match(resultAction)) {
        toast.success('Login successful!');
        navigate(URLS.DASHBOARD);
      } else {
        toast.error(resultAction.payload || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: (theme) => theme.palette.background.default,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: 400,
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={3}
          color="rgb(0, 0, 0)"
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            name="password"
            register={register}
            error={errors.password}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 1,
              backgroundColor: (theme) => theme.palette.primary.main,
              textTransform: "none",
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            {loading? "Logging-in" : "Login"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            color="#2F35F0"
            sx={{ cursor: "pointer", mt: 2 }}
            onClick={() => navigate(URLS.FORGOT_PASSWORD)}
          >
            Forgot Password?
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="#2F35F0"
            sx={{ cursor: "pointer", mt: 1 }}
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
