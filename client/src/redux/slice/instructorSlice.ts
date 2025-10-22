import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ----------- Instructor Slice ----------
const InstructorSlice = createSlice({
  name: "Instructor",
  initialState: null,
  reducers: {
    setInstructor(_state, action: PayloadAction) {
      return action.payload;
    },
    getInstructor(state) {
      return state;
    }
  }
});

export const { setInstructor, getInstructor } = InstructorSlice.actions; 
export default InstructorSlice.reducer;
