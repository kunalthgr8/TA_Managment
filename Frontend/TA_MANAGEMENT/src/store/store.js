import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import facultyStatusSlice from "./facultyStatusSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    facultyStatus: facultyStatusSlice,
  },
});

export default store;
