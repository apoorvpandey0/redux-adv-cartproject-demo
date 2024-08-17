import { createSlice } from "@reduxjs/toolkit";

const initialState = { showMyCartButton: true, notification: false };
const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    toggleMyCart(state) {
      state.showMyCartButton = !state.showMyCartButton;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
