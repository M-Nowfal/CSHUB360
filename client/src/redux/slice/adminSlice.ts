import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ----------- Admin Slice ----------
const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    setAdmin(_state, action: PayloadAction) {
      return action.payload;
    },
    getAdmin(state) {
      return state;
    }
  }
});

export const { setAdmin, getAdmin } = adminSlice.actions;
export default adminSlice.reducer;
