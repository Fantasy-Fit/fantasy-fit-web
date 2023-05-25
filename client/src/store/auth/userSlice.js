import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: document.cookie.split(" ")[0].slice(6, -1) || null,
    refresh: document.cookie.split(" ")[1].slice(7, -1) || null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      Object.keys(action.payload).forEach(key => {
        state[key] = action.payload[key];
      });
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserInfo, logOut } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectUserWorkouts = (state) => state.auth.workouts;
export const selectUserCompetitions = (state) => state.auth.competitions;
