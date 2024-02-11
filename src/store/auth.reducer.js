import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    role: null
  },
  reducers: {
    setIsAuthenticated: (state) => {
      state.isAuthenticated = true;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      console.log(state.isAuthenticated)
    },
  },
});

export default authSlice.reducer;
export const { setIsAuthenticated, setRole, logout } = authSlice.actions;
