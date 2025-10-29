import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  rollNumber?: string;
  department?: string;
  semester?: number;
}

const studentSlice = createSlice({
  name: "student",
  initialState: null as Student | null,
  reducers: {
    setStudent: (_state, action: PayloadAction<Student>) => {
      return action.payload;
    },
    clearStudent: () => {
      return null;
    },
    updateStudent: (state, action: PayloadAction<Partial<Student>>) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    }
  }
});

export const { setStudent, clearStudent, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;
