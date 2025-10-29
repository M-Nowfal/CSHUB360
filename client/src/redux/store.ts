import { configureStore } from "@reduxjs/toolkit";
import roleReducer from "./slice/roleSlice";
import studentReducer from "./slice/studentSlice";
import instructorReducer from "./slice/instructorSlice";
import authReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    role: roleReducer,
    student: studentReducer,
    instructor: instructorReducer,
    auth: authReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
