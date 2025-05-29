import { createSlice } from "@reduxjs/toolkit";
const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  token: token || null,
  user:null,
  loading: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      localStorage.setItem('token',action.payload.token);
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
    setUser: (state, action) => {
  state.user = action.payload;
}
  },
});
export const { loginStart, loginSuccess, loginFailure, logout, setUser } =
  authSlice.actions;
export default authSlice.reducer;
