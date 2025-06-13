import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
    loginUser, 
  registerUser, 
  forgotPassword, 
  resetPassword, 
  verifyOtp,
  resendOtp 
} from './../../services/Auth/AuthService';
import { loginSuccess, setUser } from "../slices/authSlice";

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const data = await loginUser(credentials);
      if (data.token) {
        localStorage.setItem('token', data.token);
        await dispatch(setAuthUserFromToken(data.token));
      }
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const data = await registerUser(formData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const data = await forgotPassword(email);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const resetPasswordThunk = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const data = await resetPassword(resetData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const verifyOtpThunk = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const data = await verifyOtp(email, otp);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'OTP verification failed');
    }
  }
);

export const resendOtpThunk = createAsyncThunk(
  'auth/resendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const data = await resendOtp(email);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const setAuthUserFromToken = createAsyncThunk(
  'auth/setAuthUser',
  async (token, { dispatch }) => {
    try {
      const decodedUser = jwtDecode(token);
      dispatch(setUser(decodedUser));
      dispatch(loginSuccess({ token }));
      return decodedUser;
    } catch {
      throw new Error('Invalid token');
    }
  }
);