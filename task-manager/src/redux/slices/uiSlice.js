import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toast: { message: '', type: 'info', isVisible: false }
  },
  reducers: {
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || 'info',
        isVisible: true
      };
    },
    clearToast: (state) => {
      state.toast.isVisible = false;
    }
  }
});

export const { showToast, clearToast } = uiSlice.actions;

export const displayToast = (message, type = 'info') => (dispatch) => {
  dispatch(showToast({ message, type }));
  setTimeout(() => {
    dispatch(clearToast());
  }, 3000);
};

export default uiSlice.reducer;
