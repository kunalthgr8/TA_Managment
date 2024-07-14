import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isFaculty: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.isFaculty = false;
      state.user = null;
    },
    faculty(state) {
      state.isFaculty = true;
    }
  },
});

export const { login, logout,faculty } = authSlice.actions;
export default authSlice.reducer;
