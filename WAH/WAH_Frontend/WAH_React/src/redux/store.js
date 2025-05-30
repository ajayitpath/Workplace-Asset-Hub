import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import assetReducer from './slices/assetSlice';
import requestReducer from './slices/requestSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    asset: assetReducer,
    request: requestReducer,
    ui: uiReducer,
  },
});

export default store;