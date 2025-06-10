// File: src/redux/slices/assetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assets: [],
  loading: false,
  error: null,
};


const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    fetchAssetsStart: (state) => {
        
      state.loading = true;
      state.error = null;
    },
    fetchAssetsSuccess: (state, action) => {
      state.loading = false;
      state.assets = action.payload;
    },
    fetchAssetsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAsset: (state, action) => {
      state.assets.push(action.payload);
    },
    removeAsset: (state, action) => {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
    },
  },
});

export const { fetchAssetsStart, fetchAssetsSuccess, fetchAssetsFailure, addAsset, removeAsset } = assetSlice.actions;
export default assetSlice.reducer;
