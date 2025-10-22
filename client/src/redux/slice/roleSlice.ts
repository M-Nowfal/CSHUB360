import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ----------- Role Slice ----------
const roleSlice = createSlice({
  name: "role",
  initialState: "student",
  reducers: {
    setRole(_state, action: PayloadAction) {
      return action.payload;
    },
    getRole(state) {
      return state;
    }
  }
});

export const { setRole, getRole } = roleSlice.actions;
export default roleSlice.reducer;
