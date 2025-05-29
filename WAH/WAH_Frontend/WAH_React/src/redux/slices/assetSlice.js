import { createSlice } from '@reduxjs/toolkit';
import { fetchAssets } from '../thunks/assetThunks';


const assetSlice = createSlice({
  name: 'asset',
  initialState: {
    assets: [],
    loading: false,
    error: null,
  },
  reducers: {
    addAsset: (state, action) => {
      state.assets.push(action.payload);
    },
    removeAsset: (state, action) => {
      state.assets = state.assets.filter(a => a.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload;
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default assetSlice;