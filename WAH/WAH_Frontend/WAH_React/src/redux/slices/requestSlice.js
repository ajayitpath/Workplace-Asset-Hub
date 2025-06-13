import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    fetchRequestsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchRequestsSuccess: (state, action) => {
      state.loading = false;
      state.requests = action.payload;
    },
    fetchRequestsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addRequest: (state, action) => {
      state.requests.push(action.payload);
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(req => req.id !== action.payload);
    },
  },
});

export const { fetchRequestsStart, fetchRequestsSuccess, fetchRequestsFailure, addRequest, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
