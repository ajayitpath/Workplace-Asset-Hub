// File: src/redux/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  loadingGlobal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setGlobalLoading: (state, action) => {
      state.loadingGlobal = action.payload;
    },
  },
});

export const { toggleSidebar, setGlobalLoading } = uiSlice.actions;
export default uiSlice.reducer;
