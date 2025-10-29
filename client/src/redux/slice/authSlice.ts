import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  lastLogin: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  lastLogin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.lastLogin = new Date().toISOString();
    },
    loginFailure: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.lastLogin = null;
    },
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
      if (action.payload) {
        state.lastLogin = new Date().toISOString();
      } else {
        state.lastLogin = null;
      }
    },
    checkAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  setAuthState, 
  checkAuthStatus 
} = authSlice.actions;

export default authSlice.reducer;
