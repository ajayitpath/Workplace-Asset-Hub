import { createSlice } from "@reduxjs/toolkit";

import {
  loginThunk,
  registerThunk,
  forgotPasswordThunk,
  resetPasswordThunk,
  verifyOtpThunk,
  resendOtpThunk
} from '../thunks/authThunk';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null,
  resetToken: null, 
  otpVerified: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.error = null;
    },
    // Add the loginSuccess reducer
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user',action.payload.user)
    },
    setUser(state, action) {
    state.user = action.payload;
  }
  },
  extraReducers: (builder) => {
//     const {
//   loginThunk,
//   registerThunk,
//   forgotPasswordThunk,
//   resetPasswordThunk,
//   verifyOtpThunk,
//   resendOtpThunk
// } = require('../thunks/authThunk');

    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Forgot Password
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.resetToken = action.payload.token;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.loading = false;
        state.resetToken = null;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify OTP
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state) => {
        state.loading = false;
        state.otpVerified = true;
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Resend OTP
      .addCase(resendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOtpThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError, loginSuccess, setUser } = authSlice.actions;
// export const authReducer = authSlice.reducer;
export default authSlice.reducer;


// export default authSlice.reducer;
