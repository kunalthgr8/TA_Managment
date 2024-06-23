import { createSlice } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  PRE_COURSE_REGISTER: "preCourseRegister",
  COURSE_REGISTERED: "courseRegistered",
  TA_ASSIGNED: "taAssigned",
});

const facultyStatusSlice = createSlice({
  name: "facultyStatus",
  initialState: {
    status: STATUSES.PRE_COURSE_REGISTER,
  },
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = facultyStatusSlice.actions;
export default facultyStatusSlice.reducer;
