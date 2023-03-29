import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthLoading: false,
  roles: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      action.payload.roles.map((role) => state.roles.push(role));
    },
    logout: (state) => {
      state.user = null;
      state.roles = [];
    },
  },
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const stateUser = (state) => state.user;
export const stateUserRoles = (state) => state.user.roles;
