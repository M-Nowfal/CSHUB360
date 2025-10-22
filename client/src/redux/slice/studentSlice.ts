import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ----------- Student Slice ----------
const studentSlice = createSlice({
  name: "student",
  initialState: null,
  reducers: {
    setStudent(_state, action: PayloadAction) {
      return action.payload;
    },
    getStudent(state) {
      return state;
    }
  }
});

export const { setStudent, getStudent } = studentSlice.actions;
export default studentSlice.reducer;
