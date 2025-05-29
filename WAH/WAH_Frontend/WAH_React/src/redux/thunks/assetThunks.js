// assetThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios'; // your axios instance

export const fetchAssets = createAsyncThunk('asset/fetchAssets', async (_, thunkAPI) => {
  try {
    const response = await api.get('/assets');
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || 'Error fetching assets');
  }
});
