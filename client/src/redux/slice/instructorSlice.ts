import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the Instructor interface based on your Mongoose schema
export interface Instructor {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  courses?: string[]; // Using string[] instead of ObjectId[] for frontend
  isActive: boolean;
  role: "instructor" | "admin";
  createdAt: string;
  updatedAt: string;
}

// Define the initial state type
type InstructorState = Instructor | null;

const initialState: InstructorState = null;

const instructorSlice = createSlice({
  name: "instructor",
  initialState: initialState as InstructorState,
  reducers: {
    setInstructor: (_state, action: PayloadAction<Instructor>) => {
      return action.payload;
    },
    clearInstructor: () => {
      return null;
    },
    updateInstructor: (state, action: PayloadAction<Partial<Instructor>>) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    },
    updateInstructorProfile: (state, action: PayloadAction<{
      firstName?: string;
      lastName?: string;
      username?: string;
      phone?: string;
      avatar?: string;
      bio?: string;
    }>) => {
      if (state) {
        return { ...state, ...action.payload };
      }
      return state;
    },
    addCourseToInstructor: (state, action: PayloadAction<string>) => {
      if (state) {
        const updatedCourses = state.courses ? [...state.courses, action.payload] : [action.payload];
        return { ...state, courses: updatedCourses };
      }
      return state;
    },
    removeCourseFromInstructor: (state, action: PayloadAction<string>) => {
      if (state && state.courses) {
        const updatedCourses = state.courses.filter(courseId => courseId !== action.payload);
        return { ...state, courses: updatedCourses };
      }
      return state;
    },
    toggleInstructorActive: (state) => {
      if (state) {
        return { ...state, isActive: !state.isActive };
      }
      return state;
    }
  }
});

export const {
  setInstructor,
  clearInstructor,
  updateInstructor,
  updateInstructorProfile,
  addCourseToInstructor,
  removeCourseFromInstructor,
  toggleInstructorActive
} = instructorSlice.actions;

export default instructorSlice.reducer;
